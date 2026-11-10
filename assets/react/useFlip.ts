"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Glides every `[data-flip="key"]` inside `root` from its last position to its new one, and fades in keys it
 * has not seen. offsetTop ignores transforms, so nested items each animate relative to their own parent.
 */
export function useFlip(root: RefObject<HTMLElement | null>) {
  const last = useRef<Map<string, number> | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = new Map<string, number>();
    root.current.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const key = el.dataset.flip!;
      const top = el.offsetTop;
      next.set(key, top);
      if (!last.current || reduced) return;
      const was = last.current.get(key);
      if (was === undefined) {
        // Its own arrival animation would otherwise run underneath this one and show through when this ends.
        el.getAnimations().forEach((animation) => animation.cancel());
        el.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 340, easing: EASE });
      } else if (was !== top) {
        el.animate([{ transform: `translateY(${was - top}px)` }, { transform: "none" }], { duration: 420, easing: EASE });
      }
    });
    last.current = next;
  });
}
