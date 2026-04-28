import { create } from "zustand";
import {
  ANIMATIONS,
  AVAILABLE_FONTS,
  COLOR_PRESETS,
  DEFAULT_PARAMS,
  GALLERY_PRESETS,
  createDefaultTextLayer,
  generateBannerSVG,
  paramsToQuery,
  parseQueryParams,
  presetToStops,
  type BannerParams,
  type ColorPreset,
  type ParticleType,
  type PatternType,
  type ShapeType,
  type TextLayer,
} from "@workspace/banner-svg";

interface BuilderState {
  mode: "svg" | "simple";
  params: BannerParams;
  activeTab: string;
  activeTextLayerId: string | null;
  history: BannerParams[];
  historyIndex: number;
  set: (updater: (p: BannerParams) => BannerParams) => void;
  applyPreset: (preset: ColorPreset) => void;
  loadParams: (p: BannerParams) => void;
  setActiveTab: (t: string) => void;
  setMode: (m: "svg" | "simple") => void;
  setActiveTextLayer: (id: string | null) => void;
  addTextLayer: () => void;
  removeTextLayer: (id: string) => void;
  duplicateTextLayer: (id: string) => void;
  moveTextLayer: (id: string, dir: -1 | 1) => void;
  updateTextLayer: (id: string, patch: Partial<TextLayer>) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  randomize: () => void;
  loadFromQueryString: (qs: string) => boolean;
}

const HIST_LIMIT = 30;

