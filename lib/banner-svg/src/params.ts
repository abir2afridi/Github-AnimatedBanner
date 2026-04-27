import { DEFAULT_PARAMS, createDefaultTextLayer } from "./defaults.js";
import { COLOR_PRESETS, presetToStops } from "./gradients.js";
import type {
  AnimationType,
  BannerParams,
  ColorPreset,
  GradientStop,
  GradientType,
  OverlayType,
  ParticleType,
  PatternType,
  ShadowType,
  ShapeType,
  TextLayer,
} from "./types.js";

function n(v: string | null, def: number, min?: number, max?: number): number {
  if (v == null) return def;
  const num = Number(v);
  if (Number.isNaN(num)) return def;
  if (min != null && num < min) return min;
  if (max != null && num > max) return max;
  return num;
}

function s(v: string | null, def: string): string {
  return v == null || v === "" ? def : v;
}

function b(v: string | null, def: boolean): boolean {
  if (v == null) return def;
  return v === "1" || v === "true" || v === "yes";
}

function parseStops(v: string | null): GradientStop[] | null {
  if (!v) return null;
  // format: "ff5500,ffaa00,ffee00" or with positions "ff5500@0,ffaa00@50,ffee00@100"
  const parts = v.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) return null;
  return parts.map((p, i) => {
    const [c, pos] = p.split("@");
    const color = c.startsWith("#") ? c : `#${c}`;
    const position = pos != null ? Number(pos) : Math.round((i / Math.max(1, parts.length - 1)) * 100);
    return { color, position };
  });
}

const VALID_SHAPES = new Set<ShapeType>([
  "waving","rect","rounded","soft","wave","wave2","slice","blob","blob2",
  "circle","cylinder","diamond","triangle","trapezoid","arrow","ribbon",
  "hexagon","shield","speech","lightning","mountain","city","terminal",
  "neon","grid","circuit","matrix","binary",
]);
const VALID_PATTERNS = new Set<PatternType>([
  "none","dots","grid","lines","diagonal","cross","circuit","hexagon",
  "triangle","wave","noise","isometric","topography","checker",
]);
const VALID_PARTICLES = new Set<ParticleType>([
  "none","stars","snowflakes","bubbles","confetti","sparkles","embers",
  "matrix","hearts","fireflies",
]);
const VALID_OVERLAYS = new Set<OverlayType>([
  "none","vignette","scanlines","grain","lightLeak","fog",
]);
const VALID_SHADOWS = new Set<ShadowType>(["none","soft","hard","neon"]);
const VALID_GRADIENTS = new Set<GradientType>(["linear","radial","conic"]);
const VALID_ANIMS = new Set<AnimationType>([
  "none","fadeIn","scaleIn","slideInLeft","slideInRight","slideInTop",
  "slideInBottom","blink","twinkling","typewriter","glitch","float","pulse",
  "bounce","waveText","ripple","sparkle","rotate","shake","neonFlicker",
  "colorShift","reveal",
]);

export function parseQueryParams(q: URLSearchParams): BannerParams {
  const type = (s(q.get("type"), DEFAULT_PARAMS.type) as ShapeType);
  const validatedType: ShapeType = VALID_SHAPES.has(type) ? type : DEFAULT_PARAMS.type;

  // Colors - support preset OR custom stops
  const presetParam = q.get("preset") as ColorPreset | null;
  let stops: GradientStop[];
  let preset: ColorPreset | undefined;
  const explicit = parseStops(q.get("color"));
  if (explicit && explicit.length >= 1) {
    if (explicit.length === 1) {
      // Solid color: synth a 2-stop gradient
      stops = [
        { color: explicit[0].color, position: 0 },
        { color: explicit[0].color, position: 100 },
      ];
    } else {
      stops = explicit;
    }
    preset = "custom";
  } else if (presetParam && presetParam !== "custom" && presetParam in COLOR_PRESETS) {
    stops = presetToStops(presetParam);
    preset = presetParam;
  } else {
    stops = DEFAULT_PARAMS.gradientStops;
    preset = DEFAULT_PARAMS.colorPreset;
  }

  const pattern = (s(q.get("pattern"), "none") as PatternType);
  const particles = (s(q.get("particles"), "none") as ParticleType);
  const overlay = (s(q.get("overlay"), "none") as OverlayType);
  const shadow = (s(q.get("shadow"), "none") as ShadowType);
  const gradientType = (s(q.get("gradientType"), "linear") as GradientType);
  const animation = (s(q.get("animation"), "none") as AnimationType);

  const layers: TextLayer[] = [];
  const text = q.get("text");
  if (text) {
    layers.push(
      createDefaultTextLayer({
        text,
        fontFamily: s(q.get("fontFamily"), "Poppins"),
        fontSize: n(q.get("fontSize"), 80, 8, 200),
        fontWeight: n(q.get("fontWeight"), 800, 100, 900),
        fontColor: s(q.get("fontColor"), "#ffffff"),
        alignY: n(q.get("textY"), 50, 0, 100),
        alignX: n(q.get("textX"), 50, 0, 100),
        animation: VALID_ANIMS.has(animation) ? animation : "none",
        animationDelay: n(q.get("animationDelay"), 0, 0, 5000),
      }),
    );
  }
  const desc = q.get("desc");
  if (desc) {
    layers.push(
      createDefaultTextLayer({
        text: desc,
        fontFamily: s(q.get("descFontFamily"), s(q.get("fontFamily"), "Poppins")),
        fontSize: n(q.get("descFontSize"), 28, 8, 200),
        fontWeight: n(q.get("descFontWeight"), 500, 100, 900),
        fontColor: s(q.get("descColor"), "#ffffff"),
        alignY: n(q.get("descY"), 75, 0, 100),
        opacity: 0.92,
        animation: "slideInBottom",
        animationDelay: 200,
      }),
    );
  }

  return {
    type: validatedType,
    width: n(q.get("width"), DEFAULT_PARAMS.width, 200, 2400),
    height: n(q.get("height"), DEFAULT_PARAMS.height, 60, 800),
    color: explicit?.[0]?.color ?? DEFAULT_PARAMS.color,
    colorPreset: preset,
    gradientType: VALID_GRADIENTS.has(gradientType) ? gradientType : "linear",
    gradientAngle: n(q.get("gradientAngle"), 90, 0, 360),
    gradientStops: stops,
    reverseColor: b(q.get("reverse"), false),
    pattern: VALID_PATTERNS.has(pattern) ? pattern : "none",
    patternColor: s(q.get("patternColor"), "#ffffff"),
    patternOpacity: n(q.get("patternOpacity"), 0.15, 0, 1),
    patternScale: n(q.get("patternScale"), 1, 0.1, 5),
    particles: VALID_PARTICLES.has(particles) ? particles : "none",
    particleCount: n(q.get("particleCount"), 40, 0, 300),
    particleColor: s(q.get("particleColor"), "#ffffff"),
    particleSize: n(q.get("particleSize"), 4, 1, 30),
    particleOpacity: n(q.get("particleOpacity"), 0.8, 0, 1),
    overlay: VALID_OVERLAYS.has(overlay) ? overlay : "none",
    overlayOpacity: n(q.get("overlayOpacity"), 0.4, 0, 1),
    overlayColor: s(q.get("overlayColor"), "#000000"),
    blur: n(q.get("blur"), 0, 0, 30),
    shadow: VALID_SHADOWS.has(shadow) ? shadow : "none",
    brightness: n(q.get("brightness"), 1, 0, 3),
    contrast: n(q.get("contrast"), 1, 0, 3),
    saturation: n(q.get("saturation"), 1, 0, 3),
    hueRotate: n(q.get("hueRotate"), 0, 0, 360),
    animationSpeed: n(q.get("speed"), 1, 0.1, 5),
    textLayers: layers.length > 0 ? layers : DEFAULT_PARAMS.textLayers,
  };
}

