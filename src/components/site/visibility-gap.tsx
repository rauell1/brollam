import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { visibilityChain } from "@/lib/content/sections";
import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

export function VisibilityGap() {
  return (
    <section aria-labelledby="visibility-gap" className="py-24 sm:py-32">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border sm:aspect-[5/5]">
              <Image
                src="/media/dev/visibility-gap.jpg"
                alt="Abstract editorial artwork representing unseen work becoming visible"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground/70">
              Artwork: development placeholder for campaign photography.
            </p>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeader
              id="visibility-gap"
              eyebrow="The Visibility Gap"
              title={
                <>
                  Most Businesses Don&apos;t Have A Product Problem.{" "}
                  <em className="text-accent italic">They Have A Visibility Problem.</em>
                </>
              }
            />
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>Most businesses are doing great work. The challenge is making sure the right people know about it.</p>
                <p>
                  Great products go unnoticed. Innovative companies miss opportunities. Strong brands
                  fail to reach customers, investors, partners, and media because their story is not
                  being communicated consistently.
                </p>
                <p className="text-foreground">
                  Brollam helps businesses build visibility through strategy, storytelling,
                  technology, communications, sales, and disciplined execution.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-accent uppercase transition-colors hover:text-accent-strong"
              >
                See How We Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* How visibility compounds */}
        <div className="mt-24 border-t border-border pt-16">
          <Reveal>
            <p className="text-[0.68rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              How visibility compounds
            </p>
          </Reveal>

          {/* Desktop: horizontal progression */}
          <RevealGroup className="mt-10 hidden lg:grid lg:grid-cols-8" stagger={0.08}>
            {visibilityChain.map((step, index) => (
              <RevealItem key={step.name} className="relative">
                <div className="relative border-l border-border py-2 pl-5 pr-4">
                  <span
                    className="absolute top-3.5 -left-[3px] h-[5px] w-[5px] rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {index < visibilityChain.length - 1 && (
                    <span
                      className="absolute top-[15px] left-0 h-px w-full bg-gradient-to-r from-border-strong to-transparent"
                      aria-hidden="true"
                    />
                  )}
                  <p
                    className={
                      step.name === "Growth"
                        ? "font-display text-xl text-accent italic"
                        : "font-display text-xl text-foreground"
                    }
                  >
                    {step.name}
                  </p>
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                    {step.note}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Mobile: vertical progression */}
          <RevealGroup className="mt-10 lg:hidden" stagger={0.07}>
            <ol className="relative ml-2 border-l border-border-strong">
              {visibilityChain.map((step) => (
                <RevealItem key={step.name}>
                  <li className="relative pb-7 pl-7 last:pb-0">
                    <span
                      className="absolute top-2 -left-[4px] h-[7px] w-[7px] rounded-full border border-accent bg-background"
                      aria-hidden="true"
                    />
                    <p
                      className={
                        step.name === "Growth"
                          ? "font-display text-lg text-accent italic"
                          : "font-display text-lg text-foreground"
                      }
                    >
                      {step.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.note}</p>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
