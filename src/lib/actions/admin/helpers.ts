/**
 * Shared helpers for admin server actions. This module intentionally has
 * no "use server" directive; only the action files get it.
 */
import type { ZodError, ZodSchema } from "zod";

export interface ActionState {
  ok?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  slugError?: string;
}

export const idleState: ActionState = {};

export function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function formBool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function formNumber(formData: FormData, key: string, fallback = 0): number {
  const raw = formString(formData, key);
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function formJson<T>(formData: FormData, key: string, fallback: T): T {
  const raw = formData.get(key);
  if (typeof raw !== "string" || raw.trim() === "") return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function parseWith<T>(
  schema: ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: string; fieldErrors: Record<string, string> } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const zodError = result.error as ZodError;
  const fieldErrors: Record<string, string> = {};
  for (const issue of zodError.issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { success: false, error: "Please review the highlighted fields.", fieldErrors };
}

/** '2026-08-01' from a date input, or null. Throws on garbage input. */
export function toDateOrNull(value: string): Date | null {
  const v = value.trim();
  if (!v) return null;
  const date = new Date(v);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}
