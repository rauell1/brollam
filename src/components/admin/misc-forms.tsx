"use client";

import { useActionState, useState } from "react";
import { upsertCareer } from "@/lib/actions/admin/careers";
import { upsertStatistic, upsertMediaItem } from "@/lib/actions/admin/site";
import { upsertUser } from "@/lib/actions/admin/users";
import { idleState } from "@/lib/actions/admin/helpers";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FormAlerts, FormPanel, SubmitButton, SwitchField } from "./form-fields";
import { MediaUpload } from "./media-upload";

/* ---------------------------------- Career ---------------------------------- */

export interface CareerFormData {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  summary: string;
  description: string;
  requirements: string;
  published: boolean;
  closesAt: Date | null;
}

function toInputDate(date: Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function CareerForm({ career }: { career?: CareerFormData }) {
  const action = upsertCareer.bind(null, career?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <FormPanel title="Open Role">
        <Field label="Job title" htmlFor="title" required error={state.fieldErrors?.title}>
          <Input id="title" name="title" defaultValue={career?.title} aria-invalid={Boolean(state.fieldErrors?.title)} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Location" htmlFor="location">
            <Input id="location" name="location" defaultValue={career?.location ?? "Nairobi, Kenya"} />
          </Field>
          <Field label="Employment type" htmlFor="employmentType">
            <Select name="employmentType" defaultValue={career?.employmentType ?? "Full-time"}>
              <SelectTrigger id="employmentType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Full-time", "Part-time", "Contract", "Internship", "Consultancy"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Applications close" htmlFor="closesAt" hint="optional">
            <Input id="closesAt" name="closesAt" type="date" defaultValue={toInputDate(career?.closesAt ?? null)} />
          </Field>
        </div>
        <Field label="Summary" htmlFor="summary" hint="one sentence for the listing">
          <Textarea id="summary" name="summary" rows={2} defaultValue={career?.summary} />
        </Field>
        <Field label="The role" htmlFor="description" hint="## for headings, - for lists">
          <Textarea id="description" name="description" rows={8} defaultValue={career?.description} />
        </Field>
        <Field label="Requirements" htmlFor="requirements" hint="what the candidate brings">
          <Textarea id="requirements" name="requirements" rows={6} defaultValue={career?.requirements} />
        </Field>
        <SwitchField id="published" name="published" label="Published" description="Visible on the careers page while the closing date has not passed." defaultChecked={career?.published ?? false} />
      </FormPanel>
      <div className="flex items-center gap-3">
        <SubmitButton>{career ? "Save Changes" : "Create Role"}</SubmitButton>
      </div>
    </form>
  );
}

/* --------------------------------- Statistic -------------------------------- */

export interface StatisticFormData {
  id: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
  scope: "COMPANY" | "TEAM_TRACK_RECORD";
  position: number;
  active: boolean;
}

export function StatisticForm({ statistic }: { statistic?: StatisticFormData }) {
  const action = upsertStatistic.bind(null, statistic?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <FormPanel
        title="Statistic"
        description="Company statistics appear in the proof bar. Track record items appear with their qualification note. Activate only verified numbers."
      >
        <div className="grid gap-5 sm:grid-cols-[1.6fr_1fr_120px]">
          <Field label="Label" htmlFor="label" required error={state.fieldErrors?.label} hint="e.g. Fleet uptime maintained">
            <Input id="label" name="label" defaultValue={statistic?.label} aria-invalid={Boolean(state.fieldErrors?.label)} />
          </Field>
          <Field label="Value" htmlFor="value" required error={state.fieldErrors?.value} hint="e.g. 94, KES 50M, 18 to 100">
            <Input id="value" name="value" defaultValue={statistic?.value} aria-invalid={Boolean(state.fieldErrors?.value)} autoComplete="off" />
          </Field>
          <Field label="Suffix" htmlFor="suffix" hint="e.g. %, +">
            <Input id="suffix" name="suffix" defaultValue={statistic?.suffix} autoComplete="off" />
          </Field>
        </div>
        <Field label="Context sentence" htmlFor="description">
          <Textarea id="description" name="description" rows={2} defaultValue={statistic?.description} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Scope" htmlFor="scope" required error={state.fieldErrors?.scope}>
            <Select name="scope" defaultValue={statistic?.scope ?? "COMPANY"}>
              <SelectTrigger id="scope">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPANY">Company (proof bar)</SelectItem>
                <SelectItem value="TEAM_TRACK_RECORD">Team track record</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Position" htmlFor="position" hint="lower appears first">
            <Input id="position" name="position" type="number" min={0} max={999} defaultValue={statistic?.position ?? 0} />
          </Field>
        </div>
        <SwitchField id="active" name="active" label="Visible on website" defaultChecked={statistic?.active ?? false} />
      </FormPanel>
      <div className="flex items-center gap-3">
        <SubmitButton>{statistic ? "Save Changes" : "Create Statistic"}</SubmitButton>
      </div>
    </form>
  );
}

/* ----------------------------------- Media ---------------------------------- */

export interface MediaFormData {
  id: string;
  title: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  url: string;
  altText: string;
  category: string;
}

/** Maps a MIME type onto the library's coarse media categories. */
function mediaTypeFor(contentType: string): MediaFormData["type"] {
  if (contentType.startsWith("image/")) return "IMAGE";
  if (contentType.startsWith("video/")) return "VIDEO";
  return "DOCUMENT";
}

/** Turns "brand-guidelines-v2.pdf" into "Brand Guidelines V2" for the title. */
function titleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function MediaForm({
  item,
  storageReady = false,
}: {
  item?: MediaFormData;
  storageReady?: boolean;
}) {
  const action = upsertMediaItem.bind(null, item?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);
  const [url, setUrl] = useState(item?.url ?? "");
  const [type, setType] = useState<MediaFormData["type"]>(item?.type ?? "IMAGE");
  const [title, setTitle] = useState(item?.title ?? "");

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <FormPanel
        title="Media Item"
        description={
          storageReady
            ? "Upload a file to object storage, or paste the URL of an asset hosted elsewhere. The library stores metadata and URLs only."
            : "The library stores metadata and URLs only. Upload binaries to your CDN or object storage and record the URL here."
        }
      >
        {storageReady ? (
          <MediaUpload
            onUploaded={({ url: uploadedUrl, contentType, fileName }) => {
              setUrl(uploadedUrl);
              setType(mediaTypeFor(contentType));
              // Only suggest a title when the editor has not written one.
              setTitle((current) => current || titleFromFileName(fileName));
            }}
          />
        ) : null}

        <div className="grid gap-5 sm:grid-cols-[1.4fr_200px]">
          <Field label="Title" htmlFor="title" required error={state.fieldErrors?.title}>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={Boolean(state.fieldErrors?.title)}
            />
          </Field>
          <Field label="Type" htmlFor="type">
            <Select name="type" value={type} onValueChange={(v) => setType(v as MediaFormData["type"])}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="VIDEO">Video</SelectItem>
                <SelectItem value="DOCUMENT">Document</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="URL" htmlFor="url" required error={state.fieldErrors?.url} hint="https://... or /media/...">
          <Input
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            spellCheck={false}
            aria-invalid={Boolean(state.fieldErrors?.url)}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Alt text" htmlFor="altText" hint="describes the media for screen readers">
            <Input id="altText" name="altText" defaultValue={item?.altText} />
          </Field>
          <Field label="Category" htmlFor="category" hint="e.g. Brand, Editorial">
            <Input id="category" name="category" defaultValue={item?.category} />
          </Field>
        </div>
      </FormPanel>
      <div className="flex items-center gap-3">
        <SubmitButton>{item ? "Save Changes" : "Add Media Item"}</SubmitButton>
      </div>
    </form>
  );
}

