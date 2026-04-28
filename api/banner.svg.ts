import { generateBannerSVG, parseQueryParams } from "../lib/banner-svg/src/index";

export const config = {
  runtime: "edge",
};

export default function handler(req: Request): Response {
  try {
    const url = new URL(req.url);
    const params = parseQueryParams(url.searchParams);
    const githubSafeParams = {
      ...params,
      textLayers: params.textLayers.map((l) => ({
        ...l,
        fontFamily: "system-ui",
      })),
    };
    const svg = generateBannerSVG(githubSafeParams);

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
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
