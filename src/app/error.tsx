"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.35em] text-destructive uppercase">
        Something went wrong
      </p>
      <h1 className="mt-6 font-display text-4xl leading-tight text-foreground sm:text-6xl">
        We hit an unexpected error.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        This is on us, not you. Please try again, and if the problem continues, let us know.
      </p>
      <button
        onClick={reset}
        className="mt-10 inline-flex h-11 items-center justify-center rounded-sm bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
      >
        Try Again
      </button>
    </main>
  );
}
