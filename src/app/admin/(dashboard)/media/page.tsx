import Link from "next/link";
import { Pencil } from "lucide-react";
import { listAllMedia } from "@/lib/data/admin";
import { deleteMediaItem } from "@/lib/actions/admin/site";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Media Library" };

export default async function AdminMediaPage() {
  const media = await listAllMedia();

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Asset metadata and URLs referenced across the site. Development placeholders are labeled so real work replaces them cleanly."
        createHref="/admin/media/new"
        createLabel="Add Media"
      />

      {media.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
          <p className="font-display text-xl text-foreground">The library is empty</p>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "title", label: "Asset" },
            { key: "type", label: "Type" },
            { key: "category", label: "Category" },
            { key: "actions", label: "Actions", className: "text-right" },
          ]}
        >
          {media.map((item) => (
            <DataRow key={item.id}>
              <DataCell label="Asset">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-muted-foreground">{item.url}</p>
              </DataCell>
              <DataCell label="Type">
                <Badge variant="neutral">{item.type.charAt(0) + item.type.slice(1).toLowerCase()}</Badge>
              </DataCell>
              <DataCell label="Category">{item.category || "General"}</DataCell>
              <DataCell label="Actions" className="md:text-right">
                <div className="flex items-center gap-1.5 md:justify-end">
                  <Link
                    href={`/admin/media/${item.id}`}
                    aria-label={`Edit ${item.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton iconOnly itemName={item.title} action={deleteMediaItem.bind(null, item.id)} />
                </div>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  );
}
