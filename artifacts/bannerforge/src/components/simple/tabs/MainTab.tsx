import { useSimple } from "../../../store/simple";
import { FONTS } from "../../../lib/simple/fonts";
import { LabelSlider } from "../../builder/Slider";
import { ColorSwatch } from "../../builder/ColorSwatch";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function MainTab() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);

  const update = (updates: Partial<typeof config>) => {
    set((c) => ({ ...c, ...updates }));
  };

  const aligns = [
    { id: "left", Icon: AlignLeft },
    { id: "center", Icon: AlignCenter },
    { id: "right", Icon: AlignRight },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Title
        </label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => update({ title: e.target.value })}
          className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Hey! I am ..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Subtitle
        </label>
        <input
          type="text"
          value={config.subtitle}
          onChange={(e) => update({ subtitle: e.target.value })}
          className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Fullstack developer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            Width
          </label>
          <input
            type="number"
            value={config.width}
            onChange={(e) => update({ width: Number(e.target.value) })}
            className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            Height
          </label>
          <input
            type="number"
            value={config.height}
            onChange={(e) => update({ height: Number(e.target.value) })}
            className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <LabelSlider
        label="Padding"
        value={config.padding}
        min={0}
        max={100}
        onChange={(v) => update({ padding: v })}
      />

      <div className="grid grid-cols-2 gap-4">
        <ColorSwatch
          label="Title Color"
          value={config.titleColor}
          onChange={(v) => update({ titleColor: v })}
        />
        <ColorSwatch
          label="Subtitle Color"
          value={config.subtitleColor}
          onChange={(v) => update({ subtitleColor: v })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Text Alignment
        </label>
        <div className="flex p-1 bg-secondary/30 rounded-xl border border-border gap-1">
          {aligns.map(({ id, Icon }) => (
            <button
              key={id}
              onClick={() => update({ textAlign: id })}
              className={`flex-1 h-9 flex items-center justify-center rounded-lg transition-all ${
                config.textAlign === id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            Title Font
          </label>
          <select
            value={config.titleFont}
            onChange={(e) => update({ titleFont: e.target.value })}
            className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
          >
            {FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <LabelSlider
          label="Title Size"
          value={config.titleSize}
          min={10}
          max={120}
          onChange={(v) => update({ titleSize: v })}
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            Subtitle Font
          </label>
          <select
            value={config.subtitleFont}
            onChange={(e) => update({ subtitleFont: e.target.value })}
            className="w-full h-10 rounded-xl border border-border bg-secondary/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
          >
            {FONTS.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <LabelSlider
          label="Subtitle Size"
          value={config.subtitleSize}
          min={10}
          max={80}
          onChange={(v) => update({ subtitleSize: v })}
        />
      </div>
    </div>
  );
}
