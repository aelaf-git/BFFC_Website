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

## Deployment

Both apps deploy from `main` via GitHub Actions.

| App | Platform | Workflow |
|-----|----------|----------|
| Website | Azure Static Web Apps | `.github/workflows/azure-static-web-apps-lively-sand-0ea980e10.yml` |
| API | Azure App Service (container via ACR) | `.github/workflows/azure-api.yml` |

Production site URL used in builds: `https://bffcglobal.org`.

## License / use

Private project for Bright Future for Children. Contact [info@bffcglobal.org](mailto:info@bffcglobal.org) for inquiries.
