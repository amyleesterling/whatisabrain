// Site-wide "home" affordance — matches the museum app's HubLogo so every
// experience reads as one site. Links to the hub at the domain root with a
// plain anchor (the hub is a static page above this app's /explore/ base).

export default function HubLogo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="What's a brain? — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 rounded-full opacity-55 blur-[8px]" style={{ background: "#a87ee0" }} />
        <img
          src={`${import.meta.env.BASE_URL}brain-favicon.png`}
          alt=""
          className="relative h-7 w-7 object-contain"
        />
      </span>
      <span className="font-display text-[15px] tracking-wide text-white/90 transition group-hover:text-white">
        What's a brain?
      </span>
    </a>
  );
}
