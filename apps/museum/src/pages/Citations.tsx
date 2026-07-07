import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Sources, calculations & credits. Route: /citations.
// The load-bearing one is the human-brain wiring estimate, derived here in
// full so the ~2 million km figure is honest and traceable.

const MOUSE = "#7ee0ff";
const HUMAN = "#b78bff";

// Every cell shown in the experience, all real MICrONS minnie65 (seg_m1300)
// reconstructions. [nickname, type, seg ID].
const CELLS: [string, string, string][] = [
  ["Lightning Tree", "Layer 5 thick-tufted pyramidal", "864691135572530981"],
  ["Crown", "Layer 2/3 pyramidal", "864691135855890478"],
  ["Dust Star", "Layer 4 cell", "864691135279086497"],
  ["Spire", "Pyramidal neuron", "864691135214123064"],
  ["Coral Fan", "Parvalbumin basket cell", "864691136662432990"],
  ["Candelabra", "Chandelier cell", "864691135572094189"],
  ["Reaching Hand", "Martinotti cell", "864691135919630768"],
  ["Spindle", "Bipolar interneuron", "864691135407923657"],
  ["Forest Floor", "Protoplasmic astrocyte", "864691135113162137"],
  ["Watcher", "Microglia", "864691136194411734"],
  ["Aura", "Layer 5 thick-tufted pyramidal (synapse stage)", "864691135948123745"],
  ["Tendril", "Long-range axon (synapse stage)", "864691136195546856"],
];

function Step({ n, title, source, children }: { n: string; title: string; source: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-display"
        style={{ background: "rgba(183,139,255,0.12)", border: "1px solid rgba(183,139,255,0.3)", color: HUMAN }}>
        {n}
      </div>
      <div className="pb-6">
        <h3 className="font-display text-lg font-light mb-1.5">{title}</h3>
        <p className="text-white/70 leading-relaxed text-[15px]">{children}</p>
        <p className="mt-2 text-[13px] text-white/45">
          <span className="uppercase tracking-[0.15em] text-white/35">Source</span> · {source}
        </p>
      </div>
    </div>
  );
}

