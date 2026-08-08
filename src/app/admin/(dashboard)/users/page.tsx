import Link from "next/link";
import { Pencil } from "lucide-react";
import { requireFullAdmin } from "@/lib/auth/guard";
import { listAllUsers } from "@/lib/data/admin";
import { deleteUser } from "@/lib/actions/admin/users";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "CMS Users" };

export default async function AdminUsersPage() {
  const session = await requireFullAdmin();
  const users = await listAllUsers();

  return (
    <div>
      <AdminPageHeader
        title="CMS Users"
        description="Administrators manage users. Editors manage content."
        createHref="/admin/users/new"
        createLabel="New User"
      />

      <DataTable
        columns={[
          { key: "user", label: "User" },
          { key: "role", label: "Role" },
          { key: "lastLogin", label: "Last Sign In" },
          { key: "actions", label: "Actions", className: "text-right" },
        ]}
      >
        {users.map((user) => (
          <DataRow key={user.id}>
            <DataCell label="User">
              <p className="font-semibold text-foreground">
                {user.name}
                {user.id === session.sub ? (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(you)</span>
                ) : null}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{user.email}</p>
            </DataCell>
            <DataCell label="Role">
              <Badge variant={user.role === "ADMIN" ? "default" : "neutral"}>
                {user.role === "ADMIN" ? "Administrator" : "Editor"}
              </Badge>
            </DataCell>
            <DataCell label="Last Sign In">{user.lastLoginAt ? formatDate(user.lastLoginAt) : "Never"}</DataCell>
            <DataCell label="Actions" className="md:text-right">
              <div className="flex items-center gap-1.5 md:justify-end">
                <Link
                  href={`/admin/users/${user.id}`}
                  aria-label={`Edit ${user.name}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                {user.id !== session.sub ? (
                  <DeleteButton iconOnly itemName={user.name} action={deleteUser.bind(null, user.id)} />
                ) : null}
              </div>
            </DataCell>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
