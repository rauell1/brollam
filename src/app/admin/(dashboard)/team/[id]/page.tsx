import { notFound } from "next/navigation";
import { getTeamMemberById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";

export const metadata = { title: "Edit Team Member" };

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getTeamMemberById(id);
  if (!member) notFound();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader title={member.name} description="Update profile, role, and visibility." />
      <TeamForm
        member={{
          id: member.id,
          name: member.name,
          slug: member.slug,
          role: member.role,
          biography: member.biography,
          expertise: member.expertise,
          image: member.image,
          linkedinUrl: member.linkedinUrl,
          email: member.email,
          position: member.position,
          active: member.active,
        }}
      />
    </div>
  );
}
