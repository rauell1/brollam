import { AdminPageHeader } from "@/components/admin/page-header";
import { CareerForm } from "@/components/admin/misc-forms";

export const metadata = { title: "New Role" };

export default function NewCareerPage() {
  return (
    <div className="max-w-4xl">
      <AdminPageHeader title="New Role" description="Publish a vacancy on the careers page." />
      <CareerForm />
    </div>
  );
}
