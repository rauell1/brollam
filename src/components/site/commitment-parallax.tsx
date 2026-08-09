"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function CommitmentParallax() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our Commitment"
      className="dark relative flex min-h-[70vh] items-center overflow-hidden py-32"
    >
      {/* Gradient base — holds visual weight even without photography */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a18] via-[#0b0b0a] to-[#0b0b0a]" />
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/media/dev/commitment-bg.jpg"
          alt="Parallax background"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-background/55" />
      </motion.div>

      <Container className="relative z-10">
        <Reveal>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-foreground">
            The next wave of African founders won&apos;t lose to a bad product. <br />
            <em className="text-accent italic">They&apos;ll lose to bad visibility.</em>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
