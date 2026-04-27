export const AVAILABLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Nunito",
  "Poppins",
  "Playfair Display",
  "Merriweather",
  "Lato",
  "Source Code Pro",
  "JetBrains Mono",
  "Space Mono",
  "Fira Code",
  "IBM Plex Mono",
  "Orbitron",
  "Exo 2",
  "Rajdhani",
  "Teko",
  "Anton",
  "Bebas Neue",
  "Righteous",
  "Pacifico",
  "Dancing Script",
  "Cinzel",
  "Lobster",
  "Press Start 2P",
  "VT323",
  "Creepster",
];

export function getFontImportCSS(families: string[]): string {
  const unique = [...new Set(families)].filter((f) => AVAILABLE_FONTS.includes(f));
  if (!unique.length) return "";
  const query = unique
    .map((f) => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700;800;900`)
    .join("&amp;");
  return `@import url('https://fonts.googleapis.com/css2?${query}&amp;display=swap');`;
}
