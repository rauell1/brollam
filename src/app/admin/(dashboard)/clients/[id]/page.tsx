import { notFound } from "next/navigation";
import { getClientById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ClientForm } from "@/components/admin/relation-forms";

export const metadata = { title: "Edit Client" };

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title={client.name} description="Update client details and visibility." />
      <ClientForm client={client} />
    </div>
  );
}
