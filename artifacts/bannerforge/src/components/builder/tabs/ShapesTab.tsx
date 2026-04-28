import { useMemo } from "react";
import {
  generateBannerSVG,
  SHAPE_LIST,
  type ShapeType,
  presetToStops,
  type BannerParams,
  GALLERY_PRESETS,
  COLOR_PRESETS,
} from "@workspace/banner-svg";
import { useBuilder } from "../../../store/builder";
import { LabelSlider } from "../Slider";
import { Sparkles, LayoutGrid } from "lucide-react";

export function ShapesTab() {
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);
  const loadParams = useBuilder((s) => s.loadParams);

  const thumbStops = params.gradientStops.length
    ? params.gradientStops
    : presetToStops("ocean");

  // Generate 9 smart variations of the current design
  const variations = useMemo(() => {
    const variants: BannerParams[] = [];
    const patterns = ["none", "dots", "grid", "circuit", "hexagon", "triangle", "noise", "mesh", "waves_3d", "pixel"] as const;
    const particles = ["none", "stars", "sparkles", "embers", "fireflies", "snowflakes", "matrix", "rain", "bubbles", "confetti"] as const;
    const overlays = ["none", "vignette", "glass", "aurora", "lava", "energy", "circuit", "dust", "paper", "snow"] as const;
    
    // Seeded random for consistency within one render session but different for each variant
    for (let i = 0; i < 9; i++) {
      const v: BannerParams = {
        ...params,
        // Jitter some properties but keep core identity (text, primary colors)
        pattern: patterns[Math.floor(Math.random() * patterns.length)],
        particles: particles[Math.floor(Math.random() * particles.length)],
        overlay: overlays[Math.floor(Math.random() * overlays.length)],
        patternOpacity: 0.05 + Math.random() * 0.15,
        overlayOpacity: 0.1 + Math.random() * 0.3,
        animationSpeed: 0.5 + Math.random() * 1.5,
        // Occasionally swap shape
        type: Math.random() > 0.7 ? SHAPE_LIST[Math.floor(Math.random() * SHAPE_LIST.length)].id : params.type,
      };
      variants.push(v);
    }
    return variants;
  }, [params.id, params.type, params.colorPreset, params.gradientStops]); // Only regenerate if core identity changes

  return (
    <div className="space-y-6">
      {/* Smart Variations Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            Smart Variations
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {variations.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => loadParams(v)}
              className="group relative aspect-[2/1] rounded-md border border-border bg-card overflow-hidden hover-elevate transition-all hover:border-primary/50"
            >
              <VariationThumb params={v} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Apply</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/50" />

      {/* Base Shapes Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Base Shape ({SHAPE_LIST.length})
          </div>
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
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center shadow-lg">
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

function VariationThumb({ params }: { params: BannerParams }) {
  const svg = useMemo(
    () => generateBannerSVG({ ...params, width: 200, height: 100 }),
    [params]
  );
  return (
    <div
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
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
        borderWidth: 0,
        borderColor: "#fff",
        borderRadius: 0,
        borderStyle: "none",
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

