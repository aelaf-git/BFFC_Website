# Render PostgreSQL setup for BFFC API

The API uses **Render Managed PostgreSQL**. The database is provisioned by `render.yaml` at the repo root (service name: `bffc-db`).

## Connection string

Render injects the connection string into the API service automatically via:

```yaml
ConnectionStrings__DefaultConnection:
  fromDatabase:
    name: bffc-db
    property: connectionString
```

You do not need to copy the URL manually when using the Blueprint.

## Schema / migrations

The API container runs EF Core migrations on startup (`Program.cs` when `DOTNET_RUNNING_IN_CONTAINER=true`). A fresh database gets all tables on first deploy — no manual SQL required.

Verify after deploy:

```bash
curl https://<your-api-host>/health/migrations
```

Expected: `"schemaUpToDate": true` and `"pending": []`.

## Local development

Use Docker Compose Postgres from `apps/api/compose.yaml` — see [migrations.md](./migrations.md).

## Backups

Render Dashboard → **bffc-db** → **Backups**. Enable automated backups on paid plans.

## Manual access

Use the **External Database URL** from the Render dashboard with any PostgreSQL client (`psql`, DBeaver, etc.) for debugging. Prefer the **Internal URL** only from services running on Render.
