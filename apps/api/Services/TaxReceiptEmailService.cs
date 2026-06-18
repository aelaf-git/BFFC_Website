using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Api.Models;

namespace Api.Services;

public class TaxReceiptEmailService : IEmailService
{
    private readonly HttpClient _http;
    private readonly CharityInfo _charity;
    private readonly string? _apiKey;
    private readonly string _fromAddress;
    private readonly string _fromName;
    private readonly ILogger<TaxReceiptEmailService> _logger;

    public TaxReceiptEmailService(
        HttpClient http,
        IConfiguration config,
        ILogger<TaxReceiptEmailService> logger)
    {
        _http   = http;
        _logger = logger;

        _apiKey      = config["Email:ApiKey"];
        _fromAddress = config["Email:FromAddress"] ?? "receipts@bffcglobal.org";
        _fromName    = config["Email:FromName"]    ?? "Bright Future For Children Ethiopia";

        _charity = new CharityInfo(
            Name:               config["Charity:Name"]               ?? "Bright Future For Children Ethiopia",
            RegistrationNumber: config["Charity:RegistrationNumber"] ?? "726794944RR0001",
            Street:             config["Charity:Street"]             ?? "303-1835 10 Ave SE",
            City:               config["Charity:City"]               ?? "Calgary",
            Province:           config["Charity:Province"]           ?? "Alberta",
            PostalCode:         config["Charity:PostalCode"]         ?? "T2G 5N7",
            Country:            config["Charity:Country"]            ?? "Canada",
            Email:              config["Charity:Email"]              ?? "info@bffcglobal.org",
            Phone:              config["Charity:Phone"]              ?? "+1 825 454 5383"
        );
    }

    public async Task SendTaxReceiptAsync(TaxReceiptInfo receipt, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            _logger.LogWarning(
                "Email:ApiKey is not configured — tax receipt for {Email} ({ReceiptNumber}) was not sent.",
                receipt.DonorEmail, receipt.ReceiptNumber);
            return;
        }

        var amount = FormatAmount(receipt.AmountCents, receipt.Currency);
        var subject = $"Your official tax receipt — {_charity.Name}";

