import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "texture-dots flex flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-card/40 px-8 py-20 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-border-strong text-accent">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      ) : null}
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {action ? (
        <Link
          href={action.href}
          className="mt-7 inline-flex h-10 items-center rounded-sm border border-accent/50 px-5 text-xs font-semibold tracking-[0.16em] text-accent uppercase transition-colors hover:border-accent hover:bg-accent/10"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
