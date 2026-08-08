import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/relation-forms";

export const metadata = { title: "Edit Testimonial" };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);
  if (!testimonial) notFound();

  return (
    <div className="max-w-3xl">
      <AdminPageHeader title={`Testimonial: ${testimonial.clientName}`} description="Update the quote or its publishing state." />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
