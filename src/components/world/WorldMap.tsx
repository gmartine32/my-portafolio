import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, HelpCircle, Map as MapIcon, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Direction, Room } from "../../types/world";
import { interpolate, useLocale, useUi } from "../../i18n/hooks";
import { useLightboxOpen } from "../../hooks/useLightboxOpen";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springUI } from "../../motion/systemMotion";
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

function curvedEdgePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * 0.12;
  const cy = my + dx * 0.12;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function SystemNodeRings({
  cx,
  cy,
  isActive,
  isVisited,
  size = "md",
}: {
  cx: number;
  cy: number;
  isActive: boolean;
  isVisited: boolean;
  size?: "sm" | "md";
}) {
  const outer = size === "sm" ? 7 : 11;
  const mid = size === "sm" ? 4.5 : 7;
  const inner = size === "sm" ? 2 : 3;

  return (
    <g>
      {isActive && (
        <circle
          cx={cx}
          cy={cy}
          r={outer + 4}
          className="fill-primary/15 animate-node-pulse"
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={outer}
        className={
          isActive
            ? "fill-none stroke-primary/50"
            : isVisited
              ? "fill-none stroke-foreground/35"
              : "fill-none stroke-foreground/18"
        }
        strokeWidth={size === "sm" ? 1.2 : 0.8}
      />
      <circle
        cx={cx}
        cy={cy}
        r={mid}
        className={
          isActive
            ? "fill-primary/25 stroke-primary/70"
            : isVisited
              ? "fill-foreground/12 stroke-foreground/45"
              : "fill-foreground/6 stroke-foreground/22"
        }
        strokeWidth={0.6}
      />
      <circle
        cx={cx}
        cy={cy}
        r={inner}
        className={isActive ? "fill-primary" : isVisited ? "fill-foreground/70" : "fill-foreground/35"}
      />
    </g>
  );
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
          <path
            key={edge.id}
            d={curvedEdgePath(edge.from.x, edge.from.y, edge.to.x, edge.to.y)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="text-foreground/30"
          />
        ) : null,
      )}
      {nodes.map((node) => (
        <SystemNodeRings
          key={node.room.id}
          cx={node.x}
          cy={node.y}
          isActive={node.room.id === activeId}
          isVisited={visited.includes(node.room.id)}
          size="sm"
        />
      ))}
    </svg>
  );
}

