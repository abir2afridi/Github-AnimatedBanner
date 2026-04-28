import { useEffect } from "react";
import { Header } from "../components/builder/Header";
import { ControlPanel } from "../components/builder/ControlPanel";
import { PreviewPanel } from "../components/builder/PreviewPanel";
import { OutputPanel } from "../components/builder/OutputPanel";
import { useBuilder } from "../store/builder";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import SimpleMode from "../components/simple/SimpleMode";
import { AnimatePresence } from "framer-motion";

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
              className="h-full w-full grid grid-cols-1 lg:grid-cols-[380px_1fr_360px]"
            >
              <aside className="border-r border-border bg-card/40 min-h-0 overflow-hidden">
                <ControlPanel />
              </aside>
              <main className="min-h-0 overflow-hidden">
                <PreviewPanel />
              </main>
              <aside className="border-l border-border bg-card/40 min-h-0 overflow-hidden hidden lg:block">
                <OutputPanel />
              </aside>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
