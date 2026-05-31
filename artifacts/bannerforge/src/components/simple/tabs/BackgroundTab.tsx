import { useSimple } from "../../../store/simple";
import { LabelSlider } from "../../builder/Slider";
import { ColorSwatch } from "../../builder/ColorSwatch";
import { patterns, getPatternDefaultSize } from "../../../lib/simple/patterns";
import { Ban, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "../../ui/input";

export function BackgroundTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const [search, setSearch] = useState("");

  const update = (updates: Partial<typeof config>) => {
    set((c) => ({ ...c, ...updates }));
  };

  const patternKeys = useMemo(() => {
    return Object.keys(patterns).filter(k => k.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between px-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          Colors & Border
        </p>
      </div>

      <ColorSwatch
        label="Background Color"
        value={config.bgColor}
        onChange={(v) => update({ bgColor: v })}
      />

      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch
          label="Border Color"
          value={config.borderColor}
          onChange={(v) => update({ borderColor: v })}
        />
        <ColorSwatch
          label="Pattern Color"
          value={config.patternColor}
          onChange={(v) => update({ patternColor: v })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LabelSlider
          label="Border Width"
          value={config.borderWidth}
          min={0}
          max={20}
          onChange={(v) => update({ borderWidth: v })}
        />
        <LabelSlider
          label="Border Radius"
          value={config.borderRadius}
          min={0}
          max={40}
          onChange={(v) => update({ borderRadius: v })}
        />
      </div>

      <div className="space-y-4">
        <LabelSlider
          label="Pattern Size"
          value={config.patternSize}
          min={20}
          max={300}
          onChange={(v) => update({ patternSize: v })}
        />
        <LabelSlider
          label="Pattern Opacity"
          value={Math.round(config.patternOpacity * 100)}
          min={0}
          max={100}
          onChange={(v) => update({ patternOpacity: v / 100 })}
          unit="%"
        />
      </div>

      {/* Animation Control */}
      <div className="space-y-3 p-4 rounded-2xl bg-secondary/10 border border-border/50">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Background Animation
          </p>
          <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
            {config.animation || "None"}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["none", "slow", "medium", "fast"].map((speed) => (
            <button
              key={speed}
              onClick={() => update({ animation: speed as any })}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                (config.animation || "none") === speed
                  ? "bg-primary border-primary text-primary-foreground shadow-lg"
                  : "bg-background/50 border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {speed.charAt(0).toUpperCase() + speed.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="sticky -top-4 z-30 bg-background -mx-4 px-4 pt-4 pb-3 space-y-3 border-b border-border shadow-sm">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Filter patterns..." 
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
              Pattern Library
            </label>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold text-primary uppercase tracking-tight">
                {patternKeys.length} available
              </span>
            </span>
          </div>
        </div>


        <div className="grid grid-cols-5 gap-2 pb-4">
          <button
            onClick={() => update({ pattern: null })}
            className={`aspect-square flex items-center justify-center rounded-xl border transition-all ${
              config.pattern === null
                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                : "bg-secondary/30 border-border hover:bg-secondary/50"
            }`}
          >
            <Ban size={18} className="text-muted-foreground" />
          </button>
          {patternKeys.map((key, index) => {
            const fn = patterns[key as keyof typeof patterns];
            const url = `url("data:image/svg+xml,${encodeURIComponent(fn(config.patternColor, 1))}")`;
            return (
              <button
                key={key}
                onClick={() => update({ pattern: key, patternSize: getPatternDefaultSize(key) })}
                title={key}
                className={`aspect-square rounded-xl border transition-all overflow-hidden relative group ${
                  config.pattern === key
                    ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg shadow-primary/10"
                    : "border-border hover:border-muted-foreground/30"
                }`}
                style={{
                  backgroundColor: config.bgColor,
                  backgroundImage: url,
                  backgroundSize: "40px",
                }}
                aria-label={`Pattern ${index + 1}: ${key}`}
              >
                <div className="absolute top-1 left-1 z-20">
                  <span className="flex items-center justify-center min-w-[18px] h-[14px] px-1 text-[8px] font-mono font-bold text-white bg-primary/90 shadow-[0_2px_4px_rgba(0,0,0,0.3)] rounded-[4px] border border-white/20 transition-transform group-hover:scale-110">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
