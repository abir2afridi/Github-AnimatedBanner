import { buildAnimationCSS } from "./animations.js";
import {
  buildColorAdjustFilter,
  buildOverlay,
  buildShadowFilter,
} from "./effects.js";
import { getFontImportCSS } from "./fonts.js";
import { buildGradientDef } from "./gradients.js";
import { buildParticles } from "./particles.js";
import { buildPattern } from "./patterns.js";
import { SHAPES } from "./shapes.js";
import { renderTextLayer } from "./text.js";
import type { BannerParams } from "./types.js";

export function generateBannerSVG(params: BannerParams): string {
  const { width: w, height: h } = params;

  // 1. Background gradient
  const bgGradId = "bg-gradient";
  const gradientDef = buildGradientDef({
    id: bgGradId,
    type: params.gradientType,
    angle: params.gradientAngle,
    stops: params.gradientStops,
    reverse: params.reverseColor,
    width: w,
    height: h,
  });

  // 2. Shape
  const shapeFn = SHAPES[params.type] ?? SHAPES.rect;
  const shape = shapeFn(w, h, `url(#${bgGradId})`, params.animationSpeed);

  // 3. Pattern overlay (over shape)
  const pattern = buildPattern(
    params.pattern,
    params.patternColor,
    params.patternOpacity,
    params.patternScale,
  );

  // 4. Particles
  const particles = buildParticles(
    params.particles,
    params.particleCount,
    params.particleColor,
    params.particleSize,
    params.particleOpacity,
    w,
    h,
  );

  // 5. Overlay effect
  const overlay = buildOverlay(
    params.overlay,
    params.overlayColor,
    params.overlayOpacity,
    w,
    h,
  );

  // 6. Color adjust + blur filter
  const adjust = buildColorAdjustFilter(
    params.brightness,
    params.contrast,
    params.saturation,
    params.hueRotate,
    params.blur,
  );
  const shadow = buildShadowFilter(params.shadow);
  const compositeFilter = [adjust, shadow].filter(Boolean).join(" ");

  // 7. Text layers
  let textDefs = "";
  const textSvg = params.textLayers
    .map((layer) => {
      const r = renderTextLayer(layer, w, h);
      textDefs += r.defs;
      return r.svg;
    })
    .join("");

  // 8. Animations: per layer + overall + particle/shape entry
  const animCSS = params.textLayers
    .map((layer) =>
      buildAnimationCSS({
        animation: layer.animation,
        speed: params.animationSpeed,
        delay: layer.animationDelay,
        targetSelector: `.tl-${layer.id}`,
      }),
    )
    .join("\n");
  


  // 9. Fonts
  const fontImport = getFontImportCSS(params.textLayers.map((l) => l.fontFamily));

  // 10. Style block
  const style = `<style>
    ${fontImport}
    .bf-container { ${compositeFilter ? `filter:${compositeFilter};` : ""} }
    .marching-border { animation: marching 1s linear infinite; }
    .zigzag-border { filter: url(#zigzag-distort); }
    @keyframes marching { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 16; } }
    ${animCSS}
  </style>`;


  // 11. Border & Clip
  const clipId = "banner-clip";
  const cs = params.cornerStyle || "rounded";
  let clipPathContent = "";
  if (params.borderRadius > 0) {
    if (cs === "rounded") {
      clipPathContent = `<rect width="${w}" height="${h}" rx="${params.borderRadius}"/>`;
    } else {
      const c = params.borderRadius;
      clipPathContent = `<path d="M ${c},0 L ${w-c},0 L ${w},${c} L ${w},${h-c} L ${w-c},${h} L ${c},${h} L 0,${h-c} L 0,${c} Z"/>`;
    }
  }
  const clipPath = clipPathContent ? `<clipPath id="${clipId}">${clipPathContent}</clipPath>` : "";

  let borderSvg = "";
  if (params.borderStyle !== "none" && params.borderWidth > 0) {
    const bw = params.borderWidth;
    const bc = params.borderColor;
    const br = params.borderRadius;
    const bs = params.borderStyle;
    
    let styleAttr = `stroke-width="${bw}"`;
    if (bs === "dashed") styleAttr += ` stroke-dasharray="8,8" stroke="${bc}"`;
    else if (bs === "dotted") styleAttr += ` stroke-dasharray="2,6" stroke-linecap="round" stroke="${bc}"`;
    else if (bs === "marching") styleAttr += ` stroke-dasharray="8,8" stroke="${bc}" class="marching-border"`;
    else if (bs === "gradient") styleAttr += ` stroke="url(#border-grad)"`;
    else if (bs === "zigzag") styleAttr += ` stroke="${bc}" class="zigzag-border"`;
    else if (bs === "neon") styleAttr += ` stroke="${bc}" style="filter: drop-shadow(0 0 5px ${bc}) drop-shadow(0 0 10px ${bc});"`;
    else if (bs === "groove") {
      const b2 = bw / 2;
      borderSvg = `
        <g opacity="0.6">
          <rect x="${bw/2}" y="${bw/2}" width="${w-bw}" height="${h-bw}" rx="${br}" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="${b2}"/>
          <rect x="${bw/2 + b2}" y="${bw/2 + b2}" width="${w-bw - b2*2}" height="${h-bw - b2*2}" rx="${Math.max(0, br-b2)}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="${b2}"/>
        </g>
      `;
    }
    else if (bs === "ridge") {
      const b2 = bw / 2;
      borderSvg = `
        <g opacity="0.6">
          <rect x="${bw/2}" y="${bw/2}" width="${w-bw}" height="${h-bw}" rx="${br}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="${b2}"/>
          <rect x="${bw/2 + b2}" y="${bw/2 + b2}" width="${w-bw - b2*2}" height="${h-bw - b2*2}" rx="${Math.max(0, br-b2)}" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="${b2}"/>
        </g>
      `;
    }
    else if (bs === "double") {
      const b2 = bw / 3;
      borderSvg = `
        <rect x="${bw/2}" y="${bw/2}" width="${w-bw}" height="${h-bw}" rx="${br}" fill="none" stroke="${bc}" stroke-width="${b2}"/>
        <rect x="${bw/2 + b2*2}" y="${bw/2 + b2*2}" width="${w-bw - b2*4}" height="${h-bw - b2*4}" rx="${Math.max(0, br-b2*2)}" fill="none" stroke="${bc}" stroke-width="${b2}"/>
      `;
    }
    else if (bs === "glass") styleAttr += ` stroke="rgba(255,255,255,0.4)" style="mix-blend-mode:overlay;"`;
    else if (bs === "frame") {
      borderSvg = `
        <path d="M 0,0 L ${w},0 L ${w},${h} L 0,${h} Z M ${bw},${bw} L ${bw},${h-bw} L ${w-bw},${h-bw} L ${w-bw},${bw} Z" fill="${bc}" opacity="0.8"/>
      `;
    }
    else if (bs === "bracket") {
      const len = Math.min(w, h) * 0.2;
      borderSvg = `
        <g stroke="${bc}" stroke-width="${bw}" fill="none">
          <path d="M 0,${len} L 0,0 L ${len},0"/>
          <path d="M ${w-len},0 L ${w},0 L ${w},${len}"/>
          <path d="M ${w},${h-len} L ${w},${h} L ${w-len},${h}"/>
          <path d="M ${len},${h} L 0,${h} L 0,${h-len}"/>
        </g>
      `;
    }
    else styleAttr += ` stroke="${bc}"`;

    if (bs !== "double" && bs !== "groove" && bs !== "ridge" && bs !== "frame" && bs !== "bracket") {
      if (cs === "rounded") {
        borderSvg = `<rect x="${bw / 2}" y="${bw / 2}" width="${w - bw}" height="${h - bw}" rx="${br}" fill="none" ${styleAttr}/>`;
      } else {
        const o = bw / 2;
        borderSvg = `<path d="M ${br},${o} L ${w-br},${o} L ${w-o},${br} L ${w-o},${h-br} L ${w-br},${h-o} L ${br},${h-o} L ${o},${h-br} L ${o},${br} Z" fill="none" ${styleAttr}/>`;
      }
    }
  }

  // 12. Build final SVG
  const defs = `<defs>
    ${gradientDef}
    ${shape.defs}
    ${pattern?.defs ?? ""}
    ${particles.defs}
    ${overlay.defs}
    ${textDefs}
    ${clipPath}
    ${params.borderStyle === 'gradient' ? `
      <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${params.borderColor}"/>
        <stop offset="100%" stop-color="${params.overlayColor || '#ffffff'}"/>
      </linearGradient>
    ` : ''}
    <filter id="zigzag-distort">
      <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turb"/>
      <feDisplacementMap in="SourceGraphic" in2="turb" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>`;

  const patternLayer = pattern
    ? `<rect width="${w}" height="${h}" fill="${pattern.fill}" style="mix-blend-mode:overlay"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="banner">
    ${style}
    ${defs}
    <g class="bf-container">
      <g class="bf-canvas" ${params.borderRadius > 0 ? `clip-path="url(#${clipId})"` : ""}>
        ${shape.background}
        ${patternLayer}
        ${particles.svg}
        ${overlay.svg}
        ${textSvg}
      </g>
      ${borderSvg}
    </g>
  </svg>`;
}
