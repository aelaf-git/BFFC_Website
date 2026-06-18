namespace Api.Entities;

public enum ContactMessageStatus
{
    New,
    Read,
    Archived,
}

public class ContactMessage
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Subject { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public ContactMessageStatus Status { get; set; }

    public DateTimeOffset CreatedAt { get; set; }
}
