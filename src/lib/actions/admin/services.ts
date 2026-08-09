"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { requireDb, schema } from "@/lib/db/client";
import { capabilitySchema, serviceSchema, toNullable } from "@/lib/validations";
import {
  formBool,
  formJson,
  formNumber,
  formString,
  parseWith,
  type ActionState,
} from "./helpers";
import { z } from "zod";

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function upsertService(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const db = requireDb();

  const rawCapabilities = formJson<unknown[]>(formData, "capabilitiesJson", []);
  const parsed = parseWith(
    serviceSchema.extend({ capabilities: z.array(capabilitySchema).max(40) }),
    {
      title: formString(formData, "title"),
      slug: formString(formData, "slug"),
      shortDescription: formString(formData, "shortDescription"),
      fullDescription: formString(formData, "fullDescription"),
      icon: formString(formData, "icon"),
      featuredImage: formString(formData, "featuredImage"),
      featuredVideo: formString(formData, "featuredVideo"),
      position: formNumber(formData, "position"),
      published: formBool(formData, "published"),
      capabilities: rawCapabilities,
    },
  );
  if (!parsed.success) return parsed;

  const existing = await db.query.services.findFirst({
    where: eq(schema.services.slug, parsed.data.slug),
  });
  if (existing && existing.id !== id) {
    return { error: "Another service already uses this slug.", fieldErrors: { slug: "Slug already in use." } };
  }

  const values = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    shortDescription: parsed.data.shortDescription,
    fullDescription: parsed.data.fullDescription,
    icon: toNullable(parsed.data.icon),
    featuredImage: toNullable(parsed.data.featuredImage ?? ""),
    featuredVideo: toNullable(parsed.data.featuredVideo ?? ""),
    position: parsed.data.position,
    published: parsed.data.published,
    updatedAt: new Date(),
  };

  try {
    let serviceId = id;
    if (serviceId) {
      await db.update(schema.services).set(values).where(eq(schema.services.id, serviceId));
    } else {
      const inserted = await db.insert(schema.services).values(values).returning({ id: schema.services.id });
      serviceId = inserted[0].id;
    }

    await db.delete(schema.serviceCapabilities).where(eq(schema.serviceCapabilities.serviceId, serviceId));
    if (parsed.data.capabilities.length > 0) {
      await db.insert(schema.serviceCapabilities).values(
        parsed.data.capabilities.map((cap, index) => ({
          serviceId: serviceId!,
          title: cap.title,
          description: cap.description,
          position: cap.position || index + 1,
        })),
      );
    }
  } catch (error) {
    console.error("[admin] upsertService failed", error);
    return { error: "Could not save the service. Please try again." };
  }

  revalidateAll();
  redirect("/admin/services");
}

export async function deleteService(id: string): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db.delete(schema.services).where(eq(schema.services.id, id));
  revalidateAll();
}

export async function toggleServicePublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const db = requireDb();
  await db
    .update(schema.services)
    .set({ published, updatedAt: new Date() })
    .where(eq(schema.services.id, id));
  revalidateAll();
}
