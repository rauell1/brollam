import { notFound } from "next/navigation";
import { getStatisticById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatisticForm } from "@/components/admin/misc-forms";

export const metadata = { title: "Edit Statistic" };

export default async function EditStatisticPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const statistic = await getStatisticById(id);
  if (!statistic) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title={statistic.label} description="Update the value, context, or visibility." />
      <StatisticForm statistic={statistic} />
    </div>
  );
}
