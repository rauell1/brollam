import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Reveal } from "@/components/site/reveal";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { TeamSection } from "@/components/site/team-section";
import { CtaSection } from "@/components/site/cta-section";
import { teamGroups } from "@/lib/content/sections";
import { listActiveTeam, listServices } from "@/lib/data/public";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "About",
  description:
    "Brollam Partners is an integrated team of specialists in Nairobi, Kenya, working across brand strategy, communications, marketing, sales, technology, and clean energy to close the visibility gap for growing businesses.",
  path: "/about",
});

export default async function AboutPage() {
  const [team, services] = await Promise.all([listActiveTeam(), listServices()]);

  return (
    <>
      <PageHero
        eyebrow="About Brollam"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            An Integrated Team For The <em className="text-accent italic">Age Of Attention.</em>
          </>
        }
        description="Brollam Partners is an integrated team of specialists working across brand strategy, communications, marketing, sales, clean energy, technology, and digital product development, headquartered in Nairobi, Kenya."
      />

      {/* The problem we exist for */}
      <section className="py-24 sm:py-28" aria-labelledby="why-we-exist">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <SectionHeader
              id="why-we-exist"
              eyebrow="Why We Exist"
              title={
                <>
                  Great Work Should Not Go <em className="text-accent italic">Unnoticed.</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  Most businesses do not necessarily have a product problem. Many have a visibility
                  problem. Great work can go unnoticed.
                </p>
                <p>
                  Customers, investors, partners, and media gravitate toward businesses they can
                  see, understand, and trust. When the story is unclear or inconsistent, even
                  excellent companies get overlooked.
                </p>
                <p className="text-foreground">
                  Brollam brings strategy, storytelling, technology, marketing, sales,
                  communications, and engineering together instead of treating each as an isolated
                  discipline. One team, one plan, one standard.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Integrated model */}
      <section className="border-y border-border bg-surface/40 py-24 sm:py-28" aria-labelledby="model">
        <Container>
          <SectionHeader
            id="model"
            eyebrow="The Model"
            title={
              <>
                Disciplines That Work As <em className="text-accent italic">One System.</em>
              </>
            }
            description="Visibility compounds when every discipline reinforces the others. Our four practice groups plan together and execute together."
            className="mb-14"
          />
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {teamGroups.map((group, index) => (
              <Reveal key={group.name} delay={index * 0.06} className="bg-card">
                <div className="flex h-full flex-col p-8 sm:p-10">
                  <p className="font-display text-4xl text-foreground/15">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 font-display text-2xl text-foreground">{group.name}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-muted-foreground">
                    {group.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {services.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-14">
                <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                  Capabilities
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-baseline justify-between gap-4 border-b border-border pb-3 text-[0.95rem] text-foreground transition-colors hover:text-accent-strong"
                      >
                        {service.title}
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <ProcessTimeline />

      {/* Nairobi positioning */}
      <section className="relative overflow-hidden border-y border-border" aria-labelledby="nairobi">
        <div className="absolute inset-0">
          <Image
            src="/media/dev/visibility-gap.jpg"
            alt="Abstract artwork standing in for Nairobi photography"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <Container className="relative py-24 sm:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.32em] text-accent uppercase">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Nairobi, Kenya
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="nairobi" className="mt-6 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
                Built In Nairobi. <em className="text-accent italic">Ready For The Region.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We work from one of Africa&apos;s most dynamic business capitals, in the middle of
                the markets, media, technology, and energy transitions we help our clients navigate.
                The perspective is local, the standard is international.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <TeamSection members={team} />
      <CtaSection />
    </>
  );
}
