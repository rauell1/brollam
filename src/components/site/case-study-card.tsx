import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyDto } from "@/lib/data/public";
import { cn } from "@/lib/utils";
import { ResponsiveMedia } from "./responsive-media";

export function CaseStudyCard({
  caseStudy,
  aspect = "aspect-[4/3]",
  className,
}: {
  caseStudy: CaseStudyDto;
  aspect?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={cn("group block", className)}
    >
      <article>
        <ResponsiveMedia
          src={caseStudy.featuredImage}
          alt={`${caseStudy.title} for ${caseStudy.clientName}`}
          aspect={aspect}
          sizes="(min-width: 1024px) 45vw, 100vw"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.65rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              <span className="text-accent">{caseStudy.clientName}</span>
              {caseStudy.industry ? <span>{caseStudy.industry}</span> : null}
              {caseStudy.categories.slice(0, 2).map((category) => (
                <span key={category} className="rounded-xs border border-border px-1.5 py-0.5">
                  {category}
                </span>
              ))}
            </div>
            <h3 className="mt-2.5 font-display text-2xl leading-snug text-foreground transition-colors group-hover:text-accent-strong">
              {caseStudy.title}
            </h3>
          </div>
          <span
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-all group-hover:border-accent group-hover:text-accent"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
