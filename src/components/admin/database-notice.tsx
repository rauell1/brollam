import { Database } from "lucide-react";

export function DatabaseSetupNotice() {
  return (
    <div className="mx-auto max-w-2xl py-16">
      <div className="rounded-md border border-warning/40 bg-card p-8 sm:p-10">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-warning/40 text-warning">
          <Database className="h-5 w-5" />
        </span>
        <h1 className="mt-6 font-display text-3xl text-foreground">Connect Neon Postgres</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The CMS runs on Neon Postgres via Drizzle ORM. To enable content management:
        </p>
        <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Create a project at <span className="text-foreground">console.neon.tech</span> and copy
            the pooled connection string.
          </li>
          <li>
            Set <code className="rounded-xs bg-card-raised px-1.5 py-0.5 text-[0.75rem] text-accent-strong">DATABASE_URL</code> and{" "}
            <code className="rounded-xs bg-card-raised px-1.5 py-0.5 text-[0.75rem] text-accent-strong">AUTH_SECRET</code> in the
            environment.
          </li>
          <li>
            Run <code className="rounded-xs bg-card-raised px-1.5 py-0.5 text-[0.75rem] text-accent-strong">npm run db:migrate</code> to
            create the schema.
          </li>
          <li>
            Run <code className="rounded-xs bg-card-raised px-1.5 py-0.5 text-[0.75rem] text-accent-strong">npm run db:seed</code> to
            load the six service pillars, team, insights, and your first admin account.
          </li>
        </ol>
        <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
          The public website continues to render from the version controlled seed snapshot until a
          database is connected.
        </p>
      </div>
    </div>
  );
}
