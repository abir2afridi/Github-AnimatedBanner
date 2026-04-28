import { useSimple } from "../../store/simple";
import { MainTab } from "./tabs/MainTab";
import { BackgroundTab } from "./tabs/BackgroundTab";
import { DecorationsTab } from "./tabs/DecorationsTab";
import { PresetsTab } from "./tabs/PresetsTab";
import { FontsTab } from "./tabs/FontsTab";
import {
  Type,
  Palette,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import { Button } from "../ui/button";

export function SimpleControlPanel() {
  const activeTab = useSimple((s) => s.activeTab);
  const setActiveTab = useSimple((s) => s.setActiveTab);
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);

  const tabs = [
    { id: "presets", label: "Presets", icon: LayoutGrid },
    { id: "main", label: "Main", icon: Type },
    { id: "background", label: "BG", icon: Palette },
    { id: "decorations", label: "Icon", icon: Sparkles },
    { id: "fonts", label: "Fonts", icon: Type },
  ] as const;

  return (
    <div className="flex flex-col h-full border-r border-border bg-background">
      {/* Header with Display Options */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/20">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          Quick Editor
        </h2>
        <div className="flex items-center gap-1 bg-background/50 p-0.5 rounded-lg border border-border">
          <Button
            variant={config.miniature ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => set((c) => ({ ...c, miniature: true }))}
            title="Fit to Screen"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant={!config.miniature ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => set((c) => ({ ...c, miniature: false }))}
            title="Full Size"
          >
            <Type className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex p-1 bg-secondary/30 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-md transition-all ${activeTab === tab.id
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
          >
            <tab.icon className={`w-4 h-4 mb-1 ${activeTab === tab.id ? "text-primary" : ""}`} />
            <span className="text-[10px] font-medium uppercase tracking-tight">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === "presets" && <PresetsTab />}
        {activeTab === "main" && <MainTab />}
        {activeTab === "background" && <BackgroundTab />}
        {activeTab === "decorations" && <DecorationsTab />}
        {activeTab === "fonts" && <FontsTab />}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-border bg-secondary/10">
        <p className="text-[10px] text-center text-muted-foreground">
          Tip: Use <span className="text-primary font-bold">Randomize</span> for inspiration
        </p>
      </div>
    </div>
  );
}
