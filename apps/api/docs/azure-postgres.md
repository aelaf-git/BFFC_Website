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
| `ALLOWED_ORIGINS` | `https://brightfuture4children.com,https://<your-swa-domain>` |

Mark the connection string as a **slot setting** if using deployment slots.

### Key Vault (recommended)

1. Store the connection string in Key Vault.
2. Enable managed identity on App Service.
3. Grant the app **Get** permission on secrets.
4. Reference: `@Microsoft.KeyVault(SecretUri=https://<vault>.vault.azure.net/secrets/DbConnectionString/)`

## 6. Apply migrations

From your machine (with firewall rule in place):

```bash
cd apps/api
export ConnectionStrings__DefaultConnection="Host=..."
dotnet tool restore
dotnet ef database update
```

Or let CI apply migrations via the GitHub Actions workflow (see `.github/workflows/azure-api.yml`).

## 7. Backups and monitoring

- **Backups**: Azure Portal → PostgreSQL server → **Backup and Restore**. Default retention is 7 days; increase for production.
- **Monitoring**: Enable diagnostic logs; alert on connection failures and high CPU.
- **Scaling**: Upgrade SKU as traffic grows; consider connection pooling (PgBouncer) later.

## 8. GitHub Actions secrets

Add these in **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|--------|---------|
| `DATABASE_CONNECTION_STRING` | EF Core `dotnet ef database update` in CI |
| `AZURE_API_PUBLISH_PROFILE` | App Service deploy |
| `AZURE_API_APP_NAME` | App Service name (optional, if using Azure login deploy) |

## Verify

```bash
curl https://<your-api>.azurewebsites.net/health
# Expected: {"status":"healthy","database":"connected"}
```
