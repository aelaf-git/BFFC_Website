using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Services;

namespace Api.Endpoints;

public static class ContactEndpoints
{
    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contact").WithTags("Contact");

        group.MapPost("/", async (
            SubmitContactRequest request,
            IContactService contactService,
            ILogger<Program> logger) =>
        {
            try
            {
                var response = await contactService.SubmitAsync(request);
                return Results.Ok(response);
            }
            catch (ValidationException ex)
            {
                return Results.BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to submit contact message.");
                return Results.Problem("Unable to submit your message right now. Please try again later.");
            }
        })
        .WithName("SubmitContact")
        .RequireRateLimiting("form-submissions");

        return app;
    }
}
