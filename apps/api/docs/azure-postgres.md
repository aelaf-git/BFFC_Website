# Azure PostgreSQL setup for BFFC API

This guide provisions **Azure Database for PostgreSQL — Flexible Server** for the BFFC backend and connects it to Azure App Service.

## Prerequisites

- Azure CLI (`az`) logged in: `az login`
- Resource group (create one if needed)
- Azure App Service plan + Web App for `apps/api` (Linux container or .NET runtime)

Set variables (adjust names and region):

```bash
RESOURCE_GROUP="bffc-prod-rg"
LOCATION="canadacentral"
SERVER_NAME="bffc-pg-prod"          # must be globally unique
ADMIN_USER="bffc_admin"
ADMIN_PASSWORD="CHANGE_ME_STRONG_PASSWORD"
DB_NAME="bffc"
```

## 1. Create PostgreSQL Flexible Server

```bash
az postgres flexible-server create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$SERVER_NAME" \
  --location "$LOCATION" \
  --admin-user "$ADMIN_USER" \
  --admin-password "$ADMIN_PASSWORD" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 16 \
  --public-access 0.0.0.0 \
  --yes
```

> For production, prefer **private access** with VNet integration instead of `0.0.0.0`. Start with public access + firewall rules for simpler initial setup.

## 2. Create application database

```bash
az postgres flexible-server db create \
  --resource-group "$RESOURCE_GROUP" \
  --server-name "$SERVER_NAME" \
  --database-name "$DB_NAME"
```

## 3. Configure firewall

Allow Azure services (App Service outbound):

```bash
az postgres flexible-server firewall-rule create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$SERVER_NAME" \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

Allow your development machine (for `dotnet ef database update` from local):

```bash
MY_IP=$(curl -s https://api.ipify.org)
az postgres flexible-server firewall-rule create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$SERVER_NAME" \
  --rule-name AllowDevMachine \
  --start-ip-address "$MY_IP" \
  --end-ip-address "$MY_IP"
```

Allow GitHub Actions runner IPs temporarily when running migrations from CI, or run migrations from a self-hosted runner inside Azure.

## 4. Connection string

Production connection string (store as secret — **never commit**):

```
Host=<SERVER_NAME>.postgres.database.azure.com;Port=5432;Database=bffc;Username=bffc_admin;Password=<PASSWORD>;SSL Mode=Require;Trust Server Certificate=true
```

## 5. Configure App Service

In **Azure Portal → App Service → Configuration → Application settings**, add:

| Name | Value |
|------|-------|
| `ConnectionStrings__DefaultConnection` | *(connection string above)* |
| `Stripe__SecretKey` | Stripe secret key |
| `Stripe__PublishableKey` | Stripe publishable key |
| `Stripe__WebhookSecret` | Stripe webhook signing secret |
| `Email__ApiKey` | Resend API key |
| `WEBSITES_PORT` | `8080` |
| `DOTNET_RUNNING_IN_CONTAINER` | `true` |
| `ALLOWED_ORIGINS` | `https://bffcglobal.org,https://www.bffcglobal.org,https://<your-swa-domain>` |

Mark the connection string as a **slot setting** if using deployment slots.

### Key Vault (recommended)

1. Store the connection string in Key Vault.
2. Enable managed identity on App Service.
3. Grant the app **Get** permission on secrets.
4. Reference: `@Microsoft.KeyVault(SecretUri=https://<vault>.vault.azure.net/secrets/DbConnectionString/)`

## 6. Apply migrations

You have **two migrations** in the repo:

1. `20260617180330_InitialCreate` — contact, donations, newsletter, stripe events
2. `20260625170230_AddInKindDonations` — in-kind donation form

### Option A — Automatic on deploy (private Postgres)

If your server uses **Private access**, Azure Portal **Query editor is not available**, and your laptop cannot reach the database directly.

The API applies pending EF Core migrations automatically when the container starts (`Program.cs`, when `DOTNET_RUNNING_IN_CONTAINER=true`).

After changing migrations, rebuild and push the image, then restart **bffc-api**:

```bash
cd apps/api

az acr build \
  --registry apiimage \
  --image bffc-api:latest \
  --file Dockerfile \
  --target final \
  .

az webapp restart --resource-group bffc-api-group --name bffc-api
```

Check logs for `Database migrations applied.`:

```bash
az webapp log tail --resource-group bffc-api-group --name bffc-api
```

### Option B — Azure Portal Query editor

Only available on servers created with **Public access**. If you see no Query editor, use Option A or Option C.

1. **Portal → bffc-api-server → Query editor**
2. Sign in as `xzgwloocqa` with your password
3. Select database **`bffc-api-database`**
4. Open `Data/Migrations/FullSchema.idempotent.sql` from this repo, paste, and **Run**

### Option C — From your laptop (CLI)

Requires **public access** on the server (or VPN into the VNet) and your IP in the firewall.

Install the EF tool globally (fixes `dotnet ef` not found on some setups):

```bash
dotnet tool install --global dotnet-ef --version 10.0.9
export PATH="$PATH:$HOME/.dotnet/tools"
```

Reset and apply:

```bash
cd apps/api

export ConnectionStrings__DefaultConnection="Host=bffc-api-server.postgres.database.azure.com;Port=5432;Database=bffc-api-database;Username=xzgwloocqa;Password=YOUR_PASSWORD;SSL Mode=Require;Trust Server Certificate=true"

dotnet tool restore

# Start fresh (drops all tables)
dotnet-ef database drop --force

# Apply all migrations
dotnet-ef database update
```

Use **`dotnet-ef`** (hyphen), not `dotnet ef`, if the local tool shim fails.

CI builds the container image and restarts **bffc-api**; migrations still run on container startup (see `.github/workflows/azure-api.yml`).

## 7. Backups and monitoring

- **Backups**: Azure Portal → PostgreSQL server → **Backup and Restore**. Default retention is 7 days; increase for production.
- **Monitoring**: Enable diagnostic logs; alert on connection failures and high CPU.
- **Scaling**: Upgrade SKU as traffic grows; consider connection pooling (PgBouncer) later.

## 8. GitHub Actions secrets

Add this in **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|--------|---------|
| `AZURE_CREDENTIALS` | Service principal JSON for `azure/login` (ACR build + App Service restart) |

Create the service principal (Cloud Shell or a working `az` CLI):

```bash
az ad sp create-for-rbac \
  --name "github-bffc-api-deploy" \
  --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/bffc-api-group \
  --json-auth
```

Grant access to the container registry resource group (`bffc-api_group` — note the **underscore**, different from `bffc-api-group`):

```bash
az role assignment create \
  --assignee <APP_ID_FROM_JSON> \
  --role Contributor \
  --scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/bffc-api_group
```

Or grant **AcrPush** on the registry only:

```bash
az role assignment create \
  --assignee <APP_ID_FROM_JSON> \
  --role AcrPush \
  --scope /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/bffc-api_group/providers/Microsoft.ContainerRegistry/registries/apiimage
```

Paste the full JSON output into the `AZURE_CREDENTIALS` secret. The workflow builds `bffc-api:latest` in ACR and restarts the web app; EF migrations apply when the new container starts.

## Verify

```bash
curl https://<your-api>.azurewebsites.net/health
# Expected: {"status":"healthy","database":"connected"}
```
