import type { ReactNode } from "react";
import { Container } from "./container";
import { Eyebrow } from "./section-header";
import { Reveal } from "./reveal";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border texture-grain">
      <Container className="pt-36 pb-16 sm:pt-44 sm:pb-20">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-8" /> : null}
        {eyebrow ? (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl font-display text-[2.5rem] leading-[1.06] text-balance text-foreground sm:text-6xl lg:text-[4.3rem]">
            {title}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.18}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
