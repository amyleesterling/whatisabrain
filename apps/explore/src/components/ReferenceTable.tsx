// Compact reference table of the raw figures, with sources living on
// /citations. Wiring distinguishes the measured myelinated fibers from the
// full (estimated) axon length.

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

export default function ReferenceTable() {
  return (
    <div className="overflow-x-auto rounded-2xl glass">
      <table className="w-full text-sm border-collapse min-w-[620px]">
        <thead>
          <tr className="text-white/50 text-[11px] uppercase tracking-[0.16em]">
            <th className="text-left font-medium p-4">Brain</th>
            <th className="text-right font-medium p-4">Neurons</th>
            <th className="text-right font-medium p-4">Synapses</th>
            <th className="text-right font-medium p-4">Axon — myelinated</th>
            <th className="text-right font-medium p-4">Axon — all (est.)</th>
          </tr>
        </thead>
        <tbody className="font-light">
          <tr className="border-t border-white/10">
            <td className="p-4" style={{ color: MOUSE }}>Mouse brain</td>
            <td className="p-4 text-right text-white/80">~70 million</td>
            <td className="p-4 text-right text-white/80">~200–300 billion</td>
            <td className="p-4 text-right text-white/60">—</td>
            <td className="p-4 text-right text-white/80">a few thousand km</td>
          </tr>
          <tr className="border-t border-white/10">
            <td className="p-4" style={{ color: HUMAN }}>Human brain</td>
            <td className="p-4 text-right text-white/80">~86 billion</td>
            <td className="p-4 text-right text-white/80">~100 trillion</td>
            <td className="p-4 text-right text-white/80">~176,000 km</td>
            <td className="p-4 text-right text-white/80">~2 million km</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
