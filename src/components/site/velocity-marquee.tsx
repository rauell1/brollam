"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/**
 * Marquee whose speed and direction respond to scroll.
 *
 * At rest it drifts at `baseSpeed`. Scrolling down accelerates it; scrolling
 * up drags it backwards. This replaces the fixed CSS `animate-[marquee]`
 * loops, which ran at a constant rate regardless of what the reader was
 * doing and read as decoration rather than response.
 *
 * `children` is rendered four times; the track translates across one copy's
 * width and wraps, so the seam is never visible.
 */
export function VelocityMarquee({
  children,
  baseSpeed = 2.2,
  direction = 1,
  className,
}: {
  children: ReactNode;
  /** Pixels per frame at rest. */
  baseSpeed?: number;
  /** 1 scrolls left, -1 scrolls right. */
  direction?: 1 | -1;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 48,
    stiffness: 380,
  });
  // Clamp so a flick of the wheel can't fling the track across the screen.
  const velocityFactor = useTransform(smoothVelocity, [-1800, 0, 1800], [-4, 0, 4], {
    clamp: true,
  });

  const directionRef = useRef(direction);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    // One repetition is a quarter of the rendered track.
    const unit = track.scrollWidth / 4;
    if (!unit) return;

    const v = velocityFactor.get();
    // Scrolling flips travel direction, matching the reader's momentum.
    if (v < -0.05) directionRef.current = -1;
    else if (v > 0.05) directionRef.current = 1;

    const frames = delta / 16.667;
    let moveBy = direction * directionRef.current * baseSpeed * frames;
    moveBy += direction * moveBy * Math.abs(v);

    let next = baseX.get() - moveBy;
    // Wrap into [-unit, 0) so the translation never grows unbounded.
    next = ((next % unit) - unit) % unit;
    baseX.set(next);
  });

  if (reduce) {
    return (
      <div className={className}>
        <div className="flex w-max items-center">{children}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <m.div ref={trackRef} className="flex w-max items-center" style={{ x: baseX }}>
        {children}
        {children}
        {children}
        {children}
      </m.div>
    </div>
  );
}
