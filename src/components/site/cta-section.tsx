import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/media/dev/cta-background.jpg"
          alt="Abstract cinematic gold artwork"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Container className="relative py-28 text-center sm:py-40">
        <Reveal>
          <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-accent uppercase">
            Ready When You Are
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h2
            id="final-cta"
            className="mx-auto mt-6 max-w-4xl font-display text-[2.4rem] leading-[1.08] text-balance text-foreground sm:text-6xl lg:text-[4.2rem]"
          >
            Let&apos;s Build Something <br className="hidden sm:block" />
            <em className="text-accent italic">Worth Talking About.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Brand strategy, communications, marketing, sales, clean energy, and technology: one
            integrated team brought together for the scope of your project.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row min-[420px]:gap-4">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-accent px-8 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-border-strong px-8 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Talk To Our Team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
