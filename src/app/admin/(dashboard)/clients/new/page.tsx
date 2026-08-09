import { AdminPageHeader } from "@/components/admin/page-header";
import { ClientForm } from "@/components/admin/relation-forms";

export const metadata = { title: "Add Client" };

export default function NewClientPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Add Client" description="Stays hidden until you confirm and activate it." />
      <ClientForm />
    </div>
  );
}
