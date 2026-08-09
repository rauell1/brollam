import Image from "next/image";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function CommitmentParallax() {
  return (
    <section aria-label="Our Commitment" className="dark relative flex min-h-[70vh] items-center overflow-hidden py-32">
      <div className="absolute inset-0">
        <Image
          src="/media/dev/commitment-bg.jpg"
          alt="Parallax background"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          style={{ transform: "translateZ(-1px) scale(2)" }} // For CSS-based parallax if parent is perspective, but since it's just visual, we'll keep it simple
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-foreground">
            The next wave of African founders won&apos;t lose to a bad product. <br />
            <em className="text-accent italic">They&apos;ll lose to bad visibility.</em>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
