import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllStatistics } from "@/lib/data/admin";
import { deleteStatistic, toggleStatisticActive } from "@/lib/actions/admin/site";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { ActiveBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Site Statistics" };

export default async function AdminStatisticsPage() {
  const statistics = await listAllStatistics();

  return (
    <div>
      <AdminPageHeader
        title="Site Statistics"
        description="Company scope fills the homepage proof bar. Team track record scope appears with the qualification note. Activate only verified numbers."
        createHref="/admin/statistics/new"
        createLabel="New Statistic"
      />

      {statistics.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No statistics recorded</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "stat", label: "Statistic" },
            { key: "scope", label: "Scope" },
            { key: "position", label: "Position" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {statistics.map((stat) => (
            <DataRow key={stat.id}>
              <DataCell label="Statistic">
                <p className="font-semibold text-foreground">
                  {stat.value}
                  {stat.suffix ? <span className="text-accent">{stat.suffix}</span> : null}{" "}
                  <span className="font-normal text-muted-foreground">· {stat.label}</span>
                </p>
                {stat.description ? (
                  <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-muted-foreground">{stat.description}</p>
                ) : null}
              </DataCell>
              <DataCell label="Scope">
                <Badge variant={stat.scope === "TEAM_TRACK_RECORD" ? "outline" : "neutral"}>
                  {stat.scope === "TEAM_TRACK_RECORD" ? "Track Record" : "Company"}
                </Badge>
              </DataCell>
              <DataCell label="Position">{stat.position}</DataCell>
              <DataCell label="Status">
                <ActiveBadge active={stat.active} />
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={stat.active}
                    label={stat.active ? "Hide from site" : "Show on site"}
                    action={toggleStatisticActive.bind(null, stat.id, !stat.active)}
                  />
                  <Link
                    href={`/admin/statistics/${stat.id}`}
                    aria-label={`Edit ${stat.label}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={stat.label} action={deleteStatistic.bind(null, stat.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
