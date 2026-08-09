import { cache } from "react";
import { asc, desc, eq, and } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import {
  seedCaseStudies,
  seedClients,
  seedInsights,
  seedServices,
  seedStatistics,
  seedTeamMembers,
} from "@/lib/db/seed-data";
import { readingTime } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* DTO types (identical shape from Neon or from the seed snapshot)     */
/* ------------------------------------------------------------------ */

export interface CapabilityDto {
  id: string;
  title: string;
  description: string;
  position: number;
}

export interface ServiceDto {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string | null;
  featuredImage: string | null;
  featuredVideo: string | null;
  position: number;
  published: boolean;
  capabilities: CapabilityDto[];
}

export interface MetricDto {
  id: string;
  label: string;
  value: string;
  description: string;
  position: number;
}

export interface CaseStudyDto {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  categories: string[];
  relatedServiceSlugs: string[];
  featuredImage: string | null;
  featuredVideo: string | null;
  published: boolean;
  featured: boolean;
  publishedAt: Date | null;
  metrics: MetricDto[];
}

export interface InsightDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string | null;
  authorId: string | null;
  authorName: string | null;
  authorRole: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
  readingMinutes: number;
}

export interface TeamMemberDto {
  id: string;
  name: string;
  slug: string;
  role: string;
  biography: string;
  expertise: string[];
  image: string | null;
  linkedinUrl: string | null;
  email: string | null;
  position: number;
  active: boolean;
}

export interface ClientDto {
  id: string;
  name: string;
  logo: string | null;
  websiteUrl: string | null;
  position: number;
}

export interface PartnerDto extends ClientDto {
  category: string;
}

export interface TestimonialDto {
  id: string;
  clientName: string;
  company: string;
  role: string;
  quote: string;
  image: string | null;
  companyLogo: string | null;
  videoUrl: string | null;
  featured: boolean;
}

export interface StatDto {
  id: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
  scope: "COMPANY" | "TEAM_TRACK_RECORD";
  position: number;
}

export interface CareerDto {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  summary: string;
  description: string;
  requirements: string;
  closesAt: Date | null;
}

/* ------------------------------------------------------------------ */
/* Snapshot mapping (used only when no database is connected)          */
/* ------------------------------------------------------------------ */

const SNAPSHOT_DATE = new Date("2026-06-01T00:00:00.000Z");

function snapshotServices(): ServiceDto[] {
  return seedServices
    .filter((s) => s.published)
    .sort((a, b) => a.position - b.position)
    .map((s) => ({ ...s, capabilities: [...s.capabilities].sort((a, b) => a.position - b.position) }));
}

function snapshotCaseStudies(): CaseStudyDto[] {
  return seedCaseStudies
    .filter((c) => c.published)
    .map((c) => ({
      ...c,
      publishedAt: c.publishedAt ? new Date(c.publishedAt) : null,
      metrics: [...c.metrics].sort((a, b) => a.position - b.position),
    }))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      const da = a.publishedAt?.getTime() ?? 0;
      const db = b.publishedAt?.getTime() ?? 0;
      if (da !== db) return db - da;
      return a.id < b.id ? -1 : 1;
    });
}

function snapshotInsights(): InsightDto[] {
  return seedInsights
    .filter((i) => i.published)
    .map((i) => {
      const author = seedTeamMembers.find((t) => t.id === i.authorId) ?? null;
      return {
        ...i,
        publishedAt: i.publishedAt ? new Date(i.publishedAt) : null,
        authorName: author?.name ?? null,
        authorRole: author?.role ?? null,
        readingMinutes: readingTime(i.content),
      };
    })
    .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0));
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const listServices = cache(async function listServices(): Promise<ServiceDto[]> {
  const db = getDb();
  if (!db) return snapshotServices();
  const rows = await db.query.services.findMany({
    where: eq(schema.services.published, true),
    orderBy: [asc(schema.services.position), asc(schema.services.title)],
    with: { capabilities: { orderBy: [asc(schema.serviceCapabilities.position)] } },
  });
  return rows.map(({ createdAt: _c, updatedAt: _u, ...rest }) => rest);
});

