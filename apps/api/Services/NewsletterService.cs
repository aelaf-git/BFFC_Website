using System.ComponentModel.DataAnnotations;
using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public interface INewsletterService
{
    Task<SubscribeNewsletterResponse> SubscribeAsync(
        SubscribeNewsletterRequest request,
        CancellationToken ct = default);
}

public class NewsletterService : INewsletterService
{
    private readonly AppDbContext _db;

    public NewsletterService(AppDbContext db) => _db = db;

    public async Task<SubscribeNewsletterResponse> SubscribeAsync(
        SubscribeNewsletterRequest request,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || !InputSanitizer.IsValidEmail(request.Email.Trim()))
            throw new ValidationException("A valid email address is required.");

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        InputSanitizer.MaxLength(normalizedEmail, 320, "Email");

        var source = string.IsNullOrWhiteSpace(request.Source) ? "footer" : request.Source.Trim();
        InputSanitizer.RejectNewlines(source, "Source");
        InputSanitizer.MaxLength(source, 50, "Source");
        var now = DateTimeOffset.UtcNow;

        var existing = await _db.NewsletterSubscriptions
            .FirstOrDefaultAsync(s => s.Email == normalizedEmail, ct);

        if (existing is not null)
        {
            if (existing.Status == NewsletterStatus.Active)
            {
                return new SubscribeNewsletterResponse(
                    "Thank you for subscribing to our newsletter.",
                    AlreadySubscribed: false);
            }

            existing.Status = NewsletterStatus.Active;
            existing.SubscribedAt = now;
            existing.UnsubscribedAt = null;
            existing.Source = source;
            await _db.SaveChangesAsync(ct);

            return new SubscribeNewsletterResponse(
                "Thank you for subscribing to our newsletter.",
                AlreadySubscribed: false);
        }

        _db.NewsletterSubscriptions.Add(new NewsletterSubscription
        {
            Id = Guid.NewGuid(),
            Email = normalizedEmail,
            Status = NewsletterStatus.Active,
            Source = source,
            SubscribedAt = now,
            CreatedAt = now,
        });

        await _db.SaveChangesAsync(ct);

        return new SubscribeNewsletterResponse(
            "Thank you for subscribing to our newsletter.",
            AlreadySubscribed: false);
    }
}
