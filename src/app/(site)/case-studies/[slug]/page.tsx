import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Reveal } from "@/components/site/reveal";
import { ResponsiveMedia } from "@/components/site/responsive-media";
import { RichText } from "@/components/site/rich-text";
import { StatValue } from "@/components/site/counter";
import { CtaSection } from "@/components/site/cta-section";
import {
  getCaseStudyBySlug,
  getNextCaseStudy,
  listServices,
} from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata, caseStudyJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return pageMetadata({
    title: `${caseStudy.title} | ${caseStudy.clientName}`,
    description: caseStudy.summary,
    path: `/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.featuredImage,
  });
}

const narrativeBlocks = [
  { key: "challenge", label: "The Challenge" },
  { key: "strategy", label: "The Strategy" },
  { key: "execution", label: "The Execution" },
  { key: "results", label: "The Results" },
] as const;

export default async function CaseStudyDetailPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const [caseStudy, services] = await Promise.all([getCaseStudyBySlug(slug), listServices()]);
  if (!caseStudy) notFound();

  const nextStudy = await getNextCaseStudy(caseStudy.slug);
  const relatedServices = services.filter((s) => caseStudy.relatedServiceSlugs.includes(s.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: caseStudy.title, path: `/case-studies/${caseStudy.slug}` },
        ])}
      />
      <JsonLd
        data={caseStudyJsonLd({
          title: caseStudy.title,
          summary: caseStudy.summary,
          slug: caseStudy.slug,
          image: caseStudy.featuredImage,
          publishedAt: caseStudy.publishedAt,
          clientName: caseStudy.clientName,
        })}
      />

      <PageHero
        eyebrow="Case Study"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: caseStudy.clientName },
        ]}
        title={caseStudy.title}
      >
        <Reveal delay={0.24}>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Client</dt>
              <dd className="mt-1.5 text-foreground">{caseStudy.clientName}</dd>
            </div>
            {caseStudy.industry ? (
              <div>
                <dt className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Industry</dt>
                <dd className="mt-1.5 text-foreground">{caseStudy.industry}</dd>
              </div>
            ) : null}
            {caseStudy.publishedAt ? (
              <div>
                <dt className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Published</dt>
                <dd className="mt-1.5 text-foreground">{formatDate(caseStudy.publishedAt)}</dd>
              </div>
            ) : null}
            {caseStudy.categories.length > 0 ? (
              <div>
                <dt className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Scope</dt>
                <dd className="mt-1.5 text-foreground">{caseStudy.categories.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
        </Reveal>
      </PageHero>

      <section className="py-16 sm:py-20" aria-label="Project visual">
        <Container>
          <Reveal>
            <ResponsiveMedia
              src={caseStudy.featuredImage}
              videoUrl={caseStudy.featuredVideo}
              alt={`${caseStudy.title} project visual`}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
            />
          </Reveal>
          {caseStudy.summary ? (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-10 max-w-3xl text-center font-display text-2xl leading-relaxed text-foreground sm:text-[1.7rem]">
                {caseStudy.summary}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-24" aria-label="Engagement narrative">
        <Container size="narrow">
          {narrativeBlocks.map((block, index) => {
            const content = caseStudy[block.key];
            if (!content) return null;
            return (
              <Reveal key={block.key} className={index > 0 ? "mt-16" : undefined}>
                <h2 className="font-display text-3xl text-foreground sm:text-4xl">
                  {block.label}
                </h2>
                <RichText content={content} className="mt-6" />
              </Reveal>
            );
          })}
        </Container>
      </section>

      {caseStudy.metrics.length > 0 && (
        <section className="border-t border-border bg-surface/40 py-16 sm:py-20" aria-label="Business results">
          <Container>
            <SectionHeader
              eyebrow="Business Results"
              title={
                <>
                  What <em className="text-accent italic">Changed.</em>
                </>
              }
              className="mb-12"
            />
            <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudy.metrics.map((metric, index) => (
                <Reveal key={metric.id} delay={index * 0.07}>
                  <div className="border-l-2 border-accent/50 pl-6">
                    <dd className="font-display text-4xl text-foreground sm:text-5xl">
                      <StatValue value={metric.value} />
                    </dd>
                    <dt className="mt-3 text-sm font-semibold text-foreground">{metric.label}</dt>
                    {metric.description ? (
                      <dd className="mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
                        {metric.description}
                      </dd>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="border-t border-border py-12" aria-label="Related capabilities">
          <Container className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Related Capabilities
            </p>
            <ul className="flex flex-wrap gap-2">
              {relatedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex h-9 items-center rounded-sm border border-border-strong px-4 text-[0.72rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:border-accent hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="border-t border-border" aria-label="More case studies">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-12">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            All Case Studies
          </Link>
          {nextStudy ? (
            <Link href={`/case-studies/${nextStudy.slug}`} className="group text-right">
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                Next Project
              </p>
              <p className="mt-2 inline-flex items-center gap-2 font-display text-2xl text-foreground transition-colors group-hover:text-accent-strong">
                {nextStudy.title}
                <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ) : null}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
