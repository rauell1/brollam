import { Container } from "./container";
import { RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

const processStages = [
  {
    number: "01",
    name: "Discover",
    description: "Business, audience and investor audit",
  },
  {
    number: "02",
    name: "Position",
    description: "Narrative, brand and messaging built around what makes you fundable",
  },
  {
    number: "03",
    name: "Build",
    description: "Websites, content, campaign assets and pitch materials, produced in-house",
  },
  {
    number: "04",
    name: "Launch",
    description: "PR, media outreach, digital campaigns and investor-facing communications",
  },
  {
    number: "05",
    name: "Sustain",
    description: "Reporting and growth recommendations that keep momentum compounding",
  },
];

export function ProcessTimeline() {
  return (
    <section aria-labelledby="how-we-work" className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionHeader
          id="how-we-work"
          eyebrow="Our Process"
          title="A disciplined process, built for founders with no time to waste."
          className="mb-16"
        />

        {/* Desktop: horizontal timeline */}
        <RevealGroup className="hidden lg:block" stagger={0.12}>
          <ol className="relative grid grid-cols-5 gap-10">
            <span
              aria-hidden="true"
              className="absolute top-[9px] right-0 left-0 h-px bg-border-strong"
            />
            {processStages.map((stage) => (
              <RevealItem key={stage.number}>
                <li className="relative pt-2">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-[19px] w-[19px] rounded-full border border-accent bg-background p-[3px]"
                  >
                    <span className="block h-full w-full rounded-full bg-accent" />
                  </span>
                  <p className="mt-8 font-mono text-2xl text-foreground/25">{stage.number}</p>
                  <h3 className="mt-3 font-display text-2xl text-foreground">{stage.name}</h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>

        {/* Mobile / tablet: vertical timeline */}
        <RevealGroup className="lg:hidden" stagger={0.1}>
          <ol className="relative ml-1 border-l border-border-strong pl-8">
            {processStages.map((stage) => (
              <RevealItem key={stage.number}>
                <li className="relative pb-12 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[39px] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent bg-background"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                  </span>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-lg text-foreground/25">{stage.number}</span>
                    <h3 className="font-display text-[1.6rem] text-foreground">{stage.name}</h3>
                  </div>
                  <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </Container>
    </section>
  );
}
