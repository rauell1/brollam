import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllTestimonials } from "@/lib/data/admin";
import { deleteTestimonial, toggleTestimonialFlag } from "@/lib/actions/admin/relations";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { FeaturedBadge, PublishedBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";

export const metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const testimonials = await listAllTestimonials();

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Client quotes published with explicit permission. The website section appears only when published quotes exist."
        createHref="/admin/testimonials/new"
        createLabel="Add Testimonial"
      />

      {testimonials.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No testimonials yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Only real, permissioned quotes belong here. Nothing is ever drafted on a client&apos;s behalf.
          </p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "client", label: "Client" },
            { key: "quote", label: "Quote" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {testimonials.map((testimonial) => (
            <DataRow key={testimonial.id}>
              <DataCell label="Client">
                <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                </p>
              </DataCell>
              <DataCell label="Quote">
                <span className="line-clamp-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                  {testimonial.quote}
                </span>
              </DataCell>
              <DataCell label="Status">
                <span className="flex flex-wrap gap-1.5">
                  <PublishedBadge published={testimonial.published} />
                  {testimonial.featured ? <FeaturedBadge /> : null}
                </span>
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={testimonial.published}
                    label={testimonial.published ? "Unpublish" : "Publish"}
                    action={toggleTestimonialFlag.bind(null, testimonial.id, "published", !testimonial.published)}
                  />
                  <ToggleButton
                    kind="star"
                    active={testimonial.featured}
                    label={testimonial.featured ? "Unfeature" : "Feature"}
                    action={toggleTestimonialFlag.bind(null, testimonial.id, "featured", !testimonial.featured)}
                  />
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    aria-label={`Edit testimonial from ${testimonial.clientName}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton
                    iconOnly
                    itemName={`testimonial from ${testimonial.clientName}`}
                    action={deleteTestimonial.bind(null, testimonial.id)}
                  />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
