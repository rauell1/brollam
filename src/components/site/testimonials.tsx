"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Quote } from "lucide-react";
import { Container } from "./container";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import type { TestimonialDto } from "@/lib/data/public";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 7000;

/**
 * Auto-advancing client quotes.
 *
 * The testimonials collection has existed in the CMS (and the admin CRUD)
 * since launch but nothing on the public site ever read it. This is that
 * missing surface. It renders nothing until real, published testimonials
 * exist. Placeholder quotes attributed to real companies are not an option.
 */
export function Testimonials({ testimonials }: { testimonials: TestimonialDto[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = testimonials.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused || reduce) return;
    timer.current = setTimeout(() => go(index + 1), INTERVAL);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, count, reduce, go]);

  if (count === 0) return null;

  const active = testimonials[index];
  const attribution = [active.role, active.company].filter(Boolean).join(", ");

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Oversized quote glyph as a background mark */}
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-4 h-64 w-64 text-accent/[0.05] sm:right-16 sm:h-96 sm:w-96"
        strokeWidth={1}
      />

      <Container>
        <SectionHeader
          id="testimonials-heading"
          eyebrow="In Their Words"
          title="What working with us looks like."
        />

        <div className="mt-16 min-h-[16rem]">
          <AnimatePresence mode="wait">
            <m.figure
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <blockquote className="max-w-4xl font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.28] text-balance text-foreground">
                &ldquo;{active.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                <span>
                  <span className="block font-display text-lg text-foreground">
                    {active.clientName}
                  </span>
                  {attribution ? (
                    <span className="mt-0.5 block font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
                      {attribution}
                    </span>
                  ) : null}
                </span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>

        {count > 1 ? (
          <div className="mt-12 flex items-center gap-3" role="tablist" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial from ${t.clientName}`}
                onClick={() => go(i)}
                className="group relative h-6 py-2.5"
                style={{ width: i === index ? 56 : 24 }}
              >
                <span
                  className={cn(
                    "block h-px w-full transition-colors duration-500",
                    i === index
                      ? "bg-accent"
                      : "bg-border-strong group-hover:bg-muted-foreground",
                  )}
                />
                {/* Timer bar fills across the active tab */}
                {i === index && !paused && !reduce && count > 1 ? (
                  <m.span
                    key={`fill-${index}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    className="absolute inset-x-0 top-2.5 h-[2px] origin-left bg-accent"
                  />
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
