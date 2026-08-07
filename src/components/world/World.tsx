import { useEffect } from "react";
import { motion } from "framer-motion";
import { AboutRoom } from "../rooms/AboutRoom";
import { ContactRoom } from "../rooms/ContactRoom";
import { ExperienceRoom } from "../rooms/ExperienceRoom";
import { HomeRoom } from "../rooms/HomeRoom";
import { OpenSourceRoom } from "../rooms/OpenSourceRoom";
import { ProjectDetailRoom } from "../rooms/ProjectDetailRoom";
import { ProjectsRoom } from "../rooms/ProjectsRoom";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useGlassPointerShine } from "../../hooks/useGlassPointerShine";
import { useWorldControls } from "../../hooks/useWorldControls";
import { useNavigationStore } from "../../stores/navigationStore";
import { roomList } from "../../world/map";
import { AmbientDunesBackground } from "./AmbientDunesBackground";
import { Camera } from "./Camera";
import { HUD } from "./HUD";
import { NavigatorHints } from "./NavigatorHints";
import { RoomFrame } from "./RoomFrame";

function RoomContent({
  componentKey,
  projectId,
}: {
  componentKey: string;
  projectId?: string;
}) {
  switch (componentKey) {
    case "home":
      return <HomeRoom />;
    case "about":
      return <AboutRoom />;
    case "projects":
      return <ProjectsRoom />;
    case "experience":
      return <ExperienceRoom />;
    case "contact":
      return <ContactRoom />;
    case "opensource":
      return <OpenSourceRoom />;
    case "project-detail":
      return <ProjectDetailRoom projectId={projectId ?? ""} />;
    default:
      return null;
  }
}

export default function World() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const hydrateFromUrl = useNavigationStore((s) => s.hydrateFromUrl);
  const reducedMotion = usePrefersReducedMotion();
  const { setWorldRoot, onPointerDown, onPointerUp, onPointerCancel } =
    useWorldControls();
  useGlassPointerShine(!reducedMotion);

  useEffect(() => {
    hydrateFromUrl();
  }, [hydrateFromUrl]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={setWorldRoot}
      className="fixed inset-0 z-10 h-[100dvh] w-screen touch-manipulation bg-background"
      role="application"
      aria-label="Developer World — portfolio exploratorio"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <AmbientDunesBackground />

      <HUD />
      <NavigatorHints />

      <Camera currentRoomId={currentRoomId}>
        {roomList.map((room) => {
          const isActive = room.id === currentRoomId;
          return (
            <div
              key={room.id}
              className="absolute"
              style={{
                left: `${room.x * 100}vw`,
                top: `${room.y * 100}vh`,
                width: "100vw",
                height: "100vh",
              }}
            >
              <motion.div
                className="h-full w-full"
                animate={
                  reducedMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: isActive ? 1 : 0.55,
                        scale: isActive ? 1 : 0.985,
                      }
                }
                transition={{ duration: 0.35 }}
              >
                <RoomFrame title={room.title} isActive={isActive}>
                  <div
                    className={isActive ? "pointer-events-auto" : "pointer-events-none"}
                  >
                    <RoomContent
                      componentKey={room.componentKey}
                      projectId={room.projectId}
                    />
                  </div>
                </RoomFrame>
              </motion.div>
            </div>
          );
        })}
      </Camera>
    </div>
  );
}
