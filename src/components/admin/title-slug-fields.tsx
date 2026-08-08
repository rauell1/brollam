"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "./form-fields";
import { slugify } from "@/lib/utils";

export function TitleSlugFields({
  defaultTitle = "",
  defaultSlug = "",
  titleLabel = "Title",
  titleError,
  slugError,
}: {
  defaultTitle?: string;
  defaultSlug?: string;
  titleLabel?: string;
  titleError?: string;
  slugError?: string;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultSlug));

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label={titleLabel} htmlFor="title" required error={titleError}>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          aria-invalid={Boolean(titleError)}
          autoComplete="off"
        />
      </Field>
      <Field label="Slug" htmlFor="slug" required error={slugError} hint="lowercase, hyphens">
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          aria-invalid={Boolean(slugError)}
          autoComplete="off"
          spellCheck={false}
        />
      </Field>
    </div>
  );
}
