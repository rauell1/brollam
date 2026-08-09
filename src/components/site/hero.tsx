import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import dynamic from "next/dynamic";
import { Reveal } from "./reveal";

const HeroVideo = dynamic(() => import("./video-hero").then(mod => mod.HeroVideo));

const POSTER = "/media/dev/hero-poster.jpg";

export function Hero() {
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || null;
  const mobileVideoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL || null;

  return (
    <section className="dark relative flex min-h-[100svh] items-end overflow-hidden" aria-label="Introduction">
      <div className="absolute inset-0">
        <Image
          src={POSTER}
          alt="Abstract cinematic artwork in gold on near black, the Brollam brand canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%] animate-[ken-burns_30s_ease-out_forwards]"
        />
        {videoUrl ? (
          <HeroVideo desktopUrl={videoUrl} mobileUrl={mobileVideoUrl} poster={POSTER} />
        ) : null}
        {/* Contrast overlay: never trade legibility for footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 pt-32 pb-24 sm:pb-28">
        <Reveal delay={0.05}>
          <p className="flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.22em] text-accent uppercase">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            For Startups Building Africa's Future
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,8.2vw,6.4rem)] leading-[1.04] text-balance text-foreground">
            <span className="block">Great work,</span>
            <span className="block italic text-accent">finally seen.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We give ambitious African startups the positioning, story and reach to get in front of the investors, partners and customers who decide what happens next.
          </p>
        </Reveal>
        <Reveal delay={0.42}>
          <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/#what-we-do"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-border-strong px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              See What We Do
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.52}>
          <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 pt-10 border-t border-border-strong/50">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-display font-medium text-foreground">&lt;1%</span>
              <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">Share of global VC that reaches Africa</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-display font-medium text-foreground">Disciplines under one team</span>
              <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">Brand, PR, Sales, Tech & Energy</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-display font-medium text-foreground">Nairobi</span>
              <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">Based here, working continent-wide</span>
            </div>
          </div>
        </Reveal>
      </Container>

      <div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="text-[0.58rem] font-semibold tracking-[0.4em] text-muted-foreground uppercase">
          Scroll
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-border-strong">
          <span className="absolute top-0 left-0 h-2 w-px animate-scroll-dot bg-accent motion-reduce:hidden" />
        </span>
      </div>
    </section>
  );
}
