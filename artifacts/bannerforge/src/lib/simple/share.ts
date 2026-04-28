import { BannerConfig, DEFAULT_CONFIG } from "./types";

const KEYS: (keyof BannerConfig)[] = [
  "width",
  "height",
  "padding",
  "title",
  "titleFont",
  "titleSize",
  "titleColor",
  "subtitle",
  "subtitleFont",
  "subtitleSize",
  "subtitleColor",
  "textAlign",
  "bgColor",
  "pattern",
  "patternColor",
  "patternSize",
  "patternOpacity",
  "borderColor",
  "borderWidth",
  "borderRadius",
  "decoration",
  "decorationSize",
  "decorationOpacity",
];

function toBase64Url(s: string): string {
  const b64 =
    typeof window === "undefined"
      ? Buffer.from(s, "utf8").toString("base64")
      : window.btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  if (typeof window === "undefined") {
    return Buffer.from(b64 + pad, "base64").toString("utf8");
  }
  return decodeURIComponent(escape(window.atob(b64 + pad)));
}

export function encodeConfig(config: BannerConfig): string {
  const slim: Partial<BannerConfig> = {};
  for (const k of KEYS) {
    if (config[k] !== DEFAULT_CONFIG[k]) {
      (slim as Record<string, unknown>)[k] = config[k];
    }
  }
  if (Object.keys(slim).length === 0) return "";
  return toBase64Url(JSON.stringify(slim));
}

export function decodeConfig(hash: string): BannerConfig | null {
  if (!hash) return null;
  const trimmed = hash.replace(/^#/, "");
  if (!trimmed) return null;
  try {
    const json = fromBase64Url(trimmed);
    const parsed = JSON.parse(json) as Partial<BannerConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return null;
  }
}

export function buildShareUrl(config: BannerConfig): string {
  if (typeof window === "undefined") return "";
  const enc = encodeConfig(config);
  const base = `${window.location.origin}${window.location.pathname}`;
  return enc ? `${base}#${enc}` : base;
}
