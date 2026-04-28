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
  | "binary"
  | "waving_top"
  | "peaks"
  | "aurora"
  | "arch"
  | "egg"
  | "bloom"
  | "dna"
  | "galaxy"
  | "portal"
  | "gear"
  | "heart";

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
  | "reveal"
  | "bgWave"
  | "pulseScale"
  | "slideReveal";

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
  | "checker"
  | "zigzag"
  | "polka_dot"
  | "mesh"
  | "waves_3d"
  | "pixel";

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
  | "fireflies"
  | "rain"
  | "rockets"
  | "blocks"
  | "programming";

export type OverlayType =
  | "none"
  | "vignette"
  | "scanlines"
  | "grain"
  | "lightLeak"
  | "fog"
  | "noise"
  | "texture"
  | "grid"
  | "glitch"
  | "crt"
  | "duotone"
  | "prism"
  | "vhs"
  | "hologram"
  | "water"
  | "fire"
  | "matrix"
  | "aurora"
  | "lava"
  | "energy"
  | "circuit"
  | "dust"
  | "paper"
  | "canvas"
  | "snow";

export type ShadowType = "none" | "soft" | "hard" | "neon" | "floating" | "inset" | "glow" | "glass" | "3d" | "layered" | "depth";

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
  skewX: number;
  skewY: number;
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
  shadowColor?: string;
  shadowBlur?: number;

  // Animation (global / for shape)
  animationSpeed: number;

  // Text Layers
  textLayers: TextLayer[];

  // Border
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  borderStyle?: "none" | "solid" | "dashed" | "dotted" | "glass" | "gradient" | "marching" | "zigzag" | "double" | "groove" | "ridge" | "neon" | "frame" | "bracket";
  cornerStyle?: "rounded" | "cut" | "beveled";
}
