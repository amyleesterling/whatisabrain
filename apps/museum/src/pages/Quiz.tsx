import { useState } from "react";
import { Link } from "react-router-dom";
import HubLogo from "../components/HubLogo";

const HUMAN = "#b78bff";
const FLY = "#ffc861";
const RIGHT = "#7be0a4";
const WRONG = "#ff9a9a";

type Q = {
  question: string;
  options: string[];
  answer: number;
  payoff: string;
  link?: { to: string; label: string };
};

// Guess-the-number quiz. Every answer's payoff is a real figure from the stats
// and fly pages, so the quiz doubles as a tour of them.
const QUESTIONS: Q[] = [
  {
    question: "How many neurons are in a human brain?",
    options: ["86 million", "86 billion", "86 trillion"],
    answer: 1,
    payoff: "About 86 billion, more than ten times every human alive on Earth.",
  },
  {
    question: "Your brain is about 2% of your body weight. How much of your energy does it burn?",
    options: ["About 2%", "About 20%", "About 50%"],
    answer: 1,
    payoff: "About 20%. It's a tiny organ with an enormous appetite. Thinking is expensive.",
  },
  {
    question: "By dry weight, what is your brain mostly made of?",
    options: ["Water", "Fat", "Protein"],
    answer: 1,
    payoff: "Roughly 60% fat. You are, structurally, thinking with butter, and that fat lets signals race at 270 mph.",
  },
  {
    question: "Scientists have mapped every neuron and connection in the brain of which animal?",
    options: ["A mouse", "A fruit fly", "A human"],
    answer: 1,
    payoff: "A fruit fly: 139,255 neurons, every wire traced (FlyWire, 2024). The mouse and human are still uncharted.",
    link: { to: "/fly", label: "See the fly brain" },
  },
  {
    question: "Laid end to end, how long is all the wiring in one human brain?",
    options: ["~2,000 km", "~200,000 km", "~2 million km"],
    answer: 2,
    payoff: "About 2 million km, enough living thread to wrap around the Earth roughly 50 times.",
    link: { to: "/stats", label: "See the numbers" },
  },
];

// Level 2: harder, more specific. Same payoff-is-a-real-fact rule.
const QUESTIONS_2: Q[] = [
  {
    question: "How fast can a signal race down a myelinated axon?",
    options: ["~3 mph", "~270 mph", "~2,700 mph"],
    answer: 1,
    payoff: "About 120 m/s, roughly 270 mph. The fatty myelin sheath is what makes it so fast.",
  },
  {
    question: "How wide is the gap a signal leaps between two neurons?",
    options: ["20 to 40 nanometers", "20 to 40 micrometers", "20 to 40 millimeters"],
    answer: 0,
    payoff: "About 20 to 40 nanometers, thousands of times thinner than a hair. Neurons never actually touch.",
  },
  {
    question: "Mapping the fly brain revealed how many distinct cell types?",
    options: ["About 840", "About 8,400", "About 84,000"],
    answer: 1,
    payoff: "8,453, and more than half of them (4,581) had never been described before.",
    link: { to: "/fly", label: "See the fly brain" },
  },
  {
    question: "Unfold your cerebral cortex and it is about the size of...",
    options: ["A postage stamp", "A large pizza box", "A tennis court"],
    answer: 1,
    payoff: "About 2.5 square feet. The wrinkles pack that whole sheet into your skull.",
    link: { to: "/stats", label: "See the numbers" },
  },
  {
    question: "Which animal's brain was the first ever mapped in full, in 1986?",
    options: ["A fruit fly", "A roundworm", "A mouse"],
    answer: 1,
    payoff: "The roundworm C. elegans, all 302 neurons. The adult fly (139,255) came 38 years later.",
  },
];

function scoreTitle(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return "Big brain energy";
  if (pct >= 0.6) return "Nicely wired";
  if (pct >= 0.3) return "Warming up those synapses";
  return "Your brain just learned something";
}

