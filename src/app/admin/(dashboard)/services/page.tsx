import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllServices } from "@/lib/data/admin";
import { deleteService, toggleServicePublished } from "@/lib/actions/admin/services";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { PublishedBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ToggleButton } from "@/components/admin/quick-actions";

export const metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const services = await listAllServices();

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="The six service pillars. Reorder with position, publish when ready."
        createHref="/admin/services/new"
        createLabel="New Service"
      />

      {services.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">No services yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Run the seed script to load the six canonical pillars, or create one manually.
          </p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "title", label: "Service" },
            { key: "position", label: "Position" },
            { key: "capabilities", label: "Capabilities" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {services.map((service) => (
            <DataRow key={service.id}>
              <DataCell label="Service">
                <div>
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">/services/{service.slug}</p>
                </div>
              </DataCell>
              <DataCell label="Position">{service.position}</DataCell>
              <DataCell label="Capabilities">{service.capabilities.length}</DataCell>
              <DataCell label="Status">
                <PublishedBadge published={service.published} />
              </DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <ToggleButton
                    active={service.published}
                    label={service.published ? "Unpublish" : "Publish"}
                    action={toggleServicePublished.bind(null, service.id, !service.published)}
                  />
                  <Link
                    href={`/admin/services/${service.id}`}
                    aria-label={`Edit ${service.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton
                    iconOnly
                    itemName={service.title}
                    action={deleteService.bind(null, service.id)}
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
