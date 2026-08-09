import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllCareers } from "@/lib/data/admin";
import { deleteCareer, toggleCareerPublished } from "@/lib/actions/admin/careers";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { PublishedBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Careers" };

export default async function AdminCareersPage() {
  const careers = await listAllCareers();

  return (
    <div>
      <AdminPageHeader
        title="Careers"
        description="Open roles shown on the careers page. Create a role only when the vacancy is real."
        createHref="/admin/careers/new"
        createLabel="New Role"
      />

      {careers.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No roles listed</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The public careers page shows a graceful empty state when nothing is open.
          </p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "title", label: "Role" },
            { key: "closes", label: "Closes" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {careers.map((career) => (
            <DataRow key={career.id}>
              <DataCell label="Role">
                <p className="font-semibold text-foreground">{career.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {career.location} · {career.employmentType}
                </p>
              </DataCell>
              <DataCell label="Closes">{career.closesAt ? formatDate(career.closesAt) : "Open ended"}</DataCell>
              <DataCell label="Status">
                <PublishedBadge published={career.published} />
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={career.published}
                    label={career.published ? "Unpublish" : "Publish"}
                    action={toggleCareerPublished.bind(null, career.id, !career.published)}
                  />
                  <Link
                    href={`/admin/careers/${career.id}`}
                    aria-label={`Edit ${career.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={career.title} action={deleteCareer.bind(null, career.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
