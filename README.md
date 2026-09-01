# Bright Future for Children (BFFC)

Official website for [Bright Future for Children](https://bffcglobal.org) — a Canadian charity providing life-saving meals, education support, and community programs for children in war-affected regions of Ethiopia (Amhara, Afar, and Tigray).

**Live site:** [https://bffcglobal.org](https://bffcglobal.org)

## Repository structure

```
apps/
  web/   Next.js frontend (public website)
  api/   .NET API (donations, contact, newsletter, Stripe)
```

## Prerequisites

- Node.js 20+
- npm
- .NET 10 SDK (only if you need to run the API locally)
- Docker (optional, for API + Postgres via Compose)

## Website (frontend)

```bash
cd apps/web
cp .env.example .env.local   # fill in values as needed
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Description |
|--------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

### Environment variables (`apps/web`)

See `apps/web/.env.example`. Common values:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (donate page) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (optional locally) |

## API (backend)

```bash
cd apps/api
cp .env.example .env         # fill in Stripe, email, DB, CORS
dotnet restore
dotnet run
```

Or with Docker Compose from `apps/api` (includes Postgres). See `apps/api/.env.example` for connection strings and secrets.

## Deployment (Render)

All services are defined in [`render.yaml`](./render.yaml) at the repo root.

| Service | Runtime | Root |
|---------|---------|------|
| **bffc-web** | Node (Next.js standalone) | `apps/web` |
| **bffc-api** | Docker (.NET 10) | `apps/api` |
| **bffc-db** | PostgreSQL 16 | — |

### First-time setup

1. [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint** → connect this repo.
2. On first deploy, enter secret env vars when prompted:
   - `Stripe__SecretKey`, `Stripe__PublishableKey`, `Stripe__WebhookSecret` (API)
   - `Email__ApiKey` (API — Resend)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (web)
3. After deploy, add Stripe webhook: `https://<api-host>/api/stripe/webhook`
4. Add custom domains in Render (`bffcglobal.org`, `api.bffcglobal.org`), update DNS, then set:
   - `NEXT_PUBLIC_API_URL` on **bffc-web** → `https://api.bffcglobal.org` (triggers rebuild)
   - `ALLOWED_ORIGINS` on **bffc-api** if needed

Pushes to `main` auto-deploy via Render's GitHub integration.

Production site URL: `https://bffcglobal.org`.

See also: `apps/api/docs/render-postgres.md`, `apps/api/docs/migrations.md`.

## License / use

Private project for Bright Future for Children. Contact [info@bffcglobal.org](mailto:info@bffcglobal.org) for inquiries.
