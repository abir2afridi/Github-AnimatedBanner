import { ArrowDown, ArrowUp, Copy, Plus, Trash2 } from "lucide-react";
import { ANIMATIONS, AVAILABLE_FONTS } from "@workspace/banner-svg";
import { useBuilder } from "../../../store/builder";
import { ColorSwatch } from "../ColorSwatch";
import { LabelSlider } from "../Slider";
import { Button } from "../../ui/button";

export function TextTab() {
  const params = useBuilder((s) => s.params);
  const activeId = useBuilder((s) => s.activeTextLayerId);
  const setActive = useBuilder((s) => s.setActiveTextLayer);
  const addLayer = useBuilder((s) => s.addTextLayer);
  const removeLayer = useBuilder((s) => s.removeTextLayer);
  const duplicateLayer = useBuilder((s) => s.duplicateTextLayer);
  const moveLayer = useBuilder((s) => s.moveTextLayer);
  const updateLayer = useBuilder((s) => s.updateTextLayer);

  const layer = params.textLayers.find((l) => l.id === activeId) ?? params.textLayers[0];
  const layerIndex = layer ? params.textLayers.findIndex((l) => l.id === layer.id) : -1;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Layers ({params.textLayers.length})
          </div>
          <Button size="sm" variant="ghost" className="h-7" onClick={addLayer}>
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <div className="space-y-1">
          {params.textLayers.map((l, i) => (
            <div
              key={l.id}
              className={`w-full rounded border flex items-stretch hover-elevate ${
                activeId === l.id ? "border-primary bg-primary/10" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(l.id)}
                className="flex-1 min-w-0 px-2 py-2 text-left flex items-center gap-2"
              >
                <span
                  className="text-[10px] font-mono text-muted-foreground w-4 text-center"
                  title={`Layer ${i + 1}`}
                >
                  {i + 1}
                </span>
                <span className="truncate text-sm">{l.text || "(empty)"}</span>
              </button>
              <div className="flex items-center pr-1">
                <button
                  type="button"
                  className="w-6 h-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                  disabled={i === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(l.id, -1);
                  }}
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="w-6 h-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                  disabled={i === params.textLayers.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(l.id, 1);
                  }}
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="w-6 h-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateLayer(l.id);
                  }}
                  title="Duplicate"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="w-6 h-7 inline-flex items-center justify-center text-muted-foreground hover:text-destructive disabled:opacity-30"
                  disabled={params.textLayers.length === 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLayer(l.id);
                  }}
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {layer ? (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center justify-between">
            <span>Editing layer {layerIndex + 1}</span>
            <span className="text-[10px] font-mono normal-case tracking-normal">
              {layer.fontFamily} · {layer.fontSize}px
            </span>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Text</label>
            <textarea
              value={layer.text}
              onChange={(e) => updateLayer(layer.id, { text: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded border border-border bg-input text-sm px-2 py-1.5 font-sans"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Font family</label>
            <select
              value={layer.fontFamily}
              onChange={(e) => updateLayer(layer.id, { fontFamily: e.target.value })}
              className="mt-1 w-full h-9 rounded border border-border bg-input text-sm px-2"
            >
              {AVAILABLE_FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <LabelSlider
              label="Size"
              value={layer.fontSize}
              min={8}
              max={150}
              onChange={(v) => updateLayer(layer.id, { fontSize: v })}
              unit="px"
            />
            <div>
              <label className="text-xs text-muted-foreground">Weight</label>
              <select
                value={layer.fontWeight}
                onChange={(e) =>
                  updateLayer(layer.id, { fontWeight: Number(e.target.value) })
                }
                className="mt-1 w-full h-9 rounded border border-border bg-input text-sm px-2"
              >
                {[300, 400, 500, 600, 700, 800, 900].map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ColorSwatch
            label="Color"
            value={layer.fontColor}
            onChange={(c) => updateLayer(layer.id, { fontColor: c })}
          />

          <div className="grid grid-cols-3 gap-1.5">
            {(["left", "center", "right"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => updateLayer(layer.id, { fontAlign: a })}
                className={`h-9 rounded-md border text-xs capitalize hover-elevate ${
                  layer.fontAlign === a
                    ? "border-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <LabelSlider
            label="X position"
            value={layer.alignX}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => updateLayer(layer.id, { alignX: v })}
          />
          <LabelSlider
            label="Y position"
            value={layer.alignY}
            min={0}
            max={100}
            unit="%"
            onChange={(v) => updateLayer(layer.id, { alignY: v })}
          />
          <LabelSlider
            label="Letter spacing"
            value={layer.letterSpacing}
            min={-5}
            max={20}
            step={0.5}
            onChange={(v) => updateLayer(layer.id, { letterSpacing: v })}
          />
          <LabelSlider
            label="Rotation"
            value={layer.rotate}
            min={-180}
            max={180}
            unit="°"
            onChange={(v) => updateLayer(layer.id, { rotate: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <LabelSlider
              label="Skew X"
              value={layer.skewX ?? 0}
              min={-60}
              max={60}
              unit="°"
              onChange={(v) => updateLayer(layer.id, { skewX: v })}
            />
            <LabelSlider
              label="Skew Y"
              value={layer.skewY ?? 0}
              min={-60}
              max={60}
              unit="°"
              onChange={(v) => updateLayer(layer.id, { skewY: v })}
            />
          </div>
          <LabelSlider
            label="Opacity"
            value={layer.opacity}
            min={0}
            max={1}
            step={0.05}
            format={(v) => v.toFixed(2)}
            onChange={(v) => updateLayer(layer.id, { opacity: v })}
          />

          <div className="grid grid-cols-3 gap-1.5">
            {(["none", "uppercase", "lowercase"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateLayer(layer.id, { textTransform: t })}
                className={`h-8 rounded border text-[10px] capitalize hover-elevate ${
                  layer.textTransform === t
                    ? "border-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Effects
            </div>

            <ToggleEffect
              label="Text shadow"
              checked={layer.textShadow}
              onChange={(v) => updateLayer(layer.id, { textShadow: v })}
            >
              <ColorSwatch
                value={layer.textShadowColor}
                onChange={(c) => updateLayer(layer.id, { textShadowColor: c })}
              />
              <LabelSlider
                label="Blur"
                value={layer.textShadowBlur}
                min={0}
                max={40}
                onChange={(v) => updateLayer(layer.id, { textShadowBlur: v })}
              />
            </ToggleEffect>

            <ToggleEffect
              label="Glow"
              checked={layer.glowEffect}
              onChange={(v) => updateLayer(layer.id, { glowEffect: v })}
            >
              <ColorSwatch
                value={layer.glowColor}
                onChange={(c) => updateLayer(layer.id, { glowColor: c })}
              />
              <LabelSlider
                label="Radius"
                value={layer.glowRadius}
                min={0}
                max={40}
                onChange={(v) => updateLayer(layer.id, { glowRadius: v })}
              />
            </ToggleEffect>

            <ToggleEffect
              label="Stroke"
              checked={layer.textStroke}
              onChange={(v) => updateLayer(layer.id, { textStroke: v })}
            >
              <ColorSwatch
                value={layer.textStrokeColor}
                onChange={(c) => updateLayer(layer.id, { textStrokeColor: c })}
              />
              <LabelSlider
                label="Width"
                value={layer.textStrokeWidth}
                min={0}
                max={10}
                step={0.5}
                onChange={(v) => updateLayer(layer.id, { textStrokeWidth: v })}
              />
            </ToggleEffect>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Animation
            </div>
            <select
              value={layer.animation}
              onChange={(e) =>
                updateLayer(layer.id, {
                  animation: e.target.value as (typeof ANIMATIONS)[number]["id"],
                })
              }
              className="w-full h-9 rounded border border-border bg-input text-sm px-2"
            >
              {ANIMATIONS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
            <LabelSlider
              label="Delay"
              value={layer.animationDelay}
              min={0}
              max={3000}
              step={50}
              unit="ms"
              onChange={(v) => updateLayer(layer.id, { animationDelay: v })}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ToggleEffect({
  label,
  checked,
  onChange,
  children,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded border border-border bg-card/40 p-2 space-y-2">
      <label className="flex items-center justify-between text-xs cursor-pointer">
        <span className="text-foreground">{label}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
      {checked ? <div className="space-y-2 pt-1">{children}</div> : null}
    </div>
  );
}
