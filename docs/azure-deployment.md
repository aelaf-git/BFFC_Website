# Deploy BFFC Website to Azure

> **GitHub Actions setup:** see [github-actions.md](./github-actions.md) for workflow overview and required secrets.

This project has two parts that deploy separately on Azure:

| App | Technology | Azure service |
|-----|------------|---------------|
| Frontend | Next.js (`apps/web`) | **Azure Static Web Apps** (already linked to this repo) |
| Backend API | ASP.NET Core (`apps/api`) | **Azure App Service** |

---

## Architecture

```text
Browser
   │
   ├─► Azure Static Web Apps  (Next.js site)
   │         NEXT_PUBLIC_API_URL ──────────────┐
   │                                           │
   └─► Stripe Checkout (client-side)           │
                                               ▼
                                    Azure App Service  (.NET API)
                                               │
                                    Stripe webhooks + Resend emails
```

---

## Part 1 — Frontend (Azure Static Web Apps)

You already created a Static Web App named **delightful-hill-04dffce10**. The GitHub workflow was updated to build from `apps/web` correctly.

### 1. Add GitHub secrets

In GitHub → **Settings → Secrets and variables → Actions**, add:

| Secret | Example value |
|--------|----------------|
| `NEXT_PUBLIC_SITE_URL` | `https://delightful-hill-04dffce10.azurestaticapps.net` (or your custom domain) |
| `NEXT_PUBLIC_API_URL` | `https://bffc-api.azurewebsites.net` (your API URL from Part 2) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (production Stripe key) |

> `AZURE_STATIC_WEB_APPS_API_TOKEN_DELIGHTFUL_HILL_04DFFCE10` was added automatically when you connected the Static Web App to GitHub.

### 2. Deploy

Push to the `main` branch. GitHub Actions runs `.github/workflows/azure-static-web-apps-delightful-hill-04dffce10.yml`.

Your site will be live at:

**https://delightful-hill-04dffce10.azurestaticapps.net**

### 3. Optional — custom domain

In Azure Portal → your Static Web App → **Custom domains**, add `brightfuture4children.com` and follow the DNS steps.

---

## Part 2 — Backend API (Azure App Service)

The donation API (Stripe + tax receipt emails) must run as a separate App Service.

### 1. Create the App Service (Azure Portal)

1. Go to [Azure Portal](https://portal.azure.com) → **Create a resource** → **Web App**.
2. Use these settings:
   - **Name**: e.g. `bffc-api` (must be globally unique → `bffc-api.azurewebsites.net`)
   - **Publish**: Code
   - **Runtime stack**: **.NET 10 (LTS)** on **Linux**
   - **Region**: same as your Static Web App (e.g. Canada Central)
   - **Plan**: Basic B1 or higher (Free tier does not support always-on APIs well)
3. Click **Review + create** → **Create**.

### 2. Configure application settings

In Azure Portal → **bffc-api** → **Settings → Environment variables** (or Configuration → Application settings), add:

| Name | Value |
|------|-------|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `Stripe__SecretKey` | `sk_live_...` |
| `Stripe__PublishableKey` | `pk_live_...` |
| `Stripe__WebhookSecret` | `whsec_...` (from Stripe Dashboard, see Part 3) |
| `Email__ApiKey` | `re_...` (Resend API key) |
| `ALLOWED_ORIGINS` | `https://delightful-hill-04dffce10.azurestaticapps.net,https://brightfuture4children.com,https://www.brightfuture4children.com` |

Click **Save** and restart the app.

### 3. Connect GitHub Actions for auto-deploy

1. In Azure Portal → **bffc-api** → **Deployment Center**.
2. Choose **GitHub** as source, authorize, select repo `BFFC_Website`, branch `main`.
3. Or manually download the **publish profile**:
   - **Overview → Download publish profile**
4. In GitHub → **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `AZURE_API_APP_NAME` | `bffc-api` (your app name) |
| `AZURE_API_PUBLISH_PROFILE` | Paste the entire contents of the `.PublishSettings` file |

Push any change under `apps/api/` to trigger `.github/workflows/azure-api.yml`.

### 4. Verify the API

Open:

```text
https://bffc-api.azurewebsites.net/health
```

You should see: `{"status":"healthy"}`

---

## Part 3 — Stripe production webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks).
2. **Add endpoint**:
   - URL: `https://bffc-api.azurewebsites.net/api/donations/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.payment_succeeded`, `customer.subscription.created`
3. Copy the **Signing secret** (`whsec_...`) into Azure App Service as `Stripe__WebhookSecret`.

For local development, keep using:

```bash
stripe listen --forward-to http://localhost:5000/api/donations/webhook
```

---

## Part 4 — Resend (tax receipt emails)

1. Sign up at [resend.com](https://resend.com).
2. Verify your domain `brightfuture4children.com`.
3. Add DNS records Resend provides (SPF, DKIM).
4. Put the API key in Azure as `Email__ApiKey`.

---

## Part 5 — Wire frontend to API

After the API is live, update the GitHub secret:

```text
NEXT_PUBLIC_API_URL=https://bffc-api.azurewebsites.net
```

Push to `main` (or re-run the Static Web Apps workflow) so the frontend rebuilds with the correct API URL.

---

## Alternative — deploy API with Docker

If .NET 10 is not available on App Service in your region, use a container:

```bash
cd apps/api
az acr create --resource-group <rg> --name bffcregistry --sku Basic
az acr login --name bffcregistry
docker build -t bffcregistry.azurecr.io/bffc-api:latest .
docker push bffcregistry.azurecr.io/bffc-api:latest
```

Then create the Web App from **Docker Container** and point it at that image.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Donations fail with CORS error | Add your frontend URL to `ALLOWED_ORIGINS` in App Service settings |
| API unreachable from frontend | Check `NEXT_PUBLIC_API_URL` GitHub secret and redeploy SWA |
| Tax receipts not sent | Verify `Email__ApiKey` and Resend domain verification |
| Stripe webhook 400 | Check `Stripe__WebhookSecret` matches the Stripe Dashboard endpoint |
| SWA build fails | Check Actions log; ensure `apps/web` has a valid `package-lock.json` |
| `stripe: command not found` locally | Install Stripe CLI (see project notes) — only needed for local webhook testing |

---

## Quick checklist

- [ ] Static Web Apps workflow passes on `main`
- [ ] App Service API returns `/health`
- [ ] GitHub secrets set (`NEXT_PUBLIC_*`, `AZURE_API_*`)
- [ ] Azure App Service env vars set (`Stripe__*`, `Email__ApiKey`, `ALLOWED_ORIGINS`)
- [ ] Stripe production webhook pointing to Azure API URL
- [ ] Resend domain verified
- [ ] Test donation end-to-end on production URLs
