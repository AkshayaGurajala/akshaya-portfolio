import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Code2, Brain, Layers, Wrench, Sparkles, Github, Linkedin, Mail, MapPin,
  Award, GraduationCap, Trophy, ArrowUpRight, Cpu, Database, Globe, Terminal,
  Send, Star, Rocket,
} from "lucide-react";
import avatar from "@/assets/akshaya-avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshaya Varma — AI & Full Stack Developer" },
      { name: "description", content: "Premium portfolio of Akshaya Varma, B.Tech CSE student exploring AI, ML, and full stack development." },
    ],
  }),
  component: Portfolio,
});

/* ---------------- Cursor Glow ---------------- */
function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,oklch(0.85_0.18_200/0.18),transparent_60%)] blur-2xl" />
    </motion.div>
  );
}

/* ---------------- Particles ---------------- */
function Particles({ count = 40 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }))
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-neon-cyan/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: "blur(0.5px)" }}
          animate={{ y: [-20, -120, -20], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------------- Loader ---------------- */
function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-24 w-24 rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-magenta"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs tracking-[0.3em] text-gradient">AV</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Navbar ---------------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className={`fixed inset-x-0 top-4 z-50 mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all sm:px-6 ${
        scrolled ? "glass-strong" : "glass"
      }`}
      style={{ width: "calc(100% - 2rem)" }}
    >
      <a href="#home" className="flex items-center gap-2 font-display font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Akshaya<span className="text-gradient">.</span></span>
      </a>
      <ul className="hidden items-center gap-1 md:flex">
        {NAV.map((n) => (
          <li key={n.id}>
            <a
              href={`#${n.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{n.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-4 py-1.5 text-sm font-medium text-background"
      >
        Hire me <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.nav>
  );
}

/* ---------------- Typing ---------------- */
const ROLES = ["AI Enthusiast", "Machine Learning Developer", "Full Stack Learner"];
function Typing() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = ROLES[i];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del && text === current) { setTimeout(() => setDel(true), 1400); return; }
      if (del && text === "") { setDel(false); setI((p) => (p + 1) % ROLES.length); return; }
      setText(del ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return (
    <span className="font-mono text-gradient">
      {text}<span className="ml-0.5 inline-block w-[2px] animate-blink bg-neon-cyan align-middle" style={{ height: "1em" }} />
    </span>
  );
}

/* ---------------- 3D Tilt Card ---------------- */
function useTilt(intensity = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * intensity);
    rx.set(-py * intensity);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return { ref, onMove, onLeave, rx: srx, ry: sry };
}

/* ---------------- Hero ---------------- */
function Hero() {
  const tilt = useTilt(14);
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <Particles count={50} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-neon-lime opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-neon-lime" />
            </span>
            Available for internships & collaborations
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="text-gradient">Akshaya Varma</span>
            <br />
            <span className="text-foreground/90">building tomorrow with </span>
            <span className="text-gradient">code & curiosity.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="mt-5 text-lg text-muted-foreground sm:text-xl"
          >
            I'm a&nbsp;<Typing />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="mt-5 max-w-xl text-muted-foreground"
          >
            B.Tech Computer Science student crafting intelligent systems, elegant interfaces, and meaningful experiences at the intersection of AI and the web.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3 font-medium text-background shadow-[var(--shadow-neon)] transition hover:scale-[1.03]">
              <Rocket className="h-4 w-4" /> View my work
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition hover:bg-white/5">
              <Mail className="h-4 w-4" /> Let's talk
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div><div className="font-display text-2xl text-gradient">10+</div>Projects</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-gradient">8+</div>Certifications</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-gradient">3yr</div>B.Tech CSE</div>
          </motion.div>
        </div>

        {/* 3D rotating profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 1.3, duration: 0.9, type: "spring" }}
          style={{ perspective: 1200 }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.onLeave}
            style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/5] w-full rounded-3xl glass-strong p-3"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-neon-cyan/40 via-transparent to-neon-magenta/40 opacity-60 blur-md" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
              <img src={avatar} alt="Akshaya Varma" width={816} height={816} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-4 py-3" style={{ transform: "translateZ(40px)" }}>
                <div>
                  <div className="font-display font-semibold">Akshaya Varma</div>
                  <div className="font-mono text-xs text-muted-foreground">B.Tech · CSE · AI</div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>
            {/* Floating chips */}
            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -left-6 top-12 rounded-2xl glass-strong px-3 py-2 font-mono text-xs">
              <span className="text-neon-cyan">{"<"}</span>AI<span className="text-neon-magenta">{"/>"}</span>
            </motion.div>
            <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -right-6 top-1/2 rounded-2xl glass-strong px-3 py-2 font-mono text-xs">
              Python · ML
            </motion.div>
            <motion.div animate={{ y: [-4, 8, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -bottom-4 left-10 rounded-2xl glass-strong px-3 py-2 font-mono text-xs">
              ★ Top 10%
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Section header ---------------- */
function SectionHead({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-neon-cyan" /> {kicker}
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

/* ---------------- About / Timeline ---------------- */
const TIMELINE = [
  { year: "2023 — Present", title: "B.Tech, Computer Science", place: "Pursuing degree with AI specialization", icon: GraduationCap, color: "from-neon-cyan to-sky-400" },
  { year: "2022", title: "Higher Secondary (12th)", place: "Science Stream — Distinction", icon: Award, color: "from-neon-magenta to-pink-400" },
  { year: "2020", title: "Secondary Education (10th)", place: "Top of class — CBSE board", icon: Star, color: "from-neon-violet to-purple-400" },
];
function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="About me" title="A journey powered by curiosity" desc="From writing my first line of code to building intelligent systems — here's the path so far." />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl glass-strong p-8"
          >
            <div className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-3 py-1 font-mono text-xs text-background">whoami</div>
            <p className="leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground">Akshaya Varma</span>, a Computer Science undergraduate driven by the magic of turning ideas into intelligent software. I love bridging the gap between data and design — building things that are both technically robust and genuinely delightful to use.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              When I'm not coding, you'll find me exploring research papers, experimenting with new ML models, or refining my next side project.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
              {[
                { k: "Focus", v: "AI · ML · Web" },
                { k: "Location", v: "India" },
                { k: "Lang", v: "Py · JS · C++" },
                { k: "Vibe", v: "Build · Learn · Ship" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-border/60 bg-white/[0.02] px-3 py-2">
                  <div className="text-muted-foreground">{x.k}</div>
                  <div className="text-foreground">{x.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-transparent" />
            <div className="space-y-6">
              {TIMELINE.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-16"
                  >
                    <div className={`absolute left-0 top-1 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-background shadow-[var(--shadow-neon)]`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl glass p-5 transition hover:bg-white/[0.04]">
                      <div className="font-mono text-xs text-neon-cyan">{t.year}</div>
                      <div className="mt-1 font-display text-lg font-semibold">{t.title}</div>
                      <div className="text-sm text-muted-foreground">{t.place}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
const SKILL_CATS = [
  {
    title: "Programming", icon: Code2, color: "from-neon-cyan to-sky-500",
    skills: [{ n: "Python", v: 90 }, { n: "C / C++", v: 80 }, { n: "Java", v: 70 }, { n: "JavaScript", v: 85 }],
  },
  {
    title: "Web Development", icon: Globe, color: "from-neon-magenta to-pink-500",
    skills: [{ n: "HTML / CSS", v: 92 }, { n: "Bootstrap", v: 85 }, { n: "React", v: 78 }, { n: "Node.js", v: 70 }],
  },
  {
    title: "Machine Learning", icon: Brain, color: "from-neon-violet to-purple-500",
    skills: [{ n: "Scikit-learn", v: 80 }, { n: "TensorFlow", v: 72 }, { n: "Pandas / NumPy", v: 88 }, { n: "NLP", v: 70 }],
  },
  {
    title: "Tools", icon: Wrench, color: "from-neon-lime to-emerald-500",
    skills: [{ n: "Git / GitHub", v: 88 }, { n: "VS Code", v: 95 }, { n: "Jupyter", v: 90 }, { n: "Figma", v: 65 }],
  },
];

function Ring({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90">
      <circle cx="32" cy="32" r={r} className="fill-none stroke-white/10" strokeWidth="5" />
      <motion.circle
        cx="32" cy="32" r={r} className="fill-none" strokeWidth="5" strokeLinecap="round"
        stroke="url(#ringg)"
        initial={{ strokeDasharray: `0 ${c}` }}
        whileInView={{ strokeDasharray: `${(value / 100) * c} ${c}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.18 200)" />
          <stop offset="100%" stopColor="oklch(0.7 0.28 330)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SkillCard({ cat, idx }: { cat: typeof SKILL_CATS[number]; idx: number }) {
  const tilt = useTilt(8);
  const Icon = cat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-3xl glass-strong p-6 transition-shadow hover:shadow-[var(--shadow-neon)]"
      >
        <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${cat.color} opacity-0 blur transition-opacity duration-500 group-hover:opacity-30`} />
        <div className="relative">
          <div className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${cat.color} text-background`} style={{ transform: "translateZ(30px)" }}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold">{cat.title}</h3>
          <ul className="mt-5 space-y-4">
            {cat.skills.map((s) => (
              <li key={s.n} className="flex items-center gap-3">
                <Ring value={s.v} />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{s.n}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.v}%</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }} viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="Skills" title="Tools of the craft" desc="A snapshot of the languages, frameworks, and platforms I work with." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATS.map((c, i) => <SkillCard key={c.title} cat={c} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
const PROJECTS = [
  {
    title: "Elective Course Recommendation System",
    tag: "AI · ML · Python",
    desc: "Personalized elective suggestions for students using collaborative filtering and content-based ML on academic data.",
    stack: ["Python", "Scikit-learn", "Pandas", "Flask"],
    icon: Brain,
    gradient: "from-neon-cyan/40 via-sky-500/20 to-transparent",
    accent: "text-neon-cyan",
  },
  {
    title: "Birthday Wishes Website",
    tag: "Web · Animation",
    desc: "An interactive birthday surprise site featuring confetti, music, animated greetings, and a heartfelt personalized message.",
    stack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    icon: Sparkles,
    gradient: "from-neon-magenta/40 via-pink-500/20 to-transparent",
    accent: "text-neon-magenta",
  },
  {
    title: "Student Academic Management System",
    tag: "Full Stack",
    desc: "End-to-end portal to manage students, courses, attendance, and grades with role-based dashboards for admins and faculty.",
    stack: ["React", "Node.js", "MongoDB", "Bootstrap"],
    icon: Database,
    gradient: "from-neon-violet/40 via-purple-500/20 to-transparent",
    accent: "text-neon-violet",
  },
];

function ProjectCard({ p, i }: { p: typeof PROJECTS[number]; i: number }) {
  const tilt = useTilt(10);
  const Icon = p.icon;
  const reverse = i % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ perspective: 1400 }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-[2rem] glass-strong"
      >
        <div className={`grid items-center gap-0 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
          {/* Preview */}
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 grid place-items-center" style={{ transform: "translateZ(60px)" }}>
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-white/15"
                  style={{ width: 240, height: 240, left: -120, top: -120 }}
                />
                <div className="relative grid h-32 w-32 place-items-center rounded-3xl glass-strong shadow-[var(--shadow-neon)]">
                  <Icon className={`h-14 w-14 ${p.accent}`} />
                </div>
              </div>
            </div>
            <div className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-mono text-[11px]">{p.tag}</div>
          </div>
          {/* Info */}
          <div className="p-8 md:p-10" style={{ transform: "translateZ(30px)" }}>
            <div className="font-mono text-xs text-muted-foreground">PROJECT 0{i + 1}</div>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{p.title}</h3>
            <p className="mt-3 text-muted-foreground">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-border/60 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{s}</span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-4 py-2 text-sm font-medium text-background">
                Case study <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm">
                <Github className="h-3.5 w-3.5" /> Code
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="Selected work" title="Projects in spotlight" desc="A glimpse of what I've been building lately — from intelligent systems to delightful experiences." />
        <div className="space-y-10">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievements ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const dur = 1500; const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const CERTS = [
  { y: "2025", t: "Machine Learning Specialization", o: "Coursera · Stanford Online" },
  { y: "2024", t: "Python for Data Science", o: "IBM" },
  { y: "2024", t: "Full Stack Web Development", o: "freeCodeCamp" },
  { y: "2023", t: "Introduction to AI", o: "Google" },
];

function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="Achievements" title="Milestones worth celebrating" />
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { n: 10, s: "+", l: "Projects shipped", i: Rocket },
            { n: 8, s: "+", l: "Certifications", i: Award },
            { n: 5, s: "", l: "Hackathons", i: Trophy },
            { n: 100, s: "%", l: "Curiosity", i: Sparkles },
          ].map((x, i) => {
            const I = x.i;
            return (
              <motion.div
                key={x.l}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl glass-strong p-6"
              >
                <I className="h-5 w-5 text-neon-cyan" />
                <div className="mt-3 font-display text-4xl font-bold text-gradient">
                  <Counter to={x.n} suffix={x.s} />
                </div>
                <div className="text-sm text-muted-foreground">{x.l}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-neon-magenta via-neon-cyan to-transparent" />
            <div className="space-y-5">
              {CERTS.map((c, i) => (
                <motion.div
                  key={c.t}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-1 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-neon-magenta to-neon-violet text-background">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="rounded-2xl glass p-5">
                    <div className="font-mono text-xs text-neon-magenta">{c.y}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{c.t}</div>
                    <div className="text-sm text-muted-foreground">{c.o}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative grid place-items-center rounded-3xl glass-strong p-10"
          >
            <div className="relative h-72 w-72">
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background shadow-[var(--shadow-neon)]">
                  <Trophy className="h-12 w-12" />
                </div>
              </div>
              {[Cpu, Brain, Code2, Terminal].map((I, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl glass-strong"
                  style={{ animation: `orbit 18s linear infinite`, animationDelay: `${-i * 4.5}s` }}
                >
                  <I className="h-5 w-5 text-neon-cyan" />
                </motion.div>
              ))}
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">Badges earned across AI, ML, and full-stack tracks.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="Get in touch" title="Let's build something great" desc="Have a project, collaboration, or just want to say hi? My inbox is always open." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Floating contact cards */}
          <div className="space-y-4">
            {[
              { i: Mail, k: "Email", v: "akshaya.varma@example.com" },
              { i: Linkedin, k: "LinkedIn", v: "/in/akshaya-varma" },
              { i: Github, k: "GitHub", v: "@akshaya-varma" },
              { i: MapPin, k: "Location", v: "India · Open to remote" },
            ].map((c, i) => {
              const I = c.i;
              return (
                <motion.a
                  key={c.k} href="#"
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-4 rounded-2xl glass-strong p-5 transition hover:shadow-[var(--shadow-neon)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-magenta text-background transition group-hover:scale-110">
                    <I className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.k}</div>
                    <div className="font-medium">{c.v}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                </motion.a>
              );
            })}
          </div>

          {/* Glass form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll get back to you soon."); }}
            className="relative rounded-3xl glass-strong p-8"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-neon-cyan/30 to-neon-magenta/30 opacity-50 blur-md -z-10" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" placeholder="Jane Doe" />
              <Field label="Email" type="email" placeholder="jane@email.com" />
            </div>
            <div className="mt-5">
              <Field label="Subject" placeholder="Let's collaborate on…" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                rows={5} required
                placeholder="Tell me about your idea…"
                className="w-full resize-none rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-neon-cyan/60 focus:bg-white/[0.05]"
              />
            </div>
            <button type="submit" className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3 font-medium text-background shadow-[var(--shadow-neon)] transition hover:scale-[1.02]">
              Send message <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...rest} required
        className="w-full rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-neon-cyan/60 focus:bg-white/[0.05]"
      />
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="font-mono">© {new Date().getFullYear()} Akshaya Varma · Crafted with curiosity.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="transition hover:text-neon-cyan"><Github className="h-4 w-4" /></a>
          <a href="#" className="transition hover:text-neon-cyan"><Linkedin className="h-4 w-4" /></a>
          <a href="#" className="transition hover:text-neon-cyan"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1100); return () => clearTimeout(t); }, []);
  const { scrollYProgress } = useScroll();
  const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative min-h-screen">
      <Loader done={loaded} />
      <CursorGlow />
      <motion.div style={{ width: progressX }} className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-violet" />
      <Navbar />
      <Layers className="hidden" /> {/* keep import used */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