export async function getServiceBySlug(slug: string): Promise<ServiceDto | null> {
  const db = getDb();
  if (!db) return snapshotServices().find((s) => s.slug === slug) ?? null;
  const row = await db.query.services.findFirst({
    where: and(eq(schema.services.slug, slug), eq(schema.services.published, true)),
    with: { capabilities: { orderBy: [asc(schema.serviceCapabilities.position)] } },
  });
  if (!row) return null;
  const { createdAt: _c, updatedAt: _u, ...rest } = row;
  return rest;
}

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

function toCaseStudyDto(
  row: typeof schema.caseStudies.$inferSelect & { metrics: (typeof schema.caseStudyMetrics.$inferSelect)[] },
): CaseStudyDto {
  const { createdAt: _c, updatedAt: _u, ...rest } = row;
  return {
    ...rest,
    metrics: [...rest.metrics]
      .sort((a, b) => a.position - b.position)
      .map(({ caseStudyId: _cs, ...m }) => m),
  };
}

export const listCaseStudies = cache(async function listCaseStudies(): Promise<CaseStudyDto[]> {
  const db = getDb();
  if (!db) return snapshotCaseStudies();
  const rows = await db.query.caseStudies.findMany({
    where: eq(schema.caseStudies.published, true),
    orderBy: [
      desc(schema.caseStudies.featured),
      desc(schema.caseStudies.publishedAt),
      asc(schema.caseStudies.id),
    ],
    with: { metrics: true },
  });
  return rows.map(toCaseStudyDto);
});

