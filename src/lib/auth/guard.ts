import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "./session";

/**
 * Full authorization check for admin server components and actions.
 * The proxy only performs the optimistic cookie check; this is the
 * authoritative verification, and admin mutations must call it too.
 */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireFullAdmin(): Promise<SessionPayload> {
  const session = await requireAdmin();
  if (session.role !== "ADMIN") {
    redirect("/admin");
  }
  return session;
}
