export type ShapeType =
  | "waving"
  | "rect"
  | "rounded"
  | "soft"
  | "wave"
  | "wave2"
  | "slice"
  | "blob"
  | "blob2"
  | "circle"
  | "cylinder"
  | "diamond"
  | "triangle"
  | "trapezoid"
  | "arrow"
  | "ribbon"
  | "hexagon"
  | "shield"
  | "speech"
  | "lightning"
  | "mountain"
  | "city"
  | "terminal"
  | "neon"
  | "grid"
  | "circuit"
  | "matrix"
  | "binary";

export type AnimationType =
  | "none"
  | "fadeIn"
  | "scaleIn"
  | "slideInLeft"
  | "slideInRight"
  | "slideInTop"
  | "slideInBottom"
  | "blink"
  | "twinkling"
  | "typewriter"
  | "glitch"
  | "float"
  | "pulse"
  | "bounce"
  | "waveText"
  | "ripple"
  | "sparkle"
  | "rotate"
  | "shake"
  | "neonFlicker"
  | "colorShift"
  | "reveal";

export type ColorPreset =
  | "sunset"
  | "ocean"
  | "fire"
  | "aurora"
  | "lava"
  | "midnight"
  | "forest"
  | "candy"
  | "mint"
  | "rose"
  | "neon"
  | "cyberpunk"
  | "pastel"
  | "monochrome"
  | "gold"
  | "space"
  | "toxic"
  | "ice"
  | "berry"
  | "coral"
  | "deepsea"
  | "sunset_vibes"
  | "cyber_lime"
  | "gameboy"
  | "morning_mist"
  | "custom";

export type GradientType = "linear" | "radial" | "conic";

export type PatternType =
  | "none"
  | "dots"
  | "grid"
  | "lines"
  | "diagonal"
  | "cross"
  | "circuit"
  | "hexagon"
  | "triangle"
  | "wave"
  | "noise"
  | "isometric"
  | "topography"
  | "checker";

export type ParticleType =
  | "none"
  | "stars"
  | "snowflakes"
  | "bubbles"
  | "confetti"
  | "sparkles"
  | "embers"
  | "matrix"
  | "hearts"
  | "fireflies";

export type OverlayType =
  | "none"
  | "vignette"
  | "scanlines"
  | "grain"
  | "lightLeak"
  | "fog";

export type ShadowType = "none" | "soft" | "hard" | "neon";

export interface GradientStop {
  color: string;
  position: number; // 0..100
}

export interface TextLayer {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  fontColor: string;
  fontAlign: "left" | "center" | "right";
  alignX: number; // 0..100 (% of width)
  alignY: number; // 0..100
  letterSpacing: number;
  textTransform: "none" | "uppercase" | "lowercase";
  textDecoration: "none" | "underline";
  rotate: number;
  opacity: number;
  // gradient
  gradient: boolean;
  gradientColors: string[];
  // shadow / glow / stroke
  textShadow: boolean;
  textShadowColor: string;
  textShadowX: number;
  textShadowY: number;
  textShadowBlur: number;
  glowEffect: boolean;
  glowColor: string;
  glowRadius: number;
  textStroke: boolean;
  textStrokeColor: string;
  textStrokeWidth: number;
  // animation
  animation: AnimationType;
  animationDelay: number;
}

export interface BannerParams {
  // Shape
  type: ShapeType;
  width: number;
  height: number;

  // Color
  color: string; // single solid hex or gradient seed
  colorPreset?: ColorPreset;
  gradientType: GradientType;
  gradientAngle: number;
  gradientStops: GradientStop[]; // 2-5 stops
  reverseColor: boolean;

  // Pattern
  pattern: PatternType;
  patternColor: string;
  patternOpacity: number;
  patternScale: number;

  // Particles
  particles: ParticleType;
  particleCount: number;
  particleColor: string;
  particleSize: number;
  particleOpacity: number;

  // Effects
  overlay: OverlayType;
  overlayOpacity: number;
  overlayColor: string;
  blur: number;
  shadow: ShadowType;
  brightness: number; // 0..2
  contrast: number; // 0..2
  saturation: number; // 0..2
  hueRotate: number; // 0..360

  // Animation (global / for shape)
  animationSpeed: number;

  // Text Layers
  textLayers: TextLayer[];
}
