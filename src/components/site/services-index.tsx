import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import type { ServiceDto } from "@/lib/data/public";

/**
 * Full services listing.
 *
 * The /services route already loaded every service and its capabilities from
 * the CMS, then rendered only the homepage carousel — so six descriptions and
 * fifty-odd capabilities existed in the database but appeared nowhere on the
 * site, and the /services/[slug] detail pages were reachable only from the
 * footer. This is that missing index.
 */
export function ServicesIndex({ services }: { services: ServiceDto[] }) {
  if (services.length === 0) return null;

  return (
    <section aria-labelledby="services-index" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="services-index"
          eyebrow="The Full Picture"
          title="What each practice actually delivers."
          description="Engage one discipline or the whole system. The capabilities below are what you get in the room."
          className="mb-16"
        />

        <RevealGroup className="border-t border-border" stagger={0.08}>
          {services.map((service, i) => (
            <RevealItem key={service.id}>
              <article className="group border-b border-border">
                <Link
                  href={`/services/${service.slug}`}
                  className="grid gap-6 py-10 transition-colors sm:py-12 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-12"
                >
                  <span className="font-mono text-sm text-accent/70 tabular-nums lg:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="lg:pt-1">
                    <h3 className="flex items-start gap-3 font-display text-[1.75rem] leading-tight text-foreground transition-colors group-hover:text-accent-strong sm:text-[2.1rem]">
                      <span>{service.title}</span>
                      <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                    </h3>
                    {service.shortDescription ? (
                      <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    ) : null}
                  </div>

                  {service.capabilities.length > 0 ? (
                    <ul className="flex flex-wrap content-start gap-2 lg:pt-2">
                      {service.capabilities.map((capability) => (
                        <li
                          key={capability.id}
                          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors group-hover:border-accent/30 group-hover:text-foreground"
                        >
                          {capability.title}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Not sure which of these you need? That is usually the first thing we work out
            together —{" "}
            <Link href="/contact" className="text-accent-strong underline underline-offset-4">
              start a conversation
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
