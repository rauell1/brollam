import * as React from "react";
import { cn } from "@/lib/utils";

export const inputClasses =
  "flex h-11 w-full rounded-sm border border-border bg-input px-3.5 text-[0.95rem] text-foreground transition-colors placeholder:text-muted-foreground/60 hover:border-border-strong focus-visible:border-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(inputClasses, className)} {...props} />;
  },
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(inputClasses, "h-auto min-h-28 resize-y py-3 leading-relaxed", className)}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
