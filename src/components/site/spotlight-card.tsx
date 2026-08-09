"use client";

import { useRef } from "react";
import { m, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card that lights a soft accent pool under the cursor.
 *
 * The glow lives in an aria-hidden overlay driven by motion values, so
 * tracking the pointer never triggers a React re-render.
 */
export function SpotlightCard({
  children,
  className,
  size = 340,
}: {
  children: ReactNode;
  className?: string;
  /** Diameter of the glow, in pixels. */
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--accent) 14%, transparent), transparent 72%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const reset = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={reduce ? undefined : handleMove}
      onMouseLeave={reduce ? undefined : reset}
      className={cn("group relative overflow-hidden", className)}
    >
      {!reduce ? (
        <m.span
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
      <div className="relative h-full">{children}</div>
    </div>
  );
}
