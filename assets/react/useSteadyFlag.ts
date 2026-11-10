import { useEffect, useRef, useState } from "react";

/**
 * Follows `active`, but ignores anything shorter than `showAfter` and, once on, stays on for at
 * least `minVisible`. Quick background work therefore shows nothing rather than a blink.
 */
export function useSteadyFlag(active: boolean, showAfter = 300, minVisible = 700): boolean {
  const [shown, setShown] = useState(false);
  const shownAt = useRef(0);

  useEffect(() => {
    if (active === shown) return;
    const wait = active ? showAfter : Math.max(0, minVisible - (Date.now() - shownAt.current));
    const timer = setTimeout(() => {
      if (active) shownAt.current = Date.now();
      setShown(active);
    }, wait);
    return () => clearTimeout(timer);
  }, [active, shown, showAfter, minVisible]);

  return shown;
}
