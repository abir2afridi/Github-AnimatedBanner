import { createDefaultTextLayer, DEFAULT_PARAMS } from "./defaults.js";
import { presetToStops } from "./gradients.js";
import type { BannerParams } from "./types.js";

export interface BannerPreset {
  id: string;
  name: string;
  category:
    | "Featured"
    | "Minimal"
    | "Colorful"
    | "Animated"
    | "Dark"
    | "Retro"
    | "Neon"
    | "Tech"
    | "Holiday"
    | "Luxury"
    | "Nature"
    | "Anime"
    | "Brutalist"
    | "Retro-Wave"
    | "Architectural"
    | "Soft"
    | "Dark Fantasy"
    | "Generic";
  params: BannerParams;
}

function preset(name: string, category: BannerPreset["category"], params: Partial<BannerParams>): BannerPreset {
  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    category,
    params: { ...DEFAULT_PARAMS, ...params },
  };
}

export const GALLERY_PRESETS: BannerPreset[] = [
  // ───────────────────────── Featured ─────────────────────────
  preset("Classic Wave", "Featured", {
    type: "waving",
    colorPreset: "ocean",
    gradientStops: presetToStops("ocean"),
    overlay: "vignette",
    overlayOpacity: 0.3,
    shadow: "glow",
    shadowColor: "rgba(255,255,255,0.2)",
    textLayers: [
      createDefaultTextLayer({ text: "Hello, World", fontFamily: "Poppins", fontSize: 78, fontWeight: 800, animation: "fadeIn", textShadow: true }),
      createDefaultTextLayer({ text: "Welcome to my profile", fontSize: 22, fontWeight: 500, alignY: 75, opacity: 0.9 }),
    ],
  }),
  preset("Mountain Sunset", "Featured", {
    type: "mountain",
    colorPreset: "sunset",
    gradientStops: presetToStops("sunset"),
    overlay: "lightLeak",
    overlayOpacity: 0.2,
    shadow: "floating",
    textLayers: [
      createDefaultTextLayer({ text: "Adventure", fontFamily: "Playfair Display", fontSize: 72, fontWeight: 700, animation: "float", textShadow: true }),
    ],
  }),
  preset("Hexagon Tech", "Featured", {
    type: "hexagon",
    colorPreset: "berry",
    gradientStops: presetToStops("berry"),
    pattern: "hexagon",
    patternOpacity: 0.2,
    overlay: "scanlines",
    overlayOpacity: 0.15,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "TECH", fontFamily: "Rajdhani", fontSize: 90, fontWeight: 700, letterSpacing: 12, animation: "scaleIn" }),
    ],
  }),
  preset("Open Source Hero", "Featured", {
    type: "soft",
    colorPreset: "aurora",
    gradientStops: presetToStops("aurora"),
    pattern: "topography",
    patternOpacity: 0.18,
    textLayers: [
      createDefaultTextLayer({ text: "Open Source", fontFamily: "Inter", fontSize: 72, fontWeight: 800, animation: "fadeIn" }),
      createDefaultTextLayer({ text: "Building in public · ⭐ contributors welcome", fontSize: 20, fontWeight: 500, alignY: 78, opacity: 0.92 }),
    ],
  }),
  preset("Gradient Hero", "Featured", {
    type: "rounded",
    colorPreset: "candy",
    gradientStops: presetToStops("candy"),
    gradientAngle: 135,
    overlay: "vignette",
    overlayOpacity: 0.35,
    textLayers: [
      createDefaultTextLayer({ text: "Build something great", fontFamily: "Poppins", fontSize: 64, fontWeight: 800, animation: "scaleIn", textShadow: true }),
      createDefaultTextLayer({ text: "—  with love  —", fontSize: 18, alignY: 78, opacity: 0.9, letterSpacing: 4 }),
    ],
  }),
  preset("Aurora", "Featured", {
    type: "wave",
    colorPreset: "aurora",
    gradientStops: presetToStops("aurora"),
    particles: "stars",
    particleCount: 50,
    textLayers: [
      createDefaultTextLayer({ text: "Aurora", fontFamily: "Cinzel", fontSize: 78, fontWeight: 700, animation: "fadeIn", gradient: true, gradientColors: ["#ffffff", "#92FE9D"] }),
    ],
  }),
  preset("Glassmorphism", "Featured", {
    type: "soft",
    colorPreset: "morning_mist",
    gradientStops: presetToStops("morning_mist"),
    overlay: "lightLeak",
    overlayOpacity: 0.25,
    textLayers: [
      createDefaultTextLayer({ text: "Crystal Clear", fontFamily: "Outfit", fontSize: 72, fontWeight: 800, fontColor: "#ffffff", animation: "fadeIn" }),
      createDefaultTextLayer({ text: "Clean · Modern · Elegant", fontSize: 20, alignY: 78, opacity: 0.8 }),
    ],
  }),

  // ───────────────────────── Minimal ─────────────────────────
  preset("Minimal Ribbon", "Minimal", {
    type: "ribbon",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    textLayers: [
      createDefaultTextLayer({ text: "minimalist", fontFamily: "Montserrat", fontSize: 56, fontWeight: 300, letterSpacing: 8, animation: "fadeIn" }),
    ],
  }),
  preset("Type Only", "Minimal", {
    type: "rect",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    textLayers: [
      createDefaultTextLayer({ text: "type.", fontFamily: "Playfair Display", fontSize: 110, fontWeight: 900, animation: "reveal", fontStyle: "italic" }),
    ],
  }),
  preset("Brutalist", "Minimal", {
    type: "rect",
    color: "#fafafa",
    gradientStops: [{ color: "#fafafa", position: 0 }, { color: "#e8e8e8", position: 100 }],
    pattern: "grid",
    patternColor: "#000000",
    patternOpacity: 0.12,
    borderStyle: "zigzag",
    borderWidth: 2,
    borderColor: "#000000",
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "BRUTALIST", fontFamily: "Anton", fontSize: 96, fontWeight: 900, fontColor: "#0d0d0d", letterSpacing: -2 }),
    ],
  }),
  preset("Quiet Lines", "Minimal", {
    type: "rect",
    color: "#0e0e10",
    gradientStops: [{ color: "#0e0e10", position: 0 }, { color: "#1a1a1f", position: 100 }],
    pattern: "lines",
    patternColor: "#ffffff",
    patternOpacity: 0.08,
    textLayers: [
      createDefaultTextLayer({ text: "less, but better", fontFamily: "Inter", fontSize: 40, fontWeight: 300, letterSpacing: 6, animation: "fadeIn" }),
    ],
  }),
  preset("Paper White", "Minimal", {
    type: "soft",
    color: "#ffffff",
    gradientStops: [{ color: "#ffffff", position: 0 }, { color: "#f0f0f3", position: 100 }],
    pattern: "noise",
    patternColor: "#000000",
    patternOpacity: 0.05,
    textLayers: [
      createDefaultTextLayer({ text: "Documentation", fontFamily: "Merriweather", fontSize: 56, fontWeight: 700, fontColor: "#111", animation: "fadeIn" }),
      createDefaultTextLayer({ text: "Read the docs →", fontFamily: "Inter", fontSize: 18, fontColor: "#555", alignY: 78 }),
    ],
  }),
  preset("Abstract Flow", "Minimal", {
    type: "blob",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    animationSpeed: 0.5,
    textLayers: [
      createDefaultTextLayer({ text: "flow.", fontFamily: "Playfair Display", fontSize: 88, fontWeight: 900, animation: "float", fontStyle: "italic" }),
    ],
  }),

  // ───────────────────────── Colorful ─────────────────────────
  preset("Snow Forest", "Colorful", {
    type: "mountain",
    colorPreset: "forest",
    gradientStops: presetToStops("forest"),
    particles: "snowflakes",
    particleCount: 60,
    textLayers: [
      createDefaultTextLayer({ text: "Winter", fontFamily: "Playfair Display", fontSize: 72, fontWeight: 700 }),
    ],
  }),
  preset("Confetti Party", "Colorful", {
    type: "rounded",
    colorPreset: "candy",
    gradientStops: presetToStops("candy"),
    particles: "confetti",
    particleCount: 80,
    overlay: "prism",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "Celebrate!", fontFamily: "Pacifico", fontSize: 80, fontWeight: 400, animation: "bounce" }),
    ],
  }),
  preset("Tropical", "Colorful", {
    type: "blob2",
    colorPreset: "mint",
    gradientStops: [
      { color: "#00b09b", position: 0 },
      { color: "#96c93d", position: 50 },
      { color: "#fceabb", position: 100 },
    ],
    particles: "bubbles",
    particleCount: 35,
    overlay: "water",
    overlayOpacity: 0.15,
    textLayers: [
      createDefaultTextLayer({ text: "Tropical", fontFamily: "Pacifico", fontSize: 86, fontWeight: 400, textShadow: true }),
    ],
  }),
  preset("Watermelon", "Colorful", {
    type: "soft",
    gradientStops: [
      { color: "#ff5e62", position: 0 },
      { color: "#ff9966", position: 50 },
      { color: "#a8ff78", position: 100 },
    ],
    gradientAngle: 90,
    particles: "sparkles",
    particleCount: 25,
    textLayers: [
      createDefaultTextLayer({ text: "Watermelon", fontFamily: "Righteous", fontSize: 74, fontWeight: 400, animation: "float" }),
    ],
  }),
  preset("Pastel Dreams", "Colorful", {
    type: "wave2",
    colorPreset: "pastel",
    gradientStops: presetToStops("pastel"),
    textLayers: [
      createDefaultTextLayer({ text: "soft & cozy", fontFamily: "Dancing Script", fontSize: 78, fontWeight: 500, fontColor: "#5a4a78" }),
      createDefaultTextLayer({ text: "designed with care", fontFamily: "Poppins", fontSize: 18, fontColor: "#5a4a78", alignY: 78, opacity: 0.85 }),
    ],
  }),
  preset("Iridescent", "Colorful", {
    type: "blob",
    gradientType: "conic",
    gradientStops: [
      { color: "#ff00ff", position: 0 },
      { color: "#00ffff", position: 33 },
      { color: "#ffff00", position: 66 },
      { color: "#ff00ff", position: 100 },
    ],
    overlay: "lightLeak",
    overlayOpacity: 0.4,
    textLayers: [
      createDefaultTextLayer({ text: "iridescent", fontFamily: "Orbitron", fontSize: 78, fontWeight: 700, animation: "colorShift" }),
    ],
  }),
  preset("Bubblegum", "Colorful", {
    type: "rounded",
    colorPreset: "rose",
    gradientStops: presetToStops("rose"),
    particles: "hearts",
    particleCount: 30,
    textLayers: [
      createDefaultTextLayer({ text: "sweet stuff", fontFamily: "Pacifico", fontSize: 80, fontColor: "#ff4e8e", animation: "pulse" }),
    ],
  }),
  preset("Solar Flare", "Colorful", {
    type: "blob2",
    colorPreset: "sunset_vibes",
    gradientStops: presetToStops("sunset_vibes"),
    particles: "sparkles",
    particleCount: 40,
    overlay: "fire",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "SOLAR", fontFamily: "Righteous", fontSize: 90, fontWeight: 400, animation: "scaleIn", glowEffect: true, glowColor: "#ff512f" }),
    ],
  }),

  // ───────────────────────── Animated ─────────────────────────
  preset("Fire & Ice", "Animated", {
    type: "blob",
    colorPreset: "lava",
    gradientStops: presetToStops("lava"),
    particles: "embers",
    particleCount: 50,
    particleColor: "#ffb86c",
    textLayers: [
      createDefaultTextLayer({ text: "FIRE & ICE", fontFamily: "Anton", fontSize: 90, fontWeight: 900, animation: "glitch", letterSpacing: 4 }),
    ],
  }),
  preset("Circuit Board", "Animated", {
    type: "circuit",
    colorPreset: "toxic",
    gradientStops: presetToStops("toxic"),
    pattern: "circuit",
    patternColor: "#0aff0a",
    patternOpacity: 0.3,
    textLayers: [
      createDefaultTextLayer({ text: "CIRCUIT", fontFamily: "Orbitron", fontSize: 72, fontWeight: 700, animation: "pulse", fontColor: "#0d1117" }),
    ],
  }),
  preset("Ocean Bubbles", "Animated", {
    type: "wave",
    colorPreset: "ocean",
    gradientStops: presetToStops("ocean"),
    particles: "bubbles",
    particleCount: 30,
    overlay: "water",
    overlayOpacity: 0.15,
    textLayers: [
      createDefaultTextLayer({ text: "Dive In", fontFamily: "Poppins", fontSize: 72, fontWeight: 700, animation: "float" }),
    ],
  }),
  preset("Wave Stack", "Animated", {
    type: "wave2",
    colorPreset: "candy",
    gradientStops: presetToStops("candy"),
    animationSpeed: 1.4,
    textLayers: [
      createDefaultTextLayer({ text: "in motion", fontFamily: "Inter", fontSize: 64, fontWeight: 800, animation: "waveText" }),
    ],
  }),
  preset("Glitch Art", "Animated", {
    type: "rect",
    color: "#08080d",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    pattern: "noise",
    patternOpacity: 0.25,
    overlay: "vhs",
    overlayOpacity: 0.35,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "GLITCH://01", fontFamily: "JetBrains Mono", fontSize: 64, fontWeight: 700, animation: "glitch", fontColor: "#ff00aa", letterSpacing: 4 }),
    ],
  }),
  preset("Liquid Motion", "Animated", {
    type: "blob2",
    colorPreset: "berry",
    gradientStops: presetToStops("berry"),
    animationSpeed: 0.8,
    textLayers: [
      createDefaultTextLayer({ text: "Liquid", fontFamily: "Cinzel", fontSize: 92, fontWeight: 700, animation: "ripple", textShadow: true }),
    ],
  }),
  preset("Pulse Beat", "Animated", {
    type: "circle",
    colorPreset: "fire",
    gradientType: "radial",
    gradientStops: presetToStops("fire"),
    textLayers: [
      createDefaultTextLayer({ text: "PULSE", fontFamily: "Orbitron", fontSize: 100, fontWeight: 900, animation: "pulse", letterSpacing: 12 }),
    ],
  }),
  preset("Ocean Depth", "Animated", {
    type: "waving",
    colorPreset: "deepsea",
    gradientStops: presetToStops("deepsea"),
    animationSpeed: 1.2,
    textLayers: [
      createDefaultTextLayer({ text: "ABYSS", fontFamily: "Cinzel", fontSize: 82, fontWeight: 700, animation: "fadeIn", letterSpacing: 14 }),
      createDefaultTextLayer({ text: "exploring the unknown", fontSize: 18, alignY: 78, opacity: 0.7, letterSpacing: 4 }),
    ],
  }),

  // ───────────────────────── Dark ─────────────────────────
  preset("Terminal Hacker", "Dark", {
    type: "terminal",
    color: "#0d1117",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    particles: "matrix",
    particleCount: 60,
    particleColor: "#00ff88",
    overlay: "crt",
    overlayOpacity: 0.4,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "$ whoami", fontFamily: "JetBrains Mono", fontSize: 56, fontColor: "#00ff88", alignY: 55, alignX: 12, fontAlign: "left", animation: "typewriter" }),
      createDefaultTextLayer({ text: "developer", fontFamily: "JetBrains Mono", fontSize: 36, fontColor: "#ffffff", alignY: 80, alignX: 12, fontAlign: "left", opacity: 0.8 }),
    ],
  }),
  preset("Galaxy Core", "Dark", {
    type: "circle",
    colorPreset: "space",
    gradientType: "radial",
    gradientStops: presetToStops("space"),
    particles: "stars",
    particleCount: 100,
    particleColor: "#ffffff",
    textLayers: [
      createDefaultTextLayer({ text: "GALAXY", fontFamily: "Orbitron", fontSize: 80, fontWeight: 900, animation: "twinkling", letterSpacing: 8 }),
    ],
  }),
  preset("Midnight Coder", "Dark", {
    type: "rect",
    colorPreset: "midnight",
    gradientStops: presetToStops("midnight"),
    pattern: "grid",
    patternColor: "#7c3aed",
    patternOpacity: 0.2,
    overlay: "scanlines",
    overlayOpacity: 0.3,
    cornerStyle: "beveled",
    textLayers: [
      createDefaultTextLayer({ text: "midnight.dev", fontFamily: "Fira Code", fontSize: 60, fontWeight: 700, animation: "fadeIn", gradient: true, gradientColors: ["#a78bfa", "#22d3ee"] }),
      createDefaultTextLayer({ text: "// shipping at 3am", fontFamily: "Fira Code", fontSize: 18, alignY: 78, fontColor: "#94a3b8" }),
    ],
  }),
  preset("Black Hole", "Dark", {
    type: "circle",
    gradientType: "radial",
    gradientStops: [
      { color: "#000000", position: 0 },
      { color: "#1a0033", position: 60 },
      { color: "#7928ca", position: 100 },
    ],
    particles: "stars",
    particleCount: 80,
    overlay: "vignette",
    overlayOpacity: 0.7,
    textLayers: [
      createDefaultTextLayer({ text: "EVENT HORIZON", fontFamily: "Orbitron", fontSize: 60, fontWeight: 900, letterSpacing: 6, animation: "fadeIn", glowEffect: true, glowColor: "#a78bfa", glowRadius: 18 }),
    ],
  }),
  preset("Carbon Fiber", "Dark", {
    type: "rect",
    color: "#111111",
    gradientStops: [{ color: "#1a1a1a", position: 0 }, { color: "#0a0a0a", position: 100 }],
    pattern: "diagonal",
    patternColor: "#333333",
    patternOpacity: 0.6,
    patternScale: 0.4,
    textLayers: [
      createDefaultTextLayer({ text: "CARBON", fontFamily: "Rajdhani", fontSize: 90, fontWeight: 700, letterSpacing: 14, fontColor: "#e5e7eb" }),
    ],
  }),
  preset("Obsidian", "Dark", {
    type: "diamond",
    color: "#0a0a0f",
    gradientStops: [{ color: "#0a0a0f", position: 0 }, { color: "#1a1a2e", position: 100 }],
    pattern: "isometric",
    patternColor: "#4f46e5",
    patternOpacity: 0.18,
    textLayers: [
      createDefaultTextLayer({ text: "OBSIDIAN", fontFamily: "Cinzel", fontSize: 72, fontWeight: 700, letterSpacing: 10, gradient: true, gradientColors: ["#c7d2fe", "#818cf8"] }),
    ],
  }),
  preset("Midnight Neon", "Dark", {
    type: "neon",
    color: "#050505",
    gradientStops: [{ color: "#050505", position: 0 }, { color: "#111111", position: 100 }],
    overlay: "vignette",
    overlayOpacity: 0.6,
    textLayers: [
      createDefaultTextLayer({ text: "NIGHT OWL", fontFamily: "Orbitron", fontSize: 64, fontWeight: 900, animation: "neonFlicker", glowEffect: true, glowColor: "#00ffff" }),
    ],
  }),

  // ───────────────────────── Retro ─────────────────────────
  preset("Retro Sun", "Retro", {
    type: "circle",
    colorPreset: "sunset",
    gradientType: "radial",
    gradientStops: presetToStops("sunset"),
    pattern: "lines",
    patternColor: "#ffffff",
    patternOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "SUNSET", fontFamily: "Bebas Neue", fontSize: 100, fontWeight: 700, letterSpacing: 8 }),
    ],
  }),
  preset("Press Start", "Retro", {
    type: "rect",
    color: "#0d1117",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    pattern: "checker",
    patternColor: "#39ff14",
    patternOpacity: 0.1,
    overlay: "crt",
    overlayOpacity: 0.5,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "PRESS START", fontFamily: "Press Start 2P", fontSize: 32, fontColor: "#39ff14", animation: "blink" }),
      createDefaultTextLayer({ text: "to continue", fontFamily: "Press Start 2P", fontSize: 14, fontColor: "#ffffff", alignY: 75, opacity: 0.7 }),
    ],
  }),
  preset("Vaporwave", "Retro", {
    type: "grid",
    gradientStops: [
      { color: "#ff71ce", position: 0 },
      { color: "#b967ff", position: 50 },
      { color: "#01cdfe", position: 100 },
    ],
    gradientAngle: 180,
    pattern: "grid",
    patternColor: "#ffffff",
    patternOpacity: 0.25,
    overlay: "hologram",
    overlayOpacity: 0.3,
    borderStyle: "marching",
    borderWidth: 2,
    borderColor: "#ffffff",
    textLayers: [
      createDefaultTextLayer({ text: "VAPORWAVE", fontFamily: "Orbitron", fontSize: 72, fontWeight: 900, letterSpacing: 6, glowEffect: true, glowColor: "#ff71ce", glowRadius: 16 }),
      createDefaultTextLayer({ text: "ｅｓｔｈｅｔｉｃ", fontFamily: "Space Mono", fontSize: 18, alignY: 78, opacity: 0.85, letterSpacing: 6 }),
    ],
  }),
  preset("Synthwave", "Retro", {
    type: "mountain",
    gradientStops: [
      { color: "#2b1055", position: 0 },
      { color: "#7597de", position: 60 },
      { color: "#ff5e62", position: 100 },
    ],
    gradientAngle: 0,
    pattern: "grid",
    patternColor: "#ff00ff",
    patternOpacity: 0.18,
    overlay: "vhs",
    overlayOpacity: 0.3,
    borderStyle: "neon",
    borderWidth: 2,
    borderColor: "#ff00ff",
    textLayers: [
      createDefaultTextLayer({ text: "SYNTHWAVE", fontFamily: "Orbitron", fontSize: 78, fontWeight: 900, letterSpacing: 8, glowEffect: true, glowColor: "#ff00ff", glowRadius: 14, animation: "neonFlicker" }),
    ],
  }),
  preset("VHS Tape", "Retro", {
    type: "rect",
    color: "#1a0033",
    gradientStops: [{ color: "#1a0033", position: 0 }, { color: "#330066", position: 100 }],
    overlay: "scanlines",
    overlayOpacity: 0.35,
    pattern: "noise",
    patternOpacity: 0.18,
    textLayers: [
      createDefaultTextLayer({ text: "▶ PLAY", fontFamily: "VT323", fontSize: 88, fontColor: "#ff00aa", animation: "blink", letterSpacing: 4 }),
      createDefaultTextLayer({ text: "REC ●  SP  EP-01  04:26:1986", fontFamily: "VT323", fontSize: 22, fontColor: "#ffffff", alignY: 88, alignX: 6, fontAlign: "left", opacity: 0.85 }),
    ],
  }),
  preset("Arcade Cabinet", "Retro", {
    type: "rect",
    color: "#000000",
    gradientStops: [{ color: "#000000", position: 0 }, { color: "#1a0033", position: 100 }],
    pattern: "checker",
    patternColor: "#ff00ff",
    patternOpacity: 0.15,
    patternScale: 0.5,
    textLayers: [
      createDefaultTextLayer({ text: "INSERT COIN", fontFamily: "Press Start 2P", fontSize: 28, fontColor: "#ffea00", animation: "blink", letterSpacing: 2 }),
      createDefaultTextLayer({ text: "HI 999999", fontFamily: "Press Start 2P", fontSize: 14, fontColor: "#00ffff", alignY: 22, opacity: 0.9 }),
    ],
  }),
  preset("8-Bit Adventure", "Retro", {
    type: "rect",
    colorPreset: "gameboy",
    gradientStops: presetToStops("gameboy"),
    pattern: "grid",
    patternOpacity: 0.1,
    textLayers: [
      createDefaultTextLayer({ text: "LEVEL 1-1", fontFamily: "Press Start 2P", fontSize: 32, fontColor: "#0f380f", animation: "slideInLeft" }),
      createDefaultTextLayer({ text: "Press A to Start", fontFamily: "Press Start 2P", fontSize: 14, fontColor: "#306230", alignY: 75 }),
    ],
  }),

  // ───────────────────────── Neon ─────────────────────────
  preset("Cyberpunk Grid", "Neon", {
    type: "grid",
    colorPreset: "cyberpunk",
    gradientStops: presetToStops("cyberpunk"),
    pattern: "circuit",
    patternColor: "#00ffff",
    patternOpacity: 0.25,
    particles: "sparkles",
    particleCount: 40,
    particleColor: "#ff00ff",
    textLayers: [
      createDefaultTextLayer({ text: "CYBERPUNK", fontFamily: "Orbitron", fontSize: 78, fontWeight: 900, animation: "glitch" }),
      createDefaultTextLayer({ text: "// engineer.exe", fontFamily: "JetBrains Mono", fontSize: 22, fontWeight: 500, alignY: 75, opacity: 0.85 }),
    ],
  }),
  preset("Neon Glow", "Neon", {
    type: "neon",
    colorPreset: "neon",
    gradientStops: presetToStops("neon"),
    textLayers: [
      createDefaultTextLayer({ text: "NEON DREAMS", fontFamily: "Orbitron", fontSize: 70, fontWeight: 700, animation: "neonFlicker", glowEffect: true, glowColor: "#ff00ff", glowRadius: 14 }),
    ],
  }),
  preset("Tokyo Night", "Neon", {
    type: "city",
    gradientStops: [
      { color: "#0f1021", position: 0 },
      { color: "#1a1a2e", position: 60 },
      { color: "#7928ca", position: 100 },
    ],
    particles: "fireflies",
    particleCount: 35,
    particleColor: "#fde047",
    textLayers: [
      createDefaultTextLayer({ text: "TOKYO ∗ 東京", fontFamily: "Cinzel", fontSize: 58, fontWeight: 700, animation: "fadeIn", glowEffect: true, glowColor: "#ff3ea5", glowRadius: 10 }),
      createDefaultTextLayer({ text: "neon nights", fontFamily: "JetBrains Mono", fontSize: 18, alignY: 76, opacity: 0.85, letterSpacing: 4 }),
    ],
  }),
  preset("Miami Vice", "Neon", {
    type: "soft",
    gradientStops: [
      { color: "#ff00aa", position: 0 },
      { color: "#7928ca", position: 50 },
      { color: "#00d9ff", position: 100 },
    ],
    gradientAngle: 110,
    overlay: "lightLeak",
    overlayOpacity: 0.35,
    textLayers: [
      createDefaultTextLayer({ text: "MIAMI", fontFamily: "Bebas Neue", fontSize: 110, fontWeight: 700, letterSpacing: 16, glowEffect: true, glowColor: "#ffffff", glowRadius: 10 }),
    ],
  }),
  preset("Laser Show", "Neon", {
    type: "rect",
    color: "#000000",
    gradientStops: [{ color: "#000000", position: 0 }, { color: "#0a0a14", position: 100 }],
    pattern: "diagonal",
    patternColor: "#00ffff",
    patternOpacity: 0.25,
    particles: "sparkles",
    particleCount: 60,
    textLayers: [
      createDefaultTextLayer({ text: "LASER", fontFamily: "Orbitron", fontSize: 96, fontWeight: 900, letterSpacing: 14, glowEffect: true, glowColor: "#00ffff", glowRadius: 18, animation: "pulse" }),
    ],
  }),
  preset("Matrix Overload", "Neon", {
    type: "matrix",
    colorPreset: "cyber_lime",
    gradientStops: presetToStops("cyber_lime"),
    particles: "matrix",
    particleCount: 80,
    particleColor: "#00ff00",
    overlay: "matrix",
    overlayOpacity: 0.3,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "SYSTEM_FAILURE", fontFamily: "JetBrains Mono", fontSize: 54, fontWeight: 800, animation: "glitch", fontColor: "#ffffff" }),
    ],
  }),

  // ───────────────────────── Tech ─────────────────────────
  preset("Frontend Dev", "Tech", {
    type: "rounded",
    gradientStops: [
      { color: "#06b6d4", position: 0 },
      { color: "#3b82f6", position: 50 },
      { color: "#8b5cf6", position: 100 },
    ],
    gradientAngle: 135,
    pattern: "topography",
    patternOpacity: 0.15,
    textLayers: [
      createDefaultTextLayer({ text: "Frontend Engineer", fontFamily: "Inter", fontSize: 62, fontWeight: 800, animation: "fadeIn" }),
      createDefaultTextLayer({ text: "React · TypeScript · Tailwind", fontFamily: "JetBrains Mono", fontSize: 20, alignY: 78, opacity: 0.92 }),
    ],
  }),
  preset("Backend Engineer", "Tech", {
    type: "terminal",
    color: "#0a0e1a",
    gradientStops: [{ color: "#0a0e1a", position: 0 }, { color: "#0f172a", position: 100 }],
    pattern: "grid",
    patternColor: "#22d3ee",
    patternOpacity: 0.1,
    overlay: "crt",
    overlayOpacity: 0.3,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "$ ./deploy --prod", fontFamily: "JetBrains Mono", fontSize: 44, fontColor: "#22d3ee", alignY: 50, alignX: 8, fontAlign: "left", animation: "typewriter" }),
      createDefaultTextLayer({ text: "✓ 0 errors · 200ms p99 · ∞ uptime", fontFamily: "JetBrains Mono", fontSize: 20, fontColor: "#86efac", alignY: 78, alignX: 8, fontAlign: "left", opacity: 0.9 }),
    ],
  }),
  preset("AI / ML", "Tech", {
    type: "circle",
    gradientType: "radial",
    gradientStops: [
      { color: "#0a0a0f", position: 0 },
      { color: "#1e1b4b", position: 60 },
      { color: "#7c3aed", position: 100 },
    ],
    particles: "fireflies",
    particleCount: 50,
    particleColor: "#a5b4fc",
    overlay: "hologram",
    overlayOpacity: 0.25,
    shadow: "glow",
    shadowColor: "#7c3aed",
    textLayers: [
      createDefaultTextLayer({ text: "machine learning", fontFamily: "Inter", fontSize: 56, fontWeight: 700, animation: "fadeIn", gradient: true, gradientColors: ["#a5b4fc", "#f0abfc"] }),
      createDefaultTextLayer({ text: "models · pipelines · inference", fontFamily: "JetBrains Mono", fontSize: 18, alignY: 78, opacity: 0.8, letterSpacing: 2 }),
    ],
  }),
  preset("DevOps", "Tech", {
    type: "hexagon",
    gradientStops: [
      { color: "#0f172a", position: 0 },
      { color: "#1e3a8a", position: 100 },
    ],
    pattern: "hexagon",
    patternColor: "#60a5fa",
    patternOpacity: 0.18,
    textLayers: [
      createDefaultTextLayer({ text: "DevOps", fontFamily: "Rajdhani", fontSize: 78, fontWeight: 700, letterSpacing: 4 }),
      createDefaultTextLayer({ text: "K8s · Terraform · CI/CD · Observability", fontFamily: "JetBrains Mono", fontSize: 18, alignY: 78, opacity: 0.88 }),
    ],
  }),
  preset("Web3", "Tech", {
    type: "diamond",
    gradientStops: [
      { color: "#0f0f23", position: 0 },
      { color: "#3b0764", position: 50 },
      { color: "#f59e0b", position: 100 },
    ],
    gradientAngle: 135,
    pattern: "isometric",
    patternColor: "#fcd34d",
    patternOpacity: 0.15,
    textLayers: [
      createDefaultTextLayer({ text: "WEB3", fontFamily: "Orbitron", fontSize: 96, fontWeight: 900, letterSpacing: 12, gradient: true, gradientColors: ["#fcd34d", "#f59e0b"] }),
    ],
  }),
  preset("Cloud Native", "Tech", {
    type: "soft",
    gradientStops: [
      { color: "#ffffff", position: 0 },
      { color: "#dbeafe", position: 100 },
    ],
    particles: "bubbles",
    particleCount: 25,
    particleColor: "#60a5fa",
    particleOpacity: 0.6,
    borderStyle: "glass",
    borderWidth: 2,
    borderRadius: 20,
    textLayers: [
      createDefaultTextLayer({ text: "Cloud Native", fontFamily: "Inter", fontSize: 64, fontWeight: 800, fontColor: "#1e3a8a", animation: "float" }),
      createDefaultTextLayer({ text: "scalable · observable · resilient", fontFamily: "Inter", fontSize: 18, fontColor: "#1e3a8a", alignY: 78, opacity: 0.7 }),
    ],
  }),
  preset("Deep Learning", "Tech", {
    type: "circle",
    colorPreset: "deepsea",
    gradientType: "radial",
    gradientStops: presetToStops("deepsea"),
    pattern: "circuit",
    patternOpacity: 0.15,
    textLayers: [
      createDefaultTextLayer({ text: "Neural Network", fontFamily: "Rajdhani", fontSize: 72, fontWeight: 700, animation: "pulse" }),
      createDefaultTextLayer({ text: "TensorFlow · PyTorch · Keras", fontFamily: "JetBrains Mono", fontSize: 18, alignY: 78, opacity: 0.8 }),
    ],
  }),

  // ───────────────────────── Holiday ─────────────────────────
  preset("Halloween", "Holiday", {
    type: "blob",
    gradientStops: [
      { color: "#0a0a0a", position: 0 },
      { color: "#1a0033", position: 50 },
      { color: "#ff6a00", position: 100 },
    ],
    gradientAngle: 0,
    particles: "sparkles",
    particleCount: 40,
    particleColor: "#ffa500",
    overlay: "fire",
    overlayOpacity: 0.2,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "Spooky Season", fontFamily: "Creepster", fontSize: 84, fontColor: "#ffa500", animation: "neonFlicker", glowEffect: true, glowColor: "#ff6a00", glowRadius: 14 }),
    ],
  }),
  preset("Christmas Magic", "Holiday", {
    type: "mountain",
    gradientStops: [
      { color: "#064e3b", position: 0 },
      { color: "#065f46", position: 100 },
    ],
    particles: "snowflakes",
    particleCount: 60,
    particleColor: "#ffffff",
    overlay: "lightLeak",
    overlayOpacity: 0.2,
    borderStyle: "double",
    borderWidth: 6,
    borderColor: "#ef4444",
    textLayers: [
      createDefaultTextLayer({ text: "Merry Christmas", fontFamily: "Mountains of Christmas", fontSize: 72, fontColor: "#ffffff", animation: "float" }),
    ],
  }),
  preset("New Year Eve", "Holiday", {
    type: "galaxy",
    colorPreset: "midnight",
    particles: "sparkles",
    particleCount: 150,
    particleColor: "#fbbf24",
    overlay: "prism",
    overlayOpacity: 0.4,
    textLayers: [
      createDefaultTextLayer({ text: "HAPPY 2025", fontFamily: "Orbitron", fontSize: 90, fontWeight: 900, fontColor: "#ffffff", animation: "pulseScale", glowEffect: true, glowColor: "#fbbf24" }),
    ],
  }),
  preset("Ramadan Spirit", "Holiday", {
    type: "circle",
    gradientStops: [
      { color: "#0f172a", position: 0 },
      { color: "#1e1b4b", position: 100 },
    ],
    particles: "stars",
    particleCount: 80,
    overlay: "hologram",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "Ramadan Mubarak", fontFamily: "Cinzel", fontSize: 64, fontColor: "#fbbf24", animation: "fadeIn" }),
    ],
  }),
  preset("Christmas", "Holiday", {
    type: "mountain",
    gradientStops: [
      { color: "#0b3d2e", position: 0 },
      { color: "#1a5d3a", position: 60 },
      { color: "#dc2626", position: 100 },
    ],
    particles: "snowflakes",
    particleCount: 80,
    particleColor: "#ffffff",
    textLayers: [
      createDefaultTextLayer({ text: "Merry Christmas", fontFamily: "Dancing Script", fontSize: 76, fontColor: "#ffffff", animation: "fadeIn", textShadow: true }),
    ],
  }),
  preset("Valentine", "Holiday", {
    type: "soft",
    gradientStops: [
      { color: "#ffe5ec", position: 0 },
      { color: "#ffb3c1", position: 50 },
      { color: "#ff4d6d", position: 100 },
    ],
    gradientAngle: 135,
    particles: "hearts",
    particleCount: 35,
    particleColor: "#c9184a",
    textLayers: [
      createDefaultTextLayer({ text: "be mine", fontFamily: "Pacifico", fontSize: 88, fontColor: "#9d0208", animation: "pulse" }),
    ],
  }),
  preset("New Year", "Holiday", {
    type: "rect",
    gradientStops: [
      { color: "#000000", position: 0 },
      { color: "#1a1a2e", position: 100 },
    ],
    particles: "confetti",
    particleCount: 80,
    overlay: "lightLeak",
    overlayOpacity: 0.3,
    textLayers: [
      createDefaultTextLayer({ text: "Happy New Year", fontFamily: "Cinzel", fontSize: 64, fontWeight: 700, gradient: true, gradientColors: ["#fde047", "#facc15", "#eab308"], animation: "scaleIn" }),
      createDefaultTextLayer({ text: "✦  cheers to what's next  ✦", fontFamily: "Inter", fontSize: 20, alignY: 78, opacity: 0.85, letterSpacing: 4 }),
    ],
  }),
  preset("Eid Mubarak", "Holiday", {
    type: "circle",
    colorPreset: "deepsea",
    gradientStops: [
      { color: "#064e3b", position: 0 },
      { color: "#065f46", position: 100 },
    ],
    particles: "stars",
    particleCount: 60,
    overlay: "lightLeak",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "Eid Mubarak", fontFamily: "Cinzel", fontSize: 72, fontWeight: 700, fontColor: "#fcd34d", animation: "fadeIn" }),
    ],
  }),
  preset("Diwali", "Holiday", {
    type: "bloom",
    colorPreset: "sunset",
    particles: "sparkles",
    particleCount: 100,
    particleColor: "#fbbf24",
    textLayers: [
      createDefaultTextLayer({ text: "Happy Diwali", fontFamily: "Playfair Display", fontSize: 72, fontWeight: 800, fontColor: "#ffffff", animation: "pulseScale" }),
    ],
  }),
  preset("Lunar New Year", "Holiday", {
    type: "rect",
    color: "#b91c1c",
    gradientStops: [
      { color: "#b91c1c", position: 0 },
      { color: "#7f1d1d", position: 100 },
    ],
    pattern: "grid",
    patternColor: "#facc15",
    patternOpacity: 0.1,
    textLayers: [
      createDefaultTextLayer({ text: "恭喜发财", fontFamily: "Noto Sans SC", fontSize: 80, fontWeight: 900, fontColor: "#facc15", animation: "fadeIn" }),
      createDefaultTextLayer({ text: "LUNAR NEW YEAR", fontFamily: "Inter", fontSize: 20, fontColor: "#facc15", alignY: 78, letterSpacing: 4 }),
    ],
  }),

  // ───────────────────────── Generic (Static) ─────────────────────────
  preset("Modern Studio", "Generic", {
    type: "soft",
    colorPreset: "morning_mist",
    overlay: "grain",
    overlayOpacity: 0.15,
    cornerStyle: "beveled",
    borderStyle: "double",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    textLayers: [
      createDefaultTextLayer({ text: "CREATIVE STUDIO", fontFamily: "Syncopate", fontSize: 56, fontWeight: 700, fontColor: "#1a1a1a", letterSpacing: 10, animation: "none" }),
      createDefaultTextLayer({ text: "DESIGN · CODE · INNOVATE", fontFamily: "Inter", fontSize: 14, alignY: 72, opacity: 0.6, letterSpacing: 6, animation: "none" }),
    ],
  }),
  preset("Midnight Slate", "Generic", {
    type: "rect",
    gradientStops: [
      { color: "#0f172a", position: 0 },
      { color: "#1e293b", position: 100 },
    ],
    pattern: "grid",
    patternOpacity: 0.1,
    overlay: "grain",
    overlayOpacity: 0.2,
    borderStyle: "glass",
    borderWidth: 2,
    textLayers: [
      createDefaultTextLayer({ text: "John Doe", fontFamily: "Outfit", fontSize: 72, fontWeight: 700, fontColor: "#f8fafc", animation: "none" }),
      createDefaultTextLayer({ text: "Fullstack Developer / UI Designer", fontFamily: "JetBrains Mono", fontSize: 18, alignY: 75, fontColor: "#94a3b8", animation: "none" }),
    ],
  }),
  preset("Sunset Horizon", "Generic", {
    type: "wave",
    colorPreset: "sunset_vibes",
    animationSpeed: 0,
    overlay: "lightLeak",
    overlayOpacity: 0.3,
    shadow: "floating",
    textLayers: [
      createDefaultTextLayer({ text: "Build with Passion", fontFamily: "Playfair Display", fontSize: 68, fontWeight: 700, fontColor: "#ffffff", fontStyle: "italic", animation: "none" }),
    ],
  }),
  preset("Cyber Static", "Generic", {
    type: "circle",
    colorPreset: "cyber_lime",
    pattern: "circuit",
    patternOpacity: 0.2,
    overlay: "hologram",
    overlayOpacity: 0.3,
    cornerStyle: "cut",
    borderStyle: "neon",
    borderWidth: 2,
    textLayers: [
      createDefaultTextLayer({ text: "SYSTEM_CORE", fontFamily: "Share Tech Mono", fontSize: 80, fontColor: "#3f6212", animation: "none" }),
      createDefaultTextLayer({ text: "RELIABILITY THROUGH DESIGN", fontFamily: "Inter", fontSize: 16, alignY: 80, fontColor: "#3f6212", fontWeight: 600, animation: "none" }),
    ],
  }),
  preset("Clean Alpine", "Generic", {
    type: "mountain",
    gradientStops: [
      { color: "#f1f5f9", position: 0 },
      { color: "#cbd5e1", position: 100 },
    ],
    particles: "snowflakes",
    particleCount: 20,
    particleColor: "#ffffff",
    overlay: "vignette",
    overlayOpacity: 0.3,
    cornerStyle: "beveled",
    textLayers: [
      createDefaultTextLayer({ text: "MINIMALISM", fontFamily: "Syncopate", fontSize: 60, fontWeight: 700, fontColor: "#334155", letterSpacing: 12, animation: "none" }),
    ],
  }),
  preset("Ocean Stillness", "Generic", {
    type: "blob",
    colorPreset: "deepsea",
    overlay: "water",
    overlayOpacity: 0.3,
    cornerStyle: "beveled",
    shadow: "glass",
    textLayers: [
      createDefaultTextLayer({ text: "Deep Focus", fontFamily: "Outfit", fontSize: 72, fontWeight: 800, fontColor: "#ffffff", animation: "none" }),
      createDefaultTextLayer({ text: "The art of solving complex problems", fontFamily: "Inter", fontSize: 18, alignY: 76, opacity: 0.8, animation: "none" }),
    ],
  }),
  preset("Retro Static", "Generic", {
    type: "wave",
    colorPreset: "gameboy",
    animationSpeed: 0,
    overlay: "scanlines",
    overlayOpacity: 0.4,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "GAME OVER", fontFamily: "Press Start 2P", fontSize: 48, fontColor: "#0f380f", animation: "none" }),
      createDefaultTextLayer({ text: "THANK YOU FOR PLAYING", fontFamily: "Press Start 2P", fontSize: 12, alignY: 75, fontColor: "#306230", animation: "none" }),
    ],
  }),
  preset("Golden Era", "Generic", {
    type: "rect",
    gradientStops: [
      { color: "#1c1917", position: 0 },
      { color: "#44403c", position: 100 },
    ],
    overlay: "lightLeak",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "EXCELLENCE", fontFamily: "Cinzel", fontSize: 72, fontWeight: 700, gradient: true, gradientColors: ["#d97706", "#f59e0b", "#fbbf24"], animation: "none" }),
      createDefaultTextLayer({ text: "SINCE 2024", fontFamily: "Inter", fontSize: 14, alignY: 78, fontColor: "#fbbf24", letterSpacing: 8, fontWeight: 600, animation: "none" }),
    ],
  }),
  // ───────────────────────── New Creative ─────────────────────────
  preset("Galactic Orbit", "Animated", {
    type: "galaxy",
    colorPreset: "space",
    gradientStops: presetToStops("space"),
    particles: "stars",
    particleCount: 120,
    animationSpeed: 0.5,
    overlay: "prism",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "EXPLORE", fontFamily: "Orbitron", fontSize: 80, fontWeight: 900, animation: "rotate", letterSpacing: 10 }),
    ],
  }),
  preset("Rainy Code", "Animated", {
    type: "waving_top",
    colorPreset: "midnight",
    gradientStops: presetToStops("midnight"),
    particles: "rain",
    particleCount: 100,
    particleColor: "#ffffff",
    particleOpacity: 0.4,
    overlay: "crt",
    overlayOpacity: 0.3,
    textLayers: [
      createDefaultTextLayer({ text: "coding in the rain", fontFamily: "JetBrains Mono", fontSize: 50, fontWeight: 500, animation: "typewriter" }),
    ],
  }),
  preset("DNA Synthesis", "Tech", {
    type: "dna",
    colorPreset: "toxic",
    gradientStops: presetToStops("toxic"),
    pattern: "zigzag",
    patternOpacity: 0.1,
    overlay: "hologram",
    overlayOpacity: 0.3,
    shadow: "glow",
    shadowColor: "#39ff14",
    textLayers: [
      createDefaultTextLayer({ text: "SYNTHETIC", fontFamily: "Rajdhani", fontSize: 84, fontWeight: 700, animation: "pulseScale" }),
    ],
  }),
  preset("Aurora Peaks", "Featured", {
    type: "aurora",
    colorPreset: "aurora",
    gradientStops: presetToStops("aurora"),
    animationSpeed: 1.5,
    overlay: "prism",
    overlayOpacity: 0.2,
    cornerStyle: "beveled",
    textLayers: [
      createDefaultTextLayer({ text: "AURORA", fontFamily: "Cinzel", fontSize: 90, fontWeight: 700, animation: "bgWave" }),
    ],
  }),
  preset("Cyber Bloom", "Colorful", {
    type: "bloom",
    colorPreset: "neon",
    gradientStops: presetToStops("neon"),
    particles: "fireflies",
    particleCount: 40,
    overlay: "hologram",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "BLOOM", fontFamily: "Righteous", fontSize: 88, animation: "pulseScale" }),
    ],
  }),
  preset("Mountain Peaks", "Minimal", {
    type: "peaks",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    pattern: "zigzag",
    patternOpacity: 0.15,
    overlay: "grain",
    overlayOpacity: 0.2,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "HIGHER", fontFamily: "Inter", fontSize: 72, fontWeight: 900, animation: "slideReveal" }),
    ],
  }),
  preset("Glass Portal", "Featured", {
    type: "portal",
    colorPreset: "deepsea",
    gradientStops: presetToStops("deepsea"),
    overlay: "noise",
    overlayOpacity: 0.15,
    borderStyle: "glass",
    borderWidth: 4,
    borderRadius: 24,
    textLayers: [
      createDefaultTextLayer({ text: "ENTER", fontFamily: "Orbitron", fontSize: 80, fontWeight: 800, animation: "scaleIn" }),
    ],
  }),
  preset("Mechanical Dev", "Tech", {
    type: "gear",
    colorPreset: "monochrome",
    gradientStops: presetToStops("monochrome"),
    pattern: "grid",
    patternOpacity: 0.2,
    particles: "programming",
    particleCount: 50,
    overlay: "grain",
    overlayOpacity: 0.2,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#ffffff",
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "ENGINEER", fontFamily: "JetBrains Mono", fontSize: 72, fontWeight: 800, animation: "slideReveal" }),
    ],
  }),
  preset("Retro Polka", "Retro", {
    type: "heart",
    colorPreset: "rose",
    gradientStops: presetToStops("rose"),
    pattern: "polka_dot",
    patternOpacity: 0.3,
    overlay: "vignette",
    overlayOpacity: 0.5,
    borderRadius: 50,
    textLayers: [
      createDefaultTextLayer({ text: "LOVE", fontFamily: "Lobster", fontSize: 96, animation: "pulseScale" }),
    ],
  }),

  // ───────────────────────── Advanced Effects ─────────────────────────
  preset("CRT Terminal", "Retro", {
    type: "terminal",
    color: "#050505",
    overlay: "crt",
    overlayOpacity: 0.6,
    textLayers: [
      createDefaultTextLayer({ text: "> SYSTEM READY", fontFamily: "VT323", fontSize: 64, fontColor: "#00ff41", animation: "typewriter" }),
      createDefaultTextLayer({ text: "LOGGED AS: ADMIN", fontFamily: "VT323", fontSize: 24, fontColor: "#00ff41", alignY: 75, opacity: 0.8 }),
    ],
  }),
  preset("VHS Memories", "Retro", {
    type: "rect",
    colorPreset: "midnight",
    gradientStops: presetToStops("midnight"),
    overlay: "vhs",
    overlayOpacity: 0.7,
    textLayers: [
      createDefaultTextLayer({ text: "PLAY 1994", fontFamily: "Fira Code", fontSize: 56, fontColor: "#ffffff", animation: "glitch" }),
    ],
  }),
  preset("Matrix Rain", "Neon", {
    type: "matrix",
    colorPreset: "cyber_lime",
    gradientStops: presetToStops("cyber_lime"),
    overlay: "matrix",
    overlayOpacity: 0.5,
    particles: "matrix",
    particleCount: 100,
    textLayers: [
      createDefaultTextLayer({ text: "DECODE", fontFamily: "JetBrains Mono", fontSize: 80, fontWeight: 800, fontColor: "#ffffff", animation: "fadeIn" }),
    ],
  }),
  preset("Holo Interface", "Tech", {
    type: "hexagon",
    colorPreset: "deepsea",
    gradientStops: presetToStops("deepsea"),
    overlay: "hologram",
    overlayOpacity: 0.4,
    shadow: "glow",
    shadowColor: "#00d9ff",
    textLayers: [
      createDefaultTextLayer({ text: "INTERFACE", fontFamily: "Orbitron", fontSize: 72, fontWeight: 700, animation: "pulse" }),
    ],
  }),
  preset("Prism Spectrum", "Colorful", {
    type: "soft",
    colorPreset: "aurora",
    gradientStops: presetToStops("aurora"),
    overlay: "prism",
    overlayOpacity: 0.3,
    textLayers: [
      createDefaultTextLayer({ text: "SPECTRUM", fontFamily: "Cinzel", fontSize: 90, fontWeight: 700, animation: "fadeIn" }),
    ],
  }),
  preset("Water Flow", "Featured", {
    type: "wave",
    colorPreset: "ocean",
    gradientStops: presetToStops("ocean"),
    overlay: "water",
    overlayOpacity: 0.25,
    textLayers: [
      createDefaultTextLayer({ text: "LIQUID", fontFamily: "Poppins", fontSize: 84, fontWeight: 800, animation: "float" }),
    ],
  }),
  preset("Fire Soul", "Colorful", {
    type: "blob",
    colorPreset: "lava",
    gradientStops: presetToStops("lava"),
    overlay: "fire",
    overlayOpacity: 0.35,
    particles: "embers",
    particleCount: 60,
    textLayers: [
      createDefaultTextLayer({ text: "IGNITE", fontFamily: "Anton", fontSize: 100, fontColor: "#ffffff", animation: "pulseScale" }),
    ],
  }),
  preset("Neon March", "Neon", {
    type: "rect",
    color: "#0a0a0a",
    borderStyle: "marching",
    borderWidth: 6,
    borderColor: "#ff00ff",
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "MARCHING", fontFamily: "Orbitron", fontSize: 64, fontWeight: 900, animation: "none" }),
    ],
  }),
  preset("Brutalist Zigzag", "Minimal", {
    type: "rect",
    color: "#ffffff",
    borderStyle: "zigzag",
    borderWidth: 4,
    borderColor: "#000000",
    cornerStyle: "beveled",
    textLayers: [
      createDefaultTextLayer({ text: "ZIGZAG", fontFamily: "Anton", fontSize: 96, fontColor: "#000000" }),
    ],
  }),
  preset("Deep 3D", "Featured", {
    type: "rounded",
    colorPreset: "sunset",
    gradientStops: presetToStops("sunset"),
    shadow: "3d",
    shadowBlur: 20,
    textLayers: [
      createDefaultTextLayer({ text: "DEPTH", fontFamily: "Righteous", fontSize: 110, animation: "scaleIn" }),
    ],
  }),
  preset("Floating Glass", "Featured", {
    type: "soft",
    colorPreset: "morning_mist",
    gradientStops: presetToStops("morning_mist"),
    shadow: "glass",
    borderStyle: "double",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    textLayers: [
      createDefaultTextLayer({ text: "CRYSTAL", fontFamily: "Outfit", fontSize: 80, fontWeight: 600, animation: "fadeIn" }),
    ],
  }),
  preset("Cyber Duo", "Minimal", {
    type: "rect",
    colorPreset: "berry",
    overlay: "duotone",
    overlayOpacity: 1,
    textLayers: [
      createDefaultTextLayer({ text: "DUOTONE", fontFamily: "Inter", fontSize: 72, fontWeight: 900, animation: "slideReveal" }),
    ],
  }),
  preset("Holo Bio", "Tech", {
    type: "portal",
    colorPreset: "midnight",
    overlay: "hologram",
    overlayOpacity: 0.5,
    pattern: "grid",
    patternOpacity: 0.1,
    textLayers: [
      createDefaultTextLayer({ text: "ACCESS GRANTED", fontFamily: "JetBrains Mono", fontSize: 48, fontColor: "#00d9ff", animation: "fadeIn" }),
    ],
  }),
  preset("Golden Ridge", "Generic", {
    type: "rect",
    colorPreset: "sunset_vibes",
    borderStyle: "ridge",
    borderWidth: 10,
    borderColor: "#fbbf24",
    cornerStyle: "beveled",
    textLayers: [
      createDefaultTextLayer({ text: "PREMIUM", fontFamily: "Cinzel", fontSize: 72, fontWeight: 700, fontColor: "#ffffff" }),
    ],
  }),
  preset("Acid Rain", "Neon", {
    type: "matrix",
    colorPreset: "toxic",
    overlay: "matrix",
    overlayOpacity: 0.4,
    particles: "rain",
    particleCount: 80,
    particleColor: "#39ff14",
    textLayers: [
      createDefaultTextLayer({ text: "ACID", fontFamily: "Orbitron", fontSize: 110, fontWeight: 900, animation: "glitch" }),
    ],
  }),
  preset("Level Up", "Retro", {
    type: "rect",
    color: "#111111",
    pattern: "pixel",
    patternOpacity: 0.2,
    overlay: "scanlines",
    overlayOpacity: 0.5,
    borderStyle: "double",
    borderWidth: 4,
    borderColor: "#3b82f6",
    textLayers: [
      createDefaultTextLayer({ text: "PLAYER ONE", fontFamily: "Press Start 2P", fontSize: 32, fontColor: "#ffffff", animation: "blink" }),
      createDefaultTextLayer({ text: "INSERT COIN TO CONTINUE", fontFamily: "Press Start 2P", fontSize: 10, alignY: 78, fontColor: "#60a5fa" }),
    ],
  }),
  preset("Stealth Ops", "Tech", {
    type: "terminal",
    color: "#050505",
    overlay: "crt",
    overlayOpacity: 0.4,
    pattern: "grid",
    patternOpacity: 0.1,
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "CONNECTED // ENCRYPTED", fontFamily: "JetBrains Mono", fontSize: 36, fontColor: "#10b981", animation: "typewriter" }),
      createDefaultTextLayer({ text: "ID: AGENT_47 · LOC: UNKNOWN", fontFamily: "JetBrains Mono", fontSize: 14, alignY: 75, fontColor: "#059669", opacity: 0.8 }),
    ],
  }),
  preset("Midnight Jungle", "Featured", {
    type: "blob",
    gradientStops: [
      { color: "#064e3b", position: 0 },
      { color: "#022c22", position: 100 },
    ],
    particles: "fireflies",
    particleCount: 40,
    overlay: "fog",
    overlayOpacity: 0.3,
    shadow: "glow",
    shadowColor: "#10b981",
    textLayers: [
      createDefaultTextLayer({ text: "THE WILD", fontFamily: "Playfair Display", fontSize: 80, fontWeight: 800, fontColor: "#ffffff", animation: "float" }),
    ],
  }),
  preset("Volcanic Ash", "Colorful", {
    type: "peaks",
    gradientStops: [
      { color: "#1c1917", position: 0 },
      { color: "#78350f", position: 100 },
    ],
    particles: "embers",
    particleCount: 80,
    overlay: "fire",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "ERUPTION", fontFamily: "Anton", fontSize: 110, fontColor: "#ef4444", animation: "pulseScale" }),
    ],
  }),
  preset("Neon Samurai", "Neon", {
    type: "rect",
    color: "#0a0a0a",
    overlay: "vhs",
    overlayOpacity: 0.3,
    borderStyle: "neon",
    borderWidth: 4,
    borderColor: "#ff0055",
    cornerStyle: "cut",
    textLayers: [
      createDefaultTextLayer({ text: "RONIN", fontFamily: "Kawkab Mono", fontSize: 96, fontWeight: 900, fontColor: "#ff0055", animation: "glitch" }),
    ],
  }),
  preset("Kawaii Pastel", "Colorful", {
    type: "soft",
    colorPreset: "pastel",
    particles: "hearts",
    particleCount: 30,
    overlay: "lightLeak",
    overlayOpacity: 0.3,
    borderRadius: 30,
    textLayers: [
      createDefaultTextLayer({ text: "sweet vibes", fontFamily: "Quicksand", fontSize: 72, fontWeight: 700, fontColor: "#ffffff", animation: "bounce" }),
    ],
  }),
  preset("Grid Master", "Minimal", {
    type: "rect",
    color: "#ffffff",
    pattern: "grid",
    patternColor: "#e5e7eb",
    patternOpacity: 1,
    borderStyle: "solid",
    borderWidth: 8,
    borderColor: "#000000",
    textLayers: [
      createDefaultTextLayer({ text: "BRUTAL", fontFamily: "Syncopate", fontSize: 80, fontWeight: 900, fontColor: "#000000", letterSpacing: -5 }),
      createDefaultTextLayer({ text: "DESIGN SYSTEM", fontFamily: "Inter", fontSize: 12, alignY: 78, fontColor: "#000000", letterSpacing: 10 }),
    ],
  }),
  preset("Data Scientist", "Tech", {
    type: "wave",
    colorPreset: "deepsea",
    pattern: "topography",
    patternOpacity: 0.1,
    overlay: "grain",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "DATA VIZ", fontFamily: "Outfit", fontSize: 72, fontWeight: 800, fontColor: "#ffffff", animation: "none" }),
      createDefaultTextLayer({ text: "insights · analysis · prediction", fontFamily: "JetBrains Mono", fontSize: 16, alignY: 76, opacity: 0.8 }),
    ],
  }),
  preset("Executive Brief", "Generic", {
    type: "rect",
    gradientStops: [
      { color: "#1e293b", position: 0 },
      { color: "#0f172a", position: 100 },
    ],
    borderStyle: "glass",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    textLayers: [
      createDefaultTextLayer({ text: "STRATEGY", fontFamily: "Cinzel", fontSize: 64, fontWeight: 700, fontColor: "#ffffff", letterSpacing: 15 }),
      createDefaultTextLayer({ text: "CONSULTING · ADVISORY", fontFamily: "Inter", fontSize: 12, alignY: 78, opacity: 0.5, letterSpacing: 8 }),
    ],
  }),
  preset("Sketchbook", "Minimal", {
    type: "rect",
    color: "#fef3c7",
    pattern: "dots",
    patternColor: "#d1d5db",
    patternOpacity: 0.5,
    overlay: "grain",
    overlayOpacity: 0.2,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#4b5563",
    textLayers: [
      createDefaultTextLayer({ text: "DRAFTS & IDEAS", fontFamily: "Indie Flower", fontSize: 64, fontColor: "#374151", animation: "none" }),
    ],
  }),
  preset("Zen Garden", "Minimal", {
    type: "wave",
    gradientStops: [
      { color: "#f8fafc", position: 0 },
      { color: "#f1f5f9", position: 100 },
    ],
    particles: "fireflies",
    particleCount: 15,
    particleColor: "#94a3b8",
    overlay: "fog",
    overlayOpacity: 0.1,
    textLayers: [
      createDefaultTextLayer({ text: "INNER PEACE", fontFamily: "Cinzel", fontSize: 56, fontColor: "#475569", letterSpacing: 10 }),
    ],
  }),
  preset("Pixel Quest", "Retro", {
    type: "rect",
    color: "#000000",
    particles: "blocks",
    particleCount: 40,
    overlay: "crt",
    overlayOpacity: 0.4,
    textLayers: [
      createDefaultTextLayer({ text: "QUEST START", fontFamily: "Press Start 2P", fontSize: 32, fontColor: "#fbbf24", animation: "bounce" }),
    ],
  }),
  preset("Neon Velocity", "Neon", {
    type: "rect",
    color: "#050505",
    pattern: "lines",
    patternColor: "#00f2ff",
    patternOpacity: 0.2,
    overlay: "vhs",
    overlayOpacity: 0.3,
    borderStyle: "marching",
    borderWidth: 2,
    borderColor: "#00f2ff",
    textLayers: [
      createDefaultTextLayer({ text: "FAST_CODE", fontFamily: "Orbitron", fontSize: 72, fontWeight: 900, fontColor: "#00f2ff", animation: "glitch" }),
    ],
  }),
  preset("Liquid Art", "Colorful", {
    type: "blob",
    colorPreset: "aurora",
    overlay: "water",
    overlayOpacity: 0.4,
    shadow: "glass",
    textLayers: [
      createDefaultTextLayer({ text: "FLOW", fontFamily: "Righteous", fontSize: 100, animation: "float" }),
    ],
  }),
  preset("Golden Hour", "Luxury", {
    type: "rect",
    gradientStops: [
      { color: "#1a1a1a", position: 0 },
      { color: "#2d1f00", position: 100 },
    ],
    overlay: "prism",
    overlayOpacity: 0.3,
    borderStyle: "double",
    borderWidth: 3,
    borderColor: "#d4af37",
    shadow: "depth",
    textLayers: [
      createDefaultTextLayer({ text: "PREMIUM", fontFamily: "Cinzel", fontSize: 80, fontColor: "#d4af37", letterSpacing: 20 }),
    ],
  }),
  preset("Cyber HUD", "Tech", {
    type: "grid",
    color: "#000b1a",
    overlay: "crt",
    overlayOpacity: 0.3,
    borderStyle: "neon",
    borderColor: "#00d4ff",
    textLayers: [
      createDefaultTextLayer({ text: "[ SYSTEM_ACTIVE ]", fontFamily: "Orbitron", fontSize: 32, fontColor: "#00d4ff", alignY: 35 }),
      createDefaultTextLayer({ text: "ENCRYPTED_FLOW", fontFamily: "Orbitron", fontSize: 64, fontWeight: 900, fontColor: "#ffffff", animation: "glitch" }),
    ],
  }),
  preset("Midnight Forest", "Nature", {
    type: "peaks",
    gradientStops: [
      { color: "#064e3b", position: 0 },
      { color: "#022c22", position: 100 },
    ],
    particles: "fireflies",
    particleCount: 20,
    overlay: "fog",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "WILDERNESS", fontFamily: "Lora", fontSize: 72, fontColor: "#ecfdf5", letterSpacing: 5 }),
    ],
  }),
  preset("Manga Bloom", "Anime", {
    type: "bloom",
    color: "#fff1f2",
    pattern: "dots",
    patternColor: "#fda4af",
    overlay: "grain",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "桜の花", fontFamily: "Noto Sans JP", fontSize: 80, fontColor: "#e11d48", animation: "float" }),
      createDefaultTextLayer({ text: "CHERRY BLOSSOM", fontFamily: "Poppins", fontSize: 24, alignY: 75, fontColor: "#e11d48", opacity: 0.6 }),
    ],
  }),
  preset("Industrial Grit", "Brutalist", {
    type: "rect",
    color: "#171717",
    pattern: "lines",
    patternColor: "#3f3f46",
    overlay: "scanlines",
    overlayOpacity: 0.5,
    borderStyle: "zigzag",
    borderWidth: 10,
    borderColor: "#fde047",
    textLayers: [
      createDefaultTextLayer({ text: "CAUTION", fontFamily: "Black Ops One", fontSize: 120, fontColor: "#fde047", animation: "blink" }),
    ],
  }),
  preset("Deep Sea", "Nature", {
    type: "wave",
    colorPreset: "ocean",
    overlay: "water",
    overlayOpacity: 0.6,
    particles: "bubbles",
    particleCount: 30,
    textLayers: [
      createDefaultTextLayer({ text: "ABYSS", fontFamily: "Syncopate", fontSize: 90, fontWeight: 700, fontColor: "#ffffff", animation: "float" }),
    ],
  }),
  preset("Prism Spectrum", "Colorful", {
    type: "rect",
    color: "#000000",
    overlay: "prism",
    overlayOpacity: 0.8,
    textLayers: [
      createDefaultTextLayer({ text: "SPECTRUM", fontFamily: "Righteous", fontSize: 85, animation: "bounce" }),
    ],
  }),
  preset("Vintage Vinyl", "Retro", {
    type: "circle",
    color: "#121212",
    overlay: "vhs",
    overlayOpacity: 0.4,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#444",
    textLayers: [
      createDefaultTextLayer({ text: "SIDE A", fontFamily: "Monoton", fontSize: 100, fontColor: "#ef4444" }),
    ],
  }),
  preset("Arctic Frost", "Nature", {
    type: "aurora",
    colorPreset: "toxic",
    overlay: "snow",
    overlayOpacity: 0.5,
    textLayers: [
      createDefaultTextLayer({ text: "GLACIAL", fontFamily: "Oswald", fontSize: 110, fontWeight: 700, fontColor: "#f0f9ff", animation: "float" }),
    ],
  }),
  preset("Sunset Boulevard", "Retro-Wave", {
    type: "wave2",
    gradientStops: [
      { color: "#7c3aed", position: 0 },
      { color: "#db2777", position: 100 },
    ],
    overlay: "vhs",
    overlayOpacity: 0.3,
    textLayers: [
      createDefaultTextLayer({ text: "RETRO DRIVE", fontFamily: "Lobster", fontSize: 80, fontColor: "#fbbf24", animation: "float" }),
    ],
  }),
  preset("Minimal Arch", "Architectural", {
    type: "arch",
    color: "#fafafa",
    shadow: "glass",
    textLayers: [
      createDefaultTextLayer({ text: "STRUCTURE", fontFamily: "Montserrat", fontSize: 50, fontWeight: 200, fontColor: "#171717", letterSpacing: 25 }),
    ],
  }),
  preset("Hacker Matrix", "Tech", {
    type: "matrix",
    colorPreset: "toxic",
    overlay: "crt",
    overlayOpacity: 0.6,
    textLayers: [
      createDefaultTextLayer({ text: "> ACCESS GRANTED", fontFamily: "Courier New", fontSize: 32, fontColor: "#39ff14", animation: "typewriter" }),
    ],
  }),
  preset("Pastel Dream", "Soft", {
    type: "blob",
    gradientStops: [
      { color: "#fdf2f8", position: 0 },
      { color: "#eef2ff", position: 100 },
    ],
    particles: "fireflies",
    particleCount: 15,
    particleColor: "#f472b6",
    textLayers: [
      createDefaultTextLayer({ text: "DREAMY", fontFamily: "Quicksand", fontSize: 90, fontColor: "#ec4899", animation: "float" }),
    ],
  }),
  preset("Blood Moon", "Dark Fantasy", {
    type: "circle",
    gradientStops: [
      { color: "#450a0a", position: 0 },
      { color: "#000000", position: 100 },
    ],
    overlay: "fog",
    overlayOpacity: 0.4,
    textLayers: [
      createDefaultTextLayer({ text: "ECLIPSE", fontFamily: "Cinzel Decorative", fontSize: 85, fontColor: "#ef4444", animation: "blink" }),
    ],
  }),
  preset("New Year Sparkle", "Holiday", {
    type: "rect",
    color: "#000000",
    particles: "fireflies",
    particleCount: 50,
    particleColor: "#fbbf24",
    overlay: "prism",
    overlayOpacity: 0.4,
    borderStyle: "gradient",
    borderColor: "#fbbf24",
    textLayers: [
      createDefaultTextLayer({ text: "2025", fontFamily: "Righteous", fontSize: 120, fontColor: "#fbbf24", animation: "bounce" }),
      createDefaultTextLayer({ text: "HAPPY NEW YEAR", fontFamily: "Inter", fontSize: 24, alignY: 75, fontColor: "#ffffff", letterSpacing: 10 }),
    ],
  }),
  preset("Valetine Glow", "Holiday", {
    type: "heart",
    color: "#be123c",
    particles: "fireflies",
    particleCount: 20,
    particleColor: "#fda4af",
    overlay: "fog",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "WITH LOVE", fontFamily: "Pacifico", fontSize: 80, fontColor: "#ffffff", animation: "float" }),
    ],
  }),
  preset("Lucky Clover", "Holiday", {
    type: "hexagon",
    color: "#15803d",
    pattern: "dots",
    patternColor: "#4ade80",
    overlay: "grain",
    overlayOpacity: 0.1,
    borderStyle: "double",
    borderColor: "#facc15",
    textLayers: [
      createDefaultTextLayer({ text: "LUCKY DAY", fontFamily: "Bangers", fontSize: 90, fontColor: "#facc15", letterSpacing: 5 }),
    ],
  }),
  preset("Easter Egg", "Holiday", {
    type: "egg",
    gradientStops: [
      { color: "#e9d5ff", position: 0 },
      { color: "#fae8ff", position: 100 },
    ],
    pattern: "zigzag",
    patternColor: "#a855f7",
    overlay: "prism",
    overlayOpacity: 0.2,
    textLayers: [
      createDefaultTextLayer({ text: "SPRING", fontFamily: "Quicksand", fontSize: 80, fontColor: "#7e22ce", animation: "float" }),
    ],
  }),
  preset("Deep Space Aurora", "Nature", {
    type: "aurora",
    color: "#000000",
    overlay: "aurora",
    overlayOpacity: 0.8,
    particles: "stars",
    particleCount: 50,
    textLayers: [
      createDefaultTextLayer({ text: "COSMOS", fontFamily: "Syncopate", fontSize: 90, fontColor: "#ffffff", animation: "float" }),
    ],
  }),
  preset("Volcano Core", "Nature", {
    type: "rect",
    gradientStops: [
      { color: "#110000", position: 0 },
      { color: "#330000", position: 100 },
    ],
    overlay: "lava",
    overlayOpacity: 0.6,
    particles: "embers",
    particleCount: 30,
    textLayers: [
      createDefaultTextLayer({ text: "ERUPTION", fontFamily: "Black Ops One", fontSize: 100, fontColor: "#ff4500", animation: "blink" }),
    ],
  }),
  preset("Power Surge", "Tech", {
    type: "circuit",
    color: "#000b1a",
    overlay: "energy",
    overlayOpacity: 0.5,
    overlayColor: "#00d4ff",
    borderStyle: "bracket",
    borderWidth: 4,
    borderColor: "#00d4ff",
    textLayers: [
      createDefaultTextLayer({ text: "OVERLOAD", fontFamily: "Orbitron", fontSize: 80, fontColor: "#ffffff", animation: "glitch" }),
    ],
  }),
  preset("Architect Blueprints", "Architectural", {
    type: "rect",
    color: "#1e40af",
    overlay: "canvas",
    overlayOpacity: 0.3,
    borderStyle: "frame",
    borderWidth: 15,
    borderColor: "rgba(255,255,255,0.1)",
    textLayers: [
      createDefaultTextLayer({ text: "PLAN_01", fontFamily: "Courier New", fontSize: 72, fontColor: "#ffffff", opacity: 0.8 }),
    ],
  }),
  preset("Dusty Trails", "Retro", {
    type: "mountain",
    color: "#451a03",
    overlay: "dust",
    overlayOpacity: 0.4,
    overlayColor: "#d97706",
    textLayers: [
      createDefaultTextLayer({ text: "FRONTIER", fontFamily: "Rye", fontSize: 90, fontColor: "#fcd34d" }),
    ],
  }),
];
