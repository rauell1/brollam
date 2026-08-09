import { listAllTeam } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { InsightForm } from "@/components/admin/insight-form";

export const metadata = { title: "New Insight" };

export default async function NewInsightPage() {
  const team = await listAllTeam();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader title="New Insight" description="A new article for the insights section." />
      <InsightForm authors={team.map((t) => ({ id: t.id, name: t.name, role: t.role }))} />
    </div>
  );
}
