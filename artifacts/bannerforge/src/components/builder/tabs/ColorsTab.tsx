import { Plus, Trash2 } from "lucide-react";
import {
  COLOR_PRESETS,
  presetToStops,
  type ColorPreset,
  type GradientStop,
} from "@workspace/banner-svg";
import { useBuilder } from "../../../store/builder";
import { ColorSwatch } from "../ColorSwatch";
import { LabelSlider } from "../Slider";
import { Button } from "@/components/ui/button";

const PRESET_IDS = Object.keys(COLOR_PRESETS) as Array<Exclude<ColorPreset, "custom">>;

export function ColorsTab() {
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);
  const applyPreset = useBuilder((s) => s.applyPreset);

  const updateStops = (stops: GradientStop[]) =>
    setParams((p) => ({ ...p, gradientStops: stops, colorPreset: "custom" }));

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
          Color presets ({PRESET_IDS.length})
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_IDS.map((id) => {
            const stops = presetToStops(id);
            const selected = params.colorPreset === id;
            const grad = `linear-gradient(135deg, ${stops.map((s) => s.color).join(", ")})`;
            return (
              <button
                key={id}
                type="button"
                onClick={() => applyPreset(id)}
                className={`group rounded-lg border overflow-hidden transition-all hover-elevate ${
                  selected ? "border-primary ring-2 ring-primary/40" : "border-border"
                }`}
                title={id}
              >
                <div className="aspect-square w-full" style={{ background: grad }} />
                <div className="text-[10px] text-center capitalize text-muted-foreground py-1">
                  {id}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Gradient stops
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-7"
            onClick={() => {
              const next = [...params.gradientStops];
              const last = next[next.length - 1];
              next.push({ color: last?.color ?? "#ffffff", position: 100 });
              updateStops(next);
            }}
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {params.gradientStops.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1">
                <ColorSwatch
                  value={s.color}
                  onChange={(c) => {
                    const next = [...params.gradientStops];
                    next[i] = { ...next[i], color: c };
                    updateStops(next);
                  }}
                />
              </div>
              <input
                type="number"
                value={s.position}
                min={0}
                max={100}
                onChange={(e) => {
                  const next = [...params.gradientStops];
                  next[i] = { ...next[i], position: Number(e.target.value) };
                  updateStops(next);
                }}
                className="w-14 h-9 rounded border border-border bg-input text-xs px-2 font-mono"
              />
              {params.gradientStops.length > 2 ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 w-9 p-0"
                  onClick={() => {
                    const next = params.gradientStops.filter((_, k) => k !== i);
                    updateStops(next);
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          {(["linear", "radial", "conic"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setParams((p) => ({ ...p, gradientType: t }))}
              className={`h-9 rounded-md border text-xs capitalize transition-all hover-elevate ${
                params.gradientType === t
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <LabelSlider
          label="Gradient angle"
          value={params.gradientAngle}
          min={0}
          max={360}
          step={1}
          unit="°"
          onChange={(v) => setParams((p) => ({ ...p, gradientAngle: v }))}
        />

        <label className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Reverse colors</span>
          <input
            type="checkbox"
            checked={params.reverseColor}
            onChange={(e) =>
              setParams((p) => ({ ...p, reverseColor: e.target.checked }))
            }
          />
        </label>
      </div>
    </div>
  );
}
