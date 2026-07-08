import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type StringKey } from "./en";
import { zh } from "./zh";

export type Lang = "en" | "zh";
const DICTS: Record<Lang, Partial<Record<StringKey, string>>> = { en, zh };
const LANGS: Lang[] = ["en", "zh"];
const STORAGE_KEY = "wab-lang";

function detectLang(): Lang {
  try {
    const url = new URLSearchParams(window.location.search).get("lang");
    if (url && (LANGS as string[]).includes(url)) return url as Lang;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  } catch {
    /* SSR / storage blocked */
  }
  return "en";
}

/** Translate a key, with optional {placeholder} substitution. Falls back to
 *  English, then to the raw key, so a missing translation never blanks the UI. */
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

/** Small EN / 中文 pill. Drop it into any top bar. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`inline-flex overflow-hidden rounded-full border border-white/15 text-[11px] ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="px-2.5 py-1 transition"
          style={
            lang === l
              ? { background: "rgba(255,255,255,0.14)", color: "#fff" }
              : { color: "rgba(255,255,255,0.5)" }
          }
        >
          {l === "en" ? t("site.lang.en") : t("site.lang.zh")}
        </button>
      ))}
    </div>
  );
}