function NodeButton({
  node,
  title,
  isCurrent,
  isVisited,
  isFocused,
  onActivate,
  registerRef,
  goToLabel,
  currentRoomSuffix,
}: {
  node: LaidOutNode;
  title: string;
  isCurrent: boolean;
  isVisited: boolean;
  isFocused: boolean;
  onActivate: () => void;
  registerRef: (el: HTMLButtonElement | null) => void;
  goToLabel: string;
  currentRoomSuffix: string;
}) {
  return (
    <button
      ref={registerRef}
      type="button"
      tabIndex={isFocused ? 0 : -1}
      aria-current={isCurrent ? "true" : undefined}
      aria-label={`${goToLabel}${isCurrent ? currentRoomSuffix : ""}`}
      onClick={onActivate}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className={[
        "system-panel system-panel--interactive system-panel--map-node flex w-[5.5rem] flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center sm:w-28 sm:px-3 sm:py-3.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isCurrent ? "system-panel--active" : "",
        !isCurrent && !isVisited ? "opacity-65" : "",
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="map-node-glyph h-6 w-6" aria-hidden>
        <SystemNodeRings
          cx={12}
          cy={12}
          isActive={isCurrent}
          isVisited={isVisited}
          size="sm"
        />
      </svg>
      <span className="font-heading text-[0.7rem] font-medium leading-tight text-foreground sm:text-xs">
        {title}
      </span>
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
  const isNarrow = useMediaQuery("(max-width: 639px)");
  const lightboxOpen = useLightboxOpen();
  const locale = useLocale();
  const t = useUi();

  const { nodes, edges } = useGraphLayout();
  const projectRooms = useMemo(() => getProjectRooms(), []);
  const activeSectionId = getSectionForRoom(currentRoomId);

  const [focusedId, setFocusedId] = useState(activeSectionId);
  /** Mobile-only: cluster slides off to free content. Desktop ignores this. */
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const expandRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const controlsCollapsed = isNarrow && mobileCollapsed;

  const mainIds = useMemo(() => new Set<string>(MAIN_ROOM_IDS), []);

  useEffect(() => {
    if (!isMapOpen) return;
    setFocusedId(activeSectionId);
  }, [isMapOpen, activeSectionId]);

  useEffect(() => {
    if (isOnboardingOpen) setMobileCollapsed(false);
  }, [isOnboardingOpen]);

  useEffect(() => {
    if (!isMapOpen) return;
    const frame = requestAnimationFrame(() => {
      nodeRefs.current[focusedId]?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isMapOpen, focusedId]);

  const dismiss = useCallback(() => {
    closeMap();
    requestAnimationFrame(() => {
      (triggerRef.current ?? expandRef.current)?.focus();
    });
  }, [closeMap]);

  const collapseControls = useCallback(() => {
    setMobileCollapsed(true);
    requestAnimationFrame(() => expandRef.current?.focus());
  }, []);

  const expandControls = useCallback(() => {
    setMobileCollapsed(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const travel = useCallback(
    (roomId: string) => {
      if (roomId === currentRoomId) {
        dismiss();
        return;
      }
      goTo(roomId);
      requestAnimationFrame(() => {
        (triggerRef.current ?? expandRef.current)?.focus();
      });
    },
    [currentRoomId, goTo, dismiss],
  );

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

      if (event.key === "Enter") {
        event.preventDefault();
        travel(focusedId);
        return;
      }

      if (event.key === "Tab") {
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
  }, [isMapOpen, focusedId, mainIds, dismiss, travel]);

  const currentTitle = getRoomTitleById(activeSectionId, locale);

  const overlayTransition = reducedMotion
    ? { duration: 0 }
    : { ...springUI, duration: 0.35 };

  return (
    <>
      <AnimatePresence>
        {!lightboxOpen && (
          <motion.div
            key="map-trigger"
            className={`fixed bottom-4 z-50 flex items-end sm:bottom-6 sm:left-6 ${
              controlsCollapsed ? "left-0" : "left-3"
            }`}
            data-no-world-swipe
            data-onboarding-anchor="map"
            data-panel-shine="off"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={overlayTransition}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {controlsCollapsed ? (
                <motion.button
                  key="map-controls-expand"
                  ref={expandRef}
                  type="button"
                  onClick={expandControls}
                  aria-label={t.map.expandControls}
                  aria-expanded={false}
                  className="system-panel system-panel--interactive flex h-10 w-8 items-center justify-center rounded-l-none rounded-r-2xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden"
                  initial={reducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  transition={overlayTransition}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </motion.button>
              ) : (
                <motion.div
                  key="map-controls-cluster"
                  className="flex items-end gap-1.5"
                  initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={overlayTransition}
                >
                  <button
                    type="button"
                    onClick={collapseControls}
                    aria-label={t.map.collapseControls}
                    aria-expanded={true}
                    className="system-panel system-panel--interactive flex h-10 w-8 shrink-0 items-center justify-center rounded-2xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>

                  <div className="flex flex-col items-start gap-1.5">
                    <LanguageToggle />

                    <div className="flex items-center gap-2">
                      <button
                        ref={triggerRef}
                        type="button"
                        onClick={openMap}
                        aria-haspopup="dialog"
                        aria-expanded={isMapOpen}
                        className="system-panel system-panel--interactive flex items-center gap-2.5 rounded-2xl px-2.5 py-2 text-left text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-3"
                      >
                        <MinimapGlyph
                          nodes={nodes}
                          edges={edges}
                          activeId={activeSectionId}
                          visited={visitedRoomIds}
                        />
                        <span className="hidden flex-col leading-tight sm:flex">
                          <span className="system-label flex items-center gap-1.5">
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
                        className="system-panel system-panel--interactive flex h-10 w-10 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <HelpCircle className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={dismiss}
              aria-hidden
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.map.dialogAria}
              className="system-panel relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl"
              data-panel-shine="off"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
              transition={overlayTransition}
            >
              <header className="flex items-start justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                    {t.map.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                    {t.map.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label={t.map.close}
                  className="system-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-7 sm:pb-6">
                <div className="relative mx-auto mt-4 aspect-square w-full max-w-xl">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                    focusable="false"
                  >
                    {edges.map((edge) =>
                      edge.from && edge.to ? (
                        <path
                          key={edge.id}
                          d={curvedEdgePath(
                            edge.from.x,
                            edge.from.y,
                            edge.to.x,
                            edge.to.y,
                          )}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1}
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          className={
                            edge.from.room.id === activeSectionId ||
                            edge.to.room.id === activeSectionId
                              ? "text-primary/35"
                              : "text-foreground/15"
                          }
                        />
                      ) : null,
                    )}
                  </svg>

                  {nodes.map((node) => {
                    const title = getRoomTitle(node.room, locale);
                    return (
                      <NodeButton
                        key={node.room.id}
                        node={node}
                        title={title}
                        isCurrent={node.room.id === activeSectionId}
                        isVisited={visitedRoomIds.includes(node.room.id)}
                        isFocused={focusedId === node.room.id}
                        goToLabel={interpolate(t.map.goTo, { title })}
                        currentRoomSuffix={t.map.currentRoom}
                        onActivate={() => {
                          setFocusedId(node.room.id);
                          travel(node.room.id);
                        }}
                        registerRef={(el) => {
                          nodeRefs.current[node.room.id] = el;
                        }}
                      />
                    );
                  })}
                </div>

                {projectRooms.length > 0 && (
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="font-heading text-sm font-medium text-foreground">
                        {t.map.projectShortcuts}
                      </h3>
                      <button
                        type="button"
                        onClick={() => travel("projects")}
                        className="system-chip inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {t.map.viewGallery}
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </button>
                    </div>
                    <ul className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {projectRooms.map((room) => {
                        const isCurrent = room.id === currentRoomId;
                        return (
                          <li key={room.id} className="shrink-0">
                            <button
                              type="button"
                              onClick={() => travel(room.id)}
                              aria-current={isCurrent ? "true" : undefined}
                              className={[
                                "system-chip inline-flex max-w-[12rem] items-center gap-2 rounded-full px-3 py-1.5 text-left text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                isCurrent
                                  ? "bg-primary/15 text-foreground"
                                  : "text-muted-foreground hover:text-foreground",
                              ].join(" ")}
                            >
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  isCurrent
                                    ? "bg-primary"
                                    : visitedRoomIds.includes(room.id)
                                      ? "bg-foreground/50"
                                      : "bg-foreground/20"
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
                )}
              </div>

              <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border px-5 py-3 font-mono text-[0.65rem] text-muted-foreground sm:px-7 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {t.map.here}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-foreground/50" aria-hidden />
                  {t.map.visited}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-foreground/20" aria-hidden />
                  {t.map.unvisited}
                </span>
                <span className="ml-auto hidden sm:inline">{t.map.keyboardHint}</span>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
