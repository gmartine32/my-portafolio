import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  FolderKanban,
  Github,
  HelpCircle,
  Home,
  Mail,
  Map as MapIcon,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Direction, Room, RoomComponentKey } from "../../types/world";
import { interpolate, useLocale, useUi } from "../../i18n/hooks";
import { useLightboxOpen } from "../../hooks/useLightboxOpen";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useNavigationStore } from "../../stores/navigationStore";
import { getRoomTitle, getRoomTitleById } from "../../world/titles";
import { LanguageToggle } from "./LanguageToggle";
import {
  MAIN_ROOM_IDS,
  getEdges,
  getGridBounds,
  getMainRooms,
  getProjectRooms,
  getSectionForRoom,
  toNormalized,
} from "../../world/graph";
import { resolveNeighbor } from "../../world/navigation";

const ROOM_ICONS: Record<RoomComponentKey, typeof Home> = {
  home: Home,
  about: User,
  projects: FolderKanban,
  experience: Briefcase,
  contact: Mail,
  opensource: Github,
  "project-detail": FolderKanban,
};

/** Inner padding of the graph viewport, in percent, so nodes never touch edges. */
const PAD = 14;

type LaidOutNode = {
  room: Room;
  x: number;
  y: number;
};

function useGraphLayout() {
  return useMemo(() => {
    const mainRooms = getMainRooms();
    const bounds = getGridBounds(mainRooms);
    const nodes: LaidOutNode[] = mainRooms.map((room) => {
      const { nx, ny } = toNormalized(room, bounds);
      return {
        room,
        x: PAD + nx * (100 - PAD * 2),
        y: PAD + ny * (100 - PAD * 2),
      };
    });
    const positionById = new Map(nodes.map((node) => [node.room.id, node]));
    const edges = getEdges(MAIN_ROOM_IDS).map((edge) => ({
      id: edge.id,
      from: positionById.get(edge.from.id),
      to: positionById.get(edge.to.id),
    }));
    return { nodes, edges };
  }, []);
}

