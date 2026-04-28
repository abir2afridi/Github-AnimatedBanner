import { useEffect, useRef, useState } from "react";
import { SimpleControlPanel } from "./SimpleControlPanel";
import { BannerPreview } from "./BannerPreview";
import { SimpleOutputPanel } from "./SimpleOutputPanel";
import { motion } from "framer-motion";
import { useSimple } from "../../store/simple";
import { 
  Expand
} from "lucide-react";

export default function SimpleMode() {
  const config = useSimple((s) => s.config);
  const set = useSimple((s) => s.set);
  const hydrate = useSimple((s) => s.hydrate);
  
  const wrapRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

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
  
  const scale = config.miniature ? fitScale : 1;
  const scaledHeight = config.height * scale;
  const scaledWidth = config.width * scale;



  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-full overflow-hidden bg-background"
    >
      {/* Left: Configuration Panel */}
      <aside className="w-[340px] shrink-0 h-full border-r border-border shadow-xl z-20">
        <SimpleControlPanel />
      </aside>

      {/* Center: Live Preview Area */}
      <main className="flex-1 h-full bg-secondary/5 relative flex flex-col overflow-hidden">
        {/* Background Gradients for Depth */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]" />
        </div>

        {/* Banner Canvas Area */}
        <div 
          ref={wrapRef}
          className="flex-1 relative z-10 overflow-auto flex items-center justify-center p-12 custom-scrollbar"
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-xl border border-border px-4 py-2 rounded-full text-[10px] text-muted-foreground flex items-center gap-2 shadow-2xl z-20">
            <Expand size={12} className="text-primary" />
            Scaled down to <span className="font-bold text-primary">{Math.round(fitScale * 100)}%</span> to fit your screen
          </div>
        )}
      </main>

      {/* Right: Export/Output Panel */}
      <aside className="w-[320px] shrink-0 h-full border-l border-border shadow-2xl z-20">
        <SimpleOutputPanel />
      </aside>
    </motion.div>
  );
}
