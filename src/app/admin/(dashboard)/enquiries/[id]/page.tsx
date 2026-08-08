import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getEnquiryById } from "@/lib/data/admin";
import { deleteEnquiry } from "@/lib/actions/admin/site";
import { EnquiryStatusBadge } from "@/components/admin/status-badge";
import { EnquiryUpdateForm } from "@/components/admin/enquiry-update-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Enquiry" };

function MetaItem({ label, value, href }: { label: string; value: string; href?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[0.62rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1.5 text-sm text-foreground">
        {href ? (
          <a href={href} className="underline-offset-4 hover:text-accent hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiry = await getEnquiryById(id);
  if (!enquiry) notFound();

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/enquiries"
        className="group mb-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        All Enquiries
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-foreground sm:text-4xl">{enquiry.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <EnquiryStatusBadge status={enquiry.status} />
            <span className="text-xs text-muted-foreground">
              Received {formatDate(enquiry.createdAt)} via {enquiry.source.replace(/_/g, " ")}
            </span>
          </div>
        </div>
        <DeleteButton itemName={`enquiry from ${enquiry.name}`} action={deleteEnquiry.bind(null, enquiry.id)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-md border border-border bg-card p-6 sm:p-7" aria-label="Message">
            <h2 className="text-[0.68rem] font-semibold tracking-[0.26em] text-accent uppercase">Message</h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed whitespace-pre-wrap text-foreground">
              {enquiry.message}
            </p>
          </section>

          <section className="rounded-md border border-border bg-card p-6 sm:p-7" aria-label="Contact details">
            <h2 className="text-[0.68rem] font-semibold tracking-[0.26em] text-accent uppercase">Details</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <MetaItem label="Email" value={enquiry.email} href={`mailto:${enquiry.email}`} />
              <MetaItem label="Phone" value={enquiry.phone} href={enquiry.phone ? `tel:${enquiry.phone.replace(/\s+/g, "")}` : undefined} />
              <MetaItem label="Company" value={enquiry.company} />
              <MetaItem label="Project Type" value={enquiry.projectType} />
              <MetaItem label="Budget" value={enquiry.budget} />
              <MetaItem label="Timeline" value={enquiry.timeline} />
            </dl>
          </section>
        </div>

        <section className="h-fit rounded-md border border-border bg-card p-6 sm:p-7" aria-label="Pipeline">
          <h2 className="text-[0.68rem] font-semibold tracking-[0.26em] text-accent uppercase">Pipeline</h2>
          <div className="mt-5">
            <EnquiryUpdateForm
              enquiryId={enquiry.id}
              status={enquiry.status}
              internalNote={enquiry.internalNote}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
