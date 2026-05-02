import { useSimple } from "../../../store/simple";
import { presets } from "../../../lib/simple/presets";
import { getPatternUrl } from "../../../lib/simple/patterns";
import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export function PresetsTab() {
  const currentConfig = useSimple((s) => s.config);
  const loadPreset = useSimple((s) => s.loadPreset);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | "modern" | "mesh" | "glass" | "retro" | "corp" | "vibrant" | "dev" | "minimal" | "nature" | "gaming" | "cyber" | "luxury" | "future" | "colorful">("all");

  const filteredPresets = useMemo(() => {
    return presets.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.title.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = category === "all" || 
                              (category === "modern" && p.id.startsWith("modern-")) ||
                              (category === "mesh" && p.id.startsWith("gradient-mesh-")) ||
                              (category === "glass" && p.id.startsWith("glass-preset-")) ||
                              (category === "retro" && p.id.startsWith("retro-preset-")) ||
                              (category === "corp" && p.id.startsWith("corp-preset-")) ||
                              (category === "vibrant" && p.id.startsWith("vibrant-")) ||
                              (category === "dev" && p.id.startsWith("dev-")) ||
                              (category === "minimal" && p.id.startsWith("minimal-")) ||
                              (category === "nature" && p.id.startsWith("nature-")) ||
                              (category === "gaming" && p.id.startsWith("gaming-")) ||
                              (category === "cyber" && p.id.startsWith("cyber-")) ||
                              (category === "luxury" && p.id.startsWith("luxury-")) ||
                              (category === "future" && p.id.startsWith("future-")) ||
                              (category === "colorful" && p.id.startsWith("color-"));
      
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categories = [
    { id: "all", label: "All" },
    { id: "modern", label: "Modern" },
    { id: "mesh", label: "Mesh" },
    { id: "glass", label: "Glass" },
    { id: "retro", label: "Retro" },
    { id: "corp", label: "Corporate" },
    { id: "vibrant", label: "Vibrant" },
    { id: "dev", label: "Developer" },
    { id: "minimal", label: "Minimal" },
    { id: "nature", label: "Nature" },
    { id: "gaming", label: "Gaming" },
    { id: "cyber", label: "Cyber" },
    { id: "luxury", label: "Luxury" },
    { id: "future", label: "Future" },
    { id: "colorful", label: "Colorful" },
  ] as const;


  return (
    <div className="flex flex-col">
      {/* Search & Filter Header - Sticky at the very top */}
      <div className="sticky top-0 z-30 bg-background px-4 pt-4 pb-3 space-y-3 border-b border-border shadow-sm">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search presets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 bg-secondary/20 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                category === cat.id 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-muted-foreground/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Results
          </p>
          <span className="text-[10px] font-mono font-bold text-primary/60">
            {filteredPresets.length} items
          </span>
        </div>
      </div>

      {/* Grid Content with Padding */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 pb-4">
        {filteredPresets.map((preset, index) => (
          <button
            key={preset.id}
            onClick={() => loadPreset(preset)}
            className={`group relative flex flex-col w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
              currentConfig.bgColor === preset.bgColor && currentConfig.pattern === preset.pattern
                ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-xl scale-[0.99]"
                : "border-border bg-secondary/20 hover:border-muted-foreground/30 hover:bg-secondary/40"
            }`}
          >
            {/* Serial Number Badge */}
            <div className="absolute top-2 left-2 z-20">
              <span className="flex items-center justify-center min-w-[22px] h-[16px] px-1.5 text-[10px] font-mono font-bold text-white bg-primary/90 shadow-[0_4px_12px_rgba(0,0,0,0.3)] rounded-[6px] border border-white/20 backdrop-blur-md transition-transform group-hover:scale-110">
                {String(index + 1).padStart(3, '0')}
              </span>
            </div>

            {/* Preset Preview Mini */}
            <div
              className="w-full h-24 relative overflow-hidden"
              style={{
                backgroundColor: preset.bgColor,
                backgroundImage: getPatternUrl(
                  preset.pattern,
                  preset.patternColor,
                  preset.patternOpacity
                ),
                backgroundSize: "60px",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span
                  style={{
                    fontFamily: preset.titleFont,
                    color: preset.titleColor,
                    fontSize: "12px",
                    fontWeight: 700,
                    textAlign: "center"
                  }}
                >
                  {preset.name}
                </span>
              </div>
            </div>

            <div className="p-2.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-foreground/80 truncate pr-2">
                {preset.name}
              </span>
              {currentConfig.bgColor === preset.bgColor && currentConfig.pattern === preset.pattern && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
  );
}
