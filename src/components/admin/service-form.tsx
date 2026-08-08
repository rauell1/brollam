"use client";

import { useActionState } from "react";
import { upsertService } from "@/lib/actions/admin/services";
import { idleState } from "@/lib/actions/admin/helpers";
import { Input, Textarea } from "@/components/ui/input";
import { Field, FormAlerts, FormPanel, SubmitButton, SwitchField } from "./form-fields";
import { TitleSlugFields } from "./title-slug-fields";
import { ListEditor, useItemList, type EditableItem } from "./list-editors";

export interface ServiceFormData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string | null;
  featuredImage: string | null;
  featuredVideo: string | null;
  position: number;
  published: boolean;
  capabilities: { title: string; description: string; position: number }[];
}

export function ServiceForm({ service }: { service?: ServiceFormData }) {
  const action = upsertService.bind(null, service?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);
  const [capabilities, setCapabilities] = useItemList(
    (service?.capabilities ?? []) as EditableItem[],
  );

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />

      <FormPanel
        title="Service"
        description="The short description appears on cards and search results. The full description appears on the service page."
      >
        <TitleSlugFields
          defaultTitle={service?.title}
          defaultSlug={service?.slug}
          titleError={state.fieldErrors?.title}
          slugError={state.fieldErrors?.slug}
        />
        <Field
          label="Short description"
          htmlFor="shortDescription"
          required
          error={state.fieldErrors?.shortDescription}
        >
          <Textarea
            id="shortDescription"
            name="shortDescription"
            rows={3}
            defaultValue={service?.shortDescription}
            aria-invalid={Boolean(state.fieldErrors?.shortDescription)}
          />
        </Field>
        <Field label="Full description" htmlFor="fullDescription" error={state.fieldErrors?.fullDescription} hint="## for headings, blank lines between paragraphs">
          <Textarea
            id="fullDescription"
            name="fullDescription"
            rows={8}
            defaultValue={service?.fullDescription}
            aria-invalid={Boolean(state.fieldErrors?.fullDescription)}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Icon" htmlFor="icon" hint="Fingerprint, Megaphone, Crosshair, MonitorSmartphone, Handshake, Sun">
            <Input id="icon" name="icon" defaultValue={service?.icon ?? ""} autoComplete="off" />
          </Field>
          <Field label="Position" htmlFor="position" hint="lower appears first">
            <Input
              id="position"
              name="position"
              type="number"
              min={0}
              max={999}
              defaultValue={service?.position ?? 0}
            />
          </Field>
        </div>
      </FormPanel>

      <FormPanel title="Capabilities" description="Shown on the service page and summarised on cards.">
        <ListEditor
          name="capabilitiesJson"
          items={capabilities}
          onChange={setCapabilities}
          variant="capabilities"
          addLabel="Add Capability"
        />
      </FormPanel>

      <FormPanel title="Media & Publishing">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Featured image URL" htmlFor="featuredImage" error={state.fieldErrors?.featuredImage}>
            <Input
              id="featuredImage"
              name="featuredImage"
              defaultValue={service?.featuredImage ?? ""}
              placeholder="/media/... or https://..."
              spellCheck={false}
            />
          </Field>
          <Field label="Featured video URL" htmlFor="featuredVideo" error={state.fieldErrors?.featuredVideo}>
            <Input
              id="featuredVideo"
              name="featuredVideo"
              defaultValue={service?.featuredVideo ?? ""}
              placeholder="https://... (mp4/webm)"
              spellCheck={false}
            />
          </Field>
        </div>
        <SwitchField
          id="published"
          name="published"
          label="Published"
          description="Visible on the public website when enabled."
          defaultChecked={service?.published ?? false}
        />
      </FormPanel>

      <div className="flex items-center gap-3">
        <SubmitButton>{service ? "Save Changes" : "Create Service"}</SubmitButton>
      </div>
    </form>
  );
}
