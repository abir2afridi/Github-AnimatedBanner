import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Header } from "../components/builder/Header";
import { ControlPanel } from "../components/builder/ControlPanel";
import { PreviewPanel } from "../components/builder/PreviewPanel";
import { OutputPanel } from "../components/builder/OutputPanel";
import { useBuilder } from "../store/builder";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import SimpleMode from "../components/simple/SimpleMode";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutTemplate, LayoutPanelLeft, LayoutGrid, PanelLeftClose, PanelRightClose, X } from "lucide-react";
import { PresetsTab } from "../components/builder/tabs/PresetsTab";

export default function Builder() {
  const loadFromQuery = useBuilder((s) => s.loadFromQueryString);
  const mode = useBuilder((s) => s.mode);
  const setMode = useBuilder((s) => s.setMode);
  const [sidebar, setSidebar] = useState<"presets" | "controls" | null>(null);

  // Hydrate from URL once on mount so /?type=... (Advanced) or #... (Simple) shareable links work.
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check for Simple Mode (hash)
    if (window.location.hash) {
      setMode("simple");
    } 
    // Check for Advanced Mode (query string)
    else if (window.location.search) {
      setMode("svg");
      loadFromQuery(window.location.search);
    }
  }, [loadFromQuery, setMode]);

  useKeyboardShortcuts();

  return (
    <div className="h-dvh w-full flex flex-col text-foreground overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {mode === "simple" ? (
            <SimpleMode key="simple-mode" />
          ) : (
            <div 
              key="advanced-mode"
              className="h-full w-full grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[350px_1fr_350px]"
            >
              {/* Desktop left sidebar */}
              <aside className="border-r border-border bg-card/40 min-h-0 overflow-hidden flex-col hidden lg:flex">
                <div className="p-4 border-b border-border bg-background flex items-center gap-2 shrink-0">
                  <LayoutTemplate className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-wider">Presets Library</h2>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
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

              {/* Center: Preview */}
              <main className="min-h-0 overflow-hidden">
                <PreviewPanel />
              </main>

              {/* Desktop right sidebar */}
              <aside className="border-l border-border bg-card/40 min-h-0 overflow-hidden hidden lg:block">
                <ControlPanel />
              </aside>

              {/* ─── Mobile overlay toggle buttons ─── */}
              <div className="flex lg:hidden fixed bottom-4 left-4 right-4 z-50 gap-2 pointer-events-none">
                <button
                  onClick={() => setSidebar(sidebar === "presets" ? null : "presets")}
                  className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-background/90 backdrop-blur-xl border border-border shadow-xl rounded-lg text-xs font-bold text-foreground hover:bg-background transition-all active:scale-95"
                >
                  <LayoutGrid className="w-4 h-4 text-primary" />
                  Presets
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => setSidebar(sidebar === "controls" ? null : "controls")}
                  className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-background/90 backdrop-blur-xl border border-border shadow-xl rounded-lg text-xs font-bold text-foreground hover:bg-background transition-all active:scale-95"
                >
                  Controls
                  <LayoutPanelLeft className="w-4 h-4 text-primary" />
                </button>
              </div>

              {/* ─── Mobile overlay: Presets ─── */}
              <AnimatePresence>
                {sidebar === "presets" && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    className="fixed inset-0 z-40 flex lg:hidden"
                  >
                    <div className="w-[85vw] max-w-sm bg-background border-r border-border flex flex-col shadow-2xl">
                      <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center gap-2">
                          <LayoutTemplate className="w-4 h-4 text-primary" />
                          <h2 className="text-sm font-bold uppercase tracking-wider">Presets Library</h2>
                        </div>
                        <button onClick={() => setSidebar(null)} className="p-1 hover:bg-secondary/20 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
                        <PresetsTab />
                      </div>
                      <Link
                        href="/developer"
                        className="shrink-0 px-4 py-2.5 border-t border-border bg-background/50 text-[10px] text-muted-foreground leading-relaxed hover:bg-primary/5 hover:text-foreground transition-colors block cursor-pointer"
                        onClick={() => setSidebar(null)}
                      >
                        <div className="font-medium">BannerForge v2025.11.17</div>
                        <div>&copy; 2025 Abir Hasan Siam</div>
                      </Link>
                    </div>
                    <div className="flex-1 bg-black/40" onClick={() => setSidebar(null)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── Mobile overlay: Controls ─── */}
              <AnimatePresence>
                {sidebar === "controls" && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    className="fixed inset-0 z-40 flex lg:hidden justify-end"
                  >
                    <div className="flex-1 bg-black/40" onClick={() => setSidebar(null)} />
                    <div className="w-[85vw] max-w-sm bg-background border-l border-border flex shadow-2xl">
                      <ControlPanel compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
