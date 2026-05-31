import { useSimple } from "../../store/simple";
import { MainTab } from "./tabs/MainTab";
import { BackgroundTab } from "./tabs/BackgroundTab";
import { DecorationsTab } from "./tabs/DecorationsTab";
import { PresetsTab } from "./tabs/PresetsTab";
import { FontsTab } from "./tabs/FontsTab";
import { Button } from "../ui/button";
import { presets } from "../../lib/simple/presets";
import { FONTS } from "../../lib/simple/fonts";
import { allDecorations, decorations } from "../../lib/simple/decorations";
import { patterns } from "../../lib/simple/patterns";
import { buildShareUrl } from "../../lib/simple/share";
import { Share2, Check, LayoutGrid, Type, Palette, Sparkles, Library, RotateCcw, Download } from "lucide-react";
import { SimpleOutputPanel } from "./SimpleOutputPanel";
import { useState } from "react";



export function SimpleControlPanel() {
  const activeTab = useSimple((s) => s.activeTab);
  const setActiveTab = useSimple((s) => s.setActiveTab);
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const reset = useSimple((s) => s.reset);
  const randomize = useSimple((s) => s.randomize);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = buildShareUrl(config);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const canvasSizes = [
    { name: "Slim", w: 800, h: 200 },
    { name: "Std", w: 800, h: 400 },
    { name: "Tall", w: 800, h: 600 },
    { name: "Insta", w: 1080, h: 1080 },
  ];

  const tabs = [
    { id: "main", label: "Main", icon: Type },
    { id: "background", label: "BG", icon: Palette, count: Object.keys(patterns).length },
    { id: "decorations", label: "Icon", icon: Sparkles, count: Object.keys(allDecorations).length },
    { id: "fonts", label: "Fonts", icon: Type, count: FONTS.length },
    { id: "export", label: "Export", icon: Download },
  ] as const;


  return (
    <div className="flex flex-col h-full border-r border-border bg-background">
      {/* Header with Display Options */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/20">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          Quick Editor
        </h2>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1.5 sm:px-2 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-secondary/80 gap-1"
            onClick={reset}
            title="Reset to Default"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">RESET</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1.5 sm:px-2 text-[10px] font-bold text-primary hover:text-primary hover:bg-primary/10 gap-1"
            onClick={randomize}
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">RANDOMIZE</span>
          </Button>
          <div className="flex items-center gap-0.5 sm:gap-1 bg-background/50 p-0.5 rounded-lg border border-border">

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
    </div>

      {/* Tabs Navigation */}
      <div className="flex p-1 bg-secondary/30 border-b border-border overflow-x-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-md transition-all ${activeTab === tab.id
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
          >
            <tab.icon className={`w-4 h-4 mb-1 ${activeTab === tab.id ? "text-primary" : ""}`} />
            <span className="text-[10px] font-medium uppercase tracking-tight relative">
              {tab.label}
              {"count" in tab && (
                <span className="absolute -top-2 -right-3 bg-primary/20 text-primary text-[7px] font-bold px-1 rounded-full border border-primary/20">
                  {tab.count}
                </span>
              )}
            </span>
          </button>

        ))}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {activeTab === "main" && <MainTab />}
        {activeTab === "background" && <BackgroundTab />}
        {activeTab === "decorations" && <DecorationsTab />}
        {activeTab === "fonts" && <FontsTab />}
        {activeTab === "export" && <SimpleOutputPanel />}
      </div>

      <div className="p-4 border-t border-border bg-linear-to-br from-secondary/30 to-background">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="w-full h-8 text-[10px] font-bold gap-2 bg-background hover:bg-secondary/50"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-500" />
              URL COPIED!
            </>
          ) : (
            <>
              <Share2 className="w-3 h-3" />
              SHARE DESIGN URL
            </>
          )}
        </Button>
      </div>


    </div>
  );
}
