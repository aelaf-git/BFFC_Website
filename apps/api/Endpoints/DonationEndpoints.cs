using System.Globalization;
using Api.Models;
using Api.Services;
using Stripe;

namespace Api.Endpoints;

public static class DonationEndpoints
{
    public static IEndpointRouteBuilder MapDonationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/donations").WithTags("Donations");

        group.MapGet("/config", (IConfiguration config) =>
        {
            var pk = config["Stripe:PublishableKey"]
                ?? throw new InvalidOperationException("Stripe:PublishableKey is not configured.");

            return Results.Ok(new StripeConfigResponse(pk));
        })
        .WithName("GetStripeConfig");

        group.MapPost("/create-intent", async (
            CreatePaymentIntentRequest request,
            IStripeService stripeService,
            ILogger<Program> logger) =>
        {
            var validationError = ValidateCreateIntent(request);
            if (validationError is not null)
                return Results.BadRequest(new { message = validationError });

            try
            {
                var response = await stripeService.CreatePaymentIntentAsync(request);
                return Results.Ok(response);
            }
            catch (StripeException ex)
            {
                logger.LogError(ex, "Stripe error creating payment intent.");
                return Results.Problem("Unable to start payment. Please try again.");
            }
        })
        .WithName("CreatePaymentIntent")
        .RequireRateLimiting("donation-intents");

        group.MapPost("/webhook", async (
            HttpRequest httpRequest,
            IConfiguration config,
            IEmailService emailService,
            IDonationPersistenceService donationPersistence,
            StripeClient stripe,
            ILogger<Program> logger) =>
        {
            var webhookSecret = config["Stripe:WebhookSecret"];

            string payload;
            using (var reader = new StreamReader(httpRequest.Body, System.Text.Encoding.UTF8))
                payload = await reader.ReadToEndAsync();

            var stripeSignature = httpRequest.Headers["Stripe-Signature"].ToString();

            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    payload, stripeSignature, webhookSecret,
                    throwOnApiVersionMismatch: false);
            }
            catch (StripeException ex)
            {
                logger.LogWarning(ex, "Stripe webhook signature verification failed.");
                return Results.BadRequest("Invalid webhook signature.");
            }

            if (await donationPersistence.IsEventProcessedAsync(stripeEvent.Id))
            {
                logger.LogInformation("Skipping already processed Stripe event {EventId}.", stripeEvent.Id);
                return Results.Ok();
            }

            switch (stripeEvent.Type)
            {
                case EventTypes.PaymentIntentSucceeded:
                {
                    var pi = stripeEvent.Data.Object as PaymentIntent;
                    logger.LogInformation(
                        "PaymentIntent succeeded: {Id} | {Amount} {Currency}",
                        pi?.Id, pi?.Amount, pi?.Currency);

                    if (pi is not null && pi.Metadata.GetValueOrDefault("mode") == "one-time")
                    {
                        await donationPersistence.PersistSucceededPaymentIntentAsync(pi);
                        var receipt = BuildReceiptFromPaymentIntent(pi);
                        await emailService.SendTaxReceiptAsync(receipt);
                    }
                    break;
                }

                case EventTypes.PaymentIntentPaymentFailed:
                {
                    var pi = stripeEvent.Data.Object as PaymentIntent;
                    logger.LogWarning(
                        "PaymentIntent failed: {Id} | {Error}",
                        pi?.Id, pi?.LastPaymentError?.Message);

                    if (pi is not null)
                        await donationPersistence.PersistFailedPaymentIntentAsync(pi);
                    break;
                }

                case EventTypes.CustomerSubscriptionCreated:
                {
                    var sub = stripeEvent.Data.Object as Subscription;
                    logger.LogInformation(
                        "Subscription created: {Id} | {CustomerId}",
                        sub?.Id, sub?.CustomerId);
                    break;
                }

                case EventTypes.InvoicePaymentSucceeded:
                {
                    var inv = stripeEvent.Data.Object as Invoice;
                    logger.LogInformation(
                        "Invoice paid: {Id} | {Amount}",
                        inv?.Id, inv?.AmountPaid);

                    if (inv is not null && inv.AmountPaid > 0)
                    {
                        await donationPersistence.PersistSucceededInvoiceAsync(inv, stripe);
                        var receipt = await BuildReceiptFromInvoiceAsync(inv, stripe);
                        if (receipt is not null)
                            await emailService.SendTaxReceiptAsync(receipt);
                    }
                    break;
                }
            }

