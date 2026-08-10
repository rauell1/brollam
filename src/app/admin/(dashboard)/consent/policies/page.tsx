import { requireFullAdmin } from "@/lib/auth/guard";

export default async function PolicyGeneratorsPage() {
  await requireFullAdmin();

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Policy Generators</h1>
        <p className="text-muted-foreground mt-2">Automatically generate standard legal documents based on your company variables.</p>
      </div>

      <div className="space-y-8">
        {/* Privacy Policy */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Privacy Policy Generator</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input type="text" className="w-full bg-background border border-input rounded px-3 py-2 text-sm" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input type="email" className="w-full bg-background border border-input rounded px-3 py-2 text-sm" placeholder="privacy@acme.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data Collection Types</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Analytics</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Marketing</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> User Accounts</label>
              </div>
            </div>
            <button className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium rounded hover:opacity-90 mt-4">
              Generate & Publish Privacy Policy
            </button>
          </div>
        </div>

        {/* Cookie Policy */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm opacity-50 pointer-events-none">
          <h2 className="text-xl font-semibold mb-2 text-foreground flex items-center gap-2">
            Cookie Policy Generator <span className="text-xs bg-muted px-2 py-1 rounded-full uppercase tracking-wider">Coming Soon</span>
          </h2>
          <p className="text-sm text-muted-foreground">Dynamically generated based on scanner results.</p>
        </div>
      </div>
    </div>
  );
}
