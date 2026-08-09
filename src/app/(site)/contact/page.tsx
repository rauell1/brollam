import { CalendarClock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/config";
import { listServices } from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with Brollam Partners in Nairobi, Kenya. Tell us about your brand, communications, marketing, technology, or clean energy challenge and we will respond within two working days.",
  path: "/contact",
});

export default async function ContactPage() {
  const services = await listServices();
  const projectTypes = [
    ...services.map((s) => s.title),
    "Multiple Services / Integrated Campaign",
    "Something Else",
  ];

  const channels = [
    site.email
      ? { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` }
      : null,
    site.phone
      ? { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}` }
      : null,
    site.whatsapp
      ? { icon: MessageCircle, label: "WhatsApp", value: "Chat with the team", href: site.whatsapp }
      : null,
    site.bookingUrl
      ? { icon: CalendarClock, label: "Discovery Call", value: "Book a time that suits you", href: site.bookingUrl }
      : null,
    site.mapsUrl
      ? { icon: MapPin, label: "Find Us", value: site.location, href: site.mapsUrl }
      : null,
  ].filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let&apos;s Build Something <br className="hidden sm:block" />
            <em className="text-accent italic">Worth Talking About.</em>
          </>
        }
        description="Tell us where you are and where you want to be seen. The more honest the brief, the better the answer."
      />

      <section className="py-20 sm:py-24" aria-label="Contact options and form">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                  Start A Conversation
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                  We review every enquiry personally and respond within two working days. If your
                  project is urgent, say so in the message.
                </p>
              </Reveal>

              {channels.length > 0 && (
                <Reveal delay={0.1}>
                  <ul className="mt-8 space-y-4">
                    {channels.map((channel) => (
                      <li key={channel.label}>
                        <a
                          href={channel.href!}
                          target={channel.href!.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href!.startsWith("http") ? "noreferrer" : undefined}
                          className="group flex items-center gap-4 rounded-sm border border-border bg-card px-5 py-4 transition-colors hover:border-accent/40"
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border-strong text-accent">
                            <channel.icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                              {channel.label}
                            </span>
                            <span className="mt-0.5 block text-sm font-medium text-foreground transition-colors group-hover:text-accent-strong">
                              {channel.value}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal delay={0.16}>
                <div className="mt-8 rounded-sm border border-border bg-card px-5 py-4">
                  <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    Studio
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{site.location}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Working with clients across the region and beyond.
                  </p>
                </div>
              </Reveal>

              {site.socials.length > 0 && (
                <Reveal delay={0.2}>
                  <div className="mt-8">
                    <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                      Follow
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {site.socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-accent"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-md border border-border bg-card p-6 sm:p-9">
                <h2 className="font-display text-2xl text-foreground">Tell Us About The Project</h2>
                <p className="mt-2 mb-8 text-sm text-muted-foreground">
                  Fields marked * are required.
                </p>
                {/* Timestamp is issued by the server once per render for the form's fill-time spam check. */}
                {/* eslint-disable-next-line react-hooks/purity */}
                <ContactForm projectTypes={projectTypes} startedAt={String(Date.now())} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
