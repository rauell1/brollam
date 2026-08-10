"use server";

import { requireDb } from "@/lib/db/client";
import { consentConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireFullAdmin } from "@/lib/auth/guard";

export async function saveConsentConfig(formData: FormData) {
  await requireFullAdmin();

  const title = formData.get("bannerTitle") as string;
  const color = formData.get("primaryColor") as string;
  const db = requireDb();

  // For simplicity, we just insert a new config row or update the first one
  const existing = await db.select().from(consentConfig).limit(1);

  if (existing.length > 0) {
    await db
      .update(consentConfig)
      .set({ bannerTitle: title, primaryColor: color, updatedAt: new Date() })
      .where(eq(consentConfig.id, existing[0].id));
  } else {
    await db.insert(consentConfig).values({
      bannerTitle: title,
      primaryColor: color,
    });
  }

  revalidatePath("/admin/consent");
}
