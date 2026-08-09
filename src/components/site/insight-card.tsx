import Link from "next/link";
import type { InsightDto } from "@/lib/data/public";
import { formatDate } from "@/lib/utils";
import { ResponsiveMedia } from "./responsive-media";

export function InsightMeta({ insight, light = false }: { insight: InsightDto; light?: boolean }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
      <span className="text-accent">{insight.category}</span>
      {insight.publishedAt ? (
        <span className={light ? "text-foreground/70" : "text-muted-foreground"}>
          {formatDate(insight.publishedAt)}
        </span>
      ) : null}
      <span className={light ? "text-foreground/70" : "text-muted-foreground"}>
        {insight.readingMinutes} min read
      </span>
    </p>
  );
}

export function InsightCard({ insight }: { insight: InsightDto }) {
  return (
    <Link href={`/insights/${insight.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <ResponsiveMedia
          src={insight.featuredImage}
          alt={`Artwork for ${insight.title}`}
          aspect="aspect-[16/10]"
          sizes="(min-width: 1024px) 30vw, 100vw"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="mt-5">
          <InsightMeta insight={insight} />
          <h3 className="mt-2.5 font-display text-[1.45rem] leading-snug text-foreground transition-colors group-hover:text-accent-strong">
            {insight.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[0.88rem] leading-relaxed text-muted-foreground">
            {insight.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

export function InsightCardFeatured({ insight }: { insight: InsightDto }) {
  return (
    <Link href={`/insights/${insight.slug}`} className="group block h-full">
      <article className="grid h-full items-center gap-7 sm:gap-9">
        <ResponsiveMedia
          src={insight.featuredImage}
          alt={`Artwork for ${insight.title}`}
          aspect="aspect-[16/10]"
          sizes="(min-width: 1024px) 55vw, 100vw"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div>
          <InsightMeta insight={insight} />
          <h3 className="mt-3 font-display text-3xl leading-tight text-foreground transition-colors group-hover:text-accent-strong sm:text-4xl">
            {insight.title}
          </h3>
          <p className="mt-4 line-clamp-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {insight.excerpt}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {insight.authorName ? `By ${insight.authorName}` : "By Brollam Partners"}
          </p>
        </div>
      </article>
    </Link>
  );
}
