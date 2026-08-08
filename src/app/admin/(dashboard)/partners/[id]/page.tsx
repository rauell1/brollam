import { notFound } from "next/navigation";
import { getPartnerById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PartnerForm } from "@/components/admin/relation-forms";

export const metadata = { title: "Edit Partner" };

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await getPartnerById(id);
  if (!partner) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title={partner.name} description="Update partner details and visibility." />
      <PartnerForm partner={partner} />
    </div>
  );
}
