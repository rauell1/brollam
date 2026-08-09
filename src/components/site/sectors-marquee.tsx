import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { VelocityMarquee } from "./velocity-marquee";

const sectors = [
  "Clean Energy & E-Mobility",
  "Climate & AgriTech",
  "Health & Social Impact",
  "Fintech & Digital Services",
  "Consumer & Retail Brands",
  "Technology & SaaS",
];

function SectorRun() {
  return (
    <>
      {sectors.map((sector) => (
        <span key={sector} className="flex shrink-0 items-center gap-16 pr-16">
          <span className="font-display text-4xl font-medium tracking-tight whitespace-nowrap text-foreground sm:text-5xl">
            {sector}
          </span>
          <span className="h-3 w-3 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        </span>
      ))}
    </>
  );
}

export function SectorsMarquee() {
  return (
    <section
      id="sectors"
      aria-labelledby="sectors-heading"
      className="overflow-hidden bg-surface py-24 sm:py-32"
    >
      <Container>
        <SectionHeader id="sectors-heading" eyebrow="Sectors" title="Where we work." />
      </Container>

      <Reveal delay={0.15}>
        <div className="relative mt-16 flex w-full overflow-hidden bg-accent/5 py-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
          <VelocityMarquee baseSpeed={1.6} className="w-full">
            <SectorRun />
          </VelocityMarquee>
        </div>
      </Reveal>
    </section>
  );
}
