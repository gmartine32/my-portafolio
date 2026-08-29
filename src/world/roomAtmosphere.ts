import { getSectionForRoom } from "./graph";
import { getRoom } from "./map";

export type AtmosphereZone = "core" | "profile" | "work" | "path" | "edge";

export type RoomAtmosphere = {
  accentOpacity: number;
  planeOpacity: number;
  accentAngle: number;
  vignetteStrength: number;
  farTintOpacity: number;
};

const ATMOSPHERES: Record<AtmosphereZone, RoomAtmosphere> = {
  core: {
    accentOpacity: 0.04,
    planeOpacity: 1,
    accentAngle: 0,
    vignetteStrength: 0.55,
    farTintOpacity: 0.05,
  },
  profile: {
    accentOpacity: 0.045,
    planeOpacity: 1.15,
    accentAngle: 8,
    vignetteStrength: 0.6,
    farTintOpacity: 0.06,
  },
  work: {
    accentOpacity: 0.07,
    planeOpacity: 0.95,
    accentAngle: -12,
    vignetteStrength: 0.5,
    farTintOpacity: 0.08,
  },
  path: {
    accentOpacity: 0.035,
    planeOpacity: 0.85,
    accentAngle: 4,
    vignetteStrength: 0.75,
    farTintOpacity: 0.04,
  },
  edge: {
    accentOpacity: 0.025,
    planeOpacity: 0.65,
    accentAngle: 0,
    vignetteStrength: 0.8,
    farTintOpacity: 0.03,
  },
};

function zoneForSection(sectionId: string): AtmosphereZone {
  switch (sectionId) {
    case "home":
      return "core";
    case "about":
    case "opensource":
      return "profile";
    case "projects":
      return "work";
    case "experience":
      return "path";
    case "contact":
      return "edge";
    default:
      return "core";
  }
}

export function getAtmosphereForRoom(roomId: string): RoomAtmosphere {
  const room = getRoom(roomId);
  if (room?.componentKey === "project-detail") {
    return ATMOSPHERES.work;
  }
  const sectionId = getSectionForRoom(roomId);
  return ATMOSPHERES[zoneForSection(sectionId)];
}
