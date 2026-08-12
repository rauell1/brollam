import Link from "next/link";
import Image from "next/image";
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
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src="/logo-icon.jpg"
          alt="Brollam Icon"
          width={100}
          height={100}
          className="h-10 w-auto object-contain dark:mix-blend-screen mix-blend-multiply invert dark:invert-0 transition-all duration-300"
          priority
        />
      </div>
      <span className="text-[1.05rem] font-extrabold tracking-[0.24em] text-foreground transition-colors group-hover:text-accent-strong">
        BROLLAM
      </span>
      {!compact && (
        <span className="text-[0.58rem] font-semibold tracking-[0.42em] text-accent translate-y-[2px]">
          PARTNERS
        </span>
      )}
    </Link>
  );
}
