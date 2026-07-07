// Small glowing line-icons for the "Stranger than the numbers" fact cards.
// Each maps to one fact's idea. Kept to a 48x48 viewBox, stroke-based, with a
// soft drop-shadow glow so they sit on the dark glass cards like the rest of
// the site's art rather than flat UI glyphs.

const CYAN = "#7ee0ff";
const VIOLET = "#b78bff";
const WARM = "#ffd9a8";
const EMBER = "#ffb877";

export type FactIconId = "energy" | "myelin" | "ratio" | "folds" | "gap";

function glow(color: string) {
  return { filter: `drop-shadow(0 0 5px ${color}aa)` } as const;
}

export default function FactIcon({ id, className }: { id: FactIconId; className?: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    // A hungry little organ — a flame (energy burn).
    case "energy":
      return (
        <svg {...common} className={className} style={glow(EMBER)}>
          <path
            d="M27 5c6 8 8 12 6.5 18C39 25 40 33 33 39a12 12 0 0 1-18 0c-5-5-4-11 0-15 1 5 4 6 5 5-3-8 1-14 7-24Z"
            stroke={EMBER}
            strokeWidth="2"
          />
          <path d="M24 40a6 6 0 0 0 5-9c-2 3-5 2-5-1-3 3-4 6-2 8 .6.7 1.3 1.4 2 2Z" stroke={WARM} strokeWidth="1.6" />
        </svg>
      );

    // Thinking with butter — a myelinated axon: signal racing down a sheathed
    // fibre (the fat that makes it fast).
    case "myelin":
      return (
        <svg {...common} className={className} style={glow(WARM)}>
          <line x1="4" y1="24" x2="44" y2="24" stroke={WARM} strokeWidth="1.6" opacity="0.5" />
          {[12, 24, 36].map((cx) => (
            <rect key={cx} x={cx - 6} y="16" width="12" height="16" rx="7" stroke={WARM} strokeWidth="2" />
          ))}
          <path d="M6 24l7-4-2 4 2 4-7-4Z" fill={EMBER} stroke="none" style={glow(EMBER)} />
        </svg>
      );

    // You are half not-neurons — a neuron and a glial cell, equal (1:1).
    case "ratio":
      return (
        <svg {...common} className={className} style={glow(VIOLET)}>
          <g stroke={CYAN} strokeWidth="2">
            <circle cx="15" cy="24" r="6.5" />
            <path d="M15 17.5V11M15 30.5V37M8.5 24H4M9 19l-3-3M9 29l-3 3" strokeWidth="1.6" />
          </g>
          <circle cx="34" cy="24" r="6.5" stroke={VIOLET} strokeWidth="2" />
          <circle cx="24.5" cy="21" r="1" fill="#fff" />
          <circle cx="24.5" cy="27" r="1" fill="#fff" />
        </svg>
      );

    // Why your brain is wrinkled — folded cortical gyri.
    case "folds":
      return (
        <svg {...common} className={className} style={glow(VIOLET)}>
          <path
            d="M5 34c3-1 3.5-16 7.5-16S16 34 19 34s3.5-16 7.5-16S30 34 33 34s3.5-16 7.5-16 4 15 2.5 16"
            stroke={VIOLET}
            strokeWidth="2"
          />
        </svg>
      );

    // Nothing ever quite touches — an axon terminal and a target membrane with
    // neurotransmitter crossing the gap.
    case "gap":
      return (
        <svg {...common} className={className} style={glow(CYAN)}>
          <path d="M6 14c8 0 12 4 12 10s-4 10-12 10" stroke={CYAN} strokeWidth="2" />
          <path d="M42 12c-6 4-6 20 0 24" stroke={VIOLET} strokeWidth="2" />
          <circle cx="24" cy="20" r="1.6" fill={CYAN} />
          <circle cx="29" cy="24" r="1.6" fill="#fff" />
          <circle cx="25" cy="29" r="1.6" fill={CYAN} />
        </svg>
      );
  }
}
