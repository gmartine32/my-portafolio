import { useEffect } from "react";

import { motion } from "framer-motion";

import { AboutRoom } from "../rooms/AboutRoom";

import { ContactRoom } from "../rooms/ContactRoom";

import { ExperienceRoom } from "../rooms/ExperienceRoom";

import { HomeRoom } from "../rooms/HomeRoom";

import { ProjectDetailRoom } from "../rooms/ProjectDetailRoom";

import { ProjectsRoom } from "../rooms/ProjectsRoom";

import { applyHtmlLang } from "../../i18n/detect";

import { useLocale, useUi } from "../../i18n/hooks";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import { useGlassPointerShine } from "../../hooks/useGlassPointerShine";

import { useWorldControls } from "../../hooks/useWorldControls";

import {

  inactiveRoomMotion,

  roomDepthTransition,

} from "../../motion/systemMotion";

import { useNavigationStore } from "../../stores/navigationStore";

import { roomList } from "../../world/map";

import { getRoomTitle } from "../../world/titles";

import { Camera } from "./Camera";

import { HUD } from "./HUD";

import { Onboarding } from "./Onboarding";

import { RoomFrame } from "./RoomFrame";

import { SystemEnvironment } from "./SystemEnvironment";

import { WorldMap } from "./WorldMap";



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

    case "project-detail":

      return <ProjectDetailRoom projectId={projectId ?? ""} />;

    default:

      return null;

  }

}



export default function World() {

  const currentRoomId = useNavigationStore((s) => s.currentRoomId);

  const hydrateFromUrl = useNavigationStore((s) => s.hydrateFromUrl);

  const refreshAnnouncement = useNavigationStore((s) => s.refreshAnnouncement);

  const locale = useLocale();

  const t = useUi();

  const reducedMotion = usePrefersReducedMotion();

  const isCoarseMobile = useMediaQuery("(max-width: 1023px)");

  const { setWorldRoot, onPointerDown, onPointerUp, onPointerCancel } =

    useWorldControls();

  useGlassPointerShine(!reducedMotion);



  useEffect(() => {

    hydrateFromUrl();

  }, [hydrateFromUrl]);



  useEffect(() => {

    applyHtmlLang(locale);

    refreshAnnouncement();

  }, [locale, refreshAnnouncement]);



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

      aria-label={t.world.ariaLabel}

      onPointerDown={onPointerDown}

      onPointerUp={onPointerUp}

      onPointerCancel={onPointerCancel}

    >

      <SystemEnvironment currentRoomId={currentRoomId} />



      <HUD />



      <WorldMap />



      <Onboarding />



      <Camera currentRoomId={currentRoomId}>

        {roomList.map((room) => {

          const isActive = room.id === currentRoomId;

          const depth = inactiveRoomMotion(isActive, reducedMotion, {
            hideInactive: isCoarseMobile,
          });

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

                className="h-full w-full origin-center"

                animate={depth}

                transition={roomDepthTransition(reducedMotion)}

              >

                <RoomFrame title={getRoomTitle(room, locale)} isActive={isActive}>

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

