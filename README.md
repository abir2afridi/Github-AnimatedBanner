# BannerForge

A GitHub README banner generator that produces animated SVG banners via a URL API and a drag‑style builder UI with live preview.

## ✨ Key Features

- **🚀 Performance-First**: Zero runtime dependencies in the generator library. Works identically on the server and in the browser.
- **🎨 Infinite Customization**: 35+ shape types, 20+ animations, and 15+ color presets.
- **⚡ Live Preview**: The builder UI provides a byte-identical preview of the API output.
- **📱 Responsive Design**: Optimized for all screen sizes.
- **🔗 Seamless Integration**: Simply copy the URL or Markdown and paste it into your GitHub README.

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

Recommended:
- Git
- A terminal that supports PowerShell (Windows) or bash/zsh (macOS/Linux)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/abir2afridi/Github-AnimatedBanner.git
cd Github-AnimatedBanner
```

2. Install pnpm globally (recommended):

```bash
npm install -g pnpm
```

If `pnpm` is not available in your terminal, you can still use:

```bash
npx pnpm -v
```

3. Install dependencies:

```bash
pnpm install
```

Or (works even if pnpm isn't on PATH):

```bash
npx pnpm install
```

### Running the Project

If you want the full experience (builder UI + API server), run both together.

#### Frontend (BannerForge Builder)

```bash
pnpm --filter @workspace/bannerforge dev
```

On Windows (PowerShell):

```powershell
pnpm --filter @workspace/bannerforge dev
```

The builder will be available at http://localhost:5173/

#### API Server

```bash
pnpm --filter @workspace/api-server dev
```

The API server defaults to port 3000 if no `PORT` environment variable is provided.

#### Run UI + API together (recommended)

From repo root:

```bash
npm run dev:all
```

This starts:
- `@workspace/bannerforge` (Vite dev server)
- `@workspace/api-server` (Express server)

#### Mockup Sandbox (optional)

```bash
npm run dev:sandbox
```


### Environment Variables

Both the frontend and API server support environment variables for configuration.

| Variable | Default | Target | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `5173` | Frontend | Port for the Vite dev server. |
| `PORT` | `3000` | API Server | Port for the Express backend. |
| `BASE_PATH` | `/` | Frontend | The base path for the frontend application. |
| `VITE_API_BASE` |  | Frontend | Overrides the API base used to generate banner URLs (e.g. to point the local builder at the Vercel deployment) |

#### Setting Variables on Windows (PowerShell)

```powershell
# For Frontend
$env:PORT="5173"; $env:BASE_PATH="/"; npm run dev:bannerforge

# For API Server
$env:PORT="3000"; npm run dev:api
```

#### Setting Variables on macOS/Linux

```bash
# For Frontend
PORT=5173 BASE_PATH=/ npm run dev:bannerforge

# For API Server
PORT=3000 npm run dev:api
```

If you want to override them:

macOS/Linux:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/bannerforge dev
```

Windows (PowerShell):

```powershell
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm --filter @workspace/bannerforge dev
```

If you want the local builder to generate Vercel-ready URLs instead of `localhost`, set:

```bash
VITE_API_BASE=https://github-animatedbanner.vercel.app/api
```

### Generate Vercel URLs from Local Builder

By default, the local builder generates URLs pointing to `localhost:5173/api`. To generate URLs that work on the deployed Vercel instance (for GitHub README embeds), set the `VITE_API_BASE` environment variable:

1. Create `artifacts/bannerforge/.env.local`:

```env
VITE_API_BASE=https://github-animatedbanner.vercel.app/api
```

2. Restart the dev server:

```bash
npm run dev
```

Now all banner URLs generated by the builder will point to the Vercel API, allowing you to copy and paste them directly into GitHub READMEs.

### Building for Production

```bash
pnpm build
```

This will typecheck and build all workspace packages.

### Troubleshooting

- If `pnpm` is not recognized on Windows after installing globally, use `npx pnpm ...` or restart the terminal.
- If `npm run dev:all` fails with a "PORT environment variable is required" error, ensure you are using the latest version of the code where a fallback to port 3000 has been implemented.
- If the API server still fails to start, you can manually set the port: `$env:PORT="3000"; npm run dev:api`.

### Deployment

The project is deployed on Vercel:

- **Production:** https://github-animated-banner-e7bg60pzv-abir2afridi-5746s-projects.vercel.app
- **Alias:** https://github-animated-banner-seven.vercel.app

To deploy to Vercel:

```bash
npx vercel deploy --prod
```

Local development uses workspace scripts like `npm run dev` or `npm run dev:all`. These are not used by Vercel deployments.

The project uses a `vercel.json` configuration file that:
- Sets the build command to build the bannerforge artifact
- Configures the output directory to `artifacts/bannerforge/dist/public`
- Uses `npx pnpm` for installation and build commands
- Includes environment variables for `BASE_PATH` (default: `/`)

## URL API

```
GET /api/banner?type=waving&preset=ocean&text=Hello&desc=Welcome
```

Vercel (live) example:

```
https://github-animatedbanner.vercel.app/api/banner?type=waving&preset=ocean&text=Hello&desc=Welcome
```

### GitHub README Embed

Use the API URL directly as an image source:

```md
![Banner](https://github-animatedbanner.vercel.app/api/banner.svg?type=waving&preset=ocean&text=Hello&desc=Welcome&v=1)
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
