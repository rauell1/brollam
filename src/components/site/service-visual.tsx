/**
 * Generative artwork for the services carousel.
 *
 * These replace the stock photography the cards used to reach for: the six
 * source files never shipped, so every card was firing a 404 and falling back
 * to a bare colour block. Drawing the motifs as SVG means they always render,
 * cost ~1kb each, scale to any viewport and pick up the accent colour from the
 * active theme.
 *
 * The canvas is 320x427 to match the cards' 3/4 aspect exactly. It used to be
 * 320x300, which `slice` then cropped by ~88 units on each side to cover the
 * taller box, pushing motif 02's source point off the visible area. Keep this
 * viewBox in step with the aspect ratio in services-carousel.tsx.
 *
 * Composition sits in the upper two thirds: the bottom ~150 units fall under
 * the text scrim that keeps the title legible.
 */

const CX = 160;
const CY = 186;

const MOTIFS = [
  // 01 Brand & Narrative Strategy - concentric rings converging on a position
  <>
    {[132, 104, 76, 48].map((r, i) => (
      <circle
        key={r}
        cx={CX}
        cy={CY}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={i === 3 ? 1.6 : 0.8}
        strokeOpacity={0.18 + i * 0.14}
        className="origin-center animate-[breathe_7s_ease-in-out_infinite]"
        style={{ animationDelay: `${i * 0.45}s`, transformOrigin: `${CX}px ${CY}px` }}
      />
    ))}
    <circle cx={CX} cy={CY} r="9" fill="currentColor" />
  </>,

  // 02 Communications & Media (PR) - broadcast arcs radiating from a source
  <>
    {[46, 78, 110, 142].map((r, i) => (
      <path
        key={r}
        d={`M ${CX - 62} ${CY - r} A ${r} ${r} 0 0 1 ${CX - 62} ${CY + r}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeOpacity={0.55 - i * 0.1}
        strokeLinecap="round"
        className="animate-[pulse-out_3.6s_ease-out_infinite]"
        style={{
          animationDelay: `${i * 0.6}s`,
          transformOrigin: `${CX - 62}px ${CY}px`,
        }}
      />
    ))}
    <circle cx={CX - 62} cy={CY} r="8" fill="currentColor" />
  </>,

  // 03 Marketing & Growth Campaigns - ascending trend over volume bars
  <>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const h = 30 + i * 32;
      return (
        <rect
          key={i}
          x={30 + i * 45}
          y={300 - h}
          width="22"
          height={h}
          fill="currentColor"
          fillOpacity={0.13 + i * 0.06}
          className="animate-[grow-up_4.5s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.18}s`, transformOrigin: "50% 100%", transformBox: "fill-box" }}
        />
      );
    })}
    <path
      d="M 41 264 L 86 244 L 131 212 L 176 190 L 221 152 L 266 106"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="330"
      className="animate-[draw_5s_ease-in-out_infinite]"
    />
  </>,

  // 04 Digital Presence & Technology - perspective wireframe mesh
  <>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line
        key={`h${i}`}
        x1="16"
        y1={96 + i * 30}
        x2="304"
        y2={96 + i * 30}
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity={0.36 - i * 0.035}
      />
    ))}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <line
        key={`v${i}`}
        x1={16 + i * 36}
        y1="96"
        x2={88 + i * 18}
        y2="306"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.22"
      />
    ))}
    <circle
      cx={CX}
      cy={CY}
      r="5.5"
      fill="currentColor"
      className="animate-[blink_2.8s_ease-in-out_infinite]"
    />
  </>,

  // 05 Investor & Fundraise Communications - capital network finding a node
  <>
    {(
      [
        [66, 106],
        [250, 96],
        [52, 268],
        [262, 254],
        [CX, CY],
        [146, 62],
        [196, 316],
      ] as const
    ).map(([cx, cy], i) => (
      <g key={i}>
        {i < 4 ? (
          <line
            x1={cx}
            y1={cy}
            x2={CX}
            y2={CY}
            stroke="currentColor"
            strokeWidth="0.9"
            strokeOpacity="0.3"
          />
        ) : null}
        <circle
          cx={cx}
          cy={cy}
          r={i === 4 ? 11 : 5.5}
          fill="currentColor"
          fillOpacity={i === 4 ? 1 : 0.45}
          className="animate-[blink_4s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      </g>
    ))}
    <circle
      cx={CX}
      cy={CY}
      r="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.4"
      className="animate-[breathe_5s_ease-in-out_infinite]"
      style={{ transformOrigin: `${CX}px ${CY}px` }}
    />
  </>,

  // 06 Sales & Partnership Development - two orbits interlocking
  <>
    <circle
      cx={CX - 42}
      cy={CY}
      r="76"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeOpacity="0.42"
    />
    <circle
      cx={CX + 42}
      cy={CY}
      r="76"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeOpacity="0.42"
    />
    <ellipse
      cx={CX}
      cy={CY}
      rx="140"
      ry="52"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.22"
      className="animate-[spin-slow_22s_linear_infinite]"
      style={{ transformOrigin: `${CX}px ${CY}px` }}
    />
    <circle cx={CX} cy={CY} r="8" fill="currentColor" />
    <circle
      cx={CX - 42}
      cy={CY - 76}
      r="5"
      fill="currentColor"
      fillOpacity="0.7"
      className="animate-[blink_3s_ease-in-out_infinite]"
    />
    <circle
      cx={CX + 42}
      cy={CY + 76}
      r="5"
      fill="currentColor"
      fillOpacity="0.7"
      className="animate-[blink_3s_ease-in-out_infinite]"
      style={{ animationDelay: "1.2s" }}
    />
  </>,
];

export function ServiceVisual({ index }: { index: number }) {
  const motif = MOTIFS[index % MOTIFS.length];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Depth wash so the motif sits on a surface rather than a flat fill */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#1a2a24_0%,#0f1a16_55%,#0a0f0d_100%)]" />
      <div className="absolute inset-0 texture-dots opacity-[0.07]" />

      <svg
        viewBox="0 0 320 427"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-accent opacity-60 transition-opacity duration-700 group-hover:opacity-95"
      >
        {motif}
      </svg>

      {/* Bottom scrim keeps the title legible over the artwork */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a] via-[#080c0a]/50 to-transparent" />
    </div>
  );
}
