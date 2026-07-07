import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReferenceTable from "../components/ReferenceTable";
import NeuronIcon from "../components/NeuronIcon";
import LandmarkMetrics from "../components/LandmarkMetrics";
import ScaleTestImageFigure from "../components/ScaleTestImageFigure";
import type { ScaleTestImageId } from "../data/scaleTestImageQueue";

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

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
      anchor: "About 8 feet deep at Fenway, if the neurons were baseballs.",
    },
    human: {
      value: 86e9,
      display: "86 billion",
      anchor: "About 28 Fenway Parks full, using the same baseball picture.",
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
    label: "Wiring - all axon",
    unit: "km",
    mouse: {
      value: 2000,
      display: "~2,000 km",
      anchor: "About Boston to Miami, if one axon could lie across the coast.",
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
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-light sm:text-3xl">{row.label}</h3>
        <span
          className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]"
          style={{ color: HUMAN, background: "rgba(183,139,255,0.12)", borderColor: "rgba(183,139,255,0.25)" }}
        >
          {row.ratio}
        </span>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
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

        <ScaleTestImageFigure imageId={row.imageId} eyebrow="Visual metaphor" caption={row.imageCaption} />
      </div>
    </div>
  );
}

function EarthWrap({ run }: { run: boolean }) {
  const loops = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="rounded-[1.75rem] glass p-7 sm:p-8">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
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
              {loops.map((loop) => (
                <motion.ellipse
                  key={loop}
                  cx="110"
                  cy="110"
                  rx="70"
                  ry="24"
                  fill="none"
                  stroke="url(#earthWrapWire)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  transform={`rotate(${loop * 45 - 68} 110 110)`}
                  style={{ filter: "drop-shadow(0 0 4px rgba(150,170,255,0.7))" }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={run ? { pathLength: 1, opacity: 0.75 } : {}}
                  transition={{ duration: 1.4, delay: 0.3 + loop * 0.16, ease: "easeInOut" }}
                />
              ))}
            </svg>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/45">Total wiring, human brain</p>
              <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light">~2 million km of axon</p>
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

        <ScaleTestImageFigure
          imageId="earth-wrapped-in-axon-wiring"
          eyebrow="Flagship visual"
          caption="This is the showpiece version of the wiring claim: biology behaving like orbital ribbon, not industrial cable."
        />
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
      className="min-h-screen w-full text-white"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 60%)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-white/45">By the numbers</p>
            <h1 className="font-display text-[clamp(2.4rem,5.6vw,5rem)] font-light leading-[0.97]">
              Brains by the numbers
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              A single neuron makes thousands of connections. Scale that up and the numbers stop feeling like numbers,
              so this page turns them into volumes, distances, stadiums, horizons, and impossible threads.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/citations"
                className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
              >
                Sources and calculations
              </Link>
              <Link
                to="/wonder"
                className="rounded-full border px-5 py-2.5 text-sm font-medium transition"
                style={{ borderColor: "rgba(126,224,255,0.22)", color: MOUSE, background: "rgba(126,224,255,0.08)" }}
              >
                More wonder-first context
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Palette</p>
                <p className="mt-2 text-sm leading-relaxed text-white/68">
                  Mouse scale glows in cyan. Human scale glows in violet. The dark field stays quiet so the comparison
                  feels cinematic instead of infographic-heavy.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Design principle</p>
                <p className="mt-2 text-sm leading-relaxed text-white/68">
                  Wonder first, then comprehension. The page keeps the numerical claims in text and lets the images do
                  the atmosphere and scale metaphors.
                </p>
              </div>
            </div>
          </div>

          <ScaleTestImageFigure
            imageId="hero-brains-by-the-numbers"
            eyebrow="Hero image"
            caption="The whole page starts with the core comparison: one tiny cyan brain and one much larger violet one, suspended in the same field."
          />
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <ScaleTestImageFigure
            imageId="numbers-dissolve-into-nebula"
            eyebrow="Transition image"
            caption="When the quantities get too big to feel, the page shifts from arithmetic into atmosphere."
          />
          <ScaleTestImageFigure
            imageId="volume-spheres-mouse-human"
            eyebrow="Scale cue"
            caption="The sphere metaphor previews why volume-scaling helps the mouse stay visible without pretending the gap is small."
          />
        </section>

        <section className="mt-12 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <NeuronIcon run={run} />
          <ScaleTestImageFigure
            imageId="single-synapse-spark"
            eyebrow="One connection"
            caption="The page starts close: one synapse, one spark, and the sense that even the smallest unit is already crowded with possibility."
          />
        </section>

        <section className="mt-12 grid gap-5">
          {ROWS.map((row) => (
            <Stat key={row.key} row={row} run={run} />
          ))}
        </section>

        <section className="mt-12">
          <EarthWrap run={run} />
        </section>

        <section className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Metaphors that stick</p>
              <h2 className="mt-2 font-display text-3xl font-light sm:text-4xl">Picture the scale before you read it</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/58 sm:text-base">
              These side images give the numerical text something your eye can hold onto: stadiums, coastlines, orbital
              loops, and a brain that behaves like a tiny planet.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
            <ScaleTestImageFigure
              imageId="fenway-baseball-scale"
              eyebrow="Neuron count"
              caption="Fenway turns the neuron count into a physical bowl of glowing baseball-sized points."
            />
            <ScaleTestImageFigure
              imageId="moon-and-back-wiring"
              eyebrow="Human wiring"
              caption="The Moon-and-back metaphor makes the human wiring claim feel spatial instead of abstract."
            />
            <ScaleTestImageFigure
              imageId="woven-planet-brain"
              eyebrow="General brain wiring"
              caption="A brain woven like a weathered little planet helps bridge anatomy and cosmology."
            />
            <ScaleTestImageFigure
              imageId="scale-ladder-earth-brain-neuron-synapse"
              eyebrow="Summary image"
              caption="The footer ladder ties the whole page together: Earth to brain to neuron to synapse, all on one thread."
            />
          </div>
        </section>

        <section className="mt-12 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <LandmarkMetrics run={run} />
          <ScaleTestImageFigure
            imageId="scale-ladder-earth-brain-neuron-synapse"
            eyebrow="Page close"
            caption="At the end, the ladder image gives the page one last clean hierarchy of scale without embedding any numbers into the art itself."
          />
        </section>

        <section className="mt-14">
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
