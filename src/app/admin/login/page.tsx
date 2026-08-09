import { Suspense } from "react";
import type { Metadata } from "next";
import { hasDatabase } from "@/lib/db/client";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "CMS Sign In",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 py-16 texture-grain">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-lg font-extrabold tracking-[0.24em] text-foreground">
            BROLLAM <span className="text-[0.6rem] font-semibold tracking-[0.4em] text-accent">PARTNERS</span>
          </p>
          <p className="mt-2 text-[0.65rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Content Management
          </p>
        </div>

        <div className="mt-9 rounded-md border border-border bg-card p-7 sm:p-8">
          <h1 className="font-display text-2xl text-foreground">Sign in to continue</h1>
          <p className="mt-2 mb-6 text-xs leading-relaxed text-muted-foreground">
            Authorized team members only. Attempts are rate limited and logged.
          </p>
          <Suspense fallback={<div className="h-40 animate-pulse rounded-sm bg-card-raised/60" />}>
            <LoginForm databaseReady={hasDatabase} />
          </Suspense>
        </div>

        {!hasDatabase ? (
          <p className="mt-5 rounded-sm border border-warning/40 bg-warning/10 px-4 py-3 text-center text-xs leading-relaxed text-warning">
            The CMS database is not connected. Set DATABASE_URL in the environment and run the
            migration and seed scripts to enable sign in.
          </p>
        ) : null}
      </div>
    </main>
  );
}
