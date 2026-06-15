namespace Api.Models;

/// <summary>
/// Sent by the frontend when the donor clicks "Continue to Payment".
/// AmountCents is dollars × 100 — e.g. $50 USD = 5000.
/// </summary>
public record CreatePaymentIntentRequest(
    int    AmountCents,
    string Currency,       // "usd"
    string DonorEmail,
    string DonorName,
    string Mode,           // "one-time" | "monthly"
    string? PhoneNumber
);

/// <summary>
/// Returned to the frontend so it can initialise Stripe Elements.
/// ClientSecret lets Stripe.js confirm the payment without the secret key ever
/// leaving the server.
/// </summary>
public record CreatePaymentIntentResponse(
    string ClientSecret,
    string PublishableKey
);

/// <summary>
/// Returned by GET /api/stripe/config so the frontend can load Stripe.js
/// lazily with the correct publishable key.
/// </summary>
public record StripeConfigResponse(string PublishableKey);
