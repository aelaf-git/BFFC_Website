using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations;

public class DonationConfiguration : IEntityTypeConfiguration<Donation>
{
    public void Configure(EntityTypeBuilder<Donation> builder)
    {
        builder.ToTable("donations");

        builder.HasKey(d => d.Id);

        builder.Property(d => d.DonorName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(d => d.DonorEmail)
            .HasMaxLength(320)
            .IsRequired();

        builder.Property(d => d.PhoneNumber)
            .HasMaxLength(30);

        builder.Property(d => d.Currency)
            .HasMaxLength(3)
            .IsRequired();

        builder.Property(d => d.DonationType)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(d => d.Status)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(d => d.StripePaymentIntentId)
            .HasMaxLength(255);

        builder.Property(d => d.StripeInvoiceId)
            .HasMaxLength(255);

        builder.Property(d => d.StripeSubscriptionId)
            .HasMaxLength(255);

        builder.Property(d => d.StripeCustomerId)
            .HasMaxLength(255);

        builder.Property(d => d.ReceiptNumber)
            .HasMaxLength(100);

        builder.HasIndex(d => d.DonorEmail);
        builder.HasIndex(d => d.DonatedAt);

        builder.HasIndex(d => d.StripePaymentIntentId)
            .IsUnique()
            .HasFilter("stripe_payment_intent_id IS NOT NULL");

        builder.HasIndex(d => d.StripeInvoiceId)
            .IsUnique()
            .HasFilter("stripe_invoice_id IS NOT NULL");
    }
}
