import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReferenceTable from "../components/ReferenceTable";
import NeuronIcon from "../components/NeuronIcon";
import LandmarkMetrics from "../components/LandmarkMetrics";
import RealNeuronModel from "../components/RealNeuronModel";
import FactIcon, { type FactIconId } from "../components/FactIcon";
import StatsTopBar from "../components/StatsTopBar";

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";
const FLY = "#ffc861";

// Top-line facts about the human brain, shown above the fold beside the 3D
// model. Figures match /citations (volume/weight are standard adult averages;
// cell-type count from the 2023 human brain transcriptomic atlas).
const BRAIN_FACTS: { label: string; value: string; note: string }[] = [
  { label: "Volume", value: "~1.3 L", note: "about 1,260 cm³ of tissue" },
  { label: "Size", value: "~1.4 kg", note: "roughly 3 pounds" },
  { label: "Neurons", value: "86 billion", note: "give or take a few billion" },
  { label: "Synapses", value: "~100 trillion", note: "connections between neurons" },
  { label: "Wiring", value: "~2 million km", note: "axons + dendrites, end to end" },
  { label: "Cell types", value: "3,000+", note: "known types (2023 human brain atlas)" },
];

// Narrative facts, sourced on /citations under "More brain facts".
const MORE_FACTS: { hl: string; title: string; body: string; icon: FactIconId; link?: { to: string; label: string } }[] = [
  {
    hl: "2% / 20%",
    title: "A hungry little organ",
    icon: "energy",
    body: "Your brain is about 2% of your body weight, but it burns about 20% of your energy. Thinking is expensive.",
  },
  {
    hl: "~60% fat",
    title: "Thinking with butter",
    icon: "myelin",
    body: "By dry weight your brain is roughly 60% fat. You are, structurally, thinking with butter. That fat insulates your wiring so signals can race: down a myelinated axon an impulse hits about 120 m/s, roughly 270 mph.",
  },
  {
    hl: "~1 : 1",
    title: "You are half not-neurons",
    icon: "ratio",
    body: "You have about 86 billion neurons, and almost exactly that many non-neuronal (glial) cells too, close to a 1:1 ratio.",
    link: { to: "/meet/coral-fan", label: "Meet an inhibitory cell" },
  },
  {
    hl: "~2.5 ft²",
    title: "Why your brain is wrinkled",
    icon: "folds",
    body: "The folds exist to pack in surface area. Unfold your cortex and it is about 2.5 square feet, or 0.23 m², roughly the size of a large pizza box.",
  },
  {
    hl: "~30 nm",
    title: "Nothing ever quite touches",
    icon: "gap",
    body: "Neurons never actually touch. Every thought leaps a gap about 20 to 40 nanometers wide, thousands of times thinner than a hair.",
  },
];

const COMPARE: {
  metric: string;
  note: string;
  rows: { who: string; color: string; value: number; display: string; anchor: string }[];
}[] = [
  {
    metric: "Neurons",
    note: "Each brain up the ladder holds very roughly a thousand times more than the last.",
    rows: [
      { who: "Fly", color: FLY, value: 139255, display: "139,255", anchor: "a whole animal, in one speck" },
      { who: "Mouse", color: MOUSE, value: 70e6, display: "70 million", anchor: "about the population of France" },
      { who: "Human", color: HUMAN, value: 86e9, display: "86 billion", anchor: "more than ten Earths of people" },
    ],
  },
  {
    metric: "Synapses",
    note: "The connections explode even faster than the cells that make them.",
    rows: [
      { who: "Fly", color: FLY, value: 54.5e6, display: "~54.5 million", anchor: "every one now mapped" },
      { who: "Mouse", color: MOUSE, value: 250e9, display: "~250 billion", anchor: "~8,000 years to count" },
      { who: "Human", color: HUMAN, value: 100e12, display: "~100 trillion", anchor: "~3 million years to count" },
    ],
  },
];

