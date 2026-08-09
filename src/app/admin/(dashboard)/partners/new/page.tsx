import { AdminPageHeader } from "@/components/admin/page-header";
import { PartnerForm } from "@/components/admin/relation-forms";

export const metadata = { title: "Add Partner" };

export default function NewPartnerPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Add Partner" description="Add a strategic partner to the network." />
      <PartnerForm />
    </div>
  );
}
