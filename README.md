# Brollam Partners

**Building Brands. Creating Visibility. Driving Growth.**

The official web platform for Brollam Partners, an integrated strategy, communications, marketing, sales, technology, and clean energy consultancy headquartered in Nairobi, Kenya.

A premium, mobile first, full stack corporate site with a protected content management system, built to be production ready on Vercel and Neon Postgres.

---

## Technology

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS v4, custom design tokens |
| Components | shadcn/ui style primitives on Radix, Lucide icons |
| Motion | Motion for React (LazyMotion, domAnimation only) |
| Database | Neon Postgres (serverless) |
| ORM | Drizzle ORM + Drizzle Kit migrations |
| Validation | Zod (client and server), React Hook Form for the contact form |
| Auth | Session cookies signed with HMAC, scrypt password hashing, proxy guarded `/admin` |
| Fonts | Manrope + Instrument Serif, self hosted via `next/font/local` (SIL OFL) |

---

## Running Modes

The platform boots in one of two modes:

**Database mode** *(production)*: `DATABASE_URL` is set. All content is read from and written to Neon Postgres through the admin CMS.

**Preview mode** *(no database)*: public pages render from the version controlled seed snapshot at `src/lib/db/seed-data.ts`. The admin area shows setup instructions instead of data. Nothing is faked: unconfirmed clients, unpublished case studies, and unverified statistics stay hidden exactly as they would in database mode.

---

## Quick Start

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` immediately in preview mode.

To enable the CMS:

```bash
cp .env.example .env.local
# fill in DATABASE_URL (Neon), AUTH_SECRET, ADMIN_SEED_*

npm run db:migrate   # create tables in Neon
npm run db:seed      # load the six service pillars, team, insights, admin user
```

Sign in at `/admin/login` with the seeded admin account.

---

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | Route type generation + `tsc --noEmit` |
| `npm run db:generate` | Generate SQL migrations from the Drizzle schema |
| `npm run db:migrate` | Apply migrations to the database |
| `npm run db:push` | Push schema directly (prototyping) |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:seed` | Idempotent seed of canonical content |

---

## Architecture

```
src/
  app/
    (site)/            Public website (route group: header, footer, motion)
      page.tsx         Homepage
      about/  services/[slug]  case-studies/[slug]
      insights/[slug]  careers  contact  privacy  terms
    admin/
      login/           Public sign in page
      (dashboard)/     Protected CMS: overview, services, case studies,
                       insights, team, clients, partners, testimonials,
                       careers, statistics, media, enquiries, users
    api surface        Server Actions under src/lib/actions
    robots.ts  sitemap.ts  icon.svg  globals.css
  proxy.ts             Optimistic guard for /admin (Next.js 16 proxy)
  components/
    ui/                shadcn style primitives (button, input, dialog, ...)
    site/              Public components (hero, bento, timeline, forms, ...)
    admin/             CMS shell, tables, forms, editors
  lib/
    db/                Drizzle schema, client, migrations input, seed
    data/              Public + admin queries (Neon, with snapshot fallback)
    actions/           Server Actions (contact, auth, every CMS entity)
    auth/              scrypt hashing, HMAC sessions, guards
    content/           Fixed brand narrative (process, ecosystem, ...)
    validations.ts     Shared Zod schemas
    seo.tsx            Metadata and JSON-LD builders
```

### Data integrity model

- **Services, capabilities, case studies, metrics, insights, team, clients, partners, testimonials, careers, enquiries, statistics, media, users**: Neon Postgres via Drizzle.
- **Statistics** carry a `scope`: `COMPANY` (proof bar, inactive until real) and `TEAM_TRACK_RECORD` (always rendered with the qualification note *"Figures reflect verified results from individual team members' prior and current roles."*).
- Wireframe client names are seeded **inactive** until confirmed.
- Case studies are seeded **unpublished** and clearly labeled as development placeholders.
- No testimonials, biographies, contact details, or numbers are invented anywhere.

### Contact form protection

Honeypot field, server issued fill time timestamp, per IP rate limiting (5 per 10 minutes), Zod validation on both sides, sanitized plain text storage, generic failure messages that never expose internals.

### Admin authorization

Signed, HTTP only session cookie (7 day TTL) checked optimistically by `proxy.ts` and authoritatively by `requireAdmin()` in the dashboard layout and in every server action. Roles: `ADMIN` (can also manage users) and `EDITOR`. The last admin account cannot be deleted. Self deletion is blocked.

---

## Deployment (Vercel + Neon)

1. Create a Neon project, copy the pooled connection string.
2. Import the repository in Vercel.
3. Set environment variables (see `.env.example`): `DATABASE_URL`, `AUTH_SECRET` (`openssl rand -base64 48`), `NEXT_PUBLIC_SITE_URL`, `ADMIN_SEED_*`, and any public contact/social URLs you can verify.
4. Build once, then run `npm run db:migrate && npm run db:seed` with the production `DATABASE_URL` locally or via CI.
5. Add the brand film later by setting `NEXT_PUBLIC_HERO_VIDEO_URL` (and optionally `NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL`). The hero switches from poster to video automatically, respecting data saver and reduced motion.

CMS edits go live immediately: admin mutations call `revalidatePath` so ISR pages (5 minute revalidation) refresh on write.

---

## Design exploration

The design rationale behind the build is documented in [`docs/design/`](docs/design/README.md): the digital neighborhood map, art direction and asset map, typography system, motion language, and the CMS collection model. Each document references the shipped implementation.

## Design system

- Near black `#0B0B0A` canvas, warm gold `#C99A3D` accent, warm white `#F4F1EA` text, muted `#A5A29B` secondary text.
- Fine borders, controlled radii, generous negative space, editorial serif (Instrument Serif) for display moments, Manrope for everything functional.
- Motion is opacity and transform only, once per element, and fully disabled under `prefers-reduced-motion`.
- No invented bright colors, no gradients behind every section, no decorative blobs: photography, typography, and layout carry the design.

### Typography and writing rules

Copy uses standard punctuation only: commas, colons, semicolons, parentheses, and ASCII hyphens. Em dashes and en dashes are prohibited across the entire repository (verified in CI style checks before release).

---

## Accessibility

Semantic HTML with a single h1 per page, skip to content link, keyboard visible focus, Radix accessible dialogs and menu, labeled form controls with error associations, WCAG AA contrast on the dark palette, and full `prefers-reduced-motion` support.

## Performance

Server Components by default, client interactivity only where needed. `next/image` everywhere, priority only on the hero, immutable caching for `/media/*`, video lazy loaded behind capability checks, LazyMotion limiting the animation payload, and cached ISR pages with on write revalidation.

---

## Legal

Fonts (Manrope, Instrument Serif) are distributed under the SIL Open Font License. All artwork under `public/media/dev/` is development placeholder artwork owned by Brollam Partners and should be replaced with real photography and film as assets are produced.
