import { trackRecordNote } from "@/lib/content/sections";
import type { StatDto } from "@/lib/data/public";
import { Container } from "./container";
import { StatValue } from "./counter";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function TrackRecord({ stats }: { stats: StatDto[] }) {
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="track-record" className="border-y border-border bg-surface/40 py-24 sm:py-28">
      <Container>
        <SectionHeader
          id="track-record"
          eyebrow="Track Record"
          title={
            <>
              Experience That Shows Up <em className="text-accent italic">In Numbers.</em>
            </>
          }
          className="mb-14"
        />
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08}>
              <div className="border-l-2 border-accent/50 pl-6">
                <dd className="font-display text-5xl leading-none text-foreground sm:text-6xl">
                  <StatValue value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-4 text-sm font-semibold text-foreground">{stat.label}</dt>
                {stat.description ? (
                  <dd className="mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                    {stat.description}
                  </dd>
                ) : null}
              </div>
            </Reveal>
          ))}
        </dl>
        <Reveal delay={0.2}>
          <p className="mt-14 max-w-2xl border-t border-border pt-6 text-[0.8rem] leading-relaxed text-muted-foreground italic">
            {trackRecordNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
