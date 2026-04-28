export const FONTS = [
  "Red Hat Display",
  "Ubuntu",
  "Maven Pro",
  "Poppins",
  "Anonymous Pro",
  "Source Code Pro",
  "Quattrocento",
  "Della Respira",
  "Lancelot",
  "Life Savers",
  "Athiti",
  "Electrolize",
  "Passero One",
  "Pixelify Sans",
  "Kalam",
  "Playball",
  "Orbitron",
  "JetBrains Mono",
  "Fira Code",
  "Bebas Neue",
  "Raleway",
  "Exo 2",
  "Cinzel",
  "Josefin Sans",
];

const loadedFonts = new Set<string>();

export function loadGoogleFont(font: string) {
  if (loadedFonts.has(font)) return;
  const id = `gfont-${font.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) {
    loadedFonts.add(font);
    return;
  }
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, "+")}:wght@400;700&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(font);
}

export function loadAllFonts() {
  FONTS.forEach(loadGoogleFont);
}
