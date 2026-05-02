import { useEffect } from "react";
import type { CSSProperties } from "react";
import type { BannerConfig } from "../../lib/simple/types";
import { getPatternUrl } from "../../lib/simple/patterns";
import { allDecorations, colorfulDecorations } from "../../lib/simple/decorations";
import { loadGoogleFont } from "../../lib/simple/fonts";

import { useSimple } from "../../store/simple";

interface BannerPreviewProps {
  config?: BannerConfig;
}

export function BannerPreview({ config: propConfig }: BannerPreviewProps) {
  const storeConfig = useSimple((s) => s.config);
  const config = propConfig || storeConfig;

  useEffect(() => {
    loadGoogleFont(config.titleFont);
    loadGoogleFont(config.subtitleFont);
  }, [config.titleFont, config.subtitleFont]);
  const align: CSSProperties["alignItems"] =
    config.textAlign === "center"
      ? "center"
      : config.textAlign === "right"
        ? "flex-end"
        : "flex-start";

  const decorationSrc = config.decoration
    ? config.decoration.startsWith("data:") ||
      config.decoration.startsWith("http")
      ? config.decoration
      : (allDecorations as any)[config.decoration]
    : null;


  const animationDurations = {
    none: "0s",
    slow: "60s",
    medium: "30s",
    fast: "15s",
  };

  const decorationPos =
    config.decorationAlign === "left"
      ? { left: 20, right: "auto" }
      : config.decorationAlign === "center"
        ? { left: "50%", right: "auto", transform: "translateX(-50%)" }
        : { right: 20, left: "auto" };

  return (
    <div
      id="banner-preview"
      className={`banner-preview-container ${config.animation !== "none" ? "animate-bg" : ""}`}
      style={{
        width: config.width,
        height: config.height,
        padding: config.padding,
        backgroundColor: config.bgColor,
        backgroundImage: getPatternUrl(
          config.pattern,
          config.patternColor,
          config.patternOpacity,
        ),
        backgroundSize: `${config.patternSize}px`,
        borderRadius: config.borderRadius,
        border: `${config.borderWidth}px solid ${config.borderColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
        margin: "0 auto",
        boxShadow: config.glassmorphism ? "none" : "0 10px 30px rgba(0,0,0,0.3)",
        animationDuration: animationDurations[config.animation],
      }}
    >
      {/* Glassmorphism Overlay */}
      {config.glassmorphism && (
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            zIndex: 0,
          }}
        />
      )}

      {decorationSrc && (
        <img
          src={decorationSrc}
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            height: config.decorationSize,
            opacity: config.decorationOpacity,
            pointerEvents: "none",
            zIndex: 0,
            filter: 
              config.bgColor.toLowerCase() === "#ffffff" && !Object.keys(colorfulDecorations).includes(config.decoration || "")
                ? "invert(1)" 
                : "none",
            ...decorationPos,
          }}
        />
      )}

      <h1
        style={{
          fontFamily: `'${config.titleFont}', sans-serif`,
          fontSize: config.titleSize,
          color: config.titleColor,
          fontWeight: 700,
          margin: 0,
          textAlign: config.textAlign,
          lineHeight: 1.15,
          maxWidth: "100%",
          wordBreak: "break-word",
          position: "relative",
          zIndex: 2,
          textShadow: config.bgColor === "#ffffff" ? "none" : "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {config.title}
      </h1>
      <p
        style={{
          fontFamily: `'${config.subtitleFont}', sans-serif`,
          fontSize: config.subtitleSize,
          color: config.subtitleColor,
          margin: 0,
          marginTop: 8,
          textAlign: config.textAlign,
          lineHeight: 1.3,
          position: "relative",
          zIndex: 2,
          textShadow: config.bgColor === "#ffffff" ? "none" : "0 1px 5px rgba(0,0,0,0.2)",
        }}
      >
        {config.subtitle}
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bg-slide {
          from { background-position: 0 0; }
          to { background-position: 100% 100%; }
        }
        .animate-bg {
          animation-name: bg-slide;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />
    </div>
  );
}
