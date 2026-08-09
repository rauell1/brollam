import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { TeamTiltCard } from "./team-tilt-card";

const partners = [
  {
    name: "Josef Mafumbo",
    role: "Design & Creative Systems",
    bio: "Brand identity, motion design and brand films, UI/UX, 3D renders, editorial design. 9+ years, 120+ projects shipped.",
  },
  {
    name: "Adala Allan",
    role: "Communications, PR & Brand Strategy",
    bio: "Media strategy, storytelling, integrated campaigns, digital growth, founder profiling. 7+ years; 8,500km+ of expedition PR coverage; BBC, CNN, National Geographic, Bloomberg, The Economist.",
  },
  {
    name: "Brian M. Burudi",
    role: "B2B Sales & Market Expansion",
    bio: "Enterprise sales, market expansion, strategic partnerships, key accounts, agent networks. 5+ years; grew an SME agent network from 18 to 100.",
  },
  {
    name: "Roy Okola Otieno",
    role: "Clean Energy & E-Mobility Systems",
    bio: "Solar PV, battery storage, EV-charging infrastructure, feasibility studies, data & GIS tooling. 25+ active sites monitored; KES 3M+ deployed; KES 50M+ pipeline supported.",
  }
];

export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-heading" className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionHeader
          id="team-heading"
          eyebrow="The Team"
          title="The people behind the work."
        />

        <RevealGroup className="mt-16 grid gap-x-8 gap-y-12 perspective-[1000px] sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {partners.map((partner) => (
            <RevealItem key={partner.name}>
              <TeamTiltCard name={partner.name} role={partner.role} bio={partner.bio} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.4}>
          <div className="mt-20 max-w-3xl border-t border-border pt-10">
            <p className="text-lg leading-relaxed text-foreground font-display italic">
              Together, this platform combines brand design, strategic communications, B2B sales and clean-energy engineering — one accountable group, not a referral network.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
