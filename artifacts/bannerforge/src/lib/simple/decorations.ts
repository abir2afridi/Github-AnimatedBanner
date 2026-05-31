const enc = (svg: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const make = (body: string, viewBox = "0 0 64 64"): string =>
  enc(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${body}</svg>`,
  );

export const decorations: Record<string, string> = {
  octocat: make(
    `<circle cx='32' cy='30' r='18' fill='white' stroke='none'/><circle cx='25' cy='28' r='3' fill='black'/><circle cx='39' cy='28' r='3' fill='black'/><path d='M22 14 L26 22 M42 14 L38 22' stroke='white' fill='none'/><path d='M20 48 Q32 56 44 48' stroke='black' fill='none' stroke-width='2'/>`,
  ),
  "github-mark": make(
    `<path fill='white' stroke='none' d='M32 6 C18 6 8 17 8 31 C8 42 15 51 25 54 C26 54 27 53 27 53 L27 47 C20 49 19 44 19 44 C18 42 16 41 16 41 C14 39 19 39 19 39 C22 40 23 42 23 42 C26 47 31 45 32 45 C32 43 33 42 34 42 C28 41 22 39 22 29 C22 27 23 24 24 23 C24 22 23 19 25 16 C25 16 28 15 32 18 C34 17 38 17 40 18 C44 15 47 16 47 16 C49 19 48 22 47 23 C49 24 49 27 49 29 C49 39 43 41 37 42 C38 43 39 44 39 46 L39 53 C39 53 40 54 41 54 C51 51 58 42 58 31 C58 17 47 6 32 6 z'/>`,
  ),
  "code-brackets": make(
    `<path d='M22 18 L8 32 L22 46 M42 18 L56 32 L42 46 M28 50 L36 14'/>`,
  ),
  terminal: make(
    `<rect x='6' y='10' width='52' height='44' rx='4'/><path d='M14 22 L22 30 L14 38'/><path d='M28 40 L40 40'/><circle cx='12' cy='14' r='1.5' fill='white' stroke='none'/><circle cx='17' cy='14' r='1.5' fill='white' stroke='none'/><circle cx='22' cy='14' r='1.5' fill='white' stroke='none'/>`,
  ),
  "terminal-circle": make(
    `<circle cx='32' cy='32' r='24'/><path d='M22 26 L30 32 L22 38'/><path d='M34 40 L42 40'/>`,
  ),
  rocket: make(
    `<path d='M32 6 C40 12 44 22 44 32 L44 44 L20 44 L20 32 C20 22 24 12 32 6 z'/><circle cx='32' cy='26' r='4'/><path d='M20 38 L12 46 L18 50 L20 44'/><path d='M44 38 L52 46 L46 50 L44 44'/><path d='M26 50 L26 56 M32 50 L32 58 M38 50 L38 56'/>`,
  ),
  lightning: make(
    `<path d='M36 4 L14 36 L28 36 L24 60 L50 24 L34 24 z' fill='white' stroke='none'/>`,
  ),
  planet: make(
    `<circle cx='32' cy='32' r='14'/><ellipse cx='32' cy='32' rx='28' ry='8' transform='rotate(-20 32 32)'/>`,
  ),
  cube: make(
    `<path d='M32 8 L54 20 L54 44 L32 56 L10 44 L10 20 z'/><path d='M32 8 L32 32 M32 32 L54 20 M32 32 L10 20 M32 32 L32 56'/>`,
  ),
  atom: make(
    `<circle cx='32' cy='32' r='3' fill='white' stroke='none'/><ellipse cx='32' cy='32' rx='26' ry='10'/><ellipse cx='32' cy='32' rx='26' ry='10' transform='rotate(60 32 32)'/><ellipse cx='32' cy='32' rx='26' ry='10' transform='rotate(120 32 32)'/>`,
  ),
  gear: make(
    `<circle cx='32' cy='32' r='10'/><path d='M32 4 L32 14 M32 50 L32 60 M4 32 L14 32 M50 32 L60 32 M12 12 L19 19 M45 45 L52 52 M12 52 L19 45 M45 19 L52 12'/>`,
  ),
  dino: make(
    `<path d='M14 50 L14 38 Q14 22 30 22 L40 22 L42 18 L46 18 L46 22 L50 22 L50 30 L40 30 L40 50 L34 50 L34 42 L28 42 L28 50 L22 50 L22 42 L14 42 z' fill='white' stroke='none'/><circle cx='44' cy='25' r='1.5' fill='black'/>`,
  ),
  "headphones-cat": make(
    `<path d='M16 30 Q16 10 32 10 Q48 10 48 30' stroke-width='3'/><rect x='10' y='28' width='10' height='14' rx='2' fill='white' stroke='none'/><rect x='44' y='28' width='10' height='14' rx='2' fill='white' stroke='none'/><circle cx='32' cy='40' r='12' fill='white' stroke='none'/><path d='M22 38 L26 32 L28 36 z' fill='white' stroke='none'/><path d='M42 38 L38 32 L36 36 z' fill='white' stroke='none'/><circle cx='28' cy='40' r='1.5' fill='black'/><circle cx='36' cy='40' r='1.5' fill='black'/>`,
  ),
  "html-tag": make(
    `<rect x='6' y='10' width='52' height='44' rx='4' fill='white' stroke='none'/><text x='32' y='40' font-family='monospace' font-size='14' font-weight='bold' fill='black' text-anchor='middle' stroke='none'>HTML</text>`,
  ),
  "css-tag": make(
    `<rect x='6' y='10' width='52' height='44' rx='4' fill='white' stroke='none'/><text x='32' y='40' font-family='monospace' font-size='16' font-weight='bold' fill='black' text-anchor='middle' stroke='none'>CSS</text>`,
  ),
  "js-tag": make(
    `<rect x='6' y='10' width='52' height='44' rx='4' fill='white' stroke='none'/><text x='32' y='40' font-family='monospace' font-size='18' font-weight='bold' fill='black' text-anchor='middle' stroke='none'>JS</text>`,
  ),
  "idea-bulb": make(
    `<path d='M32 6 C22 6 16 14 16 22 C16 28 20 32 22 36 L22 42 L42 42 L42 36 C44 32 48 28 48 22 C48 14 42 6 32 6 z'/><path d='M24 46 L40 46 M26 50 L38 50 M28 54 L36 54'/>`,
  ),
  coffee: make(
    `<path d='M10 22 L10 44 Q10 54 22 54 L34 54 Q46 54 46 44 L46 22 z'/><path d='M46 28 L52 28 Q58 28 58 34 Q58 40 52 40 L46 40'/><path d='M18 8 Q14 12 18 16 M28 8 Q24 12 28 16 M38 8 Q34 12 38 16'/>`,
  ),
  "react-atom": make(
    `<circle cx='32' cy='32' r='3' fill='white' stroke='none'/><ellipse cx='32' cy='32' rx='26' ry='10'/><ellipse cx='32' cy='32' rx='26' ry='10' transform='rotate(60 32 32)'/><ellipse cx='32' cy='32' rx='26' ry='10' transform='rotate(120 32 32)'/><circle cx='32' cy='32' r='1.5' fill='white' stroke='none'/>`,
  ),
  database: make(
    `<ellipse cx='32' cy='14' rx='20' ry='6'/><path d='M12 14 L12 32 Q12 38 32 38 Q52 38 52 32 L52 14'/><path d='M12 32 L12 50 Q12 56 32 56 Q52 56 52 50 L52 32'/>`,
  ),
  cloud: make(
    `<path d='M16 44 Q6 44 6 34 Q6 24 18 22 Q20 12 32 12 Q44 12 46 22 Q58 22 58 34 Q58 44 48 44 z'/>`,
  ),
  shield: make(
    `<path d='M32 6 L52 14 L52 32 Q52 50 32 58 Q12 50 12 32 L12 14 z'/><path d='M22 32 L30 40 L44 24'/>`,
  ),
  fire: make(
    `<path d='M32 4 Q26 14 26 22 Q22 18 18 22 Q14 28 18 36 Q12 36 12 44 Q12 56 32 58 Q52 56 52 44 Q52 36 46 36 Q50 26 42 22 Q40 14 32 4 z'/>`,
  ),
  music: make(
    `<path d='M22 44 L22 16 L48 12 L48 40'/><circle cx='18' cy='44' r='6'/><circle cx='44' cy='40' r='6'/>`,
  ),
  camera: make(
    `<rect x='6' y='16' width='52' height='38' rx='4'/><circle cx='32' cy='35' r='12'/><circle cx='32' cy='35' r='5'/><path d='M22 16 L26 10 L38 10 L42 16'/>`,
  ),
  pencil: make(
    `<path d='M44 6 L58 20 L20 58 L6 58 L6 44 z'/><path d='M40 10 L54 24'/>`,
  ),
  globe: make(
    `<circle cx='32' cy='32' r='26'/><ellipse cx='32' cy='32' rx='10' ry='26'/><path d='M6 32 L58 32 M10 18 L54 18 M10 46 L54 46'/>`,
  ),
  star: make(
    `<path d='M32 4 L40 24 L62 26 L46 40 L50 60 L32 50 L14 60 L18 40 L2 26 L24 24 z' fill='white' stroke='none'/>`,
  ),
  heart: make(
    `<path d='M32 56 L8 32 Q2 22 10 14 Q20 6 32 18 Q44 6 54 14 Q62 22 56 32 z' fill='white' stroke='none'/>`,
  ),
  pin: make(
    `<path d='M32 4 Q44 4 44 18 Q44 30 32 60 Q20 30 20 18 Q20 4 32 4 z'/><circle cx='32' cy='18' r='5' fill='white' stroke='none'/>`,
  ),
  "git-branch": make(
    `<circle cx='16' cy='12' r='5'/><circle cx='16' cy='52' r='5'/><circle cx='48' cy='32' r='5'/><path d='M16 17 L16 47'/><path d='M16 32 Q16 22 28 22 L43 22 Q48 22 48 27'/>`,
  ),
  "pull-request": make(
    `<circle cx='16' cy='12' r='5'/><circle cx='16' cy='52' r='5'/><circle cx='48' cy='52' r='5'/><path d='M16 17 L16 47'/><path d='M48 12 L48 47 M40 20 L48 12 L56 20'/>`,
  ),
  bug: make(
    `<rect x='18' y='20' width='28' height='30' rx='14'/><path d='M22 12 L18 18 M42 12 L46 18'/><path d='M6 28 L18 28 M6 38 L18 30 M6 48 L18 38'/><path d='M58 28 L46 28 M58 38 L46 30 M58 48 L46 38'/>`,
  ),
  "smile-cat": make(
    `<path d='M14 30 L14 18 L24 26 z' fill='white' stroke='none'/><path d='M50 30 L50 18 L40 26 z' fill='white' stroke='none'/><circle cx='32' cy='38' r='18'/><circle cx='26' cy='36' r='2' fill='white' stroke='none'/><circle cx='38' cy='36' r='2' fill='white' stroke='none'/><path d='M26 44 Q32 50 38 44'/>`,
  ),
  diamond: make(
    `<path d='M16 8 L48 8 L60 24 L32 60 L4 24 z'/><path d='M16 8 L24 24 L4 24 M48 8 L40 24 L60 24 M24 24 L32 60 L40 24 M24 24 L40 24'/>`,
  ),
  laptop: make(
    `<rect x='10' y='14' width='44' height='30' rx='2'/><path d='M4 50 L60 50 L56 44 L8 44 z'/>`,
  ),
  "speech-bubble": make(
    `<path d='M8 10 L56 10 Q60 10 60 14 L60 40 Q60 44 56 44 L26 44 L14 56 L18 44 L8 44 Q4 44 4 40 L4 14 Q4 10 8 10 z'/><circle cx='20' cy='27' r='2' fill='white' stroke='none'/><circle cx='32' cy='27' r='2' fill='white' stroke='none'/><circle cx='44' cy='27' r='2' fill='white' stroke='none'/>`,
  ),
  trophy: make(
    `<path d='M18 8 L46 8 L46 22 Q46 34 32 34 Q18 34 18 22 z'/><path d='M18 12 L8 12 Q8 24 18 24 M46 12 L56 12 Q56 24 46 24'/><path d='M28 34 L28 44 L36 44 L36 34'/><path d='M20 50 L44 50 L44 56 L20 56 z'/>`,
  ),
  "sound-wave": make(
    `<path d='M6 32 L6 32 M14 22 L14 42 M22 14 L22 50 M30 8 L30 56 M38 14 L38 50 M46 22 L46 42 M54 26 L54 38' stroke-width='3'/>`,
  ),
  "pixel-heart": make(
    `<path d='M16 20 L16 12 L24 12 L24 20 L32 20 L32 12 L40 12 L40 20 L48 20 L48 28 L40 28 L40 36 L32 36 L32 44 L24 44 L24 36 L16 36 L16 28 L8 28 L8 20 z' fill='white' stroke='none'/>`,
  ),
  controller: make(
    `<path d='M14 20 L50 20 Q60 20 60 30 L60 38 Q60 48 50 48 L46 48 L40 40 L24 40 L18 48 L14 48 Q4 48 4 38 L4 30 Q4 20 14 20 z'/><circle cx='18' cy='32' r='3' fill='white' stroke='none'/><circle cx='46' cy='28' r='2.5' fill='white' stroke='none'/><circle cx='50' cy='34' r='2.5' fill='white' stroke='none'/>`,
  ),
  briefcase: make(
    `<rect x='6' y='18' width='52' height='38' rx='3'/><path d='M22 18 L22 12 Q22 8 26 8 L38 8 Q42 8 42 12 L42 18'/><path d='M6 32 L58 32'/>`,
  ),
  book: make(
    `<path d='M8 10 L8 50 Q8 54 12 54 L32 50 L32 6 L12 10 Q8 10 8 10 z'/><path d='M56 10 L56 50 Q56 54 52 54 L32 50 L32 6 L52 10 Q56 10 56 10 z'/>`,
  ),
  anchor: make(
    `<path d='M32 8 V56 M16 40 Q16 56 32 56 Q48 56 48 40 M12 36 H20 M44 36 H52'/><circle cx='32' cy='12' r='4'/>`,
  ),
  compass: make(
    `<circle cx='32' cy='32' r='26'/><path d='M32 14 L38 32 L32 50 L26 32 z' fill='white' stroke='none'/><circle cx='32' cy='32' r='2' fill='black' stroke='none'/>`,
  ),
  sun: make(
    `<circle cx='32' cy='32' r='10'/><path d='M32 4 V12 M32 52 V60 M4 32 H12 M52 32 H60 M12 12 L18 18 M46 46 L52 52 M12 52 L18 46 M46 12 L52 18'/>`,
  ),
  moon: make(
    `<path d='M32 10 Q16 10 16 32 Q16 54 32 54 Q40 54 46 48 Q32 48 32 32 Q32 16 46 16 Q40 10 32 10 z' fill='white' stroke='none'/>`,
  ),
  umbrella: make(
    `<path d='M12 36 Q12 12 32 12 Q52 12 52 36 Z'/><path d='M32 36 V52 Q32 56 26 56'/>`,
  ),
  gift: make(
    `<rect x='12' y='24' width='40' height='32' rx='2'/><rect x='8' y='18' width='48' height='6' rx='1'/><path d='M32 18 V56 M8 32 H56'/><path d='M32 18 Q20 4 32 10 Q44 4 32 18'/>`,
  ),
  coffee2: make(
    `<path d='M18 16 h28 v28 q0 12 -14 12 t-14 -12 z'/><path d='M46 24 h6 q6 0 6 6 t-6 6 h-6'/><path d='M24 6 v6 M32 6 v6 M40 6 v6'/>`,
  ),
  "game-die": make(
    `<rect x='10' y='10' width='44' height='44' rx='8'/><circle cx='22' cy='22' r='2.5' fill='white' stroke='none'/><circle cx='42' cy='42' r='2.5' fill='white' stroke='none'/><circle cx='32' cy='32' r='2.5' fill='white' stroke='none'/><circle cx='42' cy='22' r='2.5' fill='white' stroke='none'/><circle cx='22' cy='42' r='2.5' fill='white' stroke='none'/>`,
  ),
  clover: make(
    `<path d='M32 32 Q14 14 32 14 Q50 14 32 32 Q14 50 32 50 Q50 50 32 32 Q50 14 50 32 Q50 50 32 32 Q14 14 14 32 Q14 50 32 32' fill='white' stroke='none'/><path d='M32 32 V58'/>`,
  ),
  diamond2: make(
    `<path d='M32 6 L58 32 L32 58 L6 32 z'/>`,
  ),
  "heart-pulse": make(
    `<path d='M10 32 H24 L28 18 L36 46 L40 32 H54'/>`,
  ),
  infinity: make(
    `<path d='M12 32 Q12 18 22 18 Q32 18 42 32 Q52 46 62 46 Q72 46 72 32 Q72 18 62 18 Q52 18 42 32 Q32 46 22 46 Q12 46 12 32 z' transform='scale(0.8) translate(8, 8)'/>`,
  ),
  sparkles: make(
    `<path d='M32 8 L35 22 L48 25 L35 28 L32 42 L29 28 L16 25 L29 22 z' fill='white' stroke='none'/><path d='M52 44 L54 50 L60 52 L54 54 L52 60 L50 54 L44 52 L50 50 z' fill='white' stroke='none'/><path d='M12 40 L13 44 L17 45 L13 46 L12 50 L11 46 L7 45 L11 44 z' fill='white' stroke='none'/>`,
  ),
  award: make(
    `<circle cx='32' cy='22' r='16'/><path d='M22 36 L16 58 L32 50 L48 58 L42 36'/><circle cx='32' cy='22' r='8'/>`,
  ),
  "code-xml": make(
    `<path d='M18 24 L8 32 L18 40 M46 24 L56 32 L46 40 M36 12 L28 52'/>`,
  ),
  "binary-tree": make(
    `<circle cx='32' cy='12' r='5'/><circle cx='16' cy='32' r='5'/><circle cx='48' cy='32' r='5'/><circle cx='8' cy='52' r='5'/><circle cx='24' cy='52' r='5'/><path d='M28 16 L20 28 M36 16 L44 28 M12 36 L10 48 M20 36 L22 48'/>`,
  ),
  brain: make(
    `<path d='M32 56 Q12 56 12 36 Q12 20 24 16 Q32 14 40 16 Q52 20 52 36 Q52 56 32 56'/><path d='M32 14 V56 M12 36 H52'/>`,
  ),
  shield2: make(
    `<path d='M32 4 L56 14 V32 Q56 50 32 60 Q8 50 8 32 V14 z'/><path d='M32 12 V52 M16 22 H48'/>`,
  ),
  flask: make(
    `<path d='M24 8 H40 M28 8 V24 L12 52 Q10 56 14 56 H50 Q54 56 52 52 L36 24 V8'/><path d='M20 44 H44'/>`,
  ),
  "hammer": make(
    `<path d='M44 14 L50 20 L30 40 L24 34 Z M14 44 L30 28 M14 44 L8 50 L14 56 L20 50 Z'/>`,
  ),
  "wrench": make(
    `<path d='M48 16 A12 12 0 1 0 32 28 L14 46 L18 50 L36 32 A12 12 0 0 0 48 16 Z M40 12 L44 8'/>`,
  ),
  "brush": make(
    `<path d='M50 14 L54 10 L58 14 L54 18 Z M20 44 L50 14 M20 44 L14 50 Q10 54 14 58 Q18 62 22 58 L28 52'/>`,
  ),
  "palette": make(
    `<path d='M32 6 Q58 6 58 32 Q58 58 32 58 Q6 58 6 32 Q6 6 32 6 Z'/><circle cx='20' cy='20' r='3' fill='white' stroke='none'/><circle cx='32' cy='16' r='3' fill='white' stroke='none'/><circle cx='44' cy='20' r='3' fill='white' stroke='none'/><circle cx='48' cy='32' r='3' fill='white' stroke='none'/>`,
  ),
  "youtube-alt": make(
    `<rect x='6' y='14' width='52' height='36' rx='8'/><path d='M26 24 L42 32 L26 40 Z' fill='white' stroke='none'/>`,
  ),
  "instagram-alt": make(
    `<rect x='10' y='10' width='44' height='44' rx='12'/><circle cx='32' cy='32' r='10'/><circle cx='44' cy='20' r='2' fill='white' stroke='none'/>`,
  ),
  "cake": make(
    `<rect x='12' y='32' width='40' height='20' rx='4'/><path d='M12 42 H52'/><circle cx='20' cy='24' r='2'/><circle cx='32' cy='20' r='2'/><circle cx='44' cy='24' r='2'/><path d='M20 16 V12 M32 12 V8 M44 16 V12' stroke-width='1'/>`,
  ),
  "microchip": make(
    `<rect x='16' y='16' width='32' height='32' rx='2'/><path d='M24 16 V8 M32 16 V8 M40 16 V8 M24 48 V56 M32 48 V56 M40 48 V56 M16 24 H8 M16 32 H8 M16 40 H8 M48 24 H56 M48 32 H56 M48 40 H56'/>`,
  ),
  "briefcase-medical": make(
    `<rect x='10' y='18' width='44' height='34' rx='3'/><path d='M24 18 V12 Q24 8 32 8 Q40 8 40 12 V18 M32 28 V42 M25 35 H39'/>`,
  ),
  "bitcoin": make(
    `<circle cx='32' cy='32' r='26'/><path d='M24 20 H36 Q42 20 42 27 Q42 32 36 32 Q42 32 42 38 Q42 45 36 45 H24 M28 14 V50 M36 14 V50'/>`,
  ),
  "ethereum": make(
    `<path d='M32 6 L14 36 L32 46 L50 36 Z M32 46 L14 36 L32 58 L50 36 Z M32 6 L32 46'/>`,
  ),
  "python-v2": make(
    `<path d='M32 6 C24 6 24 10 24 14 V20 H32 V24 H20 C14 24 14 30 14 34 Q14 44 24 44 H28 V38 Q28 32 34 32 H44 V26 Q44 14 32 14 Z M28 10 A2 2 0 1 1 28 10.1'/>`,
  ),
  "javascript-v2": make(
    `<rect x='10' y='10' width='44' height='44' rx='4' fill='white' stroke='none'/><text x='48' y='48' font-family='sans-serif' font-size='20' font-weight='bold' fill='black' text-anchor='end' stroke='none'>JS</text>`,
  ),
  "typescript-v2": make(
    `<rect x='10' y='10' width='44' height='44' rx='4' fill='white' stroke='none'/><text x='48' y='48' font-family='sans-serif' font-size='20' font-weight='bold' fill='black' text-anchor='end' stroke='none'>TS</text>`,
  ),
  "react-v2": make(
    `<circle cx='32' cy='32' r='4' fill='white' stroke='none'/><ellipse cx='32' cy='32' rx='28' ry='10'/><ellipse cx='32' cy='32' rx='28' ry='10' transform='rotate(60 32 32)'/><ellipse cx='32' cy='32' rx='28' ry='10' transform='rotate(120 32 32)'/>`,
  ),
  "vue-v2": make(
    `<path d='M10 10 L32 48 L54 10 M20 10 L32 32 L44 10' stroke-width='4'/>`,
  ),
  "angular-v2": make(
    `<path d='M32 6 L54 14 L50 48 L32 58 L14 48 L10 14 Z M32 14 L20 42 M32 14 L44 42 M24 34 H40'/>`,
  ),
  "node-v2": make(
    `<path d='M32 6 L54 18 V46 L32 58 L10 46 V18 Z M32 18 V46'/>`,
  ),
  "docker-v2": make(
    `<rect x='20' y='20' width='8' height='8'/><rect x='30' y='20' width='8' height='8'/><rect x='40' y='20' width='8' height='8'/><rect x='20' y='30' width='8' height='8'/><rect x='30' y='30' width='8' height='8'/><rect x='40' y='30' width='8' height='8'/><path d='M10 44 Q32 44 58 36 Q58 52 10 52 Z'/>`,
  ),
  "kubernetes-v2": make(
    `<path d='M32 6 L52 16 L52 48 L32 58 L12 48 L12 16 Z M32 16 V48 M12 32 H52'/>`,
  ),
  "aws-v2": make(
    `<path d='M12 40 Q32 56 52 40 M48 44 L52 40 L46 38'/>`,
  ),
  "google-cloud-v2": make(
    `<path d='M14 44 H50 Q56 44 56 36 Q56 28 48 28 Q48 18 36 18 Q26 18 20 26 Q12 26 12 36 Q12 44 14 44 Z'/>`,
  ),
  "azure-v2": make(
    `<path d='M10 48 L24 10 L44 10 L54 48 L40 48 L32 28 L24 48 Z'/>`,
  ),
  "supabase-v2": make(
    `<path d='M40 6 L14 36 H30 L24 58 L50 28 H34 Z' fill='white' stroke='none'/>`,
  ),
  "firebase-v2": make(
    `<path d='M10 44 L32 6 L54 44 L32 58 Z M16 42 L32 14 L48 42'/>`,
  ),
  "vercel-v2": make(
    `<path d='M32 10 L58 54 H6 Z' fill='white' stroke='none'/>`,
  ),
  "netlify-v2": make(
    `<path d='M32 6 L58 32 L32 58 L6 32 Z M20 32 H44 M32 20 V44'/>`,
  ),
  "nextjs-v2": make(
    `<circle cx='32' cy='32' r='26'/><path d='M44 44 L20 20 M44 20 V44'/>`,
  ),
  "tailwind-v2": make(
    `<path d='M32 24 Q48 24 48 40 Q32 56 16 40 Q16 24 32 24 Z M16 24 Q32 8 48 24'/>`,
  ),
  "mongodb-v2": make(
    `<path d='M32 6 Q38 18 38 32 Q38 46 32 58 Q26 46 26 32 Q26 18 32 6 Z M32 10 Q28 20 28 32 Q28 44 32 54 Q36 44 36 32 Q36 20 32 10 Z' fill='white' stroke='none'/><path d='M32 20 V44'/>`,
  ),
  "postgresql-v2": make(
    `<path d='M32 10 Q44 10 50 20 Q56 30 54 44 Q52 58 32 54 Q12 58 10 44 Q8 30 14 20 Q20 10 32 10 Z'/><path d='M24 30 Q32 25 40 30'/>`,
  ),
  "redis-v2": make(
    `<path d='M10 20 L32 10 L54 20 L54 44 L32 54 L10 44 Z M10 32 H54 M32 10 V54'/>`,
  ),
  "docker-alt": make(
    `<path d='M6 36 H58 L52 14 H12 Z M18 22 H24 V28 H18 Z M28 22 H34 V28 H28 Z M38 22 H44 V28 H38 Z M18 30 H24 V36 H18 Z M28 30 H34 V36 H28 Z M38 30 H44 V36 H38 Z'/>`,
  ),
  "linux-v2": make(
    `<path d='M32 8 Q24 8 20 16 Q16 24 16 32 Q16 44 24 52 H40 Q48 44 48 32 Q48 24 44 16 Q40 8 32 8 Z M26 24 R2 M38 24 R2'/>`,
  ),
  "apple-v2": make(
    `<path d='M32 58 Q24 58 18 50 Q12 42 12 32 Q12 22 18 14 Q24 6 32 10 Q40 6 46 14 Q52 22 52 32 Q52 42 46 50 Q40 58 32 58 Z M32 10 V6' fill='white' stroke='none'/>`,
  ),
  "windows-v2": make(
    `<path d='M10 16 L28 14 V31 H10 Z M10 33 H28 V50 L10 48 Z M30 14 L54 10 V31 H30 Z M30 33 H54 V54 L30 50 Z'/>`,
  ),
  "android-v2": make(
    `<path d='M16 32 H48 V52 H16 Z M20 20 Q20 10 32 10 Q44 10 44 20 H20 Z M22 14 L18 6 M42 14 L46 6'/>`,
  ),
  "flutter-v2": make(
    `<path d='M32 6 L58 32 L32 58 L46 58 L58 46 L58 18 L46 6 Z M18 32 L32 46 L18 60 L6 60 L20 46 L6 32 Z'/>`,
  ),
  "dart-v2": make(
    `<path d='M32 6 L58 18 L58 46 L32 58 L6 46 L6 18 Z M32 18 L46 24 L32 40 L18 24 Z'/>`,
  ),
  "go-lang": make(
    `<text x='32' y='40' font-family='sans-serif' font-size='24' font-weight='bold' fill='white' text-anchor='middle' stroke='none'>Go</text>`,
  ),
  rust: make(
    `<circle cx='32' cy='32' r='20'/><path d='M32 4 V10 M32 54 V60 M4 32 H10 M54 32 H60'/>`,
  ),
  java: make(
    `<path d='M20 54 Q32 60 44 54 M24 46 Q32 50 40 46 M32 10 Q40 20 32 30 Q24 40 32 50'/>`,
  ),
  php: make(
    `<ellipse cx='32' cy='32' rx='26' ry='16'/><text x='32' y='38' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle' stroke='none'>PHP</text>`,
  ),
  ruby: make(
    `<path d='M10 24 L32 6 L54 24 L32 58 Z M20 24 L32 14 L44 24 L32 34 Z'/>`,
  ),
  swift: make(
    `<path d='M10 50 Q32 50 54 10 Q32 20 10 50 Z M20 50 Q32 40 44 10 Q32 30 20 50 Z'/>`,
  ),
  kotlin: make(
    `<path d='M10 10 H54 L10 54 V10 Z M10 32 L32 10 M10 54 L54 10'/>`,
  ),
  unity: make(
    `<path d='M32 6 L54 18 V46 L32 58 L10 46 V18 Z M32 32 L54 18 M32 32 L32 58 M32 32 L10 18'/>`,
  ),
  unreal: make(
    `<circle cx='32' cy='32' r='26'/><text x='32' y='42' font-family='serif' font-size='32' font-weight='bold' fill='white' text-anchor='middle' stroke='none'>U</text>`,
  ),
  figma: make(
    `<circle cx='24' cy='14' r='8'/><circle cx='40' cy='14' r='8'/><circle cx='24' cy='30' r='8'/><circle cx='40' cy='30' r='8'/><path d='M24 46 Q24 54 32 54 Q40 54 40 46 Z'/>`,
  ),
  adobe: make(
    `<path d='M32 10 L54 54 H40 L32 36 L24 54 H10 Z'/>`,
  ),
  sketch: make(
    `<path d='M10 24 L32 6 L54 24 L32 58 Z'/>`,
  ),
  dribbble: make(
    `<circle cx='32' cy='32' r='26'/><path d='M10 32 Q32 10 54 32 M10 20 Q32 54 54 20'/>`,
  ),
  behance: make(
    `<text x='32' y='42' font-family='sans-serif' font-size='28' font-weight='bold' fill='white' text-anchor='middle' stroke='none'>Bē</text>`,
  ),
  twitter: make(
    `<path d='M10 48 Q32 48 54 12 Q40 24 10 48 Z'/>`,
  ),
  linkedin: make(
    `<rect x='10' y='10' width='44' height='44' rx='4' fill='white' stroke='none'/><text x='32' y='42' font-family='sans-serif' font-size='24' font-weight='bold' fill='black' text-anchor='middle' stroke='none'>in</text>`,
  ),
  discord: make(
    `<path d='M14 18 Q32 10 50 18 L54 44 Q32 54 10 44 Z M22 32 R3 M42 32 R3'/>`,
  ),
  slack: make(
    `<circle cx='20' cy='20' r='6'/><circle cx='44' cy='20' r='6'/><circle cx='20' cy='44' r='6'/><circle cx='44' cy='44' r='6'/>`,
  ),
  youtube: make(
    `<rect x='6' y='14' width='52' height='36' rx='8'/><path d='M28 24 L40 32 L28 40 Z' fill='white' stroke='none'/>`,
  ),
  angular: make('<path d="M12 2L2 5l1.5 12L12 22l8.5-5L22 5z"/><path d="M12 5v13l5-3L18.5 7z" fill="white" opacity="0.3"/>'),
  vue: make('<path d="M2 3l10 17L22 3h-4l-6 10.5L6 3z"/><path d="M7 3l5 8.5L17 3h-3l-2 3.5L10 3z" fill="white" opacity="0.4"/>'),
  svelte: make('<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 6a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" fill="white" opacity="0.3"/>'),
  mongodb: make('<path d="M12 2L9 7c0 0-2 4-2 7s3 8 5 8 5-5 5-8-2-7-2-7z"/><path d="M12 5v14s1.5-1 1.5-3-1.5-5-1.5-5z" fill="white" opacity="0.4"/>'),
  graphql: make('<path d="M12 2L2 7l10 5 10-5zM2 17l10 5 10-5-10-5z"/><circle cx="12" cy="12" r="2" fill="white" opacity="0.5"/>'),
  aws: make('<path d="M12 2L2 7l10 5 10-5z"/><path d="M2 12l10 5 10-5" opacity="0.5"/><path d="M2 17l10 5 10-5" opacity="0.3"/>'),
  firebase: make('<path d="M12 2L4 16l8 6 8-6z"/><path d="M12 2l4 14-4 2z" fill="white" opacity="0.3"/>'),
  vercel: make('<path d="M12 1L1 21h22L12 1z"/>'),
  netlify: make('<path d="M12 2L2 12l10 10 10-10z"/><circle cx="12" cy="12" r="4" fill="white" opacity="0.3"/>'),
  digitalocean: make('<path d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"/><circle cx="12" cy="12" r="3" fill="white" opacity="0.4"/>'),
  heroku: make('<path d="M12 2L4 6v12l8 4 8-4V6z"/><path d="M12 6v12m-4-10v8m8-8v8" stroke="white" strokeWidth="2" opacity="0.4"/>'),
  linux: make('<path d="M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9-4-9-9-9zm0 15a6 6 0 110-12 6 6 0 010 12z"/><circle cx="12" cy="11" r="2" fill="white" opacity="0.5"/>'),
  apple: make('<path d="M12 2C9 2 7 4 7 7c0 4 3 8 5 13 2-5 5-9 5-13 0-3-2-5-5-5z"/><circle cx="12" cy="7" r="2" fill="white" opacity="0.4"/>'),
  android: make('<path d="M12 2L4 10v10h16V10z"/><circle cx="8" cy="14" r="1" fill="white"/><circle cx="16" cy="14" r="1" fill="white"/>'),
  windows: make('<path d="M2 3l9 1.5v7.5H2zM12 4.5L22 3v7.5H12zM2 13h9v7.5l-9 1.5zM12 13h10v7.5l-10-1.5z"/>'),
  chrome: make('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="white" opacity="0.5"/>'),
  firefox: make('<path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 16a6 6 0 110-12 6 6 0 010 12z"/>'),
  safari: make('<circle cx="12" cy="12" r="10"/><path d="M12 7l1 4h4l-3 2 1 4-3-2-3 2 1-4-3-2h4z" fill="white" opacity="0.5"/>'),
  bolt: make('<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>'),
  flame: make('<path d="M12 2c0 0-5 5-5 10s5 10 5 10 5-5 5-10-5-10-5-10z"/><path d="M12 7c0 0-2 2-2 5s2 5 2 5 2-2 2-5-2-5-2-5z" fill="white" opacity="0.4"/>'),
  terminal_v2: make('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 10l3 2-3 2M11 14h5"/>'),
  code_v2: make('<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>'),
  layers: make('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'),
  layout: make('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'),
  monitor: make('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  smartphone: make('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>'),
  database_v3: make('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>'),
  server_v2: make('<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>'),
  hard_drive_v2: make('<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M12 18h.01M2 14h20M6 18h.01"/>'),
  cpu: make('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>'),
  wifi_v2: make('<path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.94 0M12 20h.01"/>'),
  settings_v2: make('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>'),
  tool: make('<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z"/>'),
  feather: make('<path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"/>'),
  map_v2: make('<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16"/>'),
  mic: make('<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>'),
  video: make('<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>'),
  pizza: make('<path d="M20 7L4 3l5 18zM12 11l-3-1M15 14l-2-1M10 16l-1-1"/>'),
  zap: make('<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>'),
  shield_v3: make('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
  package: make('<path d="M21 7.5L12 3 3 7.5M21 7.5v9l-9 4.5M21 7.5l-9 4.5M3 7.5v9l9 4.5M3 7.5l9 4.5M12 12v9"/>'),
  truck: make('<rect x="1" y="3" width="15" height="13"/><path d="M16 8l4 0l3 4l0 4l-7 0"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
  shopping_cart_v2: make('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>'),
  credit_card_v2: make('<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>'),
};

export const colorfulDecorations: Record<string, string> = {
  // --- Classic Decorations (from GitHub Profile Header Generator) ---
  "my-octocat": "/images/decorations/my-octocat.png",
  "github-mark": "/images/decorations/github-mark.png",
  "code": "/images/decorations/code.png",
  "dev-badge": "/images/decorations/dev-badge.png",
  "dev-rainbow": "/images/decorations/dev-rainbow.png",
  "dev-white": "/images/decorations/dev-white.png",
  "binary-code": "/images/decorations/binary-code.png",
  "coding": "/images/decorations/coding.png",
  "coding-screen": "/images/decorations/coding-screen.png",
  "css": "/images/decorations/css.png",
  "dino": "/images/decorations/dino.png",
  "dino-border": "/images/decorations/dino-border.png",
  "html": "/images/decorations/html.png",
  "js": "/images/decorations/js.png",
  "programming": "/images/decorations/programming.png",
  "tabs": "/images/decorations/tabs.png",
  "terminal": "/images/decorations/terminal.png",
  "terminal-circle": "/images/decorations/terminal-circle.png",
  "headphones-cat-1": "/images/decorations/headphones-cat-1.png",
  "headphones-cat-2": "/images/decorations/headphones-cat-2.png",
  "octocat": "/images/decorations/octocat.png",
  "idea": "/images/decorations/idea.png",
  "rocket": "/images/decorations/rocket.png",
  "apple": "/images/decorations/apple.png",

  // --- Core Brands (Social & Tech) ---
  google: "https://img.icons8.com/color/96/google-logo.png",
  facebook: "https://img.icons8.com/?size=96&id=uLWV5A9vXIPu&format=png",
  instagram: "https://img.icons8.com/color/96/instagram-new.png",
  "twitter-x": "https://img.icons8.com/color/96/twitterx.png",
  linkedin: "https://img.icons8.com/color/96/linkedin.png",
  github: "https://img.icons8.com/color/96/github--v1.png",
  youtube: "https://img.icons8.com/color/96/youtube-play.png",
  discord: "https://img.icons8.com/?size=96&id=30998&format=png",
  slack: "https://img.icons8.com/color/96/slack-new.png",
  whatsapp: "https://img.icons8.com/color/96/whatsapp--v1.png",
  telegram: "https://img.icons8.com/color/96/telegram-app.png",
  reddit: "https://img.icons8.com/color/96/reddit.png",
  twitch: "https://img.icons8.com/color/96/twitch.png",
  tiktok: "https://img.icons8.com/color/96/tiktok.png",
  pinterest: "https://img.icons8.com/color/96/pinterest--v1.png",
  spotify: "https://img.icons8.com/color/96/spotify.png",
  medium: "https://img.icons8.com/color/96/medium-monogram.png",
  "dev-to": "https://img.icons8.com/color/96/dev-to.png",
  hashnode: "https://img.icons8.com/color/96/hashnode.png",
  stackoverflow: "https://img.icons8.com/color/96/stackoverflow.png",
  snapchat: "https://img.icons8.com/color/96/snapchat.png",
  messenger: "https://img.icons8.com/color/96/facebook-messenger--v1.png",
  wechat: "https://img.icons8.com/color/96/weixing.png",
  zoom: "https://img.icons8.com/color/96/zoom.png",
  skype: "https://img.icons8.com/color/96/skype.png",

  // --- Programming Languages ---
  javascript: "https://img.icons8.com/color/96/javascript--v1.png",
  typescript: "https://img.icons8.com/color/96/typescript.png",
  python: "https://img.icons8.com/color/96/python--v1.png",
  java: "https://img.icons8.com/color/96/java-coffee-cup-logo.png",
  "c-plus-plus": "https://img.icons8.com/color/96/c-plus-plus.png",
  "c-sharp": "https://img.icons8.com/color/96/c-sharp-logo.png",
  php: "https://img.icons8.com/color/96/php.png",
  ruby: "https://img.icons8.com/color/96/ruby-programming-language.png",
  rust: "https://img.icons8.com/color/96/rust.png",
  go: "https://img.icons8.com/color/96/golang.png",
  swift: "https://img.icons8.com/color/96/swift.png",
  kotlin: "https://img.icons8.com/color/96/kotlin.png",
  dart: "https://img.icons8.com/color/96/dart.png",
  elixir: "https://img.icons8.com/color/96/elixir.png",
  scala: "https://img.icons8.com/color/96/scala.png",
  "html-5": "https://img.icons8.com/color/96/html-5--v1.png",
  "css-3": "https://img.icons8.com/color/96/css3.png",
  sass: "https://img.icons8.com/color/96/sass.png",

  // --- Frameworks & Libraries ---
  react: "https://img.icons8.com/color/96/react-native.png",
  "vue-js": "https://img.icons8.com/color/96/vue-js.png",
  angular: "https://img.icons8.com/color/96/angularjs.png",
  nextjs: "https://img.icons8.com/color/96/nextjs.png",
  svelte: "https://img.icons8.com/color/96/svelte.png",
  "node-js": "https://img.icons8.com/color/96/nodejs.png",
  express: "https://img.icons8.com/color/96/express.png",
  nestjs: "https://img.icons8.com/color/96/nestjs.png",
  laravel: "https://img.icons8.com/color/96/laravel.png",
  django: "https://img.icons8.com/color/96/django.png",
  "spring-boot": "https://img.icons8.com/color/96/spring-logo.png",
  flutter: "https://img.icons8.com/color/96/flutter.png",
  tailwind: "https://img.icons8.com/color/96/tailwindcss.png",
  bootstrap: "https://img.icons8.com/color/96/bootstrap.png",
  redux: "https://img.icons8.com/color/96/redux.png",
  graphql: "https://img.icons8.com/color/96/graphql.png",

  // --- Tools & Infrastructure ---
  vscode: "https://img.icons8.com/color/96/visual-studio-code-2019.png",
  docker: "https://img.icons8.com/color/96/docker.png",
  kubernetes: "https://img.icons8.com/color/96/kubernetes.png",
  aws: "https://img.icons8.com/color/96/amazon-web-services.png",
  "google-cloud": "https://img.icons8.com/color/96/google-cloud-platform.png",
  azure: "https://img.icons8.com/color/96/azure-1.png",
  firebase: "https://img.icons8.com/color/96/firebase.png",
  supabase: "https://img.icons8.com/color/96/supabase.png",
  vercel: "https://img.icons8.com/color/96/vercel.png",
  netlify: "https://img.icons8.com/color/96/netlify.png",
  git: "https://img.icons8.com/color/96/git.png",
  postman: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-postman-is-the-only-complete-api-development-platform-logo-color-tal-revivo.png",
  insomnia: "https://img.icons8.com/color/96/insomnia.png",
  figma: "https://img.icons8.com/color/96/figma--v1.png",
  "adobe-photoshop": "https://img.icons8.com/color/96/adobe-photoshop.png",
  "adobe-illustrator": "https://img.icons8.com/color/96/adobe-illustrator.png",
  "adobe-xd": "https://img.icons8.com/color/96/adobe-xd.png",
  trello: "https://img.icons8.com/color/96/trello.png",
  jira: "https://img.icons8.com/color/96/jira.png",
  notion: "https://img.icons8.com/color/96/notion.png",

  // --- Databases ---
  mongodb: "https://img.icons8.com/color/96/mongodb.png",
  postgresql: "https://img.icons8.com/color/96/postgreesql.png",
  mysql: "https://img.icons8.com/color/96/mysql-logo.png",
  redis: "https://img.icons8.com/color/96/redis.png",
  sqlite: "https://img.icons8.com/color/96/sqlite.png",
  elasticsearch: "https://img.icons8.com/color/96/elasticsearch.png",

  // --- Operating Systems ---
  windows: "https://img.icons8.com/color/96/windows-10.png",
  linux: "https://img.icons8.com/color/96/linux--v1.png",
  ubuntu: "https://img.icons8.com/color/96/ubuntu.png",
  android: "https://img.icons8.com/color/96/android-os.png",

  // --- Web3 & Crypto ---
  bitcoin: "https://img.icons8.com/color/96/bitcoin.png",
  ethereum: "https://img.icons8.com/color/96/ethereum.png",
  solana: "https://img.icons8.com/color/96/solana.png",
  metamask: "https://img.icons8.com/color/96/metamask-logo.png",
  opensea: "https://img.icons8.com/color/96/opensea.png",

  // --- AI & Future ---
  chatgpt: "https://img.icons8.com/color/96/chatgpt.png",
  openai: "https://img.icons8.com/color/96/openai.png",
  midjourney: "https://img.icons8.com/color/96/midjourney.png",
  "stable-diffusion": "https://img.icons8.com/color/96/stable-diffusion.png",
  tensorflow: "https://img.icons8.com/color/96/tensorflow.png",
  pytorch: "https://img.icons8.com/color/96/pytorch.png",
  "hugging-face": "https://img.icons8.com/color/96/hugging-face.png",

  // --- Design & Multimedia ---
  canva: "https://img.icons8.com/color/96/canva.png",
  framer: "https://img.icons8.com/?size=160&id=ZZNsPaonr90b&format=png",
  webflow: "https://img.icons8.com/color/96/webflow.png",
  sketch: "https://img.icons8.com/color/96/sketch.png",
  "adobe-premiere": "https://img.icons8.com/color/96/adobe-premiere-pro.png",
  "adobe-after-effects": "https://img.icons8.com/color/96/adobe-after-effects.png",

  // --- E-commerce & Business ---
  shopify: "https://img.icons8.com/color/96/shopify.png",
  woocommerce: "https://img.icons8.com/color/96/woocommerce.png",
  amazon: "https://img.icons8.com/color/96/amazon.png",
  ebay: "https://img.icons8.com/color/96/ebay.png",
  visa: "https://img.icons8.com/color/96/visa.png",
  mastercard: "https://img.icons8.com/color/96/mastercard.png",
  amex: "https://img.icons8.com/color/96/amex.png",
  "apple-pay": "https://img.icons8.com/color/96/apple-pay.png",
  "google-pay": "https://img.icons8.com/color/96/google-pay.png",

  // --- Nature & Weather ---
  sun: "https://img.icons8.com/color/96/sun--v1.png",
  moon: "https://img.icons8.com/color/96/moon.png",
  cloud: "https://img.icons8.com/color/96/cloud.png",
  rainbow: "https://img.icons8.com/color/96/rainbow.png",
  fire: "https://img.icons8.com/color/96/fire--v1.png",
  lightning: "https://img.icons8.com/color/96/flash-light.png",
  leaf: "https://img.icons8.com/color/96/leaf.png",
  tree: "https://img.icons8.com/color/96/tree-structure.png",
  flower: "https://img.icons8.com/color/96/flower.png",
  ocean: "https://img.icons8.com/color/96/wave.png",
  mountain: "https://img.icons8.com/color/96/mountain.png",
  earth: "https://img.icons8.com/color/96/globe--v1.png",

  // --- Fun & Misc ---
  ufo: "https://img.icons8.com/color/96/ufo.png",
  alien: "https://img.icons8.com/color/96/alien.png",
  ghost: "https://img.icons8.com/color/96/ghost.png",
  skull: "https://img.icons8.com/color/96/skull.png",
  crown: "https://img.icons8.com/color/96/crown.png",
  gem: "https://img.icons8.com/color/96/gemstone.png",
  gift: "https://img.icons8.com/color/96/gift.png",
  balloon: "https://img.icons8.com/color/96/balloon.png",
  party: "https://img.icons8.com/color/96/confetti.png",
  "game-controller": "https://img.icons8.com/color/96/game-controller.png",
  pacman: "https://img.icons8.com/color/96/pacman.png",
  "space-invaders": "https://img.icons8.com/color/96/space-invaders.png",
  robot: "https://img.icons8.com/color/96/robot-upper-body.png",
  brain: "https://img.icons8.com/color/96/brain.png",
  heart: "https://img.icons8.com/color/96/like--v1.png",
  star: "https://img.icons8.com/color/96/star--v1.png",
  diamond: "https://img.icons8.com/color/96/diamond.png",
  shield: "https://img.icons8.com/color/96/checked-shield.png",
  key: "https://img.icons8.com/color/96/key.png",
  lock: "https://img.icons8.com/color/96/lock.png",
  trophy: "https://img.icons8.com/color/96/trophy.png",
  medal: "https://img.icons8.com/color/96/medal.png",
  target: "https://img.icons8.com/color/96/target.png",
  music: "https://img.icons8.com/color/96/music.png",
  camera: "https://img.icons8.com/color/96/camera.png",
  video: "https://img.icons8.com/color/96/video-call.png",
  micro: "https://img.icons8.com/color/96/microphone.png",
  book: "https://img.icons8.com/color/96/book.png",
  pencil: "https://img.icons8.com/color/96/pencil.png",
  paint: "https://img.icons8.com/color/96/paint-palette.png",

  search: "https://img.icons8.com/color/96/search.png",
  settings: "https://img.icons8.com/color/96/settings.png",
  user: "https://img.icons8.com/color/96/user.png",
  users: "https://img.icons8.com/color/96/conference-call.png",
  mail: "https://img.icons8.com/color/96/filled-message.png",
  phone: "https://img.icons8.com/color/96/phone.png",
  bell: "https://img.icons8.com/color/96/appointment-reminders--v1.png",
  briefcase: "https://img.icons8.com/color/96/briefcase.png",
  "shopping-cart": "https://img.icons8.com/color/96/shopping-cart.png",
  "credit-card": "https://img.icons8.com/color/96/credit-card.png",
  wallet: "https://img.icons8.com/color/96/wallet.png",
  calendar: "https://img.icons8.com/color/96/calendar--v1.png",
  map: "https://img.icons8.com/color/96/map.png",
  clock: "https://img.icons8.com/color/96/clock.png",
  battery: "https://img.icons8.com/color/96/full-battery.png",
  wifi: "https://img.icons8.com/color/96/wi-fi.png",
  bluetooth: "https://img.icons8.com/color/96/bluetooth.png",
  usb: "https://img.icons8.com/color/96/usb.png",
  mouse: "https://img.icons8.com/color/96/mouse.png",
  keyboard: "https://img.icons8.com/color/96/keyboard.png",
  headset: "https://img.icons8.com/color/96/headset.png",
  monitor: "https://img.icons8.com/color/96/monitor--v1.png",
  laptop: "https://img.icons8.com/color/96/laptop.png",
  printer: "https://img.icons8.com/color/96/printer.png",
  scanner: "https://img.icons8.com/color/96/scanner.png",
  webcam: "https://img.icons8.com/color/96/webcam.png",
  "hard-drive": "https://img.icons8.com/color/96/hdd.png",
  server: "https://img.icons8.com/color/96/server.png",
  router: "https://img.icons8.com/color/96/router.png",
  chip: "https://img.icons8.com/color/96/cpu.png",
  ram: "https://img.icons8.com/color/96/ram.png",
  gpu: "https://img.icons8.com/color/96/video-card.png",
  power: "https://img.icons8.com/color/96/power-off.png",
  plug: "https://img.icons8.com/color/96/electrical.png",
  "flash-drive": "https://img.icons8.com/color/96/usb-flash-drive.png",
  "sd-card": "https://img.icons8.com/color/96/sd-card.png",
  disk: "https://img.icons8.com/color/96/compact-disk.png",

  // --- Animals ---
  cat: "https://img.icons8.com/color/96/cat.png",
  dog: "https://img.icons8.com/color/96/dog.png",
  panda: "https://img.icons8.com/color/96/panda.png",
  koala: "https://img.icons8.com/color/96/koala.png",
  sloth: "https://img.icons8.com/color/96/sloth.png",
  unicorn: "https://img.icons8.com/color/96/unicorn.png",
  penguin: "https://img.icons8.com/color/96/penguin.png",
  fox: "https://img.icons8.com/color/96/fox.png",
  wolf: "https://img.icons8.com/color/96/wolf.png",
  lion: "https://img.icons8.com/color/96/lion.png",
  tiger: "https://img.icons8.com/color/96/tiger.png",
  dragon_alt: "https://img.icons8.com/color/96/dragon.png",

  // --- Food (More) ---
  pizza_alt: "https://img.icons8.com/color/96/pizza.png",
  cookie: "https://img.icons8.com/color/96/cookie.png",
  donut: "https://img.icons8.com/color/96/donut.png",
  popcorn: "https://img.icons8.com/color/96/popcorn.png",
  soda: "https://img.icons8.com/color/96/soda-water.png",
  cherry: "https://img.icons8.com/color/96/cherry.png",
  strawberry: "https://img.icons8.com/color/96/strawberry.png",
  banana: "https://img.icons8.com/color/96/banana.png",
  pineapple: "https://img.icons8.com/color/96/pineapple.png",
  watermelon: "https://img.icons8.com/color/96/watermelon.png",
  cactus: "https://img.icons8.com/color/96/cactus.png",
  sunflower: "https://img.icons8.com/color/96/sunflower.png",
  tulip: "https://img.icons8.com/color/96/tulip.png",
  rose: "https://img.icons8.com/color/96/rose.png",
  mushroom: "https://img.icons8.com/color/96/mushroom.png",

  // --- Movie Characters & Comics ---
  batman: "https://img.icons8.com/color/96/batman.png",
  spiderman: "https://img.icons8.com/color/96/spiderman.png",
  ironman: "https://img.icons8.com/color/96/iron-man.png",
  hulk: "https://img.icons8.com/color/96/hulk.png",
  "captain-america": "https://img.icons8.com/color/96/captain-america.png",
  thor: "https://img.icons8.com/color/96/thor.png",
  "wonder-woman": "https://img.icons8.com/color/96/wonder-woman.png",
  joker: "https://img.icons8.com/color/96/joker.png",
  "harley-quinn": "https://img.icons8.com/color/96/harley-quinn.png",
  deadpool: "https://img.icons8.com/color/96/deadpool.png",
  wolverine: "https://img.icons8.com/color/96/wolverine.png",
  "black-panther": "https://img.icons8.com/color/96/black-panther.png",
  "doctor-strange": "https://img.icons8.com/color/96/doctor-strange.png",
  "scary-clown": "https://img.icons8.com/color/96/scary-clown.png",
  pirate: "https://img.icons8.com/color/96/pirate.png",
  cowboy: "https://img.icons8.com/color/96/cowboy.png",
  knight: "https://img.icons8.com/color/96/knight.png",
  samurai: "https://img.icons8.com/color/96/samurai.png",
  detective: "https://img.icons8.com/color/96/detective.png",
  spy: "https://img.icons8.com/color/96/spy.png",
  thief: "https://img.icons8.com/color/96/thief.png",
  king: "https://img.icons8.com/color/96/king.png",
  queen: "https://img.icons8.com/color/96/queen.png",
  prince: "https://img.icons8.com/color/96/prince.png",
  princess: "https://img.icons8.com/color/96/princess.png",
  angel: "https://img.icons8.com/color/96/angel.png",
  devil: "https://img.icons8.com/color/96/devil.png",
  santa: "https://img.icons8.com/color/96/santa.png",
  elf: "https://img.icons8.com/color/96/elf.png",
  mummy: "https://img.icons8.com/color/96/mummy.png",
};

export const allDecorations = { ...decorations, ...colorfulDecorations };
