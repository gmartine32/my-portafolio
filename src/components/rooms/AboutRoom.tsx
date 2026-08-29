import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { interpolate, useContent, useUi } from "../../i18n/hooks";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { depthEnter, depthEnterFlat, springSpatial } from "../../motion/systemMotion";
import { SystemPanel } from "../ui/SystemPanel";
import { ProfilePortrait } from "./ProfilePortrait";
import { ROOM_CONTAINER, ROOM_HEADER, ROOM_SUBTITLE, ROOM_TITLE } from "./roomLayouts";

const DETAIL_SCROLL_OFFSET = 96;

function scrollDetailIntoView(detailEl: HTMLElement, reducedMotion: boolean) {
  const scroller = detailEl.closest<HTMLElement>(
    '[data-room-frame][data-active="true"]',
  );
  if (!scroller) return;

  const target =
    scroller.scrollTop +
    detailEl.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top -
    DETAIL_SCROLL_OFFSET;

  scroller.scrollTo({
    top: Math.max(0, target),
    behavior: reducedMotion ? "auto" : "smooth",
  });
}

export function AboutRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { aboutCards, profile, skills } = useContent();
  const t = useUi();
  const active = aboutCards.find((c) => c.id === activeId);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailVariants = reducedMotion || isMobile ? depthEnterFlat : depthEnter;

  useEffect(() => {
    if (!activeId || !active || !isMobile) return;

    const scrollToDetail = () => {
      if (detailRef.current) scrollDetailIntoView(detailRef.current, reducedMotion);
    };

    const frame = requestAnimationFrame(scrollToDetail);
    const timer = window.setTimeout(scrollToDetail, reducedMotion ? 0 : 220);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [activeId, active, isMobile, reducedMotion]);

  return (
    <div className={`${ROOM_CONTAINER} max-w-5xl flex-col`}>
      <header className={`${ROOM_HEADER} grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10`}>
        <div className="lg:col-span-7">
          <h1 className={ROOM_TITLE}>
            {t.about.titleBefore}{" "}
            <span className="text-primary">{t.about.titleAccent}</span>
          </h1>
          <p className={ROOM_SUBTITLE}>
            {interpolate(t.about.years, {
              location: profile.location,
              years: profile.yearsExperience,
            })}
          </p>
        </div>

        {profile.portrait && (
          <ProfilePortrait
            src={profile.portrait}
            alt={interpolate(t.about.portraitAlt, { name: profile.name })}
            className="lg:col-span-5"
          />
        )}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aboutCards.map((card, index) => {
          const isOpen = activeId === card.id;
          const offsetClass =
            index % 3 === 1
              ? "lg:translate-y-6"
              : index % 3 === 2
                ? "lg:-translate-y-3"
                : "lg:translate-y-0";

          return (
            <motion.div
              key={card.id}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springSpatial, delay: index * 0.05 }}
              style={isMobile ? undefined : { zIndex: isOpen ? 10 : index }}
              className={`relative ${offsetClass}`}
            >
              <SystemPanel
                as="button"
                type="button"
                interactive
                active={isOpen}
                shell
                aria-expanded={isOpen}
                onClick={() => setActiveId(isOpen ? null : card.id)}
                className="w-full rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <h2 className="font-heading mb-2 text-xl font-medium text-foreground">
                  {card.title}
                </h2>
                <p className="text-sm text-muted-foreground">{card.summary}</p>
              </SystemPanel>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            ref={detailRef}
            key={active.id}
            variants={detailVariants}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            exit={reducedMotion ? undefined : "hidden"}
            transition={springSpatial}
            className="relative z-20 mt-10 scroll-mt-24"
          >
            <SystemPanel shell className="rounded-2xl p-6 sm:p-8" role="region" aria-label={active.title}>
              <h3 className="font-heading mb-5 text-2xl font-medium text-foreground">
                {active.title}
              </h3>
              <div className="space-y-4 text-foreground/90">
                {active.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {active.id === "tecnologias" && (
                <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="system-chip flex items-center gap-2 rounded-xl px-3 py-2"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span className="font-mono text-xs text-foreground/90">{skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </SystemPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
