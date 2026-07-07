import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// A neuron "icon": an animated pyramidal-neuron glyph that sketches itself in,
// ringed by the three headline figures. Every number here matches /citations
// (Azevedo 2009 neuron counts; standard synapse densities; the ~2M km wiring
// estimate derived in full on the citations page).

const MOUSE = "#7ee0ff"; // cyan — the mouse brain
const HUMAN = "#b78bff"; // violet — the human brain

// Headline figures. Mouse synapses shown at ~250B, the midpoint of the cited
// ~200–300 billion range, to keep the three cards parallel.
const STATS: { label: string; human: string; mouse: string }[] = [
  { label: "Neurons", human: "86 billion", mouse: "70 million" },
  { label: "Synapses", human: "100 trillion", mouse: "~250 billion" },
  { label: "Wiring", human: "~2 million km", mouse: "~2,000 km" },
];

// A Layer-5 pyramidal neuron, all curved strokes so the branches read as
// organic dendrites (and so no perfectly-straight path gets culled by the
// drop-shadow filter, which is what dropped the apical trunk before).
//   TRUNK  — the apical dendrite, soma → cortical surface
//   TUFT   — the apical tuft fanning out at the top
//   OBLIQUE— oblique dendrites branching off the trunk
//   BASAL  — basal dendrites spreading from the soma base
//   AXON   — thinner, drops below the basals and branches into a terminal arbor
const TRUNK = "M100 165 C 97 138, 103 96, 100 54";
const TUFT = [
  "M100 56 C 90 45, 84 39, 78 27",
  "M100 56 C 110 45, 116 39, 122 27",
  "M100 58 C 96 44, 92 35, 90 24",
  "M100 58 C 104 44, 108 35, 110 24",
];
const OBLIQUE = [
  "M100 94 C 90 90, 82 86, 73 80",
  "M100 94 C 110 90, 118 86, 127 80",
  "M100 126 C 91 124, 84 120, 76 114",
  "M100 126 C 109 124, 116 120, 124 114",
];
const BASAL = [
  "M94 190 C 82 198, 74 206, 66 214",
  "M106 190 C 118 198, 126 206, 134 214",
  "M97 193 C 92 204, 89 214, 86 224",
  "M103 193 C 108 204, 111 214, 114 224",
  "M90 187 C 77 191, 67 193, 57 197",
  "M110 187 C 123 191, 133 193, 143 197",
];
const AXON = "M100 193 C 101 214, 99 232, 100 250";
const AXON_TERM = [
  "M100 248 C 96 256, 90 260, 84 268",
  "M100 248 C 104 256, 110 260, 116 268",
  "M100 250 C 100 258, 99 263, 98 270",
];
const BOUTONS: [number, number][] = [[84, 268], [116, 268], [98, 270]];
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // expo-out — branches grow, then settle

function Glyph({ run }: { run: boolean }) {
  const stroke = (d: string, delay: number, opacity = 0.95, dur = 1) => (
    <motion.path
      key={d}
      d={d}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={run ? { pathLength: 1, opacity } : {}}
      transition={{ duration: dur, delay, ease: EASE }}
    />
  );

  return (
    <svg viewBox="0 0 200 280" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="neuronIconStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HUMAN} />
          <stop offset="100%" stopColor={MOUSE} />
        </linearGradient>
        <radialGradient id="neuronIconSoma" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor={HUMAN} />
          <stop offset="100%" stopColor={MOUSE} />
        </radialGradient>
      </defs>

      {/* Apical dendrite: trunk first, then the tuft and obliques branch off it. */}
      <g
        fill="none"
        stroke="url(#neuronIconStroke)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 5px rgba(150,170,255,0.55))" }}
      >
        {stroke(TRUNK, 0.15, 0.98, 1.2)}
        {OBLIQUE.map((d, i) => stroke(d, 0.7 + i * 0.12, 0.9))}
        {TUFT.map((d, i) => stroke(d, 1.0 + i * 0.1, 0.95))}
      </g>

      {/* Basal dendrites. */}
      <g
        fill="none"
        stroke="url(#neuronIconStroke)"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 5px rgba(150,170,255,0.55))" }}
      >
        {BASAL.map((d, i) => stroke(d, 0.5 + i * 0.1, 0.9))}
      </g>

      {/* Axon — thinner, drops past the basals and breaks into a terminal arbor. */}
      <g
        fill="none"
        stroke="url(#neuronIconStroke)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 4px rgba(126,224,255,0.5))" }}
      >
        {stroke(AXON, 1.2, 0.85, 1)}
        {AXON_TERM.map((d, i) => stroke(d, 1.75 + i * 0.1, 0.78, 0.7))}
      </g>
      {BOUTONS.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="2"
          fill="url(#neuronIconStroke)"
          initial={{ scale: 0, opacity: 0 }}
          animate={run ? { scale: 1, opacity: 0.9 } : {}}
          transition={{ duration: 0.4, delay: 2.05 + i * 0.08, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Soma — pyramidal teardrop, apex up, gentle grow-in. */}
      <motion.path
        d="M100 160 C 111 173, 114 187, 100 196 C 86 187, 89 173, 100 160 Z"
        fill="url(#neuronIconSoma)"
        initial={{ scale: 0, opacity: 0 }}
        animate={run ? { scale: [0, 1.12, 1], opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        style={{ transformOrigin: "100px 180px", filter: "drop-shadow(0 0 8px rgba(183,139,255,0.85))" }}
      />
    </svg>
  );
}

export default function NeuronIcon({ run }: { run: boolean }) {
  return (
    <div className="rounded-2xl glass p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
      {/* The glyph, with a soft halo behind it. */}
      <div className="relative shrink-0" style={{ width: 150, height: 210 }}>
        <div
          className="absolute inset-0 rounded-full opacity-25 blur-[26px]"
          style={{ background: `radial-gradient(circle, ${HUMAN}, ${MOUSE})` }}
        />
        <div className="relative w-full h-full">
          <Glyph run={run} />
        </div>
      </div>

      {/* Headline stats. */}
      <div className="w-full">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-1.5">One neuron, thousands of connections</p>
        <p className="font-display font-light leading-tight mb-5" style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>
          The most famous cell of the brain
        </p>

        {/* Column key — stated once. */}
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 sm:gap-x-6 text-[11px] uppercase tracking-[0.2em] pb-2">
          <span />
          <span className="text-right flex items-center gap-1.5 justify-end" style={{ color: MOUSE }}>
            <span className="w-2 h-2 rounded-full" style={{ background: MOUSE }} /> Mouse
          </span>
          <span className="text-right flex items-center gap-1.5 justify-end" style={{ color: HUMAN }}>
            <span className="w-2 h-2 rounded-full" style={{ background: HUMAN }} /> Human
          </span>
        </div>

        {STATS.map((s) => (
          <div key={s.label} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 sm:gap-x-6 border-t border-white/10 py-2.5">
            <span className="uppercase tracking-[0.22em] text-white/55 text-xs">{s.label}</span>
            <span className="font-display font-light tabular-nums text-right" style={{ color: MOUSE, fontSize: "clamp(0.95rem,1.5vw,1.25rem)" }}>
              {s.mouse}
            </span>
            <span className="font-display font-light tabular-nums text-right" style={{ color: HUMAN, fontSize: "clamp(0.95rem,1.5vw,1.25rem)" }}>
              {s.human}
            </span>
          </div>
        ))}

        <Link to="/citations" className="inline-block mt-4 text-sm text-white/45 hover:text-white/80 transition underline decoration-white/25">
          Sources &amp; Calculations →
        </Link>
      </div>
    </div>
  );
}
