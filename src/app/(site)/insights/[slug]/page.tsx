import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal } from "@/components/site/reveal";
import { ResponsiveMedia } from "@/components/site/responsive-media";
import { RichText } from "@/components/site/rich-text";
import { InsightCard } from "@/components/site/insight-card";
import { SectionHeader } from "@/components/site/section-header";
import { CtaSection } from "@/components/site/cta-section";
import { getInsightBySlug, listRelatedInsights } from "@/lib/data/public";
import { articleJsonLd, breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    ogImage: insight.featuredImage,
    type: "article",
    publishedTime: insight.publishedAt?.toISOString(),
  });
}

export default async function InsightArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  const related = await listRelatedInsights(insight.category, insight.id, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: insight.title,
          excerpt: insight.excerpt,
          slug: insight.slug,
          image: insight.featuredImage,
          publishedAt: insight.publishedAt,
          authorName: insight.authorName,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ])}
      />

      <article className="pt-36 sm:pt-44">
        <Container size="narrow">
          <Reveal>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: insight.category },
              ]}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
              <span className="text-accent">{insight.category}</span>
              {insight.publishedAt ? (
                <time
                  dateTime={insight.publishedAt.toISOString()}
                  className="text-muted-foreground"
                >
                  {formatDate(insight.publishedAt)}
                </time>
              ) : null}
              <span className="text-muted-foreground">{insight.readingMinutes} min read</span>
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <h1 className="mt-5 font-display text-[2.2rem] leading-[1.12] text-balance text-foreground sm:text-5xl">
              {insight.title}
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-6 font-display text-xl leading-relaxed text-muted-foreground italic">
              {insight.excerpt}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex items-center gap-4 border-y border-border py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-display text-base text-accent italic">
                {insight.authorName
                  ? insight.authorName
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                  : "B"}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {insight.authorName ?? "Brollam Partners"}
                </p>
                {insight.authorRole ? (
                  <p className="text-xs text-muted-foreground">{insight.authorRole}</p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Container>

        {insight.featuredImage ? (
          <Container className="mt-12">
            <Reveal>
              <ResponsiveMedia
                src={insight.featuredImage}
                alt={`Artwork for ${insight.title}`}
                aspect="aspect-[16/8]"
                sizes="(min-width: 1280px) 1200px, 100vw"
                priority
                caption="Artwork: editorial placeholder from the Brollam media library."
              />
            </Reveal>
          </Container>
        ) : null}

        <Container size="narrow" className="py-16">
          <RichText content={insight.content} />
          <Reveal>
            <div className="mt-16 rounded-md border border-border bg-card p-8 sm:p-10">
              <p className="font-display text-2xl leading-snug text-foreground">
                Have a visibility problem of your own?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Brollam Partners helps businesses build brands, tell better stories, and reach the
                audiences that matter.
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-20" aria-label="Related insights">
          <Container>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SectionHeader eyebrow="Keep Reading" title="Related Insights" titleClassName="!text-3xl sm:!text-4xl" />
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                All Insights
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.07}>
                  <InsightCard insight={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
