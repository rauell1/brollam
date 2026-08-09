import { AdminPageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "New Service" };

export default function NewServicePage() {
  return (
    <div className="max-w-4xl">
      <AdminPageHeader title="New Service" description="Define a new service pillar with its capabilities." />
      <ServiceForm />
    </div>
  );
}
