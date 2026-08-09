"use server";

import { eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireFullAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/password";
import { revokeUserSessions } from "@/lib/auth/session-store";
import { userSchema } from "@/lib/validations";
import { formString, parseWith, type ActionState } from "./helpers";

export async function upsertUser(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireFullAdmin();
  const db = requireDb();

  const parsed = parseWith(userSchema, {
    name: formString(formData, "name"),
    email: formString(formData, "email"),
    role: formString(formData, "role") || "EDITOR",
    password: formString(formData, "password"),
  });
  if (!parsed.success) return parsed;

  if (!id && !parsed.data.password) {
    return { error: "A password is required for a new account.", fieldErrors: { password: "Set a password (minimum 10 characters)." } };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });
  if (existing && existing.id !== id) {
    return { error: "An account with this email already exists.", fieldErrors: { email: "Email already in use." } };
  }

  try {
    if (id) {
      const values: Record<string, unknown> = {
        name: parsed.data.name,
        email,
        role: parsed.data.role,
        updatedAt: new Date(),
      };
      if (parsed.data.password) {
        values.passwordHash = await hashPassword(parsed.data.password);
      }
      await db.update(schema.users).set(values).where(eq(schema.users.id, id));

      // A rotated password must invalidate anything issued against the old
      // one. Keep the acting session alive so an admin changing their own
      // password is not signed out mid task.
      if (parsed.data.password) {
        await revokeUserSessions(id, id === actor.sub ? actor.jti : undefined);
      }
    } else {
      await db.insert(schema.users).values({
        name: parsed.data.name,
        email,
        role: parsed.data.role,
        passwordHash: await hashPassword(parsed.data.password!),
      });
    }
  } catch (error) {
    console.error("[admin] upsertUser failed", error);
    return { error: "Could not save the user. Please try again." };
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string): Promise<void> {
  const session = await requireFullAdmin();
  const db = requireDb();
  if (session.sub === id) return; // never let admins delete themselves

  const otherAdmins = await db.query.users.findMany({
    where: ne(schema.users.id, id),
  });
  const target = await db.query.users.findFirst({ where: eq(schema.users.id, id) });
  if (target?.role === "ADMIN" && !otherAdmins.some((u) => u.role === "ADMIN")) {
    return; // protect the last admin account
  }
  await db.delete(schema.users).where(eq(schema.users.id, id));
  revalidatePath("/admin/users");
}
