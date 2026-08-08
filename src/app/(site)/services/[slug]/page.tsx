import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { CaseStudyCard } from "@/components/site/case-study-card";
import { InsightCard } from "@/components/site/insight-card";
import { CtaSection } from "@/components/site/cta-section";
import { RichText } from "@/components/site/rich-text";
import { processStages } from "@/lib/content/sections";
import {
  getServiceBySlug,
  listCaseStudies,
  listInsights,
  listServices,
} from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    ogImage: service.featuredImage,
  });
}

/** Map service slugs to insight categories for editorial relevance. */
const serviceInsightCategories: Record<string, string[]> = {
  "brand-strategy-and-identity": ["Branding", "Business"],
  "communications-and-pr": ["Communications", "PR", "Business"],
  "marketing-and-campaigns": ["Marketing", "AI", "SEO", "Events", "Business"],
  "web-and-product-development": ["Technology", "SEO", "AI"],
  "b2b-sales-and-partnerships": ["Business", "Marketing"],
  "clean-energy-and-emobility-advisory": ["Clean Energy", "E-Mobility", "Technology"],
};

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, services, caseStudies, insights] = await Promise.all([
    getServiceBySlug(slug),
    listServices(),
    listCaseStudies(),
    listInsights(),
  ]);
  if (!service) notFound();

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const nextService = services[(currentIndex + 1) % services.length];
  const relatedWork = caseStudies.filter((c) => c.relatedServiceSlugs.includes(slug)).slice(0, 2);
  const preferredCategories = serviceInsightCategories[slug] ?? [];
  const relatedInsights = insights
    .filter((i) => preferredCategories.includes(i.category))
    .concat(insights.filter((i) => !preferredCategories.includes(i.category)))
    .slice(0, 2);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`Service ${String(service.position).padStart(2, "0")}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        title={service.title}
        description={service.shortDescription}
      />

      {/* Overview + capabilities */}
      <section className="py-20 sm:py-28" aria-labelledby="service-overview">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <SectionHeader id="service-overview" eyebrow="Overview" title="The Business Problem We Solve" titleClassName="!text-3xl sm:!text-4xl" />
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <RichText content={service.fullDescription} />
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="rounded-md border border-border bg-card p-7 sm:p-9">
                  <h2 className="text-[0.68rem] font-semibold tracking-[0.28em] text-accent uppercase">
                    What Brollam Provides
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {service.capabilities.map((capability) => (
                      <li key={capability.id} className="flex gap-3.5">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40">
                          <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[0.95rem] font-semibold text-foreground">
                            {capability.title}
                          </p>
                          {capability.description ? (
                            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted-foreground">
                              {capability.description}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24" aria-labelledby="service-approach">
        <Container>
          <SectionHeader
            id="service-approach"
            eyebrow="Our Approach"
            title="How This Service Runs"
            description="Every engagement follows the same disciplined arc, scoped to what your project actually needs."
            className="mb-12"
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
            {processStages.map((stage) => (
              <RevealItem key={stage.number}>
                <div className="h-full rounded-sm border border-border bg-card p-6">
                  <p className="font-display text-3xl text-accent/60">{stage.number}</p>
                  <h3 className="mt-3 font-display text-xl text-foreground">{stage.name}</h3>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {relatedWork.length > 0 && (
        <section className="py-20 sm:py-24" aria-labelledby="related-work">
          <Container>
            <SectionHeader id="related-work" eyebrow="Relevant Work" title="Proof In Practice" className="mb-12" />
            <div className="grid gap-10 sm:grid-cols-2">
              {relatedWork.map((caseStudy) => (
                <Reveal key={caseStudy.id}>
                  <CaseStudyCard caseStudy={caseStudy} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {relatedInsights.length > 0 && (
        <section
          className={cn("py-20 sm:py-24", relatedWork.length > 0 && "border-t border-border")}
          aria-labelledby="related-insights"
        >
          <Container>
            <SectionHeader id="related-insights" eyebrow="Thinking" title="Related Insights" className="mb-12" />
            <div className="grid gap-10 sm:grid-cols-2">
              {relatedInsights.map((insight) => (
                <Reveal key={insight.id}>
                  <InsightCard insight={insight} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Next service */}
      {nextService ? (
        <section className="border-t border-border" aria-label="Next service">
          <Container>
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex flex-wrap items-center justify-between gap-6 py-14"
            >
              <div>
                <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                  Next Service
                </p>
                <p className="mt-3 font-display text-3xl text-foreground transition-colors group-hover:text-accent-strong sm:text-4xl">
                  {nextService.title}
                </p>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong text-muted-foreground transition-all group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-border py-16" aria-label="Start a project">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl text-foreground sm:text-3xl">
              Have a {service.title} challenge in front of you?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us where you want to be seen. We will show you how to get there.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-sm bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            Start Your Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
