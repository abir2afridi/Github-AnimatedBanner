export interface SizePreset {
  id: string;
  label: string;
  width: number;
  height: number;
  hint?: string;
}

export const SIZE_PRESETS: SizePreset[] = [
  { id: "readme", label: "GitHub README", width: 1200, height: 280, hint: "1200×280" },
  { id: "readme-tall", label: "README (tall)", width: 1280, height: 400, hint: "1280×400" },
  { id: "social", label: "Social preview", width: 1280, height: 640, hint: "1280×640" },
  { id: "twitter", label: "Twitter banner", width: 1500, height: 500, hint: "1500×500" },
  { id: "linkedin", label: "LinkedIn banner", width: 1584, height: 396, hint: "1584×396" },
  { id: "discord", label: "Discord banner", width: 960, height: 540, hint: "960×540" },
  { id: "youtube", label: "YouTube banner", width: 2048, height: 384, hint: "2048×384" },
  { id: "wide", label: "Wide", width: 1600, height: 200, hint: "1600×200" },
  { id: "square", label: "Square", width: 800, height: 800, hint: "800×800" },
];
