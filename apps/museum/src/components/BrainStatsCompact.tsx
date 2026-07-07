// Brain-scale stats: Mouse / Human as color-coded columns (stated once); each
// value carries a color-coded anchor so it's clear which brain it describes.

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

type Cell = { v: string; a: string };
const STATS: { label: string; lead?: string; mouse: Cell; human: Cell }[] = [
  {
    label: "Neurons",
    lead: "As baseballs, they'd fill Fenway Park…",
    mouse: { v: "70 million", a: "8 feet deep" },
    human: { v: "86 billion", a: "Fenway filled 28×" },
  },
  {
    label: "Synapses",
    mouse: { v: "250 billion", a: "" },
    human: { v: "100 trillion", a: "" },
  },
  {
    label: "Neuronal wiring",
    lead: "If you lined up all the neuron branches end to end…",
    mouse: { v: "~2,000 km", a: "Boston to Miami" },
    human: { v: "~2 million km", a: "50× around the Earth" },
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
          <span className="uppercase tracking-[0.22em] text-white/55 text-xs">{s.label}</span>
          {s.lead && <p className="text-[13px] text-white/45 mt-1 leading-snug">{s.lead}</p>}
          <div className="grid grid-cols-2 gap-x-6 mt-1.5">
            {[{ c: MOUSE, d: s.mouse }, { c: HUMAN, d: s.human }].map((col, i) => (
              <div key={i}>
                <div className="font-display font-light" style={{ color: col.c, fontSize: "clamp(1.05rem, 1.4vw, 1.45rem)" }}>
                  {col.d.v}
                </div>
                {col.d.a && (
                  <div className="mt-0.5 text-sm leading-snug" style={{ color: col.c, opacity: 0.68 }}>
                    ≈ {col.d.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
