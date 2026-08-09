import { AdminPageHeader } from "@/components/admin/page-header";
import { MediaForm } from "@/components/admin/misc-forms";

export const metadata = { title: "Add Media" };

export default function NewMediaPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Add Media Item" description="Register an externally hosted asset in the library." />
      <MediaForm />
    </div>
  );
}
