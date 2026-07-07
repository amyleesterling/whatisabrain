import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RealNeuronModel from "./RealNeuronModel";
import { meshUrl } from "../data/neurons";

const MOUSE = "#7ee0ff"; // cyan — the mouse brain
const HUMAN = "#b78bff"; // violet — the human brain

// Headline figures. Every number matches /citations (Azevedo 2009 neuron
// counts; standard synapse densities; the ~2M km wiring estimate). Mouse
// synapses shown at ~250B, the midpoint of the cited ~200–300 billion range.
const STATS: { label: string; human: string; mouse: string }[] = [
  { label: "Neurons", human: "86 billion", mouse: "70 million" },
  { label: "Synapses", human: "100 trillion", mouse: "~250 billion" },
  { label: "Wiring", human: "~2 million km", mouse: "~2,000 km" },
];

export default function NeuronIcon({ run }: { run: boolean }) {
  return (
    <div className="rounded-2xl glass p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
      {/* Headline stats — on the left. */}
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

      {/* A real reconstructed neuron ("Spire"), gently spinning, on the right. */}
      <div className="relative shrink-0" style={{ width: 180, height: 240 }}>
        <div
          className="absolute inset-0 rounded-full opacity-25 blur-[26px]"
          style={{ background: `radial-gradient(circle, ${HUMAN}, ${MOUSE})` }}
        />
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={run ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <RealNeuronModel
            meshUrl={meshUrl({ id: "spire" })}
            color={HUMAN}
            interactive={false}
            spinSpeed={0.3}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
