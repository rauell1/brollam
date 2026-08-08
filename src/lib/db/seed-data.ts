/**
 * Canonical seed content for the Brollam Partners platform.
 *
 * This module is both the input for `npm run db:seed` and the snapshot
 * that powers preview mode when no DATABASE_URL is connected.
 *
 * Content credibility rules enforced here:
 * - Only source backed facts are seeded as published content.
 * - Client names taken from the concept wireframe are seeded inactive
 *   and must be activated only after confirmation.
 * - Company level statistics are seeded inactive until real numbers exist.
 * - Team achievements are seeded as TEAM_TRACK_RECORD scope and always
 *   displayed with their qualification note.
 * - No testimonials, vacancies, biographies, or contact details are invented.
 */

export interface CapabilitySeed {
  id: string;
  title: string;
  description: string;
  position: number;
}

export interface ServiceSeed {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  featuredImage: string | null;
  featuredVideo: string | null;
  position: number;
  published: boolean;
  capabilities: CapabilitySeed[];
}

export interface TeamSeed {
  id: string;
  name: string;
  slug: string;
  role: string;
  biography: string;
  expertise: string[];
  image: string | null;
  linkedinUrl: string | null;
  email: string | null;
  position: number;
  active: boolean;
}

export interface InsightSeed {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string | null;
  authorId: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string;
}

export interface StatSeed {
  id: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
  scope: "COMPANY" | "TEAM_TRACK_RECORD";
  position: number;
  active: boolean;
}

export interface ClientSeed {
  id: string;
  name: string;
  logo: string | null;
  websiteUrl: string | null;
  position: number;
  active: boolean;
}

export interface CaseStudySeed {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  categories: string[];
  relatedServiceSlugs: string[];
  featuredImage: string | null;
  featuredVideo: string | null;
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
  metrics: { id: string; label: string; value: string; description: string; position: number }[];
}

export interface MediaSeed {
  id: string;
  title: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT";
  url: string;
  altText: string;
  category: string;
}

/* ------------------------------------------------------------------ */
/* The six canonical service pillars                                   */
/* ------------------------------------------------------------------ */

const svc = (n: number) => `5e7e0000-0000-4000-8000-00000000000${n}`;
const cap = (n: number) =>
  `5e7ec000-0000-4000-8000-${String(n).padStart(12, "0")}`;

