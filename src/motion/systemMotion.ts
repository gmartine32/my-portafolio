import type { Transition, Variants } from "framer-motion";

export const springSpatial: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

export const springUI: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
  mass: 0.6,
};

export const springDepth: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 26,
  mass: 1.1,
};

export const easeSpatial: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

export const depthEnter: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Opacity-only enter — avoids transform compositor glitches on mobile scroll. */
export const depthEnterFlat: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const depthExit: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSpatial,
  },
};

export function roomDepthTransition(reducedMotion: boolean): Transition {
  if (reducedMotion) return { duration: 0 };
  return springSpatial;
}

export function inactiveRoomMotion(
  isActive: boolean,
  reducedMotion: boolean,
  options?: { hideInactive?: boolean },
): { opacity: number; scale: number; filter: string } {
  if (options?.hideInactive && !isActive) {
    return { opacity: 0, scale: 1, filter: "blur(0px)" };
  }
  if (reducedMotion) {
    return { opacity: 1, scale: 1, filter: "blur(0px)" };
  }
  return isActive
    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
    : { opacity: 0.38, scale: 0.965, filter: "blur(1.5px)" };
}
