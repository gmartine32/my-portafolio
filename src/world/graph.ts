import type { Direction, Room } from "../types/world";
import { getProjectRoomIds, getRoom, rooms } from "./map";

export const MAIN_ROOM_IDS = [
  "home",
  "about",
  "projects",
  "experience",
  "opensource",
  "contact",
] as const;

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

export type GraphEdge = {
  id: string;
  from: Room;
  to: Room;
};

export type GridBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export function getMainRooms(): Room[] {
  return MAIN_ROOM_IDS.map((id) => rooms[id]).filter(Boolean);
}

/** Unique undirected edges between the given rooms, derived from neighbor links. */
export function getEdges(roomIds: readonly string[]): GraphEdge[] {
  const allowed = new Set(roomIds);
  const seen = new Set<string>();
  const edges: GraphEdge[] = [];

  roomIds.forEach((roomId) => {
    const room = getRoom(roomId);
    if (!room) return;

    DIRECTIONS.forEach((direction) => {
      const neighborId = room[direction];
      if (!neighborId || !allowed.has(neighborId)) return;

      const key = [room.id, neighborId].sort().join("::");
      if (seen.has(key)) return;
      seen.add(key);

      const neighbor = getRoom(neighborId);
      if (!neighbor) return;
      edges.push({ id: key, from: room, to: neighbor });
    });
  });

  return edges;
}

export function getGridBounds(list: readonly Room[]): GridBounds {
  if (list.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  const xs = list.map((room) => room.x);
  const ys = list.map((room) => room.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

/** Grid coordinates mapped to 0..1, centered when an axis has no span. */
export function toNormalized(
  room: Room,
  bounds: GridBounds,
): { nx: number; ny: number } {
  const spanX = bounds.maxX - bounds.minX;
  const spanY = bounds.maxY - bounds.minY;
  return {
    nx: spanX === 0 ? 0.5 : (room.x - bounds.minX) / spanX,
    ny: spanY === 0 ? 0.5 : (room.y - bounds.minY) / spanY,
  };
}

/** Project detail rooms resolve to their parent section so the map can highlight it. */
export function getSectionForRoom(roomId: string): string {
  const room = getRoom(roomId);
  if (!room) return "home";
  if (room.componentKey === "project-detail") return "projects";
  return room.id;
}

export function isProjectRoom(roomId: string): boolean {
  return getRoom(roomId)?.componentKey === "project-detail";
}

export function getProjectRooms(): Room[] {
  return getProjectRoomIds()
    .map((id) => getRoom(id))
    .filter((room): room is Room => Boolean(room));
}

export function gridDistance(fromId: string, toId: string): number {
  const from = getRoom(fromId);
  const to = getRoom(toId);
  if (!from || !to) return 0;
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}
