type PatternFn = (color: string, opacity: number) => string;

const svg = (
  w: number,
  h: number,
  body: string,
): string =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`;

export const patterns: Record<string, PatternFn> = {
  jigsaw: (c, o) =>
    svg(
      60,
      60,
      `<path fill='${c}' fill-opacity='${o}' d='M30 0 L40 10 L40 20 L50 20 L60 30 L50 40 L60 50 L60 60 L40 60 L40 50 L30 60 L20 50 L20 60 L0 60 L0 40 L10 40 L0 30 L10 20 L0 20 L0 0 L20 0 L20 10 L30 0z'/>`,
    ),
  "github-pattern": (c, o) =>
    svg(
      24,
      24,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='4' cy='4' r='1.5'/><circle cx='12' cy='4' r='1.5'/><circle cx='20' cy='4' r='1.5'/><circle cx='4' cy='12' r='1.5'/><circle cx='12' cy='12' r='1.5'/><circle cx='20' cy='12' r='1.5'/><circle cx='4' cy='20' r='1.5'/><circle cx='12' cy='20' r='1.5'/><circle cx='20' cy='20' r='1.5'/></g>`,
    ),
  "endless-constellation": (c, o) =>
    svg(
      80,
      80,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='10' cy='10' r='1.6'/><circle cx='30' cy='25' r='1'/><circle cx='55' cy='15' r='1.4'/><circle cx='70' cy='40' r='1'/><circle cx='15' cy='55' r='1.2'/><circle cx='40' cy='65' r='1.6'/><circle cx='65' cy='75' r='1'/><circle cx='5' cy='75' r='1'/></g><g stroke='${c}' stroke-opacity='${o}' stroke-width='0.4'><path d='M10 10 L30 25 L55 15 M55 15 L70 40 L40 65 L15 55 M40 65 L65 75'/></g>`,
    ),
  "floating-cogs": (c, o) =>
    svg(
      80,
      80,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'><circle cx='20' cy='20' r='8'/><path d='M20 8 V12 M20 28 V32 M8 20 H12 M28 20 H32 M11 11 L13.8 13.8 M26.2 26.2 L29 29 M11 29 L13.8 26.2 M26.2 13.8 L29 11'/><circle cx='60' cy='60' r='10'/><path d='M60 46 V51 M60 69 V74 M46 60 H51 M69 60 H74 M50 50 L53.5 53.5 M66.5 66.5 L70 70 M50 70 L53.5 66.5 M66.5 53.5 L70 50'/></g>`,
    ),
  bubbles: (c, o) =>
    svg(
      60,
      60,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.2'><circle cx='15' cy='15' r='10'/><circle cx='45' cy='30' r='6'/><circle cx='20' cy='45' r='8'/><circle cx='50' cy='55' r='4'/><circle cx='5' cy='35' r='3'/></g>`,
    ),
  lisbon: (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M20 0 L40 20 L20 40 L0 20 z'/><circle cx='20' cy='20' r='3' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/></g>`,
    ),
  temple: (c, o) =>
    svg(
      60,
      30,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.2'><path d='M0 30 L15 0 L30 30 L45 0 L60 30'/><path d='M0 22 L60 22'/></g>`,
    ),
  topography: (c, o) =>
    svg(
      80,
      80,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M-5 35 Q20 5 50 25 T85 30'/><path d='M-5 50 Q20 25 50 45 T85 50'/><path d='M-5 65 Q20 45 50 65 T85 70'/><path d='M-5 20 Q20 -5 50 10 T85 15'/></g>`,
    ),
  "falling-triangles": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M0 0 L20 20 L0 20 z'/><path d='M40 0 L40 20 L20 20 z'/><path d='M0 40 L20 20 L20 40 z'/><path d='M40 40 L20 40 L40 20 z'/></g>`,
    ),
  glamorous: (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'><path d='M20 5 L25 15 L35 18 L27 26 L29 36 L20 31 L11 36 L13 26 L5 18 L15 15 z'/></g>`,
    ),
  "i-like-food": (c, o) =>
    svg(
      60,
      60,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='15' cy='15' r='6'/><rect x='35' y='10' width='12' height='12' rx='2'/><path d='M40 40 L50 50 L30 50 z'/><circle cx='15' cy='45' r='5' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'/></g>`,
    ),
  leaf: (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M5 35 Q5 5 35 5 Q35 35 5 35 z'/></g><g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.8'><path d='M5 35 L35 5'/></g>`,
    ),
  "circuit-board": (c, o) =>
    svg(
      80,
      80,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M10 0 V20 H30 V40 H50 V60 H80'/><path d='M0 50 H20 V70 H40'/><path d='M50 0 V15 H70 V35'/></g><g fill='${c}' fill-opacity='${o}'><circle cx='10' cy='20' r='2'/><circle cx='30' cy='40' r='2'/><circle cx='50' cy='60' r='2'/><circle cx='20' cy='50' r='2'/><circle cx='40' cy='70' r='2'/><circle cx='50' cy='15' r='2'/><circle cx='70' cy='35' r='2'/></g>`,
    ),
  "overlapping-circles": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='0' cy='0' r='15'/><circle cx='40' cy='0' r='15'/><circle cx='0' cy='40' r='15'/><circle cx='40' cy='40' r='15'/><circle cx='20' cy='20' r='15'/></g>`,
    ),
  "endless-clouds": (c, o) =>
    svg(
      80,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M10 30 Q10 22 18 22 Q20 14 30 16 Q34 12 40 18 Q48 18 48 26 Q52 30 46 32 L14 32 Q8 32 10 30 z'/><path d='M50 12 Q50 6 56 6 Q58 2 64 4 Q72 4 72 10 Q76 12 72 14 L52 14 Q48 14 50 12 z'/></g>`,
    ),
  "bathroom-floor": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M0 0 L20 20 L0 40 z'/><path d='M40 0 L20 20 L40 40 z'/></g>`,
    ),
  "squares-in-squares": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><rect x='5' y='5' width='30' height='30'/><rect x='10' y='10' width='20' height='20'/><rect x='15' y='15' width='10' height='10'/></g>`,
    ),
  aztec: (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.2'><path d='M0 20 L10 10 L20 20 L30 10 L40 20'/><path d='M0 30 L10 20 L20 30 L30 20 L40 30'/><path d='M0 10 L10 0 L20 10 L30 0 L40 10'/></g>`,
    ),
  hideout: (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='20' cy='20' r='2'/></g><g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.6'><path d='M0 0 L40 40 M40 0 L0 40'/></g>`,
    ),
  "four-point-stars": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 z'/></g>`,
    ),
  moroccan: (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.2'><path d='M20 0 Q30 10 20 20 Q10 10 20 0 z'/><path d='M20 20 Q30 30 20 40 Q10 30 20 20 z'/><path d='M0 20 Q10 10 20 20 Q10 30 0 20 z'/><path d='M20 20 Q30 10 40 20 Q30 30 20 20 z'/></g>`,
    ),
  "charlie-brown": (c, o) =>
    svg(
      60,
      30,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='3' stroke-linecap='round'><path d='M0 15 Q15 0 30 15 T60 15'/></g>`,
    ),
  "stamp-collection": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1' stroke-dasharray='3 3'><rect x='5' y='5' width='30' height='30'/></g>`,
    ),
  squares: (c, o) =>
    svg(
      20,
      20,
      `<path fill='${c}' fill-opacity='${o}' d='M0 0 H10 V10 H0z M10 10 H20 V20 H10z'/>`,
    ),
  "graph-paper": (c, o) =>
    svg(
      40,
      40,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none'><path d='M0 0 H40 V40 H0 z' stroke-width='0.6'/><path d='M0 10 H40 M0 20 H40 M0 30 H40 M10 0 V40 M20 0 V40 M30 0 V40' stroke-width='0.4'/></g>`,
    ),
  "brick-wall": (c, o) =>
    svg(
      60,
      30,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M0 0 H60 M0 15 H60 M0 30 H60 M15 0 V15 M45 0 V15 M0 15 V30 M30 15 V30 M60 15 V30'/></g>`,
    ),
  "dalmatian-spots": (c, o) =>
    svg(
      60,
      60,
      `<g fill='${c}' fill-opacity='${o}'><ellipse cx='15' cy='15' rx='5' ry='3' transform='rotate(20 15 15)'/><ellipse cx='40' cy='25' rx='4' ry='6' transform='rotate(-30 40 25)'/><ellipse cx='25' cy='45' rx='6' ry='4' transform='rotate(45 25 45)'/><ellipse cx='50' cy='50' rx='3' ry='5'/></g>`,
    ),
  honeycomb: (c, o) =>
    svg(
      56,
      48,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 z'/><path d='M42 0 L56 8 L56 24 L42 32 L28 24 L28 8 z'/><path d='M14 32 L28 40 L28 48'/><path d='M42 32 L28 40'/></g>`,
    ),
};

export function getPatternUrl(
  pattern: string | null,
  color: string,
  opacity: number,
): string {
  if (!pattern || !patterns[pattern]) return "none";
  return `url("data:image/svg+xml,${encodeURIComponent(patterns[pattern](color, opacity))}")`;
}

export function getPatternThumbnail(
  pattern: string,
  color: string,
): string {
  const fn = patterns[pattern];
  if (!fn) return "";
  return `url("data:image/svg+xml,${encodeURIComponent(fn(color, 1))}")`;
}
