using Api.Endpoints;
using Api.Services;
using DotNetEnv;
using Stripe;
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
builder.Services.AddSingleton(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var secretKey = config["Stripe:SecretKey"]
        ?? throw new InvalidOperationException("Stripe:SecretKey is not configured.");
    return new StripeClient(secretKey);
});
builder.Services.AddSingleton<IStripeService, StripeService>();

// ── Email (tax receipts via Resend) ───────────────────────────────────────────
builder.Services.AddHttpClient<IEmailService, TaxReceiptEmailService>();

var app = builder.Build();

// ── Middleware pipeline ───────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
    app.MapOpenApi();

// In a container (e.g. Azure App Service) TLS is terminated at the edge and the
// app only serves HTTP internally, so HTTPS redirection would loop/fail. Keep it
// for local development only.
var inContainer = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";
if (!inContainer)
    app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

// ── Endpoints ─────────────────────────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
app.MapDonationEndpoints();

app.Run();
