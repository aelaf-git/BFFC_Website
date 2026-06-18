# Database migrations

BFFC uses **EF Core code-first migrations** with PostgreSQL. All schema changes are versioned in `Data/Migrations/`.

## Local setup

1. Start Postgres:

   ```bash
   cd apps/api
   docker compose up -d postgres
   ```

   Postgres is exposed on **host port 5433** (to avoid conflicting with a local Postgres on 5432).

2. Copy environment file:

   ```bash
   cp .env.example .env
   # Fill in Stripe/Email secrets; connection string defaults work for Compose Postgres
   ```

3. Apply migrations:

   ```bash
   dotnet tool restore
   dotnet ef database update
   ```

4. Run the API:

   ```bash
   dotnet run
   # or: docker compose up api
   ```

## Creating a new migration

```bash
cd apps/api
dotnet ef migrations add <DescriptiveName> --output-dir Data/Migrations
dotnet ef database update
```

Review the generated SQL before opening a PR:

```bash
dotnet ef migrations script --idempotent -o Data/Migrations/<Name>.idempotent.sql
```

## Rules

1. **Never** edit a migration that has been applied to staging or production.
2. **Forward-only** in shared environments — add a corrective migration instead of rolling back.
3. **Never** apply schema changes manually in Azure Portal.
4. One logical change per migration when practical.

## Tables

| Table | Purpose |
|-------|---------|
| `donations` | Completed Stripe payments (webhook source of truth) |
| `contact_messages` | Contact form submissions |
| `newsletter_subscriptions` | Newsletter signups |
| `processed_stripe_events` | Webhook idempotency guard |

## Azure

See [azure-postgres.md](./azure-postgres.md) for provisioning and production connection setup.
