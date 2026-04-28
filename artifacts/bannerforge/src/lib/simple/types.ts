export interface BannerConfig {
  width: number;
  height: number;
  padding: number;
  title: string;
  titleFont: string;
  titleSize: number;
  titleColor: string;
  subtitle: string;
  subtitleFont: string;
  subtitleSize: number;
  subtitleColor: string;
  textAlign: "left" | "center" | "right";
  bgColor: string;
  pattern: string | null;
  patternColor: string;
  patternSize: number;
  patternOpacity: number;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  decoration: string | null;
  decorationSize: number;
  decorationOpacity: number;
  miniature: boolean;
}

export const DEFAULT_CONFIG: BannerConfig = {
  width: 840,
  height: 280,
  padding: 25,
  title: "Hey! I am ...",
  titleFont: "Red Hat Display",
  titleSize: 40,
  titleColor: "#ffffff",
  subtitle: "Fullstack developer",
  subtitleFont: "Red Hat Display",
  subtitleSize: 20,
  subtitleColor: "#ffffff",
  textAlign: "center",
  bgColor: "#161b22",
  pattern: "github-pattern",
  patternColor: "#ffffff",
  patternSize: 100,
  patternOpacity: 0.05,
  borderColor: "#30363d",
  borderWidth: 1,
  borderRadius: 7,
  decoration: null,
  decorationSize: 100,
  decorationOpacity: 1,
  miniature: false,
};
