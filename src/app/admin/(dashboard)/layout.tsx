import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/guard";
import { hasDatabase } from "@/lib/db/client";
import { countNewEnquiries } from "@/lib/data/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { DatabaseSetupNotice } from "@/components/admin/database-notice";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Brollam CMS",
  },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  const newEnquiries = hasDatabase ? await countNewEnquiries().catch(() => 0) : 0;

  return (
    <AdminShell
      user={{ name: session.name, email: session.email, role: session.role }}
      newEnquiries={newEnquiries}
    >
      {hasDatabase ? children : <DatabaseSetupNotice />}
    </AdminShell>
  );
}
