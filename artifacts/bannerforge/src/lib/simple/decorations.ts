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
};
