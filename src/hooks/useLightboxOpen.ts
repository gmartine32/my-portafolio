import { useEffect, useState } from "react";

/**
 * Tracks the gallery lightbox, which lives inside the transformed camera and so
 * cannot out-stack the fixed HUD layers on its own.
 */
export function useLightboxOpen(): boolean {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(document.body.dataset.lightbox === "open");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-lightbox"],
    });
    return () => observer.disconnect();
  }, []);

  return open;
}
