// Simplified brain-scale stats for the wall's card 5 and the standalone
// "Brains by the numbers" page. Mouse / Human are column headers (stated
// once); each value carries a color-coded anchor so it's obvious which brain
// it describes. The full animated version lives on /scale-test.

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

type Cell = { v: string; a: string };
const STATS: { label: string; note?: string; mouse: Cell; human: Cell }[] = [
  {
    label: "Neurons",
    mouse: { v: "70 million", a: "the population of the UK" },
    human: { v: "86 billion", a: "the stars in the Milky Way" },
  },
  {
    label: "Synapses",
    mouse: { v: "~250 billion", a: "8,000 yrs to count, 1/sec" },
    human: { v: "100 trillion", a: "3 million yrs to count, 1/sec" },
  },
  {
    label: "Wiring",
    note: "all axon — not just myelinated",
    mouse: { v: "a few thousand km", a: "once across the US" },
    human: { v: "~2 million km*", a: "50× around the Earth" },
  },
];

export default function BrainStatsCompact() {
  return (
    <div>
      {/* Column headers — stated once */}
      <div className="grid grid-cols-2 gap-x-6 pb-2">
        <span className="text-xs uppercase tracking-[0.25em] flex items-center gap-1.5" style={{ color: MOUSE }}>
          <span className="w-2 h-2 rounded-full" style={{ background: MOUSE }} /> Mouse
        </span>
        <span className="text-xs uppercase tracking-[0.25em] flex items-center gap-1.5" style={{ color: HUMAN }}>
          <span className="w-2 h-2 rounded-full" style={{ background: HUMAN }} /> Human
        </span>
      </div>

      {STATS.map((s) => (
        <div key={s.label} className="border-t border-white/10 pt-3 pb-3.5">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="uppercase tracking-[0.22em] text-white/55 text-xs">{s.label}</span>
            {s.note && <span className="text-[11px] text-white/35">· {s.note}</span>}
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            {[{ c: MOUSE, d: s.mouse }, { c: HUMAN, d: s.human }].map((col, i) => (
              <div key={i}>
                <div className="font-display font-light" style={{ color: col.c, fontSize: "clamp(1.05rem, 1.4vw, 1.45rem)" }}>
                  {col.d.v}
                </div>
                <div className="mt-0.5 text-sm leading-snug" style={{ color: col.c, opacity: 0.68 }}>
                  ≈ {col.d.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-[11px] text-white/35 mt-1">* estimated — see sources</p>
    </div>
  );
}
