import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function AmbientDunesBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Base cobalt atmosphere */}
      <div className="absolute inset-0 dune-base" />

      {/* Soft upper glow */}
      <div
        className={`absolute left-1/2 top-[-25%] h-[55%] w-[90%] -translate-x-1/2 rounded-[100%] bg-[hsl(var(--dune-mid))] opacity-30 blur-[90px] ${
          reducedMotion ? "" : "dune-drift-a"
        }`}
      />

      {/* Crest glow */}
      <div
        className={`absolute bottom-[5%] left-[0%] h-[35%] w-[100%] rounded-[100%] bg-[hsl(var(--dune-glow))] opacity-40 blur-[70px] ${
          reducedMotion ? "" : "dune-drift-glow"
        }`}
      />

      {/* Dune layers — large elliptical ribbons */}
      <div
        className={`absolute -left-[25%] bottom-[-22%] h-[60%] w-[150%] rounded-[100%] bg-[hsl(var(--dune-deep))] opacity-75 blur-[60px] ${
          reducedMotion ? "" : "dune-drift-a"
        }`}
      />
      <div
        className={`absolute -right-[20%] bottom-[-12%] h-[52%] w-[130%] rounded-[100%] bg-[hsl(var(--dune-mid))] opacity-70 blur-[55px] ${
          reducedMotion ? "" : "dune-drift-b"
        }`}
      />
      <div
        className={`absolute -left-[15%] bottom-[-28%] h-[48%] w-[120%] rounded-[100%] bg-[hsl(var(--dune-glow))] opacity-55 blur-[65px] ${
          reducedMotion ? "" : "dune-drift-c"
        }`}
      />
      <div
        className={`absolute left-[5%] bottom-[-15%] h-[40%] w-[100%] rounded-[100%] bg-[hsl(var(--dune-glow))] opacity-45 blur-[75px] ${
          reducedMotion ? "" : "dune-drift-d"
        }`}
      />
    </div>
  );
}
