import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

const stats = [
  {
    value: "<1%",
    label: "Share of global venture capital that reaches Africa each year",
  },
  {
    value: "83%",
    label: "Of early-2025 startup funding went to founders in just four countries",
  },
  {
    value: "45%",
    label: "Of Africa's VC now comes from local & regional investors",
  },
];

export function VisibilityGap() {
  return (
    <section aria-labelledby="visibility-gap" className="py-24 sm:py-32 bg-surface">
      <Container>
        <div className="max-w-3xl">
          <SectionHeader
            id="visibility-gap"
            eyebrow="The Funding Visibility Gap"
            title={
              <>
                Capital exists. It flows to the founders who <em className="text-accent italic">get seen.</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Africa is home to some of the world&apos;s most promising founders — building in climate, mobility, health and technology. Most of that work never reaches the people who could fund it, back it or buy it.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid gap-6 sm:grid-cols-3" stagger={0.1}>
          {stats.map((stat, i) => (
            <RevealItem key={i}>
              <div className="flex h-full flex-col justify-between rounded-md border border-border bg-card p-8">
                <span className="font-display text-4xl text-foreground sm:text-5xl">{stat.value}</span>
                <span className="mt-6 text-sm leading-relaxed text-muted-foreground">{stat.label}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.4}>
          <p className="mt-8 text-xs text-muted-foreground/70">
            Sources: Mo Ibrahim Foundation / Africa Development Advocacy (2025); AVCA Venture Capital Activity in Africa (2025).
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
