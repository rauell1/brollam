import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllPartners } from "@/lib/data/admin";
import { deletePartner, togglePartnerActive } from "@/lib/actions/admin/relations";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { ActiveBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";

export const metadata = { title: "Partners" };

export default async function AdminPartnersPage() {
  const partners = await listAllPartners();

  return (
    <div>
      <AdminPageHeader
        title="Partners"
        description="Strategic partners across technology, creative, media, production, and software."
        createHref="/admin/partners/new"
        createLabel="Add Partner"
      />

      {partners.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No partners recorded</p>
          <p className="mt-2 text-sm text-muted-foreground">The partner section stays hidden until the first active partner exists.</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "name", label: "Partner" },
            { key: "category", label: "Category" },
            { key: "position", label: "Position" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {partners.map((partner) => (
            <DataRow key={partner.id}>
              <DataCell label="Partner">
                <p className="font-semibold text-foreground">{partner.name}</p>
              </DataCell>
              <DataCell label="Category">{partner.category || "Uncategorized"}</DataCell>
              <DataCell label="Position">{partner.position}</DataCell>
              <DataCell label="Status">
                <ActiveBadge active={partner.active} />
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={partner.active}
                    label={partner.active ? "Hide from site" : "Show on site"}
                    action={togglePartnerActive.bind(null, partner.id, !partner.active)}
                  />
                  <Link
                    href={`/admin/partners/${partner.id}`}
                    aria-label={`Edit ${partner.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={partner.name} action={deletePartner.bind(null, partner.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
