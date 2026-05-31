import { Link } from "wouter";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Github, Star, GitFork, Users, BookOpen,
  ExternalLink, Activity, Terminal, ArrowLeft,
  MapPin, Code2, Cpu, Radio, Layers,
  GitBranch, GitCommit, GitPullRequest, GitMerge, AlertCircle
} from "lucide-react";
import { Header } from "../components/builder/Header";

/* ───────── simulated data ───────── */

const USER = {
  login: "abir2afridi",
  name: "Abir Hasan Siam",
  bio: "Full-Stack Developer · Building performant web experiences with React, Go & Rust. Open-source contributor & system design advocate.",
  avatar_url: "https://github.com/abir2afridi.png",
  location: "Dhaka, Bangladesh",
  url: "https://github.com/abir2afridi",
  public_repos: 28,
  followers: 64,
  following: 42,
};

const LANGUAGES = [
  { name: "TypeScript", value: 35, color: "#3178C6" },
  { name: "JavaScript", value: 25, color: "#F7DF1E" },
  { name: "Python", value: 18, color: "#3776AB" },
  { name: "Go", value: 12, color: "#00ADD8" },
  { name: "Rust", value: 7, color: "#DEA584" },
  { name: "HTML/CSS", value: 3, color: "#E34F26" },
];

const STATS = [
  { label: "Star Impact", value: "847", icon: Star, color: "#FFD700", suffix: "total" },
  { label: "Fork Density", value: "193", icon: GitFork, color: "#0066FF", suffix: "forks" },
  { label: "Repos Node", value: "28", icon: BookOpen, color: "#00E676", suffix: "active" },
  { label: "Followers", value: "64", icon: Users, color: "#FF4081", suffix: "connected" },
];

const REPOS = [
  { name: "Github-AnimatedBanner", desc: "🦋 Dynamic Coloful Image Render — animated SVG banner generator with URL API and builder UI", stars: 0, forks: 0, lang: "TypeScript", updated: "2026-05-31" },
  { name: "TextProcessing-Toolkit", desc: "104 high-performance text utilities that run entirely in your browser. Nothing is uploaded.", stars: 1, forks: 0, lang: "TypeScript", updated: "2026-05-31" },
  { name: "CodeMastery", desc: "Learn HTML, CSS, JavaScript — structured learning path for web development fundamentals", stars: 0, forks: 0, lang: "TypeScript", updated: "2026-05-20" },
  { name: "abir2afridi", desc: "GitHub profile README — personal profile repository", stars: 0, forks: 0, lang: "Markdown", updated: "2026-05-21" },
  { name: "GithubRepositoryGraph", desc: "Visualize your GitHub repository network and contribution patterns", stars: 0, forks: 0, lang: "TypeScript", updated: "2026-04-11" },
  { name: "WebDev-Index", desc: "Web development index and resource collection", stars: 0, forks: 0, lang: "TypeScript", updated: "2026-03-14" },
];

const EVENTS = [
  { icon: GitCommit, repo: "Github-AnimatedBanner", time: "2h ago", detail: "pushed 3 commits to main", color: "#0066FF" },
  { icon: GitPullRequest, repo: "TextProcessing-Toolkit", time: "5h ago", detail: "opened PR #12: Add markdown export", color: "#00E676" },
  { icon: AlertCircle, repo: "CodeMastery", time: "8h ago", detail: "opened issue #4: Add Python section", color: "#FF4081" },
  { icon: GitBranch, repo: "GithubRepositoryGraph", time: "1d ago", detail: "created branch feat/d3-viz", color: "#FFD700" },
  { icon: GitCommit, repo: "WebDev-Index", time: "1d ago", detail: "pushed 2 commits to main", color: "#0066FF" },
  { icon: GitFork, repo: "Github-AnimatedBanner", time: "2d ago", detail: "forked to dev-contributor", color: "#00E676" },
  { icon: Star, repo: "TextProcessing-Toolkit", time: "3d ago", detail: "starred by user-42", color: "#FFD700" },
  { icon: GitCommit, repo: "abir2afridi", time: "3d ago", detail: "updated profile README", color: "#0066FF" },
  { icon: GitMerge, repo: "CodeMastery", time: "4d ago", detail: "merged PR #3: Add CSS grid section", color: "#00E676" },
  { icon: AlertCircle, repo: "GithubRepositoryGraph", time: "5d ago", detail: "closed issue #2: Fix mobile layout", color: "#FF4081" },
  { icon: GitCommit, repo: "WebDev-Index", time: "6d ago", detail: "pushed 4 commits to main", color: "#0066FF" },
  { icon: Star, repo: "Github-AnimatedBanner", time: "1w ago", detail: "starred by opencode-ai", color: "#FFD700" },
];

