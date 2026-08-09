import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/* Enums                                                               */
/* ------------------------------------------------------------------ */

export const userRoleEnum = pgEnum("user_role", ["ADMIN", "EDITOR"]);

export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
  "ARCHIVED",
]);

export const mediaTypeEnum = pgEnum("media_type", ["IMAGE", "VIDEO", "DOCUMENT"]);

export const statScopeEnum = pgEnum("stat_scope", ["COMPANY", "TEAM_TRACK_RECORD"]);

/* ------------------------------------------------------------------ */
/* Users (CMS administrators)                                          */
/* ------------------------------------------------------------------ */

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull().default("EDITOR"),
    image: text("image"),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_unique").on(t.email)],
);

/**
 * Server side admin sessions.
 *
 * The signed cookie carries a `jti` that must still resolve to a live row
 * here, so sign out, forced revocation, and password rotation take effect
 * immediately instead of waiting out the seven day cookie TTL. The cascade
 * means deleting a user also drops every session they hold.
 */
export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    ip: text("ip").notNull().default(""),
    userAgent: text("user_agent").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("admin_sessions_user_idx").on(t.userId),
    index("admin_sessions_expires_idx").on(t.expiresAt),
  ],
);

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description").notNull().default(""),
    icon: text("icon"),
    featuredImage: text("featured_image"),
    featuredVideo: text("featured_video"),
    position: integer("position").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("services_slug_unique").on(t.slug),
    index("services_published_position_idx").on(t.published, t.position),
  ],
);

export const serviceCapabilities = pgTable(
  "service_capabilities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("service_capabilities_service_idx").on(t.serviceId, t.position)],
);

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export const caseStudies = pgTable(
  "case_studies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    clientName: text("client_name").notNull(),
    industry: text("industry").notNull().default(""),
    summary: text("summary").notNull().default(""),
    challenge: text("challenge").notNull().default(""),
    strategy: text("strategy").notNull().default(""),
    execution: text("execution").notNull().default(""),
    results: text("results").notNull().default(""),
    categories: text("categories").array().notNull().default([]),
    relatedServiceSlugs: text("related_service_slugs").array().notNull().default([]),
    featuredImage: text("featured_image"),
    featuredVideo: text("featured_video"),
    published: boolean("published").notNull().default(false),
    featured: boolean("featured").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("case_studies_slug_unique").on(t.slug),
    index("case_studies_published_idx").on(t.published, t.featured, t.publishedAt),
  ],
);

export const caseStudyMetrics = pgTable(
  "case_study_metrics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    caseStudyId: uuid("case_study_id")
      .notNull()
      .references(() => caseStudies.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    value: text("value").notNull(),
    description: text("description").notNull().default(""),
    position: integer("position").notNull().default(0),
  },
  (t) => [index("case_study_metrics_case_idx").on(t.caseStudyId, t.position)],
);

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export const teamMembers = pgTable(
  "team_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    role: text("role").notNull(),
    biography: text("biography").notNull().default(""),
    expertise: text("expertise").array().notNull().default([]),
    image: text("image"),
    linkedinUrl: text("linkedin_url"),
    email: text("email"),
    position: integer("position").notNull().default(0),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("team_members_slug_unique").on(t.slug),
    index("team_members_active_position_idx").on(t.active, t.position),
  ],
);

export const insights = pgTable(
  "insights",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    content: text("content").notNull().default(""),
    category: text("category").notNull().default("Business"),
    featuredImage: text("featured_image"),
    authorId: uuid("author_id").references(() => teamMembers.id, { onDelete: "set null" }),
    featured: boolean("featured").notNull().default(false),
    published: boolean("published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("insights_slug_unique").on(t.slug),
    index("insights_published_idx").on(t.published, t.publishedAt),
  ],
);

/* ------------------------------------------------------------------ */
/* Clients, partners, testimonials                                     */
/* ------------------------------------------------------------------ */

