import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

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

export function LogoWall() {
  return (
    <section id="companies" aria-labelledby="companies-heading" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="companies-heading"
          eyebrow="Companies"
          title="Who we've worked with."
        />
      </Container>

      <Reveal delay={0.15}>
        <div className="mt-16 flex w-full flex-col gap-10">
          
          {/* Row 1: As Seen In (Scrolls Left) */}
          <div className="relative flex w-full flex-col gap-4">
            <Container>
              <h4 className="text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                As Seen In
              </h4>
            </Container>
            <div className="relative flex w-full overflow-hidden py-4">
              <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

              <div className="flex w-max animate-[marquee_48s_linear_infinite] items-center gap-16 px-8 hover:[animation-play-state:paused]">
                {[...press, ...press, ...press].map((logo, i) => (
                  <div key={i} className="flex items-center gap-16 shrink-0">
                    <span className="font-display text-3xl font-medium tracking-tight text-foreground/50 grayscale transition-all hover:text-foreground hover:grayscale-0 sm:text-4xl">
                      {logo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Brands & Partners (Scrolls Right) */}
          <div className="relative flex w-full flex-col gap-4">
            <Container>
              <h4 className="text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Brands & Institutions
              </h4>
            </Container>
            <div className="relative flex w-full overflow-hidden py-4">
              <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

              <div className="flex w-max animate-[marquee_60s_linear_infinite_reverse] items-center gap-16 px-8 hover:[animation-play-state:paused]">
                {[...brands, ...brands, ...brands].map((logo, i) => (
                  <div key={i} className="flex items-center gap-16 shrink-0">
                    <span className="font-display text-3xl font-medium tracking-tight text-foreground/50 grayscale transition-all hover:text-foreground hover:grayscale-0 sm:text-4xl">
                      {logo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
