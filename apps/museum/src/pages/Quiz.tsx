import { useState } from "react";
import { Link } from "react-router-dom";
import HubLogo from "../components/HubLogo";
import { LangToggle, useT } from "../i18n";
import type { StringKey } from "../i18n/en";

const HUMAN = "#b78bff";
const FLY = "#ffc861";
const RIGHT = "#7be0a4";
const WRONG = "#ff9a9a";

// Questions hold i18n KEYS, not English. The English (and Chinese) text lives in
// i18n/en.ts + i18n/zh.ts, so the quiz translates without touching this file.
type Q = {
  question: StringKey;
  options: StringKey[];
  answer: number;
  payoff: StringKey;
  link?: { to: string; label: StringKey };
};

const QUESTIONS: Q[] = [
  { question: "quiz.l1.q1", options: ["quiz.l1.q1.o1", "quiz.l1.q1.o2", "quiz.l1.q1.o3"], answer: 1, payoff: "quiz.l1.q1.payoff" },
  { question: "quiz.l1.q2", options: ["quiz.l1.q2.o1", "quiz.l1.q2.o2", "quiz.l1.q2.o3"], answer: 1, payoff: "quiz.l1.q2.payoff" },
  { question: "quiz.l1.q3", options: ["quiz.l1.q3.o1", "quiz.l1.q3.o2", "quiz.l1.q3.o3"], answer: 1, payoff: "quiz.l1.q3.payoff" },
  { question: "quiz.l1.q4", options: ["quiz.l1.q4.o1", "quiz.l1.q4.o2", "quiz.l1.q4.o3"], answer: 1, payoff: "quiz.l1.q4.payoff", link: { to: "/fly", label: "quiz.l1.q4.link" } },
  { question: "quiz.l1.q5", options: ["quiz.l1.q5.o1", "quiz.l1.q5.o2", "quiz.l1.q5.o3"], answer: 2, payoff: "quiz.l1.q5.payoff", link: { to: "/stats", label: "quiz.l1.q5.link" } },
];

const QUESTIONS_2: Q[] = [
  { question: "quiz.l2.q1", options: ["quiz.l2.q1.o1", "quiz.l2.q1.o2", "quiz.l2.q1.o3"], answer: 1, payoff: "quiz.l2.q1.payoff" },
  { question: "quiz.l2.q2", options: ["quiz.l2.q2.o1", "quiz.l2.q2.o2", "quiz.l2.q2.o3"], answer: 0, payoff: "quiz.l2.q2.payoff" },
  { question: "quiz.l2.q3", options: ["quiz.l2.q3.o1", "quiz.l2.q3.o2", "quiz.l2.q3.o3"], answer: 1, payoff: "quiz.l2.q3.payoff", link: { to: "/fly", label: "quiz.l2.q3.link" } },
  { question: "quiz.l2.q4", options: ["quiz.l2.q4.o1", "quiz.l2.q4.o2", "quiz.l2.q4.o3"], answer: 1, payoff: "quiz.l2.q4.payoff", link: { to: "/stats", label: "quiz.l2.q4.link" } },
  { question: "quiz.l2.q5", options: ["quiz.l2.q5.o1", "quiz.l2.q5.o2", "quiz.l2.q5.o3"], answer: 1, payoff: "quiz.l2.q5.payoff" },
];

const QUESTIONS_3: Q[] = [
  { question: "quiz.l3.q1", options: ["quiz.l3.q1.o1", "quiz.l3.q1.o2", "quiz.l3.q1.o3"], answer: 0, payoff: "quiz.l3.q1.payoff" },
  { question: "quiz.l3.q2", options: ["quiz.l3.q2.o1", "quiz.l3.q2.o2", "quiz.l3.q2.o3"], answer: 0, payoff: "quiz.l3.q2.payoff" },
  { question: "quiz.l3.q3", options: ["quiz.l3.q3.o1", "quiz.l3.q3.o2", "quiz.l3.q3.o3"], answer: 0, payoff: "quiz.l3.q3.payoff" },
  { question: "quiz.l3.q4", options: ["quiz.l3.q4.o1", "quiz.l3.q4.o2", "quiz.l3.q4.o3"], answer: 1, payoff: "quiz.l3.q4.payoff" },
  { question: "quiz.l3.q5", options: ["quiz.l3.q5.o1", "quiz.l3.q5.o2", "quiz.l3.q5.o3"], answer: 2, payoff: "quiz.l3.q5.payoff" },
];

function scoreTitleKey(score: number, total: number): StringKey {
  const pct = score / total;
  if (pct === 1) return "quiz.title.perfect";
  if (pct >= 0.6) return "quiz.title.good";
  if (pct >= 0.3) return "quiz.title.mid";
  return "quiz.title.low";
}

