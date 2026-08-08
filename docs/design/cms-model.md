# CMS Collection Model

Every public page is assembled from CMS collections. Route components contain no body copy: they query the data layer (`src/lib/data/public.ts`), which reads from Neon Postgres through Drizzle when `DATABASE_URL` is present, and falls back to the versioned seed snapshot (`src/lib/db/seed-data.ts`) when it is not. The schema lives in `src/lib/db/schema.ts` with migrations in `drizzle/`.

## Collections

| Collection | Purpose | Key fields | Lifecycle states |
| --- | --- | --- | --- |
| `users` | CMS accounts | name, email, passwordHash, role | role: ADMIN or EDITOR |
| `services` + `service_capabilities` | The six pillars and their capability lists | title, slug, descriptions, position, published | draft (unpublished) or published |
| `case_studies` + `case_study_metrics` | Client work with structured Challenge, Strategy, Execution, Results narrative | slug, clientName, industry, categories, relatedServiceSlugs, featured | unpublished, published, featured |
| `insights` | Thought leadership articles | title, slug, excerpt, content, category, authorId, featuredImage, publishedAt | unpublished or published, feature flag |
| `team_members` | Leadership profiles | name, role, biography, expertise[], image, linkedinUrl | active or hidden |
| `clients` | Client names and logos | name, logo, websiteUrl, position | active or hidden |
| `partners` | Ecosystem partners, with category (such as PR partner network) | as clients, plus category | active or hidden |
| `testimonials` | Client quotes, only with documented approval | quote, clientName, company, role, consent fields | unpublished or published, feature flag |
| `careers` | Open roles | title, location, employmentType, description, closesAt | draft, open, closed |
| `enquiries` | Contact form submissions, the sales pipeline | identity fields, projectType, budgetRange, timeline, message, status, internalNote | NEW, CONTACTED, QUALIFIED, PROPOSAL, WON, LOST, ARCHIVED |
| `site_statistics` | Proof figures | label, value, suffix, description, scope, position | active or hidden |
| `media_items` | Media library with mandatory alt text | title, type, url, altText, category | typed IMAGE, VIDEO, DOCUMENT |

## Integrity rules encoded in the model

These rules are the reason the schema is shaped the way it is:

1. **Statistics carry a scope.** `site_statistics.scope` is either `COMPANY` or `TEAM_TRACK_RECORD`. Team track record figures render with their qualification note ("Figures reflect verified results from individual team members' prior and current roles") wherever they appear (`track-record.tsx`). Company level stats are seeded inactive; the Proof Bar on the homepage simply does not render until a real company statistic exists and is activated by an editor.
2. **Clients and partners default to hidden.** Names that appeared in concept material are seeded inactive and only appear in the Trusted By strip or the ecosystem section after an administrator deliberately activates them, which is the point where approval has been confirmed.
3. **Nothing fabricated has a field to live in.** There is no awards collection, no fake year founded field, no placeholder testimonial. If a fact cannot be sourced, the design simply has no home for it.
4. **Case studies publish whole.** A case study without its Challenge, Strategy, Execution, Results structure cannot be featured; the admin UI requires the editorial structure before the publish toggle is meaningful, and the homepage hero slot only considers published, featured entries.
5. **Enquiries are a pipeline, not an inbox.** Statuses mirror the firm's actual sales discipline, so the CMS doubles as a lightweight CRM the team can operate from day one.

## Editorial workflow

Editors (role EDITOR) manage content collections: services, case studies, insights, team, clients, partners, testimonials, careers, statistics, media, and the enquiry pipeline. Administrators (role ADMIN) additionally manage user accounts. Destructive actions are confirm gated; publishing, featuring, toggling, and reordering are one click actions from list views, with every mutation revalidating the affected public pages immediately.
