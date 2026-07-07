import { Link } from "react-router-dom";
import RealNeuronModel from "../components/RealNeuronModel";
import HubLogo from "../components/HubLogo";

// The fly brain: the one whole-animal connectome we have finished. Figures are
// from the FlyWire connectome (Dorkenwald et al., "Neuronal wiring diagram of
// an adult brain," Nature 2024) and its companion cell-typing paper (Schlegel
// et al., Nature 2024). All sourced on /citations.

const FLY = "#ffc861"; // warm amber — the fly's own color, distinct from human violet / mouse cyan
const HUMAN = "#b78bff";

const FLY_FACTS: { value: string; label: string; note: string }[] = [
  { value: "139,255", label: "Neurons", note: "every single one, traced and proofread" },
  { value: "~54.5M", label: "Synapses", note: "chemical connections, mapped one by one" },
  { value: "8,453", label: "Cell types", note: "4,581 never described before" },
  { value: "~15M", label: "Connections", note: "wiring links between neurons" },
  { value: "< 1 mm", label: "Brain width", note: "smaller than a poppy seed" },
  { value: "100%", label: "Mapped", note: "the entire brain, wire for wire" },
];

const FLY_STORIES: { hl: string; title: string; body: string; link?: { to: string; label: string } }[] = [
  {
    hl: "A first",
    title: "A whole brain, finished",
    body: "In 2024 scientists finished tracing every neuron and every connection in this brain. It is the first complete wiring diagram of any animal that can walk, see, and remember, and by a wide margin the largest connectome ever mapped.",
  },
  {
    hl: "617,000x",
    title: "A speck of you",
    body: "Your brain has roughly 617,000 times as many neurons. All 139,255 of the fly's would fit inside a crumb of your cortex smaller than a grain of rice, and we still have not mapped that crumb.",
    link: { to: "/stats", label: "See the human numbers" },
  },
  {
    hl: "4,581 new",
    title: "Doubling the catalog",
    body: "Mapping this one brain more than doubled the known catalog of fly neuron types. More than half the 8,453 cell types found here had never been described by science before.",
  },
  {
    hl: "< 1 mm",
    title: "Small and mighty",
    body: "The whole thing is narrower than a poppy seed, yet it flies, courts, learns smells, keeps its balance, and navigates the world. Every one of those behaviors is somewhere in this wiring.",
  },
];

// Fully-mapped (and not-yet-mapped) brains, smallest to largest. The point of
// the ladder: complete connectomes climb steeply, and the fly is the current
// summit. Mouse and human are shown dimmed because they are estimates, not maps.
const LADDER: { name: string; sub: string; neurons: string; year: string; mapped: boolean }[] = [
  { name: "Roundworm", sub: "C. elegans", neurons: "302", year: "1986", mapped: true },
  { name: "Fly larva", sub: "Drosophila larva", neurons: "3,016", year: "2023", mapped: true },
  { name: "Adult fly", sub: "Drosophila, FlyWire", neurons: "139,255", year: "2024", mapped: true },
  { name: "Mouse", sub: "estimate, not yet mapped", neurons: "~71 million", year: "someday", mapped: false },
  { name: "Human", sub: "estimate, not yet mapped", neurons: "86 billion", year: "the dream", mapped: false },
];

