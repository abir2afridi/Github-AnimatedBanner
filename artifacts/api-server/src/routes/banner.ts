import { Router, type IRouter } from "express";
import { generateBannerSVG, parseQueryParams } from "@workspace/banner-svg";

const router: IRouter = Router();

// GET /api/banner?type=waving&preset=ocean&text=Hello
router.get("/banner", (req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    const params = parseQueryParams(url.searchParams);
    const svg = generateBannerSVG(params);
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    // Cache long-ish but allow refresh
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(svg);
  } catch (err) {
    req.log?.error({ err }, "banner_generation_error");
    res.status(500).type("svg").send(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="120"><rect width="600" height="120" fill="#dc2626"/><text x="20" y="70" fill="#fff" font-family="monospace" font-size="20">Banner error</text></svg>`,
    );
  }
});

export default router;
