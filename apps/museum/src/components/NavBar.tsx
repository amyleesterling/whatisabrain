import { Link, useLocation } from "react-router-dom";
import HubLogo from "./HubLogo";

export default function NavBar() {
  const { pathname, search } = useLocation();

  // Capture mode (?capture=1) drives the headless video render — the NavBar
  // must not appear in the exported frames. Hide it regardless of route.
  if (new URLSearchParams(search).has("capture")) return null;

  // /kindergarten (+ /kindergarten/:stage shareable links), /brain
  // (+ subroutes), and /wonder are standalone immersive experiences —
  // no chrome.
  if (
    pathname === "/kindergarten" ||
    pathname.startsWith("/kindergarten/") ||
    pathname.startsWith("/brain") ||
    pathname === "/wonder" ||
    pathname === "/attract" ||
    pathname === "/wall" ||
    pathname === "/stats" ||
    pathname === "/fly" ||
    pathname === "/quiz" ||
    pathname === "/teach" ||
    pathname === "/scale-test" ||
    pathname === "/scale-wall" ||
    pathname === "/citations"
  ) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-30 px-5 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
      <HubLogo className="pointer-events-auto opacity-90 transition-opacity hover:opacity-100" />

      <nav className="pointer-events-auto flex items-center gap-1 text-sm">
        <NavLink to="/meet" current={pathname.startsWith("/meet")}>
          Meet a Neuron
        </NavLink>
        <NavLink to="/explore" current={pathname === "/explore"}>
          Explorer
        </NavLink>
        <NavLink to="/activity" current={pathname === "/activity"}>
          Activity
        </NavLink>
        {/* /explore-the-universe is hosted alongside this site at
            /inner_cosmos/explore-the-universe/ but intentionally not linked
            from the navbar — it's an unlisted side-project Amy shares
            directly. */}
      </nav>
    </header>
  );
}

function NavLink({ to, current, children }: { to: string; current: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-3.5 py-2 rounded-full transition-all duration-300 ${
        current
          ? "text-white bg-white/8 ring-1 ring-white/15"
          : "text-white/55 hover:text-white/90 hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
