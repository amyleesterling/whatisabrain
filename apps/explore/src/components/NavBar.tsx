import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();

  // /kindergarten (+ /kindergarten/:stage shareable links), /brain
  // (+ subroutes), and /wonder are standalone immersive experiences —
  // no chrome.
  if (
    pathname === "/kindergarten" ||
    pathname.startsWith("/kindergarten/") ||
    pathname.startsWith("/brain") ||
    pathname === "/wonder" ||
    pathname === "/numbers" ||
    pathname === "/citations"
  ) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-30 px-5 sm:px-8 py-4 flex items-center justify-end pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 text-sm">
        <NavLink to="/meet" current={pathname.startsWith("/meet")}>
          Meet a Neuron
        </NavLink>
        <NavLink to="/activity" current={pathname === "/activity"}>
          Activity
        </NavLink>
      </nav>
    </header>
  );
}

function NavLink({ to, current, children }: { to: string; current: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-3.5 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
        current
          ? "text-white bg-white/8 ring-1 ring-white/15"
          : "text-white/55 hover:text-white/90 hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}
