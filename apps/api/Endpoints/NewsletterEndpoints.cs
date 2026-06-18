using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Services;

namespace Api.Endpoints;

public static class NewsletterEndpoints
{
    public static IEndpointRouteBuilder MapNewsletterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/newsletter").WithTags("Newsletter");

        group.MapPost("/subscribe", async (
            SubscribeNewsletterRequest request,
            INewsletterService newsletterService,
            ILogger<Program> logger) =>
        {
            try
            {
                var response = await newsletterService.SubscribeAsync(request);
                return Results.Ok(response);
            }
            catch (ValidationException ex)
            {
                return Results.BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to subscribe to newsletter.");
                return Results.Problem("Unable to subscribe right now. Please try again later.");
            }
        })
        .WithName("SubscribeNewsletter")
        .RequireRateLimiting("form-submissions");

        return app;
    }
}
