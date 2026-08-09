import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllInsights } from "@/lib/data/admin";
import { deleteInsight, toggleInsightFlag } from "@/lib/actions/admin/insights";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { FeaturedBadge, PublishedBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Insights" };

export default async function AdminInsightsPage() {
  const insights = await listAllInsights();

  return (
    <div>
      <AdminPageHeader
        title="Insights"
        description="Thought leadership articles. Newest edits appear first."
        createHref="/admin/insights/new"
        createLabel="New Insight"
      />

      {insights.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No insights yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Write the first article to launch the insights section.</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "title", label: "Article" },
            { key: "category", label: "Category" },
            { key: "author", label: "Author" },
            { key: "date", label: "Published" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {insights.map((insight) => (
            <DataRow key={insight.id}>
              <DataCell label="Article">
                <p className="font-semibold text-foreground">{insight.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">/insights/{insight.slug}</p>
              </DataCell>
              <DataCell label="Category">{insight.category}</DataCell>
              <DataCell label="Author">{insight.author?.name ?? "Brollam Partners"}</DataCell>
              <DataCell label="Published">{insight.publishedAt ? formatDate(insight.publishedAt) : "Not set"}</DataCell>
              <DataCell label="Status">
                <span className="flex flex-wrap gap-1.5">
                  <PublishedBadge published={insight.published} />
                  {insight.featured ? <FeaturedBadge /> : null}
                </span>
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={insight.published}
                    label={insight.published ? "Unpublish" : "Publish"}
                    action={toggleInsightFlag.bind(null, insight.id, "published", !insight.published)}
                  />
                  <ToggleButton
                    kind="star"
                    active={insight.featured}
                    label={insight.featured ? "Unfeature" : "Feature"}
                    action={toggleInsightFlag.bind(null, insight.id, "featured", !insight.featured)}
                  />
                  <Link
                    href={`/admin/insights/${insight.id}`}
                    aria-label={`Edit ${insight.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={insight.title} action={deleteInsight.bind(null, insight.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
