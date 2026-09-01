using Api.Entities;

namespace Api.Services;

public interface IContactNotificationEmailService
{
    Task SendAsync(ContactMessage message, CancellationToken ct = default);
}
