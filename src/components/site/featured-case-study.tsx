import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudyDto } from "@/lib/data/public";
import { Container } from "./container";
import { ResponsiveMedia } from "./responsive-media";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { StatValue } from "./counter";

export function FeaturedCaseStudy({ caseStudy }: { caseStudy: CaseStudyDto | null }) {
  if (!caseStudy) return null;

  const metrics = caseStudy.metrics.slice(0, 3);

  return (
    <section aria-labelledby="featured-case-study" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="featured-case-study"
          eyebrow="Featured Case Study"
          title={
            <>
              Visibility That Creates <em className="text-accent italic">Results.</em>
            </>
          }
          className="mb-14"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ResponsiveMedia
              src={caseStudy.featuredImage}
              videoUrl={caseStudy.featuredVideo}
              alt={`${caseStudy.title} project visual for ${caseStudy.clientName}`}
              aspect="aspect-[16/11]"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="lg:order-1"
            />
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                <span className="text-accent">{caseStudy.clientName}</span>
                {caseStudy.industry ? (
                  <>
                    <span aria-hidden="true" className="h-px w-4 bg-border-strong" />
                    <span>{caseStudy.industry}</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                {caseStudy.title}
              </h3>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                {caseStudy.summary}
              </p>
            </Reveal>

            {metrics.length > 0 && (
              <Reveal delay={0.2}>
                <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-border pt-7">
                  {metrics.map((metric) => (
                    <div key={metric.id}>
                      <dd className="font-display text-3xl text-foreground sm:text-4xl">
                        <StatValue value={metric.value} />
                      </dd>
                      <dt className="mt-2 text-[0.68rem] leading-snug font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            <Reveal delay={0.28}>
              <Link
                href={`/case-studies/${caseStudy.slug}`}
                className="group mt-9 inline-flex h-12 items-center gap-2 rounded-sm border border-accent/50 px-7 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/10"
              >
                Read Full Case Study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
