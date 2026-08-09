import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { VelocityMarquee } from "./velocity-marquee";

const press = [
  "BBC",
  "CNN",
  "National Geographic",
  "Bloomberg",
  "The Economist",
  "Financial Times",
  "LA Times",
  "Business Daily Africa",
];

const brands = [
  "Roam Electric",
  "Jetour Kenya",
  "AVA — Associated Vehicle Assemblers",
  "Google",
  "Meta",
  "Uber",
  "Spotify",
  "TikTok",
  "Mastercard Foundation",
  "WWF Kenya",
  "AMREF Flying Doctors",
  "SasaPay",
  "EABL",
  "CFAO Motors",
  "TECNO",
];

function Run({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((name) => (
        <span
          key={name}
          className="shrink-0 pr-16 font-display text-3xl font-medium tracking-tight whitespace-nowrap text-foreground/45 transition-colors duration-300 hover:text-foreground sm:text-4xl"
        >
          {name}
        </span>
      ))}
    </>
  );
}

function Row({
  label,
  items,
  direction,
  speed,
}: {
  label: string;
  items: readonly string[];
  direction: 1 | -1;
  speed: number;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Container>
        <h3 className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </h3>
      </Container>
      <div className="relative flex w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <VelocityMarquee baseSpeed={speed} direction={direction} className="w-full">
          <Run items={items} />
        </VelocityMarquee>
      </div>
    </div>
  );
}

export function LogoWall() {
  return (
    <section
      id="companies"
      aria-labelledby="companies-heading"
      className="overflow-hidden bg-surface py-24 sm:py-32"
    >
      <Container>
        <SectionHeader
          id="companies-heading"
          eyebrow="Companies"
          title="Who we've worked with."
        />
      </Container>

      <Reveal delay={0.15}>
        <div className="mt-16 flex w-full flex-col gap-10">
          <Row label="As Seen In" items={press} direction={1} speed={1.4} />
          <Row label="Brands & Institutions" items={brands} direction={-1} speed={1.1} />
        </div>
      </Reveal>
    </section>
  );
}
