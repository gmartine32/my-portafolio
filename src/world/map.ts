import { getProjectChain } from "../data/shared";
import type { Room } from "../types/world";

const projectChain = getProjectChain();

function buildProjectRooms(): Record<string, Room> {
  const rooms: Record<string, Room> = {};

  projectChain.forEach((project, index) => {
    const id = `project-${project.id}`;
    const prevId = index === 0 ? "projects" : `project-${projectChain[index - 1].id}`;
    const nextId =
      index < projectChain.length - 1
        ? `project-${projectChain[index + 1].id}`
        : undefined;

    rooms[id] = {
      id,
      title: project.title,
      x: 1 + index + 1,
      y: 0,
      left: prevId,
      right: nextId,
      up: "projects",
      componentKey: "project-detail",
      projectId: project.id,
    };
  });

  return rooms;
}

const projectRooms = buildProjectRooms();
const firstProjectId = projectChain[0]
  ? `project-${projectChain[0].id}`
  : undefined;

export const rooms: Record<string, Room> = {
  home: {
    id: "home",
    title: "Inicio",
    x: 0,
    y: 0,
    left: "about",
    right: "projects",
    down: "experience",
    componentKey: "home",
  },
  about: {
    id: "about",
    title: "Sobre mí",
    x: -1,
    y: 0,
    right: "home",
    down: "experience",
    componentKey: "about",
  },
  projects: {
    id: "projects",
    title: "Proyectos",
    x: 1,
    y: 0,
    left: "home",
    right: firstProjectId,
    componentKey: "projects",
  },
  experience: {
    id: "experience",
    title: "Experiencia",
    x: 0,
    y: 1,
    up: "home",
    down: "contact",
    left: "about",
    componentKey: "experience",
  },
  contact: {
    id: "contact",
    title: "Contacto",
    x: -1,
    y: 2,
    up: "experience",
    componentKey: "contact",
  },
  // Hidden for now — re-enable by restoring links in about/experience/contact
  opensource: {
    id: "opensource",
    title: "Open Source",
    x: -1,
    y: 1,
    componentKey: "opensource",
  },
  ...projectRooms,
};

export const DEFAULT_ROOM_ID = "home";

export const roomList = Object.values(rooms);

export function getRoom(id: string): Room | undefined {
  return rooms[id];
}

export function getProjectRoomIds(): string[] {
  return projectChain.map((p) => `project-${p.id}`);
}
