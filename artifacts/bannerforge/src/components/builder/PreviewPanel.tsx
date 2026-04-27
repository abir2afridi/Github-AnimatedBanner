import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Moon, Sun, RefreshCw, Maximize2 } from "lucide-react";
import { generateBannerSVG } from "@workspace/banner-svg";
import { useBuilder } from "../../store/builder";
import { Button } from "@/components/ui/button";

export function PreviewPanel() {
  const params = useBuilder((s) => s.params);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [zoom, setZoom] = useState(100);
  const [animKey, setAnimKey] = useState(0);

  const svg = useMemo(() => generateBannerSVG(params), [params]);
  const dataUri = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    [svg],
  );

  // re-key on layer change to retrigger animations
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [params]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-card/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Preview</span>
          <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">
            {params.width} × {params.height}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle preview background"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={() => setAnimKey((k) => k + 1)}
            title="Replay animations"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <select
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-8 rounded border border-border bg-secondary text-sm px-2"
          >
            <option value={50}>50%</option>
            <option value={75}>75%</option>
            <option value={100}>100%</option>
            <option value={125}>125%</option>
            <option value={150}>150%</option>
          </select>
          <Button
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={() => {
              const w = window.open();
              if (w) w.document.write(svg);
            }}
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        className={`flex-1 min-h-0 overflow-auto scrollbar-thin flex items-center justify-center p-8 ${
          theme === "dark" ? "preview-grid-bg" : "preview-grid-bg-light"
        }`}
      >
        <div
          className="rounded-md shadow-2xl shadow-black/50 overflow-hidden"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
            transition: "transform 200ms",
            maxWidth: "100%",
          }}
        >
          {/* Use object so animations / styles work; key forces reload */}
          <object
            key={animKey}
            type="image/svg+xml"
            data={dataUri}
            width={params.width}
            height={params.height}
            aria-label="Banner preview"
            style={{ display: "block", maxWidth: "100%" }}
          />
        </div>
      </div>

      <div className="border-t border-border bg-card/40 p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
          <Maximize2 className="w-3 h-3" />
          README preview
        </div>
        <div className="rounded-lg border border-border bg-[#0d1117] p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            <span className="font-mono">README.md</span>
          </div>
          <img
            src={dataUri}
            alt="Banner preview"
            className="w-full rounded"
            style={{ display: "block" }}
          />
          <div className="mt-4 text-sm text-zinc-300 leading-relaxed">
            <h2 className="text-xl font-semibold text-white mb-2">My Awesome Project</h2>
            <p>An incredible README starts with an incredible banner.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
