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
  const shape = shapeFn(w, h, `url(#${bgGradId})`);

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
    .bf-canvas { ${compositeFilter ? `filter:${compositeFilter};` : ""} }
    ${animCSS}
  </style>`;

  // 11. Build final SVG
  const defs = `<defs>
    ${gradientDef}
    ${shape.defs}
    ${pattern?.defs ?? ""}
    ${particles.defs}
    ${overlay.defs}
    ${textDefs}
  </defs>`;

  const patternLayer = pattern
    ? `<rect width="${w}" height="${h}" fill="${pattern.fill}" style="mix-blend-mode:overlay"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="banner">
    ${style}
    ${defs}
    <g class="bf-canvas">
      ${shape.background}
      ${patternLayer}
      ${particles.svg}
      ${overlay.svg}
      ${textSvg}
    </g>
  </svg>`;
}
