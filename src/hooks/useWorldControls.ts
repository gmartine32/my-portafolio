import { useCallback, useEffect, useRef } from "react";
import type { Direction } from "../types/world";
import { useNavigationStore } from "../stores/navigationStore";

const SWIPE_THRESHOLD = 64;

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

function isInteractive(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("a, button, input, textarea, select, [role='button']"),
  );
}

function getActiveScrollContainer(): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    '[data-room-frame][data-active="true"]',
  );
}

export function useWorldControls() {
  const move = useNavigationStore((s) => s.move);
  const pointerStart = useRef<{ x: number; y: number; interactive: boolean } | null>(
    null,
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const direction = KEY_MAP[event.key];
      if (!direction) return;
      event.preventDefault();
      move(direction);
    },
    [move],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    if (event.button !== 0) return;
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      interactive: isInteractive(event.target),
    };
  }, []);

  const onPointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (!pointerStart.current) return;
      const { x, y, interactive } = pointerStart.current;
      pointerStart.current = null;
      if (interactive) return;

      const dx = event.clientX - x;
      const dy = event.clientY - y;

      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
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
    [move],
  );

  const onPointerCancel = useCallback(() => {
    pointerStart.current = null;
  }, []);

  return { onPointerDown, onPointerUp, onPointerCancel };
}
