import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Shared media renderer. Every visual asset on the site funnels through
 * this component so placeholders can be swapped for real Brollam work
 * in one place, from the CMS.
 */
export function ResponsiveMedia({
  src,
  alt,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  imageClassName,
  priority = false,
  caption,
  videoUrl,
}: {
  src: string | null;
  alt: string;
  aspect?: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  caption?: string;
  videoUrl?: string | null;
}) {
  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden rounded-md border border-border bg-card", aspect)}>
        {videoUrl ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            preload="none"
            poster={src ?? undefined}
          >
            <source src={videoUrl} type={videoUrl.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        ) : src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imageClassName)}
          />
        ) : (
          <div
            className="texture-dots absolute inset-0 flex items-center justify-center bg-card text-muted-foreground/50"
            role="img"
            aria-label={alt}
          >
            <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase">
              {alt || "Media placeholder"}
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs text-muted-foreground/80">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
