import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { SimpleControlPanel } from "./SimpleControlPanel";
import { BannerPreview } from "./BannerPreview";
import { motion } from "framer-motion";
import { useSimple } from "../../store/simple";
import { 
  Expand,
  LayoutPanelLeft,
  LayoutGrid
} from "lucide-react";
import { PresetsTab } from "./tabs/PresetsTab";

export default function SimpleMode() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const hydrate = useSimple((s) => s.hydrate);
  
  const wrapRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [mobileTab, setMobileTab] = useState<"presets" | "customize">("presets");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setContainerW(w);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const fitScale =
    containerW > 0 && config.width > 0
      ? Math.min(1, (containerW - 80) / config.width)
      : 1;
  
  const scale = config.miniature ? Math.min(fitScale, 0.7) : fitScale;
  const scaledHeight = config.height * scale;
  const scaledWidth = config.width * scale;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col lg:flex-row h-full w-full overflow-hidden bg-background"
    >
      {/* Left: Presets Panel (Desktop) */}
      <aside className="hidden lg:flex flex-col w-75 xl:w-87.5 shrink-0 h-full border-r border-border bg-secondary/5 z-20 overflow-hidden">
        <div className="p-4 border-b border-border bg-background flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Presets</h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           <PresetsTab />
        </div>
        <Link
          href="/developer"
          className="shrink-0 px-4 py-2.5 border-t border-border bg-background/50 text-[10px] text-muted-foreground leading-relaxed hover:bg-primary/5 hover:text-foreground transition-colors block cursor-pointer"
        >
          <div className="font-medium">BannerForge v2025.11.17</div>
          <div>&copy; 2025 Abir Hasan Siam</div>
        </Link>
      </aside>

      {/* Center: Live Preview Area */}
      <main className="h-[45dvh] min-h-[200px] sm:h-[50dvh] lg:h-full lg:flex-1 bg-secondary/5 relative flex flex-col overflow-hidden min-w-0 z-10 border-b border-border lg:border-none">
        {/* Background Gradients for Depth */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]" />
        </div>

        {/* Banner Canvas Area */}
        <div 
          ref={wrapRef}
          className="flex-1 relative z-10 overflow-auto flex items-center justify-center p-4 lg:p-12 custom-scrollbar"
        >
          <div
            style={{
              width: config.miniature ? scaledWidth : config.width,
              height: config.miniature ? scaledHeight : config.height,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
            }}
            className="flex items-center justify-center"
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                width: config.width,
                height: config.height,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              id="simple-banner-preview-wrapper"
            >
              <BannerPreview />
            </div>
          </div>
          
          {/* Grid Background Overlay */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        
        {/* Zoom Footer */}
        {config.miniature && fitScale < 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-xl border border-border px-3 py-1.5 rounded-full text-[9px] text-muted-foreground flex items-center gap-2 shadow-2xl z-20 whitespace-nowrap">
            <Expand size={10} className="text-primary" />
            <span className="font-bold text-primary">{Math.round(fitScale * 100)}%</span> Zoom
          </div>
        )}
      </main>

      {/* Right Panel Header (Desktop) */}
      <aside className="hidden lg:flex flex-col w-75 xl:w-87.5 shrink-0 h-full border-l border-border shadow-xl z-20 overflow-hidden">
        <SimpleControlPanel />
      </aside>

      {/* Mobile/Tablet Bottom Panel */}
      <div className="flex lg:hidden flex-col flex-1 min-h-0 bg-background z-20">
        <div className="flex border-b border-border shrink-0 shadow-sm">
          <button 
            onClick={() => setMobileTab("presets")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 text-[11px] sm:text-xs font-bold transition-colors ${
              mobileTab === "presets" 
                ? "text-primary border-b-2 border-primary bg-primary/5" 
                : "text-muted-foreground hover:bg-secondary/20"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Presets
          </button>
          <button 
            onClick={() => setMobileTab("customize")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 text-[11px] sm:text-xs font-bold transition-colors ${
              mobileTab === "customize" 
                ? "text-primary border-b-2 border-primary bg-primary/5" 
                : "text-muted-foreground hover:bg-secondary/20"
            }`}
          >
            <LayoutPanelLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Customize
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {mobileTab === "presets" ? (
            <div className="h-full overflow-y-auto custom-scrollbar">
              <PresetsTab />
            </div>
          ) : (
            <div className="h-full overflow-hidden">
              <SimpleControlPanel />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
