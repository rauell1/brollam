import Link from "next/link";
import { listAllEnquiries } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { EnquiryStatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Enquiries" };

export default async function AdminEnquiriesPage() {
  const enquiries = await listAllEnquiries();
  const newCount = enquiries.filter((e) => e.status === "NEW").length;

  return (
    <div>
      <AdminPageHeader
        title="Enquiries"
        description={
          newCount > 0
            ? `${newCount} new ${newCount === 1 ? "message" : "messages"} waiting for a first response.`
            : "Website enquiries flow here from the contact form."
        }
      />

      {enquiries.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No enquiries yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            When someone writes through the contact form, it appears here with the full brief.
          </p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "from", label: "From" },
            { key: "project", label: "Project" },
            { key: "received", label: "Received" },
            { key: "status", label: "Status" },
          ]}
        >
          {enquiries.map((enquiry) => (
            <DataRow key={enquiry.id}>
              <DataCell label="From">
                <Link
                  href={`/admin/enquiries/${enquiry.id}`}
                  className="font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline"
                >
                  {enquiry.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {[enquiry.company, enquiry.email].filter(Boolean).join(" · ")}
                </p>
              </DataCell>
              <DataCell label="Project">
                <span className="line-clamp-2 max-w-xs text-xs text-muted-foreground">
                  {enquiry.projectType || "General"}
                  {enquiry.budget ? ` · ${enquiry.budget}` : ""}
                </span>
              </DataCell>
              <DataCell label="Received">{formatDate(enquiry.createdAt)}</DataCell>
              <DataCell label="Status">
                <EnquiryStatusBadge status={enquiry.status} />
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
