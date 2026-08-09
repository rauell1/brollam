"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { Container } from "./container";
import { KineticText } from "./kinetic-text";

/**
 * Closing statement of the homepage.
 *
 * The background used to point at /media/dev/commitment-bg.jpg, which never
 * shipped, so this was a 404 over a flat gradient. It's now a drifting
 * colour field built from layered radial gradients: nothing to download,
 * and it parallaxes against the scroll rather than sitting still.
 */
export function CommitmentParallax() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.35]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our Commitment"
      className="dark relative flex min-h-[78vh] items-center overflow-hidden py-32"
    >
      <div className="absolute inset-0 bg-[#07100e]" />

      {/* Drifting aurora: two counter-moving colour blooms */}
      <m.div className="absolute inset-0" style={{ y, opacity: glowOpacity }}>
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_22%_28%,rgba(201,154,61,0.30),transparent_62%)] animate-[aurora-drift_26s_ease-in-out_infinite] motion-reduce:animate-none" />
        <div
          className="absolute inset-0 bg-[radial-gradient(65%_55%_at_78%_72%,rgba(46,120,104,0.34),transparent_60%)] animate-[aurora-drift_34s_ease-in-out_infinite_reverse] motion-reduce:animate-none"
          style={{ animationDelay: "-8s" }}
        />
      </m.div>

      {/* Fine rule grid gives the field a sense of scale */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:88px_88px]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#07100e] via-transparent to-[#07100e]" />

      <Container className="relative z-10">
        <KineticText
          as="h2"
          text="The next wave of African founders won't lose to a bad product."
          className="block max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-balance text-foreground"
        />
        <KineticText
          as="h2"
          text="They'll lose to bad visibility."
          delay={0.35}
          className="mt-2 block max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-balance text-accent italic"
        />
      </Container>
    </section>
  );
}
