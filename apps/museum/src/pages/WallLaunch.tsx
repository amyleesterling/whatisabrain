import { useState } from "react";
import Explore from "./Explore";

// Wall launcher (/wall). Renders the attract loop with a one-click gate that
// requests fullscreen — on the 3628×1600 wall that fills the screen exactly,
// chromeless, at native resolution. Browsers require a user gesture to enter
// fullscreen, so the click-to-start overlay is unavoidable.

export default function WallLaunch() {
  const [started, setStarted] = useState(false);
  const start = () => {
    const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> };
    (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.())?.catch?.(() => {});
    setStarted(true);
  };

  return (
    <>
      <Explore attract />
      {!started && (
        <div
          onClick={start}
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer text-center px-6"
          style={{ background: "radial-gradient(ellipse at center, #0c1322 0%, #04060c 75%)" }}
        >
          <div>
            <p className="font-display font-light" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Inner Cosmos — Wall Display
            </p>
            <p className="mt-6 text-white/60 text-lg">Click anywhere to enter fullscreen</p>
            <p className="mt-2 text-white/35 text-sm uppercase tracking-[0.3em]">Built for 3628 × 1600</p>
          </div>
        </div>
      )}
    </>
  );
}
