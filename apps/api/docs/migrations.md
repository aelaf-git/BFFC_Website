# Database migrations

BFFC uses **EF Core code-first migrations** with PostgreSQL. All schema changes live in `Data/Migrations/`.

## How production works (Docker on Azure)

The API container **applies pending migrations automatically on startup** when `DOTNET_RUNNING_IN_CONTAINER=true` (set in App Service).

```
Container starts → reads connection string → MigrateAsync() → app listens on :8080
```

You do **not** run `dotnet ef database update` against Azure Postgres from your laptop (private DB blocks that anyway).

### Deploy a schema change

1. Create migration locally (see below)
2. Rebuild and push the image:

   ```bash
   cd apps/api

   az acr build \
     --registry apiimage \
     --image bffc-api:latest \
     --file Dockerfile \
     --target final \
     .
   ```

3. Restart the app:

   ```bash
   az webapp restart --resource-group bffc-api-group --name bffc-api
   ```

4. Confirm in logs:

   ```bash
   az webapp log tail --resource-group bffc-api-group --name bffc-api
   ```

   Look for: `Applying database migrations…` then `Database migrations applied.`

### Verify migrations in production

```bash
curl https://bffc-api-cfhhhaabhug2ccf7.canadacentral-01.azurewebsites.net/health/migrations
```

Expected:

```json
{
  "status": "healthy",
  "applied": ["20260617180330_InitialCreate", "20260627192300_AddInKindDonations"],
  "pending": [],
  "schemaUpToDate": true
}
```

Or test a write endpoint (proves tables exist):

```bash
curl -X POST "https://bffc-api-cfhhhaabhug2ccf7.canadacentral-01.azurewebsites.net/api/newsletter/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"verify"}'
```

### Start with an empty database

1. Create a new database on `bffc-api-server` (or use a new empty one)
2. Update `ConnectionStrings__DefaultConnection` on **bffc-api** (database name in the string)
3. Restart the app — migrations run on startup and create all tables

No manual SQL required.

---

## Local development

1. Start Postgres:

   ```bash
   cd apps/api
   docker compose up -d postgres
   ```

2. Copy env file: `cp .env.example .env`

3. Install EF tool and apply migrations:

   ```bash
   dotnet tool install --global dotnet-ef --version 10.0.9
   export PATH="$PATH:$HOME/.dotnet/tools"

   dotnet tool restore
   dotnet-ef database update
   ```

   Use **`dotnet-ef`** (hyphen), not `dotnet ef`, if the local tool shim fails.

4. Run the API: `dotnet run` or `docker compose up api`

   Local `dotnet run` does **not** auto-migrate — use `dotnet-ef database update` manually.

---

## Creating a new migration

```bash
cd apps/api
export PATH="$PATH:$HOME/.dotnet/tools"
dotnet-ef migrations add <DescriptiveName> --output-dir Data/Migrations
dotnet-ef database update   # local only
```

Optional: generate review SQL:

```bash
dotnet-ef migrations script --idempotent -o Data/Migrations/FullSchema.idempotent.sql
```

---

## Current migrations

| Migration | Tables / changes |
|-----------|------------------|
| `20260617180330_InitialCreate` | `contact_messages`, `donations`, `newsletter_subscriptions`, `processed_stripe_events` |
| `20260627192300_AddInKindDonations` | `in_kind_donations` |

---

## Rules

1. **Never** edit a migration already applied in production.
2. **Forward-only** — add a new migration to fix schema mistakes.
3. One logical change per migration when practical.
4. Production schema changes ship via **new Docker image + restart**, not manual SQL.

## Azure Postgres setup

See [azure-postgres.md](./azure-postgres.md).
