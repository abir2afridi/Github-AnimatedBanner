import type { ParticleType } from "./types.js";

// Simple deterministic PRNG so URL params produce stable output server-side.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildParticles(
  type: ParticleType,
  count: number,
  color: string,
  size: number,
  opacity: number,
  w: number,
  h: number,
): { defs: string; svg: string } {
  if (type === "none" || count <= 0) return { defs: "", svg: "" };
  const rand = mulberry32(99 + count + size);
  const items: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const s = size * (0.6 + rand() * 0.8);
    const op = opacity * (0.5 + rand() * 0.6);
    const dur = 2 + rand() * 4;
    const delay = -rand() * dur;

    switch (type) {
      case "stars": {
        const r1 = s;
        const r2 = s * 0.4;
        const pts: string[] = [];
        for (let k = 0; k < 10; k++) {
          const a = (k / 10) * Math.PI * 2 - Math.PI / 2;
          const r = k % 2 === 0 ? r1 : r2;
          pts.push(`${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)}`);
        }
        items.push(
          `<polygon points="${pts.join(" ")}" fill="${color}" opacity="${op.toFixed(2)}"><animate attributeName="opacity" values="${(op * 0.2).toFixed(2)};${op.toFixed(2)};${(op * 0.2).toFixed(2)}" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></polygon>`,
        );
        break;
      }
      case "snowflakes":
        items.push(
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}" fill="${color}" opacity="${op.toFixed(2)}"><animate attributeName="cy" values="${y.toFixed(1)};${(y + h).toFixed(1)}" dur="${(dur * 2).toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></circle>`,
        );
        break;
      case "bubbles":
        items.push(
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1" opacity="${op.toFixed(2)}"><animate attributeName="cy" values="${(y + h * 0.3).toFixed(1)};${(-s).toFixed(1)}" dur="${(dur * 1.5).toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></circle>`,
        );
        break;
      case "confetti": {
        const colors = ["#ff5e5b", "#ffed66", "#00cecb", "#ffafcc", "#a0c4ff"];
        const c = colors[i % colors.length];
        items.push(
          `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(s * 1.5).toFixed(1)}" height="${(s * 0.6).toFixed(1)}" fill="${c}" opacity="${op.toFixed(2)}" transform="rotate(${(rand() * 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"><animateTransform attributeName="transform" type="rotate" from="0 ${x.toFixed(1)} ${y.toFixed(1)}" to="360 ${x.toFixed(1)} ${y.toFixed(1)}" dur="${dur.toFixed(2)}s" repeatCount="indefinite"/></rect>`,
        );
        break;
      }
      case "sparkles":
        items.push(
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}" fill="${color}" opacity="${op.toFixed(2)}"><animate attributeName="r" values="0;${s.toFixed(1)};0" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></circle>`,
        );
        break;
      case "embers":
        items.push(
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}" fill="${color}" opacity="${op.toFixed(2)}"><animate attributeName="cy" values="${y.toFixed(1)};${(-s).toFixed(1)}" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="${op.toFixed(2)};0" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></circle>`,
        );
        break;
      case "matrix":
        items.push(
          `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" fill="${color}" opacity="${op.toFixed(2)}" font-family="monospace" font-size="${(s * 1.3).toFixed(0)}">${i % 2 === 0 ? "1" : "0"}<animate attributeName="opacity" values="0;${op.toFixed(2)};0" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></text>`,
        );
        break;
      case "hearts": {
        const ss = s * 0.4;
        items.push(
          `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${ss.toFixed(2)})" d="M0,3 C-3,0 -7,2 -7,5 C-7,8 0,12 0,12 C0,12 7,8 7,5 C7,2 3,0 0,3 Z" fill="${color}" opacity="${op.toFixed(2)}"><animateTransform attributeName="transform" type="translate" values="${x.toFixed(1)} ${y.toFixed(1)};${x.toFixed(1)} ${(y - h * 0.3).toFixed(1)}" additive="replace" dur="${(dur * 2).toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></path>`,
        );
        break;
      }
      case "fireflies":
        items.push(
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(s * 0.6).toFixed(1)}" fill="${color}" opacity="${op.toFixed(2)}"><animate attributeName="opacity" values="0;${op.toFixed(2)};0" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></circle>`,
        );
        break;
      case "rain":
        items.push(
          `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y + s * 3).toFixed(1)}" stroke="${color}" stroke-width="1" opacity="${(op * 0.5).toFixed(2)}"><animate attributeName="y1" values="${y.toFixed(1)};${(y + h).toFixed(1)}" dur="${(dur * 0.5).toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="y2" values="${(y + s * 3).toFixed(1)};${(y + h + s * 3).toFixed(1)}" dur="${(dur * 0.5).toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></line>`,
        );
        break;
      case "rockets": {
        const path = "M-2,0 L0,-4 L2,0 L1,4 L-1,4 Z";
        items.push(
          `<path d="${path}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})" fill="${color}" opacity="${op.toFixed(2)}"><animateTransform attributeName="transform" type="translate" values="${x.toFixed(1)} ${(y + h).toFixed(1)};${x.toFixed(1)} ${(-s * 5).toFixed(1)}" dur="${(dur * 0.8).toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></path>`,
        );
        break;
      }
      case "blocks":
        items.push(
          `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="1" fill="${color}" opacity="${op.toFixed(2)}"><animateTransform attributeName="transform" type="rotate" values="0 ${x.toFixed(1)} ${y.toFixed(1)};360 ${x.toFixed(1)} ${y.toFixed(1)}" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></rect>`,
        );
        break;
      case "programming": {
        const icons = [
          "M-2,-2 L2,0 L-2,2", // > (bracket)
          "M-2,2 L2,-2", // / (slash)
          "M-2,0 A2,2 0 1,1 2,0 A2,2 0 1,1 -2,0", // circle
          "M-2,-2 H2 V2 H-2 Z", // square
        ];
        const p = icons[i % icons.length];
        items.push(
          `<path d="${p}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})" fill="none" stroke="${color}" stroke-width="1" opacity="${op.toFixed(2)}"><animate attributeName="opacity" values="0;${op.toFixed(2)};0" dur="${dur.toFixed(2)}s" begin="${delay.toFixed(2)}s" repeatCount="indefinite"/></path>`,
        );
        break;
      }
    }
  }

  return { defs: "", svg: `<g class="particles">${items.join("")}</g>` };
}
