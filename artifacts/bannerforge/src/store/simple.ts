import { create } from "zustand";
import type { BannerConfig } from "../lib/simple/types";
import { DEFAULT_CONFIG } from "../lib/simple/types";
import { presets } from "../lib/simple/presets";
import { decodeConfig, encodeConfig } from "../lib/simple/share";

interface SimpleState {
  config: BannerConfig;
  activeTab: "presets" | "main" | "background" | "decorations" | "fonts" | "export";
  set: (updater: (c: BannerConfig) => BannerConfig) => void;
  setActiveTab: (t: SimpleState["activeTab"]) => void;
  reset: () => void;
  randomize: () => void;
  loadPreset: (preset: BannerConfig) => void;
  hydrate: () => void;
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const useSimple = create<SimpleState>((set, get) => ({
  config: DEFAULT_CONFIG,
  activeTab: "main",
  set: (updater) => {
    const next = updater(get().config);
    set({ config: next });
    // Update hash silently
    if (typeof window !== "undefined") {
      const hash = encodeConfig(next);
      const url = new URL(window.location.href);
      url.hash = hash;
      window.history.replaceState(null, "", url.toString());
    }
  },
  setActiveTab: (t) => set({ activeTab: t }),
  reset: () => {
    set({ config: DEFAULT_CONFIG });
    if (typeof window !== "undefined") window.history.replaceState(null, "", window.location.pathname);
  },
  randomize: () => {
    const next = pickRandom(presets);
    set({ config: next });
    if (typeof window !== "undefined") {
      const hash = encodeConfig(next);
      window.history.replaceState(null, "", `#${hash}`);
    }
  },
  loadPreset: (preset) => {
    set({ config: preset });
    if (typeof window !== "undefined") {
      const hash = encodeConfig(preset);
      window.history.replaceState(null, "", `#${hash}`);
    }
  },
  hydrate: () => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const decoded = decodeConfig(hash);
    if (decoded) {
      set({ config: decoded });
    }
  },
}));
