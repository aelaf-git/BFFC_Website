namespace Api.Models;

/// <summary>
/// Data required to generate and send an official CRA-style donation receipt.
/// </summary>
public record TaxReceiptInfo(
    string ReceiptNumber,
    string DonorName,
    string DonorEmail,
    long   AmountCents,
    string Currency,
    DateTime DonationDate,
    string PaymentReference,
    string DonationType   // "One-time" | "Monthly"
);

public record CharityInfo(
    string Name,
    string RegistrationNumber,
    string Street,
    string City,
    string Province,
    string PostalCode,
    string Country,
    string Email,
    string Phone
);