function pushHistory(state: BuilderState, next: BannerParams): Partial<BuilderState> {
  const trimmed = state.history.slice(0, state.historyIndex + 1);
  trimmed.push(next);
  const sliced = trimmed.slice(-HIST_LIMIT);
  return { history: sliced, historyIndex: sliced.length - 1, params: next };
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomParams(seed: BannerParams): BannerParams {
  // Pull a base from the gallery for solid composition, then jitter.
  const base = pickRandom(GALLERY_PRESETS).params;
  const presetIds = Object.keys(COLOR_PRESETS) as Array<Exclude<ColorPreset, "custom">>;
  const colorPreset = pickRandom(presetIds);
  const patterns: PatternType[] = ["none", "dots", "grid", "circuit", "hexagon", "triangle", "noise"];
  const particles: ParticleType[] = ["none", "stars", "sparkles", "embers", "fireflies", "snowflakes", "matrix"];
  const shapes: ShapeType[] = [
    "waving","wave","wave2","blob","blob2","slice","ribbon","circle",
    "hexagon","mountain","circuit","grid","neon","terminal","city",
  ];
  const fonts = AVAILABLE_FONTS;
  const anims = ANIMATIONS.filter((a) => a.id !== "none").map((a) => a.id);

  const layers: TextLayer[] = base.textLayers.length
    ? base.textLayers.map((l, i) => ({
        ...l,
        fontFamily: pickRandom(fonts),
        animation: pickRandom(anims),
        animationDelay: i * 200,
      }))
    : seed.textLayers;

  return {
    ...base,
    type: pickRandom(shapes),
    colorPreset,
    gradientStops: presetToStops(colorPreset),
    color: COLOR_PRESETS[colorPreset]?.[0] ?? base.color,
    gradientAngle: Math.round(Math.random() * 360),
    pattern: pickRandom(patterns),
    patternColor: "#ffffff",
    patternOpacity: 0.1 + Math.random() * 0.2,
    patternScale: 0.6 + Math.random() * 1.5,
    particles: pickRandom(particles),
    particleCount: 20 + Math.floor(Math.random() * 80),
    particleColor: "#ffffff",
    particleOpacity: 0.5 + Math.random() * 0.5,
    animationSpeed: 0.5 + Math.random() * 1.5,
    width: seed.width,
    height: seed.height,
    textLayers: layers,
  };
}

export const useBuilder = create<BuilderState>((set, get) => ({
  mode: "svg" as const,
  params: DEFAULT_PARAMS,
  activeTab: "shapes",
  activeTextLayerId: DEFAULT_PARAMS.textLayers[0]?.id ?? null,
  history: [DEFAULT_PARAMS],
  historyIndex: 0,
  set: (updater) =>
    set((state) => {
      const next = updater(state.params);
      return pushHistory(state, next);
    }),
  applyPreset: (preset) =>
    set((state) => {
      if (preset === "custom") return state;
      const next: BannerParams = {
        ...state.params,
        colorPreset: preset,
        gradientStops: presetToStops(preset),
        color: COLOR_PRESETS[preset]?.[0] ?? state.params.color,
      };
      return pushHistory(state, next);
    }),
  loadParams: (p) => set((state) => ({
    ...pushHistory(state, p),
    activeTextLayerId: p.textLayers[0]?.id ?? null,
  })),
  setActiveTab: (t) => set({ activeTab: t }),
  setMode: (m) => set({ mode: m }),
  setActiveTextLayer: (id) => set({ activeTextLayerId: id }),
  addTextLayer: () =>
    set((state) => {
      const layer = createDefaultTextLayer({ text: "New text", fontSize: 36, alignY: 50 });
      const next: BannerParams = {
        ...state.params,
        textLayers: [...state.params.textLayers, layer],
      };
      return { ...pushHistory(state, next), activeTextLayerId: layer.id };
    }),
  removeTextLayer: (id) =>
    set((state) => {
      const next: BannerParams = {
        ...state.params,
        textLayers: state.params.textLayers.filter((l) => l.id !== id),
      };
      return {
        ...pushHistory(state, next),
        activeTextLayerId:
          state.activeTextLayerId === id
            ? next.textLayers[0]?.id ?? null
            : state.activeTextLayerId,
      };
    }),
  duplicateTextLayer: (id) =>
    set((state) => {
      const src = state.params.textLayers.find((l) => l.id === id);
      if (!src) return state;
      const copy = createDefaultTextLayer({
        ...src,
        text: src.text,
        alignY: Math.min(95, src.alignY + 10),
      });
      const next: BannerParams = {
        ...state.params,
        textLayers: [...state.params.textLayers, copy],
      };
      return { ...pushHistory(state, next), activeTextLayerId: copy.id };
    }),
  moveTextLayer: (id, dir) =>
    set((state) => {
      const layers = [...state.params.textLayers];
      const i = layers.findIndex((l) => l.id === id);
      if (i < 0) return state;
      const j = i + dir;
      if (j < 0 || j >= layers.length) return state;
      [layers[i], layers[j]] = [layers[j], layers[i]];
      const next: BannerParams = { ...state.params, textLayers: layers };
      return pushHistory(state, next);
    }),
  updateTextLayer: (id, patch) =>
    set((state) => {
      const next: BannerParams = {
        ...state.params,
        textLayers: state.params.textLayers.map((l) => (l.id === id ? { ...l, ...patch } : l)),
      };
      return pushHistory(state, next);
    }),
  reset: () =>
    set(() => ({
      params: DEFAULT_PARAMS,
      history: [DEFAULT_PARAMS],
      historyIndex: 0,
      activeTextLayerId: DEFAULT_PARAMS.textLayers[0]?.id ?? null,
    })),
  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const i = state.historyIndex - 1;
      return { historyIndex: i, params: state.history[i] };
    }),
  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const i = state.historyIndex + 1;
      return { historyIndex: i, params: state.history[i] };
    }),
  randomize: () =>
    set((state) => {
      const next = randomParams(state.params);
      return {
        ...pushHistory(state, next),
        activeTextLayerId: next.textLayers[0]?.id ?? null,
      };
    }),
  loadFromQueryString: (qs) => {
    if (!qs) return false;
    try {
      const sp = new URLSearchParams(qs.startsWith("?") ? qs.slice(1) : qs);
      // Require at least one banner-related param to avoid stomping defaults
      if (![...sp.keys()].length) return false;
      const next = parseQueryParams(sp);
      set((state) => ({
        ...pushHistory(state, next),
        activeTextLayerId: next.textLayers[0]?.id ?? null,
      }));
      return true;
    } catch {
      return false;
    }
  },
}));

export function useBannerSVG(): string {
  const params = useBuilder((s) => s.params);
  return generateBannerSVG(params);
}

export function useBannerQuery(): string {
  const params = useBuilder((s) => s.params);
  return paramsToQuery(params).toString();
}
