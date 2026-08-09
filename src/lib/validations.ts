import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const optionalUrl = z
  .string()
  .trim()
  .max(2000, "URL is too long")
  .refine((v) => v === "" || /^https?:\/\//i.test(v) || v.startsWith("/"), {
    message: "Enter a full URL (https://) or a site path (/media/...).",
  })
  .optional()
  .default("");

export function toNullable(value: string): string | null {
  const v = value.trim();
  return v === "" ? null : v;
}

const requiredText = (label: string, max = 500) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

const optionalText = (max = 5000) => z.string().trim().max(max, "Text is too long.").optional().default("");

const slugField = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .max(120, "Slug is too long.")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only.");

const csv = z.string().trim().max(2000).optional().default("");

export function parseCsv(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* Public contact enquiry                                              */
/* ------------------------------------------------------------------ */

export const enquirySchema = z.object({
  name: requiredText("Name", 120),
  company: z.string().trim().max(160, "Company is too long.").optional().default(""),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(60, "Phone number is too long.").optional().default(""),
  projectType: requiredText("Project type", 120),
  budget: z.string().trim().max(120).optional().default(""),
  timeline: z.string().trim().max(120).optional().default(""),
  message: requiredText("Message", 5000),
  // Anti-spam fields
  website: z.string().optional().default(""), // honeypot: real users never fill this
  startedAt: z.string().optional().default(""), // timestamp trap
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/* ------------------------------------------------------------------ */
/* Admin: login and users                                              */
/* ------------------------------------------------------------------ */

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const userSchema = z.object({
  name: requiredText("Name", 120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  role: z.enum(["ADMIN", "EDITOR"]),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters.")
    .max(200)
    .optional()
    .or(z.literal("")),
});

/* ------------------------------------------------------------------ */
/* Admin: services                                                     */
/* ------------------------------------------------------------------ */

export const capabilitySchema = z.object({
  id: z.string().optional(),
  title: requiredText("Capability title", 160),
  description: optionalText(500),
  position: z.coerce.number().int().min(0).max(999).default(0),
});

export const serviceSchema = z.object({
  title: requiredText("Title", 160),
  slug: slugField,
  shortDescription: requiredText("Short description", 400),
  fullDescription: optionalText(20000),
  icon: z.string().trim().max(80).optional().default(""),
  featuredImage: optionalUrl,
  featuredVideo: optionalUrl,
  position: z.coerce.number().int().min(0).max(999).default(0),
  published: z.boolean().default(false),
  capabilities: z.array(capabilitySchema).max(40).default([]),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

/* ------------------------------------------------------------------ */
/* Admin: case studies                                                 */
/* ------------------------------------------------------------------ */

export const metricSchema = z.object({
  id: z.string().optional(),
  label: requiredText("Metric label", 160),
  value: requiredText("Metric value", 60),
  description: optionalText(300),
  position: z.coerce.number().int().min(0).max(999).default(0),
});

export const caseStudySchema = z.object({
  title: requiredText("Title", 200),
  slug: slugField,
  clientName: requiredText("Client name", 160),
  industry: optionalText(160),
  summary: optionalText(2000),
  challenge: optionalText(20000),
  strategy: optionalText(20000),
  execution: optionalText(20000),
  results: optionalText(20000),
  categoriesCsv: csv,
  relatedServiceSlugs: z.array(z.string()).max(12).default([]),
  featuredImage: optionalUrl,
  featuredVideo: optionalUrl,
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional().default(""),
  metrics: z.array(metricSchema).max(12).default([]),
});

export type CaseStudyFormValues = z.infer<typeof caseStudySchema>;

/* ------------------------------------------------------------------ */
/* Admin: insights                                                     */
/* ------------------------------------------------------------------ */

export const insightSchema = z.object({
  title: requiredText("Title", 200),
  slug: slugField,
  excerpt: optionalText(600),
  content: optionalText(60000),
  category: requiredText("Category", 80),
  featuredImage: optionalUrl,
  authorId: z.string().optional().default(""),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  publishedAt: z.string().optional().default(""),
});

export type InsightFormValues = z.infer<typeof insightSchema>;

/* ------------------------------------------------------------------ */
/* Admin: team                                                         */
/* ------------------------------------------------------------------ */

export const teamMemberSchema = z.object({
  name: requiredText("Name", 120),
  slug: slugField,
  role: requiredText("Role", 160),
  biography: optionalText(10000),
  expertiseCsv: csv,
  image: optionalUrl,
  linkedinUrl: optionalUrl,
  email: z
    .string()
    .trim()
    .max(200)
    .refine((v) => v === "" || z.string().email().safeParse(v).success, {
      message: "Enter a valid email address.",
    })
    .optional()
    .default(""),
  position: z.coerce.number().int().min(0).max(999).default(0),
  active: z.boolean().default(true),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

/* ------------------------------------------------------------------ */
/* Admin: clients, partners, testimonials                              */
/* ------------------------------------------------------------------ */

export const clientSchema = z.object({
  name: requiredText("Name", 160),
  logo: optionalUrl,
  websiteUrl: optionalUrl,
  position: z.coerce.number().int().min(0).max(999).default(0),
  active: z.boolean().default(false),
});

export const partnerSchema = clientSchema.extend({
  category: optionalText(120),
});

export const testimonialSchema = z.object({
  clientName: requiredText("Client name", 160),
  company: optionalText(160),
  role: optionalText(160),
  quote: requiredText("Quote", 2000),
  image: optionalUrl,
  companyLogo: optionalUrl,
  videoUrl: optionalUrl,
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

/* ------------------------------------------------------------------ */
/* Admin: careers                                                      */
/* ------------------------------------------------------------------ */

export const careerSchema = z.object({
  title: requiredText("Title", 160),
  location: optionalText(120),
  employmentType: optionalText(80),
  summary: optionalText(2000),
  description: optionalText(20000),
  requirements: optionalText(20000),
  published: z.boolean().default(false),
  closesAt: z.string().optional().default(""),
});

export type CareerFormValues = z.infer<typeof careerSchema>;

/* ------------------------------------------------------------------ */
/* Admin: statistics, media, enquiry updates                           */
/* ------------------------------------------------------------------ */

export const statisticSchema = z.object({
  label: requiredText("Label", 160),
  value: requiredText("Value", 60),
  suffix: z.string().trim().max(20).optional().default(""),
  description: optionalText(500),
  scope: z.enum(["COMPANY", "TEAM_TRACK_RECORD"]),
  position: z.coerce.number().int().min(0).max(999).default(0),
  active: z.boolean().default(false),
});

export const mediaItemSchema = z.object({
  title: requiredText("Title", 160),
  type: z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  url: z
    .string()
    .trim()
    .min(1, "URL is required.")
    .max(2000)
    .refine((v) => /^https?:\/\//i.test(v) || v.startsWith("/"), {
      message: "Enter a full URL (https://) or a site path (/media/...).",
    }),
  altText: optionalText(300),
  category: optionalText(120),
});

export const enquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST", "ARCHIVED"]),
  internalNote: optionalText(5000),
});

/* ------------------------------------------------------------------ */
/* Insight categories (kept editable in one place)                     */
/* ------------------------------------------------------------------ */

export const insightCategories = [
  "Branding",
  "Marketing",
  "Communications",
  "AI",
  "Business",
  "PR",
  "SEO",
  "Events",
  "Technology",
  "Clean Energy",
  "E-Mobility",
] as const;

export const caseStudyCategories = [
  "Branding",
  "Websites",
  "Photography",
  "Video",
  "Events",
  "AI Campaigns",
  "Public Relations",
  "Social Campaigns",
  "Technology",
  "Clean Energy",
  "E-Mobility",
  "Partnerships",
] as const;

export const partnerCategories = ["Technology", "Creative", "Media", "Production", "Software"] as const;
