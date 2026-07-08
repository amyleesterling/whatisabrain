import type { StringKey } from "./en";

// Português (Brasil). Missing keys fall back to English, so this fills in
// incrementally. UI chrome is seeded so the language menu works today; paste
// DeepSeek's Portuguese output (from translation-request.md, target = Brazilian
// Portuguese) over the matching keys for the question / story / fact content.
export const pt: Partial<Record<StringKey, string>> = {
  // --- site-wide (seeded) ---
  "site.brand": "O que é um cérebro?",
  "site.home.aria": "O que é um cérebro? — início",
  "site.lang.request": "Solicitar um idioma",

  // --- quiz chrome (seeded) ---
  "quiz.topbar.stats": "Dados do cérebro →",
  "quiz.progress": "Pergunta {n} de {total}",
  "quiz.hardmode": "Modo difícil",
  "quiz.expertmode": "Modo especialista",
  "quiz.next": "Próxima pergunta →",
  "quiz.seescore": "Ver sua pontuação",
  "quiz.reveal.correct": "Correto.",
  "quiz.reveal.wrong": "Quase.",
  "quiz.score.label": "Sua pontuação",
  "quiz.score.mode": "Pontuação ({mode})",
  "quiz.title.perfect": "Cérebro a mil",
  "quiz.title.good": "Bem conectado",
  "quiz.title.mid": "Aquecendo as sinapses",
  "quiz.title.low": "Seu cérebro acabou de aprender algo",
  "quiz.score.sub.l1": "Cada resposta aqui é um número real do cérebro. Encara uma rodada mais difícil?",
  "quiz.score.sub.l2": "Muito bem. Mais uma rodada, e esta é nível especialista. Topa?",
  "quiz.score.sub.l3": "Cada resposta aqui é um número real do cérebro. Você passou pelas três rodadas, herói.",
  "quiz.cta.level2": "Nível 2: perguntas mais difíceis →",
  "quiz.cta.level3": "Nível 3: modo especialista →",
  "quiz.share.label": "Compartilhe sua pontuação",
  "quiz.share.x": "Postar no X",
  "quiz.share.email": "E-mail",
  "quiz.share.text": "Fiz {score}/{total} no quiz \"O que é um cérebro?\"{mode}. Quanto você conhece o seu próprio cérebro?",
  "quiz.share.subject": "Quanto você conhece o seu cérebro?",
  "quiz.playagain": "Jogar de novo",
  "quiz.cta.stats": "O cérebro em números →",
  "quiz.cta.fly": "A mosca que mapeamos →",

  // --- teach chrome (seeded) ---
  "teach.print": "Imprimir este guia",
  "teach.academy.cta": "Acessar a FlyWire Academy →",
};
