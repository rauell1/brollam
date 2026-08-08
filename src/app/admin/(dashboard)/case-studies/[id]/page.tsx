import { notFound } from "next/navigation";
import { getCaseStudyById, listAllServices } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CaseStudyForm } from "@/components/admin/case-study-form";

export const metadata = { title: "Edit Case Study" };

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [caseStudy, services] = await Promise.all([getCaseStudyById(id), listAllServices()]);
  if (!caseStudy) notFound();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader title={caseStudy.title} description="Keep narratives honest and metrics verified." />
      <CaseStudyForm
        caseStudy={{
          id: caseStudy.id,
          title: caseStudy.title,
          slug: caseStudy.slug,
          clientName: caseStudy.clientName,
          industry: caseStudy.industry,
          summary: caseStudy.summary,
          challenge: caseStudy.challenge,
          strategy: caseStudy.strategy,
          execution: caseStudy.execution,
          results: caseStudy.results,
          categories: caseStudy.categories,
          relatedServiceSlugs: caseStudy.relatedServiceSlugs,
          featuredImage: caseStudy.featuredImage,
          featuredVideo: caseStudy.featuredVideo,
          published: caseStudy.published,
          featured: caseStudy.featured,
          publishedAt: caseStudy.publishedAt,
          metrics: caseStudy.metrics,
        }}
        services={services.map((s) => ({ slug: s.slug, title: s.title }))}
      />
    </div>
  );
}
