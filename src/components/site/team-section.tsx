import { Container } from "./container";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { TeamTiltCard } from "./team-tilt-card";
import { teamClosingStatement } from "@/lib/content/sections";
import { listActiveTeam } from "@/lib/data/public";

/**
 * The four practice leads, read from the CMS.
 *
 * This list used to be hardcoded here while the same four people also lived
 * in the team_members table, which is what article bylines render from. The
 * two drifted: the section showed the V2 roles while bylines still showed
 * pre-V2 ones, so a clean-energy piece carried an "Engineering & Technology"
 * credit. Reading from one source removes that failure mode — update a role
 * in the admin and the section and every byline move together.
 */
export async function TeamSection() {
  const team = await listActiveTeam();

  if (team.length === 0) return null;

  return (
    <section id="team" aria-labelledby="team-heading" className="bg-surface py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="team-heading"
          eyebrow="The Team"
          title="The people behind the work."
        />

        <RevealGroup
          className="mt-16 grid gap-x-8 gap-y-12 perspective-[1000px] sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {team.map((member) => (
            <RevealItem key={member.id}>
              <TeamTiltCard
                name={member.name}
                role={member.role}
                bio={member.biography}
                expertise={member.expertise}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.4}>
          <div className="mt-20 max-w-3xl border-t border-border pt-10">
            <p className="font-display text-lg leading-relaxed text-foreground italic">
              {teamClosingStatement}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
