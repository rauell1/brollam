/**
 * Generative artwork for the services carousel.
 *
 * These replace the stock photography the cards used to reach for: the six
 * source files never shipped, so every card was firing a 404 and falling back
 * to a bare colour block. Drawing the motifs as SVG means they always render,
 * cost ~1kb each, scale to any viewport and pick up the accent colour from the
 * active theme.
 *
 * One motif per service, each a visual pun on what the practice actually does.
 */

const MOTIFS = [
  // 01 Brand & Narrative Strategy — concentric rings converging on a position
  <>
    {[132, 104, 76, 48].map((r, i) => (
      <circle
        key={r}
        cx="160"
        cy="150"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={i === 3 ? 1.6 : 0.8}
        strokeOpacity={0.18 + i * 0.14}
        className="origin-center animate-[breathe_7s_ease-in-out_infinite]"
        style={{ animationDelay: `${i * 0.45}s` }}
      />
    ))}
    <circle cx="160" cy="150" r="9" fill="currentColor" />
  </>,

  // 02 Communications & Media (PR) — broadcast arcs radiating from a source
  <>
    {[40, 72, 104, 136].map((r, i) => (
      <path
        key={r}
        d={`M ${60 - 0} ${150 - r} A ${r} ${r} 0 0 1 ${60} ${150 + r}`}
        transform={`translate(0,0)`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity={0.5 - i * 0.09}
        strokeLinecap="round"
        className="animate-[pulse-out_3.6s_ease-out_infinite]"
        style={{ animationDelay: `${i * 0.6}s` }}
      />
    ))}
    <circle cx="60" cy="150" r="7" fill="currentColor" />
  </>,

  // 03 Marketing & Growth Campaigns — ascending trend with volume bars
  <>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const h = 26 + i * 30;
      return (
        <rect
          key={i}
          x={38 + i * 44}
          y={244 - h}
          width="20"
          height={h}
          fill="currentColor"
          fillOpacity={0.14 + i * 0.06}
          className="origin-bottom animate-[grow-up_4.5s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.18}s`, transformBox: "fill-box" }}
        />
      );
    })}
    <path
      d="M 48 218 L 92 200 L 136 170 L 180 152 L 224 116 L 268 74"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="340"
      className="animate-[draw_5s_ease-in-out_infinite]"
    />
  </>,

  // 04 Digital Presence & Technology — perspective wireframe mesh
  <>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line
        key={`h${i}`}
        x1="24"
        y1={72 + i * 26}
        x2="296"
        y2={72 + i * 26}
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity={0.34 - i * 0.03}
      />
    ))}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <line
        key={`v${i}`}
        x1={24 + i * 34}
        y1="72"
        x2={90 + i * 17}
        y2="228"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.22"
      />
    ))}
    <circle
      cx="160"
      cy="150"
      r="5"
      fill="currentColor"
      className="animate-[blink_2.8s_ease-in-out_infinite]"
    />
  </>,

  // 05 Investor & Fundraise Communications — capital network finding a node
  <>
    {[
      [70, 92],
      [232, 78],
      [56, 210],
      [258, 196],
      [160, 150],
      [148, 62],
      [196, 244],
    ].map(([cx, cy], i) => (
      <g key={i}>
        {i < 4 && (
          <line
            x1={cx}
            y1={cy}
            x2="160"
            y2="150"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeOpacity="0.3"
          />
        )}
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
      cx="160"
      cy="150"
      r="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.4"
      className="origin-center animate-[breathe_5s_ease-in-out_infinite]"
    />
  </>,

  // 06 Sales & Partnership Development — two orbits interlocking
  <>
    <ellipse
      cx="118"
      cy="150"
      rx="78"
      ry="78"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeOpacity="0.42"
    />
    <ellipse
      cx="202"
      cy="150"
      rx="78"
      ry="78"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeOpacity="0.42"
    />
    <ellipse
      cx="160"
      cy="150"
      rx="120"
      ry="46"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.22"
      className="origin-center animate-[spin-slow_22s_linear_infinite]"
    />
    <circle cx="160" cy="150" r="8" fill="currentColor" />
    <circle
      cx="118"
      cy="72"
      r="5"
      fill="currentColor"
      fillOpacity="0.7"
      className="animate-[blink_3s_ease-in-out_infinite]"
    />
    <circle
      cx="202"
      cy="228"
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
      <div className="absolute inset-0 opacity-[0.07] texture-dots" />

      <svg
        viewBox="0 0 320 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-accent opacity-[0.55] transition-opacity duration-700 group-hover:opacity-90"
      >
        {motif}
      </svg>

      {/* Bottom scrim keeps the title legible over the artwork */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a] via-[#080c0a]/45 to-transparent" />
    </div>
  );
}
