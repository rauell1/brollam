"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

const steps = [
  {
    num: "01",
    title: "Position",
    description: "Brand, narrative and messaging that make your value obvious in the first ten seconds.",
  },
  {
    num: "02",
    title: "Amplify",
    description: "PR, campaigns, content and a digital presence built to get you covered and found.",
  },
  {
    num: "03",
    title: "Connect",
    description: "Sales pipelines, partnerships and investor-facing communications that convert visibility into deals.",
  },
];

function TiltCard({ num, title, description }: { num: string; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 15);
    y.set(yPct * -15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex h-full flex-col justify-between rounded-xl border border-border bg-card p-8 transition-colors hover:border-accent/50"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <span className="font-display text-4xl text-accent/50">{num}</span>
        <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3>
      </div>
      <p style={{ transform: "translateZ(20px)" }} className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-heading" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="what-we-do-heading"
          eyebrow="What We Do"
          title="A three-step approach to getting you seen."
        />

        <RevealGroup className="mt-16 grid gap-8 perspective-[1000px] sm:grid-cols-3" stagger={0.15}>
          {steps.map((step) => (
            <RevealItem key={step.num}>
              <TiltCard {...step} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