            await donationPersistence.TryMarkEventProcessedAsync(
                stripeEvent.Id,
                stripeEvent.Type);

            return Results.Ok();
        })
        .WithName("StripeWebhook")
        .DisableAntiforgery();

        return app;
    }

    private static string? ValidateCreateIntent(CreatePaymentIntentRequest request)
    {
        if (request.AmountCents is < 100 or > 1_000_000)
            return "Donation amount must be between $1 and $10,000.";

        if (!string.Equals(request.Currency, "usd", StringComparison.OrdinalIgnoreCase))
            return "Only USD donations are accepted.";

        if (request.Mode is not ("one-time" or "monthly"))
            return "Invalid donation mode.";

        if (string.IsNullOrWhiteSpace(request.DonorEmail) || !InputSanitizer.IsValidEmail(request.DonorEmail.Trim()))
            return "A valid donor email is required.";

        if (string.IsNullOrWhiteSpace(request.DonorName))
            return "Donor name is required.";

        var name = request.DonorName.Trim();
        if (name.Contains('\r') || name.Contains('\n'))
            return "Donor name contains invalid characters.";
        if (name.Length > 200)
            return "Donor name is too long.";

        if (!string.IsNullOrWhiteSpace(request.PhoneNumber))
        {
            var phone = request.PhoneNumber.Trim();
            if (phone.Contains('\r') || phone.Contains('\n'))
                return "Phone number contains invalid characters.";
            if (phone.Length > 30)
                return "Phone number is too long.";
        }

        return null;
    }

    private static TaxReceiptInfo BuildReceiptFromPaymentIntent(PaymentIntent pi)
    {
        var donorName  = pi.Metadata.GetValueOrDefault("donor_name") ?? "Donor";
        var donorEmail = pi.ReceiptEmail
            ?? pi.Metadata.GetValueOrDefault("donor_email")
            ?? throw new InvalidOperationException($"PaymentIntent {pi.Id} has no donor email.");

        return new TaxReceiptInfo(
            ReceiptNumber:    FormatReceiptNumber(pi.Id, pi.Created),
            DonorName:        donorName,
            DonorEmail:       donorEmail,
            AmountCents:      pi.Amount,
            Currency:         pi.Currency,
            DonationDate:     pi.Created,
            PaymentReference: pi.Id,
            DonationType:     "One-time"
        );
    }

    private static async Task<TaxReceiptInfo?> BuildReceiptFromInvoiceAsync(Invoice inv, StripeClient stripe)
    {
        var email = inv.CustomerEmail;
        if (string.IsNullOrWhiteSpace(email))
            return null;

        var donorName = "Donor";
        if (inv.Customer is not null && !string.IsNullOrWhiteSpace(inv.Customer.Name))
            donorName = inv.Customer.Name;
        else if (!string.IsNullOrWhiteSpace(inv.CustomerId))
        {
            var customer = await new CustomerService(stripe).GetAsync(inv.CustomerId);
            donorName = customer.Name ?? donorName;
        }

        var donationDate = inv.StatusTransitions?.PaidAt ?? inv.Created;

        return new TaxReceiptInfo(
            ReceiptNumber:    FormatReceiptNumber(inv.Id, donationDate),
            DonorName:        donorName,
            DonorEmail:       email,
            AmountCents:      inv.AmountPaid,
            Currency:         inv.Currency,
            DonationDate:     donationDate,
            PaymentReference: inv.Id,
            DonationType:     "Monthly"
        );
    }

    private static string FormatReceiptNumber(string stripeId, DateTime date) =>
        $"BFFC-{date.ToString("yyyyMMdd", CultureInfo.InvariantCulture)}-{stripeId[^8..].ToUpperInvariant()}";
}
