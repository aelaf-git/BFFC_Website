namespace Api.Entities;

public enum InKindDonationStatus
{
    New,
    Reviewed,
    Archived,
}

public class InKindDonation
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    public string? Organization { get; set; }

    public string Category { get; set; } = string.Empty;

    public string ItemDescription { get; set; } = string.Empty;

    public string? EstimatedQuantity { get; set; }

    public string DeliveryMethod { get; set; } = string.Empty;

    public string? City { get; set; }

    public string? Notes { get; set; }

    public InKindDonationStatus Status { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
}
