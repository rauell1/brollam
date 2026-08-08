# Digital Neighborhood Map

The competitive set for Brollam Partners is not other Nairobi consultancies: the site needs to hold its own next to the global brand, communications, and advisory studios whose work Brollam's clients already admire. We studied that neighborhood and mapped which patterns to adopt, which to adapt, and which to refuse.

## Studios studied

**AREA 17 (area17.com)**. Discipline in restraint: enormous confidence in a two typeface system, generous negative space, and case work presented with museum calm. Adopted: single dark canvas with hairline rules separating sections; editorial serif used only where it earns attention. Adapted: their quiet grid became our bento service grid, because Brollam must present six service pillars, not one portfolio stream.

**BASICS (basics.studio) and Locomotive (locomotive.ca)**. Proof that a dark interface can feel warm rather than techy. Adopted: warm off white text (#F4F1EA) on near black (#0B0B0A) instead of pure white on pure black; micro labels in caps with wide tracking to structure long pages. Rejected: heavy scroll jacking and pinned scenes. Beautiful on a demo reel, hostile on a phone, and in conflict with our mobile first constraint.

**Instrument (instrument.com)**. Case study storytelling where the strategy narrative leads and visuals support. Adopted: the Challenge, Strategy, Execution, Results skeleton for case studies (`src/components/site/rich-text.tsx` renders these as structured prose), and the decision that work is described with metrics and context or not at all.

**Global advisory and strategic communications firms (the tier Brollam sells against)**. Clear lesson inverted: they all look identical. Navy, stock photography of handshakes and skylines, meaningless superlatives. Refused entirely: no navy corporate palette, no stock imagery of Nairobi skyline clichés, no invented client walls, no fabricated statistics.

**Delve and similar service design firms**. Their process diagrams influenced the How We Work timeline (`src/components/site/process-timeline.tsx`): stages presented as a disciplined sequence, horizontal on desktop, vertical on mobile, with no decorative chrome.

## Position taken

Brollam occupies the gap the neighborhood leaves open: the strategic seriousness of a global advisory with the craft of a brand studio, rendered in a warm, gold lit dark room. The wordmark is typographic, the imagery is abstract light and geometry rather than stock photography, and every proof element on the page is sourced from verifiable content rather than decorative claims.

## Anti-patterns catalogued and excluded

- Purple or blue gradient meshes and glassmorphism cards: the visual signature of generic AI generated sites.
- Marquee logo walls of famous brands the firm has not worked with: a credibility fabrication studio cliché, explicitly banned by the content integrity rules.
- Autoplaying audio, scroll hijacking, cursor followers: friction masquerading as craft.
- Lorem ipsum placeholders and stock team portraits: dishonest by definition.
