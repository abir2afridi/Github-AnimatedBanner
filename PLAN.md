# BANNERFORGE — COMPLETE IMPLEMENTATION PROMPT

# GitHub README Banner Generator (Beats capsule-render in every way)

# Version: FINAL — Nothing Missing

---

## 0. MISSION STATEMENT

Build **BannerForge** — the most powerful GitHub README banner generator ever made.
It must:

- Generate animated SVG banners via a simple URL API (like capsule-render)
- Provide a stunning visual drag-and-drop builder UI
- Offer PNG, GIF, WebP, and SVG export
- Have 35+ shape types, 20+ animations, 15+ color presets, 12+ pattern overlays
- Support multi-layer text, icons, particles, and effects
- Be fully deployable on Vercel with zero database required
- Beat capsule-render.vercel.app on every metric: features, design, performance, UX

---

## 1. TECH STACK (EXACT VERSIONS)

```
Framework:        Next.js 14.2+ (App Router, Server Components)
Language:         TypeScript 5.4+ (strict mode ON)
Styling:          Tailwind CSS 3.4+ + CSS Variables
SVG Engine:       Custom hand-written SVG string builder (no external lib)
PNG Export:       @vercel/og OR sharp (server-side rasterization)
GIF Export:       gifenc (pure JS GIF encoder, browser-compatible)
WebP Export:      sharp (server-side)
Color Picker:     react-colorful 5.6+
Icons UI:         lucide-react
Icon Rendering:   simple-icons (SVG paths embedded in API)
Fonts:            Google Fonts via CSS @import inside SVG
State:            Zustand 4.5+ (builder state)
URL Sync:         nuqs (URL search params sync)
Clipboard:        navigator.clipboard API
Toasts:           sonner
Drag & Drop:      @dnd-kit/core (layer reordering)
Animation:        CSS keyframes in SVG (NO JS required in output SVG)
Linting:          ESLint + Prettier
Deployment:       Vercel (zero config)
```

---

## 2. COMPLETE FILE STRUCTURE

```
bannerforge/
├── app/
│   ├── layout.tsx                        # Root layout, metadata, fonts
│   ├── page.tsx                          # Landing page
│   ├── builder/
│   │   └── page.tsx                      # Main builder UI
│   ├── gallery/
│   │   └── page.tsx                      # Preset gallery
│   ├── docs/
│   │   └── page.tsx                      # API documentation
│   └── api/
│       ├── banner/
│       │   └── route.ts                  # Main SVG API endpoint
│       ├── export/
│       │   ├── png/route.ts              # PNG export
│       │   ├── gif/route.ts              # Animated GIF export
│       │   └── webp/route.ts             # WebP export
│       └── og/
│           └── route.ts                  # Open Graph image generation
├── components/
│   ├── Builder/
│   │   ├── BuilderLayout.tsx             # 3-panel layout wrapper
│   │   ├── ControlPanel/
│   │   │   ├── index.tsx                 # Tabbed control panel
│   │   │   ├── ShapeTab.tsx              # Shape selector grid
│   │   │   ├── ColorTab.tsx              # Color/gradient controls
│   │   │   ├── TextTab.tsx               # Typography controls
│   │   │   ├── AnimationTab.tsx          # Animation settings
│   │   │   ├── PatternTab.tsx            # Background pattern
│   │   │   ├── EffectsTab.tsx            # Overlay, blur, shadow, glow
│   │   │   ├── IconTab.tsx               # Icon search + placement
│   │   │   ├── ParticlesTab.tsx          # Particle system settings
│   │   │   └── ExportTab.tsx             # Export + share
│   │   ├── PreviewPanel/
│   │   │   ├── index.tsx                 # Live preview wrapper
│   │   │   ├── PreviewFrame.tsx          # iframe/img preview
│   │   │   ├── ThemeToggle.tsx           # Dark/light preview toggle
│   │   │   └── ZoomControls.tsx          # Zoom in/out preview
│   │   ├── OutputPanel/
│   │   │   ├── index.tsx                 # Right panel
│   │   │   ├── MarkdownOutput.tsx        # Copy-ready Markdown
│   │   │   ├── HTMLOutput.tsx            # Copy-ready HTML
│   │   │   ├── URLOutput.tsx             # Raw URL
│   │   │   └── ExportButtons.tsx         # Download buttons
│   │   └── LayerPanel/
│   │       ├── index.tsx                 # Layer stack UI
│   │       └── LayerItem.tsx             # Individual layer
│   ├── Gallery/
│   │   ├── GalleryGrid.tsx
│   │   └── GalleryCard.tsx
│   ├── Landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── Examples.tsx
│   └── UI/
│       ├── Slider.tsx                    # Custom styled range slider
│       ├── ColorPicker.tsx               # react-colorful wrapper
│       ├── GradientBuilder.tsx           # Multi-stop gradient editor
│       ├── FontSelector.tsx              # Searchable font dropdown
│       ├── NumberInput.tsx               # Styled number input
│       ├── Toggle.tsx                    # Styled toggle switch
│       ├── Select.tsx                    # Styled select dropdown
│       ├── TabGroup.tsx                  # Tab navigation
│       ├── Tooltip.tsx                   # Hover tooltip
│       ├── Badge.tsx                     # Tag/badge component
│       └── CopyButton.tsx                # Copy with toast feedback
├── lib/
│   ├── svg/
│   │   ├── generator.ts                  # Main SVG assembler
│   │   ├── shapes.ts                     # All 35 shape path generators
│   │   ├── animations.ts                 # All 22 animation keyframes
│   │   ├── patterns.ts                   # All 14 pattern SVG defs
│   │   ├── effects.ts                    # Blur, shadow, glow, overlay defs
│   │   ├── gradients.ts                  # Gradient def builders
│   │   ├── particles.ts                  # Particle system SVG generator
│   │   ├── icons.ts                      # Simple-icons path map (top 100)
│   │   └── fonts.ts                      # Google Fonts CSS embed map
│   ├── utils/
│   │   ├── params.ts                     # Parse & validate URL params
│   │   ├── colors.ts                     # Color manipulation utilities
│   │   ├── math.ts                       # Bezier, sine, noise helpers
│   │   └── encode.ts                     # URL encode/decode helpers
│   └── store/
│       └── builder.ts                    # Zustand store for builder state
├── types/
│   └── banner.ts                         # All TypeScript interfaces/types
├── constants/
│   ├── shapes.ts                         # Shape metadata + thumbnails
│   ├── animations.ts                     # Animation metadata
│   ├── presets.ts                        # Gallery presets (20+)
│   ├── fonts.ts                          # Available Google Fonts list
│   └── icons.ts                          # Available icon list
├── public/
│   ├── og-image.png
│   └── favicon.svg
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 3. COMPLETE TYPESCRIPT TYPES (types/banner.ts)

```typescript
// ─── Shape Types ───────────────────────────────────────────────────────────
export type ShapeType =
  | 'waving'        // Classic bottom wave
  | 'waving_top'    // Wave from top
  | 'wave'          // Wave both sides
  | 'shark'         // Downward jagged
  | 'mountain'      // Bezier mountain peaks
  | 'peaks'         // Sharp triangle peaks
  | 'city'          // Skyline silhouette
  | 'circuit'       // PCB circuit board
  | 'glitch'        // Digital glitch offset
  | 'fire'          // Flame irregular edge
  | 'aurora'        // Northern lights flowing
  | 'vortex'        // Spiral/radial shape
  | 'diamond'       // Rotated square clip
  | 'arch'          // Arch / bridge curve
  | 'cylinder'      // 3D cylinder illusion
  | 'slice'         // Diagonal cut
  | 'rounded'       // Fully rounded rect
  | 'transparent'   // No background
  | 'soft'          // Gently rounded corners
  | 'egg'           // Oval/egg shape
  | 'bloom'         // Flower clip path
  | 'blaze'         // Asymmetric fire blaze
  | 'code'          // Code bracket decoration
  | 'galaxy'        // Circular radial glow
  | 'grid'          // Perspective grid floor
  | 'neon'          // Neon tube outline
  | 'paper'         // Paper folded corner
  | 'hexagon'       // Hexagonal clip
  | 'shield'        // Shield shape
  | 'ribbon'        // Diagonal ribbon banner
  | 'terminal'      // Terminal/console window
  | 'speech'        // Speech bubble
  | 'lightning'     // Lightning bolt shape
  | 'dna'           // DNA helix outline
  | 'binary';       // Binary rain backdrop

// ─── Animation Types ────────────────────────────────────────────────────────
export type AnimationType =
  | 'none'
  | 'fadeIn'
  | 'scaleIn'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInTop'
  | 'slideInBottom'
  | 'blink'
  | 'twinkling'
  | 'typewriter'
  | 'glitch'
  | 'float'
  | 'pulse'
  | 'bounce'
  | 'waveText'      // Text chars wave up-down individually
  | 'ripple'
  | 'sparkle'
  | 'rotate'
  | 'shake'
  | 'neonFlicker'
  | 'colorShift'    // Hue rotation animation
  | 'reveal';       // Wipe reveal from left

// ─── Color Preset Names ─────────────────────────────────────────────────────
export type ColorPreset =
  | 'sunset' | 'ocean' | 'fire' | 'aurora' | 'cyberpunk'
  | 'pastel' | 'monochrome' | 'neon' | 'earth' | 'candy'
  | 'space' | 'forest' | 'sakura' | 'midnight' | 'lava'
  | 'mint' | 'rose' | 'gold' | 'ice' | 'toxic';

// ─── Pattern Types ───────────────────────────────────────────────────────────
export type PatternType =
  | 'none' | 'dots' | 'grid' | 'diagonal' | 'circuit'
  | 'hexagon' | 'noise' | 'stars' | 'rain' | 'bubbles'
  | 'crosshatch' | 'triangles' | 'waves' | 'codeLines';

// ─── Overlay / Effect Types ──────────────────────────────────────────────────
export type OverlayType =
  | 'none' | 'gradient' | 'vignette' | 'scanlines'
  | 'grain' | 'frost' | 'holographic' | 'glitch';

export type ShadowType = 'none' | 'soft' | 'hard' | 'glow' | 'inset' | 'neon';

export type BlendMode =
  | 'normal' | 'multiply' | 'screen' | 'overlay'
  | 'darken' | 'lighten' | 'color-dodge' | 'color-burn';

// ─── Particle Types ──────────────────────────────────────────────────────────
export type ParticleType =
  | 'none' | 'stars' | 'snowflakes' | 'bubbles' | 'confetti'
  | 'sparkles' | 'embers' | 'matrix' | 'hearts' | 'fireflies';

// ─── Font Weights ────────────────────────────────────────────────────────────
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// ─── Text Align ──────────────────────────────────────────────────────────────
export type TextAlign = 'left' | 'center' | 'right';

// ─── Section ─────────────────────────────────────────────────────────────────
export type Section = 'header' | 'footer' | 'middle';

// ─── Icon Align ──────────────────────────────────────────────────────────────
export type IconPosition = 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

// ─── Text Layer (supports multiple text layers) ──────────────────────────────
export interface TextLayer {
  id: string;
  text: string;
  fontSize: number;           // 8–150
  fontColor: string;          // hex
  fontFamily: string;         // Google Font name
  fontWeight: FontWeight;
  fontStyle: 'normal' | 'italic' | 'oblique';
  fontAlign: TextAlign;
  alignX: number;             // 0–100 percentage
  alignY: number;             // 0–100 percentage
  letterSpacing: number;      // -10 to 50
  lineHeight: number;         // 0.5–3.0
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration: 'none' | 'underline' | 'line-through';
  textShadow: boolean;
  textShadowColor: string;
  textShadowBlur: number;
  textShadowX: number;
  textShadowY: number;
  textStroke: boolean;
  textStrokeColor: string;
  textStrokeWidth: number;
  animation: AnimationType;
  animationDelay: number;     // ms
  animationDuration: number;  // ms
  opacity: number;            // 0–1
  rotate: number;             // -180 to 180
  visible: boolean;
  gradient: boolean;          // text gradient fill
  gradientColors: string[];   // for gradient text
  gradientAngle: number;
  glowEffect: boolean;
  glowColor: string;
  glowRadius: number;
}

