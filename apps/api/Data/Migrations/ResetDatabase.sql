-- Drops all BFFC API tables and migration history so you can start fresh.
-- Run in Render Postgres shell or any psql client connected to bffc-db
-- WARNING: deletes all data in these tables.

DROP TABLE IF EXISTS in_kind_donations CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;
DROP TABLE IF EXISTS processed_stripe_events CASCADE;
DROP TABLE IF EXISTS "__EFMigrationsHistory" CASCADE;
