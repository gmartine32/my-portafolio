import type { Direction } from "../../types/world";
import { useLocale } from "../../i18n/hooks";
import { useNavigationStore } from "../../stores/navigationStore";
import { getRoom } from "../../world/map";
import { getAvailableDirections, resolveNeighbor } from "../../world/navigation";
import { getRoomTitle } from "../../world/titles";

const ARROWS: Record<Direction, string> = {
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

export function NavigatorHints() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const locale = useLocale();
  const room = getRoom(currentRoomId);
  const directions = getAvailableDirections(currentRoomId);

  if (!room || directions.length === 0) return null;

  return (
    <div className="glass-chip pointer-events-none flex max-w-[min(92vw,32rem)] flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl px-3.5 py-1.5 text-xs text-foreground/85">
      {directions.map((direction) => {
        const neighbor = resolveNeighbor(currentRoomId, direction);
        if (!neighbor) return null;
        return (
          <span key={direction} className="inline-flex items-center gap-1">
            <span className="font-medium text-primary">{ARROWS[direction]}</span>
            <span className="max-w-[9rem] truncate text-foreground/90">
              {getRoomTitle(neighbor, locale)}
            </span>
          </span>
        );
      })}
    </div>
  );
}
