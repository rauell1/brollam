import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { RichText } from "@/components/site/rich-text";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Brollam Partners collects, uses, and protects personal information.",
  path: "/privacy",
});

const content = `
This Privacy Policy explains what information Brollam Partners ("Brollam", "we", "us") collects through this website, why we collect it, and how it is protected. It applies to visitors of this website and to anyone who contacts us through it.

## Information we collect

When you submit the contact form, we collect the details you choose to give us: your name, company, email address, phone number, project type, budget range, timeline, and the contents of your message.

We also collect standard technical information that keeps the site secure and reliable, such as your IP address, used strictly for security purposes including spam and abuse prevention.

## How we use your information

- To respond to your enquiry and manage our conversation with you
- To prepare proposals and deliver services you ask for
- To protect the website against spam, fraud, and abuse
- To meet legal or regulatory obligations where required

We do not sell your personal information. We do not share it with third parties for their own marketing.

## Legal basis and consent

We process personal information with your consent (when you submit a form) and on the basis of legitimate interest in running and protecting our business. This policy is aligned with the Kenya Data Protection Act, 2019. By using this site you acknowledge the practices described here.

## Data storage and security

Enquiry information is stored in an access controlled database hosted with our cloud infrastructure provider. Access is limited to authorized Brollam team members, protected by authentication, and transmitted over encrypted connections.

## How long we keep information

Enquiry records are kept for as long as needed to manage the relationship and for a reasonable period afterwards for business records. You may ask us to delete your information at any time.

## Your rights

You may request access to the personal information we hold about you, ask for it to be corrected, or ask for it to be deleted. To exercise these rights, contact us using the details below.

## Cookies

This website uses only strictly necessary cookies required for secure operation of the administrative system. It does not use advertising or cross site tracking cookies.

## Changes to this policy

If we change how we handle personal information, we will update this page. The "last updated" date reflects the most recent revision.

## Contact

Privacy questions and requests: ${site.email ?? "use the contact form on this website"}. Brollam Partners, Nairobi, Kenya.
`;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        title="Privacy Policy"
        description="Last updated: August 2026"
      />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <RichText content={content} />
        </Container>
      </section>
    </>
  );
}
