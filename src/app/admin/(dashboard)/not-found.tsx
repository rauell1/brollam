import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">404</p>
      <h1 className="mt-4 font-display text-3xl text-foreground">Record not found.</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        It may have been deleted, or the link is out of date.
      </p>
      <Link
        href="/admin"
        className="mt-7 inline-flex h-10 items-center rounded-sm bg-accent px-5 text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase transition-colors hover:bg-accent-strong"
      >
        Back to Overview
      </Link>
    </div>
  );
}
