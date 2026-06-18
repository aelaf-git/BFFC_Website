using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
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
        if (string.IsNullOrWhiteSpace(request.Email) || !IsValidEmail(request.Email))
            throw new ValidationException("A valid email address is required.");

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var source = string.IsNullOrWhiteSpace(request.Source) ? "footer" : request.Source.Trim();
        var now = DateTimeOffset.UtcNow;

        var existing = await _db.NewsletterSubscriptions
            .FirstOrDefaultAsync(s => s.Email == normalizedEmail, ct);

        if (existing is not null)
        {
            if (existing.Status == NewsletterStatus.Active)
            {
                return new SubscribeNewsletterResponse(
                    "You are already subscribed to our newsletter.",
                    AlreadySubscribed: true);
            }

            existing.Status = NewsletterStatus.Active;
            existing.SubscribedAt = now;
            existing.UnsubscribedAt = null;
            existing.Source = source;
            await _db.SaveChangesAsync(ct);

            return new SubscribeNewsletterResponse(
                "Welcome back! You have been re-subscribed to our newsletter.",
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
