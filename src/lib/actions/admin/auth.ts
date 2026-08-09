"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/lib/db/client";
import { createSession, destroySession } from "@/lib/auth/session-store";
import { fakeVerifyPassword, verifyPassword } from "@/lib/auth/password";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations";
import type { ActionState } from "./helpers";

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const db = getDb();
  if (!db) {
    return {
      error:
        "The CMS database is not connected. Configure DATABASE_URL (Neon Postgres) to enable sign in.",
    };
  }

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email address and password." };
  }

  const email = parsed.data.email.toLowerCase();
  const bucket = rateLimit(`login:${ip}:${email}`, 6, 10 * 60 * 1000);
  if (!bucket.allowed) {
    return {
      error: `Too many attempts. Please wait about ${bucket.retryAfterSeconds} seconds and try again.`,
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });

  // Deliberately generic, in both the message and the time taken: an unknown
  // email still pays the full scrypt cost so latency reveals nothing.
  const passwordOk = user
    ? await verifyPassword(parsed.data.password, user.passwordHash)
    : await fakeVerifyPassword(parsed.data.password);

  if (!user || !passwordOk) {
    return { error: "Incorrect email or password." };
  }

  await createSession(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    { ip, userAgent: headerStore.get("user-agent") ?? "" },
  );
  await db
    .update(schema.users)
    .set({ lastLoginAt: new Date() })
    .where(eq(schema.users.id, user.id));

  const next = formData.get("next");
  const target =
    typeof next === "string" && next.startsWith("/admin") ? next : "/admin";
  redirect(target);
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