export default function Quiz() {
  const t = useT();
  const [level, setLevel] = useState(1);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = level === 1 ? QUESTIONS : level === 2 ? QUESTIONS_2 : QUESTIONS_3;
  const levelKey: StringKey | null = level === 2 ? "quiz.hardmode" : level === 3 ? "quiz.expertmode" : null;
  const levelName = levelKey ? t(levelKey) : "";
  const q = questions[i];
  const revealed = picked !== null;

  // Share the finished score. Text + subject come from the dictionary so they
  // translate; the number is interpolated in.
  const shareUrl = "https://whatisabrain.com/museum/quiz";
  const shareText = t("quiz.share.text", {
    score,
    total: questions.length,
    mode: levelName ? ` (${levelName})` : "",
  });
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const shareMail = `mailto:?subject=${encodeURIComponent(t("quiz.share.subject"))}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

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

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 62%)" }}
    >
      <div className="sticky top-0 z-40 border-b border-white/8 bg-[#04060c]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <HubLogo className="shrink-0" />
          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              to="/stats"
              className="rounded-full px-3 py-1.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white/90"
            >
              {t("quiz.topbar.stats")}
            </Link>
          </div>
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
              {levelName ? `${levelName} · ` : ""}
              {t("quiz.progress", { n: i + 1, total: questions.length })}
            </p>
            <h1 className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-tight">
              {t(q.question)}
            </h1>

            <div className="mt-8 grid gap-3">
              {q.options.map((optKey, idx) => {
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
                    key={optKey}
                    onClick={() => choose(idx)}
                    disabled={revealed}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-lg transition ${ring} ${
                      revealed ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{ borderColor: border, background: bg }}
                  >
                    <span className={revealed && !isAnswer && !isPicked ? "text-white/45" : "text-white"}>{t(optKey)}</span>
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
                    <span style={{ color: RIGHT }} className="font-medium">{t("quiz.reveal.correct")} </span>
                  ) : (
                    <span style={{ color: WRONG }} className="font-medium">{t("quiz.reveal.wrong")} </span>
                  )}
                  {t(q.payoff)}
                </p>
                {q.link && (
                  <Link
                    to={q.link.to}
                    className="mt-3 inline-block text-sm underline decoration-white/25 transition hover:text-white"
                    style={{ color: q.link.to === "/fly" ? FLY : HUMAN }}
                  >
                    {t(q.link.label)} →
                  </Link>
                )}
                <div className="mt-5">
                  <button
                    onClick={next}
                    className="rounded-full px-6 py-2.5 text-sm font-medium transition"
                    style={{ background: "rgba(183,139,255,0.16)", border: "1px solid rgba(183,139,255,0.4)", color: HUMAN }}
                  >
                    {i + 1 >= questions.length ? t("quiz.seescore") : t("quiz.next")}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Score screen */
          <div className="text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/45">
              {levelName ? t("quiz.score.mode", { mode: levelName }) : t("quiz.score.label")}
            </p>
            <p className="font-display font-light leading-none" style={{ color: HUMAN, fontSize: "clamp(3.5rem,12vw,7rem)" }}>
              {score}<span className="text-white/30">/{questions.length}</span>
            </p>
            <h1 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-light">
              {t(scoreTitleKey(score, questions.length))}
            </h1>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/65">
              {level === 1 ? t("quiz.score.sub.l1") : level === 2 ? t("quiz.score.sub.l2") : t("quiz.score.sub.l3")}
            </p>

            {level < 3 && (
              <div className="mt-6">
                <button
                  onClick={() => reset(level + 1)}
                  className="rounded-full px-6 py-3 text-sm font-semibold transition"
                  style={{ background: "rgba(255,200,97,0.16)", border: "1px solid rgba(255,200,97,0.45)", color: FLY }}
                >
                  {level === 1 ? t("quiz.cta.level2") : t("quiz.cta.level3")}
                </button>
              </div>
            )}

            {/* Share */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/40">{t("quiz.share.label")}</span>
              <a
                href={shareX}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("quiz.share.x")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 transition hover:bg-white/12"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 1.6h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.1l7.7-8.8L.7 1.6h6.8l4.7 6.2 5.7-6.2Zm-1.2 18.1h1.8L6.4 3.4H4.5l13.2 16.3Z" />
                </svg>
                {t("quiz.share.x")}
              </a>
              <a
                href={shareMail}
                aria-label={t("quiz.share.email")}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 transition hover:bg-white/12"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {t("quiz.share.email")}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={restart}
                className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
              >
                {t("quiz.playagain")}
              </button>
              <Link
                to="/stats"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition"
                style={{ background: "rgba(183,139,255,0.16)", border: "1px solid rgba(183,139,255,0.4)", color: HUMAN }}
              >
                {t("quiz.cta.stats")}
              </Link>
              <Link
                to="/fly"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition"
                style={{ background: "rgba(255,200,97,0.14)", border: "1px solid rgba(255,200,97,0.35)", color: FLY }}
              >
                {t("quiz.cta.fly")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
