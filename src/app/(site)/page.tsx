import { Hero } from "@/components/site/hero";
import { ProofBar, TrustedBy } from "@/components/site/proof-bar";
import { VisibilityGap } from "@/components/site/visibility-gap";
import { ServicesBento } from "@/components/site/services-bento";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { TrackRecord } from "@/components/site/track-record";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { WorkGrid } from "@/components/site/work-grid";
import { ClientsPartners } from "@/components/site/clients-partners";
import { InsightsSection } from "@/components/site/insights-section";
import { TeamSection } from "@/components/site/team-section";
import { EcosystemSection } from "@/components/site/ecosystem-section";
import { CtaSection } from "@/components/site/cta-section";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import {
  getFeaturedCaseStudy,
  listActiveClients,
  listActivePartners,
  listActiveStats,
  listActiveTeam,
  listCaseStudies,
  listInsights,
  listPublishedTestimonials,
  listServices,
} from "@/lib/data/public";

export const revalidate = 300;

export default async function HomePage() {
  const [
    services,
    companyStats,
    clients,
    partners,
    featuredCaseStudy,
    caseStudies,
    trackRecord,
    insights,
    team,
    testimonials,
  ] = await Promise.all([
    listServices(),
    listActiveStats("COMPANY"),
    listActiveClients(),
    listActivePartners(),
    getFeaturedCaseStudy(),
    listCaseStudies(),
    listActiveStats("TEAM_TRACK_RECORD"),
    listInsights(),
    listActiveTeam(),
    listPublishedTestimonials(),
  ]);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <ProofBar stats={companyStats} />
      <TrustedBy clients={clients} />
      <VisibilityGap />
      <ServicesBento services={services} />
      <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
      <TrackRecord stats={trackRecord} />
      <ProcessTimeline />
      <WorkGrid caseStudies={caseStudies} />
      <ClientsPartners clients={clients} partners={partners} testimonials={testimonials} />
      <InsightsSection insights={insights} />
      <TeamSection members={team} />
      <EcosystemSection />
      <CtaSection />
    </>
  );
}
