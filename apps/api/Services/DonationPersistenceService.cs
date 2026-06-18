using System.Globalization;
using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace Api.Services;

public interface IDonationPersistenceService
{
    Task<bool> TryMarkEventProcessedAsync(string stripeEventId, string eventType, CancellationToken ct = default);

    Task PersistSucceededPaymentIntentAsync(PaymentIntent pi, CancellationToken ct = default);

    Task PersistFailedPaymentIntentAsync(PaymentIntent pi, CancellationToken ct = default);

    Task PersistSucceededInvoiceAsync(Invoice inv, StripeClient stripe, CancellationToken ct = default);
}

public class DonationPersistenceService : IDonationPersistenceService
{
    private readonly AppDbContext _db;

    public DonationPersistenceService(AppDbContext db) => _db = db;

    public async Task<bool> TryMarkEventProcessedAsync(
        string stripeEventId,
        string eventType,
        CancellationToken ct = default)
    {
        var exists = await _db.ProcessedStripeEvents
            .AnyAsync(e => e.StripeEventId == stripeEventId, ct);

        if (exists)
            return false;

        _db.ProcessedStripeEvents.Add(new ProcessedStripeEvent
        {
            StripeEventId = stripeEventId,
            EventType = eventType,
            ProcessedAt = DateTimeOffset.UtcNow,
        });

        try
        {
            await _db.SaveChangesAsync(ct);
            return true;
        }
        catch (DbUpdateException)
        {
            _db.ChangeTracker.Clear();
            return false;
        }
    }

    public async Task PersistSucceededPaymentIntentAsync(PaymentIntent pi, CancellationToken ct = default)
    {
        if (pi.Metadata.GetValueOrDefault("mode") != "one-time")
            return;

        var existing = await _db.Donations
            .FirstOrDefaultAsync(d => d.StripePaymentIntentId == pi.Id, ct);

        if (existing is not null)
            return;

        var now = DateTimeOffset.UtcNow;
        var donatedAt = ToUtcOffset(pi.Created);

        _db.Donations.Add(new Donation
        {
            Id = Guid.NewGuid(),
            DonorName = pi.Metadata.GetValueOrDefault("donor_name") ?? "Donor",
            DonorEmail = pi.ReceiptEmail
                ?? pi.Metadata.GetValueOrDefault("donor_email")
                ?? string.Empty,
            PhoneNumber = pi.Metadata.GetValueOrDefault("phone_number"),
            AmountCents = pi.Amount,
            Currency = pi.Currency,
            DonationType = DonationType.OneTime,
            Status = DonationStatus.Succeeded,
            StripePaymentIntentId = pi.Id,
            ReceiptNumber = FormatReceiptNumber(pi.Id, donatedAt),
            DonatedAt = donatedAt,
            CreatedAt = now,
            UpdatedAt = now,
        });

        await _db.SaveChangesAsync(ct);
    }

    public async Task PersistFailedPaymentIntentAsync(PaymentIntent pi, CancellationToken ct = default)
    {
        if (pi.Metadata.GetValueOrDefault("mode") != "one-time")
            return;

        var existing = await _db.Donations
            .FirstOrDefaultAsync(d => d.StripePaymentIntentId == pi.Id, ct);

        var now = DateTimeOffset.UtcNow;
        var donatedAt = ToUtcOffset(pi.Created);

        if (existing is null)
        {
            _db.Donations.Add(new Donation
            {
                Id = Guid.NewGuid(),
                DonorName = pi.Metadata.GetValueOrDefault("donor_name") ?? "Donor",
                DonorEmail = pi.ReceiptEmail
                    ?? pi.Metadata.GetValueOrDefault("donor_email")
                    ?? string.Empty,
                PhoneNumber = pi.Metadata.GetValueOrDefault("phone_number"),
                AmountCents = pi.Amount,
                Currency = pi.Currency,
                DonationType = DonationType.OneTime,
                Status = DonationStatus.Failed,
                StripePaymentIntentId = pi.Id,
                DonatedAt = donatedAt,
                CreatedAt = now,
                UpdatedAt = now,
            });
        }
        else
        {
            existing.Status = DonationStatus.Failed;
            existing.UpdatedAt = now;
        }

        await _db.SaveChangesAsync(ct);
    }

    public async Task PersistSucceededInvoiceAsync(
        Invoice inv,
        StripeClient stripe,
        CancellationToken ct = default)
    {
        if (inv.AmountPaid <= 0)
            return;

        var existing = await _db.Donations
            .FirstOrDefaultAsync(d => d.StripeInvoiceId == inv.Id, ct);

        if (existing is not null)
            return;

        var email = inv.CustomerEmail ?? string.Empty;
        var donorName = "Donor";

        if (inv.Customer is not null && !string.IsNullOrWhiteSpace(inv.Customer.Name))
            donorName = inv.Customer.Name;
        else if (!string.IsNullOrWhiteSpace(inv.CustomerId))
        {
            var customer = await new CustomerService(stripe).GetAsync(inv.CustomerId, cancellationToken: ct);
            donorName = customer.Name ?? donorName;
        }

        var donatedAt = ToUtcOffset(inv.StatusTransitions?.PaidAt ?? inv.Created);

        var now = DateTimeOffset.UtcNow;

        _db.Donations.Add(new Donation
        {
            Id = Guid.NewGuid(),
            DonorName = donorName,
            DonorEmail = email,
            AmountCents = inv.AmountPaid,
            Currency = inv.Currency,
            DonationType = DonationType.Monthly,
            Status = DonationStatus.Succeeded,
            StripeInvoiceId = inv.Id,
            StripeSubscriptionId = inv.Parent?.SubscriptionDetails?.Subscription?.Id,
            StripeCustomerId = inv.CustomerId,
            ReceiptNumber = FormatReceiptNumber(inv.Id, donatedAt),
            DonatedAt = donatedAt,
            CreatedAt = now,
            UpdatedAt = now,
        });

        await _db.SaveChangesAsync(ct);
    }

    private static string FormatReceiptNumber(string stripeId, DateTimeOffset date) =>
        $"BFFC-{date.ToString("yyyyMMdd", CultureInfo.InvariantCulture)}-{stripeId[^8..].ToUpperInvariant()}";

    private static DateTimeOffset ToUtcOffset(DateTime value) =>
        new(DateTime.SpecifyKind(value, DateTimeKind.Utc));
}
