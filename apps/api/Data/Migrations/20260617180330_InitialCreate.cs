using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "contact_messages",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    subject = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    message = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: false),
                    status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contact_messages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "donations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    donor_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    donor_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    phone_number = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    amount_cents = table.Column<long>(type: "bigint", nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    donation_type = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    stripe_payment_intent_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    stripe_invoice_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    stripe_subscription_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    stripe_customer_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    receipt_number = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    donated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_donations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "newsletter_subscriptions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    source = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    subscribed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    unsubscribed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_newsletter_subscriptions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "processed_stripe_events",
                columns: table => new
                {
                    stripe_event_id = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    event_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    processed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_processed_stripe_events", x => x.stripe_event_id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_contact_messages_created_at",
                table: "contact_messages",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "ix_contact_messages_status",
                table: "contact_messages",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_donations_donated_at",
                table: "donations",
                column: "donated_at");

            migrationBuilder.CreateIndex(
                name: "ix_donations_donor_email",
                table: "donations",
                column: "donor_email");

            migrationBuilder.CreateIndex(
                name: "ix_donations_stripe_invoice_id",
                table: "donations",
                column: "stripe_invoice_id",
                unique: true,
                filter: "stripe_invoice_id IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "ix_donations_stripe_payment_intent_id",
                table: "donations",
                column: "stripe_payment_intent_id",
                unique: true,
                filter: "stripe_payment_intent_id IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "ix_newsletter_subscriptions_email",
                table: "newsletter_subscriptions",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contact_messages");

            migrationBuilder.DropTable(
                name: "donations");

            migrationBuilder.DropTable(
                name: "newsletter_subscriptions");

            migrationBuilder.DropTable(
                name: "processed_stripe_events");
        }
    }
}
