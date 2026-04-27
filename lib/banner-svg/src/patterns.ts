import type { PatternType } from "./types.js";

export interface PatternDef {
  defs: string;
  fill: string; // url(#...)
}

export function buildPattern(
  type: PatternType,
  color: string,
  opacity: number,
  scale: number,
): PatternDef | null {
  if (type === "none") return null;
  const id = `pat-${type}`;
  const sz = Math.max(4, Math.round(20 * scale));
  const stroke = `stroke="${color}" stroke-opacity="${opacity}"`;
  const fillOp = `fill="${color}" fill-opacity="${opacity}"`;

  let inner = "";
  switch (type) {
    case "dots":
      inner = `<circle cx="${sz / 2}" cy="${sz / 2}" r="${Math.max(1, sz * 0.12)}" ${fillOp}/>`;
      break;
    case "grid":
      inner = `<path d="M ${sz} 0 L 0 0 0 ${sz}" fill="none" ${stroke} stroke-width="1"/>`;
      break;
    case "lines":
      inner = `<line x1="0" y1="${sz / 2}" x2="${sz}" y2="${sz / 2}" ${stroke} stroke-width="1.5"/>`;
      break;
    case "diagonal":
      inner = `<line x1="0" y1="${sz}" x2="${sz}" y2="0" ${stroke} stroke-width="1.5"/>`;
      break;
    case "cross":
      inner = `<path d="M0 ${sz / 2} H${sz} M${sz / 2} 0 V${sz}" ${stroke} stroke-width="1"/>`;
      break;
    case "circuit":
      inner = `<path d="M0 ${sz / 2} H${sz / 2} V0 M${sz / 2} ${sz} V${sz / 2} H${sz}" fill="none" ${stroke} stroke-width="1.2"/><circle cx="${sz / 2}" cy="${sz / 2}" r="1.5" ${fillOp}/>`;
      break;
    case "hexagon": {
      const r = sz * 0.45;
      const cx = sz / 2;
      const cy = sz / 2;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
      }).join(" ");
      inner = `<polygon points="${pts}" fill="none" ${stroke} stroke-width="1"/>`;
      break;
    }
    case "triangle":
      inner = `<polygon points="${sz / 2},2 ${sz - 2},${sz - 2} 2,${sz - 2}" fill="none" ${stroke} stroke-width="1"/>`;
      break;
    case "wave":
      inner = `<path d="M0 ${sz * 0.3} Q${sz * 0.25} ${sz * 0.05} ${sz * 0.5} ${sz * 0.3} T${sz} ${sz * 0.3} M0 ${sz * 0.7} Q${sz * 0.25} ${sz * 0.45} ${sz * 0.5} ${sz * 0.7} T${sz} ${sz * 0.7}" fill="none" ${stroke} stroke-width="1.2"/>`;
      break;

    case "noise":
      inner = Array.from({ length: 12 }, (_, i) => {
        const x = (i * 7) % sz;
        const y = (i * 11) % sz;
        return `<circle cx="${x}" cy="${y}" r="0.7" ${fillOp}/>`;
      }).join("");
      break;
    case "isometric":
      inner = `<path d="M0 ${sz} L${sz / 2} 0 L${sz} ${sz} M0 0 L${sz / 2} ${sz} L${sz} 0" fill="none" ${stroke} stroke-width="1"/>`;
      break;
    case "topography":
      inner = `<circle cx="${sz / 2}" cy="${sz / 2}" r="${sz * 0.4}" fill="none" ${stroke} stroke-width="0.8"/><circle cx="${sz / 2}" cy="${sz / 2}" r="${sz * 0.25}" fill="none" ${stroke} stroke-width="0.8"/>`;
      break;
    case "checker":
      inner = `<rect x="0" y="0" width="${sz / 2}" height="${sz / 2}" ${fillOp}/><rect x="${sz / 2}" y="${sz / 2}" width="${sz / 2}" height="${sz / 2}" ${fillOp}/>`;
      break;
  }

  const defs = `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${sz}" height="${sz}">${inner}</pattern>`;
  return { defs, fill: `url(#${id})` };
}
