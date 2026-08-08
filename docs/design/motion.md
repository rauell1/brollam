# Motion Language

Motion on this site is editorial punctuation: it guides reading order and adds craft, it never performs tricks. The whole system is implemented with Motion for React, loaded through `LazyMotion` with only the `domAnimation` feature set (`src/components/site/motion.tsx`), so the animation runtime costs the minimum possible JavaScript.

## Vocabulary

| Pattern | Timing | Easing | Used for |
| --- | --- | --- | --- |
| Fade and rise | 0.6s | `easeOut` family, slight custom cubic | Section content entering the viewport (`reveal.tsx`) |
| Staggered children | 0.08s to 0.12s offsets | same | Card grids, service bento, team grid |
| Counter roll | about 1.6s, eased deceleration | `easeOut` | Statistic values counting up once when visible (`counter.tsx`) |
| Header settle | 0.3s | ease out | Header gaining its blurred backdrop after scroll |
| Menu sweep | 0.4s panel, 0.05s item stagger | ease out | Full screen mobile menu (`mobile-menu.tsx`) |
| Marquee | 48s linear loop | linear | Trusted By strip, only when clients exist (`globals.css` keyframes) |
| Scroll cue | 2.2s infinite | ease in out | The small descending dot in the hero |

## Choreography rules

1. **Animate once.** Viewport reveals use `once: true`. Nothing re-triggers when the user scrolls back up; re-reading a page should feel like paper, not a slot machine.
2. **Transform and opacity only.** No layout properties are animated, which keeps every animation on the compositor thread and interaction instant even on low end Android devices.
3. **Delay carries meaning.** Stagger order follows reading order, so motion literally walks the eye down the hierarchy.
4. **No scroll jacking, ever.** Scroll position belongs to the user. Sections never pin, hijack, or spawn horizontal detours as the page scrolls.

## Accessibility gates

- The global `MotionConfig` sets `reducedMotion="user"`, so every Motion powered animation collapses to instant state changes when the OS requests reduced motion.
- Pure CSS loops (marquee, scroll cue) are killed by a `prefers-reduced-motion: reduce` media query in `globals.css` that also flattens scroll behavior and transitions globally.
- The hero video never autoplays sound, loops silently, pauses off screen via `IntersectionObserver`, and respect the data saver and reduced motion preferences by showing the poster instead.

## What was deliberately not built

Page transition wipe screens, cursor followers, magnetic buttons, parallax hero text, and horizontal scroll sections. Each was prototyped against the mobile first constraint and the target audience (busy executives, often on degraded connections) and rejected as friction. The site earns its premium feel from typography, spacing, and restraint rather than motion volume.