export function paramsToQuery(p: BannerParams): URLSearchParams {
  const q = new URLSearchParams();
  if (p.type !== DEFAULT_PARAMS.type) q.set("type", p.type);
  if (p.width !== DEFAULT_PARAMS.width) q.set("width", String(p.width));
  if (p.height !== DEFAULT_PARAMS.height) q.set("height", String(p.height));

  if (p.colorPreset && p.colorPreset !== "custom") {
    q.set("preset", p.colorPreset);
  } else {
    const cs = p.gradientStops
      .map((s) => `${s.color.replace("#", "")}@${Math.round(s.position)}`)
      .join(",");
    q.set("color", cs);
  }

  if (p.gradientType !== "linear") q.set("gradientType", p.gradientType);
  if (p.gradientAngle !== 90) q.set("gradientAngle", String(Math.round(p.gradientAngle)));
  if (p.reverseColor) q.set("reverse", "1");

  if (p.pattern !== "none") {
    q.set("pattern", p.pattern);
    if (p.patternColor !== "#ffffff") q.set("patternColor", p.patternColor);
    if (p.patternOpacity !== 0.15) q.set("patternOpacity", String(p.patternOpacity));
    if (p.patternScale !== 1) q.set("patternScale", String(p.patternScale));
  }

  if (p.particles !== "none") {
    q.set("particles", p.particles);
    q.set("particleCount", String(p.particleCount));
    if (p.particleColor !== "#ffffff") q.set("particleColor", p.particleColor);
    if (p.particleSize !== 4) q.set("particleSize", String(p.particleSize));
    if (p.particleOpacity !== 0.8) q.set("particleOpacity", String(p.particleOpacity));
  }

  if (p.overlay !== "none") {
    q.set("overlay", p.overlay);
    q.set("overlayOpacity", String(p.overlayOpacity));
    if (p.overlayColor !== "#000000") q.set("overlayColor", p.overlayColor);
  }

  if (p.blur > 0) q.set("blur", String(p.blur));
  if (p.shadow !== "none") q.set("shadow", p.shadow);
  if (p.brightness !== 1) q.set("brightness", String(p.brightness));
  if (p.contrast !== 1) q.set("contrast", String(p.contrast));
  if (p.saturation !== 1) q.set("saturation", String(p.saturation));
  if (p.hueRotate !== 0) q.set("hueRotate", String(p.hueRotate));
  if (p.animationSpeed !== 1) q.set("speed", String(p.animationSpeed));

  // Text layers: encode top 1-2 only for URL brevity
  const t1 = p.textLayers[0];
  if (t1 && t1.text) {
    q.set("text", t1.text);
    if (t1.fontFamily !== "Poppins") q.set("fontFamily", t1.fontFamily);
    if (t1.fontSize !== 80) q.set("fontSize", String(t1.fontSize));
    if (t1.fontWeight !== 800) q.set("fontWeight", String(t1.fontWeight));
    if (t1.fontColor !== "#ffffff") q.set("fontColor", t1.fontColor);
    if (t1.animation !== "none") q.set("animation", t1.animation);
    if (t1.animationDelay !== 0) q.set("animationDelay", String(t1.animationDelay));
  }
  const t2 = p.textLayers[1];
  if (t2 && t2.text) {
    q.set("desc", t2.text);
    if (t2.fontSize !== 28) q.set("descFontSize", String(t2.fontSize));
    if (t2.fontColor !== "#ffffff") q.set("descColor", t2.fontColor);
  }

  return q;
}
