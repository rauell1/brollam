"use server";

import { headers } from "next/headers";
import { enquirySchema } from "@/lib/validations";
import { createEnquiry } from "@/lib/data/public";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizePlainText } from "@/lib/utils";

export interface EnquiryFormState {
  status: "idle" | "success" | "error" | "rate_limited" | "no_database";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const initialEnquiryState: EnquiryFormState = { status: "idle" };

const MIN_FILL_MS = 2000;

export async function submitEnquiry(values: unknown): Promise<EnquiryFormState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  const bucket = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!bucket.allowed) {
    return {
      status: "rate_limited",
      message: `You have sent several messages recently. Please wait about ${bucket.retryAfterSeconds} seconds and try again.`,
    };
  }

  const parsed = enquirySchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors, message: "Please review the highlighted fields." };
  }

  const data = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success and move on.
  if (data.website && data.website.trim() !== "") {
    return { status: "success" };
  }

  // Time trap: submissions faster than a human can type are treated as spam.
  const startedAt = Number(data.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const result = await createEnquiry({
    name: sanitizePlainText(data.name),
    company: sanitizePlainText(data.company),
    email: sanitizePlainText(data.email).toLowerCase(),
    phone: sanitizePlainText(data.phone),
    projectType: data.projectType,
    budget: data.budget,
    timeline: data.timeline,
    message: sanitizePlainText(data.message),
    source: "contact_form",
  });

  if (!result.ok) {
    if (result.error === "database_not_configured") {
      return {
        status: "no_database",
        message:
          "Our enquiry system is being connected. Please reach us through any of the listed contact channels.",
      };
    }
    return {
      status: "error",
      message: "Something went wrong while sending your message. Please try again shortly.",
    };
  }

  return { status: "success" };
}
