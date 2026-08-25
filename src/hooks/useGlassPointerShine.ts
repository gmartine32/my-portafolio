import { useEffect } from "react";

const GLASS_SELECTOR = ".glass-panel, .glass-chip";

function clearShine(el: HTMLElement) {
  el.style.removeProperty("--glass-x");
  el.style.removeProperty("--glass-y");
  el.style.setProperty("--glass-shine", "0");
}

function setShine(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--glass-x", `${x}%`);
  el.style.setProperty("--glass-y", `${y}%`);
  el.style.setProperty("--glass-shine", "1");
}

/** Specular highlight follows the pointer only while hovering glass. */
export function useGlassPointerShine(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let active: HTMLElement | null = null;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const target = (event.target as Element | null)?.closest?.(GLASS_SELECTOR);
      if (
        !(target instanceof HTMLElement) ||
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
