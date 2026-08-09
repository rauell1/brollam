"use client";

import { useTransition } from "react";
import { Eye, EyeOff, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One click publish/active/feature toggles rendered as icon buttons that
 * submit directly to a server action.
 */
export function ToggleButton({
  active,
  action,
  kind = "visibility",
  label,
}: {
  active: boolean;
  action: () => Promise<void>;
  kind?: "visibility" | "star";
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  const Icon = kind === "star" ? Star : active ? Eye : EyeOff;

  return (
    <button
      type="button"
      disabled={pending}
      aria-pressed={active}
      aria-label={`${label}: currently ${active ? "on" : "off"}. Activate to toggle.`}
      title={label}
      onClick={() => {
        startTransition(async () => {
          await action();
        });
      }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-sm border transition-colors disabled:opacity-50",
        active
          ? "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
          : "border-border-strong text-muted-foreground hover:border-accent/40 hover:text-foreground",
      )}
    >
      <Icon className={cn("h-3.5 w-3.5", kind === "star" && active && "fill-current")} />
    </button>
  );
}
