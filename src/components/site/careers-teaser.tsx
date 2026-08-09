import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

const tags = [
  "Brand & Design",
  "Communications & PR",
  "B2B Sales",
  "Clean Energy Engineering",
  "Software & Web",
];

export function CareersTeaser() {
  return (
    <section id="careers" aria-labelledby="careers-heading" className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              id="careers-heading"
              eyebrow="Careers"
              title="Work that spans design, deals and deployment."
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We bring in operators, strategists and engineers for specific engagements. If that&apos;s you, we&apos;d like to hear from you before we need you.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 flex flex-wrap gap-2" stagger={0.05}>
              {tags.map((tag) => (
                <RevealItem key={tag}>
                  <span className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground">
                    {tag}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.3}>
              <Link
                href="/careers"
                className="group mt-12 inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-accent px-6 text-xs font-semibold tracking-wide text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                Join Our Talent Network
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-center rounded-xl bg-card p-10 border border-border">
              <dl className="grid gap-8">
                <div>
                  <dt className="text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">Engagement type</dt>
                  <dd className="mt-2 font-display text-xl text-foreground">Project & retainer</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">Where</dt>
                  <dd className="mt-2 font-display text-xl text-foreground">Nairobi & remote</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">Current openings</dt>
                  <dd className="mt-2 font-display text-xl text-foreground">Rolling / by project</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
