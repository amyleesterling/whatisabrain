import { Link } from "react-router-dom";
import HubLogo from "../components/HubLogo";
import { LangToggle, useT } from "../i18n";
import type { StringKey } from "../i18n/en";

const HUMAN = "#b78bff";
const CYAN = "#7ee0ff";
const FLY = "#ffc861";

const WAYS: { color: string; title: StringKey; body: StringKey; to: string; cta: StringKey }[] = [
  { color: CYAN, title: "teach.way1.title", body: "teach.way1.body", to: "/wall", cta: "teach.way1.cta" },
  { color: HUMAN, title: "teach.way2.title", body: "teach.way2.body", to: "/stats", cta: "teach.way2.cta" },
  { color: FLY, title: "teach.way3.title", body: "teach.way3.body", to: "/quiz", cta: "teach.way3.cta" },
];

const DISCUSS: StringKey[] = ["teach.discuss.q1", "teach.discuss.q2", "teach.discuss.q3", "teach.discuss.q4"];

const KNOW: { title: StringKey; body: StringKey }[] = [
  { title: "teach.know1.title", body: "teach.know1.body" },
  { title: "teach.know2.title", body: "teach.know2.body" },
  { title: "teach.know3.title", body: "teach.know3.body" },
];

export default function Teach() {
  const t = useT();
  return (
    <div
      className="teach-page min-h-screen w-full text-white"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 62%)" }}
    >
      <div className="sticky top-0 z-40 border-b border-white/8 bg-[#04060c]/72 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <HubLogo className="shrink-0" />
          <div className="flex items-center gap-3">
            <LangToggle />
            <button
              onClick={() => window.print()}
              className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm text-white/85 transition hover:bg-white/12"
            >
              {t("teach.print")}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em]" style={{ color: CYAN }}>
          {t("teach.eyebrow")}
        </p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] print:text-black">
          {t("teach.h1")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 print:text-black/70">
          {t("teach.intro")}
        </p>

        {/* Ways to use it */}
        <section className="mt-12">
          <h2 className="mb-5 font-display text-2xl font-light print:text-black">{t("teach.ways.h2")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {WAYS.map((w) => (
              <div
                key={w.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 print:border-black/15"
              >
                <span className="mb-3 h-1.5 w-10 rounded-full" style={{ background: w.color }} />
                <h3 className="font-display text-lg font-light print:text-black">{t(w.title)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65 print:text-black/70">{t(w.body)}</p>
                <Link
                  to={w.to}
                  className="mt-4 inline-block text-sm underline decoration-white/25 transition hover:text-white print:hidden"
                  style={{ color: w.color }}
                >
                  {t(w.cta)} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Discussion questions */}
        <section className="mt-14">
          <h2 className="mb-2 font-display text-2xl font-light print:text-black">{t("teach.discuss.h2")}</h2>
          <p className="mb-6 max-w-2xl leading-relaxed text-white/60 print:text-black/60">
            {t("teach.discuss.intro")}
          </p>
          <ol className="space-y-4">
            {DISCUSS.map((qKey, n) => (
              <li key={qKey} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 print:border-black/15">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm"
                  style={{ background: "rgba(183,139,255,0.14)", border: "1px solid rgba(183,139,255,0.3)", color: HUMAN }}
                >
                  {n + 1}
                </span>
                <p className="leading-relaxed text-white/80 print:text-black/80">{t(qKey)}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Good to know */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          {KNOW.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 print:border-black/15">
              <h3 className="font-display text-lg font-light print:text-black">{t(c.title)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60 print:text-black/70">{t(c.body)}</p>
            </div>
          ))}
        </section>

        {/* FlyWire Academy — for older students */}
        <section
          className="mt-12 rounded-2xl p-6 sm:p-7 print:border print:border-black/15"
          style={{ background: "rgba(255,200,97,0.06)", border: "1px solid rgba(255,200,97,0.25)" }}
        >
          <p className="mb-1 text-[11px] uppercase tracking-[0.28em]" style={{ color: FLY }}>
            {t("teach.academy.eyebrow")}
          </p>
          <h2 className="font-display text-2xl font-light print:text-black">{t("teach.academy.h2")}</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-white/70 print:text-black/70">
            {t("teach.academy.body")}
          </p>
          <a
            href="https://flywire.ai/academy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm underline decoration-white/25 transition hover:text-white print:hidden"
            style={{ color: FLY }}
          >
            {t("teach.academy.cta")}
          </a>
        </section>

        {/* Sources note */}
        <section className="mt-6 rounded-2xl glass p-6 print:border print:border-black/15 print:bg-white">
          <p className="text-[15px] leading-relaxed text-white/70 print:text-black/70">
            {t("teach.sources.pre")}{" "}
            <Link to="/citations" className="underline decoration-white/30 hover:text-white" style={{ color: HUMAN }}>
              {t("teach.sources.link")}
            </Link>
            {t("teach.sources.post")}
          </p>
        </section>

        {/* Byline + contact — their own bottom row */}
        <section className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/60 print:text-black/70">{t("teach.byline")}</p>
          <p className="text-white/60 print:text-black/70">
            <a
              href="https://x.com/amyneurons"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
              style={{ color: CYAN }}
            >
              @amyneurons
            </a>{" "}
            {t("teach.contact.pre")}
          </p>
        </section>
      </div>
    </div>
  );
}
