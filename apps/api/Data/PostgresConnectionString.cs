using Npgsql;

namespace Api.Data;

/// <summary>
/// Render (and many PaaS providers) supply Postgres as a URI
/// (postgresql://user:pass@host:port/db). Npgsql EF Core expects key=value format.
/// </summary>
public static class PostgresConnectionString
{
    public static string Normalize(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException(
                "ConnectionStrings:DefaultConnection is not set. " +
                "On Render, link bffc-db to bffc-api (Blueprint or Environment → fromDatabase).");
        }

        var connectionString = value.Trim().Trim('"');

        if (!connectionString.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase)
            && !connectionString.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
        {
            return connectionString;
        }

        var uri = new Uri(connectionString);
        var userInfo = uri.UserInfo.Split(':', 2);

        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port > 0 ? uri.Port : 5432,
            Database = uri.AbsolutePath.TrimStart('/'),
            Username = Uri.UnescapeDataString(userInfo[0]),
            Password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : string.Empty,
        };

        if (string.IsNullOrEmpty(uri.Query))
        {
            // Render internal URLs use the private network; Prefer avoids SSL handshake issues.
            builder.SslMode = SslMode.Prefer;
        }
        else
        {
            foreach (var part in uri.Query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
            {
                var separator = part.IndexOf('=');
                if (separator <= 0) continue;

                var key = part[..separator];
                var rawValue = part[(separator + 1)..];
                var parsedValue = Uri.UnescapeDataString(rawValue);

                if (key.Equals("sslmode", StringComparison.OrdinalIgnoreCase)
                    && Enum.TryParse<SslMode>(parsedValue, ignoreCase: true, out var sslMode))
                {
                    builder.SslMode = sslMode;
                }
            }
        }

        return builder.ConnectionString;
    }
}
