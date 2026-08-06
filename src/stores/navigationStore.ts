import { create } from "zustand";
import type { Direction } from "../types/world";
import { DEFAULT_ROOM_ID, getRoom } from "../world/map";
import {
  resolveNeighbor,
  roomFromSearchParams,
  syncRoomToUrl,
} from "../world/navigation";

const TRANSITION_MS = 400;

type NavigationState = {
  currentRoomId: string;
  isTransitioning: boolean;
  announcement: string;
  move: (direction: Direction) => boolean;
  goTo: (roomId: string) => boolean;
  hydrateFromUrl: () => void;
  setTransitioning: (value: boolean) => void;
};

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentRoomId: DEFAULT_ROOM_ID,
  isTransitioning: false,
  announcement: "Inicio",

  setTransitioning: (value) => set({ isTransitioning: value }),

  hydrateFromUrl: () => {
    if (typeof window === "undefined") return;
    const roomId = roomFromSearchParams(window.location.search);
    const room = getRoom(roomId);
    if (!room) return;
    set({
      currentRoomId: room.id,
      announcement: room.title,
    });
  },

  goTo: (roomId) => {
    const { currentRoomId, isTransitioning } = get();
    if (isTransitioning || roomId === currentRoomId) return false;
    const room = getRoom(roomId);
    if (!room) return false;

    set({ isTransitioning: true, currentRoomId: room.id, announcement: room.title });
    syncRoomToUrl(room.id);

    window.setTimeout(() => {
      set({ isTransitioning: false });
    }, TRANSITION_MS);

    return true;
  },

  move: (direction) => {
    const { currentRoomId, isTransitioning, goTo } = get();
    if (isTransitioning) return false;
    const neighbor = resolveNeighbor(currentRoomId, direction);
    if (!neighbor) return false;
    return goTo(neighbor.id);
  },
}));

export const CAMERA_TRANSITION_MS = TRANSITION_MS;
