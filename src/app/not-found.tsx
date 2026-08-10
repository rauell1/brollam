import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center texture-grain">
      {/* Engaging illustration placeholder */}
      <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-accent/10 border-2 border-dashed border-accent">
        <span className="text-6xl" role="img" aria-label="lost">🧭</span>
      </div>
      <p className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">404</p>
      <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground sm:text-7xl">
        This page went <em className="text-accent italic">unseen.</em>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        The page you are looking for does not exist or may have moved. Visibility is our business,
        so let us point you somewhere useful.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-sm border border-border-strong px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
