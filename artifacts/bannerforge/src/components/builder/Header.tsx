import { useState } from "react";
import { Link } from "wouter";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  Layout,
  Layers,
  Info,
  MoreHorizontal,
} from "lucide-react";
import { useTheme } from "../theme-provider";
import { useBuilder } from "../../store/builder";
import { useSimple } from "../../store/simple";
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

interface HeaderProps {
  minimal?: boolean;
  className?: string;
}

export function Header({ minimal, className }: HeaderProps) {
  const undo = useBuilder((s) => s.undo);
  const redo = useBuilder((s) => s.redo);
  const reset = useBuilder((s) => s.reset);
  const randomize = useBuilder((s) => s.randomize);
  const params = useBuilder((s) => s.params);
  const setParams = useBuilder((s) => s.set);
  const canUndo = useBuilder((s) => s.historyIndex > 0);
  const canRedo = useBuilder((s) => s.historyIndex < s.history.length - 1);
  const mode = useBuilder((s) => s.mode);
  const setMode = useBuilder((s) => s.setMode);

  // Simple Mode Store
  const simpleRandomize = useSimple((s) => s.randomize);
  const simpleReset = useSimple((s) => s.reset);

  const { theme, setTheme } = useTheme();
  const [shared, setShared] = useState(false);

  const onShare = async () => {
    if (mode === "simple") {
      const url = window.location.href;
      if (await copyText(url)) {
        setShared(true);
        toast.success("Share link copied to clipboard!");
        setTimeout(() => setShared(false), 1800);
      }
      return;
    }

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

  const handleRandomize = () => {
    if (mode === "simple") {
      simpleRandomize();
    } else {
      randomize();
    }
    toast.success("Randomized!");
  };

  const handleReset = () => {
    if (mode === "simple") {
      simpleReset();
    } else {
      reset();
    }
    toast.success("Reset to defaults");
  };

  const currentSize = SIZE_PRESETS.find(
    (s) => s.width === params.width && s.height === params.height,
  );

  return (
    <header className={"h-14 shrink-0 border-b flex items-center justify-between px-1.5 sm:px-4 gap-1 sm:gap-2 " + (minimal ? "border-[#0066FF]/20 bg-card" : "border-border bg-sidebar") + (className ? " " + className : "")}>
      <div className="flex items-center gap-1 sm:gap-3 min-w-0">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 shrink-0">
            <DotLottieReact
              src="https://lottie.host/85ec5298-49d5-4c8d-9d65-bb087705e154/itvccM1zkB.lottie"
              loop
              autoplay
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight leading-tight truncate">
              BannerForge
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
              GitHub README banner generator
            </div>
          </div>
        </Link>

        {/* Mode Switcher */}
        {!minimal && (
          <div className="ml-1 sm:ml-4 flex p-0.5 bg-secondary/50 rounded-lg border border-border">
            <button
              onClick={() => setMode("simple")}
              className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all ${
                mode === "simple"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simple</span>
            </button>
            <button
              onClick={() => setMode("svg")}
              className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all ${
                mode === "svg"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Advanced</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        {/* ── Builder controls (hidden in minimal mode) ── */}
        {!minimal && (
          <>
            {/* Desktop-only: Size dropdown */}
            {mode === "svg" && (
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
            )}

            <div className="w-px h-6 bg-border mx-1 hidden md:block" />

            {/* Desktop-only: Undo/Redo */}
            {mode === "svg" && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 hidden sm:inline-flex"
                  disabled={!canUndo}
                  onClick={undo}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 hidden sm:inline-flex"
                  disabled={!canRedo}
                  onClick={redo}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </>
            )}
            
            {/* Mobile More menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 px-0 sm:hidden" title="More options">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mode === "svg" && (
                  <>
                    <DropdownMenuItem onClick={undo} disabled={!canUndo}>
                      <Undo2 className="w-3.5 h-3.5 mr-2" /> Undo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={redo} disabled={!canRedo}>
                      <Redo2 className="w-3.5 h-3.5 mr-2" /> Redo
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleReset}>
                  <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRandomize}>
                  <Shuffle className="w-3.5 h-3.5 mr-2" /> Surprise me
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onShare}>
                  {shared ? <Check className="w-3.5 h-3.5 mr-2 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 mr-2" />}
                  {shared ? "Copied!" : "Share"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/about" className="flex items-center">
                    <Info className="w-3.5 h-3.5 mr-2" /> About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center">
                    <Github className="w-3.5 h-3.5 mr-2" /> GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-[10px] text-muted-foreground font-mono">
                  {mode === "svg" ? `${params.width}×${params.height}` : ''}
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop: Reset */}
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 hidden sm:inline-flex"
              onClick={handleReset}
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            {/* Desktop: Randomize */}
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2.5 gap-1.5 text-accent hidden sm:inline-flex"
              onClick={handleRandomize}
              title="Surprise me (R)"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="text-xs hidden sm:inline">Surprise me</span>
            </Button>

            {/* Desktop: Share */}
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2.5 gap-1.5 hidden sm:inline-flex"
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

            {/* Desktop: Keyboard shortcuts */}
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
          </>
        )}

        {/* Desktop About */}
        {!minimal && (
          <Link href="/about" className="hidden sm:inline-flex">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2.5 gap-1.5"
              title="About BannerForge"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="text-xs hidden sm:inline">About</span>
            </Button>
          </Link>
        )}

        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 px-0 relative"
          onClick={() => {
            const order: Array<"dark" | "light" | "system"> = ["dark", "light", "system"];
            const next = order[(order.indexOf(theme) + 1) % order.length];
            setTheme(next);
          }}
          title={`Theme: ${theme} (click to cycle)`}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {!minimal && (
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover-elevate hidden sm:inline-flex"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}
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
