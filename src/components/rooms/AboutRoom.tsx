import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { aboutCards, profile, skills } from "../../data/content";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { cn } from "../../lib/utils";
import { GlassPanel } from "../ui/GlassPanel";

export function AboutRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const active = aboutCards.find((c) => c.id === activeId);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-20">
      <header className="mb-10 text-center">
        <h1 className="font-heading mb-3 text-4xl font-bold md:text-6xl">
          Sobre <span className="bg-gradient-primary bg-clip-text text-transparent">mí</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {profile.location} · {profile.yearsExperience} años de experiencia
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aboutCards.map((card) => {
          const isOpen = activeId === card.id;
          return (
            <GlassPanel
              key={card.id}
              as="button"
              type="button"
              interactive
              active={isOpen}
              aria-expanded={isOpen}
              onClick={() => setActiveId(isOpen ? null : card.id)}
              className="rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <h2 className="font-heading mb-2 text-xl font-semibold text-primary">
                {card.title}
              </h2>
              <p className="text-sm text-muted-foreground">{card.summary}</p>
            </GlassPanel>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className={cn("glass-panel mt-8 rounded-2xl p-6")}
            role="region"
            aria-label={active.title}
          >
            <h3 className="font-heading mb-4 text-2xl font-semibold">{active.title}</h3>
            <div className="space-y-3 text-muted-foreground">
              {active.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            {active.id === "tecnologias" && (
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="glass-chip rounded-full px-3 py-1 text-xs text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
