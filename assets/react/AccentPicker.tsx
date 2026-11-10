"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { EXTENDED_COASTAL_PALETTE, readableOn } from "./palette";

const HEX = /^#[0-9a-f]{6}$/i;

interface AccentPickerProps {
  value: string;
  /** A palette colour was chosen. */
  onSelect: (hex: string) => void;
  /** The custom colour changed; fires continuously while dragging in the system picker. */
  onCustom: (hex: string) => void;
}

export function AccentPicker({ value, onSelect, onCustom }: AccentPickerProps) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);

  const current = value.toLowerCase();
  const nativeValue = HEX.test(value) ? current : "#2a9d8f";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-8 gap-2">
        {EXTENDED_COASTAL_PALETTE.map((accent) => {
          const selected = current === accent.hex.toLowerCase();
          return (
            <button
              key={accent.hex}
              type="button"
              title={accent.name}
              aria-label={accent.name}
              aria-pressed={selected}
              className="swatch"
              style={{ background: accent.hex, "--swatch": accent.hex } as React.CSSProperties}
              onClick={() => onSelect(accent.hex)}
            >
              {selected && <Check size={12} strokeWidth={2.4} color={readableOn(accent.hex)} />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <label className="color-well" title="Open colour picker">
          <span style={{ background: nativeValue }} />
          <input type="color" aria-label="Custom accent colour" value={nativeValue} onChange={(e) => onCustom(e.target.value)} />
        </label>
        <div className="min-w-0 flex-1">
          <label className="micro block" htmlFor="accent-hex">CUSTOM</label>
          <input
            id="accent-hex"
            className="field num uppercase"
            style={{ minHeight: 32 }}
            spellCheck={false}
            maxLength={7}
            value={text}
            onChange={(e) => {
              const raw = e.target.value.trim();
              const next = raw.startsWith("#") ? raw : `#${raw}`;
              setText(next);
              if (HEX.test(next)) onCustom(next);
            }}
          />
        </div>
      </div>
    </div>
  );
}
