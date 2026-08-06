import { useNavigationStore } from "../../stores/navigationStore";
import { getRoom } from "../../world/map";
import { getAvailableDirections } from "../../world/navigation";

const HINTS: Record<string, string> = {
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

export function NavigatorHints() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const room = getRoom(currentRoomId);
  const directions = getAvailableDirections(currentRoomId);

  if (!room || directions.length === 0) return null;

  return (
    <div className="glass-chip pointer-events-none fixed left-1/2 top-16 z-40 inline-flex w-fit -translate-x-1/2 items-center rounded-full px-3 py-1.5 text-xs text-foreground/85">
      <span className="mr-2 hidden sm:inline">Navegar</span>
      {directions.map((dir) => (
        <span key={dir} className="mx-0.5 inline-block font-medium text-foreground">
          {HINTS[dir]}
        </span>
      ))}
    </div>
  );
}
