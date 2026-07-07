import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReferenceTable from "../components/ReferenceTable";
import NeuronIcon from "../components/NeuronIcon";
import LandmarkMetrics from "../components/LandmarkMetrics";
import RealNeuronModel from "../components/RealNeuronModel";
import FactIcon, { type FactIconId } from "../components/FactIcon";
import StatsTopBar from "../components/StatsTopBar";
import type { ScaleTestImageId } from "../data/scaleTestImageQueue";

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

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

type Row = {
  key: string;
  label: string;
  mouse: { value: number; display: string; anchor: string };
  human: { value: number; display: string; anchor: string };
  ratio: string;
  unit?: "km";
  imageId: ScaleTestImageId;
  imageCaption: string;
};

const ROWS: Row[] = [
  {
    key: "neurons",
    label: "Neurons",
    mouse: {
      value: 70e6,
      display: "70 million",
      anchor: "About the number of people living in France.",
    },
    human: {
      value: 86e9,
      display: "86 billion",
      anchor: "More than ten times everyone alive on Earth.",
    },
    ratio: "~1,200x more",
    imageId: "neurons-cloud-comparison",
    imageCaption:
      "The count reads best as a small cyan cloud beside a violet galaxy that keeps expanding out of the frame.",
  },
  {
    key: "synapses",
    label: "Synapses",
    mouse: {
      value: 250e9,
      display: "~250 billion",
      anchor: "About 8,000 years to count them, one per second.",
    },
    human: {
      value: 100e12,
      display: "100 trillion",
      anchor: "About 3 million years to count them, one per second.",
    },
    ratio: "~400x more",
    imageId: "synapse-city-lights",
    imageCaption:
      "Synapses feel less like beads on a chart and more like an electric city horizon that never ends.",
  },
  {
    key: "wire",
    label: "Wiring, all axon",
    unit: "km",
    mouse: {
      value: 2000,
      display: "~2,000 km",
      anchor: "Enough living thread to stretch across a continent.",
    },
    human: {
      value: 2_000_000,
      display: "~2 million km",
      anchor: "Enough to circle the Earth again and again as living thread.",
    },
    ratio: "~1,000x more",
    imageId: "boston-to-miami-axon",
    imageCaption:
      "The mouse version stays graspable as one glowing cyan path running down the eastern seaboard.",
  },
];

function useCountUp(target: number, run: boolean, ms = 1700) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!run || startedRef.current) return;
    startedRef.current = true;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ms, run, target]);

  return value;
}

function compact(value: number, unit?: "km") {
  if (unit === "km") return `${Math.round(value).toLocaleString()} km`;
  if (value >= 1e12) return `${+(value / 1e12).toFixed(value < 1e13 ? 1 : 0)} trillion`;
  if (value >= 1e9) return `${Math.round(value / 1e9)} billion`;
  if (value >= 1e6) return `${Math.round(value / 1e6)} million`;
  return Math.round(value).toLocaleString();
}

function ScaleSpheres({ ratio, run }: { ratio: number; run: boolean }) {
  const humanDiameter = 104;
  const mouseDiameter = Math.max(9, humanDiameter / Math.cbrt(ratio));
  const humanRadius = humanDiameter / 2;
  const mouseRadius = mouseDiameter / 2;
  const baseY = 132;
  const humanCx = 138;
  const mouseCx = humanCx - humanRadius - 20 - mouseRadius;

  const sphere = (cx: number, cy: number, radius: number, id: string, glow: string, delay: number) => (
    <motion.circle
      cx={cx}
      cy={cy}
      r={radius}
      fill={`url(#${id})`}
      initial={{ scale: 0, opacity: 0 }}
      animate={run ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px`, filter: `drop-shadow(0 0 9px ${glow})` }}
    />
  );

  return (
    <svg viewBox="0 0 200 150" className="mx-auto w-full max-w-[220px]" aria-hidden="true">
      <defs>
        <radialGradient id="scaleMouseSphere" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#dcf6ff" />
          <stop offset="45%" stopColor={MOUSE} />
          <stop offset="100%" stopColor="#286a85" />
        </radialGradient>
        <radialGradient id="scaleHumanSphere" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#e9e0ff" />
          <stop offset="45%" stopColor={HUMAN} />
          <stop offset="100%" stopColor="#523f95" />
        </radialGradient>
      </defs>
      <line x1="10" y1={baseY} x2="190" y2={baseY} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {sphere(mouseCx, baseY - mouseRadius, mouseRadius, "scaleMouseSphere", `${MOUSE}88`, 0.5)}
      {sphere(humanCx, baseY - humanRadius, humanRadius, "scaleHumanSphere", `${HUMAN}88`, 0.35)}
    </svg>
  );
}

function Stat({ row, run }: { row: Row; run: boolean }) {
  const mouseValue = useCountUp(row.mouse.value, run);
  const humanValue = useCountUp(row.human.value, run);
  const ratio = row.human.value / row.mouse.value;
  const widthRatio = Math.round(Math.cbrt(ratio));

  return (
    <div className="rounded-[1.75rem] glass p-7 sm:p-8">
      <div className="flex flex-wrap items-baseline gap-4">
        <h3 className="font-display text-2xl font-light sm:text-3xl">{row.label}</h3>
      </div>

      <div className="mt-6">
        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="min-w-0 flex-1">
              {[
                { who: "Mouse brain", color: MOUSE, live: mouseValue, spec: row.mouse },
                { who: "Human brain", color: HUMAN, live: humanValue, spec: row.human },
              ].map((entry) => (
                <div key={entry.who} className="mb-4 last:mb-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-white/45">{entry.who}</span>
                    <span
                      className="font-display tabular-nums"
                      style={{ color: entry.color, fontSize: "clamp(1.2rem,2vw,1.7rem)" }}
                    >
                      {compact(entry.live, row.unit)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-white/58">{entry.spec.anchor}</p>
                </div>
              ))}
            </div>

            <div className="w-full shrink-0 sm:w-auto">
              <ScaleSpheres ratio={ratio} run={run} />
              <p className="mx-auto mt-1 max-w-[220px] text-center text-[11px] leading-snug text-white/40">
                Volume scaling keeps both spheres visible. The human is only about {widthRatio}x wider, but it still
                stands for {row.ratio.replace(" more", "")} the amount.
              </p>
            </div>
          </div>
        </div>
      </div>
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

        <section id="compare" className="mt-12 grid gap-5">
          {ROWS.map((row) => (
            <Stat key={row.key} row={row} run={run} />
          ))}
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
