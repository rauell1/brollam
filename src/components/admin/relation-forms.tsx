"use client";

import { useActionState } from "react";
import {
  upsertClient,
  upsertPartner,
  upsertTestimonial,
} from "@/lib/actions/admin/relations";
import { idleState, type ActionState } from "@/lib/actions/admin/helpers";
import { partnerCategories } from "@/lib/validations";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FormAlerts, FormPanel, SubmitButton, SwitchField } from "./form-fields";

interface OrgRow {
  id: string;
  name: string;
  logo: string | null;
  websiteUrl: string | null;
  position: number;
  active: boolean;
  category?: string;
}

function OrgForm({
  row,
  action,
  submitLabel,
  withCategory = false,
}: {
  row?: OrgRow;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  withCategory?: boolean;
}) {
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <FormPanel title={submitLabel.replace(/^(Create|Edit)\s*/, "")}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" required error={state.fieldErrors?.name}>
            <Input id="name" name="name" defaultValue={row?.name} aria-invalid={Boolean(state.fieldErrors?.name)} />
          </Field>
          {withCategory ? (
            <Field label="Category" htmlFor="category">
              <Select name="category" defaultValue={row?.category || "Technology"}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {partnerCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : (
            <Field label="Position" htmlFor="position" hint="lower appears first">
              <Input id="position" name="position" type="number" min={0} max={999} defaultValue={row?.position ?? 0} />
            </Field>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Logo URL" htmlFor="logo" error={state.fieldErrors?.logo} hint="SVG/PNG, transparent preferred">
            <Input id="logo" name="logo" defaultValue={row?.logo ?? ""} placeholder="/media/... or https://..." spellCheck={false} />
          </Field>
          <Field label="Website URL" htmlFor="websiteUrl" error={state.fieldErrors?.websiteUrl}>
            <Input id="websiteUrl" name="websiteUrl" defaultValue={row?.websiteUrl ?? ""} placeholder="https://..." spellCheck={false} />
          </Field>
        </div>
        {withCategory ? (
          <Field label="Position" htmlFor="position" hint="lower appears first" className="sm:max-w-xs">
            <Input id="position" name="position" type="number" min={0} max={999} defaultValue={row?.position ?? 0} />
          </Field>
        ) : null}
        <SwitchField
          id="active"
          name="active"
          label="Show on website"
          description="Only switched on after the relationship is confirmed."
          defaultChecked={row?.active ?? false}
        />
      </FormPanel>
      <div className="flex items-center gap-3">
        <SubmitButton>{row ? "Save Changes" : submitLabel}</SubmitButton>
      </div>
    </form>
  );
}

export function ClientForm({ client }: { client?: OrgRow }) {
  return (
    <OrgForm
      row={client}
      action={upsertClient.bind(null, client?.id ?? null)}
      submitLabel="Create Client"
    />
  );
}

export function PartnerForm({ partner }: { partner?: OrgRow }) {
  return (
    <OrgForm
      row={partner}
      action={upsertPartner.bind(null, partner?.id ?? null)}
      submitLabel="Create Partner"
      withCategory
    />
  );
}

export interface TestimonialRow {
  id: string;
  clientName: string;
  company: string;
  role: string;
  quote: string;
  image: string | null;
  companyLogo: string | null;
  videoUrl: string | null;
  featured: boolean;
  published: boolean;
}

export function TestimonialForm({ testimonial }: { testimonial?: TestimonialRow }) {
  const action = upsertTestimonial.bind(null, testimonial?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <FormPanel
        title="Testimonial"
        description="Publish only quotes you have explicit permission to use."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Client name" htmlFor="clientName" required error={state.fieldErrors?.clientName}>
            <Input id="clientName" name="clientName" defaultValue={testimonial?.clientName} aria-invalid={Boolean(state.fieldErrors?.clientName)} />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input id="company" name="company" defaultValue={testimonial?.company} />
          </Field>
          <Field label="Role" htmlFor="role">
            <Input id="role" name="role" defaultValue={testimonial?.role} />
          </Field>
        </div>
        <Field label="Quote" htmlFor="quote" required error={state.fieldErrors?.quote}>
          <Textarea id="quote" name="quote" rows={4} defaultValue={testimonial?.quote} aria-invalid={Boolean(state.fieldErrors?.quote)} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Portrait URL" htmlFor="image" error={state.fieldErrors?.image}>
            <Input id="image" name="image" defaultValue={testimonial?.image ?? ""} placeholder="https://..." spellCheck={false} />
          </Field>
          <Field label="Company logo URL" htmlFor="companyLogo" error={state.fieldErrors?.companyLogo}>
            <Input id="companyLogo" name="companyLogo" defaultValue={testimonial?.companyLogo ?? ""} placeholder="https://..." spellCheck={false} />
          </Field>
          <Field label="Video URL" htmlFor="videoUrl" error={state.fieldErrors?.videoUrl}>
            <Input id="videoUrl" name="videoUrl" defaultValue={testimonial?.videoUrl ?? ""} placeholder="https://... (mp4/webm)" spellCheck={false} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <SwitchField id="featured" name="featured" label="Featured" description="Appears first on the homepage." defaultChecked={testimonial?.featured ?? false} />
          <SwitchField id="published" name="published" label="Published" description="Visible to the public." defaultChecked={testimonial?.published ?? false} />
        </div>
      </FormPanel>
      <div className="flex items-center gap-3">
        <SubmitButton>{testimonial ? "Save Changes" : "Create Testimonial"}</SubmitButton>
      </div>
    </form>
  );
}
