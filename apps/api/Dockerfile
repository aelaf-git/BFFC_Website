# ── Build stage ───────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Restore as a separate layer so dependencies are cached unless api.csproj changes.
COPY api.csproj .
RUN dotnet restore

# Copy the rest of the source and publish a Release build.
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# ── Dev stage (hot reload via `dotnet watch`) ─────────────────────────────────
# Used by docker compose for local development. Source is synced in by Compose's
# `develop.watch`, and dotnet watch recompiles on change (polling for container FS).
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS dev
WORKDIR /src
ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Development \
    DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_USE_POLLING_FILE_WATCHER=1
EXPOSE 8080
COPY api.csproj .
RUN dotnet restore
COPY . .
# --no-launch-profile ignores Properties/launchSettings.json (which pins
# localhost:5000) so Kestrel uses ASPNETCORE_URLS (http://+:8080) instead.
ENTRYPOINT ["dotnet", "watch", "run", "--non-interactive", "--no-launch-profile"]

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Azure App Service routes to the port in WEBSITES_PORT (set it to 8080).
# Kestrel listens on 8080 for all interfaces inside the container.
ENV ASPNETCORE_URLS=http://+:8080 \
    DOTNET_RUNNING_IN_CONTAINER=true
EXPOSE 8080

# Run as the non-root user that ships with the .NET base image.
USER $APP_UID

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "api.dll"]
