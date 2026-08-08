import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-40 pb-24 sm:px-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-12 w-full max-w-2xl" />
      <Skeleton className="mt-3 h-12 w-full max-w-xl" />
      <Skeleton className="mt-8 h-5 w-full max-w-md" />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full" />
        ))}
      </div>
    </div>
  );
}
