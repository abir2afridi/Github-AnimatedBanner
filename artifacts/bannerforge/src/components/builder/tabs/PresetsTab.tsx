import { useState, useMemo } from "react";
import { generateBannerSVG, GALLERY_PRESETS } from "@workspace/banner-svg";
import { useBuilder } from "../../../store/builder";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Featured",
  "Tech",
  "Minimal",
  "Colorful",
  "Animated",
  "Dark",
  "Retro",
  "Neon",
  "Holiday",
] as const;

export function PresetsTab() {
  const loadParams = useBuilder((s) => s.loadParams);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (cat === "All" ? GALLERY_PRESETS : GALLERY_PRESETS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Gallery presets ({GALLERY_PRESETS.length})
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-2.5 py-1 rounded text-[11px] border hover-elevate ${
                cat === c
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((preset) => {
          const svg = generateBannerSVG({ ...preset.params, width: 600, height: 140 });
          const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                loadParams(preset.params);
                toast.success(`Loaded "${preset.name}"`);
              }}
              className="group w-full rounded-lg border border-border bg-card overflow-hidden hover-elevate text-left"
            >
              <img
                src={dataUri}
                alt={preset.name}
                className="w-full block"
                style={{ aspectRatio: "600 / 140" }}
              />
              <div className="px-3 py-2 flex items-center justify-between">
                <div>
                  <div className="text-sm text-foreground">{preset.name}</div>
                  <div className="text-[10px] text-muted-foreground">{preset.category}</div>
                </div>
                <span className="text-[10px] uppercase tracking-wide text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Use →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
