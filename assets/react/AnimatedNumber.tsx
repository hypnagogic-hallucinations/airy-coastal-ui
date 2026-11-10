"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 750;

/** Counts toward `value` with an ease-out, so a changed total reads as movement rather than a swap. */
export function CountUp({ value }: { value: number }) {
  const target = Math.round(value);
  const [shown, setShown] = useState(target);
  const fromRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setShown(target);
      return;
    }
    const from = fromRef.current;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION_MS);
      const current = Math.round(from + (target - from) * (1 - (1 - t) ** 4));
      fromRef.current = current;
      setShown(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <>{shown.toLocaleString("en-US")}</>;
}

/** `unit` is the small quiet prefix before the figure, such as a currency. */
export function AnimatedNumber({ value, unit }: { value: number; unit?: string }) {
  return (
    <span className="hero-number block" aria-label={`${unit ? `${unit} ` : ""}${Math.round(value).toLocaleString("en-US")}`}>
      {unit && <span className="unit" aria-hidden>{unit}</span>}
      <span aria-hidden><CountUp value={value} /></span>
    </span>
  );
}
