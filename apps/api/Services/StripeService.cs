using Api.Models;
using Stripe;

namespace Api.Services;

public class StripeService : IStripeService
{
    private readonly StripeClient _stripe;
    private readonly string _publishableKey;

    public StripeService(IConfiguration config, StripeClient stripe)
    {
        _publishableKey = config["Stripe:PublishableKey"]
            ?? throw new InvalidOperationException("Stripe:PublishableKey is not configured.");

        _stripe = stripe;
    }

    public Task<CreatePaymentIntentResponse> CreatePaymentIntentAsync(CreatePaymentIntentRequest request) =>
        request.Mode == "monthly"
            ? CreateSubscriptionIntentAsync(request)
            : CreateOneTimeIntentAsync(request);

    // ── One-time donation ──────────────────────────────────────────────────────

    private async Task<CreatePaymentIntentResponse> CreateOneTimeIntentAsync(
        CreatePaymentIntentRequest request)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount   = request.AmountCents,
            Currency = request.Currency,
            // PaymentElement supports many methods automatically.
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true,
            },
            ReceiptEmail = request.DonorEmail,
            Description  = $"One-time donation to BFFC",
            Metadata     = new Dictionary<string, string>
            {
                ["donor_name"]  = request.DonorName,
                ["donor_email"] = request.DonorEmail,
                ["mode"]        = "one-time",
            },
        };

        if (!string.IsNullOrWhiteSpace(request.PhoneNumber))
            options.Metadata["phone_number"] = request.PhoneNumber;

        var service = new PaymentIntentService(_stripe);
        var intent  = await service.CreateAsync(options);

        return new CreatePaymentIntentResponse(intent.ClientSecret!, _publishableKey);
    }

    // ── Monthly donation (Subscription) ───────────────────────────────────────
    // Flow:
    //   1. Create / upsert a Stripe Customer for this donor.
    //   2. Create an inline Price (dynamic amount, monthly interval).
    //   3. Create a Subscription with payment_behavior=default_incomplete,
    //      which generates a pending PaymentIntent for the first charge.
    //   4. Expand latest_invoice.payment_intent so we can return the clientSecret.

    private async Task<CreatePaymentIntentResponse> CreateSubscriptionIntentAsync(
        CreatePaymentIntentRequest request)
    {
        // 1 — Customer
        var customerService = new CustomerService(_stripe);
        var customer = await customerService.CreateAsync(new CustomerCreateOptions
        {
            Email    = request.DonorEmail,
            Name     = request.DonorName,
            Phone    = request.PhoneNumber,
            Metadata = new Dictionary<string, string> { ["mode"] = "monthly" },
        });

        // 2 — Price (created inline so the amount is dynamic)
        var priceService = new PriceService(_stripe);
        var price = await priceService.CreateAsync(new PriceCreateOptions
        {
            UnitAmount  = request.AmountCents,
            Currency    = request.Currency,
            Recurring   = new PriceRecurringOptions { Interval = "month" },
            ProductData = new PriceProductDataOptions
            {
                Name = "Monthly Donation to Bright Future for Children",
            },
        });

        // 3+4 — Subscription
        // Stripe API 2025-03-31+ removed Invoice.PaymentIntent; the client secret
        // is now at Invoice.ConfirmationSecret.ClientSecret.
        var subscriptionService = new SubscriptionService(_stripe);
        var subscription = await subscriptionService.CreateAsync(new SubscriptionCreateOptions
        {
            Customer = customer.Id,
            Items    = [new SubscriptionItemOptions { Price = price.Id }],
            // "default_incomplete" creates the subscription but requires explicit
            // payment confirmation from the frontend before activating.
            PaymentBehavior = "default_incomplete",
            PaymentSettings = new SubscriptionPaymentSettingsOptions
            {
                SaveDefaultPaymentMethod = "on_subscription",
            },
            // Expand the confirmation_secret so we can return the clientSecret.
            Expand = ["latest_invoice.confirmation_secret"],
        });

        var clientSecret = subscription.LatestInvoice.ConfirmationSecret.ClientSecret;
        return new CreatePaymentIntentResponse(clientSecret!, _publishableKey);
    }
}
