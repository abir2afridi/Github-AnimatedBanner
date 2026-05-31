import { useState, useMemo } from "react";
import { generateBannerSVG, GALLERY_PRESETS } from "@workspace/banner-svg";
import { useBuilder } from "../../../store/builder";
import { toast } from "sonner";
import { Search, X } from "lucide-react";

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
  "Luxury",
  "Nature",
  "Anime",
  "Brutalist",
  "Retro-Wave",
  "Architectural",
  "Soft",
  "Dark Fantasy",
  "Generic",
  "Capsule",
] as const;

export function PresetsTab() {
  const loadParams = useBuilder((s) => s.loadParams);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = cat === "All" ? GALLERY_PRESETS : GALLERY_PRESETS.filter((p) => p.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return list;
  }, [cat, search]);

  return (
    <div className="space-y-4">
      {/* Sticky Header */}
      <div className="sticky top-[-16px] z-10 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            Gallery presets ({filtered.length})
          </div>
          <div className="relative group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search presets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-7 py-1.5 w-40 bg-muted/50 border border-border rounded-full text-[11px] focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-foreground text-muted-foreground transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar max-h-24 overflow-y-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all hover-elevate ${
                cat === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card/50 text-muted-foreground hover:border-muted-foreground/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-muted-foreground text-xs">No presets found matching "{search}"</div>
            <button 
              onClick={() => {setSearch(""); setCat("All");}}
              className="mt-2 text-[10px] text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((preset) => {
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
                className="group w-full rounded-lg border border-border bg-card overflow-hidden hover-elevate text-left transition-all hover:border-primary/40 active:scale-[0.98]"
              >
                <div className="relative">
                  <img
                    src={dataUri}
                    alt={preset.name}
                    className="w-full block brightness-[0.9] group-hover:brightness-100 transition-all"
                    style={{ aspectRatio: "600 / 140" }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      {GALLERY_PRESETS.findIndex((p) => p.id === preset.id) + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">{preset.name}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-border" />
                        {preset.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Apply →
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