// ─── Icon Layer ───────────────────────────────────────────────────────────────
export interface IconLayer {
  id: string;
  slug: string;               // simple-icons slug
  color: string;              // hex or 'original'
  size: number;               // 16–200
  position: IconPosition;
  offsetX: number;            // -200 to 200 px
  offsetY: number;
  opacity: number;
  animation: AnimationType;
  animationDelay: number;
  visible: boolean;
}

// ─── Main Banner Params ────────────────────────────────────────────────────
export interface BannerParams {
  // Shape
  type: ShapeType;
  section: Section;
  height: number;             // 60–600
  width: number | 'auto';     // auto = 100%
  rotate: number;             // 0–360 flip/rotate whole banner
  reverseColor: boolean;

  // Color
  color: string;              // 'gradient' | 'auto' | 'random' | hex | colorPreset name
  colorPreset?: ColorPreset;
  gradientAngle: number;      // 0–360
  gradientType: 'linear' | 'radial' | 'conic' | 'mesh';
  gradientStops: GradientStop[];   // array of {offset: 0–100, color: hex}
  strokeWidth: number;        // 0–20
  strokeColor: string;

  // Text Layers
  textLayers: TextLayer[];

  // Icon Layers
  iconLayers: IconLayer[];

  // Pattern
  pattern: PatternType;
  patternColor: string;
  patternOpacity: number;     // 0–1
  patternScale: number;       // 0.1–5.0
  patternAngle: number;       // 0–360

  // Particles
  particles: ParticleType;
  particleCount: number;      // 0–200
  particleColor: string;
  particleSize: number;       // 1–20
  particleSpeed: number;      // 0.1–5.0
  particleOpacity: number;

  // Effects
  overlay: OverlayType;
  overlayOpacity: number;
  overlayColor: string;
  blur: number;               // 0–30 (applied to shape fill, not text)
  shadow: ShadowType;
  shadowColor: string;
  shadowBlur: number;
  shadowX: number;
  shadowY: number;
  glowColor: string;
  glowRadius: number;
  brightness: number;         // 0.1–3.0
  contrast: number;           // 0.1–3.0
  saturation: number;         // 0–3.0
  hueRotate: number;          // 0–360
  blendMode: BlendMode;

  // Theme
  theme: 'dark' | 'light' | 'auto';

  // Output
  format?: 'svg' | 'png' | 'gif' | 'webp';
  quality?: number;           // 1–100 for PNG/WebP
  scale?: number;             // 1–4x for PNG (retina)
}

export interface GradientStop {
  offset: number;   // 0–100
  color: string;    // hex
  opacity?: number; // 0–1
}

// ─── Gallery Preset ───────────────────────────────────────────────────────────
export interface GalleryPreset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  params: Partial<BannerParams>;
  previewUrl?: string;
}
```

---

## 4. API ROUTE — COMPLETE (app/api/banner/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { parseParams } from '@/lib/utils/params';
import { generateSVG } from '@/lib/svg/generator';

export const runtime = 'edge'; // Use edge runtime for fastest response

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  try {
    const params = parseParams(searchParams);
    const svg = generateSVG(params);
    
    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    const errorSVG = generateErrorSVG(String(error));
    return new NextResponse(errorSVG, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }
}

function generateErrorSVG(message: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="100">
    <rect width="800" height="100" fill="#1a1a2e"/>
    <text x="20" y="55" fill="#ff6b6b" font-family="monospace" font-size="16">
      ⚠ BannerForge Error: ${message.substring(0, 80)}
    </text>
  </svg>`;
}
```

### ALL QUERY PARAMETERS (parseParams must handle ALL of these)

```
// Shape
type            ShapeType                    default: 'waving'
section         'header'|'footer'|'middle'   default: 'header'
height          number 60-600                default: 300
width           number|'auto'                default: 'auto'
rotate          number 0-360                 default: 0
reverseColor    boolean                      default: false

// Color
color           string                       default: 'gradient'
colorPreset     ColorPreset                  default: undefined
gradientAngle   number 0-360                 default: 0
gradientType    'linear'|'radial'|'conic'    default: 'linear'
gradients       string (format: "0:hex,50:hex,100:hex")
strokeWidth     number 0-20                  default: 0
strokeColor     string                       default: '#ffffff'

// Text (shorthand for single layer — most common use)
text            string (URL encoded)         default: ''
text2           string                       default: ''
desc            string                       default: ''
fontSize        number 8-150                 default: 70
fontSize2       number                       default: 40
descSize        number                       default: 20
fontColor       string hex                   default: '#ffffff'
fontColor2      string                       default: '#ffffffaa'
descColor       string                       default: '#ffffffbb'
fontAlign       'left'|'center'|'right'      default: 'center'
fontAlignY      number 0-100                 default: 45
fontFamily      string (Google Font name)    default: 'Segoe UI'
fontWeight      number                       default: 700
fontStyle       'normal'|'italic'            default: 'normal'
letterSpacing   number                       default: 0
textStroke      boolean                      default: false
textStrokeColor string                       default: '#000000'
textStrokeWidth number                       default: 1
textGlow        boolean                      default: false
textGlowColor   string                       default: '#ffffff'
textGlowRadius  number                       default: 10
gradientText    boolean                      default: false
gradientText2   boolean                      default: false

// Animation
animation       AnimationType                default: 'fadeIn'
animation2      AnimationType for text2      default: 'fadeIn'
animationSpeed  number 0.1-10               default: 1
animationDelay  number 0-5000ms             default: 0

// Icon
icon            string (simple-icons slug)   default: ''
icon2           string                       default: ''
icon3           string                       default: ''
iconColor       string                       default: 'original'
iconSize        number 16-200               default: 50
iconPosition    IconPosition                 default: 'top-right'
iconOpacity     number 0-1                  default: 1

// Pattern
pattern         PatternType                  default: 'none'
patternColor    string                       default: '#ffffff'
patternOpacity  number 0-1                  default: 0.1
patternScale    number 0.1-5                default: 1
patternAngle    number 0-360                default: 0

// Particles
particles       ParticleType                 default: 'none'
particleCount   number 0-200                default: 50
particleColor   string                       default: '#ffffff'
particleSize    number 1-20                 default: 3
particleSpeed   number 0.1-5               default: 1
particleOpacity number 0-1                  default: 0.6

// Effects
overlay         OverlayType                  default: 'none'
overlayOpacity  number 0-1                  default: 0.3
overlayColor    string                       default: '#000000'
blur            number 0-30                 default: 0
shadow          ShadowType                   default: 'none'
shadowColor     string                       default: '#000000'
shadowBlur      number 0-50                 default: 10
shadowX         number -50 to 50            default: 0
shadowY         number -50 to 50            default: 5
glowColor       string                       default: '#ffffff'
glowRadius      number 0-100               default: 0
brightness      number 0.1-3               default: 1
contrast        number 0.1-3               default: 1
saturation      number 0-3                 default: 1
hueRotate       number 0-360               default: 0

// Theme
theme           'dark'|'light'|'auto'        default: 'dark'
```

---

## 5. SHAPE GENERATORS — ALL 35 SHAPES (lib/svg/shapes.ts)

```typescript
export interface ShapeResult {
  defs: string;           // SVG <defs> content (clipPaths, etc)
  background: string;     // main fill shape element
  topDecoration?: string; // extra element at top
  botDecoration?: string; // extra element at bottom
  viewBox: string;        // "0 0 W H"
}

type ShapeFn = (w: number, h: number, rev: boolean) => ShapeResult;

// ─── IMPLEMENTATION OF ALL 35 SHAPES ──────────────────────────────────────

