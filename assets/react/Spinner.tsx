import { LoaderCircle } from "lucide-react";

/** A full-screen wait indicator. It fades in late (see .spinner-wait), so short waits show nothing. */
export function Spinner({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div className={`spinner-wait flex items-center justify-center ${fullScreen ? "min-h-dvh" : "py-12"}`} role="status" aria-label="Loading">
      <LoaderCircle size={22} strokeWidth={1.6} className="animate-spin" style={{ color: "var(--ink-3)" }} />
    </div>
  );
}

/** Stands in for a page's rows while they arrive, keeping the page's shape instead of a lone spinner. */
export function PageSkeleton() {
  return (
    <div className="spinner-wait flex flex-col gap-5 pt-3" role="status" aria-label="Loading">
      <div className="flex flex-col gap-3 px-1">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-11 w-52" />
      </div>
      <div className="skeleton h-6 w-full" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 px-1">
          <div className="skeleton h-9 w-9 shrink-0" style={{ borderRadius: 999 }} />
          <div className="flex flex-1 flex-col gap-2">
            <div className="skeleton h-3 w-2/3" />
            <div className="skeleton h-2.5 w-1/3" />
          </div>
          <div className="skeleton h-3 w-16" />
        </div>
      ))}
    </div>
  );
}
