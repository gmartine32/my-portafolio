import type { Direction, Room } from "../types/world";
import { getRoom } from "./map";

export function resolveNeighbor(
  roomId: string,
  direction: Direction,
): Room | undefined {
  const room = getRoom(roomId);
  if (!room) return undefined;
  const neighborId = room[direction];
  return neighborId ? getRoom(neighborId) : undefined;
}

export function canMove(roomId: string, direction: Direction): boolean {
  return Boolean(resolveNeighbor(roomId, direction));
}

export function getAvailableDirections(roomId: string): Direction[] {
  const room = getRoom(roomId);
  if (!room) return [];
  return (["up", "down", "left", "right"] as Direction[]).filter(
    (dir) => Boolean(room[dir]),
  );
}

export function roomFromSearchParams(
  search: string,
  fallback = "home",
): string {
  const params = new URLSearchParams(search);
  const room = params.get("room");
  return room && getRoom(room) ? room : fallback;
}

export function syncRoomToUrl(roomId: string): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (roomId === "home") {
    url.searchParams.delete("room");
  } else {
    url.searchParams.set("room", roomId);
  }
  window.history.replaceState({ room: roomId }, "", url.toString());
}
