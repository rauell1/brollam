"use client";

import { useState } from "react";

export function ScanButton() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ trackers: any[], totalDetected: number, uncategorizedCount: number } | null>(null);

  const runScan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consent/scan", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setResults(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={runScan}
        disabled={loading}
        className="bg-foreground text-background px-4 py-2 text-sm font-medium rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Scanning..." : "Run Automated Scan"}
      </button>
      
      {results && (
        <div className="mt-6 border-t border-border pt-4 animate-in fade-in zoom-in">
          <h3 className="text-sm font-medium mb-2">Last Scan Results</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>{results.totalDetected} Trackers Detected</li>
            <li>{results.uncategorizedCount} Uncategorized Cookies</li>
          </ul>
          
          {results.trackers.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Categorized</h4>
              <ul className="text-sm space-y-2">
                {results.trackers.map((t, i) => (
                  <li key={i} className="flex justify-between border border-border p-2 rounded">
                    <span>{t.name}</span>
                    <span className="text-accent">{t.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
