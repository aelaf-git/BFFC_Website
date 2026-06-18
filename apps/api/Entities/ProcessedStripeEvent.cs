namespace Api.Entities;

public class ProcessedStripeEvent
{
    public string StripeEventId { get; set; } = string.Empty;

    public string EventType { get; set; } = string.Empty;

    public DateTimeOffset ProcessedAt { get; set; }
}
