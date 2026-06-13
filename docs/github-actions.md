# GitHub Actions

This repo uses four workflows under `.github/workflows/`.

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push / PR to `main` or `development` | Build web + build API |
| `azure-static-web-apps-*.yml` | Push / PR to `main` | Deploy Next.js site to Azure Static Web Apps |
| `azure-api.yml` | Push to `main` (API changes) or manual | Build & deploy .NET API to Azure App Service |

---

## Required GitHub secrets

Go to **GitHub → your repo → Settings → Secrets and variables → Actions → New repository secret**.

### Frontend (Static Web Apps)

| Secret | Description |
|--------|-------------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_DELIGHTFUL_HILL_04DFFCE10` | Added automatically when you linked Azure Static Web Apps to GitHub |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, e.g. `https://delightful-hill-04dffce10.azurestaticapps.net` |
| `NEXT_PUBLIC_API_URL` | Azure API URL, e.g. `https://bffc-api.azurewebsites.net` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...` or `pk_live_...`) |

### Backend (App Service)

| Secret | Description |
|--------|-------------|
| `AZURE_API_APP_NAME` | App Service name, e.g. `bffc-api` |
| `AZURE_API_PUBLISH_PROFILE` | Full contents of the publish profile XML from Azure Portal |

> Until `AZURE_API_APP_NAME` and `AZURE_API_PUBLISH_PROFILE` are set, the API workflow **builds successfully** but skips deployment with a notice.

---

## How each workflow runs

### CI (`ci.yml`)

Runs on every pull request and push to `main` / `development`:

1. **Web** — `npm ci`, `npm run build` in `apps/web`
2. **API** — `dotnet build` in `apps/api`

Run `npm run lint` locally in `apps/web` before pushing (lint is not in CI yet due to pre-existing warnings in legal/content pages).

### Frontend deploy (Static Web Apps)

Runs when code is pushed to `main` (and on open PRs for preview environments):

- Builds from `apps/web` using `npm run build:azure`
- Deploys to **https://delightful-hill-04dffce10.azurestaticapps.net**
- Injects `NEXT_PUBLIC_*` secrets at build time

### API deploy (`azure-api.yml`)

Runs when files under `apps/api/` change on `main`, or when triggered manually (**Actions → Deploy API to Azure App Service → Run workflow**):

1. Builds and publishes the .NET API
2. Deploys to Azure App Service if secrets are configured

---

## First-time setup checklist

1. [ ] Push this repo to GitHub on the `main` branch
2. [ ] Confirm Static Web Apps is connected (token secret should exist)
3. [ ] Add `NEXT_PUBLIC_*` secrets
4. [ ] Create Azure App Service for the API (see [azure-deployment.md](./azure-deployment.md))
5. [ ] Add `AZURE_API_APP_NAME` and `AZURE_API_PUBLISH_PROFILE` secrets
6. [ ] Configure Azure App Service environment variables (`Stripe__*`, `Email__ApiKey`, etc.)
7. [ ] Open a test PR — CI should pass
8. [ ] Merge to `main` — frontend and API deploy automatically

---

## Optional: GitHub Environment

The API deploy job uses a `production` environment. To add approval gates:

1. GitHub → **Settings → Environments → New environment** → name it `production`
2. Enable **Required reviewers** if you want manual approval before API deploys

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CI web build fails | Check the Actions log; run `npm ci && npm run build` locally in `apps/web` |
| CI API build fails | Run `dotnet build apps/api/api.csproj` locally |
| SWA deploy fails | Verify `apps/web/package-lock.json` is committed; check `NEXT_PUBLIC_*` secrets |
| API deploy skipped | Add `AZURE_API_APP_NAME` and `AZURE_API_PUBLISH_PROFILE` secrets |
| API deploy fails auth | Re-download publish profile from Azure Portal and update the secret |
| Donations fail in production | Set `NEXT_PUBLIC_API_URL` and redeploy frontend; check API CORS settings |
