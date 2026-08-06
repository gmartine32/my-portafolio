import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "../../data/content";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useNavigationStore } from "../../stores/navigationStore";

export function HomeRoom() {
  const reducedMotion = usePrefersReducedMotion();
  const goTo = useNavigationStore((s) => s.goTo);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-chip mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
        <span className="text-sm font-medium tracking-wide text-foreground/95">
          {profile.status}
        </span>
      </motion.div>

      <p className="mb-3 text-lg font-light tracking-wider text-neon-blue">
        {profile.greeting}
      </p>
      <h1 className="font-heading mb-4 text-5xl font-bold md:text-7xl lg:text-8xl">
        {profile.name}
      </h1>
      <h2 className="mb-8 text-xl font-light text-primary md:text-3xl">
        {profile.title}
      </h2>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {profile.stack.map((tech) => (
          <span
            key={tech}
            className="glass-chip rounded-full px-4 py-2 text-sm text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="mb-12 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
        {profile.bio}
      </p>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => goTo("projects")}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-8 py-3 font-medium text-primary-foreground shadow transition hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Explorar
        </button>
        <p className="flex items-center gap-1 text-sm text-foreground/80">
          <ChevronDown className="h-4 w-4" aria-hidden />
          Flechas, WASD o desliza
        </p>
      </div>
    </div>
  );
}
