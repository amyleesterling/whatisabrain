import { useEffect, useState } from "react";
import HubLogo from "./HubLogo";

// Sticky bar for the long /stats page: home affordance on the left, jump-nav
// on the right. The jump links scroll to in-page section anchors; the active
// one is highlighted as you scroll (scroll-spy via IntersectionObserver).

const SECTIONS = [
  { id: "numbers", label: "Numbers" },
  { id: "facts", label: "Facts" },
  { id: "compare", label: "Mouse vs human" },
  { id: "units", label: "Ridiculous units" },
  { id: "sources", label: "Sources" },
];

export default function StatsTopBar() {
  const [active, setActive] = useState<string>("numbers");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section whose top is nearest just below the sticky bar.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-40 border-b border-white/8 bg-[#04060c]/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <HubLogo className="shrink-0" />
        <nav className="-mx-1 flex items-center gap-1 overflow-x-auto whitespace-nowrap px-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-full px-3 py-1.5 transition ${
                active === s.id
                  ? "bg-white/10 text-white ring-1 ring-white/15"
                  : "text-white/50 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
