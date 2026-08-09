import { notFound } from "next/navigation";
import { requireFullAdmin } from "@/lib/auth/guard";
import { getUserById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { UserForm } from "@/components/admin/misc-forms";

export const metadata = { title: "Edit User" };

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireFullAdmin();
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title={user.name} description="Update account details or reset access." />
      <UserForm user={{ id: user.id, name: user.name, email: user.email, role: user.role }} />
    </div>
  );
}
