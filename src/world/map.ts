import { projects } from "../data/content";
import type { Room } from "../types/world";

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
const projectChain = [...featured, ...others];

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
    down: "opensource",
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
    left: "opensource",
    componentKey: "experience",
  },
  contact: {
    id: "contact",
    title: "Contacto",
    x: -1,
    y: 2,
    up: "opensource",
    componentKey: "contact",
  },
  opensource: {
    id: "opensource",
    title: "Open Source",
    x: -1,
    y: 1,
    up: "about",
    down: "contact",
    right: "experience",
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
