"use client";

import { useActionState, useState } from "react";
import { upsertCaseStudy } from "@/lib/actions/admin/case-studies";
import { idleState } from "@/lib/actions/admin/helpers";
import { Input, Textarea } from "@/components/ui/input";
import { Field, FormAlerts, FormPanel, SubmitButton, SwitchField } from "./form-fields";
import { TitleSlugFields } from "./title-slug-fields";
import { ListEditor, useItemList, type EditableItem } from "./list-editors";
import { cn } from "@/lib/utils";

export interface CaseStudyFormData {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  categories: string[];
  relatedServiceSlugs: string[];
  featuredImage: string | null;
  featuredVideo: string | null;
  published: boolean;
  featured: boolean;
  publishedAt: Date | null;
  metrics: { label: string; value: string; description: string; position: number }[];
}

function toInputDate(date: Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function CaseStudyForm({
  caseStudy,
  services,
}: {
  caseStudy?: CaseStudyFormData;
  services: { slug: string; title: string }[];
}) {
  const action = upsertCaseStudy.bind(null, caseStudy?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);
  const [metrics, setMetrics] = useItemList((caseStudy?.metrics ?? []) as EditableItem[]);
  const [related, setRelated] = useState<string[]>(caseStudy?.relatedServiceSlugs ?? []);

  const toggleRelated = (slug: string) => {
    setRelated((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  };

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <input type="hidden" name="relatedServiceSlugsJson" value={JSON.stringify(related)} />

      <FormPanel title="Case Study" description="Publish only verified, client approved work.">
        <TitleSlugFields
          defaultTitle={caseStudy?.title}
          defaultSlug={caseStudy?.slug}
          titleError={state.fieldErrors?.title}
          slugError={state.fieldErrors?.slug}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Client name" htmlFor="clientName" required error={state.fieldErrors?.clientName}>
            <Input id="clientName" name="clientName" defaultValue={caseStudy?.clientName} aria-invalid={Boolean(state.fieldErrors?.clientName)} />
          </Field>
          <Field label="Industry" htmlFor="industry">
            <Input id="industry" name="industry" defaultValue={caseStudy?.industry} />
          </Field>
        </div>
        <Field label="Summary" htmlFor="summary" hint="one or two sentences">
          <Textarea id="summary" name="summary" rows={3} defaultValue={caseStudy?.summary} />
        </Field>
        <Field label="Categories" htmlFor="categoriesCsv" hint="comma separated, e.g. Branding, Websites">
          <Input
            id="categoriesCsv"
            name="categoriesCsv"
            defaultValue={caseStudy?.categories.join(", ")}
            autoComplete="off"
          />
        </Field>
      </FormPanel>

      <FormPanel title="Narrative" description="Structured long form story of the engagement. Use ## for subheadings and blank lines between paragraphs.">
        <Field label="Challenge" htmlFor="challenge">
          <Textarea id="challenge" name="challenge" rows={5} defaultValue={caseStudy?.challenge} />
        </Field>
        <Field label="Strategy" htmlFor="strategy">
          <Textarea id="strategy" name="strategy" rows={5} defaultValue={caseStudy?.strategy} />
        </Field>
        <Field label="Execution" htmlFor="execution">
          <Textarea id="execution" name="execution" rows={5} defaultValue={caseStudy?.execution} />
        </Field>
        <Field label="Results" htmlFor="results">
          <Textarea id="results" name="results" rows={5} defaultValue={caseStudy?.results} />
        </Field>
      </FormPanel>

      <FormPanel title="Metrics" description="Only publish numbers the client has verified and approved.">
        <ListEditor
          name="metricsJson"
          items={metrics}
          onChange={setMetrics}
          variant="metrics"
          addLabel="Add Metric"
        />
      </FormPanel>

      <FormPanel title="Related Services">
        {services.length === 0 ? (
          <p className="text-xs text-muted-foreground">No services exist yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {services.map((service) => {
              const selected = related.includes(service.slug);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => toggleRelated(service.slug)}
                  aria-pressed={selected}
                  className={cn(
                    "h-9 rounded-sm border px-3.5 text-xs font-semibold transition-colors",
                    selected
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border-strong text-muted-foreground hover:border-accent/40 hover:text-foreground",
                  )}
                >
                  {service.title}
                </button>
              );
            })}
          </div>
        )}
      </FormPanel>

      <FormPanel title="Media & Publishing">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Featured image URL" htmlFor="featuredImage" error={state.fieldErrors?.featuredImage}>
            <Input id="featuredImage" name="featuredImage" defaultValue={caseStudy?.featuredImage ?? ""} placeholder="/media/... or https://..." spellCheck={false} />
          </Field>
          <Field label="Featured video URL" htmlFor="featuredVideo" error={state.fieldErrors?.featuredVideo}>
            <Input id="featuredVideo" name="featuredVideo" defaultValue={caseStudy?.featuredVideo ?? ""} placeholder="https://... (mp4/webm)" spellCheck={false} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Publication date" htmlFor="publishedAt" hint="leave blank for today">
            <Input id="publishedAt" name="publishedAt" type="date" defaultValue={toInputDate(caseStudy?.publishedAt ?? null)} />
          </Field>
          <div className="sm:pt-7">
            <SwitchField id="featured" name="featured" label="Featured" description="Hero slot on the homepage." defaultChecked={caseStudy?.featured ?? false} />
          </div>
          <div className="sm:pt-7">
            <SwitchField id="published" name="published" label="Published" description="Visible to the public." defaultChecked={caseStudy?.published ?? false} />
          </div>
        </div>
      </FormPanel>

      <div className="flex items-center gap-3">
        <SubmitButton>{caseStudy ? "Save Changes" : "Create Case Study"}</SubmitButton>
      </div>
    </form>
  );
}