        var payload = new
        {
            from    = $"{_fromName} <{_fromAddress}>",
            to      = new[] { receipt.DonorEmail },
            subject,
            html    = BuildHtml(receipt, amount),
            text    = BuildPlainText(receipt, amount),
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
                "Failed to send tax receipt {ReceiptNumber} to {Email}: {Status} {Body}",
                receipt.ReceiptNumber, receipt.DonorEmail, response.StatusCode, body);
            return;
        }

        _logger.LogInformation(
            "Tax receipt {ReceiptNumber} sent to {Email} ({Amount})",
            receipt.ReceiptNumber, receipt.DonorEmail, amount);
    }

    private string BuildPlainText(TaxReceiptInfo receipt, string amount)
    {
        var issued = DateTime.UtcNow.ToString("MMMM d, yyyy", CultureInfo.InvariantCulture);
        var donated = receipt.DonationDate.ToString("MMMM d, yyyy", CultureInfo.InvariantCulture);

        return $"""
            OFFICIAL DONATION RECEIPT
            =========================

            Receipt No.: {receipt.ReceiptNumber}
            Date of gift: {donated}
            Date issued: {issued}

            Registered Charity
            ------------------
            {_charity.Name}
            CRA Registration No.: {_charity.RegistrationNumber}
            {_charity.Street}
            {_charity.City}, {_charity.Province} {_charity.PostalCode}
            {_charity.Country}
            {_charity.Email} | {_charity.Phone}

            Donor
            -----
            {receipt.DonorName}
            {receipt.DonorEmail}

            Gift Details
            ------------
            Amount: {amount}
            Type: {receipt.DonationType} donation
            Reference: {receipt.PaymentReference}

            No goods or services were provided in exchange for this gift.

            This receipt is official for income tax purposes in Canada.
            Eligible donors resident in Canada may claim a charitable donation
            tax credit in accordance with CRA guidelines.

            Questions? Contact us at {_charity.Email}
            """;
    }

    private string BuildHtml(TaxReceiptInfo receipt, string amount)
    {
        var issued  = DateTime.UtcNow.ToString("MMMM d, yyyy", CultureInfo.InvariantCulture);
        var donated = receipt.DonationDate.ToString("MMMM d, yyyy", CultureInfo.InvariantCulture);
        var esc = (string s) => System.Net.WebUtility.HtmlEncode(s);

        return $"""
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
            <body style="margin:0;padding:0;background:#f4f4f5;font-family:Georgia,'Times New Roman',serif;color:#18181b;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
                <tr><td align="center">
                  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;">
                    <tr>
                      <td style="background:#b91c1c;padding:28px 32px;text-align:center;">
                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#fecaca;">Official Donation Receipt</p>
                        <h1 style="margin:0;font-size:22px;font-weight:normal;color:#ffffff;">{esc(_charity.Name)}</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:32px;">
                        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#52525b;">
                          Dear {esc(receipt.DonorName)},<br><br>
                          Thank you for your generous gift. Please keep this receipt for your tax records.
                        </p>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e4e4e7;border-radius:6px;">
                          <tr>
                            <td style="padding:16px 20px;border-bottom:1px solid #e4e4e7;background:#fafafa;">
                              <strong style="font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.05em;">Receipt Details</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:20px;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:2;">
                                <tr><td style="color:#71717a;width:45%;">Receipt number</td><td style="font-weight:bold;">{esc(receipt.ReceiptNumber)}</td></tr>
                                <tr><td style="color:#71717a;">Date of gift</td><td>{esc(donated)}</td></tr>
                                <tr><td style="color:#71717a;">Date issued</td><td>{esc(issued)}</td></tr>
                                <tr><td style="color:#71717a;">Amount</td><td style="font-size:18px;font-weight:bold;color:#b91c1c;">{esc(amount)}</td></tr>
                                <tr><td style="color:#71717a;">Donation type</td><td>{esc(receipt.DonationType)}</td></tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e4e4e7;border-radius:6px;">
                          <tr>
                            <td style="padding:16px 20px;border-bottom:1px solid #e4e4e7;background:#fafafa;">
                              <strong style="font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.05em;">Registered Charity</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:20px;font-size:14px;line-height:1.7;">
                              <strong>{esc(_charity.Name)}</strong><br>
                              CRA Registration No. {esc(_charity.RegistrationNumber)}<br>
                              {esc(_charity.Street)}<br>
                              {esc(_charity.City)}, {esc(_charity.Province)} {esc(_charity.PostalCode)}<br>
                              {esc(_charity.Country)}
                            </td>
                          </tr>
                        </table>

                        <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#52525b;font-style:italic;">
                          No goods or services were provided in exchange for this gift.
                        </p>
                        <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#52525b;">
                          This receipt is official for income tax purposes in Canada. Eligible donors resident
                          in Canada may claim a charitable donation tax credit in accordance with CRA guidelines.
                        </p>

                        <p style="margin:0;font-size:13px;color:#a1a1aa;">
                          Questions? <a href="mailto:{esc(_charity.Email)}" style="color:#b91c1c;">{esc(_charity.Email)}</a>
                          &nbsp;·&nbsp; {esc(_charity.Phone)}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td></tr>
              </table>
            </body>
            </html>
            """;
    }

    private static string FormatAmount(long amountCents, string currency)
    {
        var amount = amountCents / 100m;
        var code   = currency.ToUpperInvariant();
        return code switch
        {
            "CAD" => amount.ToString("C", CultureInfo.GetCultureInfo("en-CA")),
            "USD" => amount.ToString("C", CultureInfo.GetCultureInfo("en-US")),
            _     => $"{amount:F2} {code}",
        };
    }
}
