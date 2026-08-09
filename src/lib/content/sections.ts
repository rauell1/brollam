/**
 * Static narrative content: brand constants that describe how Brollam works.
 * CMS collections live in Neon; this is fixed brand copy.
 */

export const processStages = [
  {
    number: "01",
    name: "Discover",
    description:
      "Business, audience and investor audit — understanding where you stand and who needs to see you.",
  },
  {
    number: "02",
    name: "Position",
    description:
      "Narrative, brand and messaging built around what makes you fundable and worth backing.",
  },
  {
    number: "03",
    name: "Build",
    description:
      "Websites, content, campaign assets and pitch materials, produced in-house by the team.",
  },
  {
    number: "04",
    name: "Launch",
    description:
      "PR, media outreach, digital campaigns and investor-facing communications that put you in the room.",
  },
  {
    number: "05",
    name: "Sustain",
    description:
      "Reporting and growth recommendations that keep momentum compounding after the first push.",
  },
] as const;

export const visibilityChain = [
  { name: "Brand", note: "A position people understand" },
  { name: "Website", note: "Where attention lands" },
  { name: "Content", note: "Proof of expertise" },
  { name: "Public Relations", note: "Borrowed credibility" },
  { name: "Media", note: "Reach with intent" },
  { name: "Marketing", note: "Consistent presence" },
  { name: "Customers", note: "Attention converted" },
  { name: "Growth", note: "Visibility compounded" },
] as const;

export const ecosystemChannels = [
  "Brand Strategy",
  "Content",
  "Websites",
  "Technology",
  "AI",
  "Public Relations",
  "Media Buying",
  "Influencer Marketing",
  "Digital Marketing",
  "Sales",
  "Analytics",
  "Growth",
] as const;

export const teamGroups = [
  {
    name: "Design & Creative Systems",
    note: "Brand identity, motion design, UI/UX and editorial design — the visual language investors and customers see first.",
  },
  {
    name: "Communications, PR & Brand Strategy",
    note: "Media strategy, storytelling, integrated campaigns and digital growth — turning credibility into coverage.",
  },
  {
    name: "B2B Sales & Market Expansion",
    note: "Enterprise sales, strategic partnerships and key accounts — converting visibility into signed deals.",
  },
  {
    name: "Clean Energy & E-Mobility",
    note: "Solar PV, battery storage, EV-charging infrastructure and feasibility — the technical authority behind the clean-energy story.",
  },
] as const;

export const trackRecordNote =
  "Figures reflect verified results from individual team members' prior and current roles.";

export const teamClosingStatement =
  "Together, this platform combines brand design, strategic communications, B2B sales and clean-energy engineering — one accountable group, not a referral network.";
