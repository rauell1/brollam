import { Hero } from "@/components/site/hero";
import { VisibilityGap } from "@/components/site/visibility-gap";
import { WhatWeDo } from "@/components/site/what-we-do";
import { ServicesCarousel } from "@/components/site/services-carousel";
import { SectorsMarquee } from "@/components/site/sectors-marquee";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { WorkGrid } from "@/components/site/work-grid";
import { LogoWall } from "@/components/site/logo-wall";
import { InsightsSection } from "@/components/site/insights-section";
import { Testimonials } from "@/components/site/testimonials";
import { TeamSection } from "@/components/site/team-section";
import { InvestWithUs } from "@/components/site/invest-with-us";
import { CareersTeaser } from "@/components/site/careers-teaser";
import { CommitmentParallax } from "@/components/site/commitment-parallax";
import { CtaSection } from "@/components/site/cta-section";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import {
  getFeaturedCaseStudy,
  listCaseStudies,
  listInsights,
  listPublishedTestimonials,
} from "@/lib/data/public";

export const revalidate = 300;

export default async function HomePage() {
  const [
    featuredCaseStudy,
    caseStudies,
    insights,
    testimonials,
  ] = await Promise.all([
    getFeaturedCaseStudy(),
    listCaseStudies(),
    listInsights(),
    listPublishedTestimonials(),
  ]);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. The Funding Visibility Gap */}
      <VisibilityGap />
      
      {/* 3. What We Do */}
      <WhatWeDo />
      
      {/* 4. Our Services */}
      <ServicesCarousel />
      
      {/* 5. Sectors */}
      <SectorsMarquee />
      
      {/* 6. Featured Case Study */}
      <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
      
      {/* 7. Our Process */}
      <ProcessTimeline />
      
      {/* 8. Our Work */}
      <WorkGrid caseStudies={caseStudies} />
      
      {/* 9. Companies We've Worked With */}
      <LogoWall />

      {/* 9b. Client testimonials: renders only once real quotes are published */}
      <Testimonials testimonials={testimonials} />
      
      {/* 10. Insights */}
      <InsightsSection insights={insights} />
      
      {/* 11. The Team */}
      <TeamSection />
      
      {/* 12. Invest With Us */}
      <InvestWithUs />
      
      {/* 13. Careers */}
      <CareersTeaser />
      
      {/* 14. Our Commitment */}
      <CommitmentParallax />
      
      {/* 15. Contact / CTA */}
      <CtaSection />
    </>
  );
}
