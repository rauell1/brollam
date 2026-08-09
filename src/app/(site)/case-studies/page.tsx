import { FolderOpen } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { CaseStudyIndex } from "@/components/site/case-study-index";
import { CtaSection } from "@/components/site/cta-section";
import { EmptyState } from "@/components/site/empty-state";
import { listCaseStudies } from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Selected brand, communications, marketing, technology, and clean energy work from Brollam Partners, with the strategies and results behind each engagement.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const caseStudies = await listCaseStudies();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <PageHero
        eyebrow="Case Studies"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
        title={
          <>
            Work That Speaks <em className="text-accent italic">For Itself.</em>
          </>
        }
        description="Real engagements, real constraints, real outcomes. Each study covers the challenge, the strategy, the execution, and what changed for the business."
      />
      <section className="py-20 sm:py-24" aria-label="Case study list">
        <Container>
          {caseStudies.length > 0 ? (
            <CaseStudyIndex caseStudies={caseStudies} />
          ) : (
            <EmptyState
              icon={FolderOpen}
              title="Case studies are being prepared"
              description="We publish client work only when it is real, verified, and cleared for release. Selected studies are currently being documented and will appear here soon."
              action={{ label: "Start Your Project", href: "/contact" }}
            />
          )}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
