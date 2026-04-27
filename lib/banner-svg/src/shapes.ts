import type { ShapeType } from "./types.js";

export interface ShapeOutput {
  defs: string;
  background: string; // svg fragment
  viewBox: string;
}

export type ShapeFn = (w: number, h: number, fill: string, speed: number) => ShapeOutput;


const rectFill = (w: number, h: number, fill: string) =>
  `<rect width="${w}" height="${h}" fill="${fill}"/>`;

const waving: ShapeFn = (w, h, fill, speed) => {
  const dur = (20 / (speed || 1)).toFixed(1);
  const dur2 = (15 / (speed || 1)).toFixed(1);
  const dur3 = (25 / (speed || 1)).toFixed(1);

  // Layer 1 paths
  const v1 = `M0 0L 0 ${h * 0.6}Q ${w * 0.25} ${h * 0.8} ${w * 0.5} ${h * 0.65}T ${w} ${h * 0.75}L ${w} 0 Z`;
  const v2 = `M0 0L 0 ${h * 0.7}Q ${w * 0.25} ${h * 0.8} ${w * 0.5} ${h * 0.7}T ${w} ${h * 0.65}L ${w} 0 Z`;
  const v3 = `M0 0L 0 ${h * 0.8}Q ${w * 0.25} ${h * 0.65} ${w * 0.5} ${h * 0.8}T ${w} ${h * 0.65}L ${w} 0 Z`;

  // Layer 2 paths (offset and different curve)
  const o1 = `M0 0L 0 ${h * 0.65}Q ${w * 0.25} ${h * 0.9} ${w * 0.5} ${h * 0.75}T ${w} ${h * 0.8}L ${w} 0 Z`;
  const o2 = `M0 0L 0 ${h * 0.75}Q ${w * 0.25} ${h * 0.6} ${w * 0.5} ${h * 0.6}T ${w} ${h * 0.7}L ${w} 0 Z`;
  const o3 = `M0 0L 0 ${h * 0.7}Q ${w * 0.25} ${h * 0.6} ${w * 0.5} ${h * 0.75}T ${w} ${h * 0.85}L ${w} 0 Z`;

  // Layer 3 paths (deep wave)
  const d1 = `M0 0L 0 ${h * 0.5}Q ${w * 0.25} ${h * 0.7} ${w * 0.5} ${h * 0.55}T ${w} ${h * 0.6}L ${w} 0 Z`;
  const d2 = `M0 0L 0 ${h * 0.6}Q ${w * 0.25} ${h * 0.4} ${w * 0.5} ${h * 0.6}T ${w} ${h * 0.5}L ${w} 0 Z`;
  const d3 = `M0 0L 0 ${h * 0.55}Q ${w * 0.25} ${h * 0.6} ${w * 0.5} ${h * 0.45}T ${w} ${h * 0.55}L ${w} 0 Z`;

  return {
    defs: "",
    background: `
      <!-- Solid base to ensure no gaps -->
      <rect width="${w}" height="${h * 0.5}" fill="${fill}" />
      
      <!-- Deep Wave -->
      <path d="${d1}" fill="${fill}" opacity="0.3" stroke="rgba(255,255,255,0.05)" stroke-width="1">
        <animate attributeName="d" dur="${dur3}s" repeatCount="indefinite"
          keyTimes="0;0.33;0.66;1" values="${d1};${d2};${d3};${d1}" />
      </path>

      <!-- Mid Wave -->
      <path d="${o1}" fill="${fill}" opacity="0.5" stroke="rgba(255,255,255,0.1)" stroke-width="1">
        <animate attributeName="d" dur="${dur2}s" repeatCount="indefinite"
          keyTimes="0;0.33;0.66;1" values="${o1};${o2};${o3};${o1}" />
      </path>

      <!-- Front Wave -->
      <path d="${v1}" fill="${fill}" opacity="0.8" stroke="rgba(255,255,255,0.15)" stroke-width="1">
        <animate attributeName="d" dur="${dur}s" repeatCount="indefinite"
          keyTimes="0;0.33;0.66;1" values="${v1};${v2};${v3};${v1}" />
      </path>
    `,
    viewBox: `0 0 ${w} ${h}`,
  };
};



const rect: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: rectFill(w, h, fill),
  viewBox: `0 0 ${w} ${h}`,
});

