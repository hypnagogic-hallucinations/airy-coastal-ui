/** The coastal palette, cool to warm. Chart tokens using it live in tokens.css. */
export const EXTENDED_COASTAL_PALETTE = [
  { name: "Abyssal Slate", hex: "#1B323C" },
  { name: "Charcoal Blue", hex: "#264653" },
  { name: "Fjord Teal", hex: "#28646B" },
  { name: "Baltic Pine", hex: "#29817D" },
  { name: "Verdigris", hex: "#2A9D8F" },
  { name: "Seafoam Jade", hex: "#5BB196" },
  { name: "Eucalyptus Sage", hex: "#8EC18E" },
  { name: "Pistachio Cream", hex: "#BDD07C" },
  { name: "Jasmine", hex: "#E9C46A" },
  { name: "Honeycomb", hex: "#EEB365" },
  { name: "Sandy Brown", hex: "#F4A261" },
  { name: "Apricot Glow", hex: "#EE8959" },
  { name: "Burnt Peach", hex: "#E76F51" },
  { name: "Terracotta Ember", hex: "#C95238" },
  { name: "Roasted Chestnut", hex: "#9E3B26" },
];

export const DEFAULT_ACCENT = "#2A9D8F";

const DARK_SURFACE = "#15181b";
const LIGHT_SURFACE = "#ffffff";
const MIN_CONTRAST_DARK = 3;
/** Low on purpose: Jasmine must stay as designed, and only a near-white custom colour needs help. */
const MIN_CONTRAST_LIGHT = 1.4;

function channels(hex: string): number[] {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
}

function luminance(rgb: number[]): number {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: number[], b: number[]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Black or white, whichever has the higher WCAG contrast on this colour. */
export function readableOn(hex: string): string {
  return luminance(channels(hex)) > 0.179 ? "#0b0b0d" : "#ffffff";
}

/** The accent to paint with: moved away from the surface only as far as it takes to stay visible. */
export function accentForTheme(hex: string, isDark: boolean): string {
  const surface = channels(isDark ? DARK_SURFACE : LIGHT_SURFACE);
  const minimum = isDark ? MIN_CONTRAST_DARK : MIN_CONTRAST_LIGHT;
  const toward = isDark ? 255 : 0;
  let rgb = channels(hex);
  if (contrast(rgb, surface) >= minimum) return hex;
  for (let step = 0; step < 24 && contrast(rgb, surface) < minimum; step += 1) {
    rgb = rgb.map((v) => Math.round(v + (toward - v) * 0.08));
  }
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
