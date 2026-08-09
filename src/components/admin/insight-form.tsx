"use client";

import { useActionState } from "react";
import { upsertInsight } from "@/lib/actions/admin/insights";
import { idleState } from "@/lib/actions/admin/helpers";
import { insightCategories } from "@/lib/validations";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FormAlerts, FormPanel, SubmitButton, SwitchField } from "./form-fields";
import { TitleSlugFields } from "./title-slug-fields";

export interface InsightFormData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string | null;
  authorId: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
}

function toInputDate(date: Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function InsightForm({
  insight,
  authors,
}: {
  insight?: InsightFormData;
  authors: { id: string; name: string; role: string }[];
}) {
  const action = upsertInsight.bind(null, insight?.id ?? null);
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} className="space-y-6">
      <FormAlerts state={state} />

      <FormPanel title="Article">
        <TitleSlugFields
          defaultTitle={insight?.title}
          defaultSlug={insight?.slug}
          titleError={state.fieldErrors?.title}
          slugError={state.fieldErrors?.slug}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" htmlFor="category" required error={state.fieldErrors?.category}>
            <Select name="category" defaultValue={insight?.category ?? "Business"}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {insightCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Author" htmlFor="authorId" hint="optional">
            <Select name="authorId" defaultValue={insight?.authorId ?? "none"}>
              <SelectTrigger id="authorId">
                <SelectValue placeholder="Brollam Partners" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Brollam Partners (no byline)</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name} · {author.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Excerpt" htmlFor="excerpt" hint="shown on cards and in search results">
          <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={insight?.excerpt} />
        </Field>
        <Field
          label="Body"
          htmlFor="content"
          required
          error={state.fieldErrors?.content}
          hint="## for headings, - for lists, > for pull quotes, **bold**, *italic*"
        >
          <Textarea
            id="content"
            name="content"
            rows={16}
            defaultValue={insight?.content}
            aria-invalid={Boolean(state.fieldErrors?.content)}
            className="font-mono text-[0.82rem] leading-relaxed"
          />
        </Field>
      </FormPanel>

      <FormPanel title="Publishing">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Featured image URL" htmlFor="featuredImage" error={state.fieldErrors?.featuredImage}>
            <Input id="featuredImage" name="featuredImage" defaultValue={insight?.featuredImage ?? ""} placeholder="/media/... or https://..." spellCheck={false} />
          </Field>
          <Field label="Publication date" htmlFor="publishedAt" hint="leave blank for today">
            <Input id="publishedAt" name="publishedAt" type="date" defaultValue={toInputDate(insight?.publishedAt ?? null)} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <SwitchField id="featured" name="featured" label="Featured" description="Lead story on the insights index." defaultChecked={insight?.featured ?? false} />
          <SwitchField id="published" name="published" label="Published" description="Visible to the public." defaultChecked={insight?.published ?? false} />
        </div>
      </FormPanel>

      <div className="flex items-center gap-3">
        <SubmitButton>{insight ? "Save Changes" : "Create Insight"}</SubmitButton>
      </div>
    </form>
  );
}
