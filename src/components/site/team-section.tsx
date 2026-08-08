import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { teamClosingStatement, teamGroups } from "@/lib/content/sections";
import type { TeamMemberDto } from "@/lib/data/public";
import { initials } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function TeamCard({ member }: { member: TeamMemberDto }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-card">
        {member.image ? (
          <Image
            src={member.image}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="texture-grain absolute inset-0 flex items-center justify-center"
            role="img"
            aria-label={`Portrait of ${member.name} coming soon`}
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 font-display text-4xl text-accent italic sm:h-28 sm:w-28">
              {initials(member.name)}
            </span>
          </div>
        )}
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute right-4 bottom-4 inline-flex h-9 items-center gap-1.5 rounded-sm border border-border-strong bg-background/80 px-3 text-[0.6rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : null}
      </div>
      <h3 className="mt-5 font-display text-2xl text-foreground">{member.name}</h3>
      <p className="mt-1.5 text-[0.7rem] font-semibold tracking-[0.24em] text-accent uppercase">
        {member.role}
      </p>
      {member.biography ? (
        <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">{member.biography}</p>
      ) : null}
      {member.expertise.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${member.name} expertise`}>
          {member.expertise.map((skill) => (
            <li
              key={skill}
              className="rounded-xs border border-border px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function TeamSection({ members }: { members: TeamMemberDto[] }) {
  if (members.length === 0) return null;

  return (
    <section aria-labelledby="team" className="bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="team"
          eyebrow="The Team"
          title={
            <>
              Built By <em className="text-accent italic">Specialists.</em>
            </>
          }
          description="An integrated group spanning design and technology, communications and brand strategy, sales and partnerships, and clean energy engineering."
          className="mb-14"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {members.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.07}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {teamGroups.map((group) => (
              <div key={group.name} className="bg-card px-6 py-7">
                <p className="font-display text-lg text-foreground">{group.name}</p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-muted-foreground">
                  {group.note}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-16 max-w-3xl text-center font-display text-2xl leading-relaxed text-muted-foreground sm:text-[1.7rem]">
            &ldquo;{teamClosingStatement.replace(/\.$/, "")}.&rdquo;
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
