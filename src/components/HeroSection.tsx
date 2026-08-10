import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-display font-bold tracking-tight text-foreground sm:text-7xl">
            Elevate Your <span className="text-accent italic">Digital</span> Experience
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We build performant, beautiful, and accessible web applications that drive real business results and leave a lasting impression.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all hover:scale-105 active:scale-95"
            >
              Get Started Today
            </Link>
            <Link href="/case-studies" className="text-sm font-semibold leading-6 text-foreground hover:text-accent transition-colors">
              View our work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
