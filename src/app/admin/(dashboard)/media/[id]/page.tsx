import { notFound } from "next/navigation";
import { getMediaItemById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { MediaForm } from "@/components/admin/misc-forms";

export const metadata = { title: "Edit Media" };

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getMediaItemById(id);
  if (!item) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title={item.title} description="Update the asset metadata." />
      <MediaForm item={item} />
    </div>
  );
}
