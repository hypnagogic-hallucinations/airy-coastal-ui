"use client";

interface SegmentedProps<T extends string> {
  label: string;
  options: readonly { id: T; label: React.ReactNode }[];
  value: T;
  onChange: (id: T, event: React.MouseEvent) => void;
  /** Announces the options as tabs instead of toggle buttons. */
  tabs?: boolean;
  className?: string;
}

/** Equal-width options sharing one sliding thumb, so its position needs no measuring. */
export function Segmented<T extends string>({ label, options, value, onChange, tabs = false, className = "" }: SegmentedProps<T>) {
  const index = options.findIndex((o) => o.id === value);
  return (
    <div className={`segmented ${className}`} role={tabs ? "tablist" : "group"} aria-label={label} style={{ "--count": options.length, "--index": index } as React.CSSProperties}>
      {index >= 0 && <span className="segmented-thumb" aria-hidden />}
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="segmented-item"
          role={tabs ? "tab" : undefined}
          aria-selected={tabs ? o.id === value : undefined}
          aria-pressed={tabs ? undefined : o.id === value}
          onClick={(e) => onChange(o.id, e)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
