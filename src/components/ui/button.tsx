import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:bg-accent-strong",
        secondary:
          "bg-card text-foreground border border-border-strong hover:border-accent/60 hover:text-accent-strong",
        outline:
          "border border-accent/50 bg-transparent text-accent hover:bg-accent/10 hover:border-accent",
        ghost: "text-foreground hover:bg-card hover:text-accent-strong",
        link: "text-accent underline-offset-4 hover:underline px-0 h-auto",
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/40 hover:bg-destructive/25",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
