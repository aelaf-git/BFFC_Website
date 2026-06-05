using Api.Models;

namespace Api.Services;

public interface IStripeService
{
    Task<CreatePaymentIntentResponse> CreatePaymentIntentAsync(CreatePaymentIntentRequest request);
}
