import { Link } from "react-router-dom";
import HubLogo from "../components/HubLogo";

const HUMAN = "#b78bff";
const CYAN = "#7ee0ff";
const FLY = "#ffc861";

const WAYS: { color: string; title: string; body: string; to: string; cta: string }[] = [
  {
    color: CYAN,
    title: "Project it",
    body: "Put the guided zoom on the big screen and travel from a whole brain down to a single synapse together. It auto-advances, so it runs itself while you narrate.",
    to: "/wall",
    cta: "Open the wall view",
  },
  {
    color: HUMAN,
    title: "Explore the numbers",
    body: "Walk through how big a brain really is: 86 billion neurons, 2 million km of wiring, the folds, the fat, the speed. Every figure is sourced and turned into something you can picture.",
    to: "/stats",
    cta: "Brains by the numbers",
  },
  {
    color: FLY,
    title: "Quiz them",
    body: "Five quick guess-the-number questions. Great as a warm-up or an exit ticket, and every answer reveals a real, surprising fact.",
    to: "/quiz",
    cta: "Try the quiz",
  },
];

const QUESTIONS: string[] = [
  "Your brain is only 2% of your body weight but uses about 20% of your energy. Why might such a small organ be so expensive to run?",
  "Scientists have completely mapped a fly's brain (139,255 neurons) but not a mouse's or a human's. Why do you think a bigger brain is so much harder to map?",
  "A single neuron can connect to thousands of others. How does that help explain how brains do so much with their cells?",
  "The wiring in one human brain would stretch about 2 million km. What does a number that big actually mean to you? How could you picture it?",
  "Neurons never touch, they signal across a tiny gap. Why might it matter that the brain passes messages with gaps instead of solid connections?",
  "What is one thing on this site that surprised you, and what new question does it make you want to ask?",
];

export default function Teach() {
  return (
    <div
      className="min-h-screen w-full text-white print:bg-white print:text-black"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 62%)" }}
    >
      <div className="sticky top-0 z-40 border-b border-white/8 bg-[#04060c]/72 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <HubLogo className="shrink-0" />
          <button
            onClick={() => window.print()}
            className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm text-white/85 transition hover:bg-white/12"
          >
            Print this guide
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em]" style={{ color: CYAN }}>
          For classrooms
        </p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] print:text-black">
          Bring a real brain into your room
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 print:text-black/70">
          This is a free, no-login tour of the real human and fly brain, built from actual scientific reconstructions,
          not illustrations. It works on any device, from a projector to a phone. Here are a few ways to use it with a
          class, plus questions to spark discussion.
        </p>

        {/* Ways to use it */}
        <section className="mt-12">
          <h2 className="mb-5 font-display text-2xl font-light print:text-black">Three ways to use it</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {WAYS.map((w) => (
              <div
                key={w.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 print:border-black/15"
              >
                <span className="mb-3 h-1.5 w-10 rounded-full" style={{ background: w.color }} />
                <h3 className="font-display text-lg font-light print:text-black">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65 print:text-black/70">{w.body}</p>
                <Link
                  to={w.to}
                  className="mt-4 inline-block text-sm underline decoration-white/25 transition hover:text-white print:hidden"
                  style={{ color: w.color }}
                >
                  {w.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Discussion questions */}
        <section className="mt-14">
          <h2 className="mb-2 font-display text-2xl font-light print:text-black">Discussion questions</h2>
          <p className="mb-6 max-w-2xl leading-relaxed text-white/60 print:text-black/60">
            Open-ended, no single right answer. Good for a think-pair-share, a journal prompt, or a whole-class talk.
          </p>
          <ol className="space-y-4">
            {QUESTIONS.map((q, n) => (
              <li key={n} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 print:border-black/15">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm"
                  style={{ background: "rgba(183,139,255,0.14)", border: "1px solid rgba(183,139,255,0.3)", color: HUMAN }}
                >
                  {n + 1}
                </span>
                <p className="leading-relaxed text-white/80 print:text-black/80">{q}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Good to know */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { t: "No login, no cost", b: "Nothing to install or sign up for. Open a link and go." },
            { t: "Real data", b: "Every neuron and brain shown is a real reconstruction from MICrONS and FlyWire." },
            { t: "Any age", b: "Built for curious people, roughly upper-elementary through adult. Take what fits your class." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 print:border-black/15">
              <h3 className="font-display text-lg font-light print:text-black">{c.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60 print:text-black/70">{c.b}</p>
            </div>
          ))}
        </section>

        {/* Sources note */}
        <section className="mt-12 rounded-2xl glass p-6 print:border print:border-black/15 print:bg-white">
          <p className="text-[15px] leading-relaxed text-white/70 print:text-black/70">
            Want the sources behind every number? They are all laid out, with the math, on the{" "}
            <Link to="/citations" className="underline decoration-white/30 hover:text-white" style={{ color: HUMAN }}>
              citations page
            </Link>
            . Built by Amy Sterling. Data from MICrONS, FlyWire, and neuroglancer.
          </p>
        </section>
      </div>
    </div>
  );
}
