"use client";

import { useRef } from "react";
import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

export function TeamTiltCard({
  name,
  role,
  bio,
  expertise = [],
}: {
  name: string;
  role: string;
  bio: string;
  /** Practice areas, shown as chips beneath the biography. */
  expertise?: string[];
}) {
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
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 12);
    y.set(yPct * -12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="flex h-full flex-col group"
    >
      <div style={{ transform: "translateZ(20px)" }} className="flex-1">
        <h3 className="font-display text-xl text-foreground">{name}</h3>
        <p className="mt-2 font-mono text-[0.65rem] tracking-[0.18em] text-accent uppercase">
          {role}
        </p>
        {bio ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
            {bio}
          </p>
        ) : null}
        {expertise.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {expertise.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border px-2.5 py-1 text-[0.68rem] text-muted-foreground transition-colors group-hover:border-accent/30"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </m.div>
  );
}
