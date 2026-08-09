import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllClients } from "@/lib/data/admin";
import { deleteClient, toggleClientActive } from "@/lib/actions/admin/relations";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { ActiveBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";

export const metadata = { title: "Clients" };

export default async function AdminClientsPage() {
  const clients = await listAllClients();

  return (
    <div>
      <AdminPageHeader
        title="Clients"
        description="Client names and logos appear publicly only when marked active. Wireframe examples are inactive until confirmed."
        createHref="/admin/clients/new"
        createLabel="Add Client"
      />

      {clients.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No clients recorded</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "name", label: "Client" },
            { key: "position", label: "Position" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {clients.map((client) => (
            <DataRow key={client.id}>
              <DataCell label="Client">
                <p className="font-semibold text-foreground">{client.name}</p>
                {client.websiteUrl ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">{client.websiteUrl}</p>
                ) : null}
              </DataCell>
              <DataCell label="Position">{client.position}</DataCell>
              <DataCell label="Status">
                <ActiveBadge active={client.active} />
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={client.active}
                    label={client.active ? "Hide from site" : "Show on site"}
                    action={toggleClientActive.bind(null, client.id, !client.active)}
                  />
                  <Link
                    href={`/admin/clients/${client.id}`}
                    aria-label={`Edit ${client.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={client.name} action={deleteClient.bind(null, client.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
