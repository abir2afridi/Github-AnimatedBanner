import { useSimple } from "../../../store/simple";
import { FONTS } from "../../../lib/simple/fonts";
import { Check, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "../../ui/input";

export function FontsTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const [search, setSearch] = useState("");

  const filteredFonts = useMemo(() => {
    return FONTS.filter((f) => f.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const apply = (font: string) => {
    set((c) => ({ ...c, titleFont: font, subtitleFont: font }));
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 bg-background px-4 pt-4 pb-3 space-y-3 border-b border-border shadow-sm">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search fonts..." 
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

        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Typography Library
          </p>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-bold text-primary uppercase tracking-tight">
              {filteredFonts.length} available
            </span>
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 gap-2 pb-4">
          {filteredFonts.map((font, index) => (
            <button
              key={font}
              type="button"
              onClick={() => apply(font)}
              className={`group relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                config.titleFont === font
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-secondary/20 hover:border-muted-foreground/30 hover:bg-secondary/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-1.5">
                  <span className="flex items-center justify-center min-w-[20px] h-[14px] px-1 text-[8px] font-mono font-bold text-white bg-primary rounded-[4px] border border-white/20">
                    {String(index + 1).padStart(3, '0')}
                  </span>

                  {font}
                </span>
                {config.titleFont === font && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                )}
              </div>
              
              <div
                className="truncate text-xl font-medium text-foreground transition-colors group-hover:text-primary"
                style={{ fontFamily: `'${font}', sans-serif` }}
              >
                The quick brown fox
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mt-2 shrink-0">
          <p className="text-[10px] text-primary/80 leading-relaxed italic">
            Tip: You can still fine-tune individual title/subtitle fonts and sizes in the <strong>Main</strong> tab.
          </p>
        </div>
      </div>
    </div>
  );
}