function MinimapGlyph({
  nodes,
  edges,
  activeId,
  visited,
}: {
  nodes: LaidOutNode[];
  edges: { id: string; from?: LaidOutNode; to?: LaidOutNode }[];
  activeId: string;
  visited: string[];
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-9 w-9 shrink-0 overflow-visible"
      aria-hidden
      focusable="false"
    >
      {edges.map((edge) =>
        edge.from && edge.to ? (
          <line
            key={edge.id}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            className="text-foreground/55"
          />
        ) : null,
      )}
      {nodes.map((node) => {
        const isActive = node.room.id === activeId;
        const isVisited = visited.includes(node.room.id);
        return (
          <g key={node.room.id}>
            {isActive && (
              <circle
                cx={node.x}
                cy={node.y}
                r={15}
                className="fill-primary/25"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 9 : 6}
              className={
                isActive
                  ? "fill-primary"
                  : isVisited
                    ? "fill-foreground"
                    : "fill-foreground/55"
              }
            />
          </g>
        );
      })}
    </svg>
  );
}

function NodeButton({
  node,
  title,
  isCurrent,
  isVisited,
  isFocused,
  expandable,
  expanded,
  count,
  onActivate,
  registerRef,
  goToLabel,
  currentRoomSuffix,
  projectsCountLabel,
}: {
  node: LaidOutNode;
  title: string;
  isCurrent: boolean;
  isVisited: boolean;
  isFocused: boolean;
  expandable: boolean;
  expanded: boolean;
  count?: number;
  onActivate: () => void;
  registerRef: (el: HTMLButtonElement | null) => void;
  goToLabel: string;
  currentRoomSuffix: string;
  projectsCountLabel: string;
}) {
  const Icon = ROOM_ICONS[node.room.componentKey];

  return (
    <button
      ref={registerRef}
      type="button"
      tabIndex={isFocused ? 0 : -1}
      aria-current={isCurrent ? "true" : undefined}
      aria-expanded={expandable ? expanded : undefined}
      aria-label={expandable ? projectsCountLabel : `${goToLabel}${isCurrent ? currentRoomSuffix : ""}`}
      onClick={onActivate}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className={[
        "glass-panel glass-panel--interactive absolute flex w-[5.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-center transition sm:w-28 sm:gap-1.5 sm:px-3 sm:py-3",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isCurrent ? "glass-panel--active ring-2 ring-primary/70" : "",
        !isCurrent && !isVisited ? "opacity-70" : "",
      ].join(" ")}
    >
      <Icon
        className={`h-4 w-4 sm:h-5 sm:w-5 ${isCurrent ? "text-primary" : "text-foreground/85"}`}
        aria-hidden
      />
      <span className="font-heading text-[0.7rem] font-medium leading-tight text-foreground sm:text-xs">
        {title}
      </span>
      {expandable && (
        <span className="inline-flex items-center gap-0.5 text-[0.6rem] text-foreground/85">
          {count}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          />
        </span>
      )}
    </button>
  );
}

export function WorldMap() {
  const currentRoomId = useNavigationStore((s) => s.currentRoomId);
  const visitedRoomIds = useNavigationStore((s) => s.visitedRoomIds);
  const isMapOpen = useNavigationStore((s) => s.isMapOpen);
  const isOnboardingOpen = useNavigationStore((s) => s.isOnboardingOpen);
  const openMap = useNavigationStore((s) => s.openMap);
  const closeMap = useNavigationStore((s) => s.closeMap);
  const goTo = useNavigationStore((s) => s.goTo);
  const setOnboardingOpen = useNavigationStore((s) => s.setOnboardingOpen);
  const reducedMotion = usePrefersReducedMotion();
  const lightboxOpen = useLightboxOpen();
  const locale = useLocale();
  const t = useUi();

  const { nodes, edges } = useGraphLayout();
  const projectRooms = useMemo(() => getProjectRooms(), []);
  const activeSectionId = getSectionForRoom(currentRoomId);

  const [expandedProjects, setExpandedProjects] = useState(false);
  const [focusedId, setFocusedId] = useState(activeSectionId);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const mainIds = useMemo(() => new Set<string>(MAIN_ROOM_IDS), []);

  useEffect(() => {
    if (!isMapOpen) return;
    setFocusedId(activeSectionId);
    setExpandedProjects(currentRoomId.startsWith("project-"));
  }, [isMapOpen, activeSectionId, currentRoomId]);

  useEffect(() => {
    if (!isMapOpen) return;
    const frame = requestAnimationFrame(() => {
      nodeRefs.current[focusedId]?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isMapOpen, focusedId]);

  const dismiss = useCallback(() => {
    closeMap();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, [closeMap]);

  useEffect(() => {
    if (!isMapOpen) return;

    const ARROWS: Record<string, Direction> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }

      if (event.key === "Tab") {
        // Keep focus inside the dialog.
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]):not([tabindex="-1"]), a[href]',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      const direction = ARROWS[event.key];
      if (!direction) return;
      event.preventDefault();
      const neighbor = resolveNeighbor(focusedId, direction);
      if (neighbor && mainIds.has(neighbor.id)) setFocusedId(neighbor.id);
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isMapOpen, focusedId, mainIds, dismiss]);

  const travel = useCallback(
    (roomId: string) => {
      if (roomId === currentRoomId) {
        dismiss();
        return;
      }
      goTo(roomId);
      requestAnimationFrame(() => triggerRef.current?.focus());
    },
    [currentRoomId, goTo, dismiss],
  );

  const currentTitle = getRoomTitleById(activeSectionId, locale);

  const overlayTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <AnimatePresence>
        {!lightboxOpen && (
          <motion.div
            key="map-trigger"
            className="fixed bottom-4 left-3 z-50 flex flex-col items-start gap-1.5 sm:bottom-6 sm:left-6"
            data-no-world-swipe
            data-onboarding-anchor="map"
            data-glass-shine="off"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
          >
            <LanguageToggle />

            <div className="flex items-center gap-2">
              <button
                ref={triggerRef}
                type="button"
                onClick={openMap}
                aria-haspopup="dialog"
                aria-expanded={isMapOpen}
                className="glass-panel glass-panel--interactive flex items-center gap-2 rounded-2xl bg-background/55 px-2.5 py-2 text-left text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-3"
              >
                <MinimapGlyph
                  nodes={nodes}
                  edges={edges}
                  activeId={activeSectionId}
                  visited={visitedRoomIds}
                />
                <span className="hidden flex-col leading-tight sm:flex">
                  <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-widest text-foreground">
                    <MapIcon className="h-3 w-3" aria-hidden />
                    {t.map.chip}
                  </span>
                  <span className="font-heading text-sm font-medium text-foreground">
                    {currentTitle}
                  </span>
                </span>
                <span className="sr-only">
                  {interpolate(t.map.openSr, { title: currentTitle })}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOnboardingOpen(true)}
                aria-label={t.map.helpAria}
                className="glass-panel glass-panel--interactive flex h-10 w-10 items-center justify-center rounded-full bg-background/55 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMapOpen && !isOnboardingOpen && (
          <motion.div
            key="world-map"
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            data-no-world-swipe
          >
            <div
              className="absolute inset-0 bg-background/70 backdrop-blur-xl"
              onClick={dismiss}
              aria-hidden
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.map.dialogAria}
              className="glass-panel relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl"
              data-glass-shine="off"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
              transition={overlayTransition}
            >
              <header className="flex items-start justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                    {t.map.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-foreground/85 sm:text-sm">
                    {t.map.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label={t.map.close}
                  className="glass-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-7 sm:pb-6">
                <div className="relative mx-auto mt-4 aspect-[4/3] w-full max-w-xl">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                    focusable="false"
                  >
                    {edges.map((edge) =>
                      edge.from && edge.to ? (
                        <line
                          key={edge.id}
                          x1={edge.from.x}
                          y1={edge.from.y}
                          x2={edge.to.x}
                          y2={edge.to.y}
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          className="text-foreground/25"
                        />
                      ) : null,
                    )}
                  </svg>

                  {nodes.map((node) => {
                    const expandable = node.room.id === "projects";
                    const title = getRoomTitle(node.room, locale);
                    return (
                      <NodeButton
                        key={node.room.id}
                        node={node}
                        title={title}
                        isCurrent={node.room.id === activeSectionId}
                        isVisited={visitedRoomIds.includes(node.room.id)}
                        isFocused={focusedId === node.room.id}
                        expandable={expandable}
                        expanded={expandable && expandedProjects}
                        count={expandable ? projectRooms.length : undefined}
                        goToLabel={interpolate(t.map.goTo, { title })}
                        currentRoomSuffix={t.map.currentRoom}
                        projectsCountLabel={interpolate(t.map.projectsCount, {
                          title,
                          count: projectRooms.length,
                          action: expandable && expandedProjects ? t.map.hideList : t.map.showList,
                        })}
                        onActivate={() => {
                          setFocusedId(node.room.id);
                          if (expandable) {
                            setExpandedProjects((value) => !value);
                            return;
                          }
                          travel(node.room.id);
                        }}
                        registerRef={(el) => {
                          nodeRefs.current[node.room.id] = el;
                        }}
                      />
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {expandedProjects && (
                    <motion.div
                      key="projects-branch"
                      initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={overlayTransition}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.04] p-3 sm:p-4">
                        <div className="mb-2.5 flex items-center justify-between gap-3">
                          <h3 className="font-heading text-sm font-medium text-foreground">
                            {t.map.projectsHeading}
                          </h3>
                          <button
                            type="button"
                            onClick={() => travel("projects")}
                            className="glass-chip inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {t.map.viewGallery}
                            <ArrowRight className="h-3 w-3" aria-hidden />
                          </button>
                        </div>
                        <ul className="grid gap-1.5 sm:grid-cols-2">
                          {projectRooms.map((room) => {
                            const isCurrent = room.id === currentRoomId;
                            return (
                              <li key={room.id}>
                                <button
                                  type="button"
                                  onClick={() => travel(room.id)}
                                  aria-current={isCurrent ? "true" : undefined}
                                  className={[
                                    "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                    isCurrent
                                      ? "bg-primary/20 text-foreground"
                                      : "text-foreground/85 hover:bg-white/10",
                                  ].join(" ")}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                      isCurrent
                                        ? "bg-primary"
                                        : visitedRoomIds.includes(room.id)
                                          ? "bg-foreground/60"
                                          : "bg-foreground/25"
                                    }`}
                                    aria-hidden
                                  />
                                  <span className="truncate">{getRoomTitle(room, locale)}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/12 px-5 py-3 text-[0.7rem] text-foreground/80 sm:px-7 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {t.map.here}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-foreground/60" aria-hidden />
                  {t.map.visited}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-foreground/25" aria-hidden />
                  {t.map.unvisited}
                </span>
                <span className="ml-auto hidden sm:inline">
                  {t.map.keyboardHint}
                </span>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
