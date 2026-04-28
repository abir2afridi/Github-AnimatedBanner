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
    case "noise":
      return {
        defs: `<filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${opacity} 0"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="white" filter="url(#noise-filter)" style="mix-blend-mode: overlay;"/>`,
      };
    case "texture":
      return {
        defs: `<filter id="texture-filter">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turb"/>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="5"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="${color}" opacity="${opacity * 0.2}" filter="url(#texture-filter)"/>`,
      };
    case "grid":
      return {
        defs: `<pattern id="overlay-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${color}" stroke-width="0.5" opacity="${opacity}"/>
        </pattern>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#overlay-grid)"/>`,
      };
    case "glitch":
      return {
        defs: `<filter id="glitch-filter">
          <feOffset in="SourceGraphic" dx="2" dy="0" result="offset1"/>
          <feOffset in="SourceGraphic" dx="-2" dy="0" result="offset2"/>
          <feComposite in="offset1" in2="offset2" operator="xor"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="${color}" opacity="${opacity * 0.1}" filter="url(#glitch-filter)"/>`,
      };
    case "crt":
      return {
        defs: `<filter id="crt-filter">
          <feComponentTransfer>
            <feRFunc type="table" tableValues="0 1 0 1"/>
            <feGFunc type="table" tableValues="0 1 0 1"/>
            <feBFunc type="table" tableValues="0 1 0 1"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="0.5"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="${color}" opacity="${opacity * 0.2}" filter="url(#crt-filter)" style="mix-blend-mode: multiply;"/>`,
      };
    case "duotone":
      return {
        defs: `<filter id="duotone-filter">
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0"/>
          <feComponentTransfer>
            <feRFunc type="table" tableValues="0.1 1"/>
            <feGFunc type="table" tableValues="0.2 0.8"/>
            <feBFunc type="table" tableValues="0.5 0.2"/>
          </feComponentTransfer>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" filter="url(#duotone-filter)" style="mix-blend-mode: screen; opacity: ${opacity}"/>`,
      };
    case "prism":
      return {
        defs: `<linearGradient id="prism-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff0000" stop-opacity="${opacity * 0.5}"/>
          <stop offset="20%" stop-color="#ffff00" stop-opacity="${opacity * 0.5}"/>
          <stop offset="40%" stop-color="#00ff00" stop-opacity="${opacity * 0.5}"/>
          <stop offset="60%" stop-color="#00ffff" stop-opacity="${opacity * 0.5}"/>
          <stop offset="80%" stop-color="#0000ff" stop-opacity="${opacity * 0.5}"/>
          <stop offset="100%" stop-color="#ff00ff" stop-opacity="${opacity * 0.5}"/>
        </linearGradient>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#prism-grad)" style="mix-blend-mode: overlay;"/>`,
      };
    case "vhs":
      return {
        defs: `<filter id="vhs-filter">
          <feOffset in="SourceGraphic" dx="1" dy="0" result="red"/>
          <feOffset in="SourceGraphic" dx="-1" dy="0" result="cyan"/>
          <feColorMatrix in="red" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red-c"/>
          <feColorMatrix in="cyan" type="matrix" values="0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0" result="cyan-c"/>
          <feBlend in="red-c" in2="cyan-c" mode="screen"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="black" opacity="${opacity * 0.1}" filter="url(#vhs-filter)" style="mix-blend-mode: color-dodge;"/>`,
      };
    case "hologram":
      return {
        defs: `<linearGradient id="holo-lines" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00ffff" stop-opacity="${opacity}"/>
          <stop offset="50%" stop-color="transparent"/>
          <stop offset="100%" stop-color="#ff00ff" stop-opacity="${opacity}"/>
        </linearGradient>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#holo-lines)" style="mix-blend-mode: screen; opacity: 0.3;"/>`,
      };
    case "water":
      return {
        defs: `<filter id="water-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" dur="10s" values="0.01;0.015;0.01" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="${color}" opacity="${opacity * 0.1}" filter="url(#water-filter)" style="mix-blend-mode: overlay;"/>`,
      };
    case "fire":
      return {
        defs: `<filter id="fire-filter">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turb">
            <animate attributeName="baseFrequency" dur="2s" values="0.05;0.07;0.05" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="15"/>
        </filter>
        <linearGradient id="fire-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#ff4500" stop-opacity="${opacity}"/>
          <stop offset="50%" stop-color="#ff8c00" stop-opacity="${opacity * 0.5}"/>
          <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
        </linearGradient>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#fire-grad)" filter="url(#fire-filter)" style="mix-blend-mode: screen;"/>`,
      };
    case "matrix":
      return {
        defs: `<pattern id="matrix-p" width="20" height="20" patternUnits="userSpaceOnUse">
          <text x="5" y="15" fill="#00ff00" font-family="monospace" font-size="10" opacity="${opacity}">01</text>
        </pattern>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#matrix-p)" style="mix-blend-mode: screen;"/>`,
      };
    case "aurora":
      return {
        defs: `<linearGradient id="aurora-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#00f2ff" stop-opacity="0"/>
          <stop offset="50%" stop-color="#00ff88" stop-opacity="${opacity * 0.8}"/>
          <stop offset="100%" stop-color="#7000ff" stop-opacity="0"/>
        </linearGradient>
        <filter id="aurora-blur"><feGaussianBlur stdDeviation="15"/></filter>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#aurora-grad)" filter="url(#aurora-blur)" style="mix-blend-mode: screen;"/>`,
      };
    case "lava":
      return {
        defs: `<filter id="lava-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise">
            <animate attributeName="baseFrequency" dur="15s" values="0.02;0.03;0.02" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="#ff4500" opacity="${opacity * 0.3}" filter="url(#lava-filter)" style="mix-blend-mode: overlay;"/>`,
      };
    case "energy":
      return {
        defs: `<filter id="energy-filter">
          <feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="2" result="turb">
            <animate attributeName="baseFrequency" dur="3s" values="0.1;0.2;0.1" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="20"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" stroke="${color}" stroke-width="4" fill="none" opacity="${opacity}" filter="url(#energy-filter)"/>`,
      };
    case "circuit":
      return {
        defs: `<pattern id="circuit-overlay" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 0 50 L 30 50 L 50 20 L 80 20 L 100 50" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
          <circle cx="30" cy="50" r="2" fill="${color}" opacity="${opacity}"/>
          <circle cx="80" cy="20" r="2" fill="${color}" opacity="${opacity}"/>
        </pattern>`,
        svg: `<rect width="${w}" height="${h}" fill="url(#circuit-overlay)" style="mix-blend-mode: overlay;"/>`,
      };
    case "dust":
      return {
        defs: "",
        svg: Array.from({ length: 50 }).map((_, i) => {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const r = Math.random() * 1.5;
          return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${(Math.random() * opacity).toFixed(2)}"/>`;
        }).join(""),
      };
    case "paper":
      return {
        defs: `<filter id="paper-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${opacity * 0.2} 0"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="white" filter="url(#paper-filter)" style="mix-blend-mode: multiply;"/>`,
      };
    case "canvas":
      return {
        defs: `<filter id="canvas-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${opacity * 0.1} 0"/>
        </filter>`,
        svg: `<rect width="${w}" height="${h}" fill="white" filter="url(#canvas-filter)" style="mix-blend-mode: screen;"/>`,
      };
    default:
      return { defs: "", svg: "" };
  }
}

export function buildShadowFilter(type: ShadowType): string {
  switch (type) {
    case "soft":
      return `drop-shadow(0 6px 14px rgba(0,0,0,0.35))`;
    case "hard":
      return `drop-shadow(6px 6px 0 rgba(0,0,0,0.6))`;
    case "neon":
      return `drop-shadow(0 0 10px rgba(255,255,255,0.7))`;
    case "floating":
      return `drop-shadow(0 30px 40px rgba(0,0,0,0.5))`;
    case "inset":
      return `drop-shadow(0 0 15px rgba(0,0,0,0.8))`;
    case "glow":
      return `drop-shadow(0 0 20px rgba(255,255,255,0.4))`;
    case "glass":
      return `drop-shadow(0 8px 32px rgba(31, 38, 135, 0.37))`;
    case "3d":
      return `drop-shadow(10px 10px 0 rgba(0,0,0,0.8))`;
    case "layered":
      return `drop-shadow(0 5px 10px rgba(0,0,0,0.2)) drop-shadow(0 15px 25px rgba(0,0,0,0.15))`;
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
