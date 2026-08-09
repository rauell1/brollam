"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { Container } from "./container";
import { RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { processStages } from "@/lib/content/sections";

/**
 * The five delivery stages, drawn as a track that fills while the section
 * moves through the viewport. Each node brightens as the fill reaches it, so
 * the process reads as something you move along rather than a static list.
 *
 * Stage copy comes from lib/content/sections so this and the about page can't
 * drift apart.
 */

/** Node lights up once the track fill has reached its position. */
function Node({
  progress,
  index,
  total,
  orientation,
}: {
  progress: ReturnType<typeof useSpring>;
  index: number;
  total: number;
  orientation: "horizontal" | "vertical";
}) {
  const at = total === 1 ? 0 : index / (total - 1);
  const start = Math.max(0, at - 0.08);

  const scale = useTransform(progress, [start, at], [0.55, 1]);
  const opacity = useTransform(progress, [start, at], [0.25, 1]);

  if (orientation === "horizontal") {
    return (
      <m.span
        aria-hidden="true"
        style={{ scale, opacity }}
        className="absolute top-0 left-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-accent bg-background"
      >
        <span className="block h-[9px] w-[9px] rounded-full bg-accent" />
      </m.span>
    );
  }

  return (
    <m.span
      aria-hidden="true"
      style={{ scale, opacity }}
      className="absolute top-1 -left-[39px] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent bg-background"
    >
      <span className="h-[5px] w-[5px] rounded-full bg-accent" />
    </m.span>
  );
}

export function ProcessTimeline() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 78%", "end 55%"],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 82%", "end 60%"],
  });

  const desktopFill = useSpring(desktopProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const mobileFill = useSpring(mobileProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const total = processStages.length;

  return (
    <section aria-labelledby="how-we-work" className="bg-surface py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="how-we-work"
          eyebrow="Our Process"
          title="A disciplined process, built for founders with no time to waste."
          className="mb-16"
        />

        {/* Desktop: horizontal track */}
        <div ref={desktopRef} className="hidden lg:block">
          <RevealGroup stagger={0.12}>
            <ol className="relative grid grid-cols-5 gap-10">
              {/* Unfilled track */}
              <span
                aria-hidden="true"
                className="absolute top-[9px] right-0 left-0 h-px bg-border-strong"
              />
              {/* Fill that follows scroll */}
              <m.span
                aria-hidden="true"
                style={{ scaleX: desktopFill }}
                className="absolute top-[9px] right-0 left-0 h-px origin-left bg-accent"
              />
              {processStages.map((stage, i) => (
                <RevealItem key={stage.number}>
                  <li className="relative pt-2">
                    <Node
                      progress={desktopFill}
                      index={i}
                      total={total}
                      orientation="horizontal"
                    />
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
        </div>

        {/* Mobile / tablet: vertical track */}
        <div ref={mobileRef} className="lg:hidden">
          <RevealGroup stagger={0.1}>
            <ol className="relative ml-1 pl-8">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-border-strong"
              />
              <m.span
                aria-hidden="true"
                style={{ scaleY: mobileFill }}
                className="absolute inset-y-0 left-0 w-px origin-top bg-accent"
              />
              {processStages.map((stage, i) => (
                <RevealItem key={stage.number}>
                  <li className="relative pb-12 last:pb-0">
                    <Node
                      progress={mobileFill}
                      index={i}
                      total={total}
                      orientation="vertical"
                    />
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
        </div>
      </Container>
    </section>
  );
}
