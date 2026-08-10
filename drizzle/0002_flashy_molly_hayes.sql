CREATE TABLE "consent_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"banner_title" text DEFAULT 'Your Privacy Matters' NOT NULL,
	"primary_color" text DEFAULT '#7877C6' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"anonymized_ip" text NOT NULL,
	"geolocation" text NOT NULL,
	"consent_state" text NOT NULL,
	"version" text DEFAULT '1.0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "consent_logs_geo_idx" ON "consent_logs" USING btree ("geolocation");--> statement-breakpoint
CREATE INDEX "consent_logs_created_idx" ON "consent_logs" USING btree ("created_at");