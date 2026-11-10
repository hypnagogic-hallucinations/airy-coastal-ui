"use client";

import { useEffect } from "react";
import { accentForTheme, readableOn } from "./palette";

/**
 * Paints the accent onto the document. `--accent` is a registered colour, so every derived
 * token (ink, soft, glow) cross-fades when it changes, with no per-component transition.
 */
export function useAccent(accent: string | null | undefined, isDark: boolean) {
  useEffect(() => {
    if (!accent || !/^#[0-9a-f]{6}$/i.test(accent)) return;
    const root = document.documentElement;
    const painted = accentForTheme(accent, isDark);
    root.style.setProperty("--accent", painted);
    root.style.setProperty("--accent-fg", readableOn(painted));
  }, [accent, isDark]);
}
