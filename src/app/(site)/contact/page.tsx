import { CalendarClock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/config";
import { listServices } from "@/lib/data/public";
import { JsonLd, breadcrumbJsonLd, pageMetadata, contactPageJsonLd } from "@/lib/seo";

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
      <JsonLd data={contactPageJsonLd()} />
      <PageHero
        eyebrow="Contact"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Your work deserves <br className="hidden sm:block" />
            <em className="text-accent italic">to be seen.</em>
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

              <Reveal delay={0.1}>
                <div className="mt-8 grid gap-4">
                  <div className="rounded-sm border border-border bg-card px-5 py-4">
                    <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Based In</p>
                    <p className="mt-1.5 text-sm font-medium text-foreground">Nairobi, Kenya</p>
                  </div>
                  <div className="rounded-sm border border-border bg-card px-5 py-4">
                    <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Working Across</p>
                    <p className="mt-1.5 text-sm font-medium text-foreground">East & West Africa</p>
                  </div>
                  <div className="rounded-sm border border-border bg-card px-5 py-4">
                    <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Response Time</p>
                    <p className="mt-1.5 text-sm font-medium text-foreground">Within 48 hours</p>
                  </div>
                  <div className="rounded-sm border border-border bg-card px-5 py-4">
                    <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Availability</p>
                    <p className="mt-1.5 text-sm font-medium text-accent">New engagements, next quarter</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-md border border-border bg-card p-6 sm:p-9">
                <h2 className="font-display text-2xl text-foreground">Founder / Corporate Briefing</h2>
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
