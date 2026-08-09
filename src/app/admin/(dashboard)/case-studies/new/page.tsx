import { listAllServices } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CaseStudyForm } from "@/components/admin/case-study-form";

export const metadata = { title: "New Case Study" };

export default async function NewCaseStudyPage() {
  const services = await listAllServices();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="New Case Study"
        description="Document an engagement from challenge to verified results."
      />
      <CaseStudyForm services={services.map((s) => ({ slug: s.slug, title: s.title }))} />
    </div>
  );
}