const rounded: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<rect width="${w}" height="${h}" rx="20" ry="20" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const soft: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<rect width="${w}" height="${h}" rx="40" ry="40" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const wave: ShapeFn = (w, h, fill, speed) => {
  const amp = h * 0.12;
  const path = `M0,${amp} Q${w * 0.25},0 ${w * 0.5},${amp} T${w},${amp} L${w},${h} L0,${h} Z`;
  return { defs: "", background: `<path d="${path}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const wave2: ShapeFn = (w, h, fill, speed) => {
  const a = h * 0.1;
  const path = `M0,${h - a} Q${w * 0.25},${h} ${w * 0.5},${h - a} T${w},${h - a} L${w},0 L0,0 Z`;
  return { defs: "", background: `<path d="${path}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const slice: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<polygon points="0,0 ${w},0 ${w},${h * 0.7} 0,${h}" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const blob: ShapeFn = (w, h, fill, speed) => {
  const path = `M0,${h * 0.4}
    C${w * 0.15},${h * 0.1} ${w * 0.35},${h * 0.7} ${w * 0.55},${h * 0.4}
    S${w * 0.85},${h * 0.1} ${w},${h * 0.4}
    L${w},${h} L0,${h} Z`;
  return { defs: "", background: `<path d="${path}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const blob2: ShapeFn = (w, h, fill, speed) => {
  const path = `M0,0 L${w},0 L${w},${h * 0.6}
    C${w * 0.75},${h * 0.95} ${w * 0.5},${h * 0.4} ${w * 0.25},${h * 0.75}
    S0,${h * 0.55} 0,${h * 0.6} Z`;
  return { defs: "", background: `<path d="${path}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const circle: ShapeFn = (w, h, fill, speed) => {
  const r = Math.min(w, h) * 0.45;
  return {
    defs: "",
    background: `<circle cx="${w / 2}" cy="${h / 2}" r="${r}" fill="${fill}"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

const cylinder: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<rect x="0" y="${h * 0.1}" width="${w}" height="${h * 0.8}" fill="${fill}"/>
    <ellipse cx="${w / 2}" cy="${h * 0.1}" rx="${w / 2}" ry="${h * 0.1}" fill="${fill}"/>
    <ellipse cx="${w / 2}" cy="${h * 0.9}" rx="${w / 2}" ry="${h * 0.1}" fill="${fill}" opacity="0.85"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const diamond: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<polygon points="${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const triangle: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<polygon points="${w / 2},0 ${w},${h} 0,${h}" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const trapezoid: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<polygon points="${w * 0.15},0 ${w * 0.85},0 ${w},${h} 0,${h}" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const arrow: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<polygon points="0,0 ${w * 0.85},0 ${w},${h / 2} ${w * 0.85},${h} 0,${h}" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const ribbon: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<path d="M0,${h * 0.2} L${w},0 L${w},${h * 0.8} L0,${h} Z" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const hexagon: ShapeFn = (w, h, fill, speed) => {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.47;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
  }).join(" ");
  return { defs: "", background: `<polygon points="${pts}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const shield: ShapeFn = (w, h, fill, speed) => {
  const path = `M${w / 2},${h} C${w / 2},${h} ${w * 0.05},${h * 0.7} ${w * 0.05},${h * 0.35}
    L${w * 0.05},${h * 0.1} L${w / 2},0 L${w * 0.95},${h * 0.1}
    L${w * 0.95},${h * 0.35} C${w * 0.95},${h * 0.7} ${w / 2},${h} ${w / 2},${h} Z`;
  return { defs: "", background: `<path d="${path}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const speech: ShapeFn = (w, h, fill, speed) => {
  const path = `M${w * 0.05},0 L${w * 0.95},0 Q${w},0 ${w},${h * 0.05}
    L${w},${h * 0.75} Q${w},${h * 0.85} ${w * 0.95},${h * 0.85}
    L${w * 0.35},${h * 0.85} L${w * 0.2},${h} L${w * 0.3},${h * 0.85}
    L${w * 0.05},${h * 0.85} Q0,${h * 0.85} 0,${h * 0.75}
    L0,${h * 0.05} Q0,0 ${w * 0.05},0 Z`;
  return { defs: "", background: `<path d="${path}" fill="${fill}"/>`, viewBox: `0 0 ${w} ${h}` };
};

const lightning: ShapeFn = (w, h, fill, speed) => {
  const path = `M${w * 0.55},0 L${w * 0.3},${h * 0.45} L${w * 0.5},${h * 0.45} L${w * 0.45},${h} L${w * 0.7},${h * 0.55} L${w * 0.5},${h * 0.55} Z`;
  return {
    defs: "",
    background: `<rect width="${w}" height="${h}" fill="${fill}" opacity="0.3"/>
      <path d="${path}" fill="${fill}"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

const mountain: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<rect width="${w}" height="${h}" fill="${fill}" opacity="0.3"/>
    <polygon points="0,${h} ${w * 0.3},${h * 0.4} ${w * 0.45},${h * 0.6} ${w * 0.65},${h * 0.25} ${w},${h}" fill="${fill}"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const city: ShapeFn = (w, h, fill, speed) => {
  const buildings = [];
  let x = 0;
  while (x < w) {
    const bw = 30 + ((x * 13) % 40);
    const bh = h * 0.35 + ((x * 7) % 100);
    buildings.push(`<rect x="${x}" y="${h - bh}" width="${bw}" height="${bh}" fill="${fill}"/>`);
    x += bw + 6;
  }
  return {
    defs: "",
    background: `<rect width="${w}" height="${h}" fill="${fill}" opacity="0.2"/>
      ${buildings.join("")}`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

const terminal: ShapeFn = (w, h, fill, speed) => ({
  defs: "",
  background: `<rect width="${w}" height="${h}" rx="10" fill="${fill}"/>
    <rect x="0" y="0" width="${w}" height="${h * 0.14}" rx="10" fill="rgba(0,0,0,0.4)"/>
    <rect x="0" y="${h * 0.07}" width="${w}" height="${h * 0.07}" fill="rgba(0,0,0,0.4)"/>
    <circle cx="${20}" cy="${h * 0.07}" r="6" fill="#ff5f57"/>
    <circle cx="${42}" cy="${h * 0.07}" r="6" fill="#febc2e"/>
    <circle cx="${64}" cy="${h * 0.07}" r="6" fill="#28c840"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const neon: ShapeFn = (w, h, fill, speed) => ({
  defs: `<filter id="neon-glow">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`,
  background: `<rect width="${w}" height="${h}" fill="${fill}"/>
    <rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="none"
      stroke="rgba(255,255,255,0.9)" stroke-width="2" filter="url(#neon-glow)"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

const grid: ShapeFn = (w, h, fill, speed) => {
  const lines: string[] = [];
  for (let x = 0; x <= w; x += 30) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`);
  }
  for (let y = 0; y <= h; y += 30) {
    lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`);
  }
  return {
    defs: "",
    background: `<rect width="${w}" height="${h}" fill="${fill}"/>${lines.join("")}`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

const circuit: ShapeFn = (w, h, fill, speed) => {
  const lines: string[] = [];
  let x = 20;
  while (x < w) {
    let y = 20;
    while (y < h) {
      const len = 40 + ((x + y) % 30);
      const dir = (x + y) % 2 === 0 ? "h" : "v";
      lines.push(
        dir === "h"
          ? `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" stroke="rgba(255,255,255,0.35)" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2.5" fill="rgba(255,255,255,0.6)"/>`
          : `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + len}" stroke="rgba(255,255,255,0.35)" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2.5" fill="rgba(255,255,255,0.6)"/>`,
      );
      y += 60;
    }
    x += 70;
  }
  return {
    defs: "",
    background: `<rect width="${w}" height="${h}" fill="${fill}"/>${lines.join("")}`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

const matrix: ShapeFn = (w, h, fill, speed) => {
  const chars: string[] = [];
  for (let col = 0; col < w; col += 20) {
    const colHeight = (col % 80) + 40;
    for (let row = 0; row < colHeight; row += 18) {
      const op = 1 - row / colHeight;
      const ch = (col + row) % 2 === 0 ? "0" : "1";
      chars.push(
        `<text x="${col}" y="${row + 14}" fill="rgba(0,255,120,${op.toFixed(2)})" font-family="monospace" font-size="14">${ch}</text>`,
      );
    }
  }
  return {
    defs: "",
    background: `<rect width="${w}" height="${h}" fill="${fill}"/>${chars.join("")}`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

const binary: ShapeFn = (w, h, fill, speed) => {
  const chars: string[] = [];
  for (let col = 0; col < w; col += 18) {
    for (let row = 0; row < h; row += 18) {
      const bit = (col * 7 + row * 13) % 2 === 0 ? "1" : "0";
      const op = 0.05 + ((col + row) % 10) * 0.02;
      chars.push(
        `<text x="${col}" y="${row + 14}" fill="rgba(255,255,255,${op.toFixed(2)})" font-family="monospace" font-size="12">${bit}</text>`,
      );
    }
  }
  return {
    defs: "",
    background: `<rect width="${w}" height="${h}" fill="${fill}"/>${chars.join("")}`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

export const SHAPES: Record<ShapeType, ShapeFn> = {
  waving,
  rect,
  rounded,
  soft,
  wave,
  wave2,
  slice,
  blob,
  blob2,
  circle,
  cylinder,
  diamond,
  triangle,
  trapezoid,
  arrow,
  ribbon,
  hexagon,
  shield,
  speech,
  lightning,
  mountain,
  city,
  terminal,
  neon,
  grid,
  circuit,
  matrix,
  binary,
};

export const SHAPE_LIST: { id: ShapeType; label: string }[] = [
  { id: "waving", label: "Waving" },
  { id: "rect", label: "Rectangle" },
  { id: "rounded", label: "Rounded" },
  { id: "soft", label: "Soft" },
  { id: "wave", label: "Wave" },
  { id: "wave2", label: "Wave 2" },
  { id: "slice", label: "Slice" },
  { id: "blob", label: "Blob" },
  { id: "blob2", label: "Blob 2" },
  { id: "circle", label: "Circle" },
  { id: "cylinder", label: "Cylinder" },
  { id: "diamond", label: "Diamond" },
  { id: "triangle", label: "Triangle" },
  { id: "trapezoid", label: "Trapezoid" },
  { id: "arrow", label: "Arrow" },
  { id: "ribbon", label: "Ribbon" },
  { id: "hexagon", label: "Hexagon" },
  { id: "shield", label: "Shield" },
  { id: "speech", label: "Speech" },
  { id: "lightning", label: "Lightning" },
  { id: "mountain", label: "Mountain" },
  { id: "city", label: "City" },
  { id: "terminal", label: "Terminal" },
  { id: "neon", label: "Neon" },
  { id: "grid", label: "Grid" },
  { id: "circuit", label: "Circuit" },
  { id: "matrix", label: "Matrix" },
  { id: "binary", label: "Binary" },
];
