import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyDto } from "@/lib/data/public";
import { CaseStudyCard } from "./case-study-card";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const aspects = ["aspect-[4/3]", "aspect-[16/11]", "aspect-[4/5]", "aspect-[16/11]", "aspect-[4/3]", "aspect-[16/12]"];
const offsets = ["lg:pt-0", "lg:pt-20", "lg:pt-10", "lg:pt-24", "lg:pt-0", "lg:pt-16"];

export function WorkGrid({ caseStudies }: { caseStudies: CaseStudyDto[] }) {
  return (
    <section aria-labelledby="our-work" className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            id="our-work"
            eyebrow="Selected Work"
            title={
              <>
                Work That Speaks <em className="text-accent italic">For Itself.</em>
              </>
            }
          />
          {caseStudies.length > 0 && (
            <Reveal delay={0.15}>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase transition-colors hover:text-accent-strong"
              >
                All Case Studies
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          )}
        </div>

        {caseStudies.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl border border-border bg-surface flex items-end p-7"
                >
                  <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-muted-foreground/50 uppercase">
                    Case study coming soon
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {caseStudies.slice(0, 6).map((caseStudy, index) => (
              <Reveal key={caseStudy.id} className={offsets[index % offsets.length]}>
                <CaseStudyCard
                  caseStudy={caseStudy}
                  aspect={aspects[index % aspects.length]}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
