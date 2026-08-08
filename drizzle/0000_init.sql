CREATE TYPE "public"."enquiry_status" AS ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('IMAGE', 'VIDEO', 'DOCUMENT');--> statement-breakpoint
CREATE TYPE "public"."stat_scope" AS ENUM('COMPANY', 'TEAM_TRACK_RECORD');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'EDITOR');--> statement-breakpoint
CREATE TABLE "careers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"location" text DEFAULT 'Nairobi, Kenya' NOT NULL,
	"employment_type" text DEFAULT 'Full-time' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"requirements" text DEFAULT '' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"closes_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"client_name" text NOT NULL,
	"industry" text DEFAULT '' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"challenge" text DEFAULT '' NOT NULL,
	"strategy" text DEFAULT '' NOT NULL,
	"execution" text DEFAULT '' NOT NULL,
	"results" text DEFAULT '' NOT NULL,
	"categories" text[] DEFAULT '{}' NOT NULL,
	"related_service_slugs" text[] DEFAULT '{}' NOT NULL,
	"featured_image" text,
	"featured_video" text,
	"published" boolean DEFAULT false NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_study_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_study_id" uuid NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"website_url" text,
	"position" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"project_type" text DEFAULT '' NOT NULL,
	"budget" text DEFAULT '' NOT NULL,
	"timeline" text DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"source" text DEFAULT 'contact_form' NOT NULL,
	"status" "enquiry_status" DEFAULT 'NEW' NOT NULL,
	"internal_note" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"category" text DEFAULT 'Business' NOT NULL,
	"featured_image" text,
	"author_id" uuid,
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"type" "media_type" DEFAULT 'IMAGE' NOT NULL,
	"url" text NOT NULL,
	"alt_text" text DEFAULT '' NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"logo" text,
	"website_url" text,
	"position" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_capabilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text DEFAULT '' NOT NULL,
	"icon" text,
	"featured_image" text,
	"featured_video" text,
	"position" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_statistics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"suffix" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"scope" "stat_scope" DEFAULT 'COMPANY' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"role" text NOT NULL,
	"biography" text DEFAULT '' NOT NULL,
	"expertise" text[] DEFAULT '{}' NOT NULL,
	"image" text,
	"linkedin_url" text,
	"email" text,
	"position" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_name" text NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"role" text DEFAULT '' NOT NULL,
	"quote" text NOT NULL,
	"image" text,
	"company_logo" text,
	"video_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'EDITOR' NOT NULL,
	"image" text,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "case_study_metrics" ADD CONSTRAINT "case_study_metrics_case_study_id_case_studies_id_fk" FOREIGN KEY ("case_study_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insights" ADD CONSTRAINT "insights_author_id_team_members_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_capabilities" ADD CONSTRAINT "service_capabilities_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "careers_published_idx" ON "careers" USING btree ("published","closes_at");--> statement-breakpoint
CREATE UNIQUE INDEX "case_studies_slug_unique" ON "case_studies" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "case_studies_published_idx" ON "case_studies" USING btree ("published","featured","published_at");--> statement-breakpoint
CREATE INDEX "case_study_metrics_case_idx" ON "case_study_metrics" USING btree ("case_study_id","position");--> statement-breakpoint
CREATE INDEX "clients_active_position_idx" ON "clients" USING btree ("active","position");--> statement-breakpoint
CREATE INDEX "enquiries_status_idx" ON "enquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "enquiries_created_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "insights_slug_unique" ON "insights" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "insights_published_idx" ON "insights" USING btree ("published","published_at");--> statement-breakpoint
CREATE INDEX "media_items_type_idx" ON "media_items" USING btree ("type","created_at");--> statement-breakpoint
CREATE INDEX "partners_active_position_idx" ON "partners" USING btree ("active","position");--> statement-breakpoint
CREATE INDEX "service_capabilities_service_idx" ON "service_capabilities" USING btree ("service_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "services_slug_unique" ON "services" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "services_published_position_idx" ON "services" USING btree ("published","position");--> statement-breakpoint
CREATE INDEX "site_statistics_scope_idx" ON "site_statistics" USING btree ("scope","active","position");--> statement-breakpoint
CREATE UNIQUE INDEX "team_members_slug_unique" ON "team_members" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "team_members_active_position_idx" ON "team_members" USING btree ("active","position");--> statement-breakpoint
CREATE INDEX "testimonials_published_idx" ON "testimonials" USING btree ("published","featured");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");