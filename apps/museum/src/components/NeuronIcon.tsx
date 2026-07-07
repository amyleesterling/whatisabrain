import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RealNeuronModel from "./RealNeuronModel";
import { meshUrl } from "../data/neurons";

const MOUSE = "#7ee0ff"; // cyan — the mouse brain
const HUMAN = "#b78bff"; // violet — the human brain

export default function NeuronIcon({ run }: { run: boolean }) {
  return (
    <div className="rounded-2xl glass p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
      {/* What a neuron is — on the left. */}
      <div className="w-full">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-1.5">One neuron, thousands of connections</p>
        <h3 className="font-display font-light leading-tight mb-4" style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>
          Neurons: the most famous cells in the brain
        </h3>
        <p className="max-w-xl leading-relaxed text-white/70">
          A neuron is a signaling cell. It gathers inputs across a bushy tree of dendrites, and when enough of them add
          up, it fires a tiny electrical pulse down its axon to thousands of other neurons. Billions of them, chattering
          in patterns, are where every thought, memory, and feeling actually happens.
        </p>
        <Link to="/meet" className="inline-block mt-4 text-sm text-white/55 hover:text-white/85 transition underline decoration-white/25">
          Meet real neurons →
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
