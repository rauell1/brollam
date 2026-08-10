"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="mx-auto max-w-md rounded-2xl bg-card border border-border shadow-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Ready to start?</p>
          <p className="text-xs text-muted-foreground">Let's build something great.</p>
        </div>
        <Link
          href="/contact"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent-strong transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
