import { motion } from "framer-motion";
import { useContent, useUi } from "../../i18n/hooks";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springSpatial } from "../../motion/systemMotion";
import { SystemPanel } from "../ui/SystemPanel";
import { ROOM_CONTAINER, ROOM_HEADER, ROOM_SUBTITLE, ROOM_TITLE } from "./roomLayouts";

export function ExperienceRoom() {
  const { experiences, experienceStats } = useContent();
  const t = useUi();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={`${ROOM_CONTAINER} max-w-4xl flex-col`}>
      <header className={ROOM_HEADER}>
        <h1 className={ROOM_TITLE}>
          {t.experience.titleBefore}{" "}
          <span className="text-primary">{t.experience.titleAccent}</span>
        </h1>
        <p className={ROOM_SUBTITLE}>{t.experience.subtitle}</p>
      </header>

      <ol className="relative">
        <div
          className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
          aria-hidden
        />

        {experiences.map((exp, index) => (
          <motion.li
            key={`${exp.company}-${exp.period}`}
            initial={reducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springSpatial, delay: index * 0.08 }}
            className="relative pb-12 pl-11 last:pb-0"
          >
            <div
              className="absolute left-4 top-3 flex h-4 w-4 -translate-x-1/2 items-center justify-center"
              aria-hidden
            >
              <span className="absolute inset-0 rounded-full border border-primary/40 bg-background" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </div>

            <SystemPanel shell className="rounded-2xl">
              <div className="rounded-[calc(var(--radius)-0.375rem)] p-5 sm:p-6">
                <p className="system-label mb-2">{exp.period}</p>
                <h2 className="font-heading text-xl font-medium text-foreground">
                  {exp.position}
                </h2>
                <p className="mb-4 text-sm text-primary">{exp.company}</p>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <ul className="mb-5 space-y-2 border-t border-border pt-4">
                  {exp.achievements.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-foreground/85">
                      <span className="mt-2 h-px w-3 shrink-0 bg-primary/50" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="system-chip rounded-full px-2.5 py-1 font-mono text-[0.65rem] text-foreground/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SystemPanel>
          </motion.li>
        ))}
      </ol>

      <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-4 border-t border-border pt-8">
        {experienceStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSpatial, delay: 0.3 + index * 0.05 }}
            className="flex items-baseline gap-3"
          >
            <span className="font-heading text-3xl font-semibold tabular-nums text-foreground">
              {stat.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
