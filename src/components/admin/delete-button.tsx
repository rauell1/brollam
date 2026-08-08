"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteButton({
  action,
  itemName,
  label = "Delete",
  iconOnly = false,
}: {
  action: () => Promise<void>;
  itemName: string;
  label?: string;
  iconOnly?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {iconOnly ? (
          <button
            type="button"
            aria-label={`Delete ${itemName}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border-strong px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {label}
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes &ldquo;{itemName}&rdquo; and everything attached to it. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={(event) => {
              event.preventDefault();
              startTransition(async () => {
                await action();
              });
            }}
          >
            {pending ? "Deleting..." : "Delete Permanently"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
