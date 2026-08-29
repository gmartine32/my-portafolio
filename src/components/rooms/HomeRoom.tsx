import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useMemo } from "react";
import type { Direction } from "../../types/world";
import { interpolate, useContent, useLocale, useUi } from "../../i18n/hooks";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { staggerContainer, staggerItem } from "../../motion/systemMotion";
import { useNavigationStore } from "../../stores/navigationStore";
import { getAvailableDirections, resolveNeighbor } from "../../world/navigation";
import { getRoomTitle } from "../../world/titles";
import { SystemPanel } from "../ui/SystemPanel";

const DIRECTION_ICONS: Record<Direction, typeof ChevronUp> = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
};

export function HomeRoom() {
  const reducedMotion = usePrefersReducedMotion();
  const goTo = useNavigationStore((s) => s.goTo);
  const { profile } = useContent();
  const t = useUi();
  const locale = useLocale();

  const routes = useMemo(() => {
    return getAvailableDirections("home")
      .map((direction) => {
        const neighbor = resolveNeighbor("home", direction);
        if (!neighbor) return null;
        return {
          direction,
          id: neighbor.id,
          title: getRoomTitle(neighbor, locale),
        };
      })
      .filter(Boolean) as {
      direction: Direction;
      id: string;
      title: string;
    }[];
  }, [locale]);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-6xl items-center px-6 py-20 sm:px-8">
      <motion.div
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        className="grid w-full gap-12 lg:grid-cols-12 lg:items-center lg:gap-10"
      >
        <div className="lg:col-span-7">
          <motion.p variants={staggerItem} className="system-label mb-4">
            {profile.greeting}
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-heading mb-4 text-5xl font-semibold tracking-tighter md:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.h2
            variants={staggerItem}
            className="mb-8 text-xl font-light text-muted-foreground md:text-2xl"
          >
            {profile.title}
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mb-10 max-w-prose text-base leading-relaxed text-foreground/85 md:text-lg"
          >
            {profile.bio}
          </motion.p>

          <motion.div variants={staggerItem}>
            <div className="system-panel--shell inline-block">
              <button
                type="button"
                onClick={() => goTo("projects")}
                className="system-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t.home.explore}
              </button>
            </div>
            <p className="mt-4 font-mono text-xs text-muted-foreground">{t.home.navHint}</p>
          </motion.div>
        </div>

        <motion.div variants={staggerItem} className="lg:col-span-5">
          <SystemPanel shell className="overflow-hidden rounded-3xl p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 pb-4">
              <span className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[0.65rem] tracking-wide text-foreground/90 sm:text-xs">
                  {profile.status}
                </span>
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground sm:text-xs">
                {interpolate(t.home.routesCount, { count: routes.length })}
              </span>
            </div>

            <ul className="divide-y divide-border/50 border-t border-border/40">
              {routes.map((route) => {
                const Icon = DIRECTION_ICONS[route.direction];
                return (
                  <li key={route.id}>
                    <button
                      type="button"
                      onClick={() => goTo(route.id)}
                      className="group flex w-full items-center gap-3 py-3 text-left transition hover:bg-surface-mid/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:py-3.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-mid/60 text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                          {t.directions[route.direction]}
                        </span>
                        <span className="block truncate font-heading text-sm font-medium text-foreground sm:text-base">
                          {route.title}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </SystemPanel>
        </motion.div>
      </motion.div>
    </div>
  );
}
