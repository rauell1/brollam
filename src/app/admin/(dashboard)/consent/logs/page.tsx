import { requireFullAdmin } from "@/lib/auth/guard";

export default async function ConsentLogsPage() {
  await requireFullAdmin();

  // In a real implementation, we would query `db.select().from(consentLogs)` here.
  const mockLogs = [
    { id: "1", ip: "192.168.1.xxx", geo: "EU", state: "Necessary, Analytics", date: "2026-08-10 14:32:01" },
    { id: "2", ip: "10.0.0.xxx", geo: "CA", state: "Opt-Out (All)", date: "2026-08-10 14:15:22" },
    { id: "3", ip: "172.16.0.xxx", geo: "GLOBAL", state: "Accept All", date: "2026-08-10 13:45:10" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Consent Logs</h1>
          <p className="text-muted-foreground mt-2">Audit trail of user consent preferences.</p>
        </div>
        <button className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium rounded hover:opacity-90 shadow-sm">
          Export as CSV
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold">Date / Time</th>
              <th className="px-6 py-4 font-semibold">Anonymized IP</th>
              <th className="px-6 py-4 font-semibold">Region (Geo)</th>
              <th className="px-6 py-4 font-semibold">Consent State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockLogs.map(log => (
              <tr key={log.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-foreground">{log.date}</td>
                <td className="px-6 py-4 text-muted-foreground font-mono">{log.ip}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent border border-accent/20">
                    {log.geo}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground">{log.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Analytics Chart Placeholder */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Opt-In Rates Over Time</h2>
        <div className="h-64 bg-muted/20 rounded flex items-center justify-center border-dashed border-2 border-border">
          <p className="text-muted-foreground">Chart Visualization Area (e.g., Recharts)</p>
        </div>
      </div>
    </div>
  );
}
