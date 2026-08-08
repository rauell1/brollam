"use client";

import { useMemo, useState } from "react";
import type { InsightDto } from "@/lib/data/public";
import { cn } from "@/lib/utils";
import { InsightCard, InsightCardFeatured } from "./insight-card";
import { Reveal } from "./reveal";

export function InsightIndex({ insights }: { insights: InsightDto[] }) {
  const categories = useMemo(
    () => Array.from(new Set(insights.map((i) => i.category))).sort(),
    [insights],
  );
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? insights.filter((i) => i.category === active) : insights;
  const [featured, ...rest] = filtered;

  return (
    <div>
      {categories.length > 1 && (
        <div
          className="mb-12 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter insights by category"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={cn(
              "h-9 rounded-sm border px-4 text-[0.68rem] font-semibold tracking-[0.16em] uppercase transition-colors",
              active === null
                ? "border-accent bg-accent/10 text-accent"
                : "border-border-strong text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            All Topics
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(active === category ? null : category)}
              aria-pressed={active === category}
              className={cn(
                "h-9 rounded-sm border px-4 text-[0.68rem] font-semibold tracking-[0.16em] uppercase transition-colors",
                active === category
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border-strong text-muted-foreground hover:border-accent/50 hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {featured ? (
        <>
          <Reveal>
            <div className="border-b border-border pb-14">
              <InsightCardFeatured insight={featured} />
            </div>
          </Reveal>
          {rest.length > 0 && (
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((insight, index) => (
                <Reveal key={insight.id} delay={(index % 3) * 0.07}>
                  <InsightCard insight={insight} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="rounded-md border border-dashed border-border-strong bg-card/40 px-8 py-16 text-center text-sm text-muted-foreground">
          No insights in this category yet.
        </p>
      )}
    </div>
  );
}
