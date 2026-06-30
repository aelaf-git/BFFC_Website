CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    migration_id character varying(150) NOT NULL,
    product_version character varying(32) NOT NULL,
    CONSTRAINT pk___ef_migrations_history PRIMARY KEY (migration_id)
);

START TRANSACTION;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE TABLE contact_messages (
        id uuid NOT NULL,
        name character varying(200) NOT NULL,
        email character varying(320) NOT NULL,
        subject character varying(300) NOT NULL,
        message character varying(5000) NOT NULL,
        status character varying(20) NOT NULL,
        created_at timestamp with time zone NOT NULL,
        CONSTRAINT pk_contact_messages PRIMARY KEY (id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE TABLE donations (
        id uuid NOT NULL,
        donor_name character varying(200) NOT NULL,
        donor_email character varying(320) NOT NULL,
        phone_number character varying(30),
        amount_cents bigint NOT NULL,
        currency character varying(3) NOT NULL,
        donation_type character varying(20) NOT NULL,
        status character varying(20) NOT NULL,
        stripe_payment_intent_id character varying(255),
        stripe_invoice_id character varying(255),
        stripe_subscription_id character varying(255),
        stripe_customer_id character varying(255),
        receipt_number character varying(100),
        donated_at timestamp with time zone NOT NULL,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL,
        CONSTRAINT pk_donations PRIMARY KEY (id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE TABLE newsletter_subscriptions (
        id uuid NOT NULL,
        email character varying(320) NOT NULL,
        status character varying(20) NOT NULL,
        source character varying(50) NOT NULL,
        subscribed_at timestamp with time zone NOT NULL,
        unsubscribed_at timestamp with time zone,
        created_at timestamp with time zone NOT NULL,
        CONSTRAINT pk_newsletter_subscriptions PRIMARY KEY (id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE TABLE processed_stripe_events (
        stripe_event_id character varying(255) NOT NULL,
        event_type character varying(100) NOT NULL,
        processed_at timestamp with time zone NOT NULL,
        CONSTRAINT pk_processed_stripe_events PRIMARY KEY (stripe_event_id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE INDEX ix_contact_messages_created_at ON contact_messages (created_at);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE INDEX ix_contact_messages_status ON contact_messages (status);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE INDEX ix_donations_donated_at ON donations (donated_at);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE INDEX ix_donations_donor_email ON donations (donor_email);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE UNIQUE INDEX ix_donations_stripe_invoice_id ON donations (stripe_invoice_id) WHERE stripe_invoice_id IS NOT NULL;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE UNIQUE INDEX ix_donations_stripe_payment_intent_id ON donations (stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    CREATE UNIQUE INDEX ix_newsletter_subscriptions_email ON newsletter_subscriptions (email);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260617180330_InitialCreate') THEN
    INSERT INTO "__EFMigrationsHistory" (migration_id, product_version)
    VALUES ('20260617180330_InitialCreate', '10.0.1');
    END IF;
END $EF$;
COMMIT;

START TRANSACTION;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260627192300_AddInKindDonations') THEN
    CREATE TABLE in_kind_donations (
        id uuid NOT NULL,
        name character varying(200) NOT NULL,
        email character varying(320) NOT NULL,
        phone character varying(30),
        organization character varying(200),
        category character varying(50) NOT NULL,
        item_description character varying(2000) NOT NULL,
        estimated_quantity character varying(200),
        delivery_method character varying(30) NOT NULL,
        city character varying(120),
        notes character varying(2000),
        status character varying(20) NOT NULL,
        created_at timestamp with time zone NOT NULL,
        CONSTRAINT pk_in_kind_donations PRIMARY KEY (id)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260627192300_AddInKindDonations') THEN
    CREATE INDEX ix_in_kind_donations_created_at ON in_kind_donations (created_at);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260627192300_AddInKindDonations') THEN
    CREATE INDEX ix_in_kind_donations_status ON in_kind_donations (status);
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migration_id" = '20260627192300_AddInKindDonations') THEN
    INSERT INTO "__EFMigrationsHistory" (migration_id, product_version)
    VALUES ('20260627192300_AddInKindDonations', '10.0.1');
    END IF;
END $EF$;
COMMIT;

