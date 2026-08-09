import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, site } from "@/lib/config";
import type { ServiceDto } from "@/lib/data/public";

export function Footer({ services }: { services: ServiceDto[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="dark border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <Link href="/" className="group inline-flex items-baseline gap-2.5">
              <span className="text-xl font-extrabold tracking-[0.24em] text-foreground transition-colors group-hover:text-accent-strong">
                BROLLAM
              </span>
              <span className="text-[0.65rem] font-semibold tracking-[0.42em] text-accent">
                PARTNERS
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-display text-xl leading-snug text-muted-foreground">
              Building Brands. <br />
              Creating Visibility. <br />
              <em className="text-accent italic">Driving Growth.</em>
            </p>
            <p className="mt-6 text-[0.7rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Company
            </p>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Talk To Us
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
                  >
                    {site.email}
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="text-muted-foreground transition-colors hover:text-accent-strong"
                  >
                    {site.phone}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-accent-strong"
                >
                  Start a Project
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            </ul>
            {site.socials.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((social) => (
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
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="tracking-[0.18em] uppercase">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
