"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BarChart3,
  Briefcase,
  FolderOpen,
  Globe,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  MessageSquareQuote,
  Newspaper,
  ShieldCheck,
  Users,
  Handshake,
  X,
} from "lucide-react";
import { logout } from "@/lib/actions/admin/auth";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "",
    items: [{ label: "Overview", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { label: "Services", href: "/admin/services", icon: Layers },
      { label: "Case Studies", href: "/admin/case-studies", icon: FolderOpen },
      { label: "Insights", href: "/admin/insights", icon: Newspaper },
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Media", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    label: "Relationships",
    items: [
      { label: "Clients", href: "/admin/clients", icon: Globe },
      { label: "Partners", href: "/admin/partners", icon: Handshake },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
      { label: "Careers", href: "/admin/careers", icon: Briefcase },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Site Statistics", href: "/admin/statistics", icon: BarChart3 },
      { label: "CMS Users", href: "/admin/users", icon: ShieldCheck, adminOnly: true },
    ],
  },
];

function NavLinks({
  role,
  newEnquiries,
  onNavigate,
}: {
  role: "ADMIN" | "EDITOR";
  newEnquiries: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav aria-label="Admin" className="flex flex-col gap-6">
      {navGroups.map((group, gi) => {
        const items = group.items.filter((i) => !i.adminOnly || role === "ADMIN");
        if (items.length === 0) return null;
        return (
          <div key={gi}>
            {group.label ? (
              <p className="mb-2 px-3 text-[0.6rem] font-semibold tracking-[0.26em] text-muted-foreground/60 uppercase">
                {group.label}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                      isActive(item.href)
                        ? "bg-accent/10 font-semibold text-accent"
                        : "text-muted-foreground hover:bg-card hover:text-foreground",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive(item.href) ? "text-accent" : "text-muted-foreground/70 group-hover:text-foreground",
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.href === "/admin/enquiries" && newEnquiries > 0 ? (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[0.62rem] font-bold text-accent-foreground">
                        {newEnquiries}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function UserFooter({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div className="border-t border-border px-4 py-4">
      <div className="flex items-center gap-3 px-1">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 font-display text-sm text-accent italic">
          {name
            .split(/\s+/)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase())
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="truncate text-[0.7rem] text-muted-foreground">
            {email} · {role === "ADMIN" ? "Administrator" : "Editor"}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <Link
          href="/"
          target="_blank"
          className="flex h-8 flex-1 items-center gap-2 rounded-sm px-2 text-[0.72rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:bg-card hover:text-accent"
        >
          View Site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex h-8 items-center gap-2 rounded-sm px-2 text-[0.72rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:bg-card hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminShell({
  children,
  user,
  newEnquiries,
}: {
  children: ReactNode;
  user: { name: string; email: string; role: "ADMIN" | "EDITOR" };
  newEnquiries: number;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface/50">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="inline-flex items-baseline gap-1.5">
          <span className="text-sm font-extrabold tracking-[0.22em]">BROLLAM</span>
          <span className="text-[0.55rem] font-semibold tracking-[0.36em] text-accent">ADMIN</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open admin menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent
          hideClose
          className="top-0 left-0 h-dvh w-[86vw] max-w-[320px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-none border-r border-border bg-background p-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"
        >
          <DialogTitle className="sr-only">Admin navigation</DialogTitle>
          <div className="flex h-14 items-center justify-between border-b border-border px-4">
            <span className="text-sm font-extrabold tracking-[0.22em]">BROLLAM</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close admin menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <NavLinks role={user.role} newEnquiries={newEnquiries} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-16 items-center justify-between gap-2 border-b border-border px-5">
          <Link href="/admin" className="inline-flex items-baseline gap-1.5">
            <span className="text-[0.95rem] font-extrabold tracking-[0.22em]">BROLLAM</span>
            <span className="text-[0.55rem] font-semibold tracking-[0.36em] text-accent">ADMIN</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks role={user.role} newEnquiries={newEnquiries} />
        </div>
        <UserFooter name={user.name} email={user.email} role={user.role} />
      </aside>

      <div className="pt-14 lg:pt-0 lg:pl-64">
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
