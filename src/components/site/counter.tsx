"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Animates a numeric statistic once when it enters the viewport.
 * Non numeric values (ranges, currency strings) render statically.
 */
export function StatValue({
  value,
  suffix,
  className,
}: {
  value: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const numeric = /^-?\d+$/.test(value.trim());
  const target = numeric ? parseInt(value, 10) : 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!numeric || reduce || !inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, numeric, reduce, target]);

  const animated = numeric && !reduce;

  return (
    <span ref={ref} className={className}>
      {animated ? display : value}
      {suffix ? <span className="text-accent">{suffix}</span> : null}
    </span>
  );
}
