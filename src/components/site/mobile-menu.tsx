"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { mainNav, site } from "@/lib/config";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({
  open,
  onOpenChange,
  email,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string | null;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const socials = site.socials;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 flex flex-col bg-background texture-grain"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : 16 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              >
                <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
                <div className="flex h-16 items-center justify-between px-5 sm:px-8">
                  <span className="inline-flex items-baseline gap-2">
                    <span className="text-[1.05rem] font-extrabold tracking-[0.24em]">BROLLAM</span>
                    <span className="text-[0.58rem] font-semibold tracking-[0.42em] text-accent">
                      PARTNERS
                    </span>
                  </span>
                  <DialogPrimitive.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </DialogPrimitive.Close>
                </div>

                <nav
                  aria-label="Mobile"
                  className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 py-8 sm:px-10"
                >
                  {mainNav.map((item, index) => (
                    <m.div
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.06 + index * 0.05, ease: EASE }}
                    >
                      <DialogPrimitive.Close asChild>
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={cn(
                            "group flex min-h-12 items-baseline gap-4 border-b border-border/60 py-3 font-display text-[2rem] leading-tight transition-colors",
                            isActive(item.href)
                              ? "text-accent italic"
                              : "text-foreground hover:text-accent-strong",
                          )}
                        >
                          <span className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </Link>
                      </DialogPrimitive.Close>
                    </m.div>
                  ))}
                </nav>

                <m.div
                  className="border-t border-border px-6 py-6 sm:px-10"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                        {site.location}
                      </p>
                      {email ? (
                        <a
                          href={`mailto:${email}`}
                          className="mt-1.5 block text-sm text-foreground underline-offset-4 hover:text-accent hover:underline"
                        >
                          {email}
                        </a>
                      ) : null}
                    </div>
                    <DialogPrimitive.Close asChild>
                      <Link
                        href="/contact"
                        className="group inline-flex h-11 items-center gap-1.5 rounded-sm bg-accent px-6 text-[0.72rem] font-semibold tracking-[0.18em] text-accent-foreground uppercase transition-colors hover:bg-accent-strong"
                      >
                        Start a Project
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </DialogPrimitive.Close>
                  </div>
                  {socials.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-accent"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  )}
                </m.div>
              </m.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
