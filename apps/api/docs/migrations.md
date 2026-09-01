# Database migrations

BFFC uses **EF Core code-first migrations** with PostgreSQL. All schema changes live in `Data/Migrations/`.

## How production works (Render)

The API container **applies pending migrations automatically on startup** when `DOTNET_RUNNING_IN_CONTAINER=true` (set in `render.yaml`).

```
Container starts → reads connection string → MigrateAsync() → app listens on :8080
```

You do **not** run `dotnet ef database update` against production from your laptop.

### Deploy a schema change

1. Create migration locally (see below)
2. Push to `main` — Render auto-redeploys the API
3. Check deploy logs for: `Applying database migrations…` then `Database migrations applied.`

### Verify migrations in production

```bash
curl https://<your-api-host>/health/migrations
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
curl -X POST "https://<your-api-host>/api/newsletter/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"verify"}'
```

### View newsletter subscriptions in the database

```sql
SELECT email, status, source, subscribed_at, created_at
FROM newsletter_subscriptions
ORDER BY subscribed_at DESC;
```

Run in Render → **bffc-db** → **Connect** (shell or external client).

### Start with an empty database

1. Create a new Render Postgres instance (or use the one from `render.yaml`)
2. Link it to **bffc-api** via `ConnectionStrings__DefaultConnection`
3. Redeploy — migrations run on startup and create all tables

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
4. Production schema changes ship via **git push to main** (Render redeploy), not manual SQL.

## Render Postgres setup

See [render-postgres.md](./render-postgres.md).
