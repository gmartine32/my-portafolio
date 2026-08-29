import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { Direction } from "../../types/world";
import { interpolate, useLocale, useUi } from "../../i18n/hooks";
import { useLightboxOpen } from "../../hooks/useLightboxOpen";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springUI } from "../../motion/systemMotion";
import { useNavigationStore } from "../../stores/navigationStore";
import { getRoom } from "../../world/map";
import { getAvailableDirections, resolveNeighbor } from "../../world/navigation";
import { getRoomTitle } from "../../world/titles";
import { NavigatorHints } from "./NavigatorHints";

const ICONS: Record<Direction, typeof ChevronUp> = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
};

const POSITIONS: Record<Exclude<Direction, "up">, string> = {
  down: "bottom-6 left-1/2 -translate-x-1/2",
  left: "left-3 bottom-24 top-auto translate-y-0 sm:left-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2",
  right:
    "right-3 bottom-24 top-auto translate-y-0 sm:right-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2",
};

const NAV_BUTTON_CLASS =
  "system-panel system-panel--interactive flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-35";

export function HUD() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const announcement = useNavigationStore((s) => s.announcement);
  const isTransitioning = useNavigationStore((s) => s.isTransitioning);
  const hudControlsVisible = useNavigationStore((s) => s.hudControlsVisible);
  const isMapOpen = useNavigationStore((s) => s.isMapOpen);
  const isOnboardingOpen = useNavigationStore((s) => s.isOnboardingOpen);
  const move = useNavigationStore((s) => s.move);
  const reducedMotion = usePrefersReducedMotion();
  const locale = useLocale();
  const t = useUi();
  const room = getRoom(currentRoomId);
  const directions = getAvailableDirections(currentRoomId);
  const lightboxOpen = useLightboxOpen();
  const isProjectDetail = room?.componentKey === "project-detail";
  const showControls =
    hudControlsVisible && !lightboxOpen && !isMapOpen && !isOnboardingOpen;
  const hasUp = directions.includes("up");
  const edgeDirections = directions.filter((direction) => direction !== "up");
  const roomTitle = room ? getRoomTitle(room, locale) : t.world.fallbackTitle;

  const destinationLabel = (direction: Direction) => {
    const neighbor = resolveNeighbor(currentRoomId, direction);
    const dir = t.directions[direction];
    return neighbor
      ? interpolate(t.hud.goTo, {
          direction: dir,
          title: getRoomTitle(neighbor, locale),
        })
      : interpolate(t.hud.go, { direction: dir });
  };

  const fade = reducedMotion ? { duration: 0 } : springUI;

  const upPosition = isProjectDetail
    ? "top-[7.25rem] left-1/2 -translate-x-1/2"
    : "top-[4.75rem] left-1/2 -translate-x-1/2";

  return (
    <>
      <div className="pointer-events-none fixed left-1/2 top-4 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        {isProjectDetail && (
          <div
            className="system-chip inline-flex w-fit max-w-[min(90vw,22rem)] items-center rounded-full px-4 py-2"
            aria-hidden
          >
            <p className="font-mono text-center text-xs tracking-wide text-foreground/90">
              {roomTitle}
            </p>
          </div>
        )}
        <AnimatePresence>
          {showControls && (
            <motion.div
              key="hints"
              initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={fade}
            >
              <NavigatorHints />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {interpolate(t.world.roomLive, { title: announcement })}
      </div>

      <AnimatePresence>
        {showControls && hasUp && (
          <motion.button
            key="up"
            type="button"
            aria-label={destinationLabel("up")}
            disabled={isTransitioning}
            onClick={() => move("up")}
            className={`${NAV_BUTTON_CLASS} fixed z-40 ${upPosition}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={reducedMotion ? undefined : { scale: 1.06 }}
            whileTap={reducedMotion ? undefined : { scale: 0.94 }}
            transition={fade}
          >
            <ChevronUp className="h-5 w-5" aria-hidden />
          </motion.button>
        )}

        {showControls &&
          edgeDirections.map((direction) => {
            const Icon = ICONS[direction];
            return (
              <motion.button
                key={direction}
                type="button"
                aria-label={destinationLabel(direction)}
                disabled={isTransitioning}
                onClick={() => move(direction)}
                className={`${NAV_BUTTON_CLASS} fixed z-40 ${POSITIONS[direction]}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={reducedMotion ? undefined : { scale: 1.06 }}
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                transition={fade}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </motion.button>
            );
          })}
      </AnimatePresence>
    </>
  );
}
