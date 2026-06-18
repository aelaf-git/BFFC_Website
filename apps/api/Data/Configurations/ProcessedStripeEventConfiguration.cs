using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations;

public class ProcessedStripeEventConfiguration : IEntityTypeConfiguration<ProcessedStripeEvent>
{
    public void Configure(EntityTypeBuilder<ProcessedStripeEvent> builder)
    {
        builder.ToTable("processed_stripe_events");

        builder.HasKey(e => e.StripeEventId);

        builder.Property(e => e.StripeEventId)
            .HasMaxLength(255);

        builder.Property(e => e.EventType)
            .HasMaxLength(100)
            .IsRequired();
    }
}
