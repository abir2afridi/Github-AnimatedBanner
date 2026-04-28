import { generateBannerSVG, parseQueryParams } from "../lib/banner-svg/src/index";

export const config = {
  runtime: "edge",
};

export default function handler(req: Request): Response {
  try {
    const url = new URL(req.url);
    const params = parseQueryParams(url.searchParams);
    const isStatic = url.searchParams.get("static") === "1" || url.searchParams.get("static") === "true";
    const githubSafeParams = {
      ...params,
      textLayers: params.textLayers.map((l) => ({
        ...l,
        fontFamily: "system-ui",
      })),
    };
    let svg = generateBannerSVG(githubSafeParams);
    if (isStatic) {
      svg = svg.replace(/<animate[^>]*\/>/g, "");
    }

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? `${err.name}: ${err.message}`
        : typeof err === "string"
          ? err
          : JSON.stringify(err);

    const safe = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="200"><rect width="1200" height="200" fill="#dc2626"/><text x="20" y="70" fill="#fff" font-family="monospace" font-size="20">Banner error</text><text x="20" y="120" fill="#fff" font-family="monospace" font-size="16">${safe}</text></svg>`,
      {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}
