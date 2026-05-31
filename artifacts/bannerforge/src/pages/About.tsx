import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Header } from "../components/builder/Header";
import {
  Sparkles,
  Palette,
  Layout,
  Layers,
  Download,
  Share2,
  Github,
  Wand2,
  ArrowRight,
  CheckCircle2,
  Code2,
  Image,
  Zap,
  Feather,
  Shield,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function About() {
  useEffect(() => {
    document.title = "About | BannerForge — GitHub README Banner Generator";
  }, []);

  return (
    <div className="min-h-dvh w-full flex flex-col text-foreground bg-background">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        {/* ───── Hero ───── */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[140px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[140px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Free & Open Source
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
            >
              Craft Beautiful Banners for{" "}
              <span className="text-primary">GitHub</span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              BannerForge is a free online tool that lets you design stunning,
              animated banners for your GitHub profile README and project
              repositories — no design skills needed.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex items-center justify-center gap-4 flex-wrap"
            >
              <Link href="/">
                <Button size="lg" className="gap-2">
                  Start Creating
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ───── What is BannerForge ───── */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              What is BannerForge?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                BannerForge is a purpose-built web application for developers
                who want to make their GitHub presence stand out. Whether you
                are polishing your profile README or adding a header image to
                your open-source project, BannerForge gives you everything you
                need in one place.
              </p>
              <p>
                The project was created to solve a simple problem: GitHub
                profile headers and project banners are the first thing people
                see, but creating them often requires graphic design software
                or coding from scratch. BannerForge bridges that gap with an
                intuitive visual editor that works entirely in the browser.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ───── Two Modes ───── */}
        <section className="border-y border-border bg-secondary/20">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Two Modes, One Tool
              </h2>
              <p className="text-muted-foreground mb-12 max-w-2xl">
                Choose the workflow that fits your style — from instant presets
                to pixel-perfect control.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Simple Mode</h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "100+ handcrafted presets for instant results",
                    "500+ Google Fonts with live preview",
                    "40+ decorative icons and custom uploads",
                    "50+ background patterns with color & opacity control",
                    "Animated background effects",
                    "Pre-sized for GitHub README (900×230)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Advanced (SVG) Mode</h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "Full SVG composition engine with text layers",
                    "Gradient fills and linear/radial color controls",
                    "Particle effects, confetti, and overlay textures",
                    "Per-layer animation (float, pulse, wave, glow)",
                    "Drop shadows, border styles, and color adjustments",
                    "Multiple canvas sizes: GitHub, Twitter, LinkedIn, and more",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── Key Features Grid ───── */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Designed from the ground up for developers who care about
              presentation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Palette,
                title: "Visual Editor",
                desc: "Real-time preview as you tweak colors, fonts, layout, and decorations. See every change instantly.",
              },
              {
                icon: Wand2,
                title: "Preset Library",
                desc: "Jump-start your design with 100+ curated presets. Perfect for when you need something great in seconds.",
              },
              {
                icon: Download,
                title: "Export as PNG",
                desc: "Download your banner as a high-quality PNG image, ready to drop into your GitHub README.",
              },
              {
                icon: Code2,
                title: "Export as SVG",
                desc: "Advanced mode generates pure SVG code with embedded CSS animations — lightweight and scalable.",
              },
              {
                icon: Share2,
                title: "Share via URL",
                desc: "Every configuration is encoded in the URL. Share a link and anyone sees the exact same banner.",
              },
              {
                icon: Zap,
                title: "Keyboard Friendly",
                desc: "Undo/redo with Ctrl+Z/Y, randomize with R. Designed for a fast, keyboard-driven workflow.",
              },
              {
                icon: Feather,
                title: "500+ Google Fonts",
                desc: "Access the full Google Fonts library. Find the perfect typeface for your personal brand.",
              },
              {
                icon: Image,
                title: "Custom Decorations",
                desc: "Upload your own images or pick from 40+ built-in decorative icons to personalize your banner.",
              },
              {
                icon: Shield,
                title: "100% Free & Open Source",
                desc: "No accounts, no tracking, no paywalls. Everything runs in your browser. MIT licensed on GitHub.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary/30 hover:bg-primary/[0.02] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ───── How It Works ───── */}
        <section className="border-y border-border bg-secondary/20">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Three simple steps to a professional GitHub banner.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Design",
                  desc: "Choose a preset or start from scratch. Customize colors, fonts, decorations, patterns, and layout until it looks right.",
                },
                {
                  step: "02",
                  title: "Export",
                  desc: "Download your banner as a PNG image or copy the SVG code. Both are ready to use — no cleanup needed.",
                },
                {
                  step: "03",
                  title: "Publish",
                  desc: "Upload the image to your GitHub repository and add a single Markdown line to your README. Done.",
                },
              ].map(({ step, title, desc }) => (
                <motion.div
                  key={step}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 text-xl font-bold text-primary">
                    {step}
                  </div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need to create an account?",
                a: "No. BannerForge runs entirely in your browser. There are no accounts, no sign-ups, and no data collection.",
              },
              {
                q: "Can I use banners for commercial projects?",
                a: "Yes. BannerForge is MIT licensed. All banners you create are yours to use for any purpose — personal, open-source, or commercial.",
              },
              {
                q: "What size should my GitHub banner be?",
                a: "The standard GitHub profile README header is 900×230 pixels. Both modes include this as the default size, along with presets for Twitter, LinkedIn, Discord, and more.",
              },
              {
                q: "Does it work offline?",
                a: "Font loading and the initial page load require an internet connection. Once loaded, most editing works client-side without additional network requests.",
              },
              {
                q: "Is BannerForge open source?",
                a: "Yes. The entire source code is available on GitHub under the MIT license. Contributions, issues, and feature requests are welcome.",
              },
            ].map(({ q, a }) => (
              <motion.details
                key={q}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium hover:bg-secondary/30 transition-colors [&::-webkit-details-marker]:hidden">
                  {q}
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {a}
                </div>
              </motion.details>
            ))}
          </div>
        </section>

        {/* ───── Tech Stack ───── */}
        <section className="border-t border-border bg-secondary/10">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-xl font-bold tracking-tight mb-4">
                Built With
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
                {[
                  "React 19",
                  "TypeScript",
                  "Tailwind CSS v4",
                  "shadcn/ui",
                  "Framer Motion",
                  "Zustand",
                  "Wouter",
                  "TanStack Query",
                  "Vite",
                  "html2canvas",
                  "SVG",
                  "Google Fonts",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="relative overflow-hidden border-t border-border">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <div className="relative max-w-2xl mx-auto px-6 py-20 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Ready to Forge Your Banner?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                No sign-up required. Start creating in seconds.
              </p>
              <Link href="/">
                <Button size="lg" className="gap-2 text-base px-8">
                  Open BannerForge
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ───── Footer ───── */}
        <footer className="border-t border-border py-6 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>BannerForge &mdash; MIT License</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <Link href="/" className="hover:text-foreground transition-colors">
                Builder
              </Link>
            </div>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}
