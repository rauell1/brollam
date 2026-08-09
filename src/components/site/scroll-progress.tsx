"use client";

import { m, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Hairline reading-progress bar pinned to the top of the viewport.
 * Spring-smoothed so it trails the scroll rather than snapping to it.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-strong to-accent"
    />
  );
}
