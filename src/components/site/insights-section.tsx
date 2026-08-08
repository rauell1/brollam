import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InsightDto } from "@/lib/data/public";
import { Container } from "./container";
import { InsightCard, InsightCardFeatured } from "./insight-card";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function InsightsSection({ insights }: { insights: InsightDto[] }) {
  if (insights.length === 0) return null;

  const [featured, ...rest] = insights;
  const supporting = rest.slice(0, 3);

  return (
    <section aria-labelledby="insights" className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            id="insights"
            eyebrow="Insights"
            title={
              <>
                Ideas That Drive <em className="text-accent italic">Growth.</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase transition-colors hover:text-accent-strong"
            >
              All Insights
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <InsightCardFeatured insight={featured} />
          </Reveal>
          {supporting.length > 0 && (
            <div className="grid content-start gap-10 border-t border-border pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
              {supporting.map((insight, index) => (
                <Reveal key={insight.id} delay={0.1 + index * 0.08}>
                  <InsightCard insight={insight} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
