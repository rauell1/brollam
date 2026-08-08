"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
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
    <div className="mx-auto flex max-w-lg flex-col items-center py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.3em] text-destructive uppercase">
        Admin error
      </p>
      <h1 className="mt-4 font-display text-3xl text-foreground">This section failed to load.</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The database may be temporarily unreachable. Try again in a moment.
      </p>
      <Button onClick={reset} className="mt-7">
        Retry
      </Button>
    </div>
  );
}
