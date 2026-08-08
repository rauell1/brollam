"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { enquiryUpdateSchema, mediaItemSchema, statisticSchema } from "@/lib/validations";
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

/* --------------------------------- Statistics ------------------------------- */

export async function upsertStatistic(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();
  const parsed = parseWith(statisticSchema, {
    label: formString(formData, "label"),
    value: formString(formData, "value"),
    suffix: formString(formData, "suffix"),
    description: formString(formData, "description"),
    scope: formString(formData, "scope") || "COMPANY",
    position: formNumber(formData, "position"),
    active: formBool(formData, "active"),
  });
  if (!parsed.success) return parsed;

  const values = {
    label: parsed.data.label,
    value: parsed.data.value,
    suffix: parsed.data.suffix,
    description: parsed.data.description,
    scope: parsed.data.scope,
    position: parsed.data.position,
    active: parsed.data.active,
  };

  try {
    if (id) {
      await db.update(schema.siteStatistics).set(values).where(eq(schema.siteStatistics.id, id));
    } else {
      await db.insert(schema.siteStatistics).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertStatistic failed", error);
    return { error: "Could not save the statistic. Please try again." };
  }
  revalidateAll();
  redirect("/admin/statistics");
}

export async function deleteStatistic(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.siteStatistics).where(eq(schema.siteStatistics.id, id));
  revalidateAll();
}

export async function toggleStatisticActive(id: string, active: boolean): Promise<void> {
  await requireAdmin();
  await requireDb().update(schema.siteStatistics).set({ active }).where(eq(schema.siteStatistics.id, id));
  revalidateAll();
}

/* ------------------------------------ Media --------------------------------- */

export async function upsertMediaItem(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();
  const parsed = parseWith(mediaItemSchema, {
    title: formString(formData, "title"),
    type: formString(formData, "type") || "IMAGE",
    url: formString(formData, "url"),
    altText: formString(formData, "altText"),
    category: formString(formData, "category"),
  });
  if (!parsed.success) return parsed;

  const values = {
    title: parsed.data.title,
    type: parsed.data.type,
    url: parsed.data.url,
    altText: parsed.data.altText,
    category: parsed.data.category,
  };

  try {
    if (id) {
      await db.update(schema.mediaItems).set(values).where(eq(schema.mediaItems.id, id));
    } else {
      await db.insert(schema.mediaItems).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertMediaItem failed", error);
    return { error: "Could not save the media item. Please try again." };
  }
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function deleteMediaItem(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.mediaItems).where(eq(schema.mediaItems.id, id));
  revalidatePath("/admin/media");
}

/* ---------------------------------- Enquiries ------------------------------- */

export async function updateEnquiry(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();
  const parsed = parseWith(enquiryUpdateSchema, {
    status: formString(formData, "status"),
    internalNote: formString(formData, "internalNote"),
  });
  if (!parsed.success) return parsed;

  try {
    await db
      .update(schema.enquiries)
      .set({
        status: parsed.data.status,
        internalNote: parsed.data.internalNote,
        updatedAt: new Date(),
      })
      .where(eq(schema.enquiries.id, id));
  } catch (error) {
    console.error("[admin] updateEnquiry failed", error);
    return { error: "Could not update the enquiry. Please try again." };
  }
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  return { ok: true, message: "Enquiry updated." };
}

export async function deleteEnquiry(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.enquiries).where(eq(schema.enquiries.id, id));
  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries");
}