// 1. WAVING — sine-curve wave from bottom
export const waving: ShapeFn = (w, h, rev) => {
  const wave = `M0,${h} L0,${h * 0.7} 
    C${w * 0.25},${h * 0.5} ${w * 0.5},${h * 0.9} ${w},${h * 0.65}
    L${w},${h} Z`;
  return {
    defs: '',
    background: `<path d="${wave}" fill="url(#bg-gradient)"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 2. WAVING_TOP — wave from top
export const waving_top: ShapeFn = (w, h, rev) => {
  const wave = `M0,0 C${w*0.25},${h*0.3} ${w*0.5},0 ${w},${h*0.2} L${w},0 Z`;
  return {
    defs: '',
    background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
      <path d="${wave}" fill="var(--page-bg, #ffffff)"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 3. WAVE — wave on both top and bottom
export const wave: ShapeFn = (w, h, rev) => {
  const top  = `M0,0 C${w*0.25},${h*0.15} ${w*0.5},0 ${w*0.75},${h*0.1} C${w*0.88},${h*0.15} ${w},${h*0.08} ${w},0 Z`;
  const bot  = `M0,${h} C${w*0.3},${h*0.8} ${w*0.6},${h*0.95} ${w},${h*0.85} L${w},${h} Z`;
  return {
    defs: '',
    background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>`,
    topDecoration: `<path d="${top}" fill="var(--page-bg,#0d1117)" opacity="0.7"/>`,
    botDecoration: `<path d="${bot}" fill="url(#bg-gradient)"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 4. SHARK — downward pointing jagged teeth
export const shark: ShapeFn = (w, h) => {
  const teeth = 8;
  const tw = w / teeth;
  let d = `M0,0 L0,${h*0.7}`;
  for (let i = 0; i < teeth; i++) {
    d += ` L${tw*i + tw*0.5},${h} L${tw*(i+1)},${h*0.7}`;
  }
  d += ` L${w},0 Z`;
  return {
    defs: '', background: `<path d="${d}" fill="url(#bg-gradient)"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 5. MOUNTAIN — bezier mountain peaks
export const mountain: ShapeFn = (w, h) => {
  const path = `M0,${h} L0,${h*0.6}
    C${w*0.1},${h*0.4} ${w*0.15},${h*0.1} ${w*0.25},${h*0.05}
    C${w*0.3},${h*0.02} ${w*0.35},${h*0.15} ${w*0.4},${h*0.3}
    C${w*0.45},${h*0.1} ${w*0.5},0 ${w*0.55},0
    C${w*0.6},0 ${w*0.65},${h*0.1} ${w*0.7},${h*0.25}
    C${w*0.75},${h*0.05} ${w*0.82},${h*0.02} ${w*0.88},${h*0.08}
    C${w*0.92},${h*0.18} ${w*0.96},${h*0.4} ${w},${h*0.55}
    L${w},${h} Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 6. PEAKS — sharp angular peaks
export const peaks: ShapeFn = (w, h) => {
  const pts = [
    [0, h],[0, h*0.65],[w*0.1,h*0.65],[w*0.18,h*0.1],[w*0.26,h*0.65],
    [w*0.38,h*0.65],[w*0.48,0],[w*0.58,h*0.65],[w*0.7,h*0.65],
    [w*0.78,h*0.15],[w*0.86,h*0.65],[w*0.95,h*0.65],[w,h*0.65],[w,h]
  ].map(p => p.join(',')).join(' L');
  return { defs:'', background:`<polygon points="${pts}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 7. CITY — random skyline rectangles
export const city: ShapeFn = (w, h) => {
  const buildings = [];
  let x = 0;
  while (x < w) {
    const bw = 20 + Math.floor(((x * 13) % 7) * 8);
    const bh = h * (0.2 + ((x * 7 + 31) % 10) * 0.06);
    const windows = Math.floor(bh / 20);
    buildings.push(`<rect x="${x}" y="${h - bh}" width="${bw - 2}" height="${bh}" fill="url(#bg-gradient)"/>`);
    for (let wy = 0; wy < windows; wy++) {
      if ((x + wy) % 3 !== 0) {
        buildings.push(`<rect x="${x + 4}" y="${h - bh + wy*18 + 4}" width="${bw-10}" height="8" fill="rgba(255,255,200,0.4)"/>`);
      }
    }
    x += bw;
  }
  return { defs:'', background: buildings.join('\n'), viewBox:`0 0 ${w} ${h}` };
};

// 8. CIRCUIT — PCB traces and nodes
export const circuit: ShapeFn = (w, h) => {
  const lines = [];
  for (let i = 0; i < 15; i++) {
    const x1 = (i * w / 15), y1 = h * (0.3 + (i % 4) * 0.1);
    const x2 = x1 + 80 + (i % 3) * 40, y2 = y1 + (i % 2 === 0 ? -30 : 30);
    lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#bg-gradient)" stroke-width="2"/>`);
    lines.push(`<circle cx="${x1}" cy="${y1}" r="4" fill="url(#bg-gradient)"/>`);
  }
  return {
    defs: '',
    background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)" opacity="0.15"/>
      ${lines.join('')}`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 9. GLITCH — digital glitch offset slices
export const glitch: ShapeFn = (w, h) => {
  const slices = [
    `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#bg-gradient)"/>`,
    `<rect x="${w*0.05}" y="${h*0.3}" width="${w*0.4}" height="${h*0.07}" fill="url(#bg-gradient)" opacity="0.7"/>`,
    `<rect x="-${w*0.03}" y="${h*0.5}" width="${w*0.6}" height="${h*0.04}" fill="url(#bg-gradient2,#bg-gradient)" opacity="0.5"/>`,
    `<rect x="${w*0.1}" y="${h*0.7}" width="${w*0.3}" height="${h*0.05}" fill="url(#bg-gradient)" opacity="0.6"/>`,
  ];
  return { defs:'', background: slices.join(''), viewBox:`0 0 ${w} ${h}` };
};

// 10. FIRE — flame-like irregular top edge
export const fire: ShapeFn = (w, h) => {
  const flames = `M0,${h} L0,${h*0.5}
    C${w*0.05},${h*0.2} ${w*0.08},${h*0.05} ${w*0.12},${h*0.15}
    C${w*0.16},${h*0.25} ${w*0.18},${h*0.1} ${w*0.22},0
    C${w*0.26},${h*0.1} ${w*0.28},${h*0.3} ${w*0.32},${h*0.2}
    C${w*0.35},${h*0.05} ${w*0.38},0 ${w*0.42},${h*0.08}
    C${w*0.46},${h*0.2} ${w*0.5},${h*0.1} ${w*0.55},${h*0.02}
    C${w*0.6},${h*0.12} ${w*0.63},${h*0.28} ${w*0.67},${h*0.15}
    C${w*0.7},${h*0.05} ${w*0.73},0 ${w*0.77},${h*0.1}
    C${w*0.81},${h*0.22} ${w*0.85},${h*0.15} ${w*0.89},${h*0.05}
    C${w*0.93},${h*0.18} ${w*0.96},${h*0.35} ${w},${h*0.45}
    L${w},${h} Z`;
  return { defs:'', background:`<path d="${flames}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 11. AURORA — northern lights flowing layered curves
export const aurora: ShapeFn = (w, h) => {
  const layers = [
    { y: 0.7, cp1y: 0.4, cp2y: 0.6, ey: 0.5, op: 0.9 },
    { y: 0.8, cp1y: 0.55, cp2y: 0.7, ey: 0.6, op: 0.6 },
    { y: 0.9, cp1y: 0.65, cp2y: 0.8, ey: 0.72, op: 0.4 },
  ].map(l => `<path d="M0,${h} L0,${h*l.y} C${w*0.3},${h*l.cp1y} ${w*0.7},${h*l.cp2y} ${w},${h*l.ey} L${w},${h} Z"
    fill="url(#bg-gradient)" opacity="${l.op}"/>`);
  return { defs:'', background: layers.join(''), viewBox:`0 0 ${w} ${h}` };
};

// 12. VORTEX — spiral using many arc segments
export const vortex: ShapeFn = (w, h) => {
  const cx = w/2, cy = h/2;
  const arcs = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r = Math.min(w,h) * 0.45;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    arcs.push(`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="url(#bg-gradient)" stroke-width="${3 - i*0.15}" opacity="${1 - i*0.06}"/>`);
  }
  return {
    defs: `<clipPath id="vortex-clip"><circle cx="${cx}" cy="${cy}" r="${Math.min(w,h)*0.48}"/></clipPath>`,
    background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)" clip-path="url(#vortex-clip)"/>
      <g clip-path="url(#vortex-clip)">${arcs.join('')}</g>`,
    viewBox:`0 0 ${w} ${h}`,
  };
};

// 13. DIAMOND — centered diamond clip
export const diamond: ShapeFn = (w, h) => {
  const cx = w/2, pad = 10;
  const pts = `${cx},${pad} ${w-pad},${h/2} ${cx},${h-pad} ${pad},${h/2}`;
  return {
    defs: `<clipPath id="diamond-clip"><polygon points="${pts}"/></clipPath>`,
    background: `<polygon points="${pts}" fill="url(#bg-gradient)"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 14. ARCH — arch/bridge shape
export const arch: ShapeFn = (w, h) => {
  const path = `M0,${h} L0,${h*0.5} Q${w*0.5},${-h*0.1} ${w},${h*0.5} L${w},${h} Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 15. CYLINDER — 3D cylinder illusion with ellipses
export const cylinder: ShapeFn = (w, h) => {
  const rx = w/2, ry = h*0.08;
  return {
    defs: '',
    background: `<rect x="0" y="${ry}" width="${w}" height="${h - ry*2}" fill="url(#bg-gradient)"/>
      <ellipse cx="${rx}" cy="${ry}" rx="${rx}" ry="${ry}" fill="url(#bg-gradient-light)"/>
      <ellipse cx="${rx}" cy="${h-ry}" rx="${rx}" ry="${ry}" fill="url(#bg-gradient-dark)"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 16. SLICE — diagonal cut from top-left to bottom-right
export const slice: ShapeFn = (w, h, rev) => {
  const path = rev
    ? `M0,0 L${w},0 L${w},${h*0.7} L0,${h*0.3} Z`
    : `M0,0 L${w},0 L${w},${h*0.3} L0,${h*0.7} Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 17. ROUNDED — fully rounded rectangle
export const rounded: ShapeFn = (w, h) => ({
  defs: '',
  background: `<rect width="${w}" height="${h}" rx="${h*0.15}" ry="${h*0.15}" fill="url(#bg-gradient)"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 18. TRANSPARENT — no shape, text on transparent
export const transparent: ShapeFn = (w, h) => ({
  defs: '',
  background: '',
  viewBox: `0 0 ${w} ${h}`,
});

// 19. SOFT — gentle rounded corners
export const soft: ShapeFn = (w, h) => ({
  defs: '',
  background: `<rect width="${w}" height="${h}" rx="20" ry="20" fill="url(#bg-gradient)"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 20. EGG — oval/egg shape
export const egg: ShapeFn = (w, h) => ({
  defs: `<clipPath id="egg-clip"><ellipse cx="${w/2}" cy="${h/2}" rx="${w*0.48}" ry="${h*0.48}"/></clipPath>`,
  background: `<ellipse cx="${w/2}" cy="${h/2}" rx="${w*0.48}" ry="${h*0.48}" fill="url(#bg-gradient)"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 21. BLOOM — 6-petal flower clip
export const bloom: ShapeFn = (w, h) => {
  const cx = w/2, cy = h/2, r = Math.min(w,h)*0.45;
  let petals = '';
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const px = cx + Math.cos(a) * r * 0.5;
    const py = cy + Math.sin(a) * r * 0.5;
    petals += `<ellipse cx="${px}" cy="${py}" rx="${r*0.4}" ry="${r*0.6}" transform="rotate(${i*60} ${px} ${py})" fill="url(#bg-gradient)"/>`;
  }
  return { defs:'', background: petals, viewBox:`0 0 ${w} ${h}` };
};

// 22. BLAZE — asymmetric fire blaze
export const blaze: ShapeFn = (w, h) => {
  const path = `M0,${h} L0,${h*0.4} 
    C${w*0.1},${h*0.15} ${w*0.2},${h*0.05} ${w*0.3},${h*0.2}
    C${w*0.35},${h*0.3} ${w*0.38},${h*0.1} ${w*0.45},0
    C${w*0.5},${h*0.12} ${w*0.55},${h*0.25} ${w*0.65},${h*0.1}
    C${w*0.72},${h*0.02} ${w*0.8},${h*0.15} ${w},${h*0.4}
    L${w},${h} Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 23. CODE — `< />` decoration with bracket shapes
export const code: ShapeFn = (w, h) => ({
  defs: '',
  background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
    <text x="20" y="${h*0.65}" fill="rgba(255,255,255,0.1)" font-size="${h*0.5}" font-family="monospace" font-weight="bold">&lt;/&gt;</text>
    <text x="${w-60}" y="${h*0.4}" fill="rgba(255,255,255,0.06)" font-size="${h*0.3}" font-family="monospace">{...}</text>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 24. GALAXY — radial gradient circular glow
export const galaxy: ShapeFn = (w, h) => ({
  defs: `<radialGradient id="galaxy-glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
    <stop offset="60%" stop-color="rgba(255,255,255,0)"/>
  </radialGradient>`,
  background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
    <ellipse cx="${w/2}" cy="${h/2}" rx="${w*0.48}" ry="${h*0.45}" fill="url(#galaxy-glow)"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 25. GRID — perspective grid floor
export const grid: ShapeFn = (w, h) => {
  const lines = [];
  const vp = { x: w/2, y: h*0.3 };
  for (let i = 0; i <= 10; i++) {
    const bx = (i/10) * w;
    lines.push(`<line x1="${vp.x}" y1="${vp.y}" x2="${bx}" y2="${h}" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`);
  }
  for (let i = 1; i <= 8; i++) {
    const t = i / 8;
    const lx = vp.x + (0 - vp.x) * t;
    const rx = vp.x + (w - vp.x) * t;
    const y = vp.y + (h - vp.y) * t;
    lines.push(`<line x1="${lx}" y1="${y}" x2="${rx}" y2="${y}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`);
  }
  return {
    defs:'',
    background:`<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
      <g>${lines.join('')}</g>`,
    viewBox:`0 0 ${w} ${h}`,
  };
};

// 26. NEON — neon tube glow outline (border glow)
export const neon: ShapeFn = (w, h) => ({
  defs: `<filter id="neon-glow">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`,
  background: `<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
    <rect x="4" y="4" width="${w-8}" height="${h-8}" rx="8" fill="none"
      stroke="rgba(255,255,255,0.9)" stroke-width="2" filter="url(#neon-glow)"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 27. PAPER — folded paper corner effect
export const paper: ShapeFn = (w, h) => {
  const fold = h * 0.15;
  return {
    defs: '',
    background: `<polygon points="0,0 ${w-fold},0 ${w},${fold} ${w},${h} 0,${h}" fill="url(#bg-gradient)"/>
      <polygon points="${w-fold},0 ${w},${fold} ${w-fold},${fold}" fill="rgba(0,0,0,0.25)"/>
      <line x1="${w-fold}" y1="0" x2="${w-fold}" y2="${fold}" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>`,
    viewBox: `0 0 ${w} ${h}`,
  };
};

// 28. HEXAGON
export const hexagon: ShapeFn = (w, h) => {
  const cx = w/2, cy = h/2, r = Math.min(w,h) * 0.47;
  const pts = Array.from({length:6},(_,i)=>{
    const a = (i/6)*Math.PI*2 - Math.PI/6;
    return `${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`;
  }).join(' ');
  return { defs:'', background:`<polygon points="${pts}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 29. SHIELD
export const shield: ShapeFn = (w, h) => {
  const path = `M${w/2},${h} C${w/2},${h} ${w*0.05},${h*0.7} ${w*0.05},${h*0.35}
    L${w*0.05},${h*0.1} L${w/2},0 L${w*0.95},${h*0.1}
    L${w*0.95},${h*0.35} C${w*0.95},${h*0.7} ${w/2},${h} ${w/2},${h} Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 30. RIBBON — diagonal ribbon banner
export const ribbon: ShapeFn = (w, h) => {
  const path = `M0,${h*0.2} L${w},0 L${w},${h*0.8} L0,${h} Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 31. TERMINAL — macOS terminal window frame
export const terminal: ShapeFn = (w, h) => ({
  defs: '',
  background: `<rect width="${w}" height="${h}" rx="10" fill="url(#bg-gradient)"/>
    <rect x="0" y="0" width="${w}" height="${h*0.12}" rx="10" fill="rgba(0,0,0,0.4)"/>
    <rect x="0" y="${h*0.06}" width="${w}" height="${h*0.06}" fill="rgba(0,0,0,0.4)"/>
    <circle cx="${w*0.03}" cy="${h*0.06}" r="${h*0.025}" fill="#ff5f57"/>
    <circle cx="${w*0.065}" cy="${h*0.06}" r="${h*0.025}" fill="#febc2e"/>
    <circle cx="${w*0.1}" cy="${h*0.06}" r="${h*0.025}" fill="#28c840"/>`,
  viewBox: `0 0 ${w} ${h}`,
});

// 32. SPEECH — speech bubble shape
export const speech: ShapeFn = (w, h) => {
  const tail = h * 0.15;
  const path = `M${w*0.05},0 L${w*0.95},0 Q${w},0 ${w},${h*0.05}
    L${w},${h*0.75} Q${w},${h*0.85} ${w*0.95},${h*0.85}
    L${w*0.35},${h*0.85} L${w*0.2},${h} L${w*0.3},${h*0.85}
    L${w*0.05},${h*0.85} Q0,${h*0.85} 0,${h*0.75}
    L0,${h*0.05} Q0,0 ${w*0.05},0 Z`;
  return { defs:'', background:`<path d="${path}" fill="url(#bg-gradient)"/>`, viewBox:`0 0 ${w} ${h}` };
};

// 33. LIGHTNING — lightning bolt
export const lightning: ShapeFn = (w, h) => {
  const path = `M${w*0.55},0 L${w*0.3},${h*0.45} L${w*0.5},${h*0.45} L${w*0.45},${h} L${w*0.7},${h*0.55} L${w*0.5},${h*0.55} Z`;
  return {
    defs:'',
    background:`<rect width="${w}" height="${h}" fill="url(#bg-gradient)" opacity="0.3"/>
      <path d="${path}" fill="url(#bg-gradient)"/>`,
    viewBox:`0 0 ${w} ${h}`,
  };
};

// 34. DNA — DNA helix outline (decorative)
export const dna: ShapeFn = (w, h) => {
  const strands = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const y = t * h;
    const x1 = w*0.3 + Math.sin(t * Math.PI * 4) * w * 0.15;
    const x2 = w*0.7 - Math.sin(t * Math.PI * 4) * w * 0.15;
    if (i > 0) {
      strands.push(`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>`);
    }
  }
  return {
    defs:'',
    background:`<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
      <polyline points="${Array.from({length:40},(_,i)=>{
        const t=i/39,y=t*h,x=w*0.3+Math.sin(t*Math.PI*4)*w*0.15;
        return `${x},${y}`;
      }).join(' ')}" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
      <polyline points="${Array.from({length:40},(_,i)=>{
        const t=i/39,y=t*h,x=w*0.7-Math.sin(t*Math.PI*4)*w*0.15;
        return `${x},${y}`;
      }).join(' ')}" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
      ${strands.join('')}`,
    viewBox:`0 0 ${w} ${h}`,
  };
};

// 35. BINARY — binary rain backdrop
export const binary: ShapeFn = (w, h) => {
  const chars = [];
  for (let col = 0; col < w; col += 18) {
    for (let row = 0; row < h; row += 18) {
      const bit = (col * 7 + row * 13) % 2 === 0 ? '1' : '0';
      const op = 0.05 + ((col + row) % 10) * 0.02;
      chars.push(`<text x="${col}" y="${row+14}" fill="rgba(255,255,255,${op})" font-family="monospace" font-size="12">${bit}</text>`);
    }
  }
  return {
    defs:'',
    background:`<rect width="${w}" height="${h}" fill="url(#bg-gradient)"/>
      ${chars.join('')}`,
    viewBox:`0 0 ${w} ${h}`,
  };
};
```

---

## 6. ALL 22 ANIMATIONS (lib/svg/animations.ts)

```typescript
export function getAnimationCSS(
  animation: AnimationType,
  speed: number = 1,
  delay: number = 0,
  targetClass: string = '.animated'
): string {
  const dur = (base: number) => `${(base / speed).toFixed(2)}s`;
  const d = `${delay}ms`;

  const keyframes: Record<string, string> = {
    fadeIn: `@keyframes fadeIn{from{opacity:0}to{opacity:1}}`,
    scaleIn: `@keyframes scaleIn{from{transform:scale(0.7);opacity:0}to{transform:scale(1);opacity:1}}`,
    slideInLeft: `@keyframes slideInLeft{from{transform:translateX(-80px);opacity:0}to{transform:translateX(0);opacity:1}}`,
    slideInRight: `@keyframes slideInRight{from{transform:translateX(80px);opacity:0}to{transform:translateX(0);opacity:1}}`,
    slideInTop: `@keyframes slideInTop{from{transform:translateY(-40px);opacity:0}to{transform:translateY(0);opacity:1}}`,
    slideInBottom: `@keyframes slideInBottom{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}`,
    blink: `@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}`,
    twinkling: `@keyframes twinkling{0%{opacity:0.2}25%{opacity:1}50%{opacity:0.4}75%{opacity:0.9}100%{opacity:0.2}}`,
    typewriter: `@keyframes typewriter{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}`,
    glitch: `@keyframes glitch{
      0%{transform:translate(0)}
      20%{transform:translate(-3px,1px)}
      40%{transform:translate(3px,-1px)}
      60%{transform:translate(-2px,2px)}
      80%{transform:translate(2px,-2px)}
      100%{transform:translate(0)}
    }`,
    float: `@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`,
    pulse: `@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(0.97)}}`,
    bounce: `@keyframes bounce{
      0%,100%{transform:translateY(0);animation-timing-function:cubic-bezier(.8,0,1,1)}
      50%{transform:translateY(-15px);animation-timing-function:cubic-bezier(0,0,.2,1)}
    }`,
    waveText: `@keyframes waveText{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,
    ripple: `@keyframes ripple{0%{transform:scale(0.9);opacity:1}100%{transform:scale(1.1);opacity:0}}`,
    sparkle: `@keyframes sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}`,
    rotate: `@keyframes rotate{from{transform-origin:center;transform:rotate(0deg)}to{transform-origin:center;transform:rotate(360deg)}}`,
    shake: `@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`,
    neonFlicker: `@keyframes neonFlicker{
      0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;filter:drop-shadow(0 0 8px currentColor)}
      20%,24%,55%{opacity:0.4;filter:none}
    }`,
    colorShift: `@keyframes colorShift{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}`,
    reveal: `@keyframes reveal{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}`,
  };

  const durationMap: Record<string, number> = {
    fadeIn:1.2,scaleIn:0.8,slideInLeft:0.7,slideInRight:0.7,
    slideInTop:0.6,slideInBottom:0.6,blink:1.5,twinkling:3,
    typewriter:2,glitch:0.5,float:3,pulse:2,bounce:1,
    waveText:1.5,ripple:2,sparkle:1.5,rotate:8,shake:0.5,
    neonFlicker:2.5,colorShift:6,reveal:1.5,none:0,
  };

  if (animation === 'none') return '';
  const kf = keyframes[animation] ?? '';
  const durationBase = durationMap[animation] ?? 1;
  const iterations = ['blink','twinkling','float','pulse','bounce','rotate','neonFlicker','colorShift'].includes(animation) ? 'infinite' : '1';
  const fill = iterations === '1' ? 'both' : 'none';
  const timingFn = animation === 'bounce' ? 'cubic-bezier(.8,0,.2,1)' : 'ease';

  return `${kf}
    ${targetClass}{
      animation:${animation} ${dur(durationBase)} ${timingFn} ${d} ${iterations} ${fill};
    }`;
}
```

---

## 7. ALL 20 COLOR PRESETS (lib/svg/gradients.ts)

```typescript
export const COLOR_PRESETS: Record<string, string[]> = {
  sunset:      ['#FF6B6B','#FF8E53','#FFD93D'],
  ocean:       ['#0072ff','#00c6ff','#0072ff'],
  fire:        ['#f12711','#f5af19'],
  aurora:      ['#00C9FF','#92FE9D'],
  cyberpunk:   ['#FC00FF','#00DBDE'],
  pastel:      ['#FDDB92','#D1FDFF'],
  monochrome:  ['#434343','#000000'],
  neon:        ['#08AEEA','#2AF598'],
  earth:       ['#56ab2f','#a8e063'],
  candy:       ['#f953c6','#b91d73'],
  space:       ['#0f0c29','#302b63','#24243e'],
  forest:      ['#134E5E','#71B280'],
  sakura:      ['#FFB7C5','#FF8FAB','#FF6B9D'],
  midnight:    ['#0f2027','#203a43','#2c5364'],
  lava:        ['#200122','#6f0000'],
  mint:        ['#00b09b','#96c93d'],
  rose:        ['#f43b47','#453a94'],
  gold:        ['#F7971E','#FFD200'],
  ice:         ['#74ebd5','#ACB6E5'],
  toxic:       ['#0F9B58','#00F260'],
};

export function buildGradientDefs(params: BannerParams, w: number, h: number): string {
  let colors: string[];
  if (params.colorPreset && COLOR_PRESETS[params.colorPreset]) {
    colors = COLOR_PRESETS[params.colorPreset];
  } else if (params.color === 'random') {
    const keys = Object.keys(COLOR_PRESETS);
    colors = COLOR_PRESETS[keys[Math.floor(Math.random() * keys.length)]];
  } else if (params.color === 'auto' || params.color === 'gradient') {
    colors = COLOR_PRESETS.cyberpunk;
  } else if (params.gradientStops?.length) {
    colors = params.gradientStops.map(s => s.color);
  } else {
    colors = [params.color, params.color];
  }

  const stops = colors.map((c, i) => {
    const offset = colors.length === 1 ? 100 : Math.round((i / (colors.length-1)) * 100);
    return `<stop offset="${offset}%" stop-color="${c}"/>`;
  }).join('');

  const angle = params.gradientAngle ?? 0;
  const rad = (angle * Math.PI) / 180;
  const x1 = (50 - 50 * Math.cos(rad)).toFixed(1);
  const y1 = (50 - 50 * Math.sin(rad)).toFixed(1);
  const x2 = (50 + 50 * Math.cos(rad)).toFixed(1);
  const y2 = (50 + 50 * Math.sin(rad)).toFixed(1);

  let gradient = '';
  if (params.gradientType === 'radial') {
    gradient = `<radialGradient id="bg-gradient" cx="50%" cy="50%" r="60%">${stops}</radialGradient>`;
  } else if (params.gradientType === 'conic') {
    // SVG doesn't natively support conic, approximate with radial+linear overlay
    gradient = `<linearGradient id="bg-gradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stops}</linearGradient>`;
  } else {
    gradient = `<linearGradient id="bg-gradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stops}</linearGradient>`;
  }

  // Also generate a lighter and darker variant for cylinder shape
  const lighter = `<linearGradient id="bg-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.8"/>
    <stop offset="50%" stop-color="rgba(255,255,255,0.3)"/>
    <stop offset="100%" stop-color="${colors[colors.length-1]}" stop-opacity="0.8"/>
  </linearGradient>`;
  const darker = `<linearGradient id="bg-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="rgba(0,0,0,0.4)"/>
    <stop offset="50%" stop-color="${colors[0]}" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="rgba(0,0,0,0.4)"/>
  </linearGradient>`;

  return `<defs>${gradient}${lighter}${darker}</defs>`;
}
```

---

## 8. ALL 14 PATTERN DEFS (lib/svg/patterns.ts)

```typescript
export function buildPatternDef(
  pattern: PatternType,
  color: string,
  opacity: number,
  scale: number,
  angle: number
): string {
  if (pattern === 'none') return '';
  const c = color;
  const op = opacity;
  const s = scale;
  const rotate = `patternTransform="rotate(${angle})"`;

  const patterns: Record<string, string> = {
    dots: `<pattern id="pat" width="${8*s}" height="${8*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <circle cx="${4*s}" cy="${4*s}" r="${1.5*s}" fill="${c}" opacity="${op}"/>
    </pattern>`,
    grid: `<pattern id="pat" width="${20*s}" height="${20*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <path d="M ${20*s} 0 L 0 0 0 ${20*s}" fill="none" stroke="${c}" stroke-width="0.5" opacity="${op}"/>
    </pattern>`,
    diagonal: `<pattern id="pat" width="${10*s}" height="${10*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <line x1="0" y1="0" x2="${10*s}" y2="${10*s}" stroke="${c}" stroke-width="1" opacity="${op}"/>
    </pattern>`,
    circuit: `<pattern id="pat" width="${40*s}" height="${40*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <path d="M${5*s},${5*s} h${10*s} v${10*s} h${10*s}" fill="none" stroke="${c}" stroke-width="1" opacity="${op}"/>
      <circle cx="${5*s}" cy="${5*s}" r="${2*s}" fill="${c}" opacity="${op}"/>
      <circle cx="${25*s}" cy="${15*s}" r="${2*s}" fill="${c}" opacity="${op}"/>
    </pattern>`,
    hexagon: `<pattern id="pat" width="${30*s}" height="${26*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <polygon points="${15*s},2 ${28*s},9 ${28*s},19 ${15*s},26 2,19 2,9"
        fill="none" stroke="${c}" stroke-width="1" opacity="${op}"/>
    </pattern>`,
    noise: `<filter id="noise-filter"><feTurbulence type="fractalNoise" baseFrequency="${0.65/s}" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <pattern id="pat" width="100%" height="100%" patternUnits="userSpaceOnUse">
      <rect width="100%" height="100%" filter="url(#noise-filter)" opacity="${op}" fill="${c}"/>
    </pattern>`,
    stars: `<pattern id="pat" width="${50*s}" height="${50*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <circle cx="${5*s}" cy="${8*s}" r="${1*s}" fill="${c}" opacity="${op}"/>
      <circle cx="${20*s}" cy="${3*s}" r="${0.5*s}" fill="${c}" opacity="${op*0.7}"/>
      <circle cx="${35*s}" cy="${15*s}" r="${1.5*s}" fill="${c}" opacity="${op}"/>
      <circle cx="${45*s}" cy="${5*s}" r="${0.7*s}" fill="${c}" opacity="${op*0.5}"/>
      <circle cx="${12*s}" cy="${28*s}" r="${1*s}" fill="${c}" opacity="${op*0.8}"/>
      <circle cx="${40*s}" cy="${35*s}" r="${0.8*s}" fill="${c}" opacity="${op*0.6}"/>
    </pattern>`,
    rain: `<pattern id="pat" width="${15*s}" height="${30*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <line x1="${7*s}" y1="0" x2="${6*s}" y2="${15*s}" stroke="${c}" stroke-width="0.8" opacity="${op}"/>
    </pattern>`,
    bubbles: `<pattern id="pat" width="${40*s}" height="${40*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <circle cx="${10*s}" cy="${10*s}" r="${6*s}" fill="none" stroke="${c}" stroke-width="0.5" opacity="${op}"/>
      <circle cx="${30*s}" cy="${25*s}" r="${4*s}" fill="none" stroke="${c}" stroke-width="0.5" opacity="${op*0.7}"/>
      <circle cx="${5*s}" cy="${35*s}" r="${3*s}" fill="none" stroke="${c}" stroke-width="0.5" opacity="${op*0.5}"/>
    </pattern>`,
    crosshatch: `<pattern id="pat" width="${12*s}" height="${12*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <line x1="0" y1="0" x2="${12*s}" y2="${12*s}" stroke="${c}" stroke-width="0.5" opacity="${op}"/>
      <line x1="${12*s}" y1="0" x2="0" y2="${12*s}" stroke="${c}" stroke-width="0.5" opacity="${op}"/>
    </pattern>`,
    triangles: `<pattern id="pat" width="${20*s}" height="${17.3*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <polygon points="${10*s},0 ${20*s},${17.3*s} 0,${17.3*s}" fill="none" stroke="${c}" stroke-width="0.5" opacity="${op}"/>
    </pattern>`,
    waves: `<pattern id="pat" width="${40*s}" height="${12*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <path d="M0,${6*s} C${10*s},0 ${20*s},${12*s} ${40*s},${6*s}" fill="none" stroke="${c}" stroke-width="1" opacity="${op}"/>
    </pattern>`,
    codeLines: `<pattern id="pat" width="${200*s}" height="${20*s}" patternUnits="userSpaceOnUse" ${rotate}>
      <text x="0" y="${14*s}" fill="${c}" opacity="${op}" font-family="monospace" font-size="${10*s}">const hello = () =&gt; 'world';</text>
    </pattern>`,
  };

  const def = patterns[pattern];
  if (!def) return '';
  return `<defs>${def}</defs><rect width="100%" height="100%" fill="url(#pat)"/>`;
}
```

---

## 9. ALL OVERLAY EFFECTS (lib/svg/effects.ts)

```typescript
export function buildOverlayElement(
  overlay: OverlayType,
  w: number,
  h: number,
  opacity: number,
  color: string
): string {
  switch (overlay) {
    case 'gradient':
      return `<defs><linearGradient id="ovl" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="${opacity}"/>
      </linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#ovl)"/>`;

    case 'vignette':
      return `<defs><radialGradient id="vgn" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="transparent"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="${opacity}"/>
      </radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#vgn)"/>`;

    case 'scanlines':
      return `<defs><pattern id="scan" width="1" height="4" patternUnits="userSpaceOnUse">
        <rect width="1" height="2" fill="${color}" opacity="${opacity}"/>
      </pattern></defs>
      <rect width="${w}" height="${h}" fill="url(#scan)"/>`;

    case 'grain':
      return `<defs><filter id="grain-f">
        <feTurbulence type="turbulence" baseFrequency="0.65" numOctaves="3" result="noise"/>
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
        <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay"/>
      </filter></defs>
      <rect width="${w}" height="${h}" filter="url(#grain-f)" opacity="${opacity}"/>`;

    case 'frost':
      return `<defs><filter id="frost-f">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter></defs>
      <rect width="${w}" height="${h}" fill="rgba(255,255,255,0.05)" filter="url(#frost-f)" opacity="${opacity}"/>`;

    case 'holographic':
      return `<defs><linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,0,255,0.15)"/>
        <stop offset="25%" stop-color="rgba(0,255,255,0.15)"/>
        <stop offset="50%" stop-color="rgba(255,255,0,0.15)"/>
        <stop offset="75%" stop-color="rgba(0,255,128,0.15)"/>
        <stop offset="100%" stop-color="rgba(255,0,255,0.15)"/>
      </linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#holo)" opacity="${opacity}"/>`;

    case 'glitch':
      return `<g opacity="${opacity}">
        <rect x="0" y="${h*0.3}" width="${w}" height="${h*0.05}" fill="${color}" opacity="0.3" style="transform:translateX(5px)"/>
        <rect x="0" y="${h*0.6}" width="${w*0.7}" height="${h*0.03}" fill="${color}" opacity="0.2" style="transform:translateX(-3px)"/>
      </g>`;

    default:
      return '';
  }
}

export function buildFilterDefs(params: BannerParams): { defs: string; filterAttr: string } {
  const filters: string[] = [];
  const filterParts: string[] = [];
  let filterAttr = '';

  if (params.blur > 0) {
    filterParts.push(`<feGaussianBlur stdDeviation="${params.blur}"/>`);
  }
  if (params.brightness !== 1 || params.contrast !== 1 || params.saturation !== 1) {
    filterParts.push(`<feColorMatrix type="matrix" values="${params.contrast} 0 0 0 ${(1-params.contrast)/2}  0 ${params.contrast} 0 0 ${(1-params.contrast)/2}  0 0 ${params.contrast} 0 ${(1-params.contrast)/2}  0 0 0 ${params.brightness} 0"/>`);
  }
  if (params.hueRotate > 0) {
    filterParts.push(`<feColorMatrix type="hueRotate" values="${params.hueRotate}"/>`);
  }

  if (params.shadow === 'glow' || params.shadow === 'neon') {
    const gc = params.glowColor || '#ffffff';
    const gr = params.glowRadius || 15;
    filters.push(`<filter id="glow"><feGaussianBlur stdDeviation="${gr}" result="blur"/>
      <feFlood flood-color="${gc}" result="color"/>
      <feComposite in="color" in2="blur" operator="in" result="shadow"/>
      <feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`);
    filterAttr = `filter="url(#glow)"`;
  }

  if (params.shadow === 'soft' || params.shadow === 'hard') {
    const spread = params.shadow === 'hard' ? 1 : 4;
    filters.push(`<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${params.shadowBlur || spread}"/>
      <feOffset dx="${params.shadowX || 0}" dy="${params.shadowY || 5}"/>
      <feFlood flood-color="${params.shadowColor || '#000000'}" flood-opacity="0.5"/>
      <feComposite in2="SourceAlpha" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`);
    if (!filterAttr) filterAttr = `filter="url(#shadow)"`;
  }

  if (filterParts.length) {
    filters.push(`<filter id="main-filter">${filterParts.join('')}</filter>`);
  }

  return { defs: filters.join('\n'), filterAttr };
}
```

---

## 10. PARTICLE SYSTEM (lib/svg/particles.ts)

```typescript
export function buildParticles(
  type: ParticleType,
  count: number,
  color: string,
  size: number,
  opacity: number,
  w: number,
  h: number
): string {
  if (type === 'none' || count === 0) return '';

  const particles: string[] = [];
  const kf = buildParticleKeyframes(type, h);

  for (let i = 0; i < count; i++) {
    // Use deterministic "random" based on index for SSR consistency
    const seed = (i * 2654435761) >>> 0;
    const px = (seed % 1000) / 10;              // 0–100%
    const py = ((seed * 1234567) % 1000) / 10;  // 0–100%
    const delay = ((seed * 987) % 5000);         // 0–5000ms
    const dur = 2000 + ((seed * 456) % 4000);   // 2–6s
    const sz = size * (0.5 + ((seed * 321) % 100) / 200);
    const op = opacity * (0.4 + ((seed * 111) % 60) / 100);

    const elem = buildParticleElement(type, color, sz, op, px, py, delay, dur, i, w, h);
    if (elem) particles.push(elem);
  }

  return `<style>${kf}</style><g class="particles">${particles.join('')}</g>`;
}

function buildParticleElement(
  type: ParticleType, color: string, size: number, opacity: number,
  px: number, py: number, delay: number, dur: number, i: number, w: number, h: number
): string {
  const x = (px / 100) * w;
  const y = (py / 100) * h;
  const common = `opacity="${opacity}" style="animation-delay:${delay}ms;animation-duration:${dur}ms"`;

  switch (type) {
    case 'stars':
      return `<circle class="p-star" cx="${x}" cy="${y}" r="${size}" fill="${color}" ${common}/>`;
    case 'snowflakes':
      return `<text class="p-snow" x="${x}" y="${y}" fill="${color}" font-size="${size*3}" ${common}>❄</text>`;
    case 'bubbles':
      return `<circle class="p-bubble" cx="${x}" cy="${y}" r="${size*2}" fill="none" stroke="${color}" stroke-width="1" ${common}/>`;
    case 'confetti':
      const colors = ['#ff6b6b','#4ecdc4','#ffe66d','#a8e6cf','#ff8b94'];
      const cc = colors[i % colors.length];
      return `<rect class="p-confetti" x="${x}" y="${y}" width="${size*2}" height="${size}" fill="${cc}" ${common} transform="rotate(${(i*37)%360} ${x} ${y})"/>`;
    case 'sparkles':
      return `<text class="p-sparkle" x="${x}" y="${y}" fill="${color}" font-size="${size*3}" ${common}>✦</text>`;
    case 'embers':
      return `<circle class="p-ember" cx="${x}" cy="${y}" r="${size*0.7}" fill="${color}" ${common}/>`;
    case 'matrix':
      const bit = i % 2 === 0 ? '0' : '1';
      return `<text class="p-matrix" x="${x}" y="${y}" fill="${color}" font-family="monospace" font-size="${size*2}" ${common}>${bit}</text>`;
    case 'hearts':
      return `<text class="p-heart" x="${x}" y="${y}" fill="${color}" font-size="${size*2.5}" ${common}>♥</text>`;
    case 'fireflies':
      return `<circle class="p-firefly" cx="${x}" cy="${y}" r="${size*0.5}" fill="${color}" filter="url(#glow)" ${common}/>`;
    default:
      return '';
  }
}

function buildParticleKeyframes(type: ParticleType, h: number): string {
  switch (type) {
    case 'stars': case 'sparkles':
      return `@keyframes p-star{0%,100%{opacity:0.1}50%{opacity:1}} .p-star,.p-sparkle{animation:p-star var(--dur,3s) ease-in-out infinite;}`;
    case 'snowflakes':
      return `@keyframes p-snow{0%{transform:translateY(-20px);opacity:0}10%{opacity:1}90%{opacity:0.8}100%{transform:translateY(${h+20}px);opacity:0}} .p-snow{animation:p-snow var(--dur,4s) linear infinite;}`;
    case 'bubbles':
      return `@keyframes p-bubble{0%{transform:translateY(0) scale(1);opacity:0.6}100%{transform:translateY(-${h}px) scale(1.5);opacity:0}} .p-bubble{animation:p-bubble var(--dur,4s) ease-in infinite;}`;
    case 'confetti':
      return `@keyframes p-confetti{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(${h+20}px) rotate(720deg);opacity:0}} .p-confetti{animation:p-confetti var(--dur,3s) linear infinite;}`;
    case 'embers':
      return `@keyframes p-ember{0%{transform:translate(0,0);opacity:0.8}50%{transform:translate(${Math.random()*20-10}px,-30px);opacity:1}100%{transform:translate(${Math.random()*30-15}px,-80px);opacity:0}} .p-ember{animation:p-ember var(--dur,2.5s) ease-out infinite;}`;
    case 'matrix':
      return `@keyframes p-matrix{0%{opacity:0;transform:translateY(-10px)}20%{opacity:1}80%{opacity:0.5}100%{opacity:0;transform:translateY(${h+10}px)}} .p-matrix{animation:p-matrix var(--dur,3s) linear infinite;}`;
    case 'hearts':
      return `@keyframes p-heart{0%{transform:scale(0.5) translateY(0);opacity:0}30%{opacity:1}100%{transform:scale(1.2) translateY(-${h*0.6}px);opacity:0}} .p-heart{animation:p-heart var(--dur,3s) ease-out infinite;}`;
    case 'fireflies':
      return `@keyframes p-firefly{0%,100%{opacity:0}50%{opacity:1}} .p-firefly{animation:p-firefly var(--dur,2s) ease-in-out infinite;}`;
    default:
      return '';
  }
}
```

---

## 11. ICON SUPPORT (lib/svg/icons.ts)

Include SVG paths for top 60 developer icons from simple-icons:
react, typescript, javascript, python, nextjs, nodejs, tailwindcss, git,
github, gitlab, docker, kubernetes, aws, gcp, azure, vercel, linux,
rust, go, cpp, java, kotlin, swift, flutter, dart, vue, angular,
svelte, graphql, postgresql, mongodb, redis, mysql, firebase, supabase,
figma, vscode, vim, neovim, bash, nginx, webpack, vite, jest, cypress,
prisma, drizzle, astro, remix, expo, electron, tensorflow, pytorch,
openai, anthropic, claude, cloudflare, netlify, heroku.

For each icon, store:

```typescript
export interface IconDef {
  slug: string;
  title: string;
  path: string;  // SVG path d attribute (from simple-icons)
  hex: string;   // Brand color
  viewBox: string; // Usually "0 0 24 24"
}
```

The icon renderer:

```typescript
export function renderIcon(
  icon: IconLayer,
  defs: IconDef[],
  containerW: number,
  containerH: number
): string {
  const def = defs.find(d => d.slug === icon.slug);
  if (!def) return '';

  const color = icon.color === 'original' ? `#${def.hex}` : icon.color;
  const [vx, vy, vw, vh] = def.viewBox.split(' ').map(Number);

  // Calculate position from IconPosition
  const posMap: Record<IconPosition, [number, number]> = {
    'top-left':       [10, 10],
    'top-center':     [containerW/2 - icon.size/2, 10],
    'top-right':      [containerW - icon.size - 10, 10],
    'middle-left':    [10, containerH/2 - icon.size/2],
    'middle-center':  [containerW/2 - icon.size/2, containerH/2 - icon.size/2],
    'middle-right':   [containerW - icon.size - 10, containerH/2 - icon.size/2],
    'bottom-left':    [10, containerH - icon.size - 10],
    'bottom-center':  [containerW/2 - icon.size/2, containerH - icon.size - 10],
    'bottom-right':   [containerW - icon.size - 10, containerH - icon.size - 10],
  };

  const [x, y] = posMap[icon.position];
  const finalX = x + icon.offsetX;
  const finalY = y + icon.offsetY;
  const scale = icon.size / Math.max(vw, vh);

  return `<g transform="translate(${finalX} ${finalY}) scale(${scale})" opacity="${icon.opacity}">
    <path d="${def.path}" fill="${color}"/>
  </g>`;
}
```

---

## 12. MAIN SVG GENERATOR (lib/svg/generator.ts)

```typescript
import { BannerParams } from '@/types/banner';
import { SHAPE_RENDERERS } from './shapes';
import { buildGradientDefs } from './gradients';
import { buildPatternDef } from './patterns';
import { buildOverlayElement, buildFilterDefs } from './effects';
import { buildParticles } from './particles';
import { renderIcon } from './icons';
import { getAnimationCSS } from './animations';
import { getFontImportCSS } from './fonts';
import { DEFAULT_PARAMS } from '@/constants/defaults';

export function generateSVG(params: BannerParams): string {
  const p = { ...DEFAULT_PARAMS, ...params };
  const W = typeof p.width === 'number' ? p.width : 900;
  const H = p.height;

  // 1. Build gradient defs
  const gradientDefs = buildGradientDefs(p, W, H);

  // 2. Render shape
  const shapeFn = SHAPE_RENDERERS[p.type] ?? SHAPE_RENDERERS.waving;
  const shape = shapeFn(W, H, p.reverseColor);

  // 3. Build pattern
  const patternSVG = buildPatternDef(p.pattern, p.patternColor, p.patternOpacity, p.patternScale, p.patternAngle);

  // 4. Build effects/filters
  const { defs: filterDefs, filterAttr } = buildFilterDefs(p);

  // 5. Build overlay
  const overlaySVG = buildOverlayElement(p.overlay, W, H, p.overlayOpacity, p.overlayColor);

  // 6. Build particles
  const particlesSVG = buildParticles(p.particles, p.particleCount, p.particleColor, p.particleSize, p.particleOpacity, W, H);

  // 7. Build font CSS
  const fontCSS = getFontImportCSS(p.textLayers.map(t => t.fontFamily));

  // 8. Build animations CSS
  const animCSS = p.textLayers.map((layer, i) =>
    getAnimationCSS(layer.animation, p.animationSpeed ?? 1, layer.animationDelay, `.tl-${layer.id}`)
  ).join('\n');

  // 9. Render text layers
  const textLayersSVG = p.textLayers
    .filter(t => t.visible && t.text)
    .map(layer => renderTextLayer(layer, W, H))
    .join('\n');

  // 10. Render icon layers
  const iconLayersSVG = p.iconLayers
    .filter(ic => ic.visible && ic.slug)
    .map(ic => renderIcon(ic, ICON_DEFS, W, H))
    .join('\n');

  // 11. Build stroke
  const strokeSVG = p.strokeWidth > 0
    ? `<rect width="${W}" height="${H}" fill="none" stroke="${p.strokeColor}" stroke-width="${p.strokeWidth}"/>`
    : '';

  // 12. Rotate/flip transform
  const transform = p.rotate ? `transform="rotate(${p.rotate} ${W/2} ${H/2})"` : '';

  // 13. Assemble
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    width="100%" height="${H}" viewBox="${shape.viewBox}"
    role="img" aria-label="${escapeXML(p.textLayers[0]?.text || 'BannerForge')}"
    ${filterAttr}>
  <title>${escapeXML(p.textLayers[0]?.text || 'BannerForge')}</title>

  ${gradientDefs}
  <defs>
    ${shape.defs}
    ${filterDefs}
  </defs>

  <style>
    ${fontCSS}
    ${animCSS}
  </style>

  <g ${transform}>
    <!-- Background Shape -->
    ${shape.background}

    <!-- Pattern Overlay -->
    ${patternSVG}

    <!-- Particles -->
    ${particlesSVG}

    <!-- Overlay Effect -->
    ${overlaySVG}

    <!-- Text Layers -->
    ${textLayersSVG}

    <!-- Icon Layers -->
    ${iconLayersSVG}

    <!-- Stroke Border -->
    ${strokeSVG}

    <!-- Shape Decorations -->
    ${shape.topDecoration ?? ''}
    ${shape.botDecoration ?? ''}
  </g>
</svg>`;
}

function renderTextLayer(layer: TextLayer, W: number, H: number): string {
  const x = (layer.alignX / 100) * W;
  const y = (layer.alignY / 100) * H;
  const anchor = layer.fontAlign === 'left' ? 'start' : layer.fontAlign === 'right' ? 'end' : 'middle';

  let fill: string;
  if (layer.gradient && layer.gradientColors.length >= 2) {
    const stops = layer.gradientColors.map((c, i) =>
      `<stop offset="${Math.round(i/(layer.gradientColors.length-1)*100)}%" stop-color="${c}"/>`
    ).join('');
    fill = `url(#text-grad-${layer.id})`;
    // Add to defs (handled in generator)
  } else {
    fill = layer.fontColor;
  }

  const filters: string[] = [];
  if (layer.textShadow) {
    filters.push(`drop-shadow(${layer.textShadowX}px ${layer.textShadowY}px ${layer.textShadowBlur}px ${layer.textShadowColor})`);
  }
  if (layer.glowEffect) {
    filters.push(`drop-shadow(0 0 ${layer.glowRadius}px ${layer.glowColor})`);
  }
  const filterStyle = filters.length ? `filter:${filters.join(' ')};` : '';

  const stroke = layer.textStroke
    ? `paint-order="stroke" stroke="${layer.textStrokeColor}" stroke-width="${layer.textStrokeWidth}" stroke-linejoin="round"`
    : '';

  return `<text
    class="tl-${layer.id}"
    x="${x}" y="${y}"
    text-anchor="${anchor}"
    fill="${fill}"
    font-size="${layer.fontSize}"
    font-family="${escapeXML(layer.fontFamily)}, sans-serif"
    font-weight="${layer.fontWeight}"
    font-style="${layer.fontStyle}"
    letter-spacing="${layer.letterSpacing}"
    opacity="${layer.opacity}"
    transform="rotate(${layer.rotate} ${x} ${y})"
    style="${filterStyle}text-transform:${layer.textTransform};text-decoration:${layer.textDecoration};"
    ${stroke}
  >${escapeXML(layer.text)}</text>`;
}

function escapeXML(str: string): string {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}
```

---

## 13. FONT EMBEDDING (lib/svg/fonts.ts)

```typescript
// Top 30 Google Fonts that work well in SVG banners
export const AVAILABLE_FONTS = [
  'Roboto','Open Sans','Montserrat','Oswald','Raleway',
  'Nunito','Poppins','Playfair Display','Merriweather','Lato',
  'Source Code Pro','JetBrains Mono','Space Mono','Fira Code','IBM Plex Mono',
  'Orbitron','Exo 2','Rajdhani','Teko','Anton',
  'Bebas Neue','Righteous','Fredoka One','Pacifico','Dancing Script',
  'Cinzel','Philosopher','Lobster','Press Start 2P','VT323',
];

export function getFontImportCSS(families: string[]): string {
  const unique = [...new Set(families)].filter(f => AVAILABLE_FONTS.includes(f));
  if (!unique.length) return '';
  const query = unique.map(f => `family=${encodeURIComponent(f)}:wght@100;200;300;400;500;600;700;800;900`).join('&amp;');
  return `@import url('https://fonts.googleapis.com/css2?${query}&amp;display=swap');`;
}
```

---

## 14. BUILDER STATE (lib/store/builder.ts)

```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { BannerParams, TextLayer, IconLayer } from '@/types/banner';
import { DEFAULT_PARAMS, DEFAULT_TEXT_LAYER } from '@/constants/defaults';
import { nanoid } from 'nanoid';

interface BuilderStore {
  params: BannerParams;
  activeTextLayerId: string | null;
  activeIconLayerId: string | null;
  history: BannerParams[];
  historyIndex: number;
  isDirty: boolean;

  // Shape
  setShape: (type: ShapeType) => void;
  setHeight: (h: number) => void;
  setWidth: (w: number | 'auto') => void;
  setRotate: (r: number) => void;
  setSection: (s: Section) => void;
  setReverseColor: (v: boolean) => void;

  // Color
  setColor: (c: string) => void;
  setColorPreset: (p: ColorPreset | undefined) => void;
  setGradientAngle: (a: number) => void;
  setGradientType: (t: BannerParams['gradientType']) => void;
  setGradientStops: (stops: GradientStop[]) => void;
  setStroke: (width: number, color: string) => void;

  // Text Layers
  addTextLayer: () => void;
  removeTextLayer: (id: string) => void;
  updateTextLayer: (id: string, updates: Partial<TextLayer>) => void;
  setActiveTextLayer: (id: string | null) => void;
  reorderTextLayers: (from: number, to: number) => void;

  // Icon Layers
  addIconLayer: (slug: string) => void;
  removeIconLayer: (id: string) => void;
  updateIconLayer: (id: string, updates: Partial<IconLayer>) => void;
  setActiveIconLayer: (id: string | null) => void;

  // Animation
  setAnimation: (layerId: string, animation: AnimationType) => void;
  setAnimationSpeed: (speed: number) => void;
  setAnimationDelay: (layerId: string, delay: number) => void;

  // Pattern
  setPattern: (p: PatternType) => void;
  setPatternColor: (c: string) => void;
  setPatternOpacity: (o: number) => void;
  setPatternScale: (s: number) => void;

  // Particles
  setParticles: (p: ParticleType) => void;
  setParticleCount: (n: number) => void;
  setParticleColor: (c: string) => void;
  setParticleSize: (s: number) => void;
  setParticleOpacity: (o: number) => void;

  // Effects
  setOverlay: (o: OverlayType) => void;
  setOverlayOpacity: (o: number) => void;
  setBlur: (b: number) => void;
  setShadow: (s: ShadowType) => void;
  setBrightness: (b: number) => void;
  setContrast: (c: number) => void;
  setSaturation: (s: number) => void;
  setHueRotate: (h: number) => void;
  setGlow: (color: string, radius: number) => void;

  // History
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;

  // Reset
  reset: () => void;
  loadPreset: (params: Partial<BannerParams>) => void;

  // Computed
  getBannerURL: () => string;
  getMarkdown: () => string;
  getHTML: () => string;
}
```

---

## 15. BUILDER UI — COMPLETE COMPONENT SPECS

### BuilderLayout.tsx

```
3-column layout:
- Left column: 340px fixed, dark bg, scrollable, contains ControlPanel
- Center column: flexible, grid background, contains PreviewPanel
- Right column: 320px fixed, dark bg, contains OutputPanel

Mobile: stacked layout with drawer for controls
Responsive breakpoint: 768px (tablet), 1200px (desktop)
```

### ControlPanel Tabs (9 tabs)

```
Tab icons + labels:
1. Shapes     (grid icon)
2. Colors     (palette icon)
3. Text       (type icon)
4. Animation  (zap icon)
5. Patterns   (hash icon)
6. Particles  (sparkles icon)
7. Effects    (wand icon)
8. Icons      (star icon)
9. Export     (download icon)
```

### ShapeTab — Visual grid of all 35 shapes

```
- 5 columns × 7 rows thumbnail grid
- Each thumbnail is a 60×40px mini SVG preview
- Hover: subtle glow + scale 1.05
- Selected: electric blue ring border + checkmark badge
- Shape name below each thumbnail
- Click instantly applies shape + updates preview
```

### ColorTab

```
Sections:
1. "Preset Colors" — 4×5 grid of circular gradient swatches (all 20 presets)
   Click to apply. Tooltip shows preset name.

2. "Custom Gradient" — GradientBuilder component:
   - Add/remove/reorder gradient stops
   - Each stop has: color picker (react-colorful) + position slider
   - Live gradient preview bar at top
   - Gradient type selector: Linear / Radial / Conic
   - Angle dial (0–360) for linear gradients

3. "Solid Color" — Single react-colorful picker + hex input + opacity

4. Options row: Gradient Angle slider, Stroke Width + Color
```

### TextTab

```
- Layer list at top with +Add button and drag handles
- Active layer editor below:
  * Text input (multiline)
  * Font family dropdown (searchable, shows font preview)
  * Font size slider (8–150) + numeric input
  * Font weight selector (100–900 options)
  * Font style: Normal / Italic
  * Text transform: None / Uppercase / Lowercase
  * Letter spacing slider
  * Color picker for text fill
  * Alignment: L/C/R buttons + X position slider + Y position slider
  * Text gradient toggle: when on, shows mini gradient builder
  * Text shadow toggle: when on, shows color/blur/offset controls
  * Text glow toggle: when on, shows color + radius
  * Text stroke toggle: when on, shows color + width
  * Rotation slider (-180 to 180)
  * Opacity slider (0–1)
```

### AnimationTab

```
- Animation selector: visual card grid showing animation name + icon
  Animations: None, FadeIn, ScaleIn, SlideIn (4 directions), Blink,
  Twinkling, Typewriter, Glitch, Float, Pulse, Bounce, Wave Text,
  Ripple, Sparkle, Rotate, Shake, Neon Flicker, Color Shift, Reveal

- Speed slider (0.1–5x)
- Delay slider (0–3000ms)
- Per-layer: apply animation to each text layer separately
- Preview button: re-triggers animation in preview
```

### PatternTab

```
- Pattern type: 14-card visual grid (like shape tab)
- Pattern color picker
- Opacity slider (0–1)
- Scale slider (0.1–5)
- Angle rotation dial
```

### ParticlesTab

```
- Particle type selector: visual card grid
  Types: None, Stars, Snowflakes, Bubbles, Confetti, Sparkles, 
         Embers, Matrix, Hearts, Fireflies

- Count slider (0–200)
- Color picker
- Size slider (1–20)
- Speed slider
- Opacity slider
```

### EffectsTab

```
4 sections with toggles:
1. Overlay: type selector + opacity + color
2. Blur: slider (0–30)
3. Shadow: type selector + blur/offset/color
4. Color Adjust: brightness/contrast/saturation/hue-rotate sliders (all 0–360 or 0–3)
```

### IconTab

```
- Search box to filter icons (searches by slug + title)
- Results grid of icon cards (show SVG icon + name)
- Click to add as icon layer
- Per-icon layer controls:
  * Color picker (or "Brand Color" option)
  * Size slider
  * Position: 3×3 grid selector (top-left, top-center, etc.)
  * Fine offset X/Y sliders
  * Opacity slider
  * Animation picker
```

### ExportTab

```
Sections:
1. Copy URL button (with domain selector: localhost / bannerforge.vercel.app)
2. Copy Markdown snippet with syntax highlighting
3. Copy HTML snippet
4. Download buttons:
   - .svg (client-side, instant)
   - .png (calls /api/export/png, shows size options: 1x/2x/4x)
   - .gif (calls /api/export/gif, shows progress bar)
   - .webp (calls /api/export/webp)
5. Share: generate a short sharable link
6. README Preview button: opens modal showing banner in a fake GitHub README layout
```

---

## 16. PREVIEW PANEL — COMPLETE SPEC

```
- Shows a live <img src={bannerUrl}> that updates on param change (300ms debounce)
- Dark/Light toggle shows either:
  * Dark: dark gray background (#0d1117 — GitHub dark)
  * Light: white background (#ffffff — GitHub light)
- Responsive width options: 100% / 50% / 900px / 1200px
- Zoom controls: 50% / 75% / 100% / 125% / 150%
- "Open in new tab" button
- Shows current dimensions badge (e.g. "900 × 300px")
- Below preview: shows Markdown preview in a GitHub-styled README mock
  (gray card with octicon, filename "README.md", monospace code block showing the banner)
- Loading state: skeleton pulse while SVG loads
- Error state: shows error SVG gracefully
```

---

## 17. OUTPUT PANEL — COMPLETE SPEC

```
3 tabs: Markdown | HTML | URL

Markdown tab:
```

![header](https://bannerforge.vercel.app/api/banner?type=waving&...)

```
- Syntax highlighted code block
- One-click copy with sonner toast
- Character count shown

HTML tab:
```html
<img src="https://bannerforge.vercel.app/api/banner?..." 
     alt="Header" width="100%" />
```

URL tab:

- Raw URL in monospace
- Copy button
- QR code of URL (optional)
- Character count

Below the tabs:

- Export section with 4 download buttons (SVG, PNG, GIF, WebP)
- PNG quality slider (60–100)
- PNG scale selector (1x/2x/4x)
- GIF frame count (5/10/20 frames) and loop toggle

```

---

## 18. GALLERY PAGE (app/gallery/page.tsx)

```

Route: /gallery
Title: "Gallery — Browse 25+ Presets"

Layout:

- Masonry-style grid, 3 cols desktop / 2 cols tablet / 1 col mobile
- Each card shows the actual banner SVG rendered in an <img>
- Card hover: slight lift + "Use This" button appears
- Card click: navigates to /builder?preset=<id>
- Category filter tabs: All | Minimal | Colorful | Animated | Dark | Retro | Neon
- Search by name

Required presets (implement all 25+):

1. "Classic Wave" — waving, ocean gradient, "Hello World"
2. "Cyberpunk Grid" — grid shape, cyberpunk colors, Orbitron font
3. "Fire & Ice" — fire shape, lava preset, glitch animation
4. "Terminal Hacker" — terminal shape, monochrome, JetBrains Mono, matrix particles
5. "Mountain Sunset" — mountain shape, sunset preset, float animation
6. "Neon Glow" — neon shape, neon preset, neonFlicker animation
7. "Minimal Ribbon" — ribbon shape, monochrome, fadeIn
8. "Aurora Dreams" — aurora shape, aurora preset, stars particles
9. "City Lights" — city shape, midnight preset, sparkles particles
10. "Galaxy Core" — galaxy shape, space preset, twinkling animation
11. "Circuit Board" — circuit shape, toxic preset, pulse animation
12. "DNA Helix" — dna shape, ocean preset, rotate animation
13. "Binary Rain" — binary shape, forest preset, matrix particles
14. "Sakura Bloom" — bloom shape, sakura preset, float animation
15. "Diamond Edge" — diamond, rose preset, scaleIn animation
16. "Terminal Green" — terminal shape, mint preset, typewriter animation
17. "Paper Craft" — paper shape, pastel preset, slideInLeft
18. "Hexagon Tech" — hexagon shape, neon preset, sparkle particles
19. "Lightning Strike" — lightning shape, fire preset, bounce animation
20. "Vortex Dark" — vortex shape, space preset, rotate animation
21. "Shield Badge" — shield shape, gold preset, reveal animation
22. "Speech Bubble" — speech shape, candy preset, bounce animation
23. "Glitch Wave" — glitch shape, cyberpunk preset, glitch animation
24. "Arch Bridge" — arch shape, earth preset, fadeIn
25. "Frost Glass" — rounded shape, ice preset, frost overlay

```

---

## 19. LANDING PAGE (app/page.tsx)

```

Full-page landing with 4 sections:

HERO:

- Large gradient headline: "The Most Powerful GitHub README Banner Generator"
- Subline: "35+ shapes. 22 animations. 10 particle types. Zero-config API."
- Two CTAs: "Open Builder" (primary) + "View API Docs" (ghost)
- Animated demo banner cycling through 5 presets every 3s
- Scroll indicator

FEATURES GRID:

- 6-card grid showing key differentiators vs capsule-render:
  - "35+ Unique Shapes" with shape thumbnails
  - "22 Animations" with animation preview
  - "Multi-Layer Text" showing stacked text example
  - "Particle Systems" showing particle types
  - "One URL, Any Format" SVG/PNG/GIF/WebP
  - "Visual Builder" showing builder screenshot

LIVE EXAMPLES:

- Horizontal scrolling carousel of 8 example banners
- Each one auto-plays its animation on hover

HOW IT WORKS:

- 3-step explanation with icons:
  1. Design — Use the visual builder or craft the URL directly
  2. Copy — Get Markdown/HTML/URL in one click
  3. Paste — Drop it into your README. Done.

FOOTER:

- GitHub link, documentation, API reference
- "Built with ❤️ by BannerForge"

```

---

## 20. API DOCUMENTATION PAGE (app/docs/page.tsx)

```

Full API reference with:

- All query parameters in a searchable table
- Live URL builder: change params and see URL update in real-time
- Example code snippets (Markdown / HTML / cURL / JavaScript fetch)
- Changelog section
- Rate limits notice (none — open API)

```

---

## 21. EXPORT ROUTES

### PNG Export (app/api/export/png/route.ts)
```typescript
// Accept same params as /api/banner
// Generate SVG string
// Use @vercel/og or sharp to rasterize SVG to PNG
// Return PNG with Content-Type: image/png
// Support ?scale=1|2|4 for retina
// Support ?quality=60-100
```

### GIF Export (app/api/export/gif/route.ts)

```typescript
// Accept same params + ?frames=10&fps=10&loop=true
// Generate multiple SVG frames (for animations that support frame-by-frame)
// Use gifenc to encode frames into animated GIF
// Return GIF with Content-Type: image/gif
```

### WebP Export (app/api/export/webp/route.ts)

```typescript
// Same as PNG but output WebP via sharp
// Content-Type: image/webp
```

---

## 22. GITHUB SVG COMPATIBILITY RULES

GitHub sanitizes SVGs. The generator MUST follow these rules:

1. ✅ CSS `@keyframes` animations ARE allowed
2. ✅ `<animate>` and `<animateTransform>` ARE allowed  
3. ✅ `<filter>` with `feGaussianBlur`, `feColorMatrix`, `feMerge` ARE allowed
4. ✅ Inline `<style>` blocks ARE allowed
5. ✅ `@import url()` for Google Fonts IS allowed (render on page load)
6. ✅ `gradientUnits="userSpaceOnUse"` and `patternUnits` work fine
7. ❌ `<script>` tags are STRIPPED
8. ❌ `<foreignObject>` is STRIPPED
9. ❌ External `<image>` with `href` may be blocked — use inline paths for icons
10. ❌ CSS `animation-play-state` may be ignored
11. ✅ `clip-path` works
12. ✅ `<mask>` works
13. ✅ `transform` and `transform-origin` work

Test every shape and animation against GitHub's SVG sanitizer.

---

## 23. PERFORMANCE & CACHING

```
- API route: edge runtime for minimal cold start
- Cache-Control: public, max-age=86400 (24h), stale-while-revalidate=604800
- Vary: nothing (all params in URL)
- Builder: 300ms debounce on param change before preview update
- Preview: <img> with loading="lazy" and decoding="async"
- Bundle: dynamic imports for color picker and drag-drop (not needed server-side)
- Fonts: preconnect to fonts.googleapis.com and fonts.gstatic.com in layout
```

---

## 24. TAILWIND CONFIG (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        bg:      '#0A0A0F',
        panel:   '#111118',
        border:  'rgba(255,255,255,0.06)',
        accent:  '#3B82F6',
        accent2: '#8B5CF6',
        muted:   '#6B7280',
        surface: '#1a1a24',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(59,130,246,0.3)',
        panel: '0 0 0 1px rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 25. DEFAULT PARAMS (constants/defaults.ts)

```typescript
import { nanoid } from 'nanoid';

export const DEFAULT_TEXT_LAYER: TextLayer = {
  id: nanoid(),
  text: 'Hello World',
  fontSize: 70,
  fontColor: '#ffffff',
  fontFamily: 'Montserrat',
  fontWeight: 700,
  fontStyle: 'normal',
  fontAlign: 'center',
  alignX: 50,
  alignY: 45,
  letterSpacing: 0,
  lineHeight: 1.2,
  textTransform: 'none',
  textDecoration: 'none',
  textShadow: false,
  textShadowColor: '#000000',
  textShadowBlur: 8,
  textShadowX: 2,
  textShadowY: 2,
  textStroke: false,
  textStrokeColor: '#000000',
  textStrokeWidth: 1,
  animation: 'fadeIn',
  animationDelay: 0,
  animationDuration: 1200,
  opacity: 1,
  rotate: 0,
  visible: true,
  gradient: false,
  gradientColors: ['#ffffff', '#aaaaaa'],
  gradientAngle: 90,
  glowEffect: false,
  glowColor: '#ffffff',
  glowRadius: 10,
};

export const DEFAULT_PARAMS: BannerParams = {
  type: 'waving',
  section: 'header',
  height: 300,
  width: 'auto',
  rotate: 0,
  reverseColor: false,
  color: 'gradient',
  colorPreset: 'cyberpunk',
  gradientAngle: 135,
  gradientType: 'linear',
  gradientStops: [],
  strokeWidth: 0,
  strokeColor: '#ffffff',
  textLayers: [DEFAULT_TEXT_LAYER],
  iconLayers: [],
  pattern: 'none',
  patternColor: '#ffffff',
  patternOpacity: 0.1,
  patternScale: 1,
  patternAngle: 0,
  particles: 'none',
  particleCount: 50,
  particleColor: '#ffffff',
  particleSize: 3,
  particleSpeed: 1,
  particleOpacity: 0.6,
  overlay: 'none',
  overlayOpacity: 0.3,
  overlayColor: '#000000',
  blur: 0,
  shadow: 'none',
  shadowColor: '#000000',
  shadowBlur: 10,
  shadowX: 0,
  shadowY: 5,
  glowColor: '#ffffff',
  glowRadius: 0,
  brightness: 1,
  contrast: 1,
  saturation: 1,
  hueRotate: 0,
  blendMode: 'normal',
  theme: 'dark',
};
```

---

## 26. ERROR HANDLING — ALL CASES

```
1. Invalid shape type → fallback to 'waving'
2. Height out of range → clamp to 60–600
3. Width out of range → clamp to 100–2000 or 'auto'
4. Invalid color hex → fallback to '#ffffff'
5. Text too long → truncate at 200 chars with ellipsis
6. Font not in allowlist → fallback to 'Montserrat'
7. fontSize > 150 → clamp to 150
8. Invalid gradient stop format → skip that stop
9. particleCount > 200 → clamp to 200 (performance)
10. All params → parse with zod schema, return ZodError detail in error SVG
11. SVG generation throw → return graceful error SVG with message
12. PNG export: SVG parse error → return 400 with JSON error
13. GIF export: too many frames → limit to 30 frames max
```

---

## 27. COMPLETE IMPLEMENTATION ORDER

Implement in this exact order:

1. `types/banner.ts` — all types first
2. `constants/defaults.ts` — default values
3. `constants/shapes.ts` — shape metadata
4. `lib/svg/shapes.ts` — all 35 shape generators
5. `lib/svg/gradients.ts` — gradient builder
6. `lib/svg/patterns.ts` — all 14 patterns
7. `lib/svg/effects.ts` — all overlays and filters
8. `lib/svg/particles.ts` — particle system
9. `lib/svg/animations.ts` — all 22 animations
10. `lib/svg/fonts.ts` — font CSS embedding
11. `lib/svg/icons.ts` — icon path map
12. `lib/svg/generator.ts` — main assembler
13. `lib/utils/params.ts` — URL param parser/validator
14. `app/api/banner/route.ts` — main SVG API
15. `app/api/export/png/route.ts` — PNG export
16. `app/api/export/gif/route.ts` — GIF export
17. `lib/store/builder.ts` — Zustand store
18. `components/UI/*` — all UI primitives
19. `components/Builder/ControlPanel/*` — all 9 tabs
20. `components/Builder/PreviewPanel/*` — preview
21. `components/Builder/OutputPanel/*` — output
22. `components/Builder/LayerPanel/*` — layers
23. `app/builder/page.tsx` — builder page
24. `components/Gallery/*` + `app/gallery/page.tsx`
25. `components/Landing/*` + `app/page.tsx`
26. `app/docs/page.tsx` — API docs
27. `tailwind.config.ts` + `next.config.ts`

Test each step before proceeding. Every function must be complete and correct.
No TODOs, no placeholder comments, no "implement later" stubs.
Every shape must render. Every animation must work. Every export must succeed.

---

## 28. WHAT MAKES THIS BEAT CAPSULE-RENDER

| Feature              | capsule-render | BannerForge |
|----------------------|---------------|-------------|
| Shapes               | ~8            | 35          |
| Animations           | ~6            | 22          |
| Color presets        | ~5            | 20          |
| Pattern overlays     | 0             | 14          |
| Particle systems     | 0             | 10          |
| Text layers          | 1             | Unlimited   |
| Icon layers          | 1             | 3+          |
| Overlay effects      | 0             | 8           |
| Visual builder UI    | No            | Yes         |
| GIF export           | No            | Yes         |
| PNG export           | No            | Yes         |
| WebP export          | No            | Yes         |
| Layer system         | No            | Yes         |
| Gallery of presets   | No            | 25+         |
| Gradient text        | No            | Yes         |
| Text glow/stroke     | No            | Yes         |
| Particle effects     | No            | Yes         |
| Custom gradient stops| No            | Yes         |
| Blur/shadow/filters  | No            | Yes         |
| API documentation    | Basic         | Full        |

---

Build this completely. No step can be skipped.

```
