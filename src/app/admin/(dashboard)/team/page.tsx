import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllTeam } from "@/lib/data/admin";
import { deleteTeamMember, toggleTeamActive } from "@/lib/actions/admin/team";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { ActiveBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";

export const metadata = { title: "Team" };

export default async function AdminTeamPage() {
  const team = await listAllTeam();

  return (
    <div>
      <AdminPageHeader
        title="Team"
        description="The people presented on the website. Biographies and photos go live only from confirmed information."
        createHref="/admin/team/new"
        createLabel="Add Member"
      />

      {team.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No team members yet</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "name", label: "Member" },
            { key: "position", label: "Position" },
            { key: "expertise", label: "Expertise" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {team.map((member) => (
            <DataRow key={member.id}>
              <DataCell label="Member">
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{member.role}</p>
              </DataCell>
              <DataCell label="Position">{member.position}</DataCell>
              <DataCell label="Expertise">
                <span className="line-clamp-1 max-w-48 text-xs">{member.expertise.join(", ") || "None listed"}</span>
              </DataCell>
              <DataCell label="Status">
                <ActiveBadge active={member.active} />
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={member.active}
                    label={member.active ? "Hide from site" : "Show on site"}
                    action={toggleTeamActive.bind(null, member.id, !member.active)}
                  />
                  <Link
                    href={`/admin/team/${member.id}`}
                    aria-label={`Edit ${member.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={member.name} action={deleteTeamMember.bind(null, member.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
