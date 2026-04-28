import {
  Grid3x3,
  Palette,
  Type,
  Hash,
  Sparkles,
  Wand,
  LayoutTemplate,
} from "lucide-react";
import { useBuilder } from "../../store/builder";
import { ShapesTab } from "./tabs/ShapesTab";
import { ColorsTab } from "./tabs/ColorsTab";
import { TextTab } from "./tabs/TextTab";
import { PatternsTab } from "./tabs/PatternsTab";
import { ParticlesTab } from "./tabs/ParticlesTab";
import { EffectsTab } from "./tabs/EffectsTab";
import { PresetsTab } from "./tabs/PresetsTab";

const TABS = [
  { id: "shapes", label: "Variation", icon: Grid3x3 },
  { id: "colors", label: "Colors", icon: Palette },
  { id: "text", label: "Text", icon: Type },
  { id: "patterns", label: "Patterns", icon: Hash },
  { id: "particles", label: "Particles", icon: Sparkles },
  { id: "effects", label: "Effects", icon: Wand },
  { id: "presets", label: "Presets", icon: LayoutTemplate },
] as const;

export function ControlPanel() {
  const activeTab = useBuilder((s) => s.activeTab);
  const setActiveTab = useBuilder((s) => s.setActiveTab);

  return (
    <div className="flex h-full min-h-0">
      <div className="w-14 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col py-2 gap-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              title={t.label}
              className={`mx-1.5 h-12 rounded-md flex flex-col items-center justify-center gap-0.5 hover-elevate transition-colors ${active
                  ? "bg-sidebar-primary/10 text-sidebar-primary"
                  : "text-sidebar-foreground/70"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] uppercase tracking-wide">{t.label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex-1 min-w-0 overflow-y-auto scrollbar-thin px-4 py-4">
        {activeTab === "shapes" ? <ShapesTab /> : null}
        {activeTab === "colors" ? <ColorsTab /> : null}
        {activeTab === "text" ? <TextTab /> : null}
        {activeTab === "patterns" ? <PatternsTab /> : null}
        {activeTab === "particles" ? <ParticlesTab /> : null}
        {activeTab === "effects" ? <EffectsTab /> : null}
        {activeTab === "presets" ? <PresetsTab /> : null}
      </div>
    </div>
  );
}
