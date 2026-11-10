"use client";

import { Plus, type LucideIcon } from "lucide-react";

/** Keep labels short: the open item is --dock-open wide and its label is capped at 76px. */
export interface DockItem<T extends string> {
  id: T;
  label: string;
  icon: LucideIcon;
}

interface FloatingDockProps<T extends string> {
  items: readonly DockItem<T>[];
  view: T;
  onChange: (view: T) => void;
  /** The one primary action on every view. Leave out for a dock with navigation only. */
  onAdd?: () => void;
  addLabel?: string;
}

export function FloatingDock<T extends string>({ items, view, onChange, onAdd, addLabel = "ADD" }: FloatingDockProps<T>) {
  const index = items.findIndex((item) => item.id === view);
  return (
    <nav aria-label="Main" className="dock-bar pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 px-4 pb-[max(14px,env(safe-area-inset-bottom))]">
      <div className="dock pointer-events-auto">
        <span className="dock-indicator" aria-hidden style={{ "--index": index } as React.CSSProperties} />
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} type="button" className="dock-item" aria-current={view === item.id ? "page" : undefined} onClick={() => onChange(item.id)}>
              <Icon size={18} strokeWidth={1.6} />
              <span className="dock-label">{item.label}</span>
            </button>
          );
        })}
      </div>
      {onAdd && (
        <button type="button" className="dock-add pointer-events-auto" onClick={onAdd}>
          <Plus size={20} strokeWidth={1.6} />
          <span className="sr-only">{addLabel}</span>
        </button>
      )}
    </nav>
  );
}
