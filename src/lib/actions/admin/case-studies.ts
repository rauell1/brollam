"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { caseStudySchema, parseCsv, toNullable } from "@/lib/validations";
import {
  formBool,
  formJson,
  formString,
  parseWith,
  toDateOrNull,
  type ActionState,
} from "./helpers";

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function upsertCaseStudy(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();

  const rawMetrics = formJson<unknown[]>(formData, "metricsJson", []);
  const parsed = parseWith(caseStudySchema, {
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    clientName: formString(formData, "clientName"),
    industry: formString(formData, "industry"),
    summary: formString(formData, "summary"),
    challenge: formString(formData, "challenge"),
    strategy: formString(formData, "strategy"),
    execution: formString(formData, "execution"),
    results: formString(formData, "results"),
    categoriesCsv: formString(formData, "categoriesCsv"),
    relatedServiceSlugs: formJson<string[]>(formData, "relatedServiceSlugsJson", []),
    featuredImage: formString(formData, "featuredImage"),
    featuredVideo: formString(formData, "featuredVideo"),
    published: formBool(formData, "published"),
    featured: formBool(formData, "featured"),
    publishedAt: formString(formData, "publishedAt"),
    metrics: rawMetrics,
  });
  if (!parsed.success) return parsed;

  const existing = await db.query.caseStudies.findFirst({
    where: eq(schema.caseStudies.slug, parsed.data.slug),
  });
  if (existing && existing.id !== id) {
    return { error: "Another case study already uses this slug.", fieldErrors: { slug: "Slug already in use." } };
  }

  const publishDate =
    toDateOrNull(parsed.data.publishedAt) ?? (parsed.data.published ? new Date() : null);

  const values = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    clientName: parsed.data.clientName,
    industry: parsed.data.industry,
    summary: parsed.data.summary,
    challenge: parsed.data.challenge,
    strategy: parsed.data.strategy,
    execution: parsed.data.execution,
    results: parsed.data.results,
    categories: parseCsv(parsed.data.categoriesCsv),
    relatedServiceSlugs: parsed.data.relatedServiceSlugs,
    featuredImage: toNullable(parsed.data.featuredImage ?? ""),
    featuredVideo: toNullable(parsed.data.featuredVideo ?? ""),
    published: parsed.data.published,
    featured: parsed.data.featured,
    publishedAt: publishDate,
    updatedAt: new Date(),
  };

  try {
    let caseStudyId = id;
    if (caseStudyId) {
      await db.update(schema.caseStudies).set(values).where(eq(schema.caseStudies.id, caseStudyId));
    } else {
      const inserted = await db
        .insert(schema.caseStudies)
        .values(values)
        .returning({ id: schema.caseStudies.id });
      caseStudyId = inserted[0].id;
    }

    await db
      .delete(schema.caseStudyMetrics)
      .where(eq(schema.caseStudyMetrics.caseStudyId, caseStudyId));
    if (parsed.data.metrics.length > 0) {
      await db.insert(schema.caseStudyMetrics).values(
        parsed.data.metrics.map((metric, index) => ({
          caseStudyId: caseStudyId!,
          label: metric.label,
          value: metric.value,
          description: metric.description,
          position: metric.position || index + 1,
        })),
      );
    }
  } catch (error) {
    console.error("[admin] upsertCaseStudy failed", error);
    return { error: "Could not save the case study. Please try again." };
  }

  revalidateAll();
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db.delete(schema.caseStudies).where(eq(schema.caseStudies.id, id));
  revalidateAll();
}

export async function toggleCaseStudyFlag(
  id: string,
  field: "published" | "featured",
  value: boolean,
): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db
    .update(schema.caseStudies)
    .set({
      [field]: value,
      ...(field === "published" && value ? { publishedAt: new Date() } : {}),
      updatedAt: new Date(),
    })
    .where(eq(schema.caseStudies.id, id));
  revalidateAll();
}
