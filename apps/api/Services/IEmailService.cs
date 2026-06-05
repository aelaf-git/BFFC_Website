using Api.Models;

namespace Api.Services;

public interface IEmailService
{
    Task SendTaxReceiptAsync(TaxReceiptInfo receipt, CancellationToken ct = default);
}
