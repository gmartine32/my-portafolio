import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Map as MapIcon,
  MousePointerClick,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { interpolate, useUi } from "../../i18n/hooks";
import { usePersistentFlag } from "../../hooks/usePersistentFlag";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { springUI } from "../../motion/systemMotion";
import { useNavigationStore } from "../../stores/navigationStore";

const SEEN_KEY = "portfolio:onboarding:v1";

const STEP_META = [
  { id: "world" as const, icon: Compass },
  { id: "controls" as const, icon: MousePointerClick, spotlight: "center" as const },
  { id: "map" as const, icon: MapIcon, spotlight: "map" as const },
];

function useAnchorRect(active: boolean) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!active) {
      setRect(null);
      return;
    }

    const measure = () => {
      const el = document.querySelector('[data-onboarding-anchor="map"]');
      setRect(el ? el.getBoundingClientRect() : null);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return rect;
}

export function Onboarding() {
  const isOpen = useNavigationStore((s) => s.isOnboardingOpen);
  const setOpen = useNavigationStore((s) => s.setOnboardingOpen);
  const showHudControls = useNavigationStore((s) => s.showHudControls);
  const reducedMotion = usePrefersReducedMotion();
  const [hasSeen, setHasSeen] = usePersistentFlag(SEEN_KEY);
  const t = useUi();

  const [index, setIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const stepMeta = STEP_META[index];
  const stepCopy = stepMeta ? t.onboarding.steps[stepMeta.id] : null;
  const isLast = index === STEP_META.length - 1;
  const anchorRect = useAnchorRect(isOpen && stepMeta?.spotlight === "map");

  useEffect(() => {
    if (hasSeen === false) setOpen(true);
  }, [hasSeen, setOpen]);

  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen]);

  const finish = useCallback(() => {
    setOpen(false);
    setHasSeen(true);
    // Leave the arrows on screen so the explanation is immediately verifiable.
    showHudControls();
  }, [setOpen, setHasSeen, showHudControls]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
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
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, finish]);

  // Lifts the minimap above the backdrop while its step is showing.
  useEffect(() => {
    if (isOpen && stepMeta?.spotlight === "map") {
      document.body.dataset.onboardingStep = "map";
    } else {
      delete document.body.dataset.onboardingStep;
    }
    return () => {
      delete document.body.dataset.onboardingStep;
    };
  }, [isOpen, stepMeta?.spotlight]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("[data-onboarding-primary]")
        ?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen, index]);

  if (!stepMeta || !stepCopy) return null;

  const Icon = stepMeta.icon;
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const };

  const pulse = reducedMotion
    ? undefined
    : {
        opacity: [0.35, 1, 0.35],
        scale: [0.94, 1.04, 0.94],
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="onboarding"
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          data-no-world-swipe
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" aria-hidden />

          {stepMeta.spotlight === "center" && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/80"
              animate={pulse}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              }
              aria-hidden
            />
          )}

          {stepMeta.spotlight === "map" && anchorRect && (
            <motion.div
              className="pointer-events-none absolute rounded-3xl border-2 border-primary/80"
              style={{
                left: anchorRect.left - 8,
                top: anchorRect.top - 8,
                width: anchorRect.width + 16,
                height: anchorRect.height + 16,
              }}
              animate={pulse ? { opacity: [0.4, 1, 0.4] } : undefined}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              }
              aria-hidden
            />
          )}

          <div
            className={`absolute inset-x-0 flex justify-center px-4 ${
              stepMeta.spotlight === "map" ? "top-8 sm:top-16" : "top-1/2 -translate-y-1/2"
            }`}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="onboarding-title"
              aria-describedby="onboarding-body"
              className="system-panel max-h-[86dvh] w-full max-w-md overflow-y-auto rounded-3xl px-6 py-6 sm:px-7"
              data-panel-shine="off"
              initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={transition}
            >
              <span className="system-chip mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </span>

              <p className="system-label mb-1.5">
                {interpolate(t.onboarding.progress, {
                  n: index + 1,
                  total: STEP_META.length,
                })}
              </p>
              <h2
                id="onboarding-title"
                className="font-heading text-xl font-semibold text-foreground sm:text-2xl"
              >
                {stepCopy.title}
              </h2>
              <p
                id="onboarding-body"
                className="mt-2 text-sm leading-relaxed text-foreground/90"
              >
                {stepCopy.body}
              </p>

              {index === 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {["←", "↑", "↓", "→", "W", "A", "S", "D"].map((key) => (
                    <kbd
                      key={key}
                      className="system-chip min-w-7 rounded-lg px-2 py-1 text-center font-mono text-xs font-medium text-foreground"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5" aria-hidden>
                  {STEP_META.map((item, itemIndex) => (
                    <span
                      key={item.id}
                      className={`h-1.5 rounded-full transition-all ${
                        itemIndex === index
                          ? "w-5 bg-primary"
                          : "w-1.5 bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {!isLast && (
                    <button
                      type="button"
                      onClick={finish}
                      className="rounded-full px-3 py-2 text-sm text-foreground/85 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {t.onboarding.skip}
                    </button>
                  )}
                  <button
                    type="button"
                    data-onboarding-primary
                    onClick={() => (isLast ? finish() : setIndex(index + 1))}
                    className="system-cta gap-1.5 px-5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {isLast ? t.onboarding.done : t.onboarding.next}
                    {!isLast && <ArrowRight className="h-4 w-4" aria-hidden />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
