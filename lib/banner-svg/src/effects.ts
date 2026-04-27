import type { OverlayType, ShadowType } from "./types.js";

export function buildOverlay(
  type: OverlayType,
  color: string,
  opacity: number,
  w: number,
  h: number,
): { defs: string; svg: string } {
  if (type === "none" || opacity <= 0) return { defs: "", svg: "" };
  switch (type) {
    case "vignette":
      return {
        defs: `<radialGradient id="vignette-grad" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stop-color="${color}" stop-opacity="0"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="${opacity}"/>
        </radialGradient>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#vignette-grad)"/>`,
      };
    case "scanlines": {
      const lines: string[] = [];
      for (let y = 0; y < h; y += 4) {
        lines.push(
          `<rect x="0" y="${y}" width="${w}" height="2" fill="${color}" opacity="${opacity * 0.6}"/>`,
        );
      }
      return { defs: "", svg: lines.join("") };
    }
    case "grain": {
      const dots: string[] = [];
      for (let i = 0; i < 400; i++) {
        const x = (i * 13) % w;
        const y = (i * 37) % h;
        dots.push(
          `<circle cx="${x}" cy="${y}" r="0.6" fill="${color}" opacity="${(opacity * 0.4).toFixed(2)}"/>`,
        );
      }
      return { defs: "", svg: dots.join("") };
    }
    case "lightLeak":
      return {
        defs: `<radialGradient id="leak-grad" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stop-color="${color}" stop-opacity="${opacity}"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </radialGradient>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#leak-grad)"/>`,
      };
    case "fog":
      return {
        defs: `<linearGradient id="fog-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="${opacity}"/>
        </linearGradient>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#fog-grad)"/>`,
      };
  }
}

export function buildShadowFilter(type: ShadowType): string {
  switch (type) {
    case "soft":
      return `drop-shadow(0 6px 14px rgba(0,0,0,0.35))`;
    case "hard":
      return `drop-shadow(6px 6px 0 rgba(0,0,0,0.6))`;
    case "neon":
      return `drop-shadow(0 0 10px currentColor)`;
    default:
      return "";
  }
}

export function buildColorAdjustFilter(
  brightness: number,
  contrast: number,
  saturation: number,
  hueRotate: number,
  blur: number,
): string {
  const parts: string[] = [];
  if (brightness !== 1) parts.push(`brightness(${brightness})`);
  if (contrast !== 1) parts.push(`contrast(${contrast})`);
  if (saturation !== 1) parts.push(`saturate(${saturation})`);
  if (hueRotate !== 0) parts.push(`hue-rotate(${hueRotate}deg)`);
  if (blur > 0) parts.push(`blur(${blur}px)`);
  return parts.join(" ");
}
