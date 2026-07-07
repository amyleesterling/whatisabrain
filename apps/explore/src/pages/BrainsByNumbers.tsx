import { Link } from "react-router-dom";
import BrainStatsCompact from "../components/BrainStatsCompact";
import ReferenceTable from "../components/ReferenceTable";

// Standalone "Brains by the numbers" page — simplified stats with color-coded
// Mouse/Human columns, a reference table, and a link to the full sourcing.
// Route: /numbers.

export default function BrainsByNumbers() {
  return (
    <div className="min-h-screen w-full text-white" style={{ background: "radial-gradient(ellipse at 50% 0%, #101a2e 0%, #04060c 60%)" }}>
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <Link to="/" className="text-sm text-white/45 hover:text-white/80 transition">← Inner Cosmos</Link>
        <p className="uppercase tracking-[0.4em] text-white/45 text-xs mb-4 mt-10">By the numbers</p>
        <h1 className="font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
          Brains by the numbers
        </h1>
        <p className="mt-5 text-white/75 font-light leading-relaxed" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)" }}>
          One cell, thousands of connections — its dendrites receive signals and its axon passes them on.
          Scale that to a whole brain and the numbers stop meaning much, so here they are next to things
          you can picture.
        </p>

        <div className="mt-10">
          <BrainStatsCompact />
        </div>

        <div className="mt-14">
          <p className="uppercase tracking-[0.28em] text-white/45 text-xs mb-4">Reference</p>
          <ReferenceTable />
          <Link to="/citations" className="inline-block mt-5 text-sm text-white/45 hover:text-white/80 transition underline decoration-white/25">
            Sources &amp; calculations →
          </Link>
        </div>
      </div>
    </div>
  );
}
