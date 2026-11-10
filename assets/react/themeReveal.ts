import { flushSync } from "react-dom";

/**
 * Applies a theme change as a circle opening from the point that was tapped.
 * Falls back to an instant change without View Transitions or under reduced motion.
 * Needs the view-transition and .theme-switching rules in components.css.
 */
export function revealTheme(apply: () => void, event: { clientX: number; clientY: number }) {
  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }
  const root = document.documentElement;
  const { clientX: x, clientY: y } = event;
  root.style.setProperty("--reveal-x", `${x}px`);
  root.style.setProperty("--reveal-y", `${y}px`);
  root.style.setProperty("--reveal-r", `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`);
  // Colours switch at once underneath the circle; their usual fades would show through it as a grey wash.
  root.classList.add("theme-switching");
  void document.startViewTransition(() => flushSync(apply)).finished.finally(() => root.classList.remove("theme-switching"));
}
