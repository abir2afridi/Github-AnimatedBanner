import { useEffect } from "react";
import { Header } from "../components/builder/Header";
import { ControlPanel } from "../components/builder/ControlPanel";
import { PreviewPanel } from "../components/builder/PreviewPanel";
import { OutputPanel } from "../components/builder/OutputPanel";
import { useBuilder } from "../store/builder";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function Builder() {
  const loadFromQuery = useBuilder((s) => s.loadFromQueryString);

  // Hydrate from URL once on mount so /?type=...&color=... shareable links work.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.search) {
      loadFromQuery(window.location.search);
    }
  }, [loadFromQuery]);

  useKeyboardShortcuts();

  return (
    <div className="h-screen w-full flex flex-col text-foreground">
      <Header />
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[380px_1fr_360px]">
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
    </div>
  );
}
