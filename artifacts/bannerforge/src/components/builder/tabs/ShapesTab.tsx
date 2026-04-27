import { useMemo } from "react";
import {
  generateBannerSVG,
  SHAPE_LIST,
  type ShapeType,
  presetToStops,
} from "@workspace/banner-svg";
import { useBuilder } from "../../../store/builder";
import { LabelSlider } from "../Slider";

export function ShapesTab() {
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);

  const thumbStops = params.gradientStops.length
    ? params.gradientStops
    : presetToStops("ocean");

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
          Shape ({SHAPE_LIST.length})
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SHAPE_LIST.map((s) => {
            const selected = params.type === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setParams((p) => ({ ...p, type: s.id }))}
                className={`group relative rounded-md border bg-card overflow-hidden transition-all hover-elevate ${
                  selected
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-border"
                }`}
                title={s.label}
              >
                <ShapeThumb shape={s.id} stops={thumbStops} />
                <div className="text-[10px] text-center px-1 py-1 truncate text-muted-foreground group-hover:text-foreground">
                  {s.label}
                </div>
                {selected ? (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    ✓
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-border">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          Dimensions
        </div>
        <LabelSlider
          label="Width"
          value={params.width}
          min={400}
          max={2000}
          step={20}
          unit="px"
          onChange={(v) => setParams((p) => ({ ...p, width: v }))}
        />
        <LabelSlider
          label="Height"
          value={params.height}
          min={80}
          max={600}
          step={10}
          unit="px"
          onChange={(v) => setParams((p) => ({ ...p, height: v }))}
        />
      </div>
    </div>
  );
}

function ShapeThumb({
  shape,
  stops,
}: {
  shape: ShapeType;
  stops: ReturnType<typeof presetToStops>;
}) {
  const svg = useMemo(
    () =>
      generateBannerSVG({
        type: shape,
        width: 200,
        height: 100,
        color: stops[0]?.color ?? "#0072ff",
        gradientType: "linear",
        gradientAngle: 90,
        gradientStops: stops,
        reverseColor: false,
        pattern: "none",
        patternColor: "#fff",
        patternOpacity: 0,
        patternScale: 1,
        particles: "none",
        particleCount: 0,
        particleColor: "#fff",
        particleSize: 2,
        particleOpacity: 0,
        overlay: "none",
        overlayOpacity: 0,
        overlayColor: "#000",
        blur: 0,
        shadow: "none",
        brightness: 1,
        contrast: 1,
        saturation: 1,
        hueRotate: 0,
        animationSpeed: 1,
        textLayers: [],
      }),
    [shape, stops],
  );
  return (
    <div
      className="aspect-[2/1] w-full bg-[#0d1117]"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
