"use client";

import { Fragment } from "react";
import { m, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word mask reveal. Each word sits in an overflow-hidden clip and
 * rises into place, which reads as typesetting rather than a generic fade.
 *
 * The text appears in the DOM exactly once — no aria-hidden duplicate beside
 * an sr-only copy. That mirrored approach is common but it doubles the string
 * for copy-paste, find-in-page and crawlers. Here the spaces between words are
 * real text nodes sitting outside the inline-block clips, so selection and
 * screen readers get one correctly-spaced sentence.
 */
export function KineticText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.055,
  accentFrom,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Index of the first word that should render in the accent italic. */
  accentFrom?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <m.span
        style={{ display: "inline" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-12% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
            >
              <m.span
                className={cn(
                  "inline-block",
                  accentFrom !== undefined && i >= accentFrom && "text-accent italic",
                )}
                variants={{
                  hidden: { y: "110%" },
                  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
                }}
              >
                {word}
              </m.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </m.span>
    </Tag>
  );
}
