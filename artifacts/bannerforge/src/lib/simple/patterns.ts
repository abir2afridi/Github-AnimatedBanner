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
  "diagonal-stripes": (c, o) =>
    svg(
      10,
      10,
      `<path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "vertical-stripes": (c, o) =>
    svg(
      10,
      10,
      `<path d='M5,0 v10' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "horizontal-stripes": (c, o) =>
    svg(
      10,
      10,
      `<path d='M0,5 h10' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "cross-hatch": (c, o) =>
    svg(
      10,
      10,
      `<path d='M0,5 h10 M5,0 v10' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "diagonal-cross": (c, o) =>
    svg(
      10,
      10,
      `<path d='M0,0 l10,10 M10,0 l-10,10' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  dots: (c, o) =>
    svg(
      20,
      20,
      `<circle cx='10' cy='10' r='2' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "larger-dots": (c, o) =>
    svg(
      40,
      40,
      `<circle cx='20' cy='20' r='6' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "zigzag-3d": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M0 20 L20 0 L40 20 L20 40 z'/><path d='M0 20 L20 40 L0 40 z' fill-opacity='${o * 0.5}'/></g>`,
    ),
  "triangles-mosaic": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M0 0 L40 0 L20 20 z'/><path d='M0 40 L40 40 L20 20 z' fill-opacity='${o * 0.6}'/></g>`,
    ),
  "waves-op": (c, o) =>
    svg(
      80,
      20,
      `<path d='M0 10 Q 20 0, 40 10 T 80 10' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2'/>`,
    ),
  "double-bubbles": (c, o) =>
    svg(
      60,
      60,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='15' cy='15' r='10'/><circle cx='15' cy='15' r='5'/><circle cx='45' cy='45' r='8'/><circle cx='45' cy='45' r='4'/></g>`,
    ),
  "star-field": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='10' cy='10' r='1'/><circle cx='50' cy='30' r='0.8'/><circle cx='80' cy='15' r='1.2'/><circle cx='20' cy='70' r='0.6'/><circle cx='70' cy='85' r='1'/><circle cx='40' cy='60' r='0.9'/><path d='M90 60 l2 2 m-2 0 l2 -2' stroke='${c}' stroke-opacity='${o}'/></g>`,
    ),
  "box-grid": (c, o) =>
    svg(
      40,
      40,
      `<rect x='5' y='5' width='10' height='10' fill='${c}' fill-opacity='${o}'/><rect x='25' y='25' width='10' height='10' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "diamond-grid": (c, o) =>
    svg(
      40,
      40,
      `<path d='M20 5 L35 20 L20 35 L5 20 z' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "plus-signs": (c, o) =>
    svg(
      40,
      40,
      `<path d='M15 20 h10 M20 15 v10' stroke='${c}' stroke-opacity='${o}' stroke-width='2'/>`,
    ),
  "tiny-dots": (c, o) =>
    svg(
      10,
      10,
      `<circle cx='5' cy='5' r='1' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "houndstooth": (c, o) =>
    svg(
      40,
      40,
      `<path d='M0 0 H20 V20 H40 V40 H20 V20 H0 Z M20 0 L40 20 L20 40 L0 20 Z' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "wiggle": (c, o) =>
    svg(
      40,
      20,
      `<path d='M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2'/>`,
    ),
  "confetti": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><rect x='10' y='10' width='4' height='4' transform='rotate(45 12 12)'/><circle cx='30' cy='20' r='2'/><rect x='50' y='15' width='6' height='2' transform='rotate(20 53 16)'/><circle cx='70' cy='30' r='1.5'/><rect x='15' y='50' width='3' height='5'/><circle cx='40' cy='60' r='2.5'/><rect x='60' y='55' width='5' height='5' transform='rotate(-30 62.5 57.5)'/><circle cx='80' cy='70' r='2'/></g>`,
    ),
  "architect": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none'><path d='M0 0 L100 100 M100 0 L0 100 M50 0 V100 M0 50 H100'/><circle cx='50' cy='50' r='30'/><rect x='20' y='20' width='60' height='60'/></g>`,
    ),
  "bamboo": (c, o) =>
    svg(
      40,
      40,
      `<g stroke='${c}' stroke-opacity='${o}' stroke-width='2'><path d='M10 0 V40 M30 0 V40'/><path d='M8 10 H12 M28 10 H32 M8 30 H12 M28 30 H32'/></g>`,
    ),
  "rain": (c, o) =>
    svg(
      20,
      40,
      `<line x1='10' y1='5' x2='5' y2='15' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><line x1='15' y1='25' x2='10' y2='35' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "eyes": (c, o) =>
    svg(
      60,
      30,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'><ellipse cx='15' cy='15' rx='8' ry='4'/><circle cx='15' cy='15' r='2' fill='${c}' fill-opacity='${o}'/><ellipse cx='45' cy='15' rx='8' ry='4'/><circle cx='45' cy='15' r='2' fill='${c}' fill-opacity='${o}'/></g>`,
    ),
  "triangles": (c, o) =>
    svg(
      40,
      40,
      `<path d='M20 5 L35 35 H5 Z' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "diamonds-shimmer": (c, o) =>
    svg(
      60,
      60,
      `<g fill='${c}' fill-opacity='${o}'><path d='M30 10 L40 30 L30 50 L20 30 Z'/><path d='M10 30 L20 40 L10 50 L0 40 Z' fill-opacity='${o * 0.5}'/><path d='M50 30 L60 40 L50 50 L40 40 Z' fill-opacity='${o * 0.5}'/></g>`,
    ),
  "concentric-circles": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='20' cy='20' r='15'/><circle cx='20' cy='20' r='10'/><circle cx='20' cy='20' r='5'/></g>`,
    ),
  "bold-stripes": (c, o) =>
    svg(
      20,
      20,
      `<path d='M0 0 H20 V10 H0 Z' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "triangles-up": (c, o) =>
    svg(
      40,
      40,
      `<path d='M20 5 L35 35 H5 Z' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'/>`,
    ),
  "grid-dots-bold": (c, o) =>
    svg(
      30,
      30,
      `<circle cx='5' cy='5' r='2' fill='${c}' fill-opacity='${o}'/><circle cx='20' cy='20' r='2' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "labyrinth": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'><path d='M0 0 H40 V40 H0 Z M10 10 H30 V30 H10 Z M20 20 H20'/></g>`,
    ),
  "wavy-lines": (c, o) =>
    svg(
      100,
      20,
      `<path d='M0 10 Q 25 0, 50 10 T 100 10' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2'/>`,
    ),
  "dna": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M0 20 Q 10 0, 20 20 T 40 20'/><path d='M0 20 Q 10 40, 20 20 T 40 20'/><circle cx='10' cy='10' r='1.5' fill='${c}'/><circle cx='10' cy='30' r='1.5' fill='${c}'/><circle cx='30' cy='10' r='1.5' fill='${c}'/><circle cx='30' cy='30' r='1.5' fill='${c}'/></g>`,
    ),
  "pixel-grid": (c, o) =>
    svg(
      20,
      20,
      `<rect x='0' y='0' width='2' height='2' fill='${c}' fill-opacity='${o}'/><rect x='10' y='10' width='2' height='2' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "triangles-random": (c, o) =>
    svg(
      60,
      60,
      `<g fill='${c}' fill-opacity='${o}'><path d='M10 10 L20 30 L5 25 Z'/><path d='M40 5 L55 20 L45 25 Z'/><path d='M25 45 L40 55 L20 58 Z'/></g>`,
    ),
  "hex-grid": (c, o) =>
    svg(
      28,
      49,
      `<path d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5z' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "slanted-stars": (c, o) =>
    svg(
      50,
      50,
      `<path d='M25 5 L28 18 L40 20 L28 22 L25 35 L22 22 L10 20 L22 18 Z' fill='${c}' fill-opacity='${o}' transform='rotate(15 25 25)'/>`,
    ),
  "circuitry-mini": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M0 10 H15 V25 H40 M10 40 V30 H25 V0'/><circle cx='15' cy='25' r='2' fill='${c}' fill-opacity='${o}'/><circle cx='25' cy='30' r='2' fill='${c}' fill-opacity='${o}'/></g>`,
    ),
  "topography-v2": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.8'><path d='M0 20 Q 25 0, 50 20 T 100 20'/><path d='M0 40 Q 25 20, 50 40 T 100 40'/><path d='M0 60 Q 25 40, 50 60 T 100 60'/><path d='M0 80 Q 25 60, 50 80 T 100 80'/></g>`,
    ),
  "polka-dots": (c, o) =>
    svg(
      20,
      20,
      `<circle cx='5' cy='5' r='3' fill='${c}' fill-opacity='${o}'/><circle cx='15' cy='15' r='3' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "diagonal-lines": (c, o) =>
    svg(
      10,
      10,
      `<path d='M0 10 L10 0' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "honeycomb-v2": (c, o) =>
    svg(
      28,
      48,
      `<path d='M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 Z M0 40 L14 48 L28 40' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "waves-v2": (c, o) =>
    svg(
      50,
      20,
      `<path d='M0 10 C 10 20, 15 0, 25 10 S 40 0, 50 10' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "stars-scattered": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><path d='M10 10 l2 2 m-2 0 l2 -2'/><path d='M50 20 l1 1 m-1 0 l1 -1'/><path d='M80 40 l3 3 m-3 0 l3 -3'/><path d='M20 80 l2 2 m-2 0 l2 -2'/><path d='M70 10 l1 1 m-1 0 l1 -1'/></g>`,
    ),
  "grid-dots": (c, o) =>
    svg(
      30,
      30,
      `<circle cx='15' cy='15' r='1.5' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "diagonal-waves": (c, o) =>
    svg(
      40,
      40,
      `<path d='M0 40 Q 10 30, 20 40 T 40 40' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1' transform='rotate(-45 20 20)'/>`,
    ),
  "plus-pattern": (c, o) =>
    svg(
      20,
      20,
      `<path d='M10 5 v10 M5 10 h10' stroke='${c}' stroke-opacity='${o}' stroke-width='0.5'/>`,
    ),
  "overlapping-diamonds": (c, o) =>
    svg(
      40,
      40,
      `<path d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><path d='M0 0 L20 20 L0 40' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><path d='M40 0 L20 20 L40 40' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "intersecting-circles": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='20' cy='20' r='18'/><circle cx='0' cy='20' r='18'/><circle cx='40' cy='20' r='18'/><circle cx='20' cy='0' r='18'/><circle cx='20' cy='40' r='18'/></g>`,
    ),
  "circuit-v3": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M10 10 H90 V90 H10 Z M30 30 H70 V70 H30 Z M50 10 V30 M50 70 V90 M10 50 H30 M70 50 H90'/><circle cx='50' cy='50' r='5'/></g>`,
    ),
  "starry-sky": (c, o) =>
    svg(
      120,
      120,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='10' cy='10' r='1'/><circle cx='40' cy='20' r='1.5'/><circle cx='80' cy='15' r='1'/><circle cx='110' cy='40' r='2'/><circle cx='25' cy='60' r='1.2'/><circle cx='60' cy='80' r='1.5'/><circle cx='95' cy='70' r='1'/><circle cx='15' cy='100' r='1'/><circle cx='50' cy='110' r='1.8'/><circle cx='90' cy='105' r='1'/></g>`,
    ),
  "diagonal-blocks": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M0 0 L20 0 L0 20 Z'/><path d='M40 0 L40 20 L20 40 L0 40 L40 0 Z' fill-opacity='${o * 0.5}'/></g>`,
    ),
  "shimmering-grid": (c, o) =>
    svg(
      60,
      60,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'><path d='M0 0 H60 V60 H0 Z M0 20 H60 M0 40 H60 M20 0 V60 M40 0 V60'/><circle cx='10' cy='10' r='2' fill='${c}'/><circle cx='30' cy='30' r='2' fill='${c}'/><circle cx='50' cy='50' r='2' fill='${c}'/></g>`,
    ),
  "modern-waves": (c, o) =>
    svg(
      80,
      40,
      `<path d='M0 20 C 20 10, 20 30, 40 20 S 60 10, 80 20' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2' stroke-linecap='round'/>`,
    ),
  "crosses-scattered": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M10 10 h6 M13 7 v6'/><path d='M50 30 h4 M52 28 v4'/><path d='M80 15 h8 M84 11 v8'/><path d='M20 70 h6 M23 67 v6'/><path d='M70 85 h4 M72 83 v4'/></g>`,
    ),
  "floating-diamonds": (c, o) =>
    svg(
      80,
      80,
      `<g fill='${c}' fill-opacity='${o}'><path d='M10 10 L15 20 L10 30 L5 20 Z'/><path d='M50 40 L55 50 L50 60 L45 50 Z' fill-opacity='${o * 0.6}'/><path d='M20 60 L25 70 L20 80 L15 70 Z' fill-opacity='${o * 0.4}'/></g>`,
    ),
  "isometric-cubes": (c, o) =>
    svg(
      40,
      70,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='1'><path d='M0 17.5 L20 29 L40 17.5 L20 6 Z'/><path d='M0 17.5 V41 L20 52.5 V29'/><path d='M40 17.5 V41 L20 52.5'/></g>`,
    ),
  "woven": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'><path d='M0 20 H40 M20 0 V40 M0 0 L40 40 M40 0 L0 40'/></g>`,
    ),
  "circuit-v4": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M10 10 Q 50 10, 50 50 T 90 90'/><path d='M10 90 Q 50 90, 50 50 T 90 10'/><circle cx='50' cy='50' r='4' fill='${c}'/><circle cx='10' cy='10' r='2' fill='${c}'/><circle cx='90' cy='90' r='2' fill='${c}'/></g>`,
    ),
  "falling-stars": (c, o) =>
    svg(
      80,
      80,
      `<g fill='${c}' fill-opacity='${o}'><path d='M10 10 L12 15 L17 15 L13 18 L15 23 L10 20 L5 23 L7 18 L3 15 L8 15 Z' transform='rotate(15 10 10)'/><path d='M40 40 L42 45 L47 45 L43 48 L45 53 L40 50 L35 53 L37 48 L33 45 L38 45 Z' transform='rotate(-20 40 40)'/><path d='M70 15 L72 20 L77 20 L73 23 L75 28 L70 25 L65 28 L67 23 L63 20 L68 20 Z' transform='rotate(45 70 15)'/></g>`,
    ),
  "topography-v3": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.6'><path d='M10 10 C 20 20, 40 0, 50 10 S 80 0, 90 10'/><path d='M10 30 C 20 40, 40 20, 50 30 S 80 20, 90 30'/><path d='M10 50 C 20 60, 40 40, 50 50 S 80 40, 90 50'/><path d='M10 70 C 20 80, 40 60, 50 70 S 80 60, 90 70'/><path d='M10 90 C 20 100, 40 80, 50 90 S 80 80, 90 90'/></g>`,
    ),
  "pulse": (c, o) =>
    svg(
      100,
      40,
      `<path d='M0 20 H30 L35 5 L45 35 L50 20 H100' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2'/>`,
    ),
  "origami": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M0 0 L20 20 L40 0 Z'/><path d='M0 40 L20 20 L40 40 Z' fill-opacity='${o * 0.5}'/><path d='M0 0 L20 20 L0 40 Z' fill-opacity='${o * 0.3}'/><path d='M40 0 L20 20 L40 40 Z' fill-opacity='${o * 0.7}'/></g>`,
    ),
  "floating-shapes": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='20' cy='20' r='5'/><rect x='60' y='15' width='10' height='10' rx='2' transform='rotate(30 65 20)'/><path d='M30 70 L40 80 L20 80 Z'/><circle cx='80' cy='75' r='4' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'/></g>`,
    ),
  "data-stream": (c, o) =>
    svg(
      40,
      80,
      `<g fill='${c}' fill-opacity='${o}'><rect x='10' y='5' width='2' height='10'/><rect x='10' y='25' width='2' height='20'/><rect x='10' y='55' width='2' height='5'/><rect x='30' y='15' width='2' height='30'/><rect x='30' y='55' width='2' height='15'/></g>`,
    ),
  "geometric-wire": (c, o) =>
    svg(
      60,
      60,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.8'><path d='M0 30 L30 0 L60 30 L30 60 Z'/><path d='M15 15 L45 15 L45 45 L15 45 Z'/><circle cx='30' cy='30' r='10'/></g>`,
    ),
  "nanotechnology": (c, o) =>
    svg(
      50,
      50,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='1'><circle cx='25' cy='25' r='5'/><circle cx='10' cy='10' r='3'/><circle cx='40' cy='10' r='3'/><circle cx='10' cy='40' r='3'/><circle cx='40' cy='40' r='3'/><path d='M25 20 V10 M25 30 V40 M20 25 H10 M30 25 H40 M14 14 L21 21 M36 36 L29 29 M14 36 L21 29 M36 14 L29 21'/></g>`,
    ),
  "cloud-computing": (c, o) =>
    svg(
      100,
      60,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M20 40 Q20 30 30 30 Q30 20 45 20 Q60 20 60 35 Q75 35 75 50 Q75 60 60 60 H30 Q20 60 20 50 Z'/><path d='M45 40 V50 M45 40 L40 45 M45 40 L50 45'/></g>`,
    ),
  "sparkles": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><path d='M20 20 L22 25 L27 27 L22 29 L20 34 L18 29 L13 27 L18 25 Z'/><path d='M70 15 L71 18 L74 19 L71 20 L70 23 L69 20 L66 19 L69 18 Z'/><path d='M40 70 L42 75 L47 77 L42 79 L40 84 L38 79 L33 77 L38 75 Z'/><circle cx='80' cy='60' r='1'/><circle cx='15' cy='85' r='1.5'/></g>`,
    ),
  "abstract-nodes": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.6'><circle cx='20' cy='20' r='2' fill='${c}'/><circle cx='80' cy='30' r='2' fill='${c}'/><circle cx='50' cy='80' r='2' fill='${c}'/><circle cx='15' cy='70' r='2' fill='${c}'/><path d='M20 20 L80 30 L50 80 L15 70 L20 20 L50 80 M80 30 L15 70'/></g>`,
    ),
  "quantum": (c, o) =>
    svg(
      80,
      80,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='1'><circle cx='40' cy='40' r='4' fill='${c}'/><ellipse cx='40' cy='40' rx='30' ry='10'/><ellipse cx='40' cy='40' rx='30' ry='10' transform='rotate(60 40 40)'/><ellipse cx='40' cy='40' rx='30' ry='10' transform='rotate(120 40 40)'/></g>`,
    ),
  "hypergrid": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'><path d='M0 0 L100 100 M100 0 L0 100 M0 50 L100 50 M50 0 L50 100'/><rect x='25' y='25' width='50' height='50' stroke-width='1'/><circle cx='50' cy='50' r='10' stroke-width='1'/></g>`,
    ),
  "dna-helix": (c, o) =>
    svg(
      60,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='2'><path d='M10 0 Q 50 25, 10 50 T 10 100'/><path d='M50 0 Q 10 25, 50 50 T 50 100'/><line x1='15' y1='10' x2='45' y2='10' stroke-width='1'/><line x1='30' y1='25' x2='30' y2='25' stroke-width='4' stroke-linecap='round'/><line x1='15' y1='40' x2='45' y2='40' stroke-width='1'/><line x1='15' y1='60' x2='45' y2='60' stroke-width='1'/><line x1='15' y1='90' x2='45' y2='90' stroke-width='1'/></g>`,
    ),
  "constellation": (c, o) =>
    svg(
      120,
      120,
      `<g fill='${c}' fill-opacity='${o}' stroke='${c}' stroke-opacity='${o * 0.4}' stroke-width='0.5'><circle cx='20' cy='30' r='1.5'/><circle cx='50' cy='20' r='1'/><circle cx='80' cy='40' r='2'/><circle cx='40' cy='70' r='1.5'/><circle cx='100' cy='90' r='1'/><path d='M20 30 L50 20 L80 40 M50 20 L40 70 L100 90'/></g>`,
    ),
  "blueprint": (c, o) =>
    svg(
      50,
      50,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'><rect x='0' y='0' width='50' height='50'/><path d='M0 25 H50 M25 0 V50'/><circle cx='25' cy='25' r='15' stroke-dasharray='2,2'/></g>`,
    ),
  "waves-v3": (c, o) =>
    svg(
      100,
      60,
      `<path d='M0 30 Q 25 10, 50 30 T 100 30' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2' stroke-linecap='round'><animate attributeName='d' values='M0 30 Q 25 10, 50 30 T 100 30;M0 30 Q 25 50, 50 30 T 100 30;M0 30 Q 25 10, 50 30 T 100 30' dur='3s' repeatCount='indefinite'/></path>`,
    ),
  "glitch-lines": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><rect x='10' y='20' width='80' height='1'/><rect x='5' y='25' width='40' height='2'/><rect x='60' y='25' width='30' height='1.5'/><rect x='20' y='60' width='70' height='1'/><rect x='10' y='65' width='20' height='3'/></g>`,
    ),
  "molecular": (c, o) =>
    svg(
      80,
      80,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='1'><circle cx='40' cy='40' r='6' fill='${c}'/><circle cx='15' cy='20' r='4'/><circle cx='65' cy='15' r='3'/><circle cx='70' cy='60' r='5'/><circle cx='20' cy='65' r='3'/><path d='M40 40 L15 20 M40 40 L65 15 M40 40 L70 60 M40 40 L20 65'/></g>`,
    ),
  "starburst": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' stroke-width='1'><line x1='50' y1='50' x2='50' y2='10'/><line x1='50' y1='50' x2='90' y2='50'/><line x1='50' y1='50' x2='50' y2='90'/><line x1='50' y1='50' x2='10' y2='50'/><line x1='50' y1='50' x2='80' y2='20'/><line x1='50' y1='50' x2='80' y2='80'/><line x1='50' y1='50' x2='20' y2='80'/><line x1='50' y1='50' x2='20' y2='20'/></g>`,
    ),
  "hex-grid-v2": (c, o) =>
    svg(
      52,
      30,
      `<path d='M0 15 L13 0 L39 0 L52 15 L39 30 L13 30 Z' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "diagonal-mesh": (c, o) =>
    svg(
      40,
      40,
      `<g stroke='${c}' stroke-opacity='${o}' stroke-width='0.5'><path d='M0 0 L40 40 M0 10 L30 40 M10 0 L40 30 M0 20 L20 40 M20 0 L40 20 M0 30 L10 40 M30 0 L40 10'/><path d='M40 0 L0 40 M40 10 L10 40 M30 0 L0 30 M40 20 L20 40 M20 0 L0 20 M40 30 L30 40 M10 0 L0 10'/></g>`,
    ),
  "radial-pulse": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='50' cy='50' r='10'/><circle cx='50' cy='50' r='20' stroke-dasharray='4,4'/><circle cx='50' cy='50' r='30'/><circle cx='50' cy='50' r='40' stroke-dasharray='2,2'/></g>`,
    ),
  "abstract-vines": (c, o) =>
    svg(
      100,
      100,
      `<path d='M0 100 C 20 80, 40 120, 60 100 S 80 80, 100 100' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><path d='M0 50 C 30 20, 70 80, 100 50' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><path d='M0 0 C 20 20, 40 -20, 60 0 S 80 20, 100 0' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "matrix-code": (c, o) =>
    svg(
      60,
      120,
      `<g fill='${c}' fill-opacity='${o}' font-family='monospace' font-size='10' text-anchor='middle'><text x='10' y='20'>1</text><text x='10' y='40'>0</text><text x='10' y='60'>1</text><text x='30' y='30'>0</text><text x='30' y='50'>1</text><text x='30' y='70'>0</text><text x='50' y='20'>1</text><text x='50' y='40'>1</text><text x='50' y='60'>0</text></g>`,
    ),
  "pixel-dust": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><rect x='10' y='10' width='2' height='2'/><rect x='50' y='20' width='3' height='3'/><rect x='80' y='40' width='2' height='2'/><rect x='20' y='70' width='4' height='4'/><rect x='60' y='80' width='2' height='2'/><rect x='90' y='10' width='3' height='3'/></g>`,
    ),
  "geometric-bloom": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='50' cy='50' r='10'/><path d='M50 40 Q 60 20, 50 0 Q 40 20, 50 40'/><path d='M50 60 Q 60 80, 50 100 Q 40 80, 50 60'/><path d='M40 50 Q 20 60, 0 50 Q 20 40, 40 50'/><path d='M60 50 Q 80 60, 100 50 Q 80 40, 60 50'/></g>`,
    ),
  "circuit-board-v2": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'><path d='M10 10 H30 V30 H50 V50 H70 V70 H90'/><circle cx='10' cy='10' r='3' fill='${c}'/><circle cx='50' cy='50' r='3' fill='${c}'/><circle cx='90' cy='70' r='3' fill='${c}'/></g>`,
    ),
  "starlight": (c, o) =>
    svg(
      120,
      120,
      `<g fill='${c}' fill-opacity='${o}'><path d='M20 20 L22 25 L27 27 L22 29 L20 34 L18 29 L13 27 L18 25 Z'/><circle cx='60' cy='40' r='1'/><circle cx='90' cy='20' r='1.5'/><circle cx='40' cy='80' r='1'/><circle cx='100' cy='100' r='2'/></g>`,
    ),
  "ocean-waves": (c, o) =>
    svg(
      100,
      40,
      `<path d='M0 20 C 20 0, 30 40, 50 20 S 80 0, 100 20' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2' stroke-linecap='round'/>`,
    ),
  "interlocking-circles": (c, o) =>
    svg(
      60,
      60,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><circle cx='30' cy='30' r='25'/><circle cx='0' cy='0' r='25'/><circle cx='60' cy='0' r='25'/><circle cx='0' cy='60' r='25'/><circle cx='60' cy='60' r='25'/></g>`,
    ),
  "digital-terrain": (c, o) =>
    svg(
      80,
      80,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.5'><path d='M0 40 L20 20 L40 40 L60 20 L80 40'/><path d='M0 60 L20 40 L40 60 L60 40 L80 60'/><path d='M0 20 L20 0 L40 20 L60 0 L80 20'/></g>`,
    ),
  "nano-grid": (c, o) =>
    svg(
      20,
      20,
      `<rect x='0' y='0' width='10' height='10' stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'/><circle cx='10' cy='10' r='1' fill='${c}' fill-opacity='${o}'/>`,
    ),
  "woven-threads": (c, o) =>
    svg(
      40,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M0 10 H40 M0 30 H40 M10 0 V40 M30 0 V40'/><path d='M5 5 L15 15 M25 25 L35 35 M35 5 L25 15 M15 25 L5 35' stroke-width='0.5'/></g>`,
    ),
  "polygonal-mind": (c, o) =>
    svg(
      100,
      100,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.8'><path d='M20 20 L50 10 L80 20 L90 50 L80 80 L50 90 L20 80 L10 50 Z'/><path d='M20 20 L80 80 M80 20 L20 80 M50 10 L50 90 M10 50 L90 50'/></g>`,
    ),
  "vintage-wallpaper": (c, o) =>
    svg(
      60,
      60,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M30 0 C 40 10, 40 20, 30 30 S 20 50, 30 60'/><path d='M0 30 C 10 40, 20 40, 30 30 S 50 20, 60 30'/></g>`,
    ),
  "golden-lace": (c, o) =>
    svg(
      80,
      80,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.5'><circle cx='40' cy='40' r='38'/><circle cx='40' cy='40' r='30'/><circle cx='40' cy='40' r='20'/><path d='M0 40 H80 M40 0 V80 M11.7 11.7 L68.3 68.3 M11.7 68.3 L68.3 11.7'/></g>`,
    ),
  "diamond-peak": (c, o) =>
    svg(
      40,
      40,
      `<g fill='${c}' fill-opacity='${o}'><path d='M20 0 L40 20 L20 40 L0 20 Z'/><path d='M20 10 L30 20 L20 30 L10 20 Z' fill-opacity='${o * 0.5}'/></g>`,
    ),
  "cyber-grid": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'><path d='M0 0 L100 100 M100 0 L0 100'/><rect x='10' y='10' width='80' height='80'/><rect x='30' y='30' width='40' height='40'/><circle cx='50' cy='50' r='5' fill='${c}'/></g>`,
    ),
  "neural-network": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.8'><circle cx='20' cy='20' r='2' fill='${c}'/><circle cx='80' cy='20' r='2' fill='${c}'/><circle cx='50' cy='50' r='2' fill='${c}'/><circle cx='20' cy='80' r='2' fill='${c}'/><circle cx='80' cy='80' r='2' fill='${c}'/><path d='M20 20 L50 50 M80 20 L50 50 M20 80 L50 50 M80 80 L50 50 M20 20 V80 M80 20 V80'/></g>`,
    ),
  velocity: (c, o) =>
    svg(
      100,
      40,
      `<g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'><path d='M0 10 H60 M10 20 H80 M0 30 H50'/><path d='M70 10 L80 10 M85 20 L95 20 M60 30 L70 30' stroke-width='2'/></g>`,
    ),
  "organic-mesh": (c, o) =>
    svg(
      80,
      80,
      `<path d='M0 40 Q 20 0, 40 40 T 80 40 M0 20 Q 20 60, 40 20 T 80 20' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5' stroke-linecap='round'/>`,
    ),
  "shattered-glass": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'><path d='M50 50 L0 0 M50 50 L100 20 M50 50 L80 100 M50 50 L10 80 M50 50 L0 60 M20 20 L80 20 L50 80 Z'/></g>`,
    ),
  "tech-blueprint": (c, o) =>
    svg(
      60,
      60,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='0.5'><rect x='5' y='5' width='50' height='50'/><circle cx='30' cy='30' r='20'/><path d='M0 30 H60 M30 0 V60 M10 10 L50 50 M50 10 L10 50'/></g>`,
    ),
  "constellation-v2": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><circle cx='10' cy='20' r='1.5'/><circle cx='40' cy='10' r='1'/><circle cx='70' cy='30' r='2'/><circle cx='90' cy='60' r='1.5'/><circle cx='50' cy='80' r='1'/><circle cx='20' cy='70' r='1.2'/></g><g stroke='${c}' stroke-opacity='${o * 0.4}' stroke-width='0.5'><path d='M10 20 L40 10 L70 30 L90 60 L50 80 L20 70 Z M40 10 L50 80'/></g>`,
    ),
  "digital-waves": (c, o) =>
    svg(
      80,
      40,
      `<path d='M0 30 H20 V10 H40 V30 H60 V10 H80' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1.5'/>`,
    ),
  "honeycomb-v3": (c, o) =>
    svg(
      52,
      30,
      `<path d='M13 0 L39 0 L52 15 L39 30 L13 30 L0 15 Z' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><circle cx='26' cy='15' r='5' fill='${c}' fill-opacity='${o * 0.3}'/>`,
    ),
  "radial-circuit": (c, o) =>
    svg(
      100,
      100,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='1'><circle cx='50' cy='50' r='10'/><path d='M50 40 V10 M50 60 V90 M40 50 H10 M60 50 H90 M43 43 L20 20 M57 57 L80 80 M43 57 L20 80 M57 43 L80 20'/><circle cx='50' cy='10' r='2' fill='${c}'/><circle cx='50' cy='90' r='2' fill='${c}'/><circle cx='10' cy='50' r='2' fill='${c}'/><circle cx='90' cy='50' r='2' fill='${c}'/></g>`,
    ),
  "glitch-noise": (c, o) =>
    svg(
      100,
      100,
      `<g fill='${c}' fill-opacity='${o}'><rect x='10' y='10' width='5' height='1'/><rect x='40' y='15' width='10' height='2'/><rect x='70' y='10' width='3' height='1'/><rect x='20' y='40' width='20' height='1'/><rect x='60' y='45' width='15' height='2'/><rect x='15' y='70' width='10' height='1'/><rect x='50' y='75' width='30' height='1'/></g>`,
    ),
  "zen-garden": (c, o) =>
    svg(
      80,
      40,
      `<path d='M0 10 C 10 10, 10 30, 20 30 S 30 10, 40 10 S 50 30, 60 30 S 70 10, 80 10' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/><path d='M0 20 C 10 20, 10 40, 20 40 S 30 20, 40 20 S 50 40, 60 40 S 70 20, 80 20' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/>`,
    ),
  "binary-code": (c, o) =>
    svg(
      60,
      60,
      `<g fill='${c}' fill-opacity='${o}' font-family='monospace' font-size='8' text-anchor='middle'><text x='10' y='15'>1</text><text x='30' y='15'>0</text><text x='50' y='15'>1</text><text x='10' y='35'>0</text><text x='30' y='35'>1</text><text x='50' y='35'>0</text><text x='10' y='55'>1</text><text x='30' y='55'>1</text><text x='50' y='55'>0</text></g>`,
    ),
  "quantum-flux": (c, o) =>
    svg(
      100,
      60,
      `<g stroke='${c}' stroke-opacity='${o}' fill='none' stroke-width='1'><path d='M0 30 Q 25 10, 50 30 T 100 30'/><path d='M0 30 Q 25 50, 50 30 T 100 30'/><path d='M0 30 H100' stroke-dasharray='4,4'/></g>`,
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
