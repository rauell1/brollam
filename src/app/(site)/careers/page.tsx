import { Briefcase, CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { CtaSection } from "@/components/site/cta-section";
import { EmptyState } from "@/components/site/empty-state";
import { Reveal } from "@/components/site/reveal";
import { RichText } from "@/components/site/rich-text";
import { site } from "@/lib/config";
import { listOpenCareers } from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata, jobPostingJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Work with Brollam Partners in Nairobi: an integrated team spanning brand strategy, communications, marketing, technology, and clean energy.",
  path: "/careers",
});

export default async function CareersPage() {
  const careers = await listOpenCareers();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      {careers.map((career) => (
        <JsonLd
          key={`jsonld-${career.id}`}
          data={jobPostingJsonLd({
            title: career.title,
            description: career.description || career.summary || "Open position.",
            location: career.location || "Remote",
            employmentType: career.employmentType || "FULL_TIME",
            url: `${site.url}/careers#${career.id}`,
            datePosted: new Date(), // Ideally this would come from a createdAt field, defaulting to now
            validThrough: career.closesAt,
          })}
        />
      ))}
      <PageHero
        eyebrow="Careers"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        title={
          <>
            Work That Spans Design, <em className="text-accent italic">Deals And Deployment.</em>
          </>
        }
        description="We bring in operators, strategists and engineers for specific engagements. If that's you, we'd like to hear from you before we need you."
      />

      <section className="py-20 sm:py-24" aria-label="Open positions">
        <Container size="narrow">
          {careers.length === 0 ? (
            <Reveal>
              <EmptyState
                icon={Briefcase}
                title="No open roles right now"
                description={
                  site.email
                    ? `No active openings right now — we hire for specific engagements, not a standing roster. If you work across brand, PR, sales or clean energy and want to be on our radar, introduce yourself at ${site.email}.`
                    : "No active openings right now. We hire for specific engagements, so check back or reach out directly."
                }
                action={{ label: "Join Our Talent Network", href: `/contact?type=talent` }}
              />
            </Reveal>
          ) : (
            <div className="space-y-5">
              {careers.map((career, index) => (
                <Reveal key={career.id} delay={index * 0.06}>
                  <details className="group rounded-md border border-border bg-card transition-colors open:border-accent/40">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 marker:hidden sm:p-8 [&::-webkit-details-marker]:hidden">
                      <div>
                        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                          {career.title}
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                            {career.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                            {career.employmentType}
                          </span>
                          {career.closesAt ? (
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                              Closes {formatDate(career.closesAt)}
                            </span>
                          ) : null}
                        </div>
                        {career.summary ? (
                          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            {career.summary}
                          </p>
                        ) : null}
                      </div>
                      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-transform duration-300 group-open:rotate-180">
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="border-t border-border px-6 py-8 sm:px-8">
                      {career.description ? (
                        <>
                          <h3 className="font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                            The Role
                          </h3>
                          <RichText content={career.description} className="mt-5 !text-[0.95rem]" />
                        </>
                      ) : null}
                      {career.requirements ? (
                        <>
                          <h3 className="mt-8 font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                            What You Bring
                          </h3>
                          <RichText content={career.requirements} className="mt-5 !text-[0.95rem]" />
                        </>
                      ) : null}
                      <div className="mt-8 border-t border-border pt-6">
                        {site.email ? (
                          <a
                            href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${career.title}`)}`}
                            className="inline-flex h-11 items-center rounded-sm bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
                          >
                            Apply For This Role
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Application details will be shared shortly. Please check back.
                          </p>
                        )}
                      </div>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
