using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IInKindDonationService
{
    Task<SubmitInKindDonationResponse> SubmitAsync(
        SubmitInKindDonationRequest request,
        CancellationToken ct = default);
}

public class InKindDonationService : IInKindDonationService
{
    private static readonly HashSet<string> AllowedCategories = new(StringComparer.OrdinalIgnoreCase)
    {
        "school-supplies",
        "food-nutrition",
        "clothing",
        "equipment",
        "other",
    };

    private static readonly HashSet<string> AllowedDeliveryMethods = new(StringComparer.OrdinalIgnoreCase)
    {
        "drop-off",
        "pickup",
        "shipping",
        "discuss",
    };

    private readonly AppDbContext _db;

    public InKindDonationService(AppDbContext db) => _db = db;

    public async Task<SubmitInKindDonationResponse> SubmitAsync(
        SubmitInKindDonationRequest request,
        CancellationToken ct = default)
    {
        ValidateRequest(request);

        var donation = new InKindDonation
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            Phone = NormalizeOptional(request.Phone),
            Organization = NormalizeOptional(request.Organization),
            Category = request.Category.Trim().ToLowerInvariant(),
            ItemDescription = request.ItemDescription.Trim(),
            EstimatedQuantity = NormalizeOptional(request.EstimatedQuantity),
            DeliveryMethod = request.DeliveryMethod.Trim().ToLowerInvariant(),
            City = NormalizeOptional(request.City),
            Notes = NormalizeOptional(request.Notes),
            Status = InKindDonationStatus.New,
            CreatedAt = DateTimeOffset.UtcNow,
        };

        _db.InKindDonations.Add(donation);
        await _db.SaveChangesAsync(ct);

        return new SubmitInKindDonationResponse(
            donation.Id,
            "Thank you. Your in-kind donation offer has been received. Our team will contact you shortly.");
    }

    private static void ValidateRequest(SubmitInKindDonationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new ValidationException("Name is required.");

        if (string.IsNullOrWhiteSpace(request.Email) || !IsValidEmail(request.Email))
            throw new ValidationException("A valid email address is required.");

        if (string.IsNullOrWhiteSpace(request.Category) || !AllowedCategories.Contains(request.Category))
            throw new ValidationException("Please select a donation category.");

        if (string.IsNullOrWhiteSpace(request.ItemDescription))
            throw new ValidationException("Please describe what you would like to donate.");

        if (request.ItemDescription.Length > 2000)
            throw new ValidationException("Item description must be 2000 characters or fewer.");

        if (string.IsNullOrWhiteSpace(request.DeliveryMethod) || !AllowedDeliveryMethods.Contains(request.DeliveryMethod))
            throw new ValidationException("Please select how you plan to deliver the donation.");

        if (!string.IsNullOrWhiteSpace(request.Notes) && request.Notes.Length > 2000)
            throw new ValidationException("Additional notes must be 2000 characters or fewer.");
    }

    private static string? NormalizeOptional(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        return value.Trim();
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            _ = new MailAddress(email);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
