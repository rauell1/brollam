import { AdminPageHeader } from "@/components/admin/page-header";
import { StatisticForm } from "@/components/admin/misc-forms";

export const metadata = { title: "New Statistic" };

export default function NewStatisticPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="New Statistic" description="Add a verified number to the website." />
      <StatisticForm />
    </div>
  );
}