/* ----------------------------------- User ----------------------------------- */

export interface UserFormData {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
}

export function UserForm({ user }: { user?: UserFormData }) {
  const action = upsertUser.bind(null, user?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />
      <FormPanel
        title={user ? "Edit CMS User" : "New CMS User"}
        description={user ? "Leave the password blank to keep the current one." : "The user signs in with this email and password."}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" required error={state.fieldErrors?.name}>
            <Input id="name" name="name" defaultValue={user?.name} aria-invalid={Boolean(state.fieldErrors?.name)} />
          </Field>
          <Field label="Email" htmlFor="email" required error={state.fieldErrors?.email}>
            <Input id="email" name="email" type="email" defaultValue={user?.email} aria-invalid={Boolean(state.fieldErrors?.email)} autoComplete="off" />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Role" htmlFor="role" hint="editors cannot manage users">
            <Select name="role" defaultValue={user?.role ?? "EDITOR"}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="ADMIN">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label={user ? "New password" : "Password"}
            htmlFor="password"
            required={!user}
            error={state.fieldErrors?.password}
            hint="minimum 10 characters"
          >
            <Input id="password" name="password" type="password" autoComplete="new-password" aria-invalid={Boolean(state.fieldErrors?.password)} />
          </Field>
        </div>
      </FormPanel>
      <div className="flex items-center gap-3">
        <SubmitButton>{user ? "Save Changes" : "Create User"}</SubmitButton>
      </div>
    </form>
  );
}
