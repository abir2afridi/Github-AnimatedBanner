import type { AnimationType } from "./types.js";

const KEYFRAMES: Record<string, string> = {
  fadeIn: `@keyframes bf-fadeIn{from{opacity:0}to{opacity:1}}`,
  scaleIn: `@keyframes bf-scaleIn{from{transform:scale(0.7);opacity:0}to{transform:scale(1);opacity:1}}`,
  slideInLeft: `@keyframes bf-slideInLeft{from{transform:translateX(-80px);opacity:0}to{transform:translateX(0);opacity:1}}`,
  slideInRight: `@keyframes bf-slideInRight{from{transform:translateX(80px);opacity:0}to{transform:translateX(0);opacity:1}}`,
  slideInTop: `@keyframes bf-slideInTop{from{transform:translateY(-40px);opacity:0}to{transform:translateY(0);opacity:1}}`,
  slideInBottom: `@keyframes bf-slideInBottom{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}`,
  blink: `@keyframes bf-blink{0%,100%{opacity:1}50%{opacity:0.2}}`,
  twinkling: `@keyframes bf-twinkling{0%{opacity:0.2}25%{opacity:1}50%{opacity:0.4}75%{opacity:0.9}100%{opacity:0.2}}`,
  typewriter: `@keyframes bf-typewriter{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}`,
  glitch: `@keyframes bf-glitch{0%{transform:translate(0)}20%{transform:translate(-3px,1px)}40%{transform:translate(3px,-1px)}60%{transform:translate(-2px,2px)}80%{transform:translate(2px,-2px)}100%{transform:translate(0)}}`,
  float: `@keyframes bf-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`,
  pulse: `@keyframes bf-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(0.97)}}`,
  bounce: `@keyframes bf-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}`,
  waveText: `@keyframes bf-waveText{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`,
  ripple: `@keyframes bf-ripple{0%{transform:scale(0.9);opacity:1}100%{transform:scale(1.1);opacity:0}}`,
  sparkle: `@keyframes bf-sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}`,
  rotate: `@keyframes bf-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`,
  shake: `@keyframes bf-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`,
  neonFlicker: `@keyframes bf-neonFlicker{0%,19%,21%,23%,25%,54%,56%,100%{opacity:1}20%,24%,55%{opacity:0.4}}`,
  colorShift: `@keyframes bf-colorShift{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}`,
  reveal: `@keyframes bf-reveal{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}`,
};

const DURATION: Record<string, number> = {
  fadeIn: 1.2, scaleIn: 0.8, slideInLeft: 0.7, slideInRight: 0.7,
  slideInTop: 0.6, slideInBottom: 0.6, blink: 1.5, twinkling: 3,
  typewriter: 2, glitch: 0.5, float: 3, pulse: 2, bounce: 1,
  waveText: 1.5, ripple: 2, sparkle: 1.5, rotate: 8, shake: 0.5,
  neonFlicker: 2.5, colorShift: 6, reveal: 1.5,
};

const INFINITE = new Set([
  "blink", "twinkling", "float", "pulse", "bounce",
  "rotate", "neonFlicker", "colorShift", "waveText",
  "ripple", "sparkle", "glitch", "shake",
]);

export interface AnimSpec {
  animation: AnimationType;
  speed: number;
  delay: number; // ms
  targetSelector: string; // e.g. ".tl-abc"
  transformOrigin?: string;
}

export function buildAnimationCSS(spec: AnimSpec): string {
  if (spec.animation === "none") return "";
  const kf = KEYFRAMES[spec.animation];
  if (!kf) return "";
  const dur = (DURATION[spec.animation] ?? 1) / Math.max(0.05, spec.speed);
  const iterations = INFINITE.has(spec.animation) ? "infinite" : "1";
  const fill = iterations === "1" ? "both" : "none";
  const origin = spec.transformOrigin ? `transform-origin:${spec.transformOrigin};transform-box:fill-box;` : "transform-box:fill-box;transform-origin:center;";
  return `${kf}
${spec.targetSelector}{${origin}animation:bf-${spec.animation} ${dur.toFixed(2)}s ease ${spec.delay}ms ${iterations} ${fill};}`;
}

export const ANIMATIONS: { id: AnimationType; label: string }[] = [
  { id: "none", label: "None" },
  { id: "fadeIn", label: "Fade In" },
  { id: "scaleIn", label: "Scale In" },
  { id: "slideInLeft", label: "Slide Left" },
  { id: "slideInRight", label: "Slide Right" },
  { id: "slideInTop", label: "Slide Top" },
  { id: "slideInBottom", label: "Slide Bottom" },
  { id: "blink", label: "Blink" },
  { id: "twinkling", label: "Twinkling" },
  { id: "typewriter", label: "Typewriter" },
  { id: "glitch", label: "Glitch" },
  { id: "float", label: "Float" },
  { id: "pulse", label: "Pulse" },
  { id: "bounce", label: "Bounce" },
  { id: "waveText", label: "Wave" },
  { id: "ripple", label: "Ripple" },
  { id: "sparkle", label: "Sparkle" },
  { id: "rotate", label: "Rotate" },
  { id: "shake", label: "Shake" },
  { id: "neonFlicker", label: "Neon Flicker" },
  { id: "colorShift", label: "Color Shift" },
  { id: "reveal", label: "Reveal" },
];
