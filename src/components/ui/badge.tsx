import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-xs border px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase",
  {
    variants: {
      variant: {
        default: "border-accent/40 bg-accent/10 text-accent-strong",
        neutral: "border-border-strong bg-card text-muted-foreground",
        success: "border-success/40 bg-success/10 text-success",
        warning: "border-warning/40 bg-warning/10 text-warning",
        destructive: "border-destructive/40 bg-destructive/10 text-destructive",
        outline: "border-border-strong text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
