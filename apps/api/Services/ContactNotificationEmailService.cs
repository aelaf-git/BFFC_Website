using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Api.Entities;

namespace Api.Services;

public class ContactNotificationEmailService : IContactNotificationEmailService
{
    private readonly HttpClient _http;
    private readonly string? _apiKey;
    private readonly string _fromAddress;
    private readonly string _fromName;
    private readonly string _notifyAddress;
    private readonly ILogger<ContactNotificationEmailService> _logger;

    public ContactNotificationEmailService(
        HttpClient http,
        IConfiguration config,
        ILogger<ContactNotificationEmailService> logger)
    {
        _http = http;
        _logger = logger;

        _apiKey = config["Email:ApiKey"];
        _fromAddress = config["Email:FromAddress"] ?? "receipts@bffcglobal.org";
        _fromName = config["Email:FromName"] ?? "Bright Future for Children";
        _notifyAddress = config["Email:ContactNotifyAddress"]
            ?? config["Charity:Email"]
            ?? "info@bffcglobal.org";
    }

    public async Task SendAsync(ContactMessage message, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            _logger.LogWarning(
                "Email:ApiKey is not configured — contact notification for {Id} was not sent.",
                message.Id);
            return;
        }

        var subject = $"New contact form message: {message.Subject}";
        var payload = new
        {
            from = $"{_fromName} <{_fromAddress}>",
            to = new[] { _notifyAddress },
            reply_to = message.Email,
            subject,
            html = BuildHtml(message),
            text = BuildPlainText(message),
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        request.Content = new StringContent(
            JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            "application/json");

        var response = await _http.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync(ct);
            _logger.LogError(
                "Failed to send contact notification {Id} to {NotifyAddress}: {Status} {Body}",
                message.Id, _notifyAddress, response.StatusCode, body);
            return;
        }

        _logger.LogInformation(
            "Contact notification {Id} sent to {NotifyAddress} (from {Email})",
            message.Id, _notifyAddress, message.Email);
    }

    private static string BuildPlainText(ContactMessage message)
    {
        return $"""
            New contact form submission
            =============================

            Reference: {message.Id}
            Received:  {message.CreatedAt:u}

            Name:    {message.Name}
            Email:   {message.Email}
            Subject: {message.Subject}

            Message
            -------
            {message.Message}
            """;
    }

    private static string BuildHtml(ContactMessage message)
    {
        var esc = (string s) => System.Net.WebUtility.HtmlEncode(s);

        return $"""
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="utf-8"></head>
            <body style="margin:0;padding:24px;font-family:Arial,sans-serif;color:#18181b;background:#f4f4f5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;">
                <tr>
                  <td style="padding:24px;background:#b91c1c;color:#ffffff;">
                    <h1 style="margin:0;font-size:20px;font-weight:normal;">New contact form message</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;font-size:14px;line-height:1.6;">
                    <p style="margin:0 0 16px;"><strong>Reference:</strong> {esc(message.Id.ToString())}<br>
                    <strong>Received:</strong> {esc(message.CreatedAt.ToString("u"))}</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;font-size:14px;line-height:1.8;">
                      <tr><td style="color:#71717a;width:30%;">Name</td><td>{esc(message.Name)}</td></tr>
                      <tr><td style="color:#71717a;">Email</td><td><a href="mailto:{esc(message.Email)}">{esc(message.Email)}</a></td></tr>
                      <tr><td style="color:#71717a;">Subject</td><td>{esc(message.Subject)}</td></tr>
                    </table>
                    <p style="margin:0 0 8px;font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
                    <div style="padding:16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:6px;white-space:pre-wrap;">{esc(message.Message)}</div>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;
    }
}
