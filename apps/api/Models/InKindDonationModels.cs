namespace Api.Models;

public record SubmitInKindDonationRequest(
    string Name,
    string Email,
    string? Phone,
    string? Organization,
    string Category,
    string ItemDescription,
    string? EstimatedQuantity,
    string DeliveryMethod,
    string? City,
    string? Notes
);

public record SubmitInKindDonationResponse(
    Guid Id,
    string Message
);
