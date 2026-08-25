import { getContent } from "../data/getContent";
import type { Locale } from "../i18n/locales";
import { getUi } from "../i18n/ui";
import type { Room } from "../types/world";
import { DEFAULT_ROOM_ID, getRoom } from "./map";

const MAIN_ROOM_TITLE_IDS = [
  "home",
  "about",
  "projects",
  "experience",
  "contact",
  "opensource",
] as const;

type MainRoomTitleId = (typeof MAIN_ROOM_TITLE_IDS)[number];

function isMainRoomTitleId(id: string): id is MainRoomTitleId {
  return (MAIN_ROOM_TITLE_IDS as readonly string[]).includes(id);
}

export function getRoomTitle(room: Room, locale: Locale): string {
  if (room.projectId) {
    const project = getContent(locale).projects.find((item) => item.id === room.projectId);
    return project?.title ?? room.title;
  }

  if (isMainRoomTitleId(room.id)) {
    return getUi(locale).rooms[room.id];
  }

  return room.title;
}

export function getRoomTitleById(roomId: string, locale: Locale): string {
  const room = getRoom(roomId);
  if (!room) return getUi(locale).world.fallbackTitle;
  return getRoomTitle(room, locale);
}

export function defaultAnnouncement(locale: Locale): string {
  return getRoomTitleById(DEFAULT_ROOM_ID, locale);
}
