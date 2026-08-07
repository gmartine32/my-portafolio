import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { Direction } from "../../types/world";
import { useNavigationStore } from "../../stores/navigationStore";
import { getRoom } from "../../world/map";
import { getAvailableDirections } from "../../world/navigation";

const ICONS: Record<Direction, typeof ChevronUp> = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
};

const POSITIONS: Record<Direction, string> = {
  up: "top-6 left-1/2 -translate-x-1/2",
  down: "bottom-6 left-1/2 -translate-x-1/2",
  left: "left-3 bottom-24 top-auto translate-y-0 sm:left-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2",
  right:
    "right-3 bottom-24 top-auto translate-y-0 sm:right-6 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2",
};

const LABEL: Record<Direction, string> = {
  up: "arriba",
  down: "abajo",
  left: "a la izquierda",
  right: "a la derecha",
};

function useLightboxOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(document.body.dataset.lightbox === "open");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-lightbox"],
    });
    return () => observer.disconnect();
  }, []);

  return open;
}

export function HUD() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const announcement = useNavigationStore((s) => s.announcement);
  const isTransitioning = useNavigationStore((s) => s.isTransitioning);
  const move = useNavigationStore((s) => s.move);
  const room = getRoom(currentRoomId);
  const directions = getAvailableDirections(currentRoomId);
  const lightboxOpen = useLightboxOpen();

  return (
    <>
      <div
        className="glass-chip pointer-events-none fixed left-1/2 top-4 z-40 inline-flex w-fit -translate-x-1/2 items-center rounded-full px-4 py-2"
        aria-hidden
      >
        <p className="font-heading text-sm font-medium tracking-wide text-foreground/90">
          {room?.title ?? "Mundo"}
        </p>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Habitación: {announcement}
      </div>

      {!lightboxOpen &&
        directions.map((direction) => {
          const Icon = ICONS[direction];
          return (
            <button
              key={direction}
              type="button"
              aria-label={`Ir ${LABEL[direction]}`}
              disabled={isTransitioning}
              onClick={() => move(direction)}
              className={`glass-panel glass-panel--interactive fixed z-40 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 ${POSITIONS[direction]}`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </button>
          );
        })}
    </>
  );
}
