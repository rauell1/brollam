import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  compact = false,
}: {
  className?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Brollam Partners, home"
      className={cn("group inline-flex items-baseline gap-2", className)}
    >
      <span className="text-[1.05rem] font-extrabold tracking-[0.24em] text-foreground transition-colors group-hover:text-accent-strong">
        BROLLAM
      </span>
      {!compact && (
        <span className="text-[0.58rem] font-semibold tracking-[0.42em] text-accent">
          PARTNERS
        </span>
      )}
    </Link>
  );
}
