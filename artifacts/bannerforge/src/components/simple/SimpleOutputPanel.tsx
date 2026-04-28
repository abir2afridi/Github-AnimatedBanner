import { Button } from "../ui/button";
import { 
  Download, 
  Copy, 
  ExternalLink, 
  Image as ImageIcon, 
  Github,
  ClipboardCheck,
  Zap,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { useSimple } from "../../store/simple";
import { copyText } from "../../lib/url";
import { exportToPNG, copyImageToClipboard } from "../../lib/simple/export";
import { useState } from "react";

export function SimpleOutputPanel() {
  const config = useSimple((s) => s.config);
  const [exporting, setExporting] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleDownloadPNG = async () => {
    setExporting(true);
    try {
      toast.loading("Generating high-res banner...", { id: "export-png" });
      await exportToPNG("banner-preview", `bannerforge-${Date.now()}`);
      toast.success("Downloaded successfully!", { id: "export-png" });
    } catch (error) {
      console.error(error);
      toast.error("Export failed. Try again.", { id: "export-png" });
    } finally {
      setExporting(false);
    }
  };

  const handleCopyImage = async () => {
    setCopying(true);
    try {
      toast.loading("Copying image to clipboard...", { id: "copy-img" });
      await copyImageToClipboard("banner-preview");
      toast.success("Image copied! Paste it anywhere.", { id: "copy-img" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy image. Your browser might not support this.", { id: "copy-img" });
    } finally {
      setCopying(false);
    }
  };

  const getMarkdown = () => {
    const q = new URLSearchParams({
      width: String(config.width),
      height: String(config.height),
      color: `${config.bgColor.replace("#", "")}@0,${config.bgColor.replace("#", "")}@100`,
      text: config.title,
      fontSize: String(config.titleSize),
      fontColor: config.titleColor,
      desc: config.subtitle,
      descFontSize: String(config.subtitleSize),
      descColor: config.subtitleColor,
      v: String(Date.now()),
    }).toString();

    return `![Banner](https://github-animatedbanner.vercel.app/api/banner.svg?${q})`;
  };

  const handleCopyMarkdown = async () => {
    const ok = await copyText(getMarkdown());
    if (ok) toast.success("Snippet copied!");
    else toast.error("Failed to copy");
  };

  return (
    <div className="h-full bg-background flex flex-col">
      <div className="p-4 border-b border-border bg-secondary/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold">Export Center</h2>
          <p className="text-[10px] text-muted-foreground">Ready to ship your design</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Direct Actions */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">
            Quick Actions
          </h3>
          
          <div className="grid gap-3">
            <Button 
              onClick={handleDownloadPNG}
              disabled={exporting}
              className="w-full h-12 flex items-center justify-center gap-3 font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              <Download className="w-5 h-5" />
              {exporting ? "Exporting..." : "Download PNG"}
            </Button>

            <Button 
              variant="outline"
              onClick={handleCopyImage}
              disabled={copying}
              className="w-full h-12 flex items-center justify-center gap-3 font-bold rounded-2xl border-border bg-secondary/20 hover:bg-secondary/40 transition-all active:scale-95"
            >
              {copying ? <ClipboardCheck className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
              {copying ? "Copied!" : "Copy Image"}
            </Button>
          </div>
          
          <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-4">
            Images are rendered at <span className="text-foreground font-bold">2x scale</span> for ultra-sharp quality on Retina displays.
          </p>
        </div>

        {/* GitHub Integration */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">
            GitHub Setup
          </h3>
          
          <div className="p-5 rounded-2xl border border-border bg-secondary/10 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Github className="w-12 h-12" />
            </div>
            
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Markdown Snippet
            </div>
            
            <div className="relative">
              <pre className="p-4 bg-black/40 rounded-xl text-[10px] font-mono text-primary/90 border border-primary/10 overflow-x-auto">
                {getMarkdown()}
              </pre>
              <button 
                onClick={handleCopyMarkdown}
                className="absolute right-2 top-2 p-2 rounded-lg bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all"
                title="Copy Snippet"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex gap-2 items-start text-[9px] text-muted-foreground bg-background/50 p-2 rounded-lg">
              <Info className="w-3 h-3 mt-0.5 shrink-0" />
              <p>
                Copy this snippet and paste it directly into your GitHub README. The banner renders from the live Vercel API.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Mode Promo */}
        <div className="p-4 rounded-2xl border border-amber-500/10 bg-amber-500/5 space-y-2">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <ExternalLink className="w-3.5 h-3.5" />
            Want Dynamic Content?
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Simple Mode creates static images. For <span className="text-amber-500/80 font-bold">live visitor counters</span> and automated updates, switch to Advanced Mode.
          </p>
        </div>
      </div>

      <div className="p-6 mt-auto border-t border-border bg-secondary/5">
        <p className="text-[9px] text-center text-muted-foreground mb-4">
          Built with precision by <span className="font-bold text-primary">BannerForge</span>
        </p>
        <Button variant="outline" className="w-full text-[10px] font-bold h-10 gap-2 rounded-xl border-dashed">
          Explore Advanced Mode
        </Button>
      </div>
    </div>
  );
}
