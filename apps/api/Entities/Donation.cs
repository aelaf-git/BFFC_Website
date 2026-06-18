namespace Api.Entities;

public enum DonationType
{
    OneTime,
    Monthly,
}

public enum DonationStatus
{
    Succeeded,
    Failed,
    Refunded,
}

public class Donation
{
    public Guid Id { get; set; }

    public string DonorName { get; set; } = string.Empty;

    public string DonorEmail { get; set; } = string.Empty;

    public string? PhoneNumber { get; set; }

    public long AmountCents { get; set; }

    public string Currency { get; set; } = "usd";

    public DonationType DonationType { get; set; }

    public DonationStatus Status { get; set; }

    public string? StripePaymentIntentId { get; set; }

    public string? StripeInvoiceId { get; set; }

    public string? StripeSubscriptionId { get; set; }

    public string? StripeCustomerId { get; set; }

    public string? ReceiptNumber { get; set; }

    public DateTimeOffset DonatedAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }
}
