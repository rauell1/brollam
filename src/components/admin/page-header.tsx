import Link from "next/link";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  createHref,
  createLabel,
  children,
}: {
  title: string;
  description?: string;
  createHref?: string;
  createLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl text-foreground sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {createHref && createLabel ? (
          <Link
            href={createHref}
            className="inline-flex h-10 items-center gap-2 rounded-sm bg-accent px-4 text-xs font-semibold tracking-[0.12em] text-accent-foreground uppercase transition-colors hover:bg-accent-strong"
          >
            <Plus className="h-4 w-4" />
            {createLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
