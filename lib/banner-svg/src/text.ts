import type { TextLayer } from "./types.js";

export function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface RenderedText {
  defs: string;
  svg: string;
}

export function renderTextLayer(layer: TextLayer, w: number, h: number): RenderedText {
  const x = (layer.alignX / 100) * w;
  const y = (layer.alignY / 100) * h;
  const anchor =
    layer.fontAlign === "left" ? "start" : layer.fontAlign === "right" ? "end" : "middle";

  let defs = "";
  let fill: string;
  if (layer.gradient && layer.gradientColors.length >= 2) {
    const id = `text-grad-${layer.id}`;
    const stops = layer.gradientColors
      .map(
        (c, i) =>
          `<stop offset="${Math.round((i / (layer.gradientColors.length - 1)) * 100)}%" stop-color="${c}"/>`,
      )
      .join("");
    defs += `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">${stops}</linearGradient>`;
    fill = `url(#${id})`;
  } else {
    fill = layer.fontColor;
  }

  const filters: string[] = [];
  if (layer.textShadow) {
    filters.push(
      `drop-shadow(${layer.textShadowX}px ${layer.textShadowY}px ${layer.textShadowBlur}px ${layer.textShadowColor})`,
    );
  }
  if (layer.glowEffect) {
    filters.push(`drop-shadow(0 0 ${layer.glowRadius}px ${layer.glowColor})`);
  }
  const filterStyle = filters.length ? `filter:${filters.join(" ")};` : "";

  const stroke = layer.textStroke
    ? `paint-order="stroke" stroke="${layer.textStrokeColor}" stroke-width="${layer.textStrokeWidth}" stroke-linejoin="round"`
    : "";

  const transform = `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${layer.rotate}) skewX(${layer.skewX ?? 0}) skewY(${layer.skewY ?? 0}) translate(${-x.toFixed(1)} ${-y.toFixed(1)})`;
  const lines = layer.text.split("\n");
  const lineHeight = layer.fontSize * 1.15;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;

  const tspans = lines
    .map((line, idx) => {
      const ly = startY + idx * lineHeight;
      return `<tspan x="${x.toFixed(1)}" y="${ly.toFixed(1)}">${escapeXML(line)}</tspan>`;
    })
    .join("");

  const svg = `<text class="tl-${layer.id} bf-text"
    text-anchor="${anchor}"
    fill="${fill}"
    font-size="${layer.fontSize}"
    font-family="${escapeXML(layer.fontFamily)}, system-ui, sans-serif"
    font-weight="${layer.fontWeight}"
    font-style="${layer.fontStyle}"
    letter-spacing="${layer.letterSpacing}"
    opacity="${layer.opacity}"
    transform="${transform}"
    style="${filterStyle}text-transform:${layer.textTransform};text-decoration:${layer.textDecoration};dominant-baseline:middle;"
    ${stroke}>${tspans}</text>`;

  return { defs, svg };
}
