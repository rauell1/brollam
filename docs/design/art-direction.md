# Art Direction and Asset Map

## Moodboard rationale

Three mood directions were explored before the build. The shipped direction takes the strongest qualities of each:

1. **Signal in the dark.** A near black canvas lit by a single disciplined gold source: light trails, wavelengths, a focal point. This became the hero and campaign visual language. It reads as energy, transmission, and visibility without depicting any literal object, and it cannot be confused for stock photography.
2. **Editorial geometry.** Fine concentric lines, radar like ripples, chain and network diagrams. This became the language of the Visibility Gap section, the insight covers, and the service card motifs (each pillar card carries a small CSS drawn emblem rather than a generic icon alone).
3. **Quiet luxury print.** Cream paper tones translated into a dark idiom: warm white text, hairline rules, restrained radii (2 to 4px on interactive elements), and a serif italic for exactly one emphasis per headline.

Directions rejected after the moodboard pass: literal African pattern motifs (decorative tokenism, not brand strategy), photography led layouts (no approved photography exists yet), and neon tech palettes (violates the warm, editorial tone).

## Visual language rules

- **Canvas**: near black `#0B0B0A`. Surfaces lift to `#151515` and `#1B1B1B`, never with shadows as the primary separator; hairline borders (`#292927`) do the structural work.
- **Light**: one accent, gold `#C99A3D`, brightened to `#DCB25E` for hover and emphasis. It appears on interactive elements, one italic word per major headline, and inside artwork. It never floods large fills.
- **Imagery**: abstract gold on black compositions exclusively until commissioned photography replaces them. Images are cropped wide, treated with a dark scrim where text sits on top, and always served through `next/image`.
- **Iconography**: Lucide outline icons at 1.5px stroke, used sparingly, always paired with a label.

## Asset map

All current artwork lives in `public/media/dev/`, served with immutable cache headers (see `next.config.ts`). Each piece is an original abstract composition in the gold on black language.

| Asset | Used by | Role | Alt text contract |
| --- | --- | --- | --- |
| `hero-poster.jpg` | Homepage hero (`video-hero.tsx`) | Poster frame and static fallback for the brand film: sweeping gold light trails across black | "Golden light trails sweeping across a black background" |
| `og-image.jpg` | Default Open Graph image (`seo.tsx`) | Social sharing card background, diagonal gold streaks | Described in metadata, not rendered inline |
| `visibility-gap.jpg` | Homepage Visibility Gap section | Illustration of the unnoticed business problem | "Abstract concentric gold circles fading into darkness" |
| `cta-background.jpg` | Final CTA section (`cta-section.tsx`) | Low contrast warmth behind the closing headline | Decorative, hidden from assistive tech |
| `insight-visibility.jpg` | Article: The Visibility Gap | Cover: concentric gold ripples converging to one bright point | "Gold concentric circles converging on a single bright point" |
| `insight-brand-strategy.jpg` | Article: Positioning Before Polish | Cover art for brand strategy insight | "Intersecting gold lines forming a focal structure on black" |
| `insight-campaigns.jpg` | Article: Campaigns That Compound | Cover art for campaigns insight | "Layered gold arcs suggesting compounding growth on black" |
| `insight-clean-energy.jpg` | Article: Energy transition insight | Cover art for clean energy insight | "Gold current lines flowing like a circuit across black" |
| `case-placeholder.jpg` | Reserved for the unpublished case study draft in the CMS | Never visible publicly until a real case study is published | Set in the CMS media library record |

## Media pipeline going forward

The hero is video ready: `NEXT_PUBLIC_HERO_VIDEO_URL` (and an optional mobile cut under 768px) switch the hero from poster to muted, looping film without code changes (`src/components/site/video-hero.tsx`), and the poster always paints first so there is no layout shift. Client logos, team portraits, and case imagery enter only through the CMS media library, which requires alt text at the field level. Nothing renders without it.
