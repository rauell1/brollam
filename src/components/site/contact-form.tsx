"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { enquirySchema } from "@/lib/validations";
import { submitEnquiry, type EnquiryFormState } from "@/lib/actions/enquiry";
import { budgetRanges, projectTimelines, site } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FormValues = z.input<typeof enquirySchema>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function ContactForm({
  projectTypes,
  startedAt,
}: {
  projectTypes: string[];
  startedAt: string;
}) {
  const [serverState, setServerState] = useState<EnquiryFormState>({ status: "idle" });
  const [pending, startTransition] = useTransition();

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
      website: "",
      startedAt,
    }),
    [startedAt],
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues,
    mode: "onBlur",
  });

  const projectType = useWatch({ control, name: "projectType" }) ?? "";
  const budget = useWatch({ control, name: "budget" }) ?? "";
  const timeline = useWatch({ control, name: "timeline" }) ?? "";

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitEnquiry({ ...values, startedAt });
      setServerState(result);
      if (result.status === "success") {
        reset(defaultValues);
      }
    });
  });

  if (serverState.status === "success") {
    return (
      <div
        className="texture-grain flex h-full min-h-[420px] flex-col items-center justify-center rounded-md border border-accent/30 bg-card px-8 py-16 text-center"
        role="status"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
          <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-3xl text-foreground">Message received.</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out. A member of the team will review your note and respond within
          two working days.
        </p>
        <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
          {site.location}
        </p>
      </div>
    );
  }

  const fieldError = (name: keyof FormValues) =>
    errors[name]?.message ?? serverState.fieldErrors?.[name];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-label="Project enquiry">
      {/* Honeypot: invisible to humans, irresistible to bots */}
      <div className="absolute -left-[9999px] -top-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <input type="hidden" {...register("startedAt")} value={startedAt} />

      {serverState.message && serverState.status !== "error" ? (
        <div
          role="alert"
          className={cn(
            "rounded-sm border px-4 py-3 text-sm",
            serverState.status === "no_database"
              ? "border-warning/40 bg-warning/10 text-warning"
              : "border-destructive/40 bg-destructive/10 text-destructive",
          )}
        >
          {serverState.message}
        </div>
      ) : null}
      {serverState.status === "error" && serverState.message ? (
        <div
          role="alert"
          className="rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {serverState.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            autoComplete="name"
            className="mt-2"
            aria-invalid={Boolean(fieldError("name"))}
            aria-describedby={fieldError("name") ? "error-name" : undefined}
            {...register("name")}
          />
          <FieldError id="error-name" message={fieldError("name")} />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            autoComplete="organization"
            className="mt-2"
            aria-invalid={Boolean(fieldError("company"))}
            aria-describedby={fieldError("company") ? "error-company" : undefined}
            {...register("company")}
          />
          <FieldError id="error-company" message={fieldError("company")} />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-2"
            aria-invalid={Boolean(fieldError("email"))}
            aria-describedby={fieldError("email") ? "error-email" : undefined}
            {...register("email")}
          />
          <FieldError id="error-email" message={fieldError("email")} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2"
            aria-invalid={Boolean(fieldError("phone"))}
            aria-describedby={fieldError("phone") ? "error-phone" : undefined}
            {...register("phone")}
          />
          <FieldError id="error-phone" message={fieldError("phone")} />
        </div>
        <div>
          <Label htmlFor="projectType">Project Type *</Label>
          <Select
            value={projectType}
            onValueChange={(v) => setValue("projectType", v, { shouldValidate: true })}
          >
            <SelectTrigger
              id="projectType"
              className="mt-2"
              aria-invalid={Boolean(fieldError("projectType"))}
              aria-describedby={fieldError("projectType") ? "error-projectType" : undefined}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="error-projectType" message={fieldError("projectType")} />
        </div>
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Select
            value={budget}
            onValueChange={(v) => setValue("budget", v)}
          >
            <SelectTrigger id="budget" className="mt-2">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Select
            value={timeline}
            onValueChange={(v) => setValue("timeline", v)}
          >
            <SelectTrigger id="timeline" className="mt-2 sm:max-w-[calc(50%-0.75rem)]">
              <SelectValue placeholder="When do you want to start?" />
            </SelectTrigger>
            <SelectContent>
              {projectTimelines.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Tell Us About The Project *</Label>
          <Textarea
            id="message"
            rows={6}
            className="mt-2"
            placeholder="What are you building, who needs to see it, and what does success look like?"
            aria-invalid={Boolean(fieldError("message"))}
            aria-describedby={fieldError("message") ? "error-message" : undefined}
            {...register("message")}
          />
          <FieldError id="error-message" message={fieldError("message")} />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Your details go directly to the Brollam team. Nothing is shared or sold.
        </p>
        <Button type="submit" size="lg" disabled={pending} className="group shrink-0">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
