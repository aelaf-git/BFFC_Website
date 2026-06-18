namespace Api.Entities;

public enum NewsletterStatus
{
    Active,
    Unsubscribed,
}

public class NewsletterSubscription
{
    public Guid Id { get; set; }

    public string Email { get; set; } = string.Empty;

    public NewsletterStatus Status { get; set; }

    public string Source { get; set; } = "footer";

    public DateTimeOffset SubscribedAt { get; set; }

    public DateTimeOffset? UnsubscribedAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
}
