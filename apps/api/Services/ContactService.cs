using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface IContactService
{
    Task<SubmitContactResponse> SubmitAsync(SubmitContactRequest request, CancellationToken ct = default);
}

public class ContactService : IContactService
{
    private readonly AppDbContext _db;

    public ContactService(AppDbContext db) => _db = db;

    public async Task<SubmitContactResponse> SubmitAsync(
        SubmitContactRequest request,
        CancellationToken ct = default)
    {
        ValidateContactRequest(request);

        var message = new ContactMessage
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            Subject = request.Subject.Trim(),
            Message = request.Message.Trim(),
            Status = ContactMessageStatus.New,
            CreatedAt = DateTimeOffset.UtcNow,
        };

        _db.ContactMessages.Add(message);
        await _db.SaveChangesAsync(ct);

        return new SubmitContactResponse(message.Id, "Your message has been received. We will get back to you soon.");
    }

    private static void ValidateContactRequest(SubmitContactRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new ValidationException("Name is required.");

        if (string.IsNullOrWhiteSpace(request.Email) || !IsValidEmail(request.Email))
            throw new ValidationException("A valid email address is required.");

        if (string.IsNullOrWhiteSpace(request.Subject))
            throw new ValidationException("Subject is required.");

        if (string.IsNullOrWhiteSpace(request.Message))
            throw new ValidationException("Message is required.");

        if (request.Message.Length > 5000)
            throw new ValidationException("Message must be 5000 characters or fewer.");
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
