import type { ClientDto, StatDto } from "@/lib/data/public";
import { Container } from "./container";
import { StatValue } from "./counter";
import { Reveal } from "./reveal";

export function ProofBar({ stats }: { stats: StatDto[] }) {
  if (stats.length === 0) return null;

  return (
    <section aria-label="Company statistics" className="border-y border-border bg-surface/60">
      <Container>
        <dl
          className="grid grid-cols-2 gap-px lg:grid-cols-[repeat(var(--stat-count),1fr)]"
          style={{ ["--stat-count" as string]: Math.min(stats.length, 5) }}
        >
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08} className="flex flex-col bg-surface/60 px-6 py-9">
              <dt className="order-2 mt-3 text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-4xl text-foreground sm:text-5xl">
                <StatValue value={stat.value} suffix={stat.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function TrustedBy({ clients }: { clients: ClientDto[] }) {
  if (clients.length === 0) return null;

  const row = (
    <>
      {clients.map((client) => (
        <span
          key={client.id}
          className="mx-8 shrink-0 font-display text-2xl tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground sm:mx-12 sm:text-3xl"
        >
          {client.name}
        </span>
      ))}
    </>
  );

  return (
    <section aria-label="Trusted by" className="border-b border-border py-12">
      <p className="text-center text-[0.65rem] font-semibold tracking-[0.34em] text-muted-foreground uppercase">
        Trusted By
      </p>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center hover:[animation-play-state:paused]">
          <div className="flex items-center">{row}</div>
          <div className="flex items-center motion-reduce:hidden" aria-hidden="true">
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}
