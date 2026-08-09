"use client";

import { useMemo, useState } from "react";
import type { CaseStudyDto } from "@/lib/data/public";
import { cn } from "@/lib/utils";
import { CaseStudyCard } from "./case-study-card";
import { Reveal } from "./reveal";

export function CaseStudyIndex({ caseStudies }: { caseStudies: CaseStudyDto[] }) {
  const categories = useMemo(() => {
    const all = caseStudies.flatMap((c) => c.categories);
    return Array.from(new Set(all)).sort();
  }, [caseStudies]);

  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? caseStudies.filter((c) => c.categories.includes(active))
    : caseStudies;

  return (
    <div>
      {categories.length > 1 && (
        <div
          className="mb-12 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter case studies by category"
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
            All Work
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

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {visible.map((caseStudy, index) => (
          <Reveal key={caseStudy.id} delay={(index % 2) * 0.08}>
            <CaseStudyCard
              caseStudy={caseStudy}
              aspect={index % 3 === 1 ? "aspect-[16/11]" : "aspect-[4/3]"}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
