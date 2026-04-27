import { useBuilder } from "../../../store/builder";
import { ColorSwatch } from "../ColorSwatch";
import { LabelSlider } from "../Slider";
import type { ParticleType } from "@workspace/banner-svg";

const PARTICLES: { id: ParticleType; label: string; emoji: string }[] = [
  { id: "none", label: "None", emoji: "∅" },
  { id: "stars", label: "Stars", emoji: "★" },
  { id: "snowflakes", label: "Snow", emoji: "❄" },
  { id: "bubbles", label: "Bubbles", emoji: "○" },
  { id: "confetti", label: "Confetti", emoji: "▮" },
  { id: "sparkles", label: "Sparkle", emoji: "✦" },
  { id: "embers", label: "Embers", emoji: "•" },
  { id: "matrix", label: "Matrix", emoji: "01" },
  { id: "hearts", label: "Hearts", emoji: "♥" },
  { id: "fireflies", label: "Fireflies", emoji: "✶" },
];

export function ParticlesTab() {
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
          Particle type
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PARTICLES.map((p) => {
            const selected = params.particles === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setParams((prev) => ({ ...prev, particles: p.id }))}
                className={`group rounded-md border bg-card overflow-hidden hover-elevate p-2 ${
                  selected ? "border-primary ring-2 ring-primary/40" : "border-border"
                }`}
              >
                <div className="aspect-[2/1] w-full bg-zinc-900 rounded grid place-items-center text-2xl text-zinc-400">
                  {p.emoji}
                </div>
                <div className="text-[10px] text-center text-muted-foreground pt-1">
                  {p.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {params.particles !== "none" ? (
        <div className="space-y-3 pt-2 border-t border-border">
          <LabelSlider
            label="Count"
            value={params.particleCount}
            min={0}
            max={200}
            step={5}
            onChange={(v) => setParams((p) => ({ ...p, particleCount: v }))}
          />
          <ColorSwatch
            label="Particle color"
            value={params.particleColor}
            onChange={(c) => setParams((p) => ({ ...p, particleColor: c }))}
          />
          <LabelSlider
            label="Size"
            value={params.particleSize}
            min={1}
            max={30}
            onChange={(v) => setParams((p) => ({ ...p, particleSize: v }))}
            unit="px"
          />
          <LabelSlider
            label="Opacity"
            value={params.particleOpacity}
            min={0}
            max={1}
            step={0.05}
            format={(v) => v.toFixed(2)}
            onChange={(v) => setParams((p) => ({ ...p, particleOpacity: v }))}
          />
        </div>
      ) : null}
    </div>
  );
}
