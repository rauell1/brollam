import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Cookie and token primitives only.
 *
 * This module must not import the database client: `proxy.ts` pulls it in
 * for the optimistic edge check, and dragging Drizzle into that bundle
 * would run on every request. Stateful session records live in
 * ./session-store, which is only reachable from server components and
 * server actions.
 */

export const SESSION_COOKIE = "brollam_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  /** Session record id. Must still resolve to a live row in admin_sessions. */
  jti: string;
  sub: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
  exp: number;
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set (minimum 16 characters) in production.");
  }
  return "development-only-secret-change-me";
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function encode(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${body}.${sign(body)}`;
}

function decode(token: string): SessionPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.sub || !payload.jti || !payload.exp) return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Stateless, integrity checked decode. Proves the cookie was issued by us
 * and has not expired; it cannot prove the session is still live. Safe as
 * the optimistic proxy check, never sufficient on its own for access.
 */
export function peekSession(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  return decode(token);
}

/** Stateless read of the current request's cookie. Not an authorization check. */
export async function readSessionCookie(): Promise<SessionPayload | null> {
  const store = await cookies();
  return peekSession(store.get(SESSION_COOKIE)?.value);
}

export async function writeSessionCookie(payload: SessionPayload): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, encode(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(payload.exp * 1000),
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
