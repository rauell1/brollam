import { requireFullAdmin } from "@/lib/auth/guard";
import Link from "next/link";

export default async function ConsentManagerPage() {
  await requireFullAdmin(); // RBAC enforced

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">Consent & Compliance Manager</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customization Engine */}
        <div className="p-6 bg-card border border-border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Banner Customization</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Configure the appearance and text of the cookie banner across multiple languages.
          </p>
          <div className="space-y-4">
             {/* Form placeholders */}
             <div>
               <label className="block text-sm font-medium mb-1">Banner Title</label>
               <input type="text" className="w-full bg-background border border-input rounded px-3 py-2 text-sm" defaultValue="Your Privacy Matters" />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">Primary Color</label>
               <input type="color" className="w-10 h-10 p-1 bg-background border border-input rounded" defaultValue="#7877C6" />
             </div>
             <button className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium rounded hover:opacity-90 mt-2">
               Save Configuration
             </button>
          </div>
        </div>

        {/* Scanner */}
        <div className="p-6 bg-card border border-border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Site Scanner</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Automatically detect first and third-party trackers across the site. This helps categorize cookies automatically.
          </p>
          <button className="bg-foreground text-background px-4 py-2 text-sm font-medium rounded hover:opacity-90">
            Run Automated Scan
          </button>
          <div className="mt-6 border-t border-border pt-4">
            <h3 className="text-sm font-medium mb-2">Last Scan Results</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>14 Trackers Detected</li>
              <li>3 Uncategorized Cookies</li>
            </ul>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/consent/logs" className="block p-6 bg-accent/5 hover:bg-accent/10 border border-accent/20 rounded-lg transition-colors">
            <h3 className="text-lg font-semibold text-accent mb-2">View Consent Logs</h3>
            <p className="text-sm text-muted-foreground">Access detailed, anonymized records of user consent choices for compliance auditing.</p>
          </Link>
          <Link href="/admin/consent/policies" className="block p-6 bg-card hover:bg-muted/50 border border-border rounded-lg transition-colors">
            <h3 className="text-lg font-semibold text-foreground mb-2">Policy Generators</h3>
            <p className="text-sm text-muted-foreground">Dynamically generate and publish Privacy Policies, Cookie Policies, and Terms of Service.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
