import { useEffect } from "react";

const PANEL_SELECTOR = ".system-panel, .system-chip, .glass-panel, .glass-chip";

function clearShine(el: HTMLElement) {
  el.style.removeProperty("--panel-x");
  el.style.removeProperty("--panel-y");
  el.style.setProperty("--panel-shine", "0");
  el.style.removeProperty("--glass-x");
  el.style.removeProperty("--glass-y");
  el.style.setProperty("--glass-shine", "0");
}

function setShine(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const px = ((clientX - rect.left) / rect.width) * 100;
  const py = ((clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--panel-x", `${px}%`);
  el.style.setProperty("--panel-y", `${py}%`);
  el.style.setProperty("--panel-shine", "1");
  el.style.setProperty("--glass-x", `${px}%`);
  el.style.setProperty("--glass-y", `${py}%`);
  el.style.setProperty("--glass-shine", "1");
}

/** Specular highlight follows the pointer only while hovering glass. */
export function useGlassPointerShine(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let active: HTMLElement | null = null;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const target = (event.target as Element | null)?.closest?.(PANEL_SELECTOR);
      if (
        !(target instanceof HTMLElement) ||
        target.closest('[data-panel-shine="off"]') ||
        target.closest('[data-glass-shine="off"]')
      ) {
        if (active) {
          clearShine(active);
          active = null;
        }
        return;
      }

      if (active && active !== target) clearShine(active);
      active = target;
      setShine(target, event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      if (active) {
        clearShine(active);
        active = null;
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      if (active) clearShine(active);
    };
  }, [enabled]);
}
