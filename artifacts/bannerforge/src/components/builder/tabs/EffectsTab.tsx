import { useBuilder } from "../../../store/builder";
import { ColorSwatch } from "../ColorSwatch";
import { LabelSlider } from "../Slider";
import type { OverlayType, ShadowType } from "@workspace/banner-svg";

const OVERLAYS: { id: OverlayType; label: string }[] = [
  { id: "none", label: "None" },
  { id: "vignette", label: "Vignette" },
  { id: "scanlines", label: "Scanlines" },
  { id: "grain", label: "Grain" },
  { id: "lightLeak", label: "Light leak" },
  { id: "fog", label: "Fog" },
];

const SHADOWS: { id: ShadowType; label: string }[] = [
  { id: "none", label: "None" },
  { id: "soft", label: "Soft" },
  { id: "hard", label: "Hard" },
  { id: "neon", label: "Neon" },
];

export function EffectsTab() {
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Overlay
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {OVERLAYS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setParams((p) => ({ ...p, overlay: o.id }))}
              className={`h-9 rounded border text-[11px] hover-elevate ${
                params.overlay === o.id
                  ? "border-primary bg-primary/10"
                  : "border-border text-muted-foreground"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        {params.overlay !== "none" ? (
          <div className="mt-3 space-y-2">
            <ColorSwatch
              label="Color"
              value={params.overlayColor}
              onChange={(c) => setParams((p) => ({ ...p, overlayColor: c }))}
            />
            <LabelSlider
              label="Opacity"
              value={params.overlayOpacity}
              min={0}
              max={1}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={(v) => setParams((p) => ({ ...p, overlayOpacity: v }))}
            />
          </div>
        ) : null}
      </div>

      <div className="pt-2 border-t border-border">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Drop shadow
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {SHADOWS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setParams((p) => ({ ...p, shadow: s.id }))}
              className={`h-9 rounded border text-[11px] hover-elevate ${
                params.shadow === s.id
                  ? "border-primary bg-primary/10"
                  : "border-border text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-border space-y-3">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          Color adjust
        </div>
        <LabelSlider
          label="Brightness"
          value={params.brightness}
          min={0}
          max={2}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={(v) => setParams((p) => ({ ...p, brightness: v }))}
        />
        <LabelSlider
          label="Contrast"
          value={params.contrast}
          min={0}
          max={2}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={(v) => setParams((p) => ({ ...p, contrast: v }))}
        />
        <LabelSlider
          label="Saturation"
          value={params.saturation}
          min={0}
          max={2}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={(v) => setParams((p) => ({ ...p, saturation: v }))}
        />
        <LabelSlider
          label="Hue rotate"
          value={params.hueRotate}
          min={0}
          max={360}
          unit="°"
          onChange={(v) => setParams((p) => ({ ...p, hueRotate: v }))}
        />
        <LabelSlider
          label="Blur"
          value={params.blur}
          min={0}
          max={20}
          unit="px"
          onChange={(v) => setParams((p) => ({ ...p, blur: v }))}
        />
      </div>

      <div className="pt-2 border-t border-border space-y-3">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          Animation
        </div>
        <LabelSlider
          label="Animation speed"
          value={params.animationSpeed}
          min={0.1}
          max={5}
          step={0.1}
          format={(v) => `${v.toFixed(1)}x`}
          onChange={(v) => setParams((p) => ({ ...p, animationSpeed: v }))}
        />
      </div>
    </div>
  );
}
