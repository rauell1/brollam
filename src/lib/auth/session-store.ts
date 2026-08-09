import { and, eq, isNull, lt, ne } from "drizzle-orm";
import { getDb, requireDb, schema } from "@/lib/db/client";
import {
  clearSessionCookie,
  readSessionCookie,
  writeSessionCookie,
  SESSION_TTL_SECONDS,
  type SessionPayload,
} from "./session";

/**
 * Database backed session records.
 *
 * A signed cookie alone cannot be withdrawn: until it expires it stays
 * valid, so logout would only clear the browser's copy and a stolen cookie
 * would work for a full week. Pairing the cookie with a row here makes
 * revocation immediate.
 */

export interface SessionMeta {
  ip?: string;
  userAgent?: string;
}

export async function createSession(
  user: { id: string; name: string; email: string; role: "ADMIN" | "EDITOR" },
  meta: SessionMeta = {},
): Promise<void> {
  const db = requireDb();
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  const [row] = await db
    .insert(schema.adminSessions)
    .values({
      userId: user.id,
      expiresAt,
      ip: meta.ip ?? "",
      userAgent: (meta.userAgent ?? "").slice(0, 512),
    })
    .returning({ id: schema.adminSessions.id });

  await writeSessionCookie({
    jti: row.id,
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Math.floor(expiresAt.getTime() / 1000),
  });

  // Opportunistic cleanup so the table does not grow without bound.
  await db
    .delete(schema.adminSessions)
    .where(lt(schema.adminSessions.expiresAt, new Date()))
    .catch(() => {});
}

/**
 * Authoritative session check: valid signature, live record, and the user
 * still exists. Identity is returned from the database rather than the
 * cookie, so a role change applies on the next request instead of at the
 * next sign in.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const payload = await readSessionCookie();
  if (!payload) return null;

  const db = getDb();
  // No database means the session cannot be verified, so it is not honoured.
  if (!db) return null;

  const row = await db.query.adminSessions.findFirst({
    where: eq(schema.adminSessions.id, payload.jti),
    with: {
      user: { columns: { id: true, name: true, email: true, role: true } },
    },
  });

  if (!row || !row.user) return null;
  if (row.revokedAt !== null) return null;
  if (row.expiresAt.getTime() <= Date.now()) return null;
  // Cookie subject and record owner must agree.
  if (row.userId !== payload.sub) return null;

  return {
    jti: row.id,
    sub: row.user.id,
    name: row.user.name,
    email: row.user.email,
    role: row.user.role,
    exp: Math.floor(row.expiresAt.getTime() / 1000),
  };
}

/** Revoke the caller's own session and clear the cookie. */
export async function destroySession(): Promise<void> {
  const payload = await readSessionCookie();
  if (payload) {
    const db = getDb();
    if (db) {
      await db
        .update(schema.adminSessions)
        .set({ revokedAt: new Date() })
        .where(
          and(
            eq(schema.adminSessions.id, payload.jti),
            isNull(schema.adminSessions.revokedAt),
          ),
        );
    }
  }
  await clearSessionCookie();
}

/**
 * Revoke every live session for a user. Call after a password change so a
 * leaked credential cannot outlive the rotation. Pass `exceptJti` to keep
 * the acting session signed in.
 */
export async function revokeUserSessions(
  userId: string,
  exceptJti?: string,
): Promise<void> {
  const db = getDb();
  if (!db) return;

  const conditions = [
    eq(schema.adminSessions.userId, userId),
    isNull(schema.adminSessions.revokedAt),
  ];
  if (exceptJti) conditions.push(ne(schema.adminSessions.id, exceptJti));

  await db
    .update(schema.adminSessions)
    .set({ revokedAt: new Date() })
    .where(and(...conditions));
}
