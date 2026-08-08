"use client";

import { useActionState } from "react";
import { upsertTeamMember } from "@/lib/actions/admin/team";
import { idleState } from "@/lib/actions/admin/helpers";
import { Input, Textarea } from "@/components/ui/input";
import { Field, FormAlerts, FormPanel, SubmitButton, SwitchField } from "./form-fields";
import { TitleSlugFields } from "./title-slug-fields";

export interface TeamFormData {
  id: string;
  name: string;
  slug: string;
  role: string;
  biography: string;
  expertise: string[];
  image: string | null;
  linkedinUrl: string | null;
  email: string | null;
  position: number;
  active: boolean;
}

export function TeamForm({ member }: { member?: TeamFormData }) {
  const action = upsertTeamMember.bind(null, member?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />

      <FormPanel title="Team Member">
        <TitleSlugFields
          defaultTitle={member?.name}
          defaultSlug={member?.slug}
          titleLabel="Full name"
          titleError={state.fieldErrors?.name ?? state.fieldErrors?.title}
          slugError={state.fieldErrors?.slug}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Role" htmlFor="role" required error={state.fieldErrors?.role} hint="e.g. Communications & Brand Strategy">
            <Input id="role" name="role" defaultValue={member?.role} aria-invalid={Boolean(state.fieldErrors?.role)} />
          </Field>
          <Field label="Position" htmlFor="position" hint="lower appears first">
            <Input id="position" name="position" type="number" min={0} max={999} defaultValue={member?.position ?? 0} />
          </Field>
        </div>
        <Field label="Short biography" htmlFor="biography" hint="write only from confirmed, supplied information">
          <Textarea id="biography" name="biography" rows={4} defaultValue={member?.biography} />
        </Field>
        <Field label="Expertise" htmlFor="expertiseCsv" hint="comma separated, e.g. Public Relations, Content Strategy">
          <Input id="expertiseCsv" name="expertiseCsv" defaultValue={member?.expertise.join(", ")} autoComplete="off" />
        </Field>
      </FormPanel>

      <FormPanel title="Links & Media">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Portrait image URL" htmlFor="image" error={state.fieldErrors?.image} hint="professional photo only">
            <Input id="image" name="image" defaultValue={member?.image ?? ""} placeholder="/media/... or https://..." spellCheck={false} />
          </Field>
          <Field label="LinkedIn URL" htmlFor="linkedinUrl" error={state.fieldErrors?.linkedinUrl}>
            <Input id="linkedinUrl" name="linkedinUrl" defaultValue={member?.linkedinUrl ?? ""} placeholder="https://www.linkedin.com/in/..." spellCheck={false} />
          </Field>
        </div>
        <Field label="Email" htmlFor="email" error={state.fieldErrors?.email} hint="optional, shown only if set">
          <Input id="email" name="email" type="email" defaultValue={member?.email ?? ""} />
        </Field>
        <SwitchField
          id="active"
          name="active"
          label="Visible on website"
          description="Inactive members stay in the CMS but are hidden publicly."
          defaultChecked={member?.active ?? true}
        />
      </FormPanel>

      <div className="flex items-center gap-3">
        <SubmitButton>{member ? "Save Changes" : "Add Team Member"}</SubmitButton>
      </div>
    </form>
  );
}
