"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SiteError({
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
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.3em] text-destructive uppercase">
        Something went wrong
      </p>
      <h1 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
        This section failed to load.
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
        An unexpected error interrupted the page. Please try again.
      </p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </div>
  );
}
