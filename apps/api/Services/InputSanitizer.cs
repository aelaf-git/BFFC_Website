using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace Api.Services;

public static class InputSanitizer
{
    public static void RejectNewlines(string value, string fieldName)
    {
        if (value.Contains('\r') || value.Contains('\n'))
            throw new ValidationException($"{fieldName} contains invalid characters.");
    }

    public static void MaxLength(string value, int max, string fieldName)
    {
        if (value.Length > max)
            throw new ValidationException($"{fieldName} must be {max} characters or fewer.");
    }

    public static string Require(string? value, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ValidationException($"{fieldName} is required.");

        var trimmed = value.Trim();
        RejectNewlines(trimmed, fieldName);
        return trimmed;
    }

    public static string? Optional(string? value, int max, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
            return null;

        var trimmed = value.Trim();
        RejectNewlines(trimmed, fieldName);
        MaxLength(trimmed, max, fieldName);
        return trimmed;
    }

    public static string StripNewlines(string value) =>
        value.Replace("\r", " ").Replace("\n", " ");

    public static bool IsValidEmail(string email)
    {
        try
        {
            RejectNewlines(email, "Email");
            _ = new MailAddress(email);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
