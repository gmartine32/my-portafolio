import { useCallback, useEffect, useState } from "react";

function read(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    // Private mode / blocked storage: behave as if never set.
    return false;
  }
}

/**
 * Boolean flag backed by localStorage. Starts `null` until read on the client so
 * callers can distinguish "unknown" from "not set".
 */
export function usePersistentFlag(key: string) {
  const [value, setValue] = useState<boolean | null>(null);

  useEffect(() => {
    setValue(read(key));
  }, [key]);

  const set = useCallback(
    (next: boolean) => {
      setValue(next);
      try {
        if (next) window.localStorage.setItem(key, "1");
        else window.localStorage.removeItem(key);
      } catch {
        // Non-fatal: the flag just won't persist across reloads.
      }
    },
    [key],
  );

  return [value, set] as const;
}
