# Typography System

## Typefaces

**Instrument Serif** (display). Used for headlines, pull quotes, and the single italic emphasis word in each major headline. Chosen because it carries editorial authority at large sizes with almost no decorative noise, and its italic is genuinely beautiful rather than an algorithmic slant. Loaded in regular and italic only.

**Manrope** (text and interface). Used for body copy, navigation, labels, forms, tables, and numerals. Chosen for its open apertures at small sizes, clean numerals for statistics, and a neutrality that lets the serif own every dramatic moment.

Both are self hosted as woff2 via `next/font/local` (`src/app/fonts/`, wired in `src/app/layout.tsx`) so there are zero render blocking font requests to third parties, no layout shift beyond a controlled swap, and full offline builds. Both are SIL Open Font License.

## Scale

Fluid, mobile first, defined with `clamp()` style Tailwind sizes at the component level. The contract:

| Role | Mobile (320px base) | Desktop | Face |
| --- | --- | --- | --- |
| Hero headline | `text-5xl` tight | up to `text-8xl` | Instrument Serif regular, with one italic word |
| Section headline | `text-4xl` | `text-5xl` to `text-6xl` | Instrument Serif |
| Card title | `text-xl` | `text-2xl` | Instrument Serif |
| Eyebrow / micro label | `text-xs` uppercase, tracking widest | same | Manrope medium |
| Body | `text-base` (16px), `leading-relaxed` | `text-lg` where measure allows | Manrope |
| Small / caption / legal | `text-sm` and `text-xs` | same | Manrope |
| Statistic value | `text-4xl` | `text-6xl` | Instrument Serif, tabular feel via Manrope labels |

Line length is capped with `max-w-*` measures (roughly 60 to 70 characters for prose, via the `prose-editorial` styles in `src/app/globals.css`), and headlines use `text-balance` so multi line titles break intentionally.

## Pairing rules enforced in components

1. Serif is never used below `text-xl`; small serif text is the fastest route to a cheap look.
2. One italic serif word per headline maximum (`<em class="text-accent italic">`), always the word carrying the emotional payload: "Worth Talking About.", "unnoticed", "real".
3. Uppercase tracking is only ever applied to the eyebrow micro labels, never to body copy or buttons longer than three words.
4. Numerals in statistics are set in the serif to feel monumental; the qualifying label beneath is small Manrope so the figure reads first and the qualification reads immediately after (this layout decision is part of the content integrity system).
5. Fallback stacks are system serif (Georgia) behind Instrument and the system sans stack behind Manrope, so a font loading failure degrades gracefully instead of flashing invisible text.
