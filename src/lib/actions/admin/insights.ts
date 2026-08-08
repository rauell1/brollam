"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { insightSchema, toNullable } from "@/lib/validations";
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

export async function upsertInsight(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();

  const parsed = parseWith(insightSchema, {
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    excerpt: formString(formData, "excerpt"),
    content: formString(formData, "content"),
    category: formString(formData, "category"),
    featuredImage: formString(formData, "featuredImage"),
    authorId: formString(formData, "authorId") === "none" ? "" : formString(formData, "authorId"),
    featured: formBool(formData, "featured"),
    published: formBool(formData, "published"),
    publishedAt: formString(formData, "publishedAt"),
  });
  if (!parsed.success) return parsed;

  const existing = await db.query.insights.findFirst({
    where: eq(schema.insights.slug, parsed.data.slug),
  });
  if (existing && existing.id !== id) {
    return { error: "Another insight already uses this slug.", fieldErrors: { slug: "Slug already in use." } };
  }

  const publishDate =
    toDateOrNull(parsed.data.publishedAt) ?? (parsed.data.published ? new Date() : null);

  const values = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    featuredImage: toNullable(parsed.data.featuredImage ?? ""),
    authorId: toNullable(parsed.data.authorId),
    featured: parsed.data.featured,
    published: parsed.data.published,
    publishedAt: publishDate,
    updatedAt: new Date(),
  };

  try {
    if (id) {
      await db.update(schema.insights).set(values).where(eq(schema.insights.id, id));
    } else {
      await db.insert(schema.insights).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertInsight failed", error);
    return { error: "Could not save the insight. Please try again." };
  }

  revalidateAll();
  redirect("/admin/insights");
}

export async function deleteInsight(id: string): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db.delete(schema.insights).where(eq(schema.insights.id, id));
  revalidateAll();
}

export async function toggleInsightFlag(
  id: string,
  field: "published" | "featured",
  value: boolean,
): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db
    .update(schema.insights)
    .set({
      [field]: value,
      ...(field === "published" && value ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    })
    .where(eq(schema.insights.id, id));
  revalidateAll();
}