export default function Quiz() {
  const [level, setLevel] = useState(1);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = level === 1 ? QUESTIONS : QUESTIONS_2;
  const q = questions[i];
  const revealed = picked !== null;

  // Share the finished score. Built from state so the number is baked into the text.
  const shareUrl = "https://whatisabrain.com/museum/quiz";
  const shareText = `I scored ${score}/${questions.length} on the "What's a brain?" quiz${level === 2 ? " (hard mode)" : ""}. How well do you know your own brain?`;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const shareMail = `mailto:?subject=${encodeURIComponent("How well do you know your brain?")}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  function choose(idx: number) {
    if (revealed) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= questions.length) {
      setDone(true);
    } else {
      setI((n) => n + 1);
      setPicked(null);
    }
  }

  function reset(toLevel: number) {
    setLevel(toLevel);
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }
  const restart = () => reset(1);
  const startLevel2 = () => reset(2);

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 62%)" }}
    >
      <div className="sticky top-0 z-40 border-b border-white/8 bg-[#04060c]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <HubLogo className="shrink-0" />
          <Link
            to="/stats"
            className="rounded-full px-3 py-1.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white/90"
          >
            Brain stats →
          </Link>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-3xl flex-col justify-center px-6 py-12">
        {!done ? (
          <>
            {/* Progress */}
            <div className="mb-8 flex items-center gap-2">
              {questions.map((_, n) => (
                <span
                  key={n}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{ background: n < i ? HUMAN : n === i ? "rgba(183,139,255,0.5)" : "rgba(255,255,255,0.1)" }}
                />
              ))}
            </div>

            <p className="mb-2 text-[11px] uppercase tracking-[0.32em] text-white/45">
              {level === 2 ? "Hard mode · " : ""}Question {i + 1} of {questions.length}
            </p>
            <h1 className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-tight">
              {q.question}
            </h1>

            <div className="mt-8 grid gap-3">
              {q.options.map((opt, idx) => {
                const isAnswer = idx === q.answer;
                const isPicked = idx === picked;
                let border = "rgba(255,255,255,0.12)";
                let bg = "rgba(255,255,255,0.03)";
                let ring = "";
                if (revealed && isAnswer) {
                  border = RIGHT;
                  bg = "rgba(123,224,164,0.1)";
                } else if (revealed && isPicked && !isAnswer) {
                  border = WRONG;
                  bg = "rgba(255,154,154,0.08)";
                }
                if (!revealed) ring = "hover:border-white/30 hover:bg-white/[0.06]";
                return (
                  <button
                    key={opt}
                    onClick={() => choose(idx)}
                    disabled={revealed}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-lg transition ${ring} ${
                      revealed ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{ borderColor: border, background: bg }}
                  >
                    <span className={revealed && !isAnswer && !isPicked ? "text-white/45" : "text-white"}>{opt}</span>
                    {revealed && isAnswer && <span style={{ color: RIGHT }}>✓</span>}
                    {revealed && isPicked && !isAnswer && <span style={{ color: WRONG }}>✕</span>}
                  </button>
                );
              })}
            </div>

            {/* Reveal payoff */}
            {revealed && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[15px] leading-relaxed text-white/80">
                  {picked === q.answer ? (
                    <span style={{ color: RIGHT }} className="font-medium">Correct. </span>
                  ) : (
                    <span style={{ color: WRONG }} className="font-medium">Not quite. </span>
                  )}
                  {q.payoff}
                </p>
                {q.link && (
                  <Link
                    to={q.link.to}
                    className="mt-3 inline-block text-sm underline decoration-white/25 transition hover:text-white"
                    style={{ color: q.link.to === "/fly" ? FLY : HUMAN }}
                  >
                    {q.link.label} →
                  </Link>
                )}
                <div className="mt-5">
                  <button
                    onClick={next}
                    className="rounded-full px-6 py-2.5 text-sm font-medium transition"
                    style={{ background: "rgba(183,139,255,0.16)", border: "1px solid rgba(183,139,255,0.4)", color: HUMAN }}
                  >
                    {i + 1 >= questions.length ? "See your score" : "Next question →"}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Score screen */
          <div className="text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/45">
              {level === 2 ? "Hard mode score" : "Your score"}
            </p>
            <p className="font-display font-light leading-none" style={{ color: HUMAN, fontSize: "clamp(3.5rem,12vw,7rem)" }}>
              {score}<span className="text-white/30">/{questions.length}</span>
            </p>
            <h1 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-light">{scoreTitle(score, questions.length)}</h1>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/65">
              {level === 1
                ? "Every answer here is a real number from the brain. Think you can take on a harder round?"
                : "Every answer here is a real number from the brain. You took on the hard round, respect."}
            </p>

            {level === 1 && (
              <div className="mt-6">
                <button
                  onClick={startLevel2}
                  className="rounded-full px-6 py-3 text-sm font-semibold transition"
                  style={{ background: "rgba(255,200,97,0.16)", border: "1px solid rgba(255,200,97,0.45)", color: FLY }}
                >
                  Level 2: harder questions →
                </button>
              </div>
            )}

            {/* Share */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/40">Share your score</span>
              <a
                href={shareX}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 transition hover:bg-white/12"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 1.6h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.1l7.7-8.8L.7 1.6h6.8l4.7 6.2 5.7-6.2Zm-1.2 18.1h1.8L6.4 3.4H4.5l13.2 16.3Z" />
                </svg>
                Post on X
              </a>
              <a
                href={shareMail}
                aria-label="Share by email"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 transition hover:bg-white/12"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email
              </a>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={restart}
                className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
              >
                Play again
              </button>
              <Link
                to="/stats"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition"
                style={{ background: "rgba(183,139,255,0.16)", border: "1px solid rgba(183,139,255,0.4)", color: HUMAN }}
              >
                Brains by the numbers →
              </Link>
              <Link
                to="/fly"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition"
                style={{ background: "rgba(255,200,97,0.14)", border: "1px solid rgba(255,200,97,0.35)", color: FLY }}
              >
                The fly we mapped →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
