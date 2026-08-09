/**
 * Database seed script.
 *
 * Usage:
 *   DATABASE_URL=... npm run db:seed
 *
 * Idempotent: existing rows with seeded IDs are skipped. The first admin
 * user is created from ADMIN_SEED_* environment variables.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { inArray } from "drizzle-orm";
import * as schema from "./schema";
import {
  seedCaseStudies,
  seedClients,
  seedInsights,
  seedMediaItems,
  seedServices,
  seedStatistics,
  seedTeamMembers,
} from "./seed-data";
import { hashPassword } from "../auth/password";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Add your Neon connection string and try again.");
    process.exit(1);
  }

  const db = drizzle(neon(process.env.DATABASE_URL), { schema });
  console.log("Seeding Brollam Partners content...\n");

  // Services and capabilities
  for (const service of seedServices) {
    const { capabilities, ...row } = service;
    await db
      .insert(schema.services)
      .values(row)
      .onConflictDoNothing({ target: schema.services.id });
    if (capabilities.length) {
      await db
        .insert(schema.serviceCapabilities)
        .values(capabilities.map((c) => ({ ...c, serviceId: service.id })))
        .onConflictDoNothing({ target: schema.serviceCapabilities.id });
    }
  }
  console.log(`Services: ${seedServices.length} pillars with capabilities`);

  // Team
  await db
    .insert(schema.teamMembers)
    .values(seedTeamMembers)
    .onConflictDoNothing({ target: schema.teamMembers.id });
  console.log(`Team members: ${seedTeamMembers.length}`);

  // Insights
  await db
    .insert(schema.insights)
    .values(seedInsights.map((i) => ({ ...i, publishedAt: new Date(i.publishedAt) })))
    .onConflictDoNothing({ target: schema.insights.id });
  console.log(`Insights: ${seedInsights.length}`);

  // Statistics
  await db
    .insert(schema.siteStatistics)
    .values(seedStatistics)
    .onConflictDoNothing({ target: schema.siteStatistics.id });
  console.log(`Statistics: ${seedStatistics.length}`);

  // Clients (inactive until confirmed)
  await db
    .insert(schema.clients)
    .values(seedClients)
    .onConflictDoNothing({ target: schema.clients.id });
  console.log(`Clients: ${seedClients.length} (inactive until confirmed)`);

  // Case studies (development placeholder, unpublished)
  for (const caseStudy of seedCaseStudies) {
    const { metrics, ...row } = caseStudy;
    await db
      .insert(schema.caseStudies)
      .values({ ...row, publishedAt: caseStudy.publishedAt ? new Date(caseStudy.publishedAt) : null })
      .onConflictDoNothing({ target: schema.caseStudies.id });
    if (metrics.length) {
      await db
        .insert(schema.caseStudyMetrics)
        .values(metrics.map((m) => ({ ...m, caseStudyId: caseStudy.id })))
        .onConflictDoNothing({ target: schema.caseStudyMetrics.id });
    }
  }
  console.log(`Case studies: ${seedCaseStudies.length} (unpublished placeholders)`);

  // Media library
  await db
    .insert(schema.mediaItems)
    .values(seedMediaItems)
    .onConflictDoNothing({ target: schema.mediaItems.id });
  console.log(`Media items: ${seedMediaItems.length}`);

  // First administrator
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (email && password) {
    const existing = await db.query.users.findFirst({
      where: inArray(schema.users.email, [email.toLowerCase()]),
    });
    if (!existing) {
      await db.insert(schema.users).values({
        name: process.env.ADMIN_SEED_NAME ?? "Administrator",
        email: email.toLowerCase(),
        role: "ADMIN",
        passwordHash: await hashPassword(password),
      });
      console.log(`\nAdmin user created for ${email}`);
    } else {
      console.log(`\nAdmin user already exists for ${email}, skipped`);
    }
  } else {
    console.log("\nSkipping admin user: set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD to create one.");
  }

  console.log("\nSeed complete.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
