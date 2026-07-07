import { Link } from "react-router-dom";

// Sources, calculations & credits. Route: /citations.
// The load-bearing one is the human-brain wiring estimate, derived here in
// full so the ~2 million km figure is honest and traceable.

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-display"
        style={{ background: "rgba(183,139,255,0.12)", border: "1px solid rgba(183,139,255,0.3)", color: HUMAN }}>
        {n}
      </div>
      <div className="pb-6">
        <h3 className="font-display text-lg font-light mb-1.5">{title}</h3>
        <p className="text-white/70 leading-relaxed text-[15px]">{children}</p>
      </div>
    </div>
  );
}

export default function Citations() {
  return (
    <div className="min-h-screen w-full text-white" style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 60%)" }}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link to="/" className="text-sm text-white/45 hover:text-white/80 transition">← Inner Cosmos</Link>

        <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 mt-10 mb-4">Sources · calculations · credits</p>
        <h1 className="font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}>
          Where the numbers come from
        </h1>
        <p className="mt-5 text-lg text-white/70 leading-relaxed">
          Every figure in this experience is sourced. Most are well-established counts; the trickiest —
          the total length of wiring in a single human brain — is an <em>estimate</em>, so here is exactly
          how it's built and what it rests on.
        </p>

        {/* Wiring derivation */}
        <div className="mt-14 rounded-2xl glass p-7 sm:p-9">
          <h2 className="font-display font-light mb-2" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>
            Human brain wiring — <span style={{ color: HUMAN }}>~2 million km</span>
          </h2>
          <p className="text-white/60 mb-8 text-[15px] leading-relaxed">
            You can't count individual fibers, so you count how densely wire is packed into tissue, then
            multiply by how much tissue there is — and add the long-range tracts on top.
          </p>

          <Step n="1" title="Density — ~4.4 km of cable per mm³ of cortex">
            A cubic millimeter of cortex holds roughly <span style={{ color: HUMAN }}>~4 km of axon + ~0.4 km of dendrite ≈ 4.4 km</span>.
            The figure originates with Braitenberg &amp; Schüz's cortical statistics and is cross-checked
            independently: cat cortex measured directly at ~3.93 µm of axon + 0.39 µm of dendrite per µm³
            (= 3.93 + 0.39 km/mm³), and the MICrONS mouse reconstruction, where a cubic millimeter held
            ~4 km of axon making 500M+ synapses across 200,000+ cells.
          </Step>
          <Step n="2" title="Volume — ~500,000 mm³ of neocortical gray matter">
            A direct method comparison put cerebral cortex volume at 454 cm³ by stereology versus 530 cm³
            by MRI — bracketing ~500 cm³, i.e. 500,000 mm³.
          </Step>
          <Step n="3" title="Multiply — ≈ 2.2 million km">
            4.4 km/mm³ × 500,000 mm³ ≈ <span style={{ color: HUMAN }}>2.2 million km</span>. (Just arithmetic.)
          </Step>
          <Step n="4" title="Add the white-matter tracts — ~150,000–176,000 km">
            The one rigorously <em>measured</em> piece, from stereology on 36 brains: total myelinated fiber
            length was ~176,000 km in males and ~149,000 km in females at age 20 (Marner et al., 2003).
            Adding it lands the total around <span style={{ color: HUMAN }}>2–2.4 million km</span>.
          </Step>

          <div className="mt-3 rounded-xl p-5" style={{ background: "rgba(255,180,120,0.06)", border: "1px solid rgba(255,180,120,0.18)" }}>
            <p className="text-[13px] uppercase tracking-[0.2em] text-amber-200/70 mb-2">Honesty flag — this is an estimate</p>
            <p className="text-white/70 text-[15px] leading-relaxed">
              The famous measured figure (~176,000 km) is only the <strong>myelinated ~10%</strong>. The
              density method is how you capture the invisible other ~90% of local, unmyelinated axon — but
              that density, while measured directly in cat and mouse and consistent with the human H01
              tissue sample (Shapson-Coe et al., 2024; ~1 mm³, 130M synapses), has no published
              whole-brain <em>human</em> cable measurement behind it. An independent estimate frames the
              same split as ~850,000 km total (≈80% local, ≈20% myelinated), which anchors the low end.
              Treat it as a sound order-of-magnitude estimate, not a measurement.
            </p>
          </div>
        </div>

        {/* Other numbers */}
        <h2 className="font-display font-light mt-14 mb-4" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>The other figures</h2>
        <ul className="space-y-3 text-white/70 text-[15px] leading-relaxed">
          <li><span style={{ color: HUMAN }}>Neurons — ~86 billion (human), ~70 million (mouse).</span> The human count is the direct
            isotropic-fractionator figure (Azevedo et al., 2009); the mouse count is the standard literature value.</li>
          <li><span style={{ color: HUMAN }}>Synapses — ~100 trillion (human), ~200–300 billion (mouse).</span> Standard cortical-density
            estimates; the mouse cubic-millimeter density is confirmed directly by MICrONS.</li>
        </ul>

        {/* Credits */}
        <h2 className="font-display font-light mt-14 mb-4" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>Data, meshes &amp; tools</h2>
        <ul className="space-y-2.5 text-white/70 text-[15px]">
          <li>Cell meshes — <a className="underline decoration-white/30 hover:decoration-white" href="https://www.microns-explorer.org/" target="_blank" rel="noreferrer">MICrONS</a> minnie65 (seg_m1300), incl. Schneider-Mizell et al. 2024 inhibitory cells.</li>
          <li>Human cortex tissue anchor — the H01 dataset, Shapson-Coe et al., <em>Science</em> 2024.</li>
          <li>Mouse brain shell — <a className="underline decoration-white/30 hover:decoration-white" href="https://alleninstitute.org/" target="_blank" rel="noreferrer">Allen Institute</a> Common Coordinate Framework.</li>
          <li>Rendering &amp; connectomics tooling — <a className="underline decoration-white/30 hover:decoration-white" href="https://github.com/google/neuroglancer" target="_blank" rel="noreferrer">neuroglancer</a>, <a className="underline decoration-white/30 hover:decoration-white" href="https://flywire.ai/" target="_blank" rel="noreferrer">FlyWire</a>.</li>
        </ul>

        {/* Papers */}
        <h2 className="font-display font-light mt-14 mb-4" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>Key papers</h2>
        <ol className="space-y-3 text-white/60 text-[14px] leading-relaxed list-decimal pl-5">
          <li>Braitenberg V, Schüz A. <em>Cortex: Statistics and Geometry of Neuronal Connectivity.</em> Springer, 1998.</li>
          <li>Marner L, Nyengaard JR, Tang Y, Pakkenberg B. Marked loss of myelinated nerve fibers in the human brain with age. <em>J. Comp. Neurol.</em> 2003.</li>
          <li>Azevedo FA, et al. Equal numbers of neuronal and nonneuronal cells make the human brain an isometrically scaled-up primate brain. <em>J. Comp. Neurol.</em> 2009.</li>
          <li>Shapson-Coe A, et al. A petavoxel fragment of human cerebral cortex reconstructed at nanoscale resolution. <em>Science</em> 2024.</li>
          <li>The MICrONS Consortium. Functional connectomics spanning multiple areas of mouse visual cortex. <em>Nature</em> 2025.</li>
          <li>Schneider-Mizell CM, et al. Inhibitory specificity from a connectomic census of mouse visual cortex. <em>Nature</em> 2024.</li>
        </ol>

        <div className="mt-16 flex items-center gap-2 text-xs text-white/40">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: MOUSE }} /> Mouse
          <span className="inline-block w-2 h-2 rounded-full ml-4" style={{ background: HUMAN }} /> Human
        </div>
      </div>
    </div>
  );
}
