"use client";

import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { ActionState } from "@/lib/actions/admin/helpers";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="ml-1 text-accent">*</span> : null}
        </Label>
        {hint ? <span className="text-[0.65rem] text-muted-foreground/70">{hint}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SwitchField({
  id,
  name,
  label,
  description,
  defaultChecked = false,
}: {
  id: string;
  name: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-sm border border-border bg-input/60 px-4 py-3.5">
      <div>
        <Label htmlFor={id} className="normal-case tracking-normal text-foreground text-sm font-semibold">
          {label}
        </Label>
        {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <Switch id={id} name={name} defaultChecked={defaultChecked} aria-label={label} />
    </div>
  );
}

export function FormAlerts({ state }: { state: ActionState }) {
  if (state.error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-2.5 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {state.error}
      </div>
    );
  }
  if (state.ok && state.message) {
    return (
      <div
        role="status"
        className="flex items-start gap-2.5 rounded-sm border border-success/40 bg-success/10 px-4 py-3 text-sm text-success"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {state.message}
      </div>
    );
  }
  return null;
}

export function SubmitButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={cn("min-w-36", className)}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Saving
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function FormPanel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-md border border-border bg-card p-5 sm:p-7">
      <h2 className="text-[0.68rem] font-semibold tracking-[0.26em] text-accent uppercase">{title}</h2>
      {description ? <p className="mt-1.5 text-xs text-muted-foreground">{description}</p> : null}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}
