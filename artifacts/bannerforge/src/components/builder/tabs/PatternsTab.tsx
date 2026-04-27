import { useBuilder } from "../../../store/builder";
import { ColorSwatch } from "../ColorSwatch";
import { LabelSlider } from "../Slider";
import type { PatternType } from "@workspace/banner-svg";

const PATTERNS: { id: PatternType; label: string }[] = [
  { id: "none", label: "None" },
  { id: "dots", label: "Dots" },
  { id: "grid", label: "Grid" },
  { id: "lines", label: "Lines" },
  { id: "diagonal", label: "Diagonal" },
  { id: "cross", label: "Cross" },
  { id: "circuit", label: "Circuit" },
  { id: "hexagon", label: "Hexagon" },
  { id: "triangle", label: "Triangle" },
  { id: "wave", label: "Wave" },
  { id: "noise", label: "Noise" },
  { id: "isometric", label: "Iso" },
  { id: "topography", label: "Topo" },
  { id: "checker", label: "Checker" },
];

export function PatternsTab() {
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
          Pattern overlay
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PATTERNS.map((p) => {
            const selected = params.pattern === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setParams((prev) => ({ ...prev, pattern: p.id }))}
                className={`group rounded-md border bg-card overflow-hidden hover-elevate ${
                  selected
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-border"
                }`}
              >
                <PatternThumb type={p.id} />
                <div className="text-[10px] text-center text-muted-foreground py-1">
                  {p.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {params.pattern !== "none" ? (
        <div className="space-y-3 pt-2 border-t border-border">
          <ColorSwatch
            label="Pattern color"
            value={params.patternColor}
            onChange={(c) => setParams((p) => ({ ...p, patternColor: c }))}
          />
          <LabelSlider
            label="Opacity"
            value={params.patternOpacity}
            min={0}
            max={1}
            step={0.05}
            format={(v) => v.toFixed(2)}
            onChange={(v) => setParams((p) => ({ ...p, patternOpacity: v }))}
          />
          <LabelSlider
            label="Scale"
            value={params.patternScale}
            min={0.2}
            max={4}
            step={0.1}
            format={(v) => `${v.toFixed(1)}x`}
            onChange={(v) => setParams((p) => ({ ...p, patternScale: v }))}
          />
        </div>
      ) : null}
    </div>
  );
}

function PatternThumb({ type }: { type: PatternType }) {
  if (type === "none") {
    return <div className="aspect-[2/1] w-full bg-zinc-900 grid place-items-center text-[9px] text-muted-foreground">∅</div>;
  }
  // Render a quick CSS-driven thumbnail
  const styles: Record<PatternType, React.CSSProperties> = {
    none: {},
    dots: {
      backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
      backgroundSize: "10px 10px",
    },
    grid: {
      backgroundImage:
        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
      backgroundSize: "10px 10px",
    },
    lines: {
      backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 8px)",
    },
    diagonal: {
      backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 10px)",
    },
    cross: {
      backgroundImage:
        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
      backgroundSize: "12px 12px",
    },
    circuit: {
      backgroundImage:
        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
      backgroundSize: "16px 16px",
    },
    hexagon: {
      backgroundImage:
        "radial-gradient(circle at 50% 50%, #fff 1px, transparent 2px)",
      backgroundSize: "14px 14px",
    },
    triangle: {
      backgroundImage:
        "linear-gradient(60deg, #fff 1px, transparent 1px), linear-gradient(-60deg, #fff 1px, transparent 1px)",
      backgroundSize: "14px 14px",
    },
    wave: {
      backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 6px)",
    },
    noise: {
      backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)",
      backgroundSize: "6px 6px",
    },
    isometric: {
      backgroundImage:
        "linear-gradient(60deg, #fff 1px, transparent 1px), linear-gradient(-60deg, #fff 1px, transparent 1px)",
      backgroundSize: "12px 12px",
    },
    topography: {
      backgroundImage: "radial-gradient(circle, transparent 4px, #fff 4.5px, transparent 5px)",
      backgroundSize: "16px 16px",
    },
    checker: {
      backgroundImage:
        "conic-gradient(#fff 25%, transparent 0 50%, #fff 0 75%, transparent 0)",
      backgroundSize: "12px 12px",
    },
  };
  return (
    <div
      className="aspect-[2/1] w-full bg-zinc-900"
      style={{
        ...styles[type],
        opacity: 0.6,
      }}
    />
  );
}
