import { useCallback, useEffect, useRef, useState } from "react";
import type { Direction } from "../types/world";
import { useNavigationStore } from "../stores/navigationStore";

const SWIPE_THRESHOLD = 56;

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right",
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function blocksWorldSwipe(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("[data-no-world-swipe]"));
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (isTypingTarget(target)) return true;
  return Boolean(
    target.closest("button, a, input, textarea, select, [contenteditable='true']"),
  );
}

function getActiveScrollContainer(): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    '[data-room-frame][data-active="true"]',
  );
}

type GestureStart = {
  x: number;
  y: number;
  blocked: boolean;
  interactive: boolean;
  pointerId?: number;
};

export function useWorldControls() {
  const move = useNavigationStore((s) => s.move);
  const toggleHudControls = useNavigationStore((s) => s.toggleHudControls);
  const toggleMap = useNavigationStore((s) => s.toggleMap);
  const isMapOpen = useNavigationStore((s) => s.isMapOpen);
  const isOnboardingOpen = useNavigationStore((s) => s.isOnboardingOpen);
  const gestureStart = useRef<GestureStart | null>(null);
  const [worldRoot, setWorldRoot] = useState<HTMLElement | null>(null);

  // Map and onboarding own the keyboard and pointer while they are up.
  const suspended = isMapOpen || isOnboardingOpen;

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (document.body.dataset.lightbox === "open") return;
      if (isTypingTarget(event.target)) return;

      if (event.key === "m" || event.key === "M") {
        event.preventDefault();
        if (!isOnboardingOpen) toggleMap();
        return;
      }

      if (suspended) return;
      const direction = KEY_MAP[event.key];
      if (!direction) return;
      event.preventDefault();
      move(direction);
    },
    [move, toggleMap, suspended, isOnboardingOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const resolveSwipe = useCallback(
    (clientX: number, clientY: number) => {
      const start = gestureStart.current;
      gestureStart.current = null;
      if (!start || start.blocked || suspended) return;

      const dx = clientX - start.x;
      const dy = clientY - start.y;

      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
        if (document.body.dataset.lightbox === "open") return;
        if (start.interactive) return;
        toggleHudControls();
        return;
      }

      const horizontal = Math.abs(dx) > Math.abs(dy);
      if (horizontal) {
        move(dx > 0 ? "left" : "right");
        return;
      }

      const scroller = getActiveScrollContainer();
      if (scroller) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom =
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        if (dy > 0 && !atTop) return;
        if (dy < 0 && !atBottom) return;
      }

      move(dy > 0 ? "up" : "down");
    },
    [move, toggleHudControls, suspended],
  );

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    // Touch is handled via native touch listeners to survive scroll cancellation.
    if (event.pointerType === "touch") return;
    if (event.button !== 0) return;
    // Never capture the pointer — capture on the world root retargets mouseup
    // away from buttons and kills click handlers (e.g. gallery lightbox).
    gestureStart.current = {
      x: event.clientX,
      y: event.clientY,
      blocked: blocksWorldSwipe(event.target),
      interactive: isInteractiveTarget(event.target),
      pointerId: event.pointerId,
    };
  }, []);

  const onPointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!gestureStart.current) return;
      if (
        gestureStart.current.pointerId !== undefined &&
        event.pointerId !== gestureStart.current.pointerId
      ) {
        return;
      }
      resolveSwipe(event.clientX, event.clientY);
    },
    [resolveSwipe],
  );

  const onPointerCancel = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "touch") return;
    gestureStart.current = null;
  }, []);

  useEffect(() => {
    if (!worldRoot) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      gestureStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        blocked: blocksWorldSwipe(event.target),
        interactive: isInteractiveTarget(event.target),
      };
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!gestureStart.current) return;
      const touch = event.changedTouches[0];
      if (!touch) {
        gestureStart.current = null;
        return;
      }
      resolveSwipe(touch.clientX, touch.clientY);
    };

    const onTouchCancel = () => {
      gestureStart.current = null;
    };

    worldRoot.addEventListener("touchstart", onTouchStart, { passive: true });
    worldRoot.addEventListener("touchend", onTouchEnd, { passive: true });
    worldRoot.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      worldRoot.removeEventListener("touchstart", onTouchStart);
      worldRoot.removeEventListener("touchend", onTouchEnd);
      worldRoot.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [worldRoot, resolveSwipe]);

  return {
    setWorldRoot,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  };
}
