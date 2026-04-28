import { useEffect } from "react";
import type { CSSProperties } from "react";
import type { BannerConfig } from "../../lib/simple/types";
import { getPatternUrl } from "../../lib/simple/patterns";
import { decorations } from "../../lib/simple/decorations";
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
      : decorations[config.decoration as keyof typeof decorations]
    : null;

  return (
    <div
      id="banner-preview"
      className="banner-preview-container"
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
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {decorationSrc && (
        <img
          src={decorationSrc}
          alt=""
          style={{
            position: "absolute",
            right: 20,
            bottom: 0,
            height: config.decorationSize,
            opacity: config.decorationOpacity,
            pointerEvents: "none",
            zIndex: 0,
            filter: config.bgColor.toLowerCase() === "#ffffff" ? "invert(1)" : "none",
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
          zIndex: 1,
          textShadow: config.bgColor === "#ffffff" ? "none" : "0 2px 10px rgba(0,0,0,0.2)",
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
          zIndex: 1,
          textShadow: config.bgColor === "#ffffff" ? "none" : "0 1px 5px rgba(0,0,0,0.1)",
        }}
      >
        {config.subtitle}
      </p>
    </div>
  );
}
