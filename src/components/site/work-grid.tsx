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
  if (caseStudies.length === 0) return null;

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
          <Reveal delay={0.15}>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase transition-colors hover:text-accent-strong"
            >
              All Case Studies
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

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
      </Container>
    </section>
  );
}
