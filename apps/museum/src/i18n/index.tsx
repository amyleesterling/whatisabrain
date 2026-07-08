import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type StringKey } from "./en";
import { zh } from "./zh";
import { pt } from "./pt";
import { LANGS, LANG_CODES, type Lang } from "./langs";

const DICTS: Record<Lang, Partial<Record<StringKey, string>>> = { en, zh, pt };
const STORAGE_KEY = "wab-lang";

function isLang(x: string | null | undefined): x is Lang {
  return !!x && (LANG_CODES as string[]).includes(x);
}

/** Pick the starting language: explicit ?lang → saved choice → browser
 *  language (auto) → English. A pt-BR / zh-CN browser matches pt / zh. */
function detectLang(): Lang {
  try {
    const url = new URLSearchParams(window.location.search).get("lang");
    if (isLang(url)) return url;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
    const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const p of prefs) {
      const base = p.toLowerCase().split("-")[0];
      if (isLang(base)) return base;
    }
  } catch {
    /* SSR / storage blocked */
  }
  return "en";
}

export type TFn = (key: StringKey, vars?: Record<string, string | number>) => string;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TFn;
}
const I18nCtx = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback<TFn>(
    (key, vars) => {
      let s = DICTS[lang][key] ?? en[key] ?? (key as string);
      if (vars) {
        for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      }
      return s;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n(): I18nValue {
  const v = useContext(I18nCtx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}

export function useT(): TFn {
  return useI18n().t;
}

const REQUEST_HREF =
  "mailto:amyleerobinson@gmail.com" +
  "?subject=" + encodeURIComponent("Language request — What's a brain?") +
  "&body=" + encodeURIComponent("I'd love to see What's a brain? in: ");

/** Globe dropdown listing every registered language by its native name, plus a
 *  "request a language" mailto. Scales to any number of languages. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[12px] text-white/80 transition hover:bg-white/5"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21C9.5 18.5 8.2 15.3 8.2 12S9.5 5.5 12 3Z" />
        </svg>
        {current.native}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="listbox"
            className="absolute right-0 z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-xl border border-white/12 bg-[#0b1120]/95 py-1 text-sm shadow-2xl backdrop-blur-xl"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3.5 py-2 text-left transition hover:bg-white/8"
                style={{ color: l.code === lang ? "#fff" : "rgba(255,255,255,0.65)" }}
              >
                {l.native}
                {l.code === lang && <span style={{ color: "#7ee0ff" }}>✓</span>}
              </button>
            ))}
            <div className="my-1 border-t border-white/10" />
            <a
              href={REQUEST_HREF}
              className="block px-3.5 py-2 text-white/55 transition hover:bg-white/8 hover:text-white/85"
            >
              {t("site.lang.request")} →
            </a>
          </div>
        </>
      )}
    </div>
  );
}
