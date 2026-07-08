import type { StringKey } from "./en";

// Simplified Chinese. Any key missing here falls back to English automatically,
// so this can be filled in incrementally.
//
// The UI chrome below is seeded so the language toggle works today. For the
// QUESTION / STORY / FACT content, paste DeepSeek's output (from
// i18n/zh-translation-request.md) over the matching keys — the key names are
// identical, so it's a drop-in.
export const zh: Partial<Record<StringKey, string>> = {
  // --- site-wide (seeded) ---
  "site.brand": "大脑是什么？",
  "site.home.aria": "大脑是什么？— 首页",
  "site.lang.en": "EN",
  "site.lang.zh": "中文",

  // --- quiz chrome (seeded) ---
  "quiz.topbar.stats": "大脑数据 →",
  "quiz.progress": "第 {n} 题 / 共 {total} 题",
  "quiz.hardmode": "困难模式",
  "quiz.expertmode": "专家模式",
  "quiz.next": "下一题 →",
  "quiz.seescore": "查看得分",
  "quiz.reveal.correct": "答对了。",
  "quiz.reveal.wrong": "还差一点。",
  "quiz.score.label": "你的得分",
  "quiz.score.label.suffix": "得分",
  "quiz.title.perfect": "大脑火力全开",
  "quiz.title.good": "脑回路清晰",
  "quiz.title.mid": "突触正在预热",
  "quiz.title.low": "你的大脑刚学到了新东西",
  "quiz.score.sub.l1": "这里每个答案都是真实的大脑数据。敢不敢来点更难的？",
  "quiz.score.sub.l2": "干得漂亮。再来一轮，这次是专家级。还敢吗？",
  "quiz.score.sub.l3": "这里每个答案都是真实的大脑数据。三轮全部通关，了不起。",
  "quiz.cta.level2": "第二关：更难的题 →",
  "quiz.cta.level3": "第三关：专家模式 →",
  "quiz.share.label": "分享你的得分",
  "quiz.share.x": "发到 X",
  "quiz.share.email": "邮件",
  "quiz.share.text": "我在「大脑是什么？」测验中得了 {score}/{total} 分{mode}。你有多了解自己的大脑？",
  "quiz.share.subject": "你有多了解自己的大脑？",
  "quiz.playagain": "再玩一次",
  "quiz.cta.stats": "大脑数据一览 →",
  "quiz.cta.fly": "我们绘制的果蝇大脑 →",

  // --- teach chrome (seeded) ---
  "teach.print": "打印本指南",
  "teach.academy.cta": "访问 FlyWire Academy →",

  // NOTE: quiz question/option/payoff text and the rest of the teach copy
  // fall back to English until DeepSeek's translation is pasted here.
};
