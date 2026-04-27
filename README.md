# BannerForge

A GitHub README banner generator that produces animated SVG banners via a URL API and a drag‑style builder UI with live preview.

## Architecture

This is a `pnpm` monorepo with three artifacts and one shared library:

- `lib/banner-svg/` — Pure-TypeScript SVG generator (no node deps). Used by both the API server and the frontend so the live preview is byte-identical to what the API returns.
  - `types.ts` — `BannerParams`, `TextLayer`, and union types.
  - `shapes.ts` — 28 shapes (waving, blob, circuit, terminal, hexagon, …).
  - `gradients.ts` — 20 color presets + custom multi-stop gradients (linear/radial/conic).
  - `patterns.ts` — 14 pattern overlays (dots, grid, circuit, hexagon, …).
  - `particles.ts` — 10 animated particle systems (stars, snow, embers, matrix, …) with deterministic PRNG so URLs render identically server-side.
  - `effects.ts` — Vignette/scanlines/grain/light-leak/fog overlays + drop shadows + color adjust filters (brightness, contrast, saturation, hue, blur).
  - `animations.ts` — 22 CSS keyframe animations with per-layer delay & global speed.
  - `text.ts` — Multi-line text layers with gradient fill, glow, stroke, shadow, rotation.
  - `fonts.ts` — 28 Google fonts (Poppins, Orbitron, JetBrains Mono, Press Start 2P, …) loaded via `@import` inside the SVG.
  - `generator.ts` — `generateBannerSVG(params)` composes everything into a self-contained SVG with embedded CSS.
  - `params.ts` — `parseQueryParams()` and `paramsToQuery()` round-trip a banner config through URL search params.
  - `presets.ts` — 16 ready-made gallery presets across categories.

- `artifacts/api-server` — Express 5 server. The `/api/banner` GET route returns `image/svg+xml` (1-hour browser cache, 1-day s-max-age) so the URL can be embedded directly in a GitHub README.

- `artifacts/bannerforge` — React + Vite + Tailwind v4 + shadcn/ui frontend (the builder). Three-panel layout: control tabs on the left, live preview in the middle, embed/download on the right. State managed by Zustand with undo/redo history.

- `artifacts/mockup-sandbox` — Component preview sandbox (canvas iframe target).

## Installation Process

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Setup

1. Install pnpm globally:
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

### Running the Project

#### Frontend (BannerForge Builder)
```bash
# Set required environment variables and run
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/bannerforge dev
```

On Windows (PowerShell):
```powershell
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm --filter @workspace/bannerforge dev
```

The builder will be available at http://localhost:5173/

#### API Server
```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/api-server dev
```

#### Mockup Sandbox
```bash
PORT=5174 BASE_PATH=/ pnpm --filter @workspace/mockup-sandbox dev
```

### Building for Production

```bash
pnpm build
```

This will typecheck and build all workspace packages.

### Deployment

The project is deployed on Vercel:

- **Production:** https://github-animated-banner-2lba8fht1-abir2afridi-5746s-projects.vercel.app
- **Alias:** https://github-animated-banner-eta.vercel.app

To deploy to Vercel:

```bash
npx vercel deploy --prod
```

The project uses a `vercel.json` configuration file that:
- Sets the build command to build the bannerforge artifact
- Configures the output directory to `artifacts/bannerforge/dist/public`
- Uses `npx pnpm` for installation and build commands
- Includes environment variables for PORT (5173) and BASE_PATH (/)

## URL API

```
GET /api/banner?type=waving&preset=ocean&text=Hello&desc=Welcome
```

Common params:
- `type` — shape id (e.g. `waving`, `terminal`, `circuit`, `hexagon`)
- `preset` — color preset (e.g. `ocean`, `cyberpunk`, `lava`)
- `color` — comma-separated custom stops (`ff5500@0,ffaa00@50,ffee00@100`)
- `pattern`, `particles`, `overlay`, `shadow` — overlay layers
- `text`, `fontFamily`, `fontSize`, `fontColor`, `animation`
- `desc`, `descFontSize`, `descColor` — second text line
- `width`, `height`, `gradientType`, `gradientAngle`, `reverse`, `speed`, `blur`, `brightness`, `contrast`, `saturation`, `hueRotate`

## Development

The api-server and bannerforge web workflows are wired up automatically. Both use `PORT` and `BASE_PATH` env vars provided by the Replit artifact router.

The shared library is consumed via `@workspace/banner-svg` (workspace dependency). It has zero runtime deps so it works identically on Node (api server) and in the browser (live preview).

## Conventions

- All HSL theme values for the BannerForge frontend live in `artifacts/bannerforge/src/index.css` (forced dark theme).
- The preview panel uses `<object data="data:image/svg+xml;...">` (not `<img>`) so the embedded CSS animations keep running.
- The generator returns a single self-contained `<svg>` string with `<style>` block so the SVG can be embedded directly in a README without external assets.
