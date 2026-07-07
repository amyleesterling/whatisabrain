import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Fun, globally-known yardsticks for the brain numbers. Each tile uses a
// DIFFERENT object/theme, and its icon IS that object. Some transform the
// 86-billion neuron count into things (baguettes, pyramid blocks); others are
// separate brain facts (synapses, wiring, power, speed, memory). Every figure
// is derived on /citations under "Landmark comparisons".

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

const s = { fill: "none", stroke: "url(#lmStroke)", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const dot = (cx: number, cy: number, r = 1.5) => <circle cx={cx} cy={cy} r={r} fill="url(#lmStroke)" />;

type Metric = { big: string; unit: string; sub: string; hue: string; icon: React.ReactNode };

const METRICS: Metric[] = [
  {
    big: "~170M",
    unit: "Eiffel Towers of bread",
    hue: HUMAN,
    sub: "Your 86 billion neurons as baguettes, end to end, make a ~56-million-km breadstick — 170 million Eiffel Towers tall.",
    icon: (
      <g>
        <ellipse {...s} cx="20" cy="20" rx="16" ry="5.2" transform="rotate(-32 20 20)" />
        <path {...s} strokeWidth={1.3} opacity={0.6} d="M11 16 l3.5 -4 M17 18.5 l3.5 -4 M23 21 l3.5 -4" />
      </g>
    ),
  },
  {
    big: "~37,000",
    unit: "Great Pyramids",
    hue: MOUSE,
    sub: "As the limestone blocks of Giza — 2.3 million to a pyramid — your neurons could raise thirty-seven thousand of them.",
    icon: (
      <g>
        <circle {...s} cx="20" cy="8" r="3" />
        <path {...s} d="M20 14 L33 33 L7 33 Z" />
        <path {...s} strokeWidth={1.2} opacity={0.55} d="M13.6 24 L26.4 24 M10.4 29 L29.6 29" />
      </g>
    ),
  },
  {
    big: "2.6×",
    unit: "to the Moon and back",
    hue: HUMAN,
    sub: "Your brain's ~2 million km of wiring would reach the Moon and back more than twice. The Moon did not agree to this.",
    icon: (
      <g>
        <circle {...s} cx="20" cy="20" r="13" />
        {dot(15, 17, 1.5)}
        {dot(25, 17, 1.5)}
        <circle {...s} cx="20" cy="25.5" r="2.6" />
        <circle {...s} strokeWidth={1} opacity={0.45} cx="12" cy="24" r="1.7" />
      </g>
    ),
  },
  {
    big: "~2,700",
    unit: "years to count them",
    hue: MOUSE,
    sub: "Tick off your 86 billion neurons one per second, no sleep, and you'd finish in about 2,700 years.",
    icon: (
      <g>
        <circle {...s} cx="20" cy="20" r="13" />
        <path {...s} d="M20 20 L20 11 M20 20 L26 23" />
      </g>
    ),
  },
  {
    big: "~500×",
    unit: "the Milky Way's stars",
    hue: HUMAN,
    sub: "Your ~100 trillion synapses outnumber the stars in the galaxy roughly five hundred times over.",
    icon: (
      <g>
        <path {...s} d="M20 5 L23 16 L34 20 L23 24 L20 35 L17 24 L6 20 L17 16 Z" />
        {dot(31, 9, 1.2)}
        {dot(9, 30, 1)}
      </g>
    ),
  },
  {
    big: "~20",
    unit: "watts to run it",
    hue: MOUSE,
    sub: "Your whole brain sips about 20 watts — a dim bulb that still out-thinks any supercomputer.",
    icon: (
      <g>
        <circle {...s} cx="20" cy="16" r="9" />
        <path {...s} d="M15.5 25.5 l9 0 M16.5 29.5 l7 0 M17.5 33 l5 0" />
        <path {...s} strokeWidth={1.3} opacity={0.6} d="M17 16 l3 4 l3 -6" />
      </g>
    ),
  },
  {
    big: "~270",
    unit: "mph nerve signals",
    hue: HUMAN,
    sub: "Down your fastest myelinated axons, impulses hit up to 270 mph — enough to leave a Formula 1 car behind.",
    icon: <path {...s} d="M22 5 L10 22 L18 22 L16 35 L30 16 L21 16 Z" />,
  },
  {
    big: "~2.5",
    unit: "petabytes of memory",
    hue: MOUSE,
    sub: "One estimate puts your memory near 2.5 petabytes — roughly three million hours of shows.",
    icon: (
      <g>
        <path {...s} d="M9 9 L27 9 L31 13 L31 31 L9 31 Z" />
        <path {...s} strokeWidth={1.3} d="M14 9 L14 15 L24 15 L24 9" />
        <rect {...s} strokeWidth={1.3} x="13" y="20" width="14" height="9" />
      </g>
    ),
  },
];

export default function LandmarkMetrics({ run }: { run: boolean }) {
  return (
    <div className="rounded-2xl glass p-7 sm:p-8">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="lmStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={HUMAN} />
            <stop offset="100%" stopColor={MOUSE} />
          </linearGradient>
        </defs>
      </svg>

      <h3 className="font-display text-2xl sm:text-3xl font-light mb-1.5">Your brain, in ridiculous units</h3>
      <p className="text-sm text-white/55 mb-6">
        Familiar yardsticks for the same brain numbers.{" "}
        <Link to="/citations#landmark-comparisons" className="underline decoration-white/30 hover:decoration-white text-white/70">
          See the arithmetic →
        </Link>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.unit}
            className="rounded-xl p-5 flex gap-4 items-start"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={run ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.22)" }}
          >
            <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true" className="shrink-0 mt-0.5">
              {m.icon}
            </svg>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display font-light tabular-nums" style={{ color: m.hue, fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>
                  {m.big}
                </span>
                <span className="font-display font-light text-white/85" style={{ fontSize: "clamp(1rem,1.5vw,1.15rem)" }}>
                  {m.unit}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{m.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
