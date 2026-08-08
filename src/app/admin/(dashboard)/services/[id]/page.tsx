import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "Edit Service" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title={service.title}
        description="Changes publish to the website immediately after saving."
      />
      <ServiceForm
        service={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          shortDescription: service.shortDescription,
          fullDescription: service.fullDescription,
          icon: service.icon,
          featuredImage: service.featuredImage,
          featuredVideo: service.featuredVideo,
          position: service.position,
          published: service.published,
          capabilities: service.capabilities,
        }}
      />
    </div>
  );
}
