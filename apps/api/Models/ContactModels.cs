namespace Api.Models;

public record SubmitContactRequest(
    string Name,
    string Email,
    string Subject,
    string Message
);

public record SubmitContactResponse(
    Guid Id,
    string Message
);
