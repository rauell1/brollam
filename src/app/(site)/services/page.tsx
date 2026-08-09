import { PageHero } from "@/components/site/page-hero";
import { ServicesCarousel } from "@/components/site/services-carousel";
import { ServicesIndex } from "@/components/site/services-index";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { CtaSection } from "@/components/site/cta-section";
import { listServices } from "@/lib/data/public";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Brand strategy and identity, communications and PR, marketing and campaigns, web and product development, B2B sales and partnerships, and clean energy and e-mobility advisory, one integrated team in Nairobi.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await listServices();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Our Services"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            Six Disciplines. <br />
            <em className="text-accent italic">One Integrated Team.</em>
          </>
        }
        description="Every service can stand alone. Together they form a complete visibility system: strategy, story, channels, technology, and commercial execution."
      />
      <ServicesCarousel />
      <ServicesIndex services={services} />
      <ProcessTimeline />
      <CtaSection />
    </>
  );
}