function CompareBar({
  row,
  metricMax,
  run,
  delay,
}: {
  row: { who: string; color: string; value: number; display: string; anchor: string };
  metricMax: number;
  run: boolean;
  delay: number;
}) {
  // Log scale: a linear bar would render the fly as a single invisible pixel
  // beside the human. Log keeps all three legible; the footnote owns the honesty.
  const pct = Math.max(7, (Math.log10(row.value) / Math.log10(metricMax)) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-[11px] uppercase tracking-[0.18em]" style={{ color: row.color }}>
        {row.who}
      </span>
      <div className="relative h-9 flex-1 overflow-hidden rounded-lg bg-white/[0.04]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg"
          style={{ background: `linear-gradient(90deg, ${row.color}44, ${row.color}cc)` }}
          initial={{ width: 0 }}
          animate={run ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 flex items-center justify-between gap-2 px-3">
          <span className="font-display tabular-nums text-sm text-white sm:text-base">{row.display}</span>
          <span className="hidden text-[11px] text-white/55 sm:block">{row.anchor}</span>
        </div>
      </div>
    </div>
  );
}

function BrainCompare({ run }: { run: boolean }) {
  return (
    <div className="rounded-[1.75rem] glass p-7 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-light sm:text-3xl">Fly, mouse, human</h3>
        <div className="flex items-center gap-4">
          {[
            { c: FLY, l: "Fly" },
            { c: MOUSE, l: "Mouse" },
            { c: HUMAN, l: "Human" },
          ].map((x) => (
            <span key={x.l} className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-white/55">
              <span className="h-2 w-2 rounded-full" style={{ background: x.c, boxShadow: `0 0 8px ${x.c}` }} />
              {x.l}
            </span>
          ))}
        </div>
      </div>

      {COMPARE.map((m) => {
        const metricMax = Math.max(...m.rows.map((r) => r.value));
        return (
          <div key={m.metric} className="mb-7 last:mb-2">
            <h4 className="mb-3 font-display text-lg font-light text-white/90">{m.metric}</h4>
            <div className="grid gap-2.5">
              {m.rows.map((r, i) => (
                <CompareBar key={r.who} row={r} metricMax={metricMax} run={run} delay={0.15 * i} />
              ))}
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-white/45">{m.note}</p>
          </div>
        );
      })}

      <p className="mt-4 border-t border-white/8 pt-4 text-[12px] leading-relaxed text-white/45">
        The bars sit on a log scale, so the brains look close together. They are not: every step up is a jump of
        hundreds to thousands of times. The entire fly brain, mapped wire for wire, holds fewer neurons than a
        grain-of-rice crumb of your cortex, and that crumb-sized brain still flies, learns, and finds a mate.
      </p>
    </div>
  );
}

function EarthWrap({ run }: { run: boolean }) {
  const loops = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="rounded-[1.75rem] glass p-7 sm:p-8">
      <div>
        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <svg viewBox="0 0 220 220" width="220" height="220" className="mx-auto shrink-0">
              <defs>
                <radialGradient id="earthWrapGlobe" cx="42%" cy="38%" r="72%">
                  <stop offset="0%" stopColor="#2a5e8f" />
                  <stop offset="60%" stopColor="#15304d" />
                  <stop offset="100%" stopColor="#0a1a2c" />
                </radialGradient>
                <linearGradient id="earthWrapWire" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={HUMAN} />
                  <stop offset="100%" stopColor={MOUSE} />
                </linearGradient>
              </defs>
              <circle
                cx="110"
                cy="110"
                r="58"
                fill="url(#earthWrapGlobe)"
                stroke="rgba(126,224,255,0.25)"
                strokeWidth="1"
              />
              {[-30, 0, 30].map((offset) => (
                <ellipse
                  key={offset}
                  cx="110"
                  cy={110 + offset * 0.9}
                  rx="58"
                  ry={Math.max(6, 58 - Math.abs(offset) * 1.4)}
                  fill="none"
                  stroke="rgba(126,224,255,0.12)"
                  strokeWidth="0.6"
                />
              ))}
              {/* Wire wound tightly AROUND the globe (rx = sphere radius) so it
                  reads as thread wrapping the Earth, not orbits circling it. */}
              {loops.map((loop) => (
                <motion.ellipse
                  key={loop}
                  cx="110"
                  cy="110"
                  rx="58"
                  ry={9 + (loop % 6) * 9.5}
                  fill="none"
                  stroke="url(#earthWrapWire)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  transform={`rotate(${loop * 30} 110 110)`}
                  style={{ filter: "drop-shadow(0 0 3px rgba(150,170,255,0.65))" }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={run ? { pathLength: 1, opacity: 0.68 } : {}}
                  transition={{ duration: 1.5, delay: 0.2 + loop * 0.09, ease: "easeInOut" }}
                />
              ))}
            </svg>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/45">Total wiring, human brain</p>
              <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light">~2 million km of wiring</p>
              <p className="mt-3 max-w-md leading-relaxed text-white/70">
                Laid end to end, the wiring in a single human brain would wrap around the Earth roughly{" "}
                <span style={{ color: HUMAN }}>50 times</span> or reach{" "}
                <span style={{ color: HUMAN }}>the Moon and back more than twice</span>. The familiar "~100,000 miles"
                figure only counts the small fraction that is myelinated.
              </p>
              <Link
                to="/citations"
                className="mt-4 inline-block text-sm text-white/55 underline decoration-white/25 transition hover:text-white/82 hover:decoration-white"
              >
                How the wiring estimate is built
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScaleTest() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setRun(true), 250);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="min-h-screen w-full text-white [scroll-behavior:smooth] [&_section[id]]:scroll-mt-24"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 60%)" }}
    >
      <StatsTopBar />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Hero: interactive 3D brain (top on mobile, right on desktop) + title. */}
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-1 lg:order-2 rounded-[1.75rem] glass p-4 sm:p-5">
            <div className="relative mx-auto aspect-square w-full max-w-[440px]">
              <RealNeuronModel
                meshUrl={`${import.meta.env.BASE_URL}meshes/human-brain.glb`}
                extraMeshUrl={`${import.meta.env.BASE_URL}meshes/human-cerebellum.glb`}
                color={HUMAN}
                cameraDistance={2.5}
                spinSpeed={0.12}
                zoom={false}
                className="absolute inset-0"
              />
            </div>
            <p className="mt-1 text-center text-[11px] uppercase tracking-[0.26em] text-white/40">
              Drag to rotate. Human brain reconstructed from MRI
            </p>
          </div>

          <div className="order-2 lg:order-1">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-white/45">By the numbers</p>
            <h1 className="font-display text-[clamp(2.4rem,5.6vw,5rem)] font-light leading-[0.97]">
              Brains by the numbers
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              A single neuron makes thousands of connections. Scale that up and the numbers stop feeling like numbers,
              so this page turns them into volumes, distances, and impossible threads.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/fly"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition"
                style={{ background: "rgba(255,200,97,0.14)", border: "1px solid rgba(255,200,97,0.35)", color: "#ffc861" }}
              >
                The fly we fully mapped →
              </Link>
              <Link
                to="/citations"
                className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
              >
                Sources and calculations
              </Link>
            </div>
          </div>
        </section>

        {/* Six key brain facts. */}
        <section id="numbers" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {BRAIN_FACTS.map((f) => (
            <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{f.label}</p>
              <p className="mt-1.5 font-display font-light tabular-nums" style={{ color: HUMAN, fontSize: "clamp(1.4rem,2.2vw,1.9rem)" }}>
                {f.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">{f.note}</p>
            </div>
          ))}
        </section>

        {/* More brain facts — the strange, delightful ones. */}
        <section id="facts" className="mt-14">
          <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">More about your brain</p>
          <h2 className="mb-5 font-display text-3xl font-light sm:text-4xl">Stranger than the numbers</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {MORE_FACTS.map((f) => (
              <div key={f.title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 pr-16 sm:p-6 sm:pr-20">
                <FactIcon id={f.icon} className="absolute right-4 top-4 h-11 w-11 sm:right-5 sm:top-5 sm:h-14 sm:w-14" />
                <p className="font-display font-light tabular-nums" style={{ color: HUMAN, fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>
                  {f.hl}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/45">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.body}</p>
                {f.link && (
                  <Link to={f.link.to} className="mt-3 inline-block text-sm text-white/55 underline decoration-white/25 transition hover:text-white/85">
                    {f.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <NeuronIcon run={run} />
        </section>

        <section id="compare" className="mt-12">
          <BrainCompare run={run} />
        </section>

        <section className="mt-12">
          <EarthWrap run={run} />
        </section>

        <section id="units" className="mt-12">
          <LandmarkMetrics run={run} />
        </section>

        <section id="sources" className="mt-14">
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/45">Reference</p>
          <ReferenceTable />
          <Link
            to="/citations"
            className="mt-5 inline-block text-sm text-white/45 underline decoration-white/25 transition hover:text-white/80"
          >
            Sources and calculations
          </Link>
        </section>
      </div>
    </div>
  );
}