export default function Citations() {
  // Deep links like /citations#landmark-comparisons should jump to the section.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <div className="min-h-screen w-full text-white" style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 60%)" }}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link to="/" className="text-sm text-white/45 hover:text-white/80 transition">← Inner Cosmos</Link>

        <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 mt-10 mb-4">Internal reference</p>
        <h1 className="font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}>
          Citations &amp; Calculations
        </h1>
        <p className="mt-5 text-lg text-white/70 leading-relaxed">
          Every figure in this experience is sourced. Most are well-established counts; the trickiest,
          the total length of wiring in a single human brain, is an <em>estimate</em>, so here is exactly
          how it's built and what it rests on.
        </p>

        {/* Wiring derivation */}
        <div className="mt-14 rounded-2xl glass p-7 sm:p-9">
          <h2 className="font-display font-light mb-2" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>
            Human brain wiring: <span style={{ color: HUMAN }}>~2 million km</span>
          </h2>
          <p className="text-white/60 mb-8 text-[15px] leading-relaxed">
            You can't count individual fibers, so you count how densely wire is packed into tissue, then
            multiply by how much tissue there is, then add the long-range tracts on top.
          </p>

          <Step
            n="1"
            title="Density: ~4.4 km of cable per mm³ of cortex"
            source={<>Braitenberg &amp; Schüz, <em>Cortex: Statistics and Geometry of Neuronal Connectivity</em> (1998). Cross-checked in cat cortex, and in the MICrONS mouse reconstruction (~4 km of axon, 500M+ synapses per mm³; <a className="underline decoration-white/30 hover:decoration-white" href="https://www.nih.gov/news-events/news-releases/scientists-map-unprecedented-detail-connections-visual-perception-mouse-brain" target="_blank" rel="noreferrer">NIH, 2025</a>).</>}
          >
            A cubic millimeter of cortex holds roughly <span style={{ color: HUMAN }}>~4 km of axon + ~0.4 km of dendrite ≈ 4.4 km</span>.
            The figure originates with Braitenberg &amp; Schüz's cortical statistics and is cross-checked
            independently: cat cortex measured directly at ~3.93 µm of axon + 0.39 µm of dendrite per µm³
            (= 3.93 + 0.39 km/mm³), and the MICrONS mouse reconstruction, where a cubic millimeter held
            ~4 km of axon making 500M+ synapses across 200,000+ cells.
          </Step>
          <Step
            n="2"
            title="Volume: ~500,000 mm³ of neocortical gray matter"
            source={<>García-Fiñana, Cruz-Orive, Mackay, Pakkenberg &amp; Roberts, <em>NeuroImage</em> <strong>18</strong>:505–516 (2003) — postmortem MRI vs Cavalieri physical sectioning (<a className="underline decoration-white/30 hover:decoration-white" href="https://pubmed.ncbi.nlm.nih.gov/12595203/" target="_blank" rel="noreferrer">PMID 12595203</a>).</>}
          >
            A direct method comparison put cerebral cortex volume at 454 cm³ by stereology versus 530 cm³
            by MRI, bracketing ~500 cm³, i.e. 500,000 mm³.
          </Step>
          <Step n="3" title="Multiply: ≈ 2.2 million km" source={<>Arithmetic: 4.4 × 500,000. No external source.</>}>
            4.4 km/mm³ × 500,000 mm³ ≈ <span style={{ color: HUMAN }}>2.2 million km</span>. (Just arithmetic.)
          </Step>
          <Step
            n="4"
            title="Add the white-matter tracts: ~150,000–176,000 km"
            source={<>Marner, Nyengaard, Tang &amp; Pakkenberg, <em>J. Comp. Neurol.</em> (2003), stereology on 36 brains.</>}
          >
            The one rigorously <em>measured</em> piece, from stereology on 36 brains: total myelinated fiber
            length was ~176,000 km in males and ~149,000 km in females at age 20 (Marner et al., 2003).
            Adding it lands the total around <span style={{ color: HUMAN }}>2–2.4 million km</span>.
          </Step>

          <div className="mt-3 rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <p className="text-white/60 text-[14px] leading-relaxed">
              This is an estimate, not a direct measurement: only the myelinated ~10% (~176,000 km) has been
              measured whole-brain (Marner et al., 2003). The density that captures the rest is measured
              directly in cat and mouse and matches the human H01 sample (Shapson-Coe et al., 2024; ~1 mm³,
              130M synapses); an independent estimate puts the total nearer ~850,000 km.
            </p>
          </div>
        </div>

        {/* Mouse wiring */}
        <div className="mt-6 rounded-2xl glass p-7 sm:p-9">
          <h2 className="font-display font-light mb-2" style={{ fontSize: "clamp(1.4rem,2.3vw,1.9rem)" }}>
            Mouse brain wiring: <span style={{ color: MOUSE }}>~2,000 km</span> <span className="text-white/50">(~1,250 mi)</span>
          </h2>
          <p className="text-white/70 text-[15px] leading-relaxed">
            The same density method applied to the whole mouse brain: ~4.4 km/mm³ × the ~500 mm³ mouse
            brain ≈ 2,200 km. The density is anchored by the MICrONS reconstruction of mouse visual cortex,
            where a single cubic millimeter held ~4 km of axon.
          </p>
          <p className="mt-2 text-[13px] text-white/45">
            <span className="uppercase tracking-[0.15em] text-white/35">Source</span> ·{" "}
            <a className="underline decoration-white/30 hover:decoration-white" href="https://www.nih.gov/news-events/news-releases/scientists-map-unprecedented-detail-connections-visual-perception-mouse-brain" target="_blank" rel="noreferrer">NIH / MICrONS, 2025</a>; density from Braitenberg &amp; Schüz (1998).
          </p>
        </div>

        {/* Other numbers */}
        <h2 className="font-display font-light mt-14 mb-4" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>The other figures</h2>
        <ul className="space-y-3 text-white/70 text-[15px] leading-relaxed">
          <li><span style={{ color: HUMAN }}>Neurons: ~86 billion (human), ~70 million (mouse).</span> The human count is the direct
            isotropic-fractionator figure (Azevedo et al., 2009); the mouse count is the standard literature value.</li>
          <li><span style={{ color: HUMAN }}>Synapses: ~100 trillion (human), ~200–300 billion (mouse).</span> Standard cortical-density
            estimates; the mouse cubic-millimeter density is confirmed directly by MICrONS.</li>
        </ul>

        {/* Fenway baseball framing — the anchor used on the stats pages */}
        <div className="mt-8 rounded-2xl glass p-7 sm:p-9">
          <h2 className="font-display font-light mb-2" style={{ fontSize: "clamp(1.4rem,2.3vw,1.9rem)" }}>
            Those neurons, as baseballs in Fenway Park
          </h2>
          <p className="text-white/60 mb-6 text-[15px] leading-relaxed">
            The stats pages picture the neuron counts as baseballs at Fenway. Here's the arithmetic.
          </p>

          <Step n="1" title="One baseball ≈ 0.33 L of space" source={<>Official MLB ball spec (2.9 in dia.); random close packing of equal spheres ≈ 64% (Bernal, 1960).</>}>
            A regulation baseball is <span style={{ color: HUMAN }}>2.9 in across ≈ 12.8 in³ (0.21 L)</span>. Poured into a heap,
            identical spheres only pack to about <span style={{ color: HUMAN }}>64%</span> of the space (the rest is gaps), so each
            ball effectively claims <span style={{ color: HUMAN }}>~0.33 L</span>.
          </Step>
          <Step n="2" title="Fenway's field ≈ 2.3 acres; the whole bowl ≈ 1 million m³" source={<>Field: Fenway outfield distances as a 90° wedge to the ~360 ft average fence. Bowl: enclosed footprint ~18,000 m² × ~55 m to the light towers (rough, ~0.9–1.4 million m³).</>}>
            The playing field is about <span style={{ color: HUMAN }}>9,400 m² (2.3 acres)</span>; the whole enclosed stadium is
            roughly <span style={{ color: HUMAN }}>1 million m³</span>. The two anchors use different pictures — the mouse is a
            shallow layer on the <em>field</em>, the human fills the whole <em>bowl</em>.
          </Step>
          <Step n="3" title="Mouse — 70 million balls → ~8 feet deep" source={<>Arithmetic. No external source.</>}>
            70,000,000 × 0.33 L ≈ <span style={{ color: MOUSE }}>22,900 m³</span>. Spread over the 9,400 m² field, that's a layer
            about <span style={{ color: MOUSE }}>2.4 m — roughly 8 feet</span> deep. Not even one stadium's worth.
          </Step>
          <Step n="4" title="Human — 86 billion balls → Fenway filled ~28×" source={<>Arithmetic. Sensitive to the bowl-volume estimate: ~25–31× across the 0.9–1.1 million m³ range.</>}>
            86,000,000,000 × 0.33 L ≈ <span style={{ color: HUMAN }}>28.1 million m³</span>, so 86 billion baseballs would fill
            Fenway's entire volume <span style={{ color: HUMAN }}>about 28 times over</span>.
          </Step>

          <div className="mt-3 rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <p className="text-white/60 text-[14px] leading-relaxed">
              There are <span style={{ color: HUMAN }}>~1,230×</span> as many human neurons as mouse (86B ÷ 70M) — the gap between
              an <span style={{ color: MOUSE }}>8-foot layer on the field</span> and <span style={{ color: HUMAN }}>28 full stadiums</span>.
              A common back-of-envelope slip is a 1,000× unit error (cm³→m³ is ÷1,000,000, not ÷1,000), which would wrongly "bury"
              Fenway under the mouse's baseballs alone.
            </p>
          </div>
        </div>

        {/* Landmark comparisons — the "famous yardsticks" card on /scale-test */}
        <div id="landmark-comparisons" className="mt-6 rounded-2xl glass p-7 sm:p-9 scroll-mt-24">
          <h2 className="font-display font-light mb-2" style={{ fontSize: "clamp(1.4rem,2.3vw,1.9rem)" }}>
            Landmark comparisons
          </h2>
          <p className="text-white/60 mb-5 text-[15px] leading-relaxed">
            The "ridiculous units" card. Some transform the 86-billion neuron count into everyday objects; the rest
            are separate brain facts (synapses, wiring, power, speed, memory).
          </p>
          <ul className="text-white/70 text-[15px] leading-relaxed space-y-2.5 list-disc pl-5">
            <li><span style={{ color: HUMAN }}>~170 million Eiffel Towers of baguettes</span> — 86 billion baguettes × 0.65 m ≈ 56 million km end to end; ÷ 330 m (Eiffel Tower) ≈ 169 million.</li>
            <li><span style={{ color: HUMAN }}>~37,000 Great Pyramids</span> — 86 billion ÷ 2.3 million limestone blocks per Great Pyramid ≈ 37,000.</li>
            <li><span style={{ color: HUMAN }}>To the Moon and back ~2.6×</span> — 2,000,000 km of axon ÷ 768,800 km (a round trip; 384,400 km each way) ≈ 2.6.</li>
            <li><span style={{ color: HUMAN }}>~2,700 years to count</span> — 86 billion neurons ÷ 31.6 million seconds per year (one per second) ≈ 2,725.</li>
            <li><span style={{ color: HUMAN }}>~500× the Milky Way's stars</span> — 100 trillion synapses ÷ ~200 billion stars ≈ 500 (~250–1,000× across the 100–400 billion star range).</li>
            <li><span style={{ color: HUMAN }}>~20 watts</span> — the brain's steady power draw: ~20% of the body's resting energy on ~1.3 kg of tissue.</li>
            <li><span style={{ color: HUMAN }}>~270 mph signals</span> — the fastest (large, myelinated) axons conduct at ~120 m/s ≈ 268 mph.</li>
            <li><span style={{ color: HUMAN }}>~2.5 petabytes</span> — one modeling estimate of the cortex's storage capacity (≈ 3 million hours of TV).</li>
          </ul>
          <p className="mt-3 text-[13px] text-white/45">
            <span className="uppercase tracking-[0.15em] text-white/35">Source</span> · Baguette ~65 cm; Great Pyramid ~2.3 million blocks; mean Earth–Moon distance 384,400 km; Milky Way ~100–400 billion stars; brain power ~20 W and peak conduction ~120 m/s are standard neuroscience; the ~2.5-petabyte figure is Reber's estimate (<em>Scientific American</em>, 2010).
          </p>
        </div>

        {/* Pictured comparisons — the "next to something you can see" anchors */}
        <h2 className="font-display font-light mt-14 mb-3" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>The pictured comparisons</h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-4">
          The stats pages set each figure next to something you can picture. Here's the arithmetic behind each one.
        </p>
        <div className="rounded-2xl glass p-7 sm:p-9 space-y-6">
          <div>
            <h3 className="font-display text-lg font-light mb-1.5">Synapses, counted one per second</h3>
            <p className="text-white/70 leading-relaxed text-[15px]">
              A year is 60 × 60 × 24 × 365.25 ≈ <span style={{ color: HUMAN }}>31.6 million seconds</span>. Ticking off one
              synapse every second: mouse <span style={{ color: MOUSE }}>~250 billion ÷ 31.6M ≈ 7,900 years</span>; human{" "}
              <span style={{ color: HUMAN }}>~100 trillion ÷ 31.6M ≈ 3.2 million years</span>.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-light mb-1.5">Wiring, laid end to end</h3>
            <ul className="text-white/70 leading-relaxed text-[15px] space-y-1.5 list-disc pl-5">
              <li><span style={{ color: MOUSE }}>Mouse ~2,000 km</span> ≈ Boston to Miami (~1,250 mi in a straight line ≈ 2,020 km).</li>
              <li><span style={{ color: HUMAN }}>Human ~2,000,000 km ÷ 40,075 km</span> (Earth's equatorial circumference) ≈ <span style={{ color: HUMAN }}>50× around the Earth</span>.</li>
              <li><span style={{ color: HUMAN }}>Human ~2,000,000 km ÷ 768,800 km</span> (a round trip to the Moon; 384,400 km each way) ≈ <span style={{ color: HUMAN }}>2.6× — the Moon and back more than twice</span>.</li>
              <li>The gap between them: <span style={{ color: HUMAN }}>2,000,000 ÷ 2,000 = ~1,000×</span> more wiring in a human brain than a mouse.</li>
            </ul>
            <p className="mt-2 text-[13px] text-white/45">
              <span className="uppercase tracking-[0.15em] text-white/35">Source</span> · Earth circumference and mean Earth–Moon distance are standard constants; the ~2 million km wiring total is derived above.
            </p>
          </div>
        </div>

        {/* Cells shown */}
        <h2 className="font-display font-light mt-14 mb-3" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>Cells shown</h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-4">
          Every neuron and glial cell on screen is a real reconstruction from the MICrONS minnie65 volume
          (<code className="text-white/55">seg_m1300</code>), curated from{" "}
          <a className="underline decoration-white/30 hover:decoration-white" href="https://www.microns-explorer.org/gallery-mm3" target="_blank" rel="noreferrer">microns-explorer.org/gallery-mm3</a>:
        </p>
        <div className="overflow-x-auto rounded-2xl glass">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="text-white/50 text-[11px] uppercase tracking-[0.16em]">
                <th className="text-left font-medium p-3.5">Cell</th>
                <th className="text-left font-medium p-3.5">Type</th>
                <th className="text-left font-medium p-3.5">MICrONS minnie65 ID</th>
              </tr>
            </thead>
            <tbody className="font-light">
              {CELLS.map(([name, type, id]) => (
                <tr key={id} className="border-t border-white/10">
                  <td className="p-3.5 text-white/85">{name}</td>
                  <td className="p-3.5 text-white/65">{type}</td>
                  <td className="p-3.5 text-white/55 font-mono text-[13px]">{id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Functional data */}
        <h2 className="font-display font-light mt-14 mb-3" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>Functional (calcium) data</h2>
        <p className="text-white/70 text-[15px] leading-relaxed">
          The Activity finale shows <span style={{ color: HUMAN }}>108 real pyramidal-layer cells</span> glowing
          in time with their own measured two-photon calcium activity, recorded while a mouse watched a
          movie. The traces come from the MICrONS functional dataset: <strong>session 9, scan 4</strong>,
          imaging planes 2 / 4 / 6 (≈ layers 2/3, 4, 5), with each imaged soma re-resolved to its current
          <code className="text-white/55"> seg_m1300</code> mesh, fluorescence converted to ΔF/F and looped
          at 30 fps.
        </p>
        <p className="mt-2 text-[13px] text-white/45">
          <span className="uppercase tracking-[0.15em] text-white/35">Source</span> · MICrONS two-photon
          functional imaging, <a className="underline decoration-white/30 hover:decoration-white" href="https://dandiarchive.org/dandiset/000402" target="_blank" rel="noreferrer">DANDI:000402</a>{" "}
          (coregistered to the minnie65 EM volume).
        </p>

        {/* Credits */}
        <h2 className="font-display font-light mt-14 mb-4" style={{ fontSize: "clamp(1.4rem,2.2vw,1.8rem)" }}>Data, meshes &amp; tools</h2>
        <ul className="space-y-2.5 text-white/70 text-[15px]">
          <li>Cell meshes: <a className="underline decoration-white/30 hover:decoration-white" href="https://www.microns-explorer.org/" target="_blank" rel="noreferrer">MICrONS</a> minnie65 (seg_m1300), incl. Schneider-Mizell et al. 2024 inhibitory cells.</li>
          <li>Human cortex tissue anchor: the H01 dataset, Shapson-Coe et al., <em>Science</em> 2024.</li>
          <li>Mouse brain shell: <a className="underline decoration-white/30 hover:decoration-white" href="https://alleninstitute.org/" target="_blank" rel="noreferrer">Allen Institute</a> Common Coordinate Framework.</li>
          <li>Rendering &amp; connectomics tooling: <a className="underline decoration-white/30 hover:decoration-white" href="https://github.com/google/neuroglancer" target="_blank" rel="noreferrer">neuroglancer</a>, <a className="underline decoration-white/30 hover:decoration-white" href="https://flywire.ai/" target="_blank" rel="noreferrer">FlyWire</a>.</li>
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
