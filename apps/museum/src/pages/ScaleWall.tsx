import BrainStatsCompact from "../components/BrainStatsCompact";

// Preview of the wall's card 5: copy + stats in the left panel, the 3D neuron
// occupies the right. Route: /scale-wall.

export default function ScaleWall() {
  return (
    <div
      className="relative min-h-screen w-full text-white overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 62% 45%, rgba(28,39,66,0.5) 0%, rgba(4,6,12,1) 70%)" }}
    >
      {/* soft left scrim, same as the wall */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[46vw]"
        style={{ background: "linear-gradient(to right, rgba(4,6,12,0.85) 0%, rgba(4,6,12,0.5) 32%, rgba(4,6,12,0) 70%)" }}
      />

      {/* space reserved for the real 3D neuron on the wall */}
      <div className="absolute inset-y-0 right-0 w-[52%] flex items-center justify-center">
        <span className="text-white/12 text-xs uppercase tracking-[0.3em]">3D neuron</span>
      </div>

      {/* left copy panel */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="pl-[4.5vw] pr-8 w-[min(42rem,45vw)]">
          <p className="uppercase tracking-[0.4em] text-white/55 text-sm mb-5">Stage 5 of 8</p>
          <h2 className="font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 3.4vw, 4rem)" }}>
            A neuron
          </h2>
          <p className="mt-4 text-white/80 font-light leading-relaxed" style={{ fontSize: "clamp(1rem, 1.3vw, 1.4rem)" }}>
            One cell, thousands of connections. Neurons are the most famous cells of the brain. They come in
            thousands of varieties.
          </p>

          <div className="mt-8">
            <h3 className="uppercase tracking-[0.3em] text-white/55 text-sm mb-4">
              Brains by the numbers
            </h3>
            <BrainStatsCompact />
          </div>
        </div>
      </div>
    </div>
  );
}
