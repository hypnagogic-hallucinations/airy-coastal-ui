"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { X } from "lucide-react";

const EXIT_MS = 190;
const DISMISS_DISTANCE = 110;
const DISMISS_SPEED = 0.6;
const DESKTOP_LAYOUT = "(min-width: 640px)";

export interface SheetHandle {
  /** Plays the exit animation, then calls `onClose`. */
  close: () => void;
}

interface SheetProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  ref?: Ref<SheetHandle>;
}

/** Slide-up drawer on a native <dialog>, which brings the focus trap, Escape and inert page for free. */
export function Sheet({ title, onClose, children, footer, ref }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);
  const dragRef = useRef<{ startY: number; startedAt: number; y: number } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      // Otherwise focus lands on the close button, which then opens wearing its focus ring.
      dialog.focus();
    }
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  useImperativeHandle(ref, () => ({ close }), [close]);

  // The grabber promises this: pull down far enough, or flick, and the sheet goes.
  const dragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia(DESKTOP_LAYOUT).matches || (e.target as HTMLElement).closest("button")) return;
    dragRef.current = { startY: e.clientY, startedAt: e.timeStamp, y: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    dialogRef.current?.classList.add("is-dragging");
  };
  const dragMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current.y = Math.max(0, e.clientY - dragRef.current.startY);
    dialogRef.current?.style.setProperty("--drag", `${dragRef.current.y}px`);
  };
  const dragEnd = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    dialogRef.current?.classList.remove("is-dragging");
    const speed = drag.y / Math.max(1, e.timeStamp - drag.startedAt);
    if (drag.y > DISMISS_DISTANCE || (drag.y > 24 && speed > DISMISS_SPEED)) close();
    else dialogRef.current?.style.removeProperty("--drag");
  };

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      className={`sheet${closing ? " is-closing" : ""}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="sheet-handle" onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd}>
        <div className="grabber" aria-hidden />
        <header className="flex items-center justify-between gap-2 px-6 pt-2">
          <h2 className="micro truncate">{title}</h2>
          <button type="button" className="icon-btn -mr-2.5" aria-label="Close" onClick={close}>
            <X size={17} strokeWidth={1.5} />
          </button>
        </header>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-3 pb-6">{children}</div>
      {footer && (
        <footer className="border-t px-6 pt-3 pb-[max(14px,env(safe-area-inset-bottom))]" style={{ borderColor: "var(--hairline)" }}>
          {footer}
        </footer>
      )}
    </dialog>
  );
}

export function Field({ label, hint, children, htmlFor }: { label: string; hint?: React.ReactNode; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="micro" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <div className="text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>{hint}</div>}
    </div>
  );
}
