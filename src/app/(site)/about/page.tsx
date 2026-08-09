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
import { listServices } from "@/lib/data/public";
import { pageMetadata, JsonLd, aboutPageJsonLd } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "About",
  description:
    "Brollam Partners is an integrated team of specialists in Nairobi, Kenya, working across brand strategy, communications, marketing, sales, technology, and clean energy to close the visibility gap for growing businesses.",
  path: "/about",
});

export default async function AboutPage() {
  const services = await listServices();

  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <PageHero
        eyebrow="About Brollam Partners"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            A Visibility Platform For <em className="text-accent italic">African Founders.</em>
          </>
        }
        description="Brollam Partners is a brand, communications, marketing, sales, technology and clean-energy platform that gives ambitious African founders the positioning, story and reach to attract funding and reach the right audience — headquartered in Nairobi."
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
                  Africa is home to some of the world&apos;s most promising founders — building in
                  climate, mobility, health and technology. Most of that work never reaches the
                  people who could fund it, back it or buy it.
                </p>
                <p>
                  Less than one percent of global venture capital reaches Africa each year. The
                  barrier is rarely the product. It is almost always visibility — the positioning,
                  story and reach needed to get in front of the right people.
                </p>
                <p className="text-foreground">
                  Brollam exists to close that gap. Brand design, strategic communications, B2B
                  sales and clean-energy engineering under one roof — one accountable group, not a
                  referral network.
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
            eyebrow="The Platform"
            title={
              <>
                Four Disciplines. <em className="text-accent italic">One Integrated Team.</em>
              </>
            }
            description="Each practice is led by a specialist with a decade or more of field experience. They plan together and execute together — so nothing falls between the gaps."
            className="mb-14"
          />
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {teamGroups.map((group, index) => (
              <Reveal key={group.name} delay={index * 0.06} className="bg-card">
                <div className="flex h-full flex-col p-8 sm:p-10">
                  <p className="font-mono text-2xl text-foreground/20">
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
                <p className="font-mono text-[0.65rem] tracking-[0.22em] text-muted-foreground uppercase">
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
              <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-accent uppercase">
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

      <TeamSection />
      <CtaSection />
    </>
  );
}
