using Api.Data;
using Api.Endpoints;
using Api.Services;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Text.Json;
using System.Threading.RateLimiting;

// Load Stripe keys and other secrets from apps/api/.env (see .env.example).
Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 256 * 1024;
});

// ── OpenAPI ───────────────────────────────────────────────────────────────────
builder.Services.AddOpenApi();

// Accept camelCase JSON from the Next.js frontend (amountCents, donorEmail, …)
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

// ── Database ────────────────────────────────────────────────────────────────────
var connectionString = PostgresConnectionString.Normalize(
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? builder.Configuration["DATABASE_URL"]);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
           .UseSnakeCaseNamingConvention());

builder.Services.AddScoped<IDonationPersistenceService, DonationPersistenceService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<INewsletterService, NewsletterService>();
builder.Services.AddScoped<IInKindDonationService, InKindDonationService>();

// ── Rate limiting (forms + donation intents) ──────────────────────────────────
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("form-submissions", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
            }));
    options.AddPolicy("donation-intents", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
            }));
});

// ── CORS ──────────────────────────────────────────────────────────────────────
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
    var webhookSecret = config["Stripe:WebhookSecret"];
    if (string.IsNullOrWhiteSpace(webhookSecret))
        throw new InvalidOperationException("Stripe:WebhookSecret is not configured.");
    return new StripeClient(secretKey);
});
builder.Services.AddSingleton<IStripeService, StripeService>();

// ── Email (tax receipts + contact notifications via Resend) ───────────────────
builder.Services.AddHttpClient<IEmailService, TaxReceiptEmailService>();
builder.Services.AddHttpClient<IContactNotificationEmailService, ContactNotificationEmailService>();

var inContainer = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

var app = builder.Build();

// Apply pending migrations on container startup (Render Docker + managed Postgres).
// Local `dotnet run` still uses manual `dotnet-ef database update`.
if (inContainer)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Applying database migrations…");
    await db.Database.MigrateAsync();
    logger.LogInformation("Database migrations applied.");
}

// ── Middleware pipeline ───────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
    app.MapOpenApi();

if (!inContainer)
    app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");
app.UseRateLimiter();

// ── Endpoints ─────────────────────────────────────────────────────────────────
app.MapGet("/health", async (AppDbContext db) =>
{
    var canConnect = await db.Database.CanConnectAsync();
    return canConnect
        ? Results.Ok(new { status = "healthy", database = "connected" })
        : Results.Json(
            new { status = "unhealthy", database = "disconnected" },
            statusCode: StatusCodes.Status503ServiceUnavailable);
});

if (app.Environment.IsDevelopment())
{
    app.MapGet("/health/migrations", async (AppDbContext db) =>
    {
        if (!await db.Database.CanConnectAsync())
        {
            return Results.Json(
                new { status = "unhealthy", database = "disconnected" },
                statusCode: StatusCodes.Status503ServiceUnavailable);
        }

        var applied = await db.Database.GetAppliedMigrationsAsync();
        var pending = await db.Database.GetPendingMigrationsAsync();

        return Results.Ok(new
        {
            status = "healthy",
            database = "connected",
            applied = applied.ToArray(),
            pending = pending.ToArray(),
            schemaUpToDate = !pending.Any(),
        });
    });
}

app.MapDonationEndpoints();
app.MapContactEndpoints();
app.MapNewsletterEndpoints();
app.MapInKindDonationEndpoints();

app.Run();