export const seedServices: ServiceSeed[] = [
  {
    id: svc(1),
    title: "Brand Strategy & Identity",
    slug: "brand-strategy-and-identity",
    shortDescription:
      "Positioning, naming, messaging, and visual systems built for how a company actually wants to grow.",
    fullDescription:
      "A brand is the shortest distance between what a company does and why anyone should care. We work with leadership teams to define positioning, naming, messaging, and identity systems that are honest about today and ambitious about where the business is going.\n\nThe result is not a document that sits in a folder. It is a working system: a clear story, a distinctive visual language, and guidelines your team can actually apply across every channel, from a pitch deck to a billboard to a product interface.",
    icon: "Fingerprint",
    featuredImage: null,
    featuredVideo: null,
    position: 1,
    published: true,
    capabilities: [
      { id: cap(1), title: "Brand strategy", description: "Research, audience definition, competitive framing, and the strategic core every decision hangs from.", position: 1 },
      { id: cap(2), title: "Brand identity", description: "Logo systems, color, typography, and art direction built to be recognized and reused.", position: 2 },
      { id: cap(3), title: "Positioning", description: "A defensible answer to why you, why now, and why it matters to the people you serve.", position: 3 },
      { id: cap(4), title: "Naming", description: "Company, product, and campaign names that are meaningful, ownable, and built to travel.", position: 4 },
      { id: cap(5), title: "Messaging", description: "Message hierarchies, value propositions, and language your whole team can speak with one voice.", position: 5 },
      { id: cap(6), title: "Brand guidelines", description: "Practical standards that keep every output consistent without slowing anyone down.", position: 6 },
      { id: cap(7), title: "Visual systems", description: "Layout, iconography, and image direction that scale from social tiles to investor documents.", position: 7 },
    ],
  },
  {
    id: svc(2),
    title: "Communications & PR",
    slug: "communications-and-pr",
    shortDescription:
      "Media strategy, press relations, and storytelling designed to land coverage in outlets that matter.",
    fullDescription:
      "Visibility in the right places changes how markets, investors, and partners treat a business. We build communications strategies that turn company milestones, expertise, and data into stories journalists actually want to tell.\n\nFrom press releases and press conferences to executive profiling and crisis preparedness, we manage the full communications discipline so your company is understood on its best day and protected on its hardest one.",
    icon: "Megaphone",
    featuredImage: null,
    featuredVideo: null,
    position: 2,
    published: true,
    capabilities: [
      { id: cap(8), title: "Media strategy", description: "Clear decisions about which outlets, journalists, and formats will actually move your reputation.", position: 1 },
      { id: cap(9), title: "Press relations", description: "Ongoing relationships and pitching that make coverage a habit rather than a lucky break.", position: 2 },
      { id: cap(10), title: "Press releases", description: "Announcements written and distributed to earn attention, not just occupy inboxes.", position: 3 },
      { id: cap(11), title: "Press conferences", description: "Briefings planned, staged, and managed so the room works for your story.", position: 4 },
      { id: cap(12), title: "Executive profiling", description: "Positioning founders and leadership as credible voices in the conversations that matter.", position: 5 },
      { id: cap(13), title: "Crisis communications", description: "Preparation and response frameworks for the moments when speed and clarity protect trust.", position: 6 },
      { id: cap(14), title: "Media training", description: "Practical coaching so spokespeople handle interviews with confidence and control.", position: 7 },
      { id: cap(15), title: "Content strategy", description: "Editorial planning that keeps your owned channels feeding the same narrative.", position: 8 },
    ],
  },
  {
    id: svc(3),
    title: "Marketing & Campaigns",
    slug: "marketing-and-campaigns",
    shortDescription:
      "Integrated launches and digital campaigns designed to move brand and business metrics together.",
    fullDescription:
      "Campaigns should compound, not evaporate. We plan and produce integrated marketing that connects creative, media, and measurement into one system, so each launch teaches the next one.\n\nProduction happens in house where it matters: photography, film, drone, motion graphics, podcasting, and AI assisted creative, paired with disciplined media buying and reporting that shows exactly what your spend is doing.",
    icon: "Crosshair",
    featuredImage: null,
    featuredVideo: null,
    position: 3,
    published: true,
    capabilities: [
      { id: cap(16), title: "Digital campaigns", description: "Full funnel campaign planning across search, social, and display with clear objectives per stage.", position: 1 },
      { id: cap(17), title: "Content production", description: "Planned, shot, and edited content engines rather than one off assets.", position: 2 },
      { id: cap(18), title: "Photography", description: "Brand, product, and documentary photography with a consistent visual signature.", position: 3 },
      { id: cap(19), title: "Videography", description: "Brand films, interviews, and campaign video produced for the platforms where they will live.", position: 4 },
      { id: cap(20), title: "Drone production", description: "Licensed aerial filming for scale, context, and cinematic coverage of projects and events.", position: 5 },
      { id: cap(21), title: "Motion graphics", description: "Animation and design in motion for explainers, advertising, and product storytelling.", position: 6 },
      { id: cap(22), title: "Podcast production", description: "Concept, recording, and post production for audio that builds authority over time.", position: 7 },
      { id: cap(23), title: "AI creative", description: "AI assisted image and video workflows that expand creative range with human direction.", position: 8 },
      { id: cap(24), title: "Media buying", description: "Planning and buying across channels with budgets accountable to outcomes.", position: 9 },
      { id: cap(25), title: "Google Ads", description: "Search and YouTube campaigns structured around intent and measured on conversion.", position: 10 },
      { id: cap(26), title: "Meta campaigns", description: "Facebook and Instagram programs built for tested creative and efficient reach.", position: 11 },
      { id: cap(27), title: "Influencer marketing", description: "Creator partnerships selected for audience fit and managed for real deliverables.", position: 12 },
      { id: cap(28), title: "UGC", description: "User generated content programs that give campaigns credibility at volume.", position: 13 },
      { id: cap(29), title: "SEO", description: "Technical and content SEO built into how your site is made, not bolted on after.", position: 14 },
      { id: cap(30), title: "Email marketing", description: "Lifecycle and campaign email that nurtures audiences you actually own.", position: 15 },
      { id: cap(31), title: "Events and brand experiences", description: "Launches, activations, and experiences designed to be attended and shared.", position: 16 },
      { id: cap(32), title: "Analytics and campaign reporting", description: "Dashboards and reviews that turn campaign data into decisions.", position: 17 },
    ],
  },
  {
    id: svc(4),
    title: "Web & Product Development",
    slug: "web-and-product-development",
    shortDescription:
      "Websites, digital products, and the software layer that keeps a brand's digital presence sharp and current.",
    fullDescription:
      "Your website is where every other channel eventually sends people. We design and build fast, accessible, beautifully written digital experiences, from corporate sites and landing pages to full web applications and internal platforms.\n\nThe team works in modern stacks and treats a website as a living product: content managed properly, search handled properly, performance measured properly, and automation added where it saves real hours.",
    icon: "MonitorSmartphone",
    featuredImage: null,
    featuredVideo: null,
    position: 4,
    published: true,
    capabilities: [
      { id: cap(33), title: "Corporate websites", description: "Flagship sites that carry your positioning, your work, and your pipeline with confidence.", position: 1 },
      { id: cap(34), title: "Landing pages", description: "Focused campaign pages designed for one audience and one action.", position: 2 },
      { id: cap(35), title: "Digital platforms", description: "Member areas, portals, and content platforms that serve customers directly.", position: 3 },
      { id: cap(36), title: "Web applications", description: "Custom software built on modern frameworks, from dashboards to workflow tools.", position: 4 },
      { id: cap(37), title: "Product design", description: "Research, flows, and interfaces designed around the people who will use them.", position: 5 },
      { id: cap(38), title: "UX/UI", description: "Interfaces that are clear to use, accessible to everyone, and consistent with your brand.", position: 6 },
      { id: cap(39), title: "SEO implementation", description: "Structured data, metadata, performance, and crawlability engineered into the build.", position: 7 },
      { id: cap(40), title: "CMS platforms", description: "Editorial systems your team can run without calling a developer for every change.", position: 8 },
      { id: cap(41), title: "Software development", description: "APIs, integrations, and the engineering that connects your tools into one operation.", position: 9 },
      { id: cap(42), title: "Automation", description: "Workflows that remove repetitive work between your marketing, sales, and operations tools.", position: 10 },
    ],
  },
  {
    id: svc(5),
    title: "B2B Sales & Partnerships",
    slug: "b2b-sales-and-partnerships",
    shortDescription:
      "Pipeline strategy, key account management, partnership development, and go to market execution that turns visibility into revenue.",
    fullDescription:
      "Visibility only matters if it becomes business. We help companies structure how they sell: the pipeline, the materials, the partnerships, and the discipline that turns attention into signed agreements.\n\nFrom go to market strategy to key account management and strategic partnerships, we work alongside your team inside the market, not just advising from a distance.",
    icon: "Handshake",
    featuredImage: null,
    featuredVideo: null,
    position: 5,
    published: true,
    capabilities: [
      { id: cap(43), title: "Go to market strategy", description: "Segment choices, offers, and channels sequenced for how your buyers actually decide.", position: 1 },
      { id: cap(44), title: "Key account management", description: "Structured care for the relationships that carry the most revenue.", position: 2 },
      { id: cap(45), title: "B2B sales", description: "Prospecting, materials, and process that shorten the distance to a decision.", position: 3 },
      { id: cap(46), title: "Partner acquisition", description: "Identification and outreach that brings the right allies to the table.", position: 4 },
      { id: cap(47), title: "Pipeline strategy", description: "Stages, conversion discipline, and forecasting you can trust.", position: 5 },
      { id: cap(48), title: "Strategic partnerships", description: "Agreements structured for mutual value and managed after the handshake.", position: 6 },
      { id: cap(49), title: "Market development", description: "Entering new regions and segments with evidence before heavy investment.", position: 7 },
    ],
  },
  {
    id: svc(6),
    title: "Clean Energy & E-Mobility Advisory",
    slug: "clean-energy-and-emobility-advisory",
    shortDescription:
      "Feasibility studies, solar and EV charging deployment, and technical strategy supporting the energy transition.",
    fullDescription:
      "The energy transition rewards teams that combine engineering credibility with communication skill. We support clean energy and e-mobility projects from feasibility to deployment: solar systems, EV charging infrastructure, and the technical strategy that underpins them.\n\nBecause the same team handles engineering and communications, technical work is documented, evidenced, and told properly to financiers, partners, regulators, and customers.",
    icon: "Sun",
    featuredImage: null,
    featuredVideo: null,
    position: 6,
    published: true,
    capabilities: [
      { id: cap(50), title: "Solar energy", description: "Assessment, design input, and deployment support for commercial solar projects.", position: 1 },
      { id: cap(51), title: "EV charging", description: "Site selection, charger strategy, and rollout planning for charging networks.", position: 2 },
      { id: cap(52), title: "E-mobility", description: "Fleet transition analysis and program support for electric mobility adoption.", position: 3 },
      { id: cap(53), title: "Energy feasibility", description: "Technical and commercial studies that show whether a project deserves investment.", position: 4 },
      { id: cap(54), title: "Infrastructure deployment", description: "On the ground coordination from procurement support to commissioning.", position: 5 },
      { id: cap(55), title: "Technical advisory", description: "Independent engineering guidance for investors, operators, and public bodies.", position: 6 },
      { id: cap(56), title: "Energy systems strategy", description: "Long range planning that aligns generation, storage, and demand.", position: 7 },
      { id: cap(57), title: "Technical project development", description: "Concept to bankability documentation that financiers can evaluate.", position: 8 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Team (names and domains from the approved company wireframe)        */
/* ------------------------------------------------------------------ */

const tm = (n: number) => `7ea00000-0000-4000-8000-00000000000${n}`;

export const seedTeamMembers: TeamSeed[] = [
  {
    id: tm(1),
    name: "Allan Adala",
    slug: "allan-adala",
    role: "Communications & Brand Strategy",
    biography: "",
    expertise: ["Communications", "Public Relations", "Content Strategy", "Brand Strategy"],
    image: null,
    linkedinUrl: null,
    email: null,
    position: 1,
    active: true,
  },
  {
    id: tm(2),
    name: "Brian Burudi",
    slug: "brian-burudi",
    role: "Marketing & Growth",
    biography: "",
    expertise: ["Marketing", "Growth Strategy", "Campaign Management"],
    image: null,
    linkedinUrl: null,
    email: null,
    position: 2,
    active: true,
  },
  {
    id: tm(3),
    name: "Roy Okola",
    slug: "roy-okola",
    role: "Finance & Business Operations",
    biography: "",
    expertise: ["Finance", "Business Strategy", "Operations"],
    image: null,
    linkedinUrl: null,
    email: null,
    position: 3,
    active: true,
  },
  {
    id: tm(4),
    name: "Joseph Mafumbo",
    slug: "joseph-mafumbo",
    role: "Engineering & Technology",
    biography: "",
    expertise: ["Engineering", "Technology", "Innovation"],
    image: null,
    linkedinUrl: null,
    email: null,
    position: 4,
    active: true,
  },
];

/* ------------------------------------------------------------------ */
/* Insights (original thought leadership written for Brollam)          */
/* ------------------------------------------------------------------ */

const ins = (n: number) => `1a518000-0000-4000-8000-00000000000${n}`;

export const seedInsights: InsightSeed[] = [
  {
    id: ins(1),
    title: "The Visibility Gap: Why Great Businesses Go Unnoticed",
    slug: "the-visibility-gap",
    excerpt:
      "Most growing companies do not have a product problem. They have a visibility problem. Here is what that actually means, and what to do about it.",
    category: "Business",
    featuredImage: "/media/dev/insight-visibility.jpg",
    authorId: tm(1),
    featured: true,
    published: true,
    publishedAt: "2026-07-06T09:00:00.000Z",
    content: `There is a frustrating pattern we see again and again in growing markets. A company builds something genuinely good. The product works, the team is sharp, early customers are happy. And yet the market barely notices. Opportunities drift toward louder competitors with weaker offerings.

The instinct is usually to blame the product. Add features. Lower prices. Rework the service. But in many cases, the product was never the problem. The problem is that the right people simply do not know the company exists, or do not understand it well enough to trust it.

## What the visibility gap really is

The visibility gap is the distance between how good a business is and how well that quality is known, understood, and remembered by the audiences that matter to it. Those audiences are not abstract. They are customers choosing between options, investors deciding where to look next, partners weighing who to align with, and journalists deciding whose story is worth telling.

Each of these groups makes decisions based on what they can see. A company with an unclear story and an inconsistent presence is asking each of them to do research they will never do.

## Familiarity is not vanity

It is tempting to treat visibility as a vanity exercise, something to pursue after the real work is done. That framing is expensive. Familiarity changes buying behavior in measurable ways. Buyers shortlist brands they have heard of. Journalists return to sources who have been useful before. Investors take meetings with companies whose names already carry context.

None of this requires fame. It requires consistent, intentional presence in the places your specific audiences already pay attention to.

## Consistency beats intensity

Many companies approach visibility in bursts. A launch, a press release, a flurry of posts, then silence for a quarter. The pattern reads as noise rather than signal. Audiences build trust through repetition: the same core story, told well, across channels, over time.

This is why visibility should be treated as a system rather than an event. The system has a few moving parts:

- A clear brand position that every piece of communication reinforces
- A website that actually converts attention into understanding
- Content that demonstrates expertise instead of announcing it
- Earned media that borrows the credibility of established outlets
- Sales and partnership activity that turns all of it into revenue

## Closing the gap

Closing a visibility gap starts with an honest audit. Where does your audience actually encounter you today? What do they find? Does the story hold together across your site, your socials, your deck, and the last article that mentioned you?

The businesses that answer these questions honestly, and then work the system with discipline, are the ones that stop being overlooked. Great work deserves an audience. Building that audience is a craft, and it can be learned, planned, and executed like any other part of the business.`,
  },
  {
    id: ins(2),
    title: "Positioning Before Polish: Why Strategy Comes Before Identity",
    slug: "positioning-before-polish",
    excerpt:
      "A beautiful identity built on an unclear position is decoration. The order of operations matters more than most branding projects admit.",
    category: "Branding",
    featuredImage: "/media/dev/insight-brand-strategy.jpg",
    authorId: tm(1),
    featured: false,
    published: true,
    publishedAt: "2026-07-14T09:00:00.000Z",
    content: `Every branding project arrives with energy around the visible things. The logo, the colors, the typography, the launch video. These are the outputs everyone can picture, so they are where the conversation naturally starts.

It is also where expensive mistakes begin.

## Decoration is not differentiation

An identity system answers the question: how do we look and sound? Positioning answers a harder one: why should anyone choose us? When the second question has no rigorous answer, the first becomes a matter of taste. And taste, debated in a boardroom without strategy, produces work that is pleasant, safe, and instantly forgettable.

You have seen the results. Identity systems that could belong to any company in the sector, distinguished only by the name on the cover.

## The questions strategy answers first

Before any designer opens a file, a serious brand process answers a short list of questions in writing:

- Who exactly are we for, and who are we not for?
- What do they currently believe, and what do we need them to believe?
- Which alternatives are they comparing us against, including doing nothing?
- What can we credibly claim that competitors cannot easily copy?
- What proof do we have, and how do we present it?

These questions are uncomfortable because they force trade offs. Saying who you are not for feels like shrinking the market. In practice it does the opposite: clarity is what allows the right customers to recognize themselves in your story.

## Positioning is a decision, not a paragraph

The output of this work is often mistaken for a tagline. It is better understood as a set of binding decisions. A position tells the sales team which deals to chase, the marketing team which stories to tell, and the product team which features deserve investment. When positioning is real, it constrains behavior. That constraint is the value.

A tagline is simply the sentence that survives after the decisions are made.

## Then, and only then, the polish

None of this argues against craft. Once the strategic core is settled, identity work becomes sharper and faster, because every creative choice can be tested against the position. Does this typography feel like the company we decided to be? Does this photography reinforce the claim we are making?

The strongest brands in any market feel inevitable in hindsight. That quality is not luck. It is what happens when polish is applied to a position that was already true. Strategy first, identity second. The order matters.`,
  },
  {
    id: ins(3),
    title: "Campaigns That Compound: Build Growth Systems, Not Spikes",
    slug: "campaigns-that-compound",
    excerpt:
      "One off campaigns create spikes. Systems create growth. The difference is in how you structure creative, media, and measurement from day one.",
    category: "Marketing",
    featuredImage: "/media/dev/insight-campaigns.jpg",
    authorId: tm(2),
    featured: false,
    published: true,
    publishedAt: "2026-07-21T09:00:00.000Z",
    content: `Look at the marketing calendar of most growing companies and you will find a series of spikes. A product launch in March. A promotion in June. An event in October. Each one produces a burst of attention, a brief lift in numbers, and then a return to baseline. The next campaign starts, essentially, from zero.

There is a better pattern available, and it starts with treating marketing as infrastructure rather than theatre.

## The anatomy of a spike

Spike marketing shares a recognizable shape. Creative is produced for a single moment. Media is bought to amplify that moment. Measurement happens afterward, in the form of a report that justifies the spend. Then the assets retire, the audience cools, and the learnings scatter across inboxes.

The costs are hidden but real: every new campaign pays full price for attention the previous one already earned and released.

## What a system looks like

Compounding marketing works differently. Each element is designed to make the next one cheaper and more effective:

- A consistent creative platform, so every asset reinforces the same core idea instead of introducing a new one
- Always on channels that keep presence alive between major moments, at modest cost
- An owned audience (email, community, site traffic) that each campaign adds to rather than rents
- A measurement rhythm that reviews performance weekly and feeds decisions, not just reports

The creative platform point deserves emphasis. Repetition is not a failure of imagination; it is how memory works. Audiences need to encounter an idea many times before it attaches to your name. Changing the idea every quarter resets that clock.

## The role of production

Systems thinking changes what good production means. A single shoot planned well should yield a campaign film, cutdowns for every platform, stills for the site, and material for months of content. The question shifts from "what do we make for this launch" to "what library are we building this quarter."

This is where integrated teams have an edge: when strategy, production, media, and analytics sit together, nothing gets lost between the idea and the learning.

## Measure the slope, not the spike

Spikes feel productive because they are visible. The discipline that matters more is quieter: track the slope. Are branded searches trending up? Is the owned audience growing? Is cost per qualified lead falling quarter over quarter? Is the sales team hearing your messages repeated back in meetings?

When those lines move the right way, the spikes take care of themselves, and each one lands higher than the last. That is the difference between buying attention and building an asset.`,
  },
  {
    id: ins(4),
    title: "The Energy Transition Is Also A Communications Challenge",
    slug: "energy-transition-communications-challenge",
    excerpt:
      "Clean energy and e-mobility projects succeed on engineering, and stall on trust. Evidence led storytelling is now part of the technical work.",
    category: "Clean Energy",
    featuredImage: "/media/dev/insight-clean-energy.jpg",
    authorId: tm(4),
    featured: false,
    published: true,
    publishedAt: "2026-07-28T09:00:00.000Z",
    content: `Ask what holds back clean energy and e-mobility adoption and the usual answers come quickly: cost, infrastructure, policy. All real. But spend time inside actual projects and a quieter constraint appears. Decision makers do not yet trust what they are being asked to adopt.

A fleet manager weighing electric vehicles is not only comparing specifications. They are pricing risk: Will the vehicles perform on our routes? Will charging be there when we need it? What happens when something breaks? A financier reviewing a solar project runs the same calculation at a larger scale.

These are engineering questions, but they are answered, or left unanswered, through communication.

## Trust is built from evidence

The good news is that clean technology generates exactly the kind of evidence that builds trust, if someone bothers to capture it. Uptime figures from operating sites. Cost per kilometre comparisons against diesel. Charging session data. Load profiles and payback curves from installed systems.

Every deployed project is a proof point waiting to be documented. Yet in practice, this evidence is often locked in spreadsheets and commissioning reports, invisible to the market the technology needs to win over.

The teams that lead this transition treat documentation as part of deployment. Photograph the installation. Film the commissioning. Publish the performance data. Make the operator available to tell the story in their own words.

## The audience is wider than you think

Energy projects rarely have one audience. A single EV charging deployment may need to convince a site host, a utility, a county government, a financing partner, and the drivers who will actually plug in. Each audience has a different concern and a different vocabulary.

This is where technical teams often struggle. The same feasibility detail that reassures an investor means nothing to a driver comparing charge times in a parking lot. Communicating across these audiences is not simplification; it is translation, and it is a discipline of its own.

## What this means for project developers

The practical implication is straightforward: budget for storytelling the way you budget for engineering. Not as decoration after the project, but as a workstream inside it.

Commission feasibility studies that are written to be read by decision makers, not only by engineers. Turn deployments into documented case studies with real metrics. Give your technical leads media training so their expertise survives contact with an interview. Build the channels (site, reports, film) that let your evidence travel.

The energy transition will be built by engineers. It will be believed, funded, and adopted through communication. The projects that understand this move faster, attract capital more easily, and set the reference points everyone else gets compared against.`,
  },
];

/* ------------------------------------------------------------------ */
/* Site statistics                                                     */
/* ------------------------------------------------------------------ */

const st = (n: number) => `57a70000-0000-4000-8000-00000000000${n}`;

/**
 * Verified results from individual team members' prior and current roles.
 * Always rendered with the qualification note in the UI.
 */
export const seedStatistics: StatSeed[] = [
  {
    id: st(1),
    label: "Global media outlets secured",
    value: "5",
    suffix: "",
    description: "Coverage earned across outlets including BBC, CNN, National Geographic, Bloomberg, and The Economist.",
    scope: "TEAM_TRACK_RECORD",
    position: 1,
    active: true,
  },
  {
    id: st(2),
    label: "Fleet uptime maintained",
    value: "94",
    suffix: "%",
    description: "Availability maintained across managed clean energy and EV charging sites.",
    scope: "TEAM_TRACK_RECORD",
    position: 2,
    active: true,
  },
  {
    id: st(3),
    label: "Investment pipeline supported",
    value: "KES 50M",
    suffix: "+",
    description: "Capital pipeline supported through engineering and feasibility work.",
    scope: "TEAM_TRACK_RECORD",
    position: 3,
    active: true,
  },
  {
    id: st(4),
    label: "SME agent network scaled",
    value: "18 to 100",
    suffix: "",
    description: "Agent network grown across three locations.",
    scope: "TEAM_TRACK_RECORD",
    position: 4,
    active: true,
  },
  /* Company level counters: intentionally inactive until confirmed. */
  { id: st(5), label: "Projects Delivered", value: "0", suffix: "", description: "", scope: "COMPANY", position: 1, active: false },
  { id: st(6), label: "Brands Supported", value: "0", suffix: "", description: "", scope: "COMPANY", position: 2, active: false },
  { id: st(7), label: "Campaigns Executed", value: "0", suffix: "", description: "", scope: "COMPANY", position: 3, active: false },
  { id: st(8), label: "Industries Served", value: "0", suffix: "", description: "", scope: "COMPANY", position: 4, active: false },
];

/* ------------------------------------------------------------------ */
/* Clients (named in the concept wireframe, inactive until confirmed)  */
/* ------------------------------------------------------------------ */

export const seedClients: ClientSeed[] = [
  { id: "c11e0000-0000-4000-8000-000000000001", name: "Roam", logo: null, websiteUrl: null, position: 1, active: false },
  { id: "c11e0000-0000-4000-8000-000000000002", name: "ECOCAN", logo: null, websiteUrl: null, position: 2, active: false },
  { id: "c11e0000-0000-4000-8000-000000000003", name: "Pepsi", logo: null, websiteUrl: null, position: 3, active: false },
];

/* ------------------------------------------------------------------ */
/* Case studies (development placeholder only, never published)        */
/* ------------------------------------------------------------------ */

export const seedCaseStudies: CaseStudySeed[] = [
  {
    id: "ca5e0000-0000-4000-8000-000000000001",
    title: "Development Placeholder: Integrated Brand Launch",
    slug: "dev-placeholder-brand-launch",
    clientName: "Placeholder Client",
    industry: "To be confirmed",
    summary:
      "DEVELOPMENT PLACEHOLDER. Replace every field with verified client work before publishing. This record exists so the CMS and page templates can be reviewed with realistic content.",
    challenge:
      "Placeholder text. Describe the client situation, the visibility gap, and the commercial context here before publishing.",
    strategy:
      "Placeholder text. Describe the strategic approach across brand, communications, digital, and commercial work here before publishing.",
    execution:
      "Placeholder text. Describe what was produced and deployed, with real photography, film, and platform links here before publishing.",
    results:
      "Placeholder text. Publish only verified outcomes with the client approved numbers here.",
    categories: ["Branding", "Websites"],
    relatedServiceSlugs: ["brand-strategy-and-identity", "web-and-product-development"],
    featuredImage: "/media/dev/case-placeholder.jpg",
    featuredVideo: null,
    published: false,
    featured: false,
    publishedAt: null,
    metrics: [
      { id: "ca5ef000-0000-4000-8000-000000000001", label: "Placeholder metric", value: "00", description: "Replace with a verified result.", position: 1 },
      { id: "ca5ef000-0000-4000-8000-000000000002", label: "Placeholder metric", value: "00", description: "Replace with a verified result.", position: 2 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Media library (development artwork, clearly labeled)                */
/* ------------------------------------------------------------------ */

export const seedMediaItems: MediaSeed[] = [
  { id: "aed1a000-0000-4000-8000-000000000001", title: "Hero poster frame", type: "IMAGE", url: "/media/dev/hero-poster.jpg", altText: "Abstract cinematic gold on black artwork, development placeholder for the Brollam brand film.", category: "Brand" },
  { id: "aed1a000-0000-4000-8000-000000000002", title: "Visibility editorial artwork", type: "IMAGE", url: "/media/dev/visibility-gap.jpg", altText: "Abstract editorial artwork, development placeholder.", category: "Editorial" },
  { id: "aed1a000-0000-4000-8000-000000000003", title: "Closing section artwork", type: "IMAGE", url: "/media/dev/cta-background.jpg", altText: "Abstract cinematic artwork, development placeholder.", category: "Brand" },
  { id: "aed1a000-0000-4000-8000-000000000004", title: "Insight artwork: visibility", type: "IMAGE", url: "/media/dev/insight-visibility.jpg", altText: "Abstract editorial artwork, development placeholder.", category: "Editorial" },
  { id: "aed1a000-0000-4000-8000-000000000005", title: "Insight artwork: brand strategy", type: "IMAGE", url: "/media/dev/insight-brand-strategy.jpg", altText: "Abstract editorial artwork, development placeholder.", category: "Editorial" },
  { id: "aed1a000-0000-4000-8000-000000000006", title: "Insight artwork: campaigns", type: "IMAGE", url: "/media/dev/insight-campaigns.jpg", altText: "Abstract editorial artwork, development placeholder.", category: "Editorial" },
  { id: "aed1a000-0000-4000-8000-000000000007", title: "Insight artwork: clean energy", type: "IMAGE", url: "/media/dev/insight-clean-energy.jpg", altText: "Abstract editorial artwork, development placeholder.", category: "Editorial" },
  { id: "aed1a000-0000-4000-8000-000000000008", title: "Case study placeholder artwork", type: "IMAGE", url: "/media/dev/case-placeholder.jpg", altText: "Abstract development placeholder artwork. Not client work.", category: "Placeholder" },
];
