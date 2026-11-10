"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** When set, the field rests as an icon and opens over its row on demand. */
  collapsible?: { open: boolean; onOpenChange: (open: boolean) => void };
}

export function SearchField({ label, value, onChange, placeholder = "Search", collapsible }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const open = collapsible ? collapsible.open : true;

  const collapse = () => {
    onChange("");
    collapsible?.onOpenChange(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={rootRef} className="search" data-collapsible={!!collapsible} data-open={open}>
      <button
        type="button"
        className="search-icon"
        aria-label={label}
        aria-expanded={collapsible ? open : undefined}
        tabIndex={open ? -1 : 0}
        onClick={() => {
          collapsible?.onOpenChange(true);
          // Inside the tap itself: iOS only raises the keyboard for a focus made during the gesture.
          inputRef.current?.focus();
        }}
      >
        <Search size={15} strokeWidth={1.6} />
      </button>
      <input
        ref={inputRef}
        className="search-input"
        type="search"
        aria-label={label}
        placeholder={placeholder}
        tabIndex={open ? 0 : -1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && collapsible) collapse();
        }}
        onBlur={(e) => {
          if (collapsible && !value && !rootRef.current?.contains(e.relatedTarget)) collapsible.onOpenChange(false);
        }}
      />
      {open && (value || collapsible) && (
        <button
          type="button"
          className="search-clear"
          aria-label={value ? "Clear search" : "Close search"}
          onClick={() => {
            if (value) {
              onChange("");
              inputRef.current?.focus();
            } else {
              collapse();
            }
          }}
        >
          <X size={14} strokeWidth={1.6} />
        </button>
      )}
    </div>
  );
}
