import { AnimatePresence, motion } from "framer-motion";
import { Command, Download, Terminal } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { CommandPalette } from "./components/CommandPalette";
import { EngineerFrame } from "./components/EngineerOverlay";
import { LoadingScreen } from "./components/LoadingScreen";
import { MagneticCursor } from "./components/MagneticCursor";
import { ProjectBento } from "./components/ProjectBento";
import { Pill, reveal, SectionHeading } from "./components/SectionHeading";
import { StackGrid } from "./components/StackGrid";
import { projects, socialLinks, stack, timeline } from "./data/portfolio";

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState("noir");
  const [engineerMode, setEngineerMode] = useState(false);
  const [booting, setBooting] = useState(true);
  const themeClass = theme === "signal" ? "theme-signal" : "theme-noir";
  const copyEmail = () => navigator.clipboard?.writeText("amassry.work@gmail.com");

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className={`${themeClass} min-h-screen overflow-hidden bg-night font-body text-white selection:bg-cyber selection:text-night`}>
      <AnimatePresence mode="wait">{booting ? <LoadingScreen /> : null}</AnimatePresence>
      <MagneticCursor />
      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        theme={theme}
        setTheme={setTheme}
        engineerMode={engineerMode}
        setEngineerMode={setEngineerMode}
      />

      <div className="fixed inset-0 -z-10 bg-stage" />
      <div className="ambient-mesh fixed inset-0 -z-10" />
      <div className="ambient-grid fixed inset-0 -z-10" />
      <div className="ambient-noise fixed inset-0 -z-10" />

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#0b1616]/56 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
          <a href="#top" className="font-heading text-lg font-bold tracking-wide text-white" data-cursor-label="Top">
            Ahmed<span className="text-cyber">.</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-white/62 md:flex">
            <a className="transition hover:text-white" href="#about" data-cursor-label="About">About</a>
            <a className="transition hover:text-white" href="#projects" data-cursor-label="Projects">Projects</a>
            <a className="transition hover:text-white" href="#experience" data-cursor-label="Experience">Experience</a>
            <a className="transition hover:text-white" href="#contact" data-cursor-label="Contact">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEngineerMode((value) => !value)}
              className={`grid h-10 w-10 place-items-center rounded-full border transition ${engineerMode ? "border-cyber bg-cyber/14 text-cyber" : "border-white/12 bg-white/[0.06] text-white/62 hover:text-white"}`}
              aria-label="Toggle engineer mode"
              data-cursor-label="Engineer"
            >
              <Terminal className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white/72 transition hover:text-white md:flex"
              data-cursor-label="CMD+K"
            >
              <Command className="h-4 w-4" />
              <span>CMD K</span>
            </button>
          </div>
        </nav>
      </header>

      <EngineerFrame active={engineerMode} label="Hero" stack="React, Tailwind, Framer Motion" grid="balanced editorial split">
        <section id="top" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-[0.98fr_0.86fr] xl:gap-16">
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
              <span className="text-cyber">AI Systems</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span>Computer Vision</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span>Impact Entrepreneurship</span>
            </div>
            <h1 className="max-w-3xl font-heading text-[2.85rem] font-semibold leading-[1.03] text-white sm:text-5xl md:text-[4.15rem] xl:text-[4.65rem]">
              Ahmed Almassri
              <span className="mt-3 block font-medium text-white/86">AI systems engineer for real-world impact.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Computer Engineering Student | AI Researcher | Tech Entrepreneur.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/48">
              Building computer vision, resilient platforms, and AI products that connect technical depth with measurable social value.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="action-hover rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-night hover:bg-cyber" data-cursor-label="View Projects">
                View Projects
              </a>
              <a href="mailto:amassry.work@gmail.com" className="action-hover rounded-full border border-white/14 bg-white/[0.08] px-6 py-3 text-center text-sm font-bold text-white backdrop-blur hover:border-cyber/70 hover:text-cyber" data-cursor-label="Email Ahmed">
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ y: -10, scale: 1.015, rotate: 0.35 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="portrait-float relative"
            data-cursor-label="Profile"
          >
            <div className="absolute -inset-3 rounded-[2.2rem] border border-white/12 bg-cyber/[0.07] shadow-glow backdrop-blur-xl" />
            <div className="surface-hover group relative mx-auto max-w-[500px] overflow-hidden rounded-[1.8rem] border border-white/16 bg-gradient-to-br from-white/16 via-white/8 to-cyber/12">
              <img src="/ahmed-almassri.jpg" alt="Ahmed Almassri" className="h-[470px] w-full object-contain object-center p-6 saturate-[.96] transition duration-500 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/82 via-night/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="rounded-[1.4rem] border border-white/14 bg-night/72 p-4 backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyber">Current focus</p>
                  <p className="mt-2 font-heading text-xl font-bold leading-snug md:text-2xl">AI platforms that keep working when conditions get real.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </EngineerFrame>

      <EngineerFrame active={engineerMode} label="About" stack="Cards, copy hierarchy, glass surface" grid="3-card responsive">
        <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeading
            eyebrow="About"
            title="Engineering depth with a human operating system."
            copy="Ahmed works at the intersection of deep technical engineering and social impact, bridging computer vision, servers, and applied AI with entrepreneurship that solves field-level problems."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Technical Core", "Computer vision, AI pipelines, databases, and server architecture built with a systems-first mindset."],
              ["Leadership Signal", "Editor-in-Chief of the IEEE Student Branch, shaping technical communication and community learning."],
              ["Impact Lens", "Entrepreneurial projects focused on education, relief operations, and technology that holds up under pressure."],
            ].map(([title, copy]) => (
              <motion.div key={title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="surface-hover rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
                <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-white/62">{copy}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </EngineerFrame>

      <EngineerFrame active={engineerMode} label="Projects" stack="layoutId, AnimatePresence, bento grid" grid="12-column bento">
        <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeading
            eyebrow="Core Projects"
            title="Bento-built proof of range."
            copy="Three projects, one pattern: intelligent systems designed for practical constraints, measurable outcomes, and real users."
          />
          <ProjectBento projects={projects} />
        </section>
      </EngineerFrame>

      <EngineerFrame active={engineerMode} label="Experience" stack="Timeline cards, semantic sections" grid="split content">
        <section id="experience" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Experience"
              title="Leadership that ships ideas into the world."
              copy="Ahmed's background combines institutional experience, student leadership, and community-driven technology initiatives."
            />
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div key={item.role} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.08 }} className="surface-hover rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyber">{item.org}</p>
                  <h3 className="mt-3 font-heading text-2xl font-bold">{item.role}</h3>
                  <p className="mt-3 leading-7 text-white/62">{item.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EngineerFrame>

      <EngineerFrame active={engineerMode} label="Stack" stack="Lucide-ready badges, hover transforms" grid="6-column icon grid">
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHeading eyebrow="Technical Stack" title="Tools for AI, infrastructure, and data systems." />
          <StackGrid stack={stack} />
        </section>
      </EngineerFrame>

      <footer id="contact" className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-3xl font-bold">Let's build the next system.</p>
            <p className="mt-2 text-white/58">Available for AI, systems, SaaS, and impact-focused collaborations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.filter((link) => link.label !== "Email").map((link) => (
              <a key={link.label} className="action-hover rounded-full border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white/74 hover:border-cyber hover:text-cyber" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} data-cursor-label={link.label === "Email" ? "Copy Email" : link.label} data-cursor-variant={link.label === "Email" ? "copy" : "active"}>
                {link.label}
              </a>
            ))}
            <button onClick={copyEmail} className="action-hover rounded-full border border-white/12 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white/74 hover:border-cyber hover:text-cyber" data-cursor-label="Copy Email" data-cursor-variant="copy">
              Email
            </button>
            <a className="action-hover inline-flex items-center gap-2 rounded-full border border-cyber/45 bg-cyber/10 px-5 py-3 text-sm font-bold text-cyber hover:bg-cyber hover:text-night" href="/ahmed-almassri-cv.pdf" download data-cursor-label="Download CV">
              <Download className="h-4 w-4" />
              CV
            </a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-sm text-white/38">(c) {year} Ahmed Almassri. Designed for recruiters, investors, and serious builders.</p>
      </footer>
    </main>
  );
}
