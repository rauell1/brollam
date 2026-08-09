import { asc, count, desc, eq, sql } from "drizzle-orm";
import { requireDb, schema } from "@/lib/db/client";

/**
 * Admin data access. Every function here requires a connected database;
 * callers gate on `hasDatabase` before rendering admin screens.
 */

export async function getDashboardOverview() {
  const db = requireDb();
  const [
    newEnquiries,
    publishedCaseStudies,
    publishedInsights,
    activeServices,
    openCareers,
    totalClients,
    recentEnquiries,
  ] = await Promise.all([
    db.select({ value: count() }).from(schema.enquiries).where(eq(schema.enquiries.status, "NEW")),
    db.select({ value: count() }).from(schema.caseStudies).where(eq(schema.caseStudies.published, true)),
    db.select({ value: count() }).from(schema.insights).where(eq(schema.insights.published, true)),
    db.select({ value: count() }).from(schema.services).where(eq(schema.services.published, true)),
    db.select({ value: count() }).from(schema.careers).where(eq(schema.careers.published, true)),
    db.select({ value: count() }).from(schema.clients).where(eq(schema.clients.active, true)),
    db.query.enquiries.findMany({
      orderBy: [desc(schema.enquiries.createdAt)],
      limit: 6,
    }),
  ]);

  return {
    newEnquiries: newEnquiries[0]?.value ?? 0,
    publishedCaseStudies: publishedCaseStudies[0]?.value ?? 0,
    publishedInsights: publishedInsights[0]?.value ?? 0,
    activeServices: activeServices[0]?.value ?? 0,
    openCareers: openCareers[0]?.value ?? 0,
    totalClients: totalClients[0]?.value ?? 0,
    recentEnquiries,
  };
}

export async function listAllServices() {
  return requireDb().query.services.findMany({
    orderBy: [asc(schema.services.position), asc(schema.services.title)],
    with: { capabilities: true },
  });
}

export async function getServiceById(id: string) {
  return requireDb().query.services.findFirst({
    where: eq(schema.services.id, id),
    with: { capabilities: { orderBy: [asc(schema.serviceCapabilities.position)] } },
  });
}

export async function listAllCaseStudies() {
  return requireDb().query.caseStudies.findMany({
    orderBy: [desc(schema.caseStudies.updatedAt)],
    with: { metrics: true },
  });
}

export async function getCaseStudyById(id: string) {
  return requireDb().query.caseStudies.findFirst({
    where: eq(schema.caseStudies.id, id),
    with: { metrics: { orderBy: [asc(schema.caseStudyMetrics.position)] } },
  });
}

export async function listAllInsights() {
  return requireDb().query.insights.findMany({
    orderBy: [desc(schema.insights.updatedAt)],
    with: { author: true },
  });
}

export async function getInsightById(id: string) {
  return requireDb().query.insights.findFirst({
    where: eq(schema.insights.id, id),
    with: { author: true },
  });
}

export async function listAllTeam() {
  return requireDb().query.teamMembers.findMany({
    orderBy: [asc(schema.teamMembers.position), asc(schema.teamMembers.name)],
  });
}

export async function getTeamMemberById(id: string) {
  return requireDb().query.teamMembers.findFirst({
    where: eq(schema.teamMembers.id, id),
  });
}

export async function listAllClients() {
  return requireDb().query.clients.findMany({
    orderBy: [asc(schema.clients.position), asc(schema.clients.name)],
  });
}

export async function getClientById(id: string) {
  return requireDb().query.clients.findFirst({
    where: eq(schema.clients.id, id),
  });
}

export async function listAllPartners() {
  return requireDb().query.partners.findMany({
    orderBy: [asc(schema.partners.position), asc(schema.partners.name)],
  });
}

export async function getPartnerById(id: string) {
  return requireDb().query.partners.findFirst({
    where: eq(schema.partners.id, id),
  });
}

export async function listAllTestimonials() {
  return requireDb().query.testimonials.findMany({
    orderBy: [desc(schema.testimonials.createdAt)],
  });
}

export async function getTestimonialById(id: string) {
  return requireDb().query.testimonials.findFirst({
    where: eq(schema.testimonials.id, id),
  });
}

export async function listAllCareers() {
  return requireDb().query.careers.findMany({
    orderBy: [desc(schema.careers.createdAt)],
  });
}

export async function getCareerById(id: string) {
  return requireDb().query.careers.findFirst({
    where: eq(schema.careers.id, id),
  });
}

export async function listAllStatistics() {
  return requireDb().query.siteStatistics.findMany({
    orderBy: [asc(schema.siteStatistics.scope), asc(schema.siteStatistics.position)],
  });
}

export async function getStatisticById(id: string) {
  return requireDb().query.siteStatistics.findFirst({
    where: eq(schema.siteStatistics.id, id),
  });
}

export async function listAllMedia() {
  return requireDb().query.mediaItems.findMany({
    orderBy: [desc(schema.mediaItems.createdAt)],
  });
}

export async function getMediaItemById(id: string) {
  return requireDb().query.mediaItems.findFirst({
    where: eq(schema.mediaItems.id, id),
  });
}

export async function listAllEnquiries() {
  return requireDb().query.enquiries.findMany({
    orderBy: [desc(schema.enquiries.createdAt)],
  });
}

export async function getEnquiryById(id: string) {
  return requireDb().query.enquiries.findFirst({
    where: eq(schema.enquiries.id, id),
  });
}

export async function listAllUsers() {
  return requireDb().query.users.findMany({
    orderBy: [asc(schema.users.createdAt)],
  });
}

export async function getUserById(id: string) {
  return requireDb().query.users.findFirst({
    where: eq(schema.users.id, id),
  });
}

export async function countNewEnquiries(): Promise<number> {
  const rows = await requireDb()
    .select({ value: count() })
    .from(schema.enquiries)
    .where(eq(schema.enquiries.status, "NEW"));
  return rows[0]?.value ?? 0;
}

export async function slugExists(table: "services" | "caseStudies" | "insights" | "teamMembers", slug: string, excludeId?: string) {
  const db = requireDb();
  const t = schema[table];
  const rows = await db
    .select({ id: t.id })
    .from(t)
    .where(eq(t.slug, sql`${slug}`));
  return rows.some((row) => row.id !== excludeId);
}
