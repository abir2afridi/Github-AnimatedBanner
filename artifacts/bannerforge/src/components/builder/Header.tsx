import { useState } from "react";
import {
  Undo2,
  Redo2,
  RotateCcw,
  Github,
  Sparkles,
  Shuffle,
  Share2,
  Check,
  Maximize,
  Keyboard,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "../theme-provider";
import { useBuilder } from "../../store/builder";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { copyText } from "../../lib/url";
import { SIZE_PRESETS } from "../../lib/sizePresets";
import { paramsToQuery } from "@workspace/banner-svg";
import { toast } from "sonner";

export function Header() {
  const undo = useBuilder((s) => s.undo);
  const redo = useBuilder((s) => s.redo);
  const reset = useBuilder((s) => s.reset);
  const randomize = useBuilder((s) => s.randomize);
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);
  const canUndo = useBuilder((s) => s.historyIndex > 0);
  const canRedo = useBuilder((s) => s.historyIndex < s.history.length - 1);
  const { setTheme } = useTheme();
  const [shared, setShared] = useState(false);

  const onShare = async () => {
    const q = paramsToQuery(params).toString();
    const url = `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}/?${q}`;
    if (await copyText(url)) {
      setShared(true);
      toast.success("Builder link copied — share it to load this exact banner");
      setTimeout(() => setShared(false), 1800);
    } else {
      toast.error("Copy failed");
    }
  };

  const currentSize = SIZE_PRESETS.find(
    (s) => s.width === params.width && s.height === params.height,
  );

  return (
    <header className="h-14 shrink-0 border-b border-border bg-sidebar flex items-center justify-between px-4 gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary via-accent to-primary grid place-items-center text-primary-foreground shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight leading-tight truncate">
            BannerForge
          </div>
          <div className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
            GitHub README banner generator
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2.5 gap-1.5 hidden md:inline-flex"
              title="Banner size"
            >
              <Maximize className="w-3.5 h-3.5" />
              <span className="text-xs">{currentSize?.label ?? "Custom"}</span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {params.width}×{params.height}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Banner size</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {SIZE_PRESETS.map((s) => (
              <DropdownMenuItem
                key={s.id}
                onClick={() =>
                  setParams((p) => ({ ...p, width: s.width, height: s.height }))
                }
                className="flex items-center justify-between"
              >
                <span>{s.label}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{s.hint}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-border mx-1 hidden md:block" />

        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2"
          disabled={!canUndo}
          onClick={undo}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2"
          disabled={!canRedo}
          onClick={redo}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2"
          onClick={() => {
            reset();
            toast.success("Reset to defaults");
          }}
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2.5 gap-1.5 text-accent"
          onClick={() => {
            randomize();
            toast.success("Randomized — press R to roll again");
          }}
          title="Surprise me (R)"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="text-xs hidden sm:inline">Surprise me</span>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2.5 gap-1.5"
          onClick={onShare}
          title="Copy a shareable builder link"
        >
          {shared ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          <span className="text-xs hidden sm:inline">{shared ? "Copied" : "Share"}</span>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 hidden sm:inline-flex"
              title="Keyboard shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 text-xs">
            <div className="font-medium mb-2">Keyboard shortcuts</div>
            <div className="space-y-1.5">
              <Row k="Ctrl/⌘ + Z" v="Undo" />
              <Row k="Ctrl/⌘ + Y" v="Redo" />
              <Row k="Ctrl/⌘ + Shift + Z" v="Redo" />
              <Row k="R" v="Surprise me" />
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 px-0">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="ml-1 inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover-elevate"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{v}</span>
      <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border bg-secondary">
        {k}
      </kbd>
    </div>
  );
}
