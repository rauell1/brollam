import { AdminPageHeader } from "@/components/admin/page-header";
import { MediaForm } from "@/components/admin/misc-forms";
import { hasStorage } from "@/lib/storage/s3";

export const metadata = { title: "Add Media" };

export default function NewMediaPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Add Media Item"
        description={
          hasStorage
            ? "Upload a file, or register an externally hosted asset."
            : "Register an externally hosted asset in the library."
        }
      />
      <MediaForm storageReady={hasStorage} />
    </div>
  );
}
