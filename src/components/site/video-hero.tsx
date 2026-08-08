"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Chooses a video source after mount based on viewport, data saver, and
 * reduced motion preferences. Without a usable source it renders nothing
 * and the poster image underneath carries the hero.
 */
export function HeroVideo({
  desktopUrl,
  mobileUrl,
  poster,
}: {
  desktopUrl: string | null;
  mobileUrl: string | null;
  poster: string;
}) {
  const reduce = useReducedMotion();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (reduce || !desktopUrl) return;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    // Client-only capability detection: the server renders the poster,
    // and this effect intentionally upgrades to video after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(isDesktop ? desktopUrl : (mobileUrl ?? desktopUrl));
  }, [desktopUrl, mobileUrl, reduce]);

  if (!src) return null;

  return (
    <video
      key={src}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
}
