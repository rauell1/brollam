import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  FolderOpen,
  Globe,
  Inbox,
  Layers,
  Newspaper,
} from "lucide-react";
import { getDashboardOverview } from "@/lib/data/admin";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataCell, DataRow, DataTable } from "@/components/admin/data-table";
import { EnquiryStatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Overview" };

export default async function AdminOverviewPage() {
  const overview = await getDashboardOverview();

  const cards = [
    { label: "New Enquiries", value: overview.newEnquiries, href: "/admin/enquiries", icon: Inbox, accent: true },
    { label: "Published Case Studies", value: overview.publishedCaseStudies, href: "/admin/case-studies", icon: FolderOpen },
    { label: "Published Insights", value: overview.publishedInsights, href: "/admin/insights", icon: Newspaper },
    { label: "Active Services", value: overview.activeServices, href: "/admin/services", icon: Layers },
    { label: "Open Positions", value: overview.openCareers, href: "/admin/careers", icon: Briefcase },
    { label: "Confirmed Clients", value: overview.totalClients, href: "/admin/clients", icon: Globe },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="The health of the platform at a glance. Everything here is live data from Neon."
      />

      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group">
            <div className="h-full rounded-md border border-border bg-card p-4 transition-colors group-hover:border-accent/40 sm:p-5">
              <dt className="flex items-start justify-between gap-2">
                <span className="text-[0.62rem] leading-snug font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {card.label}
                </span>
                <card.icon
                  className={card.accent ? "h-4 w-4 shrink-0 text-accent" : "h-4 w-4 shrink-0 text-muted-foreground/50"}
                  aria-hidden="true"
                />
              </dt>
              <dd className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
                {card.value}
              </dd>
            </div>
          </Link>
        ))}
      </dl>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-foreground">Latest Enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="group inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-accent uppercase transition-colors hover:text-accent-strong"
          >
            View All
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {overview.recentEnquiries.length === 0 ? (
          <div className="rounded-md border border-dashed border-border-strong bg-card/60 px-6 py-12 text-center">
            <p className="font-display text-xl text-foreground">No enquiries yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Messages from the contact form will land here.
            </p>
          </div>
        ) : (
          <DataTable
            columns={[
              { key: "name", label: "From" },
              { key: "projectType", label: "Project Type" },
              { key: "date", label: "Received" },
              { key: "status", label: "Status" },
            ]}
          >
            {overview.recentEnquiries.map((enquiry) => (
              <DataRow key={enquiry.id}>
                <DataCell label="From">
                  <Link
                    href={`/admin/enquiries/${enquiry.id}`}
                    className="font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    {enquiry.name}
                    {enquiry.company ? <span className="text-muted-foreground"> · {enquiry.company}</span> : null}
                  </Link>
                </DataCell>
                <DataCell label="Type">{enquiry.projectType || "General"}</DataCell>
                <DataCell label="Received">{formatDate(enquiry.createdAt)}</DataCell>
                <DataCell label="Status">
                  <EnquiryStatusBadge status={enquiry.status} />
                </DataCell>
              </DataRow>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  );
}
