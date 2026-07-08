// The one place to add a language. Add a row here, create its dict file
// (e.g. pt.ts), and register it in index.tsx — the dropdown + auto-detect pick
// it up automatically. Native names are shown in the menu (a French speaker
// looks for "Français", not "French").
export const LANGS = [
  { code: "en", native: "English" },
  { code: "zh", native: "中文" },
  { code: "ko", native: "한국어" },
  { code: "pt", native: "Português" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];
export const LANG_CODES = LANGS.map((l) => l.code) as Lang[];
