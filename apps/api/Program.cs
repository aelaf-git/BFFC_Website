using Api.Endpoints;
using Api.Services;
using DotNetEnv;
using System.Text.Json;

// Load Stripe keys and other secrets from apps/api/.env (see .env.example).
Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);

// ── OpenAPI ───────────────────────────────────────────────────────────────────
builder.Services.AddOpenApi();

// Accept camelCase JSON from the Next.js frontend (amountCents, donorEmail, …)
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allow the Next.js frontend (localhost in dev, Azure SWA / custom domain in prod).
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        var origins = builder.Configuration
            .GetSection("AllowedOrigins")
            .Get<string[]>()?
            .Where(o => !string.IsNullOrWhiteSpace(o))
            .ToList() ?? [];

        var extra = builder.Configuration["ALLOWED_ORIGINS"];
        if (!string.IsNullOrWhiteSpace(extra))
        {
            origins.AddRange(
                extra.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
        }

        if (origins.Count == 0)
            origins.Add("http://localhost:3000");

        policy.WithOrigins(origins.Distinct(StringComparer.OrdinalIgnoreCase).ToArray())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ── Stripe ────────────────────────────────────────────────────────────────────
// IStripeService is registered as a singleton because StripeConfiguration.ApiKey
// is a global static — initialising it once is correct and thread-safe.
builder.Services.AddSingleton<IStripeService, StripeService>();

// ── Email (tax receipts via Resend) ───────────────────────────────────────────
builder.Services.AddHttpClient<IEmailService, TaxReceiptEmailService>();

var app = builder.Build();

// ── Middleware pipeline ───────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseHttpsRedirection();
app.UseCors("FrontendPolicy");

// ── Endpoints ─────────────────────────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
app.MapDonationEndpoints();

app.Run();
