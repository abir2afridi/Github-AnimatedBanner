import { useSimple } from "../../../store/simple";
import { LabelSlider } from "../../builder/Slider";
import { decorations, colorfulDecorations, allDecorations } from "../../../lib/simple/decorations";
import { Ban, Upload, X, Palette, Sparkles, Search, AlignStartVertical, AlignEndVertical, Columns2 } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { Input } from "../../ui/input";

export function DecorationsTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const fileRef = useRef<HTMLInputElement>(null);
  const [customSrc, setCustomSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"minimal" | "colorful">("minimal");
  const [category, setCategory] = useState<"all" | "social" | "tech" | "minimal">("all");
  const [search, setSearch] = useState("");

  const categories = {
    social: ["google", "facebook", "instagram", "twitter", "linkedin", "github", "youtube", "discord", "slack", "whatsapp", "telegram", "reddit", "twitch", "tiktok", "snapchat", "pinterest", "spotify", "medium", "behance", "dribbble", "codepen", "producthunt", "hashnode", "dev-to", "stackoverflow", "messenger", "wechat", "zoom", "skype"],
    tech: ["javascript", "typescript", "python", "java", "rust", "cpp", "csharp", "php", "ruby", "swift", "kotlin", "go", "react", "vue", "angular", "svelte", "nextjs", "mongodb", "mysql", "postgresql", "redis", "docker", "kubernetes", "aws", "firebase", "vercel", "netlify", "heroku", "linux", "apple", "android", "windows", "vscode", "figma"],
    minimal: ["heart", "star", "moon", "sun", "cloud", "bolt", "flame", "terminal", "code", "layers", "layout", "monitor", "smartphone", "database", "server", "cpu", "wifi", "settings", "tool", "compass", "map", "mic", "video", "gift", "coffee", "pizza", "bug", "shield", "award", "package", "truck", "shopping_cart", "credit_card", "briefcase", "globe"]
  };

  const update = (updates: Partial<typeof config>) => {
    set((c) => ({ ...c, ...updates }));
  };

  const minimalKeys = useMemo(() => {
    return Object.keys(decorations).filter(k => {
      const matchesSearch = k.toLowerCase().includes(search.toLowerCase());
      const catList = categories[category as keyof typeof categories];
      const matchesCategory = category === "all" || (catList && catList.includes(k));
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const colorfulKeys = useMemo(() => {
    return Object.keys(colorfulDecorations).filter(k => {
      const matchesSearch = k.toLowerCase().includes(search.toLowerCase());
      const catList = categories[category as keyof typeof categories];
      const matchesCategory = category === "all" || (catList && catList.includes(k));
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const currentKeys = activeTab === "minimal" ? minimalKeys : colorfulKeys;
  const currentLibrary = activeTab === "minimal" ? decorations : (colorfulDecorations as any);

  const isCustom =
    config.decoration !== null &&
    !allDecorations[config.decoration as keyof typeof allDecorations] &&
    config.decoration?.startsWith("data:");

  const handleFile = (file: File | null | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result ?? "");
      setCustomSrc(src);
      update({ decoration: src });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <LabelSlider
          label="Decoration Size"
          value={config.decorationSize}
          min={40}
          max={300}
          onChange={(v) => update({ decorationSize: v })}
        />
        <LabelSlider
          label="Decoration Opacity"
          value={Math.round(config.decorationOpacity * 100)}
          min={0}
          max={100}
          onChange={(v) => update({ decorationOpacity: v / 100 })}
          unit="%"
        />
        <div className="pt-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 pb-2 block">
            Decoration Side
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-secondary/20 rounded-xl border border-border">
            {(["left", "right", "both"] as const).map((side) => (
              <button
                key={side}
                onClick={() => update({ decorationSide: side })}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                  config.decorationSide === side
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {side === "left" && <AlignStartVertical size={14} />}
                {side === "right" && <AlignEndVertical size={14} />}
                {side === "both" && <Columns2 size={14} />}
                {side === "left" ? "Left" : side === "right" ? "Right" : "Both"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="sticky -top-4 z-30 bg-background -mx-4 px-4 pt-4 pb-3 space-y-3 border-b border-border shadow-sm">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            Icon Library
          </label>
          
          <div className="grid grid-cols-2 gap-1 p-1 bg-secondary/20 rounded-xl border border-border">
            <button
              onClick={() => setActiveTab("minimal")}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === "minimal"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles size={14} />
              Minimal
            </button>
            <button
              onClick={() => setActiveTab("colorful")}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === "colorful"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Palette size={14} />
              Colorful
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            {(["all", "social", "tech", "minimal"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                  category === cat 
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "bg-secondary/30 text-muted-foreground border-border hover:border-muted-foreground/30"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder={`Filter ${activeTab} icons...`} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-secondary/20 border-none rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary/50"
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

          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {activeTab === "minimal" ? "Minimal Icons" : "Colorful Assets"}
            </label>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-primary uppercase tracking-tight">
                {currentKeys.length} available
              </span>
            </span>
          </div>
        </div>


        <div className="grid grid-cols-4 gap-2 pt-2">
          <button
            onClick={() => update({ decoration: null })}
            className={`aspect-square flex items-center justify-center rounded-xl border transition-all ${
              config.decoration === null
                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                : "bg-secondary/30 border-border hover:bg-secondary/50"
            }`}
          >
            <Ban size={18} className="text-muted-foreground" />
          </button>
          
          {currentKeys.map((key, index) => (
            <button
              key={key}
              onClick={() => update({ decoration: key })}
              className={`aspect-square flex items-center justify-center rounded-xl border transition-all bg-secondary/30 relative group ${
                config.decoration === key
                  ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg shadow-primary/10"
                  : "border-border hover:bg-secondary/50"
              }`}
              title={key}
            >
              <div className="absolute top-1 left-1 z-20">
                <span className="flex items-center justify-center min-w-[18px] h-[14px] px-1 text-[8px] font-mono font-bold text-white bg-primary/90 shadow-[0_2px_4px_rgba(0,0,0,0.3)] rounded-[4px] border border-white/20 transition-transform group-hover:scale-110">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <img
                src={currentLibrary[key as keyof typeof currentLibrary]}
                alt={key}
                className={`h-8 w-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity ${
                  activeTab === "minimal" ? "invert dark:invert-0" : ""
                }`}
              />
            </button>
          ))}
          
          {customSrc && (
            <button
              onClick={() => update({ decoration: customSrc })}
              className={`aspect-square flex items-center justify-center rounded-xl border transition-all bg-secondary/30 ${
                isCustom
                  ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg shadow-primary/10"
                  : "border-border hover:bg-secondary/50"
              }`}
            >
              <img src={customSrc} alt="Custom" className="h-8 w-8 object-contain" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border/50 pb-4">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Custom Upload
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/30 text-sm font-medium hover:bg-secondary/50 transition-all active:scale-[0.98]"
          >
            <Upload size={16} />
            Choose Image
          </button>
          {customSrc && (
            <button
              onClick={() => {
                setCustomSrc(null);
                if (isCustom) update({ decoration: null });
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