export default function FlyStats() {
  return (
    <div
      className="min-h-screen w-full text-white"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #2a2210 0%, #04060c 62%)" }}
    >
      {/* Top bar: home affordance + back to human stats. */}
      <div className="sticky top-0 z-40 border-b border-white/8 bg-[#04060c]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <HubLogo className="shrink-0" />
          <Link
            to="/stats"
            className="rounded-full px-3 py-1.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white/90"
          >
            Human brain →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Hero: the real FlyWire brain + the story. */}
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-1 lg:order-2 rounded-[1.75rem] glass p-4 sm:p-5">
            <div className="relative mx-auto aspect-square w-full max-w-[440px]">
              <RealNeuronModel
                meshUrl={`${import.meta.env.BASE_URL}meshes/fly-brain.glb`}
                color={FLY}
                cameraDistance={2.5}
                spinSpeed={0.14}
                zoom={false}
                fit
                className="absolute inset-0"
              />
            </div>
            <p className="mt-1 text-center text-[11px] uppercase tracking-[0.26em] text-white/40">
              Drag to rotate. Adult fly brain, FlyWire reconstruction
            </p>
          </div>

          <div className="order-2 lg:order-1">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em]" style={{ color: FLY }}>
              The whole connectome
            </p>
            <h1 className="font-display text-[clamp(2.2rem,5.2vw,4.6rem)] font-light leading-[0.98]">
              The one brain we've mapped completely
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              We know the human brain by its staggering numbers, but we have never traced it. The fruit fly is
              different. Every neuron, every connection, all of it, is now known. This is what a finished brain looks
              like.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://flywire.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition"
                style={{ background: "rgba(255,200,97,0.14)", border: "1px solid rgba(255,200,97,0.35)", color: FLY }}
              >
                Explore FlyWire
              </a>
              <Link
                to="/citations"
                className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
              >
                Sources and calculations
              </Link>
            </div>
          </div>
        </section>

        {/* Key numbers. */}
        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {FLY_FACTS.map((f) => (
            <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{f.label}</p>
              <p
                className="mt-1.5 font-display font-light tabular-nums"
                style={{ color: FLY, fontSize: "clamp(1.4rem,2.2vw,1.9rem)" }}
              >
                {f.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">{f.note}</p>
            </div>
          ))}
        </section>

        {/* Stranger facts. */}
        <section className="mt-14">
          <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">Why the fly matters</p>
          <h2 className="mb-5 font-display text-3xl font-light sm:text-4xl">A small brain, fully known</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {FLY_STORIES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <p className="font-display font-light tabular-nums" style={{ color: FLY, fontSize: "clamp(1.5rem,2.4vw,2rem)" }}>
                  {f.hl}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/45">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.body}</p>
                {f.link && (
                  <Link
                    to={f.link.to}
                    className="mt-3 inline-block text-sm text-white/55 underline decoration-white/25 transition hover:text-white/85"
                  >
                    {f.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Connectome milestones ladder. */}
        <section className="mt-14">
          <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-white/45">Every brain we've finished</p>
          <h2 className="mb-2 font-display text-3xl font-light sm:text-4xl">The climb to a whole brain</h2>
          <p className="mb-6 max-w-2xl leading-relaxed text-white/60">
            A complete connectome means every neuron and every connection, traced. Each rung is far harder than the
            last. The fly is the current summit. Mouse and human are still only estimates.
          </p>
          <div className="grid gap-3">
            {LADDER.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-4 rounded-2xl border p-4 sm:p-5"
                style={{
                  borderColor: b.mapped ? "rgba(255,200,97,0.22)" : "rgba(255,255,255,0.08)",
                  background: b.mapped ? "rgba(255,200,97,0.05)" : "rgba(255,255,255,0.02)",
                  opacity: b.mapped ? 1 : 0.6,
                }}
              >
                <div className="shrink-0">
                  <span
                    className="inline-flex h-9 items-center rounded-full px-3 text-[11px] font-medium uppercase tracking-[0.16em]"
                    style={
                      b.mapped
                        ? { background: "rgba(255,200,97,0.16)", color: FLY, border: "1px solid rgba(255,200,97,0.3)" }
                        : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }
                    }
                  >
                    {b.mapped ? "Mapped" : "Not yet"}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-light leading-tight">{b.name}</p>
                  <p className="text-xs text-white/45">{b.sub}</p>
                </div>
                <div className="text-right">
                  <p
                    className="font-display tabular-nums leading-tight"
                    style={{ color: b.mapped ? FLY : HUMAN, fontSize: "clamp(1.1rem,1.8vw,1.5rem)" }}
                  >
                    {b.neurons}
                  </p>
                  <p className="text-xs text-white/40">neurons · {b.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Close: back to the human numbers. */}
        <section className="mt-14 rounded-[1.75rem] glass p-7 text-center sm:p-10">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/75">
            The fly shows us what a finished brain looks like. The human brain is{" "}
            <span style={{ color: HUMAN }}>617,000 times larger</span> and still uncharted. That gap is the whole
            adventure.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/stats"
              className="rounded-full px-5 py-2.5 text-sm font-medium transition"
              style={{ background: "rgba(183,139,255,0.16)", border: "1px solid rgba(183,139,255,0.35)", color: HUMAN }}
            >
              Brains by the numbers →
            </Link>
            <Link
              to="/citations"
              className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/88 transition hover:bg-white/12"
            >
              Sources and calculations
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
