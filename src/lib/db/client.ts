import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

/**
 * The platform runs in two modes:
 *
 * 1. Database mode: DATABASE_URL is set (Neon Postgres). All content is
 *    read from and written to the live database.
 * 2. Preview mode: DATABASE_URL is not set. Public pages render from the
 *    version-controlled seed snapshot so the site remains fully viewable,
 *    and the admin area explains that a database must be connected.
 */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

let cached: Database | null = null;

export function getDb(): Database | null {
  if (!process.env.DATABASE_URL) return null;
  if (!cached) {
    cached = drizzle(neon(process.env.DATABASE_URL), { schema });
  }
  return cached;
}

export function requireDb(): Database {
  const db = getDb();
  if (!db) {
    throw new Error(
      "DATABASE_URL is not configured. Connect Neon Postgres to enable content management.",
    );
  }
  return db;
}

export { schema };
