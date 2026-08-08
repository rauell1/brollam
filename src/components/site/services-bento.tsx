import Link from "next/link";
import {
  ArrowUpRight,
  Crosshair,
  Fingerprint,
  Handshake,
  Megaphone,
  MonitorSmartphone,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { ServiceDto } from "@/lib/data/public";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, LucideIcon> = {
  Fingerprint,
  Megaphone,
  Crosshair,
  MonitorSmartphone,
  Handshake,
  Sun,
};

const spanClasses = [
  "sm:col-span-2 lg:col-span-4",
  "sm:col-span-1 lg:col-span-2",
  "sm:col-span-1 lg:col-span-2",
  "sm:col-span-2 lg:col-span-4",
  "sm:col-span-2 lg:col-span-3",
  "sm:col-span-2 lg:col-span-3",
];

/** Quiet, per-card graphic motifs built from pure CSS. */
function CardMotif({ index }: { index: number }) {
  switch (index % 6) {
    case 0:
      return (
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full border border-foreground/10 transition-colors duration-500 group-hover:border-accent/30"
        >
          <div className="absolute inset-8 rounded-full border border-foreground/10" />
          <div className="absolute inset-16 rounded-full border border-accent/20" />
        </div>
      );
    case 1:
      return (
        <div aria-hidden="true" className="texture-dots absolute -right-10 -bottom-10 h-44 w-44 opacity-40" />
      );
    case 2:
      return (
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-16 h-56 w-56 rotate-45 border border-foreground/10 transition-colors duration-500 group-hover:border-accent/30"
        />
      );
    case 3:
      return (
        <div aria-hidden="true" className="texture-lines absolute -right-6 -top-6 h-40 w-40 opacity-50" />
      );
    case 4:
      return (
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_70%)]"
        />
      );
    default:
      return (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 h-px w-2/3 bg-gradient-to-l from-accent/50 to-transparent"
        >
          <div className="absolute top-4 right-0 h-px w-3/4 bg-gradient-to-l from-foreground/15 to-transparent" />
        </div>
      );
  }
}

function ServiceCard({ service, index }: { service: ServiceDto; index: number }) {
  const Icon = (service.icon && iconMap[service.icon]) || Sparkles;
  const shownCapabilities = service.capabilities.slice(0, 4);
  const remaining = service.capabilities.length - shownCapabilities.length;

  return (
    <Reveal
      delay={index * 0.06}
      className={cn("group relative", spanClasses[index % spanClasses.length])}
    >
      <Link
        href={`/services/${service.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card-raised focus-visible:outline-2 focus-visible:outline-ring sm:p-9"
      >
        <CardMotif index={index} />
        <div className="relative flex items-start justify-between gap-4">
          <span className="font-display text-5xl leading-none text-foreground/15 transition-colors duration-300 group-hover:text-accent/40 sm:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border-strong text-accent transition-colors duration-300 group-hover:border-accent/50">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
        <h3 className="relative mt-8 font-display text-[1.65rem] leading-tight text-foreground sm:text-3xl">
          {service.title}
        </h3>
        <p className="relative mt-3 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground">
          {service.shortDescription}
        </p>
        {shownCapabilities.length > 0 && (
          <ul className="relative mt-6 flex flex-wrap gap-x-2 gap-y-2" aria-label="Selected capabilities">
            {shownCapabilities.map((cap) => (
              <li
                key={cap.id}
                className="rounded-xs border border-border px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-muted-foreground"
              >
                {cap.title}
              </li>
            ))}
            {remaining > 0 && (
              <li className="rounded-xs border border-accent/30 px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-accent">
                + {remaining} more
              </li>
            )}
          </ul>
        )}
        <span className="relative mt-auto inline-flex items-center gap-2 pt-7 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase">
          View Service
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesBento({ services }: { services: ServiceDto[] }) {
  if (services.length === 0) return null;

  return (
    <section aria-labelledby="core-services" className="bg-surface/40 py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            id="core-services"
            eyebrow="What We Do"
            title={
              <>
                Everything A Growing Brand <br className="hidden sm:block" />
                Needs To Be <em className="text-accent italic">Seen.</em>
              </>
            }
            description="Six integrated disciplines, one accountable team. Use them individually, or as a single system pointed at growth."
          />
          <Reveal delay={0.2}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase transition-colors hover:text-accent-strong"
            >
              All Services
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
