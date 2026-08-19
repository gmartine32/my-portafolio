import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImageLayout } from "../../lib/projectImageLayout";
import { GlassPanel } from "../ui/GlassPanel";

type ProjectGalleryProps = {
  title: string;
  images: string[];
  layout?: ProjectImageLayout;
};

const SWIPE_THRESHOLD = 48;

export function ProjectGallery({
  title,
  images,
  layout = "desktop",
}: ProjectGalleryProps) {
  const isMobile = layout === "mobile";
  const gallery = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  const count = gallery.length;
  const hasMultiple = count > 1;
  const current = gallery[Math.min(index, Math.max(count - 1, 0))] ?? "";

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = useCallback(() => {
    setLightboxOpen(true);
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((prev) => (prev + delta + count) % count);
    },
    [count],
  );

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    suppressClick.current = false;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (!touchStart.current) return;
      const touch = event.changedTouches[0];
      if (!touch) {
        touchStart.current = null;
        return;
      }
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      touchStart.current = null;

      if (hasMultiple && Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        suppressClick.current = true;
        go(dx > 0 ? -1 : 1);
      }
    },
    [go, hasMultiple],
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    document.body.dataset.lightbox = "open";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setLightboxOpen(false);
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        event.preventDefault();
        event.stopPropagation();
        go(-1);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        event.preventDefault();
        event.stopPropagation();
        go(1);
      }
    };

    // Capture phase so world navigation never sees these keys first.
    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      delete document.body.dataset.lightbox;
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [lightboxOpen, go]);

  if (count === 0) return null;

  const lightbox =
    lightboxOpen && mounted
      ? createPortal(
          <div
            data-no-world-swipe
            data-project-lightbox
            role="dialog"
            aria-modal="true"
            aria-label={`Galería de ${title}`}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="font-heading text-sm text-muted-foreground">
                {index + 1} / {count}
              </p>
              <button
                type="button"
                aria-label="Cerrar galería"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="glass-panel glass-panel--interactive flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8 touch-pan-y"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={current}
                alt={`${title} — captura ${index + 1}`}
                className="max-h-[80dvh] max-w-full object-contain"
              />

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    aria-label="Imagen anterior"
                    onClick={() => go(-1)}
                    className="glass-panel glass-panel--interactive absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:left-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Imagen siguiente"
                    onClick={() => go(1)}
                    className="glass-panel glass-panel--interactive absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:right-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        data-no-world-swipe
        className="mb-8"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <GlassPanel className="relative overflow-hidden rounded-2xl">
          <div
            className="relative touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                openLightbox();
              }}
              className={`relative z-0 block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isMobile ? "mx-auto max-w-[280px] sm:max-w-xs" : ""
              }`}
              aria-label={`Ampliar imagen ${index + 1} de ${title}`}
            >
              {isMobile ? (
                <div className="flex aspect-[9/19.5] w-full items-center justify-center bg-muted/40">
                  <img
                    src={current}
                    alt={`${title} — captura ${index + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              ) : (
                <img
                  src={current}
                  alt={`${title} — captura ${index + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="aspect-video w-full object-cover"
                />
              )}
            </button>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(-1);
                  }}
                  className="glass-panel glass-panel--interactive absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Imagen siguiente"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(1);
                  }}
                  className="glass-panel glass-panel--interactive absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                <p className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/70 px-2.5 py-1 text-xs text-foreground backdrop-blur-sm">
                  {index + 1} / {count}
                </p>
              </>
            )}
          </div>
        </GlassPanel>

        {hasMultiple && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setIndex(i);
                  openLightbox();
                }}
                aria-label={`Ampliar imagen ${i + 1}`}
                aria-current={i === index}
                className={`relative shrink-0 overflow-hidden rounded-md ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isMobile ? "h-20 w-12" : "h-14 w-20"
                } ${
                  i === index
                    ? "ring-2 ring-primary"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className={`h-full w-full ${
                    isMobile
                      ? "bg-muted/40 object-contain object-center"
                      : "object-cover"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox}
    </>
  );
}
