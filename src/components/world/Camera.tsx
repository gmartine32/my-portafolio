import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { CAMERA_TRANSITION_MS, useNavigationStore } from "../../stores/navigationStore";
import { getRoom } from "../../world/map";

type CameraProps = {
  currentRoomId: string;
  children: ReactNode;
};

const FADE_OUT_MS = 140;
const FADE_IN_MS = 240;

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export function Camera({ currentRoomId, children }: CameraProps) {
  const reducedMotion = usePrefersReducedMotion();
  const navigationKind = useNavigationStore((s) => s.navigationKind);
  const controls = useAnimationControls();
  const [cameraRoomId, setCameraRoomId] = useState(currentRoomId);
  // The fade sequence re-renders mid-flight; this keeps it from restarting.
  const fadingTo = useRef<string | null>(null);

  const isJump = navigationKind === "jump";

  // Distant jumps would drag the viewport across many screens, so the camera
  // cuts to the target while the content cross-fades.
  useEffect(() => {
    if (currentRoomId === cameraRoomId) return;

    if (reducedMotion || !isJump) {
      setCameraRoomId(currentRoomId);
      return;
    }

    if (fadingTo.current === currentRoomId) return;
    fadingTo.current = currentRoomId;

    const run = async () => {
      await controls.start({
        opacity: 0,
        transition: { duration: FADE_OUT_MS / 1000, ease: "easeIn" },
      });
      setCameraRoomId(currentRoomId);
      await nextFrame();
      await controls.start({
        opacity: 1,
        transition: { duration: FADE_IN_MS / 1000, ease: "easeOut" },
      });
      if (fadingTo.current === currentRoomId) fadingTo.current = null;
    };

    void run();
  }, [currentRoomId, cameraRoomId, isJump, reducedMotion, controls]);

  const room = getRoom(cameraRoomId);
  const x = room?.x ?? 0;
  const y = room?.y ?? 0;

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      initial={{ opacity: 1 }}
      animate={controls}
    >
      <motion.div
        className="absolute left-0 top-0 will-change-transform"
        animate={{
          x: `${-x * 100}vw`,
          y: `${-y * 100}vh`,
        }}
        transition={
          reducedMotion || isJump
            ? { duration: 0 }
            : {
                duration: CAMERA_TRANSITION_MS / 1000,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
