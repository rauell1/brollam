import { ecosystemChannels } from "@/lib/content/sections";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

export function EcosystemSection() {
  return (
    <section aria-labelledby="why-brollam" className="relative overflow-hidden border-t border-border py-24 sm:py-32 texture-grain">
      <Container>
        <SectionHeader
          id="why-brollam"
          eyebrow="Why Brollam"
          title={
            <>
              One Team. <em className="text-accent italic">Every Channel.</em>
            </>
          }
          align="center"
          className="mb-6"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every touchpoint shapes how people experience your business. We connect them to build
            visibility that creates lasting business value.
          </p>
        </Reveal>

        <RevealGroup className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
          {ecosystemChannels.map((channel, index) => {
            const isGrowth = channel === "Growth";
            return (
              <RevealItem key={channel}>
                <div
                  className={cn(
                    "flex h-full min-h-[5.5rem] flex-col justify-between rounded-sm border px-4 py-3.5 transition-colors",
                    isGrowth
                      ? "border-accent/60 bg-accent/10"
                      : "border-border bg-card/60 hover:border-accent/30",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.6rem] font-semibold tracking-[0.26em]",
                      isGrowth ? "text-accent" : "text-muted-foreground/60",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "mt-3 font-display text-[1.1rem] leading-tight sm:text-lg",
                      isGrowth ? "text-accent italic" : "text-foreground",
                    )}
                  >
                    {channel}
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
