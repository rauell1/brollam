import { notFound } from "next/navigation";
import { getCareerById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CareerForm } from "@/components/admin/misc-forms";

export const metadata = { title: "Edit Role" };

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const career = await getCareerById(id);
  if (!career) notFound();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader title={career.title} description="Update the vacancy details and publishing state." />
      <CareerForm career={career} />
    </div>
  );
}
