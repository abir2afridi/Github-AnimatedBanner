import { useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { generateBannerSVG, paramsToQuery } from "@workspace/banner-svg";
import { useBuilder } from "../../store/builder";
import { copyText, downloadFile, getBannerUrl } from "../../lib/url";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { toast } from "sonner";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (await copyText(code)) {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } else {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="relative group border border-border rounded-lg bg-[#0d1117] overflow-hidden hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/80 border-b border-border/50">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
          {language}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-[10px] text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors gap-1.5"
          onClick={onCopy}
        >
          {copied ? (
            <Check className="w-3 h-3 text-emerald-500" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className="relative">
        <pre className="p-3.5 text-[11px] overflow-x-auto text-zinc-300 font-mono leading-relaxed max-h-48 scrollbar-thin selection:bg-primary/30">
          <code>{code}</code>
        </pre>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0d1117] to-transparent pointer-events-none opacity-50" />
      </div>
    </div>
  );
}

export function OutputPanel() {
  const params = useBuilder((s) => s.params);

  const { url, markdown, html, svg } = useMemo(() => {
    const q = paramsToQuery(params).toString();
    const url = getBannerUrl(q);
    const md = `![header](${url})`;
    const html = `<img src="${url}" alt="header" width="100%" />`;
    const svg = generateBannerSVG(params);
    return { url, markdown: md, html, svg };
  }, [params]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin p-4 space-y-4">
        <Tabs defaultValue="markdown">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          <TabsContent value="markdown" className="mt-3">
            <CodeBlock code={markdown} language="markdown" />
          </TabsContent>
          <TabsContent value="html" className="mt-3">
            <CodeBlock code={html} language="html" />
          </TabsContent>
          <TabsContent value="url" className="mt-3">
            <CodeBlock code={url} language="url" />
          </TabsContent>
        </Tabs>

        <div className="space-y-2 pt-2 border-t border-border">
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Download
          </div>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => {
              downloadFile("bannerforge.svg", svg, "image/svg+xml");
              toast.success("SVG downloaded");
            }}
          >
            <Download className="w-4 h-4" /> Download SVG
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={async () => {
              try {
                const img = new Image();
                img.crossOrigin = "anonymous";
                const blob = new Blob([svg], { type: "image/svg+xml" });
                const blobUrl = URL.createObjectURL(blob);
                img.src = blobUrl;
                await new Promise<void>((resolve, reject) => {
                  img.onload = () => resolve();
                  img.onerror = () => reject(new Error("svg load failed"));
                });
                const scale = 2;
                const canvas = document.createElement("canvas");
                canvas.width = params.width * scale;
                canvas.height = params.height * scale;
                const ctx = canvas.getContext("2d");
                if (!ctx) throw new Error("no canvas ctx");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(blobUrl);
                canvas.toBlob((b) => {
                  if (!b) {
                    toast.error("PNG export failed");
                    return;
                  }
                  const url2 = URL.createObjectURL(b);
                  const a = document.createElement("a");
                  a.href = url2;
                  a.download = "bannerforge.png";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url2);
                  toast.success("PNG downloaded (2x)");
                }, "image/png");
              } catch (e) {
                toast.error("PNG export failed: " + (e instanceof Error ? e.message : "unknown"));
              }
            }}
          >
            <Download className="w-4 h-4" /> Download PNG (2x)
          </Button>
        </div>

        <div className="text-xs text-muted-foreground border-t border-border pt-3">
          <div className="font-medium text-foreground mb-1">Tip</div>
          Paste the Markdown snippet at the top of your{" "}
          <span className="font-mono">README.md</span>. The image is generated on-demand from
          the URL — every visitor gets a fresh, animated SVG straight from the API.
        </div>
      </div>
    </div>
  );
}
