import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";

export const metadata = { title: "Add Team Member" };

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-4xl">
      <AdminPageHeader title="Add Team Member" description="Add a specialist to the public team section." />
      <TeamForm />
    </div>
  );
}
