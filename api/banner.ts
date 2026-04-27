import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  generateBannerSVG,
  parseQueryParams,
} from "../lib/banner-svg/src/index.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const q = new (globalThis as any).URLSearchParams();
    for (const [key, value] of Object.entries(req.query ?? {})) {
      if (Array.isArray(value)) {
        for (const v of value) q.append(key, String(v));
      } else if (value !== undefined) {
        q.set(key, String(value));
      }
    }

    const params = parseQueryParams(q);
    const svg = generateBannerSVG(params);

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    );
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).send(svg);
  } catch {
    res
      .status(500)
      .setHeader("Content-Type", "image/svg+xml; charset=utf-8")
      .send(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="120"><rect width="600" height="120" fill="#dc2626"/><text x="20" y="70" fill="#fff" font-family="monospace" font-size="20">Banner error</text></svg>`,
      );
  }
}
