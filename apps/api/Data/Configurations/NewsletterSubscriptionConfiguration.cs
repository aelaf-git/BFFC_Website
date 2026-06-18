using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations;

public class NewsletterSubscriptionConfiguration : IEntityTypeConfiguration<NewsletterSubscription>
{
    public void Configure(EntityTypeBuilder<NewsletterSubscription> builder)
    {
        builder.ToTable("newsletter_subscriptions");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Email)
            .HasMaxLength(320)
            .IsRequired();

        builder.Property(s => s.Status)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(s => s.Source)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(s => s.Email)
            .IsUnique();
    }
}