/* ───────── contribution cells ───────── */

const CELLS = Array.from({ length: 49 }, () => ({
  v: Math.random(),
}));

/* ───────── inline styles injected once ───────── */

const keyframes = `
@keyframes dev-scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(400%); }
}
@keyframes dev-ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
@keyframes dev-noise {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
  100% { transform: translate(5%, 0); }
}
`;

/* ───────── Helper ───────── */

function StatCard({ label, value, icon: Icon, color, suffix, index }: {
  label: string; value: string; icon: typeof Star; color: string; suffix: string; index: number;
}) {
  return (
    <div
      className="group relative bg-card border border-border/10 p-5 transition-all duration-300 hover:scale-[1.04]"
      style={{ boxShadow: `6px 6px 0px 0px ${color}33` }}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-[0.2em] text-foreground/30">
          MOD_{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="font-['Syne',sans-serif] text-3xl font-black text-foreground mb-0.5">{value}</div>
      <div className="font-['Inter',sans-serif] text-xs font-medium text-foreground/50 uppercase tracking-wider">{label}</div>
      <div className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20 mt-1">{suffix}</div>
    </div>
  );
}

/* ───────── Main Page ───────── */

export default function Developer() {

  return (
    <div className="developer-page relative min-h-screen bg-background text-foreground">

      <style>{keyframes}</style>

      {/* ───── noise overlay ───── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          animation: "dev-noise 0.5s steps(4) infinite",
        }}
      />

      {/* ───── HEADER ───── */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header minimal />
      </div>

      {/* ───── TICKER BAR ───── */}
      <div className="fixed top-14 left-0 right-0 z-20 h-10 bg-background border-b border-border/10 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap" style={{ animation: "dev-ticker 40s linear infinite" }}>
          {Array.from({ length: 6 }).flatMap((_, i) => [
            { label: "CORE HEAT", value: "98%", color: "#00E676" },
            { label: "NEURAL LOAD", value: "64%", color: "#0066FF" },
            { label: "PING", value: "12ms", color: "#FFD700" },
            { label: "MEMORY", value: "7.2GB", color: "#FF4081" },
            { label: "UPTIME", value: "14d 6h", color: "#0066FF" },
            { label: "THROUGHPUT", value: "1.4Gbps", color: "#00E676" },
          ].map((m, j) => (
            <span key={`${i}-${j}`} className="inline-flex items-center gap-2 mx-8 font-['JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-none" style={{ backgroundColor: m.color, boxShadow: `0 0 6px ${m.color}` }} />
              <span className="text-foreground/40">{m.label}</span>
              <span className="font-semibold text-foreground/90">{m.value}</span>
            </span>
          )))}
        </div>
      </div>

      {/* ───── MAIN CONTENT ───── */}
      <div className="pt-24 px-6 md:px-12 lg:px-20 pb-0">
        <div className="max-w-360 mx-auto">

          {/* 12-col grid layout */}
          <div className="xl:grid xl:grid-cols-12 xl:gap-8">

            {/* ── SIDEBAR (col-span-3) ── */}
            <aside className="xl:col-span-3 pt-8 xl:pt-16 xl:sticky xl:top-24 xl:self-start">
              {/* Avatar with scanline */}
              <div className="relative w-40 h-40 mx-auto xl:mx-0 mb-6 overflow-hidden border border-border/20"
                style={{ boxShadow: "8px 8px 0px 0px rgba(0,102,255,0.25)" }}
              >
                <img
                  src={USER.avatar_url}
                  alt={USER.login}
                  className="w-full h-full object-cover"
                />
                <div className="scanline absolute left-0 right-0 h-0.5 bg-[#0066FF] opacity-70 pointer-events-none z-10"
                  style={{ animation: "dev-scanline 3s linear infinite", boxShadow: "0 0 12px #0066FF, 0 0 24px #0066FF" }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Identity */}
              <div className="text-center xl:text-left mb-8">
                <h1 className="font-['Syne',sans-serif] text-3xl xl:text-4xl font-black uppercase tracking-tight text-foreground leading-none mb-1 wrap-break-word">
                  {USER.name}
                </h1>
                <div className="font-['JetBrains_Mono',monospace] text-xs text-[#0066FF] tracking-[0.3em] uppercase">
                  @{USER.login}
                </div>
              </div>

              {/* Location + Links */}
              <div className="space-y-2 mb-8 text-center xl:text-left">
                <div className="flex items-center gap-2 justify-center xl:justify-start text-xs font-['JetBrains_Mono',monospace] text-foreground/40">
                  <MapPin className="w-3 h-3" /> {USER.location}
                </div>
                <a href={USER.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#0066FF] hover:text-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> github.com/{USER.login} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Quick mini-stats */}
              <div className="flex gap-3 justify-center xl:justify-start flex-wrap mb-8">
                {[
                  { icon: BookOpen, label: "Repos", value: USER.public_repos, color: "#00E676" },
                  { icon: Users, label: "Followers", value: USER.followers, color: "#FF4081" },
                  { icon: GitFork, label: "Following", value: USER.following, color: "#FFD700" },
                ].map((s) => (
                  <div key={s.label}
                    className="flex items-center gap-2 px-3 py-2 border border-border/10 bg-muted/20"
                  >
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    <span className="font-['JetBrains_Mono',monospace] text-xs">
                      <span className="text-foreground font-semibold">{s.value}</span>
                      <span className="text-foreground/30 ml-1">{s.label}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <p className="font-['Inter',sans-serif] text-sm text-foreground/50 leading-relaxed text-center xl:text-left">
                {USER.bio}
              </p>
            </aside>

            {/* ── MAIN CONTENT (col-span-9) ── */}
            <main className="xl:col-span-9 pt-8 xl:pt-16 pb-20 space-y-16">

              {/* ── HERO ── */}
              <section>
                <div className="relative overflow-hidden border border-border/10 p-8 md:p-12 bg-card">
                  {/* massive outlined name */}
                  <div className="select-none pointer-events-none mb-6">
                    <h2 className="font-['Syne',sans-serif] text-[clamp(1.8rem,5.5vw,3.5rem)] font-black uppercase leading-[0.85] text-foreground/10 [-webkit-text-stroke:1px_hsla(var(--foreground)/0.2)] truncate">
                      {USER.login}
                    </h2>
                    <div className="font-['JetBrains_Mono',monospace] text-xs text-foreground/10 tracking-[0.5em] uppercase mt-1">
                      SYSTEM_ARCHITECT_DEVELOPER
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <a href={USER.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 font-['JetBrains_Mono',monospace] text-sm font-bold text-foreground bg-[#0066FF] hover:bg-[#0052CC] transition-all active:translate-x-0.5 active:translate-y-0.5"
                      style={{ boxShadow: "4px 4px 0px 0px rgba(0,102,255,0.5)" }}
                    >
                      <Github className="w-4 h-4" /> VIEW_PROFILE <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a href={`${USER.url}?tab=repositories`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 font-['JetBrains_Mono',monospace] text-sm text-foreground/70 border border-border/20 hover:bg-muted/30 transition-all active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <Code2 className="w-4 h-4" /> EXPLORE_REPOS
                    </a>
                  </div>
                </div>
              </section>

              {/* ── PERFORMANCE HUB ── */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Cpu className="w-5 h-5 text-[#0066FF]" />
                  <h2 className="font-['Syne',sans-serif] text-xl font-black uppercase tracking-[0.15em]">Performance Hub</h2>
                  <div className="h-px flex-1 bg-linear-to-r from-foreground/10 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
                </div>
              </section>

              {/* ── VISUAL INTELLIGENCE ── */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-5 h-5 text-[#0066FF]" />
                  <h2 className="font-['Syne',sans-serif] text-xl font-black uppercase tracking-[0.15em]">Visual Intelligence</h2>
                  <div className="h-px flex-1 bg-linear-to-r from-foreground/10 to-transparent" />
                </div>
                <div className="border border-border/10 bg-card p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-64 h-64 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={LANGUAGES}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                          >
                            {LANGUAGES.map((l) => (
                              <Cell key={l.name} fill={l.color}
                                style={{ filter: `drop-shadow(0 0 6px ${l.color}66)` }}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/30 tracking-[0.3em] uppercase mb-4">Language Distribution</div>
                      <div className="space-y-3">
                        {LANGUAGES.map((l) => (
                          <div key={l.name}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-['JetBrains_Mono',monospace] text-xs font-medium text-foreground/80">{l.name}</span>
                              <span className="font-['JetBrains_Mono',monospace] text-xs text-foreground/40">{l.value}%</span>
                            </div>
                            <div className="h-1.5 bg-muted/30 w-full overflow-hidden">
                              <div className="h-full transition-all duration-500"
                                style={{ width: `${l.value}%`, backgroundColor: l.color, boxShadow: `0 0 8px ${l.color}66` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── CONTRIBUTION PULSE ── */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-[#0066FF]" />
                  <h2 className="font-['Syne',sans-serif] text-xl font-black uppercase tracking-[0.15em]">Contribution Pulse</h2>
                  <div className="h-px flex-1 bg-linear-to-r from-foreground/10 to-transparent" />
                </div>
                <div className="border border-border/10 bg-card p-6 md:p-8">
                  <div className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20 tracking-[0.3em] uppercase mb-4">7-Week Activity Matrix</div>
                  <div className="grid grid-cols-7 gap-1.5 max-w-100 mx-auto">
                    {CELLS.map((c, i) => {
                      const intensity = Math.max(0.08, c.v);
                      return (
                        <div key={i}
                          className="aspect-square transition-transform hover:scale-150"
                          style={{
                            backgroundColor: `rgba(0,102,255,${intensity})`,
                            boxShadow: intensity > 0.5 ? `0 0 4px rgba(0,102,255,${intensity * 0.5})` : "none",
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-4">
                    <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground/20 uppercase">Less</span>
                    {[0.08, 0.2, 0.4, 0.6, 0.8].map((v) => (
                      <div key={v} className="w-3 h-3" style={{ backgroundColor: `rgba(0,102,255,${v})` }} />
                    ))}
                    <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground/20 uppercase">More</span>
                  </div>
                </div>
              </section>

              {/* ── REPO GRID ── */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-5 h-5 text-[#0066FF]" />
                  <h2 className="font-['Syne',sans-serif] text-xl font-black uppercase tracking-[0.15em]">Repository Matrix</h2>
                  <div className="h-px flex-1 bg-linear-to-r from-foreground/10 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {REPOS.map((r, i) => (
                    <div key={r.name}
                      className="group border border-border/10 bg-card p-5 transition-all duration-300 hover:border-[#0066FF]/40"
                      style={{ boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20 tracking-wider">
                          MODULE_{String(i + 1).padStart(2, "0")}
                        </span>
                        <a href={`${USER.url}/${r.name}`} target="_blank" rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground/30 hover:text-[#0066FF]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <h3 className="font-['Syne',sans-serif] text-base font-bold text-foreground mb-1.5">{r.name}</h3>
                      <p className="font-['Inter',sans-serif] text-xs text-foreground/40 leading-relaxed mb-4 line-clamp-2">{r.desc}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/50">
                          <span className="inline-block w-2 h-2 mr-1" style={{
                            backgroundColor:
                              r.lang === "TypeScript" ? "#3178C6" :
                              r.lang === "Go" ? "#00ADD8" :
                              r.lang === "Rust" ? "#DEA584" :
                              r.lang === "Python" ? "#3776AB" :
                              r.lang === "Markdown" ? "#083fa1" : "#E34F26",
                          }} />
                          {r.lang}
                        </span>
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/30 flex items-center gap-1">
                          <Star className="w-3 h-3" /> {r.stars}
                        </span>
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/30 flex items-center gap-1">
                          <GitFork className="w-3 h-3" /> {r.forks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── LIVE SIGNAL FEED ── */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Radio className="w-5 h-5 text-[#0066FF]" />
                  <h2 className="font-['Syne',sans-serif] text-xl font-black uppercase tracking-[0.15em]">Live Signal Feed</h2>
                  <div className="h-px flex-1 bg-linear-to-r from-foreground/10 to-transparent" />
                </div>
                <div className="border border-border/10 bg-card overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/10 bg-muted/20">
                    <Terminal className="w-3.5 h-3.5 text-[#00E676]" />
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/30 tracking-wider uppercase">activity.log — tail -f</span>
                    <span className="ml-auto font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20">LIVE</span>
                    <span className="w-1.5 h-1.5 rounded-none bg-[#00E676] animate-pulse" style={{ boxShadow: "0 0 6px #00E676" }} />
                  </div>
                  <div className="divide-y divide-border/3 max-h-100 overflow-y-auto custom-scrollbar">
                    {EVENTS.map((e, i) => (
                      <div key={i}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
                      >
                        <e.icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: e.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-['JetBrains_Mono',monospace] text-xs">
                            <span className="text-foreground/70 font-medium">{e.repo}</span>
                            <span className="text-foreground/30"> / </span>
                            <span className="text-foreground/50">{e.detail}</span>
                          </div>
                        </div>
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20 shrink-0">{e.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>

      {/* ───── NETWORK_SYNC_READY ───── */}
      <section className="w-full mt-20 border-t border-border/10 bg-card">
        <div className="max-w-360 mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#0066FF]/30 bg-[#0066FF]/5 mb-6 font-['JetBrains_Mono',monospace] text-[10px] text-[#0066FF] tracking-[0.3em] uppercase">
              <Activity className="w-3 h-3" /> Network_Sync_Ready
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src="https://img.icons8.com/?size=100&id=OekWdZr7M4hU&format=png"
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20"
                  style={{ filter: "drop-shadow(0 0 20px rgba(0,102,255,0.4))" }}
                />
                <img
                  src="https://img.icons8.com/?size=100&id=OekWdZr7M4hU&format=png"
                  alt=""
                  className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 animate-ping opacity-20"
                />
              </div>
            </div>
            <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Ready to <span className="text-[#0066FF]">Collaborate</span>
            </h2>
            <p className="font-['Inter',sans-serif] text-sm md:text-base text-foreground/40 max-w-xl mx-auto mb-8 leading-relaxed">
              Open-source enthusiast, system architect, and full-stack developer.
              Let's build something extraordinary together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={USER.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-['JetBrains_Mono',monospace] text-sm font-bold text-foreground bg-[#0066FF] hover:bg-[#0052CC] transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ boxShadow: "6px 6px 0px 0px rgba(0,102,255,0.4)" }}
              >
                <Github className="w-4 h-4" /> TRANSMIT — CONNECT
              </a>
              <Link href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-['JetBrains_Mono',monospace] text-sm text-foreground/50 border border-border/20 hover:text-foreground hover:border-foreground/40 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" /> RETURN_TO_BUILDER
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-border/5 bg-background">
        <div className="max-w-360 mx-auto px-6 md:px-12 lg:px-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20 tracking-wider">
              BannerForge v2025.11.17 / BUILD_04
            </div>
            <div className="flex items-center gap-6">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/20">
                &copy; 2025 Abir Hasan Siam
              </span>
              <Link href="/"
                className="font-['JetBrains_Mono',monospace] text-[10px] text-foreground/30 hover:text-[#0066FF] transition-colors tracking-wider"
              >
                [BANNERFORGE]
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
