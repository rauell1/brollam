"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { clientSchema, partnerSchema, testimonialSchema, toNullable } from "@/lib/validations";
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

/* ---------------------------------- Clients --------------------------------- */

export async function upsertClient(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();
  const parsed = parseWith(clientSchema, {
    name: formString(formData, "name"),
    logo: formString(formData, "logo"),
    websiteUrl: formString(formData, "websiteUrl"),
    position: formNumber(formData, "position"),
    active: formBool(formData, "active"),
  });
  if (!parsed.success) return parsed;

  const values = {
    name: parsed.data.name,
    logo: toNullable(parsed.data.logo ?? ""),
    websiteUrl: toNullable(parsed.data.websiteUrl ?? ""),
    position: parsed.data.position,
    active: parsed.data.active,
  };

  try {
    if (id) {
      await db.update(schema.clients).set(values).where(eq(schema.clients.id, id));
    } else {
      await db.insert(schema.clients).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertClient failed", error);
    return { error: "Could not save the client. Please try again." };
  }
  revalidateAll();
  redirect("/admin/clients");
}

export async function deleteClient(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.clients).where(eq(schema.clients.id, id));
  revalidateAll();
}

export async function toggleClientActive(id: string, active: boolean): Promise<void> {
  await requireAdmin();
  await requireDb().update(schema.clients).set({ active }).where(eq(schema.clients.id, id));
  revalidateAll();
}

/* ---------------------------------- Partners -------------------------------- */

export async function upsertPartner(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();
  const parsed = parseWith(partnerSchema, {
    name: formString(formData, "name"),
    category: formString(formData, "category"),
    logo: formString(formData, "logo"),
    websiteUrl: formString(formData, "websiteUrl"),
    position: formNumber(formData, "position"),
    active: formBool(formData, "active"),
  });
  if (!parsed.success) return parsed;

  const values = {
    name: parsed.data.name,
    category: parsed.data.category,
    logo: toNullable(parsed.data.logo ?? ""),
    websiteUrl: toNullable(parsed.data.websiteUrl ?? ""),
    position: parsed.data.position,
    active: parsed.data.active,
  };

  try {
    if (id) {
      await db.update(schema.partners).set(values).where(eq(schema.partners.id, id));
    } else {
      await db.insert(schema.partners).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertPartner failed", error);
    return { error: "Could not save the partner. Please try again." };
  }
  revalidateAll();
  redirect("/admin/partners");
}

export async function deletePartner(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.partners).where(eq(schema.partners.id, id));
  revalidateAll();
}

export async function togglePartnerActive(id: string, active: boolean): Promise<void> {
  await requireAdmin();
  await requireDb().update(schema.partners).set({ active }).where(eq(schema.partners.id, id));
  revalidateAll();
}

/* -------------------------------- Testimonials ------------------------------ */

export async function upsertTestimonial(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();
  const parsed = parseWith(testimonialSchema, {
    clientName: formString(formData, "clientName"),
    company: formString(formData, "company"),
    role: formString(formData, "role"),
    quote: formString(formData, "quote"),
    image: formString(formData, "image"),
    companyLogo: formString(formData, "companyLogo"),
    videoUrl: formString(formData, "videoUrl"),
    featured: formBool(formData, "featured"),
    published: formBool(formData, "published"),
  });
  if (!parsed.success) return parsed;

  const values = {
    clientName: parsed.data.clientName,
    company: parsed.data.company,
    role: parsed.data.role,
    quote: parsed.data.quote,
    image: toNullable(parsed.data.image ?? ""),
    companyLogo: toNullable(parsed.data.companyLogo ?? ""),
    videoUrl: toNullable(parsed.data.videoUrl ?? ""),
    featured: parsed.data.featured,
    published: parsed.data.published,
  };

  try {
    if (id) {
      await db.update(schema.testimonials).set(values).where(eq(schema.testimonials.id, id));
    } else {
      await db.insert(schema.testimonials).values(values);
    }
  } catch (error) {
    console.error("[admin] upsertTestimonial failed", error);
    return { error: "Could not save the testimonial. Please try again." };
  }
  revalidateAll();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  await requireDb().delete(schema.testimonials).where(eq(schema.testimonials.id, id));
  revalidateAll();
}

export async function toggleTestimonialFlag(
  id: string,
  field: "published" | "featured",
  value: boolean,
): Promise<void> {
  await requireAdmin();
  await requireDb().update(schema.testimonials).set({ [field]: value }).where(eq(schema.testimonials.id, id));
  revalidateAll();
}
