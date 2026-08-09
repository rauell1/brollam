import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/relation-forms";

export const metadata = { title: "Add Testimonial" };

export default function NewTestimonialPage() {
  return (
    <div className="max-w-3xl">
      <AdminPageHeader title="Add Testimonial" description="Record a client quote you are permitted to publish." />
      <TestimonialForm />
    </div>
  );
}
