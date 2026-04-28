import { useSimple } from "../../../store/simple";
import { LabelSlider } from "../../builder/Slider";
import { decorations } from "../../../lib/simple/decorations";
import { Ban, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

export function DecorationsTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const fileRef = useRef<HTMLInputElement>(null);
  const [customSrc, setCustomSrc] = useState<string | null>(null);

  const update = (updates: Partial<typeof config>) => {
    set((c) => ({ ...c, ...updates }));
  };

  const decorationKeys = Object.keys(decorations);
  const isCustom =
    config.decoration !== null &&
    !decorations[config.decoration as keyof typeof decorations] &&
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
    <div className="space-y-6">
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
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Select Decoration
        </label>
        <div className="grid grid-cols-4 gap-2">
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
          {decorationKeys.map((key) => (
            <button
              key={key}
              onClick={() => update({ decoration: key })}
              className={`aspect-square flex items-center justify-center rounded-xl border transition-all bg-secondary/30 ${
                config.decoration === key
                  ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg shadow-primary/10"
                  : "border-border hover:bg-secondary/50"
              }`}
              title={key}
            >
              <img
                src={decorations[key as keyof typeof decorations]}
                alt={key}
                className="h-8 w-8 object-contain invert dark:invert-0 opacity-80"
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

      <div className="space-y-3">
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
