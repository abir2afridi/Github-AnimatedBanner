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
  { id: "noise", label: "Noise" },
  { id: "texture", label: "Texture" },
  { id: "grid", label: "Grid" },
  { id: "glitch", label: "Glitch" },
  { id: "crt", label: "CRT" },
  { id: "duotone", label: "Duotone" },
  { id: "prism", label: "Prism" },
  { id: "vhs", label: "VHS" },
  { id: "hologram", label: "Hologram" },
  { id: "water", label: "Water" },
  { id: "fire", label: "Fire" },
  { id: "matrix", label: "Matrix" },
  { id: "aurora", label: "Aurora" },
  { id: "lava", label: "Lava" },
  { id: "energy", label: "Energy" },
  { id: "circuit", label: "Circuit" },
  { id: "dust", label: "Dust" },
  { id: "paper", label: "Paper" },
  { id: "canvas", label: "Canvas" },
];

const SHADOWS: { id: ShadowType; label: string }[] = [
  { id: "none", label: "None" },
  { id: "soft", label: "Soft" },
  { id: "hard", label: "Hard" },
  { id: "neon", label: "Neon" },
  { id: "floating", label: "Floating" },
  { id: "inset", label: "Inset" },
  { id: "glow", label: "Glow" },
  { id: "glass", label: "Glass" },
  { id: "3d", label: "3D" },
  { id: "layered", label: "Layered" },
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

      <div className="pt-2 border-t border-border">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Border & Corner
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[
            "none",
            "solid",
            "dashed",
            "dotted",
            "gradient",
            "marching",
            "zigzag",
            "double",
            "groove",
            "ridge",
            "neon",
            "glass",
            "frame",
            "bracket",
          ].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setParams((p) => ({
                  ...p,
                  borderStyle: s as any,
                  borderWidth: s !== "none" && p.borderWidth === 0 ? 4 : p.borderWidth,
                }))
              }
              className={`h-9 rounded border text-[11px] hover-elevate ${
                params.borderStyle === s
                  ? "border-primary bg-primary/10"
                  : "border-border text-muted-foreground"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        {params.borderStyle !== "none" ? (
          <div className="space-y-3">
            <ColorSwatch
              label="Border color"
              value={params.borderColor}
              onChange={(c) => setParams((p) => ({ ...p, borderColor: c }))}
            />
            <LabelSlider
              label="Border width"
              value={params.borderWidth}
              min={0}
              max={20}
              unit="px"
              onChange={(v) => setParams((p) => ({ ...p, borderWidth: v }))}
            />
          </div>
        ) : null}
        <div className="mt-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Corner Style
          </div>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {["rounded", "cut", "beveled"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setParams((p) => ({ ...p, cornerStyle: s as any }))}
                className={`h-9 rounded border text-[11px] hover-elevate ${
                  params.cornerStyle === s || (!params.cornerStyle && s === 'rounded')
                    ? "border-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <LabelSlider
            label="Corner radius"
            value={params.borderRadius}
            min={0}
            max={100}
            unit="px"
            onChange={(v) => setParams((p) => ({ ...p, borderRadius: v }))}
          />
        </div>
      </div>
    </div>
  );
}
