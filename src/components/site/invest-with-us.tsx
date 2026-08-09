import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";

export function InvestWithUs() {
  return (
    <section id="invest" aria-labelledby="invest-heading" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="invest-heading"
          eyebrow="Invest With Us"
          title="Two ways to work with us."
        />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2" stagger={0.15}>
          {/* Panel 1: Founders */}
          <RevealItem>
            <div className="flex h-full flex-col justify-between rounded-xl bg-card p-10 sm:p-14 border border-border">
              <div>
                <h4 className="text-[0.65rem] font-bold tracking-[0.2em] text-accent uppercase">For Founders</h4>
                <h3 className="mt-6 font-display text-3xl text-foreground">Build your visibility.</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Get the positioning, story and reach you need to attract the right funding and customers.
                </p>
              </div>
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-foreground px-6 text-xs font-semibold tracking-wide text-background transition-transform hover:scale-[1.02]"
                >
                  Start a Conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </RevealItem>

          {/* Panel 2: Investors & Partners */}
          <RevealItem>
            <div className="flex h-full flex-col justify-between rounded-xl bg-surface p-10 sm:p-14 border border-border">
              <div>
                <h4 className="text-[0.65rem] font-bold tracking-[0.2em] text-accent uppercase">For Investors & Partners</h4>
                <h3 className="mt-6 font-display text-3xl text-foreground">Co-invest in visibility.</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Partner with us on investor-readiness programmes, media partnerships and ecosystem sponsorships.
                </p>
              </div>
              <div className="mt-12">
                <Link
                  href="/contact?type=partner"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-border-strong px-6 text-xs font-semibold tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Partner With Us
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