export async function getFeaturedCaseStudy(): Promise<CaseStudyDto | null> {
  const db = getDb();
  if (!db) return snapshotCaseStudies().find((c) => c.featured) ?? null;
  const row = await db.query.caseStudies.findFirst({
    where: and(eq(schema.caseStudies.published, true), eq(schema.caseStudies.featured, true)),
    orderBy: [desc(schema.caseStudies.publishedAt), asc(schema.caseStudies.id)],
    with: { metrics: true },
  });
  return row ? toCaseStudyDto(row) : null;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDto | null> {
  const db = getDb();
  if (!db) return snapshotCaseStudies().find((c) => c.slug === slug) ?? null;
  const row = await db.query.caseStudies.findFirst({
    where: and(eq(schema.caseStudies.slug, slug), eq(schema.caseStudies.published, true)),
    with: { metrics: true },
  });
  return row ? toCaseStudyDto(row) : null;
}

export async function getNextCaseStudy(currentSlug: string): Promise<CaseStudyDto | null> {
  const list = await listCaseStudies();
  if (list.length < 2) return null;
  const index = list.findIndex((c) => c.slug === currentSlug);
  if (index === -1) return list[0];
  return list[(index + 1) % list.length];
}

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

function toInsightDto(
  row: typeof schema.insights.$inferSelect & {
    author: typeof schema.teamMembers.$inferSelect | null;
  },
): InsightDto {
  const { createdAt: _c, updatedAt: _u, author, ...rest } = row;
  return {
    ...rest,
    authorName: author?.name ?? null,
    authorRole: author?.role ?? null,
    readingMinutes: readingTime(row.content),
  };
}

export const listInsights = cache(async function listInsights(): Promise<InsightDto[]> {
  const db = getDb();
  if (!db) return snapshotInsights();
  const rows = await db.query.insights.findMany({
    where: eq(schema.insights.published, true),
    orderBy: [desc(schema.insights.publishedAt), asc(schema.insights.id)],
    with: { author: true },
  });
  return rows.map(toInsightDto);
});

export async function getInsightBySlug(slug: string): Promise<InsightDto | null> {
  const db = getDb();
  if (!db) return snapshotInsights().find((i) => i.slug === slug) ?? null;
  const row = await db.query.insights.findFirst({
    where: and(eq(schema.insights.slug, slug), eq(schema.insights.published, true)),
    with: { author: true },
  });
  return row ? toInsightDto(row) : null;
}

export async function listRelatedInsights(
  category: string,
  excludeId: string,
  limit = 3,
): Promise<InsightDto[]> {
  const all = await listInsights();
  const sameCategory = all.filter((i) => i.id !== excludeId && i.category === category);
  const others = all.filter((i) => i.id !== excludeId && i.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export async function listActiveTeam(): Promise<TeamMemberDto[]> {
  const db = getDb();
  if (!db) {
    return seedTeamMembers
      .filter((t) => t.active)
      .sort((a, b) => a.position - b.position);
  }
  const rows = await db.query.teamMembers.findMany({
    where: eq(schema.teamMembers.active, true),
    orderBy: [asc(schema.teamMembers.position), asc(schema.teamMembers.name)],
  });
  return rows.map(({ createdAt: _c, updatedAt: _u, ...rest }) => rest);
}

/* ------------------------------------------------------------------ */
/* Clients and partners                                                */
/* ------------------------------------------------------------------ */

export async function listActiveClients(): Promise<ClientDto[]> {
  const db = getDb();
  if (!db) {
    return seedClients
      .filter((c) => c.active)
      .sort((a, b) => a.position - b.position);
  }
  const rows = await db.query.clients.findMany({
    where: eq(schema.clients.active, true),
    orderBy: [asc(schema.clients.position), asc(schema.clients.name)],
  });
  return rows.map(({ createdAt: _c, active: _a, ...rest }) => rest);
}

export async function listActivePartners(): Promise<PartnerDto[]> {
  const db = getDb();
  if (!db) return [];
  const rows = await db.query.partners.findMany({
    where: eq(schema.partners.active, true),
    orderBy: [asc(schema.partners.position), asc(schema.partners.name)],
  });
  return rows.map(({ createdAt: _c, active: _a, ...rest }) => rest);
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export async function listPublishedTestimonials(): Promise<TestimonialDto[]> {
  const db = getDb();
  if (!db) return [];
  const rows = await db.query.testimonials.findMany({
    where: eq(schema.testimonials.published, true),
    orderBy: [desc(schema.testimonials.featured), asc(schema.testimonials.createdAt)],
  });
  return rows.map(({ createdAt: _c, published: _p, ...rest }) => rest);
}

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

export async function listActiveStats(scope: "COMPANY" | "TEAM_TRACK_RECORD"): Promise<StatDto[]> {
  const db = getDb();
  if (!db) {
    return seedStatistics
      .filter((s) => s.scope === scope && s.active)
      .sort((a, b) => a.position - b.position)
      .map(({ active: _a, ...rest }) => rest);
  }
  const rows = await db.query.siteStatistics.findMany({
    where: and(eq(schema.siteStatistics.scope, scope), eq(schema.siteStatistics.active, true)),
    orderBy: [asc(schema.siteStatistics.position)],
  });
  return rows.map(({ active: _a, ...rest }) => rest);
}

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export async function listOpenCareers(): Promise<CareerDto[]> {
  const db = getDb();
  if (!db) return [];
  const rows = await db.query.careers.findMany({
    where: eq(schema.careers.published, true),
    orderBy: [desc(schema.careers.createdAt)],
  });
  const now = new Date();
  return rows
    .filter((c) => !c.closesAt || c.closesAt > now)
    .map(({ createdAt: _c, updatedAt: _u, published: _p, ...rest }) => rest);
}

/* ------------------------------------------------------------------ */
/* Enquiries                                                           */
/* ------------------------------------------------------------------ */

export interface NewEnquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
}

export async function createEnquiry(
  input: NewEnquiry,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getDb();
  if (!db) {
    return { ok: false, error: "database_not_configured" };
  }
  try {
    await db.insert(schema.enquiries).values(input);
    return { ok: true };
  } catch (error) {
    console.error("[enquiries] insert failed", error);
    return { ok: false, error: "insert_failed" };
  }
}

export const SNAPSHOT_BUILD_DATE = SNAPSHOT_DATE;
