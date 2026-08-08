/**
 * Static narrative content: brand constants that describe how Brollam works.
 * CMS collections live in Neon; this is fixed brand copy.
 */

export const processStages = [
  {
    number: "01",
    name: "Discover",
    description:
      "Business audit and research into where the visibility gap actually is.",
  },
  {
    number: "02",
    name: "Strategy",
    description:
      "Brand positioning, communications planning, commercial strategy, and campaign planning.",
  },
  {
    number: "03",
    name: "Create",
    description:
      "Branding, websites, content, digital products, creative assets, and campaigns built by the team.",
  },
  {
    number: "04",
    name: "Launch",
    description:
      "PR, media buying, digital campaigns, partnerships, events, technical deployments, and on the ground execution where relevant.",
  },
  {
    number: "05",
    name: "Optimise",
    description:
      "Analytics, reporting, learning, and growth recommendations that compound.",
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
  { name: "Design & Technology", note: "Product design, engineering, and digital platforms" },
  { name: "Communications & Brand Strategy", note: "Positioning, media relations, and storytelling" },
  { name: "Sales & Partnerships", note: "Pipeline, key accounts, and go to market execution" },
  { name: "Clean Energy & Engineering", note: "Feasibility, deployment, and technical advisory" },
] as const;

export const trackRecordNote =
  "Figures reflect verified results from individual team members' prior and current roles.";

export const teamClosingStatement =
  "Our strength comes from combining communications, marketing, sales, business strategy, engineering, and software development into one integrated team focused on helping businesses grow.";
