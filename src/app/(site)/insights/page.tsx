import { Newspaper } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { InsightIndex } from "@/components/site/insight-index";
import { CtaSection } from "@/components/site/cta-section";
import { EmptyState } from "@/components/site/empty-state";
import { listInsights } from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Ideas on branding, marketing, communications, technology, and clean energy from the Brollam Partners team, written for businesses that intend to be seen.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await listInsights();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <PageHero
        eyebrow="Insights"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        title={
          <>
            Ideas That Drive <em className="text-accent italic">Growth.</em>
          </>
        }
        description="Notes from the field on visibility: what makes businesses known, understood, and chosen."
      />
      <section className="py-20 sm:py-24" aria-label="Insights list">
        <Container>
          {insights.length > 0 ? (
            <InsightIndex insights={insights} />
          ) : (
            <EmptyState
              icon={Newspaper}
              title="Insights are on the way"
              description="We are preparing our first set of articles. Check back soon."
              action={{ label: "Back to Home", href: "/" }}
            />
          )}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