export const clients = pgTable(
  "clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    logo: text("logo"),
    websiteUrl: text("website_url"),
    position: integer("position").notNull().default(0),
    active: boolean("active").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("clients_active_position_idx").on(t.active, t.position)],
);

export const partners = pgTable(
  "partners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    category: text("category").notNull().default(""),
    logo: text("logo"),
    websiteUrl: text("website_url"),
    position: integer("position").notNull().default(0),
    active: boolean("active").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("partners_active_position_idx").on(t.active, t.position)],
);

export const testimonials = pgTable(
  "testimonials",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientName: text("client_name").notNull(),
    company: text("company").notNull().default(""),
    role: text("role").notNull().default(""),
    quote: text("quote").notNull(),
    image: text("image"),
    companyLogo: text("company_logo"),
    videoUrl: text("video_url"),
    featured: boolean("featured").notNull().default(false),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("testimonials_published_idx").on(t.published, t.featured)],
);

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export const careers = pgTable(
  "careers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    location: text("location").notNull().default("Nairobi, Kenya"),
    employmentType: text("employment_type").notNull().default("Full-time"),
    summary: text("summary").notNull().default(""),
    description: text("description").notNull().default(""),
    requirements: text("requirements").notNull().default(""),
    published: boolean("published").notNull().default(false),
    closesAt: timestamp("closes_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("careers_published_idx").on(t.published, t.closesAt)],
);

/* ------------------------------------------------------------------ */
/* Enquiries                                                           */
/* ------------------------------------------------------------------ */

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    company: text("company").notNull().default(""),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    projectType: text("project_type").notNull().default(""),
    budget: text("budget").notNull().default(""),
    timeline: text("timeline").notNull().default(""),
    message: text("message").notNull(),
    source: text("source").notNull().default("contact_form"),
    status: enquiryStatusEnum("status").notNull().default("NEW"),
    internalNote: text("internal_note").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("enquiries_status_idx").on(t.status, t.createdAt),
    index("enquiries_created_idx").on(t.createdAt),
  ],
);

/* ------------------------------------------------------------------ */
/* Site statistics                                                     */
/* ------------------------------------------------------------------ */

export const siteStatistics = pgTable(
  "site_statistics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    label: text("label").notNull(),
    value: text("value").notNull(),
    suffix: text("suffix").notNull().default(""),
    description: text("description").notNull().default(""),
    scope: statScopeEnum("scope").notNull().default("COMPANY"),
    position: integer("position").notNull().default(0),
    active: boolean("active").notNull().default(false),
  },
  (t) => [index("site_statistics_scope_idx").on(t.scope, t.active, t.position)],
);

/* ------------------------------------------------------------------ */
/* Media library (metadata and URLs only, no binary storage)           */
/* ------------------------------------------------------------------ */

export const mediaItems = pgTable(
  "media_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    type: mediaTypeEnum("type").notNull().default("IMAGE"),
    url: text("url").notNull(),
    altText: text("alt_text").notNull().default(""),
    category: text("category").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("media_items_type_idx").on(t.type, t.createdAt)],
);

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(adminSessions),
}));

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  user: one(users, {
    fields: [adminSessions.userId],
    references: [users.id],
  }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  capabilities: many(serviceCapabilities),
}));

export const serviceCapabilitiesRelations = relations(serviceCapabilities, ({ one }) => ({
  service: one(services, {
    fields: [serviceCapabilities.serviceId],
    references: [services.id],
  }),
}));

export const caseStudiesRelations = relations(caseStudies, ({ many }) => ({
  metrics: many(caseStudyMetrics),
}));

export const caseStudyMetricsRelations = relations(caseStudyMetrics, ({ one }) => ({
  caseStudy: one(caseStudies, {
    fields: [caseStudyMetrics.caseStudyId],
    references: [caseStudies.id],
  }),
}));

export const insightsRelations = relations(insights, ({ one }) => ({
  author: one(teamMembers, {
    fields: [insights.authorId],
    references: [teamMembers.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ many }) => ({
  insights: many(insights),
}));
