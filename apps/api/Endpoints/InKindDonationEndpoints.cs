using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Services;

namespace Api.Endpoints;

public static class InKindDonationEndpoints
{
    public static IEndpointRouteBuilder MapInKindDonationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/in-kind-donations").WithTags("In-Kind Donations");

        group.MapPost("/", async (
            SubmitInKindDonationRequest request,
            IInKindDonationService inKindDonationService,
            ILogger<Program> logger) =>
        {
            try
            {
                var response = await inKindDonationService.SubmitAsync(request);
                return Results.Ok(response);
            }
            catch (ValidationException ex)
            {
                return Results.BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to submit in-kind donation offer.");
                return Results.Problem("Unable to submit your offer right now. Please try again later.");
            }
        })
        .WithName("SubmitInKindDonation")
        .RequireRateLimiting("form-submissions");

        return app;
    }
}
