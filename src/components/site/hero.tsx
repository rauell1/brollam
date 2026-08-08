import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { HeroVideo } from "./video-hero";

const POSTER = "/media/dev/hero-poster.jpg";

export function Hero() {
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || null;
  const mobileVideoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL || null;

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden" aria-label="Introduction">
      <div className="absolute inset-0">
        <Image
          src={POSTER}
          alt="Abstract cinematic artwork in gold on near black, the Brollam brand canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
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
          <p className="flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.32em] text-accent uppercase">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Brollam Partners, Nairobi
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,8.2vw,6.4rem)] leading-[1.04] text-balance text-foreground">
            <span className="block">Building Brands.</span>
            <span className="block">Creating Visibility.</span>
            <span className="block italic text-accent">Driving Growth.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Brollam Partners helps businesses build brands, tell better stories, and reach the
            audiences that matter through strategy, creative, technology, communications, sales,
            and clean-energy expertise.
          </p>
        </Reveal>
        <Reveal delay={0.42}>
          <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/case-studies"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-border-strong px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              View Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
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
