import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllCaseStudies } from "@/lib/data/admin";
import { deleteCaseStudy, toggleCaseStudyFlag } from "@/lib/actions/admin/case-studies";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { FeaturedBadge, PublishedBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";

export const metadata = { title: "Case Studies" };

export default async function AdminCaseStudiesPage() {
  const caseStudies = await listAllCaseStudies();

  return (
    <div>
      <AdminPageHeader
        title="Case Studies"
        description="Client work with verified narratives and metrics. Publish only approved material."
        createHref="/admin/case-studies/new"
        createLabel="New Case Study"
      />

      {caseStudies.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No case studies yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Create the first one when a client engagement is ready to publish.
          </p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "title", label: "Case Study" },
            { key: "client", label: "Client" },
            { key: "metrics", label: "Metrics" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {caseStudies.map((caseStudy) => (
            <DataRow key={caseStudy.id}>
              <DataCell label="Case Study">
                <p className="font-semibold text-foreground">{caseStudy.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">/case-studies/{caseStudy.slug}</p>
              </DataCell>
              <DataCell label="Client">{caseStudy.clientName}</DataCell>
              <DataCell label="Metrics">{caseStudy.metrics.length}</DataCell>
              <DataCell label="Status">
                <span className="flex flex-wrap gap-1.5">
                  <PublishedBadge published={caseStudy.published} />
                  {caseStudy.featured ? <FeaturedBadge /> : null}
                </span>
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={caseStudy.published}
                    label={caseStudy.published ? "Unpublish" : "Publish"}
                    action={toggleCaseStudyFlag.bind(null, caseStudy.id, "published", !caseStudy.published)}
                  />
                  <ToggleButton
                    kind="star"
                    active={caseStudy.featured}
                    label={caseStudy.featured ? "Remove from homepage" : "Feature on homepage"}
                    action={toggleCaseStudyFlag.bind(null, caseStudy.id, "featured", !caseStudy.featured)}
                  />
                  <Link
                    href={`/admin/case-studies/${caseStudy.id}`}
                    aria-label={`Edit ${caseStudy.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton
                    iconOnly
                    itemName={caseStudy.title}
                    action={deleteCaseStudy.bind(null, caseStudy.id)}
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
