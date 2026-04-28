import { useSimple } from "../../../store/simple";
import { FONTS } from "../../../lib/simple/fonts";
import { Check } from "lucide-react";

export function FontsTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);

  const apply = (font: string) => {
    set((c) => ({ ...c, titleFont: font, subtitleFont: font }));
  };

  return (
    <div className="space-y-4">
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-1 font-bold">
        Typography Library
      </p>
      
      <div className="grid gap-3">
        {FONTS.map((font) => (
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
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
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
      
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mt-6">
        <p className="text-[10px] text-primary/80 leading-relaxed italic">
          Tip: You can still fine-tune individual title/subtitle fonts and sizes in the <strong>Main</strong> tab.
        </p>
      </div>
    </div>
  );
}
