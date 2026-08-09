"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 * Uses raw pointer handlers (not motion gestures) so it stays inside the
 * `domAnimation` feature set loaded by LazyMotion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset the element travels. */
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </m.span>
  );
}
