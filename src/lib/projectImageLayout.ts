import type { Project } from "../types/world";

export type ProjectImageLayout = "mobile" | "desktop";

export function isMobileProject(
  project: Pick<Project, "tech"> & { id?: string; layout?: ProjectImageLayout },
): boolean {
  if (project.layout === "mobile") return true;
  if (project.layout === "desktop") return false;
  if (project.id === "odr") return true;
  return project.tech.some((t) => t.toLowerCase().includes("react native"));
}

export function getProjectImageLayout(
  project: Pick<Project, "tech"> & { id?: string; layout?: ProjectImageLayout },
): ProjectImageLayout {
  return isMobileProject(project) ? "mobile" : "desktop";
}

