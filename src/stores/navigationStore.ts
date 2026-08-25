import { create } from "zustand";
import type { Direction } from "../types/world";
import { detectLocale } from "../i18n/detect";
import { DEFAULT_LOCALE } from "../i18n/locales";
import { useLocaleStore } from "./localeStore";
import { DEFAULT_ROOM_ID, getRoom } from "../world/map";
import { gridDistance } from "../world/graph";
import {
  resolveNeighbor,
  roomFromSearchParams,
  syncRoomToUrl,
} from "../world/navigation";
import { defaultAnnouncement, getRoomTitle } from "../world/titles";

const TRANSITION_MS = 400;

/** Adjacent moves pan the camera; distant jumps cross-fade instead. */
export type NavigationKind = "step" | "jump";

function currentLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return useLocaleStore.getState().locale;
}

function titleForRoom(roomId: string) {
  const room = getRoom(roomId);
  if (!room) return defaultAnnouncement(currentLocale());
  return getRoomTitle(room, currentLocale());
}

type NavigationState = {
  currentRoomId: string;
  isTransitioning: boolean;
  announcement: string;
  hudControlsVisible: boolean;
  isMapOpen: boolean;
  isOnboardingOpen: boolean;
  visitedRoomIds: string[];
  navigationKind: NavigationKind;
  move: (direction: Direction) => boolean;
  goTo: (roomId: string) => boolean;
  hydrateFromUrl: () => void;
  refreshAnnouncement: () => void;
  setTransitioning: (value: boolean) => void;
  toggleHudControls: () => void;
  showHudControls: () => void;
  openMap: () => void;
  closeMap: () => void;
  toggleMap: () => void;
  setOnboardingOpen: (value: boolean) => void;
};

const initialLocale =
  typeof window === "undefined" ? DEFAULT_LOCALE : detectLocale();

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentRoomId: DEFAULT_ROOM_ID,
  isTransitioning: false,
  announcement: defaultAnnouncement(initialLocale),
  hudControlsVisible: false,
  isMapOpen: false,
  isOnboardingOpen: false,
  visitedRoomIds: [DEFAULT_ROOM_ID],
  navigationKind: "step",

  setTransitioning: (value) => set({ isTransitioning: value }),

  toggleHudControls: () =>
    set((state) => ({ hudControlsVisible: !state.hudControlsVisible })),

  showHudControls: () => set({ hudControlsVisible: true }),

  openMap: () => set({ isMapOpen: true, hudControlsVisible: false }),

  closeMap: () => set({ isMapOpen: false }),

  toggleMap: () =>
    set((state) => ({
      isMapOpen: !state.isMapOpen,
      hudControlsVisible: state.isMapOpen ? state.hudControlsVisible : false,
    })),

  setOnboardingOpen: (value) => set({ isOnboardingOpen: value }),

  refreshAnnouncement: () => {
    set({ announcement: titleForRoom(get().currentRoomId) });
  },

  hydrateFromUrl: () => {
    if (typeof window === "undefined") return;
    const roomId = roomFromSearchParams(window.location.search);
    const room = getRoom(roomId);
    if (!room) return;
    set((state) => ({
      currentRoomId: room.id,
      announcement: getRoomTitle(room, currentLocale()),
      visitedRoomIds: state.visitedRoomIds.includes(room.id)
        ? state.visitedRoomIds
        : [...state.visitedRoomIds, room.id],
    }));
  },

  goTo: (roomId) => {
    const { currentRoomId, isTransitioning } = get();
    if (isTransitioning || roomId === currentRoomId) return false;
    const room = getRoom(roomId);
    if (!room) return false;

    set((state) => ({
      isTransitioning: true,
      currentRoomId: room.id,
      announcement: getRoomTitle(room, currentLocale()),
      hudControlsVisible: false,
      isMapOpen: false,
      navigationKind: gridDistance(currentRoomId, room.id) > 1 ? "jump" : "step",
      visitedRoomIds: state.visitedRoomIds.includes(room.id)
        ? state.visitedRoomIds
        : [...state.visitedRoomIds, room.id],
    }));
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
