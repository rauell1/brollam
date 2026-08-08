"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { parseCsv, teamMemberSchema, toNullable } from "@/lib/validations";
import {
  formBool,
  formNumber,
  formString,
  parseWith,
  type ActionState,
} from "./helpers";

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function upsertTeamMember(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();

  const parsed = parseWith(teamMemberSchema, {
    name: formString(formData, "name"),
    slug: formString(formData, "slug"),
    role: formString(formData, "role"),
    biography: formString(formData, "biography"),
    expertiseCsv: formString(formData, "expertiseCsv"),
    image: formString(formData, "image"),
    linkedinUrl: formString(formData, "linkedinUrl"),
    email: formString(formData, "email"),
    position: formNumber(formData, "position"),
    active: formBool(formData, "active"),
  });
  if (!parsed.success) return parsed;

  const existing = await db.query.teamMembers.findFirst({
    where: eq(schema.teamMembers.slug, parsed.data.slug),
  });
  if (existing && existing.id !== id) {
    return { error: "Another team member already uses this slug.", fieldErrors: { slug: "Slug already in use." } };
  }

  const values = {
    name: parsed.data.name,
    slug: parsed.data.slug,
    role: parsed.data.role,
    biography: parsed.data.biography,
    expertise: parseCsv(parsed.data.expertiseCsv),
    image: toNullable(parsed.data.image ?? ""),
    linkedinUrl: toNullable(parsed.data.linkedinUrl ?? ""),
    email: toNullable(parsed.data.email),
    position: parsed.data.position,
    active: parsed.data.active,
    updatedAt: new Date(),
  };

  try {
    if (id) {
      await db.update(schema.teamMembers).set(values).where(eq(schema.teamMembers.id, id));
    } else {
      await db.insert(schema.teamMembers).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertTeamMember failed", error);
    return { error: "Could not save the team member. Please try again." };
  }

  revalidateAll();
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db.delete(schema.teamMembers).where(eq(schema.teamMembers.id, id));
  revalidateAll();
}

export async function toggleTeamActive(id: string, active: boolean): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db
    .update(schema.teamMembers)
    .set({ active, updatedAt: new Date() })
    .where(eq(schema.teamMembers.id, id));
  revalidateAll();
}
