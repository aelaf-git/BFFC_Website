using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations;

public class InKindDonationConfiguration : IEntityTypeConfiguration<InKindDonation>
{
    public void Configure(EntityTypeBuilder<InKindDonation> builder)
    {
        builder.ToTable("in_kind_donations");

        builder.HasKey(d => d.Id);

        builder.Property(d => d.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(d => d.Email)
            .HasMaxLength(320)
            .IsRequired();

        builder.Property(d => d.Phone)
            .HasMaxLength(30);

        builder.Property(d => d.Organization)
            .HasMaxLength(200);

        builder.Property(d => d.Category)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(d => d.ItemDescription)
            .HasMaxLength(2000)
            .IsRequired();

        builder.Property(d => d.EstimatedQuantity)
            .HasMaxLength(200);

        builder.Property(d => d.DeliveryMethod)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(d => d.City)
            .HasMaxLength(120);

        builder.Property(d => d.Notes)
            .HasMaxLength(2000);

        builder.Property(d => d.Status)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();

        builder.HasIndex(d => d.Status);
        builder.HasIndex(d => d.CreatedAt);
    }
}
