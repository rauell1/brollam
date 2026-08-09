"use client";

import { useActionState } from "react";
import { updateEnquiry } from "@/lib/actions/admin/site";
import { idleState } from "@/lib/actions/admin/helpers";
import { Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FormAlerts, SubmitButton } from "./form-fields";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST", "ARCHIVED"] as const;

export function EnquiryUpdateForm({
  enquiryId,
  status,
  internalNote,
}: {
  enquiryId: string;
  status: string;
  internalNote: string;
}) {
  const action = updateEnquiry.bind(null, enquiryId);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-5">
      <FormAlerts state={state} />
      <Field label="Pipeline status" htmlFor="status">
        <Select name="status" defaultValue={status}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Internal note" htmlFor="internalNote" hint="never shown publicly">
        <Textarea id="internalNote" name="internalNote" rows={4} defaultValue={internalNote} />
      </Field>
      <SubmitButton>Update Enquiry</SubmitButton>
    </form>
  );
}
