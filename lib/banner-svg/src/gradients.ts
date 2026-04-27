import type { ColorPreset, GradientStop, GradientType } from "./types.js";

export const COLOR_PRESETS: Record<Exclude<ColorPreset, "custom">, string[]> = {
  sunset: ["#FF6B6B", "#FF8E53", "#FFD93D"],
  ocean: ["#0072ff", "#00c6ff", "#0072ff"],
  fire: ["#f12711", "#f5af19"],
  aurora: ["#00C9FF", "#92FE9D"],
  lava: ["#FF512F", "#DD2476"],
  midnight: ["#0f0c29", "#302b63", "#24243e"],
  forest: ["#134E5E", "#71B280"],
  candy: ["#fc5c7d", "#6a82fb", "#05dfd7"],
  mint: ["#a8ff78", "#78ffd6"],
  rose: ["#fbc2eb", "#a6c1ee"],
  neon: ["#ff00ff", "#00ffff"],
  cyberpunk: ["#ff0080", "#7928ca", "#00ffff"],
  pastel: ["#ffd6e0", "#c1f0c8", "#bcdfff"],
  monochrome: ["#0d1117", "#30363d"],
  gold: ["#bf953f", "#fcf6ba", "#b38728"],
  space: ["#000428", "#004e92"],
  toxic: ["#39ff14", "#0aff0a", "#00ff7f"],
  ice: ["#83a4d4", "#b6fbff"],
  berry: ["#8e2de2", "#4a00e0"],
  coral: ["#ff9966", "#ff5e62"],
  deepsea: ["#001122", "#004466", "#0088aa"],
  sunset_vibes: ["#ff512f", "#f09819"],
  cyber_lime: ["#00ff00", "#003300"],
  gameboy: ["#9bbc0f", "#8bac0f", "#306230", "#0f380f"],
  morning_mist: ["#e0eafc", "#cfdef3"],
};

export function presetToStops(preset: ColorPreset): GradientStop[] {
  if (preset === "custom") return [];
  const cols = COLOR_PRESETS[preset];
  return cols.map((color, i) => ({
    color,
    position: Math.round((i / Math.max(1, cols.length - 1)) * 100),
  }));
}

export interface GradientDefArgs {
  id: string;
  type: GradientType;
  angle: number;
  stops: GradientStop[];
  reverse?: boolean;
  width: number;
  height: number;
}

export function buildGradientDef({
  id,
  type,
  angle,
  stops,
  reverse,
  width,
  height,
}: GradientDefArgs): string {
  const ordered = reverse ? [...stops].reverse().map((s, i, a) => ({
    color: s.color,
    position: Math.round((i / Math.max(1, a.length - 1)) * 100),
  })) : stops;

  const stopEls = ordered
    .map(
      (s) => `<stop offset="${s.position}%" stop-color="${s.color}"/>`,
    )
    .join("");

  if (type === "linear") {
    // angle in degrees -> x1,y1,x2,y2
    const rad = ((angle - 90) * Math.PI) / 180;
    const x1 = 50 - Math.cos(rad) * 50;
    const y1 = 50 - Math.sin(rad) * 50;
    const x2 = 50 + Math.cos(rad) * 50;
    const y2 = 50 + Math.sin(rad) * 50;
    return `<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stopEls}</linearGradient>`;
  }
  if (type === "radial") {
    return `<radialGradient id="${id}" cx="50%" cy="50%" r="65%">${stopEls}</radialGradient>`;
  }
  // conic-ish via SVG: fallback to linear since conic not native; approximate w/ overlapping radial
  void width;
  void height;
  return `<linearGradient id="${id}" gradientTransform="rotate(${angle} 0.5 0.5)">${stopEls}</linearGradient>`;
}
