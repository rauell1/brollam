"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface EditableItem {
  title?: string;
  label?: string;
  value?: string;
  description?: string;
}

/**
 * Row-list editor used for service capabilities and case study metrics.
 * Serializes state into a hidden field as JSON on every change so the
 * surrounding plain form submits everything at once.
 */
export function ListEditor({
  name,
  items,
  onChange,
  variant,
  addLabel,
}: {
  name: string;
  items: EditableItem[];
  onChange: (items: EditableItem[]) => void;
  variant: "capabilities" | "metrics";
  addLabel: string;
}) {
  const update = (index: number, patch: EditableItem) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const move = (index: number, direction: -1 | 1) => {
    const next = [...items];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const add = () => onChange([...items, variant === "metrics" ? { label: "", value: "", description: "" } : { title: "", description: "" }]);

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {items.length === 0 ? (
        <p className="rounded-sm border border-dashed border-border-strong px-4 py-6 text-center text-xs text-muted-foreground">
          Nothing added yet.
        </p>
      ) : (
        <ol className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="rounded-sm border border-border bg-input/50 p-3.5">
              <div className="flex items-start gap-2">
                <span className="mt-2.5 font-display text-sm text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="grid flex-1 gap-2.5 sm:grid-cols-[1fr_auto]">
                  {variant === "capabilities" ? (
                    <>
                      <Input
                        aria-label={`Title ${index + 1}`}
                        placeholder="Capability title"
                        value={item.title ?? ""}
                        onChange={(e) => update(index, { title: e.target.value })}
                      />
                      <div className="sm:col-span-2">
                        <Input
                          aria-label={`Description ${index + 1}`}
                          placeholder="Short description (optional)"
                          value={item.description ?? ""}
                          onChange={(e) => update(index, { description: e.target.value })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2.5 sm:grid-cols-[1.4fr_1fr] sm:col-span-2">
                        <Input
                          aria-label={`Metric label ${index + 1}`}
                          placeholder="Label, e.g. Fleet uptime"
                          value={item.label ?? ""}
                          onChange={(e) => update(index, { label: e.target.value })}
                        />
                        <Input
                          aria-label={`Metric value ${index + 1}`}
                          placeholder="Value, e.g. 94%"
                          value={item.value ?? ""}
                          onChange={(e) => update(index, { value: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Input
                          aria-label={`Metric context ${index + 1}`}
                          placeholder="Context sentence (optional)"
                          value={item.description ?? ""}
                          onChange={(e) => update(index, { description: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Move up"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-xs border border-border-strong text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move down"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-xs border border-border-strong text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label="Remove"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-xs border border-border-strong text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex h-9 items-center gap-2 rounded-sm border border-dashed border-border-strong px-4 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:border-accent/60 hover:text-accent"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

export function useItemList(initial: EditableItem[]) {
  return useState<EditableItem[]>(initial);
}
