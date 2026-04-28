import { useSimple } from "../../../store/simple";
import { presets } from "../../../lib/simple/presets";
import { getPatternUrl } from "../../../lib/simple/patterns";

export function PresetsTab() {
  const currentConfig = useSimple((s) => s.config);
  const loadPreset = useSimple((s) => s.loadPreset);

  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[calc(100vh-300px)] pr-2 custom-scrollbar">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => loadPreset(preset)}
          className={`group relative flex flex-col w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
            currentConfig.bgColor === preset.bgColor && currentConfig.pattern === preset.pattern
              ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-xl scale-[0.99]"
              : "border-border bg-secondary/20 hover:border-muted-foreground/30 hover:bg-secondary/40"
          }`}
        >
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
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {preset.name}
              </span>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/80">{preset.name}</span>
            {currentConfig.bgColor === preset.bgColor && currentConfig.pattern === preset.pattern && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
