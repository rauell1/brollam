import type { ClientDto, PartnerDto, TestimonialDto } from "@/lib/data/public";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

function WordmarkGrid({
  items,
  labelledBy,
}: {
  items: { id: string; name: string; websiteUrl: string | null }[];
  labelledBy: string;
}) {
  return (
    <ul
      aria-label={labelledBy}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3 lg:grid-cols-4"
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="flex min-h-28 items-center justify-center bg-card px-6 py-8 transition-colors hover:bg-card-raised"
        >
          {item.websiteUrl ? (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="font-display text-xl text-muted-foreground transition-colors hover:text-accent-strong sm:text-2xl"
            >
              {item.name}
            </a>
          ) : (
            <span className="font-display text-xl text-muted-foreground sm:text-2xl">
              {item.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ClientsPartners({
  clients,
  partners,
  testimonials,
}: {
  clients: ClientDto[];
  partners: PartnerDto[];
  testimonials: TestimonialDto[];
}) {
  if (clients.length === 0 && partners.length === 0 && testimonials.length === 0) return null;

  return (
    <section aria-labelledby="trusted" className="bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="trusted"
          eyebrow="Relationships"
          title={
            <>
              Trusted By <em className="text-accent italic">Growing Brands.</em>
            </>
          }
          className="mb-14"
        />

        {clients.length > 0 && (
          <div>
            <Reveal>
              <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                Clients
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <WordmarkGrid items={clients} labelledBy="Client list" />
            </Reveal>
          </div>
        )}

        {partners.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <p className="mb-6 text-[0.68rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                Strategic Partners
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <WordmarkGrid items={partners} labelledBy="Partner list" />
            </Reveal>
            {partners.some((p) => p.category) && (
              <Reveal delay={0.15}>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                  {Array.from(new Set(partners.map((p) => p.category).filter(Boolean))).map(
                    (category) => (
                      <span
                        key={category}
                        className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted-foreground/70 uppercase"
                      >
                        {category}
                      </span>
                    ),
                  )}
                </div>
              </Reveal>
            )}
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 0.08}>
                <figure className="flex h-full flex-col rounded-md border border-border bg-card p-8">
                  <blockquote className="flex-1 font-display text-xl leading-relaxed text-foreground italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 border-t border-border pt-5">
                    <p className="text-sm font-semibold text-foreground">{testimonial.clientName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
