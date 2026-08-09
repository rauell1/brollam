"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { careerSchema } from "@/lib/validations";
import {
  formBool,
  formString,
  parseWith,
  toDateOrNull,
  type ActionState,
} from "./helpers";

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function upsertCareer(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();

  const parsed = parseWith(careerSchema, {
    title: formString(formData, "title"),
    location: formString(formData, "location"),
    employmentType: formString(formData, "employmentType"),
    summary: formString(formData, "summary"),
    description: formString(formData, "description"),
    requirements: formString(formData, "requirements"),
    published: formBool(formData, "published"),
    closesAt: formString(formData, "closesAt"),
  });
  if (!parsed.success) return parsed;

  const values = {
    title: parsed.data.title,
    location: parsed.data.location || "Nairobi, Kenya",
    employmentType: parsed.data.employmentType || "Full-time",
    summary: parsed.data.summary,
    description: parsed.data.description,
    requirements: parsed.data.requirements,
    published: parsed.data.published,
    closesAt: toDateOrNull(parsed.data.closesAt),
    updatedAt: new Date(),
  };

  try {
    if (id) {
      await db.update(schema.careers).set(values).where(eq(schema.careers.id, id));
    } else {
      await db.insert(schema.careers).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertCareer failed", error);
    return { error: "Could not save the role. Please try again." };
  }
  revalidateAll();
  redirect("/admin/careers");
}

export async function deleteCareer(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.careers).where(eq(schema.careers.id, id));
  revalidateAll();
}

export async function toggleCareerPublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  await requireDb()
    .update(schema.careers)
    .set({ published, updatedAt: new Date() })
    .where(eq(schema.careers.id, id));
  revalidateAll();
}
