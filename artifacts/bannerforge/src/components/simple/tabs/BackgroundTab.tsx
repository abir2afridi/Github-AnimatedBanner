import { useSimple } from "../../../store/simple";
import { LabelSlider } from "../../builder/Slider";
import { ColorSwatch } from "../../builder/ColorSwatch";
import { patterns } from "../../../lib/simple/patterns";
import { Ban } from "lucide-react";

export function BackgroundTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);

  const update = (updates: Partial<typeof config>) => {
    set((c) => ({ ...c, ...updates }));
  };

  const patternKeys = Object.keys(patterns);

  return (
    <div className="space-y-6">
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

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Patterns
        </label>
        <div className="grid grid-cols-5 gap-2">
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
          {patternKeys.map((key) => {
            const fn = patterns[key as keyof typeof patterns];
            const url = `url("data:image/svg+xml,${encodeURIComponent(fn(config.patternColor, 1))}")`;
            return (
              <button
                key={key}
                onClick={() => update({ pattern: key })}
                className={`aspect-square rounded-xl border transition-all overflow-hidden ${
                  config.pattern === key
                    ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg shadow-primary/10"
                    : "border-border hover:border-muted-foreground/30"
                }`}
                style={{
                  backgroundColor: config.bgColor,
                  backgroundImage: url,
                  backgroundSize: "40px",
                }}
                title={key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
