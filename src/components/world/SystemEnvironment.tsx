import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springDepth } from "../../motion/systemMotion";
import { getRoom } from "../../world/map";
import { getAtmosphereForRoom } from "../../world/roomAtmosphere";

type SystemEnvironmentProps = {
  currentRoomId: string;
};

export function SystemEnvironment({ currentRoomId }: SystemEnvironmentProps) {
  const reducedMotion = usePrefersReducedMotion();
  const room = getRoom(currentRoomId);
  const x = room?.x ?? 0;
  const y = room?.y ?? 0;
  const atmosphere = useMemo(
    () => getAtmosphereForRoom(currentRoomId),
    [currentRoomId],
  );

  const parallax = useMemo(
    () => ({
      far: reducedMotion ? { x: 0, y: 0 } : { x: -x * 8, y: -y * 6 },
      mid: reducedMotion ? { x: 0, y: 0 } : { x: -x * 18, y: -y * 14 },
      near: reducedMotion ? { x: 0, y: 0 } : { x: -x * 28, y: -y * 22 },
      accent: reducedMotion ? { x: 0, y: 0 } : { x: -x * 12, y: -y * 10 },
    }),
    [x, y, reducedMotion],
  );

  const transition = reducedMotion ? { duration: 0 } : springDepth;
  const layerTransition = reducedMotion
    ? { duration: 0.3 }
    : { ...springDepth, duration: 0.6 };

  const envStyle = {
    "--env-accent-opacity": atmosphere.accentOpacity,
    "--env-plane-opacity": atmosphere.planeOpacity,
    "--env-vignette-strength": atmosphere.vignetteStrength,
    "--env-far-tint": atmosphere.farTintOpacity,
  } as CSSProperties;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={envStyle}
    >
      <div className="absolute inset-0 system-base" />

      <motion.div
        className="absolute inset-[-5%] depth-plane-far"
        animate={parallax.far}
        transition={transition}
        initial={false}
      />

      <motion.div
        className="depth-plane-mid absolute inset-[-10%]"
        animate={parallax.mid}
        transition={transition}
        initial={false}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: atmosphere.planeOpacity }}
          transition={layerTransition}
          initial={false}
        >
          <div
            className={`depth-plane-mid__sheet depth-plane-mid__sheet--a ${
              reducedMotion ? "" : "depth-float-a"
            }`}
          />
          <div
            className={`depth-plane-mid__sheet depth-plane-mid__sheet--b ${
              reducedMotion ? "" : "depth-float-b"
            }`}
          />
          <div
            className={`depth-plane-mid__sheet depth-plane-mid__sheet--c ${
              reducedMotion ? "" : "depth-float-c"
            }`}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[45%] depth-plane-near"
        animate={parallax.near}
        transition={transition}
        initial={false}
      />

      <motion.div
        className="depth-plane-accent"
        animate={{
          ...parallax.accent,
          rotate: atmosphere.accentAngle,
        }}
        transition={transition}
        initial={false}
      />

      <motion.div
        className="absolute inset-0 system-vignette"
        animate={{ opacity: atmosphere.vignetteStrength }}
        transition={layerTransition}
        initial={false}
      />

      <div className="noise-bg" />
    </div>
  );
}
