using System.ComponentModel.DataAnnotations;
using Api.Data;
using Api.Entities;
using Api.Models;

namespace Api.Services;

public interface IContactService
{
    Task<SubmitContactResponse> SubmitAsync(SubmitContactRequest request, CancellationToken ct = default);
}

public class ContactService : IContactService
{
    private readonly AppDbContext _db;
    private readonly IContactNotificationEmailService _notificationEmail;
    private readonly ILogger<ContactService> _logger;

    public ContactService(
        AppDbContext db,
        IContactNotificationEmailService notificationEmail,
        ILogger<ContactService> logger)
    {
        _db = db;
        _notificationEmail = notificationEmail;
        _logger = logger;
    }

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

        try
        {
            await _notificationEmail.SendAsync(message, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Contact message {Id} was saved but the notification email could not be sent.",
                message.Id);
        }

        return new SubmitContactResponse(message.Id, "Your message has been received. We will get back to you soon.");
    }

    private static void ValidateContactRequest(SubmitContactRequest request)
    {
        var name = InputSanitizer.Require(request.Name, "Name");
        InputSanitizer.MaxLength(name, 200, "Name");

        if (string.IsNullOrWhiteSpace(request.Email) || !InputSanitizer.IsValidEmail(request.Email.Trim()))
            throw new ValidationException("A valid email address is required.");
        InputSanitizer.MaxLength(request.Email.Trim(), 320, "Email");

        var subject = InputSanitizer.Require(request.Subject, "Subject");
        InputSanitizer.MaxLength(subject, 300, "Subject");

        if (string.IsNullOrWhiteSpace(request.Message))
            throw new ValidationException("Message is required.");

        if (request.Message.Trim().Length > 5000)
            throw new ValidationException("Message must be 5000 characters or fewer.");
    }
}
