import { useEffect } from "react";
import { Link } from "wouter";
import { Header } from "../components/builder/Header";
import { ControlPanel } from "../components/builder/ControlPanel";
import { PreviewPanel } from "../components/builder/PreviewPanel";
import { OutputPanel } from "../components/builder/OutputPanel";
import { useBuilder } from "../store/builder";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import SimpleMode from "../components/simple/SimpleMode";
import { AnimatePresence } from "framer-motion";
import { LayoutTemplate } from "lucide-react";
import { PresetsTab } from "../components/builder/tabs/PresetsTab";

export default function Builder() {
  const loadFromQuery = useBuilder((s) => s.loadFromQueryString);
  const mode = useBuilder((s) => s.mode);
  const setMode = useBuilder((s) => s.setMode);

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
    <div className="h-screen w-full flex flex-col text-foreground overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {mode === "simple" ? (
            <SimpleMode key="simple-mode" />
          ) : (
            <div 
              key="advanced-mode"
              className="h-full w-full grid grid-cols-1 lg:grid-cols-[350px_1fr_350px]"
            >
              <aside className="border-r border-border bg-card/40 min-h-0 overflow-hidden flex flex-col">
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
                  <div className="font-medium">TPT-Tools v2025.11.17</div>
                  <div>&copy; 2025 Abir Hasan Siam</div>
                </Link>
              </aside>
              <main className="min-h-0 overflow-hidden">
                <PreviewPanel />
              </main>
              <aside className="border-l border-border bg-card/40 min-h-0 overflow-hidden hidden lg:block">
                <ControlPanel />
              </aside>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
