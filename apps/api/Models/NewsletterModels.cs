namespace Api.Models;

public record SubscribeNewsletterRequest(
    string Email,
    string? Source
);

public record SubscribeNewsletterResponse(
    string Message,
    bool AlreadySubscribed
);
