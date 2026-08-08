import { requireFullAdmin } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { UserForm } from "@/components/admin/misc-forms";

export const metadata = { title: "New User" };

export default async function NewUserPage() {
  await requireFullAdmin();
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="New CMS User" description="Create another account for the content team." />
      <UserForm />
    </div>
  );
}
