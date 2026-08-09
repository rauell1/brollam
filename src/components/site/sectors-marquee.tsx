"use client";

import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const sectors = [
  "Clean Energy & E-Mobility",
  "Climate & AgriTech",
  "Health & Social Impact",
  "Fintech & Digital Services",
  "Consumer & Retail Brands",
  "Technology & SaaS",
];

export function SectorsMarquee() {
  return (
    <section id="sectors" aria-labelledby="sectors-heading" className="py-24 sm:py-32 overflow-hidden bg-surface">
      <Container>
        <SectionHeader
          id="sectors-heading"
          eyebrow="Sectors"
          title="Where we work."
        />
      </Container>

      <Reveal delay={0.15}>
        <div className="mt-16 flex w-full flex-col gap-6">
          <div className="relative flex w-full overflow-hidden bg-accent/5 py-12">
            <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

            <div className="flex w-max animate-[marquee_48s_linear_infinite] items-center gap-16 px-8 hover:[animation-play-state:paused]">
              {[...sectors, ...sectors, ...sectors].map((sector, i) => (
                <div key={i} className="flex items-center gap-16 shrink-0">
                  <span className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                    {sector}
                  </span>
                  <span className="h-4 w-4 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
