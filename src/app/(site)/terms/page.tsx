import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { RichText } from "@/components/site/rich-text";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms governing the use of the Brollam Partners website.",
  path: "/terms",
});

const content = `
These Terms and Conditions govern your use of the Brollam Partners website. By using this website you accept these terms. If you do not agree with them, please do not use the site.

## About this website

This website presents Brollam Partners ("Brollam", "we", "us"), our services, insights, and ways to contact us. Content on this site is general information, not professional advice, and does not create a client relationship.

## Intellectual property

Unless stated otherwise, all content on this website, including text, design, imagery, artwork, and logos, belongs to Brollam Partners or is used with permission. You may not reproduce, republish, or redistribute site content for commercial purposes without our written consent.

## Acceptable use

You agree not to misuse this website, including by:

- Attempting to gain unauthorized access to the site, its admin systems, or its infrastructure
- Interfering with the availability or security of the site
- Submitting false, misleading, or unlawful material through our forms
- Using the site in any way that breaches applicable law

## Enquiries and Data Collection

Information you send through our contact form, as well as data collected via cookies and analytics tools, is handled according to our Privacy Policy. Submitting an enquiry does not oblige either party to enter into a contract. Any engagement with Brollam is governed by its own written agreement.

## Accuracy of content

We work to keep the information on this site accurate and current, and we correct it when we learn it is wrong. Statistics presented on this site are described with the context in which they were achieved. Case studies and testimonials are published only with client knowledge.

## Third party links

Where this site links to external websites, we are not responsible for their content or their privacy practices. Following those links is at your own discretion.

## Limitation of liability

To the maximum extent permitted by law, Brollam Partners is not liable for any indirect or consequential loss arising from the use of, or inability to use, this website or reliance on its content.

## Governing law

These terms are governed by the laws of Kenya. Any disputes arising from the use of this website fall under the jurisdiction of the Kenyan courts.

## Changes

We may update these terms from time to time. The "last updated" date shows the latest revision, and continued use of the site after changes means you accept the updated terms.

## Contact

Questions about these terms: ${site.email ?? "use the contact form on this website"}. Brollam Partners, Nairobi, Kenya.
`;

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
        title="Terms & Conditions"
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
