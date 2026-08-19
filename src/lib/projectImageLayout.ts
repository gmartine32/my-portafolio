import type { Project } from "../types/world";

export type ProjectImageLayout = "mobile" | "desktop";

export function isMobileProject(project: Pick<Project, "tech">): boolean {
  return project.tech.some((t) => t.toLowerCase().includes("react native"));
}

export function getProjectImageLayout(
  project: Pick<Project, "tech">,
): ProjectImageLayout {
  return isMobileProject(project) ? "mobile" : "desktop";
}
