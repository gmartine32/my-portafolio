import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { CAMERA_TRANSITION_MS } from "../../stores/navigationStore";
import { getRoom } from "../../world/map";

type CameraProps = {
  currentRoomId: string;
  children: ReactNode;
};

export function Camera({ currentRoomId, children }: CameraProps) {
  const reducedMotion = usePrefersReducedMotion();
  const room = getRoom(currentRoomId);
  const x = room?.x ?? 0;
  const y = room?.y ?? 0;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 will-change-transform"
        animate={{
          x: `${-x * 100}vw`,
          y: `${-y * 100}vh`,
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: CAMERA_TRANSITION_MS / 1000,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
