import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Code2, Brain, Cpu, Wrench, Sparkles, Github, Linkedin, Mail, MapPin, Phone,
  Award, GraduationCap, Trophy, ArrowUpRight, Database, Eye, Layers,
  Send, Rocket, BookOpen, Building2, FileText,
} from "lucide-react";
import avatarAsset from "@/assets/akshaya.jpg.asset.json";

const AVATAR = avatarAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshaya Gurajala — AI & Computer Vision Developer" },
      { name: "description", content: "Portfolio of Akshaya Gurajala, B.Tech CSE student at Adikavi Nannaya University. Research Intern at IIT Tirupati. AI, ML, and full-stack developer." },
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
    <motion.div aria-hidden style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block">
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,oklch(0.85_0.18_200/0.18),transparent_60%)] blur-2xl" />
    </motion.div>
  );
}

/* ---------------- Custom dot cursor ---------------- */
function DotCursor() {
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const sx = useSpring(x, { stiffness: 500, damping: 35 });
  const sy = useSpring(y, { stiffness: 500, damping: 35 });
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.85_0.18_200)] md:block" />
  );
}

/* ---------------- Particles ---------------- */
function Particles({ count = 40 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 20 + 15, delay: Math.random() * 10,
    }))
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span key={p.id} className="absolute rounded-full bg-neon-cyan/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: "blur(0.5px)" }}
          animate={{ y: [-20, -120, -20], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ---------------- Loader ---------------- */
function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
          <div className="relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-24 w-24 rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-magenta" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs tracking-[0.3em] text-gradient">AG</span>
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
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}
      className={`fixed inset-x-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all sm:px-6 ${scrolled ? "glass-strong" : "glass"}`}
      style={{ width: "calc(100% - 2rem)" }}>
      <a href="#home" className="flex items-center gap-2 font-display font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Akshaya<span className="text-gradient">.</span></span>
      </a>
      <ul className="hidden items-center gap-1 lg:flex">
        {NAV.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {active === n.id && (
                <motion.span layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{n.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <a href="#contact"
          className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-4 py-1.5 text-sm font-medium text-background sm:inline-flex">
          Hire me <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}
          className="grid h-8 w-8 place-items-center rounded-full glass lg:hidden">
          <div className="flex flex-col gap-1">
            <span className={`h-0.5 w-4 bg-foreground transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition-all ${open ? "-translate-y-0 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute left-2 right-2 top-full mt-2 rounded-3xl glass-strong p-2 lg:hidden">
            <ul className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-2.5 text-sm ${active === n.id ? "bg-white/[0.06] text-foreground" : "text-muted-foreground"}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ---------------- Typing ---------------- */
const ROLES = ["AI Researcher", "Computer Vision Developer", "ML Engineer", "Full-Stack Builder"];
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

/* ---------------- 3D Tilt ---------------- */
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

/* ---------------- Magnetic button ---------------- */
function Magnetic({ children, className, href, ...rest }: { children: React.ReactNode; className?: string; href?: string } & React.HTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x: sx, y: sy }} className={className} {...rest as any}>
      {children}
    </motion.a>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const tilt = useTilt(14);
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <Particles count={50} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-neon-lime opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-neon-lime" />
            </span>
            Research Intern · IIT Tirupati · Available for collaboration
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Akshaya Gurajala</span>
            <br />
            <span className="text-foreground/90">engineering </span>
            <span className="text-gradient">intelligent perception.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            className="mt-5 text-lg text-muted-foreground sm:text-xl">
            I'm a&nbsp;<Typing />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="mt-5 max-w-xl text-muted-foreground">
            B.Tech CSE student at Adikavi Nannaya University. I build ML systems, computer-vision pipelines, and AI-assisted developer tools — currently researching Vision Transformers and autonomous perception at IIT Tirupati.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3 font-medium text-background shadow-[var(--shadow-neon)]">
              <Rocket className="h-4 w-4" /> View my work
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Magnetic>
            <Magnetic href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition hover:bg-white/5">
              <Mail className="h-4 w-4" /> Let's talk
            </Magnetic>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div><div className="font-display text-2xl text-gradient">8.6</div>CGPA / 10</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-gradient">4+</div>Projects</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-gradient">2</div>Research internships</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-gradient">5</div>Certifications</div>
          </motion.div>
        </div>

        {/* 3D rotating profile card */}
        <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -20 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 1.3, duration: 0.9, type: "spring" }}
          style={{ perspective: 1200 }} className="relative mx-auto w-full max-w-md">
          <motion.div ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
            style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/5] w-full rounded-3xl glass-strong p-3">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-neon-cyan/40 via-transparent to-neon-magenta/40 opacity-60 blur-md" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
              <img src={AVATAR} alt="Akshaya Gurajala" width={904} height={1200} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/15 mix-blend-overlay" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-4 py-3" style={{ transform: "translateZ(40px)" }}>
                <div>
                  <div className="font-display font-semibold">Akshaya Gurajala</div>
                  <div className="font-mono text-xs text-muted-foreground">B.Tech CSE · AI / CV</div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -left-6 top-12 rounded-2xl glass-strong px-3 py-2 font-mono text-xs">
              <span className="text-neon-cyan">{"<"}</span>YOLOv11<span className="text-neon-magenta">{"/>"}</span>
            </motion.div>
            <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -right-6 top-1/2 rounded-2xl glass-strong px-3 py-2 font-mono text-xs">
              Python · PyTorch
            </motion.div>
            <motion.div animate={{ y: [-4, 8, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -bottom-4 left-10 rounded-2xl glass-strong px-3 py-2 font-mono text-xs">
              ★ IIT Tirupati
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
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      className="mx-auto mb-16 max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-neon-cyan" /> {kicker}
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

/* ---------------- About ---------------- */
function About() {
  const tilt = useTilt(8);
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="About me" title="Curiosity, code, and computer vision" desc="A snapshot of who I am and what drives my work." />
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ perspective: 1000 }}>
            <motion.div ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
              style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
              className="relative aspect-square w-full overflow-hidden rounded-3xl glass-strong p-3">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-neon-magenta/40 via-transparent to-neon-cyan/40 opacity-50 blur" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.3rem]">
                <img src={AVATAR} alt="Akshaya Gurajala" width={800} height={800} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 font-mono text-[10px]" style={{ transform: "translateZ(30px)" }}>
                  {[
                    { k: "ROLE", v: "AI Eng." },
                    { k: "LOC", v: "Rajahmundry" },
                    { k: "YEAR", v: "2023–27" },
                  ].map((b) => (
                    <div key={b.k} className="rounded-xl glass px-2 py-1.5">
                      <div className="text-muted-foreground">{b.k}</div>
                      <div className="text-foreground">{b.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl glass-strong p-8">
            <div className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-3 py-1 font-mono text-xs text-background">whoami</div>
            <p className="leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground">Akshaya Gurajala</span>, a Computer Science undergrad obsessed with the intersection of <span className="text-foreground">AI, computer vision, and product-grade software</span>. From building a hybrid Random Forest + cosine-similarity recommender at NIT Warangal to researching Vision Transformers and YOLO-based perception at IIT Tirupati — I love turning research ideas into systems people can actually use.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I've shipped AI-assisted debugging tools, knowledge platforms powered by LLMs, and full-stack web products. I write code in Python, Java, C, and TypeScript, and I'm equally happy training models or pushing a React build to production.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
              {[
                { k: "Focus", v: "AI · CV · LLMs" },
                { k: "Currently", v: "Research @ IIT Tirupati" },
                { k: "Languages", v: "Py · Java · C · TS" },
                { k: "CGPA", v: "8.6 / 10" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-border/60 bg-white/[0.02] px-3 py-2">
                  <div className="text-muted-foreground">{x.k}</div>
                  <div className="text-foreground">{x.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Vision Transformers", "YOLOv11", "SAM-2", "Random Forest", "Flask", "React", "Ollama / LLMs"].map((t) => (
                <span key={t} className="rounded-full border border-border/60 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Education + Experience timeline ---------------- */
const TIMELINE = [
  {
    year: "May 2026 — Present",
    title: "Research Intern — Computer Vision & Deep Learning",
    place: "Indian Institute of Technology (IIT) Tirupati",
    desc: "Researching object detection, segmentation, and tracking with Vision Transformers, Diffusion Models, YOLOv11/YOLO-World, SAM-2, BoT-SORT, TensorRT and ONNX for real-time edge AI.",
    icon: Eye, color: "from-neon-cyan to-sky-400",
  },
  {
    year: "May 2025 — Jun 2025",
    title: "Machine Learning Intern",
    place: "National Institute of Technology (NIT) Warangal",
    desc: "Built an ML-based elective recommendation system using Random Forest and cosine similarity over multi-semester academic data — end-to-end pipeline with preprocessing, feature analysis, and personalized recommendations.",
    icon: Brain, color: "from-neon-magenta to-pink-400",
  },
  {
    year: "2023 — 2027 (Expected)",
    title: "B.Tech, Computer Science & Engineering",
    place: "Adikavi Nannaya University · Rajahmundry, AP",
    desc: "CGPA 8.6 / 10. Coursework: DSA, OOP, DBMS, Operating Systems, Computer Networks, Machine Learning, NLP, Cloud Computing.",
    icon: GraduationCap, color: "from-neon-violet to-purple-400",
  },
];
function Education() {
  return (
    <section id="education" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHead kicker="Journey" title="Education & experience" desc="The labs, classrooms, and internships that have shaped my craft." />
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-transparent" />
          <div className="space-y-6">
            {TIMELINE.map((t, idx) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.title}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }} className="relative pl-16">
                  <div className={`absolute left-0 top-1 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-background shadow-[var(--shadow-neon)]`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="rounded-2xl glass p-5 transition hover:bg-white/[0.04]">
                    <div className="font-mono text-xs text-neon-cyan">{t.year}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{t.title}</div>
                    <div className="text-sm text-foreground/80">{t.place}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
const SKILL_CATS = [
  {
    title: "Languages", icon: Code2, color: "from-neon-cyan to-sky-500",
    skills: [{ n: "Python", v: 92 }, { n: "Java", v: 78 }, { n: "C", v: 75 }, { n: "JavaScript / TypeScript", v: 85 }],
  },
  {
    title: "AI / ML", icon: Brain, color: "from-neon-magenta to-pink-500",
    skills: [{ n: "Machine Learning", v: 90 }, { n: "Deep Learning · CV", v: 82 }, { n: "NLP · Transformers", v: 78 }, { n: "LLM Apps · Prompt Eng.", v: 80 }],
  },
  {
    title: "Frameworks", icon: Cpu, color: "from-neon-violet to-purple-500",
    skills: [{ n: "Scikit-learn", v: 88 }, { n: "Pandas / NumPy", v: 90 }, { n: "Flask", v: 85 }, { n: "React", v: 80 }],
  },
  {
    title: "Tools & Cloud", icon: Wrench, color: "from-neon-lime to-emerald-500",
    skills: [{ n: "Git / GitHub", v: 88 }, { n: "SQLite / MySQL", v: 80 }, { n: "Supabase", v: 78 }, { n: "Vercel · Ollama", v: 75 }],
  },
];
function Ring({ value }: { value: number }) {
  const r = 26; const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90">
      <circle cx="32" cy="32" r={r} className="fill-none stroke-white/10" strokeWidth="5" />
      <motion.circle cx="32" cy="32" r={r} className="fill-none" strokeWidth="5" strokeLinecap="round"
        stroke="url(#ringg)" initial={{ strokeDasharray: `0 ${c}` }}
        whileInView={{ strokeDasharray: `${(value / 100) * c} ${c}` }} viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }} />
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
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }} style={{ perspective: 1000 }}>
      <motion.div ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
        style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-3xl glass-strong p-6 transition-shadow hover:shadow-[var(--shadow-neon)]">
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
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }} viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta" />
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
        <SectionHead kicker="Skills" title="Tools of the craft" desc="Languages, frameworks, and platforms I reach for every day." />
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
    desc: "ML-powered recommender built at NIT Warangal that suggests electives from multi-semester academic data using Random Forest classification and cosine similarity.",
    stack: ["Python", "Flask", "Scikit-learn", "Pandas", "Random Forest"],
    icon: Brain, gradient: "from-neon-cyan/40 via-sky-500/20 to-transparent", accent: "text-neon-cyan",
  },
  {
    title: "MnemoSphere",
    tag: "AI · LLM · Knowledge",
    desc: "AI-powered knowledge platform with intelligent web resource storage, automated summarization, keyword extraction, semantic search, and Q&A assistance.",
    stack: ["Python", "Flask", "SQLite", "Groq API", "BeautifulSoup"],
    icon: Layers, gradient: "from-neon-magenta/40 via-pink-500/20 to-transparent", accent: "text-neon-magenta",
  },
  {
    title: "ASH Self Drive Cars",
    tag: "Full Stack",
    desc: "End-to-end car rental platform with vehicle listings, authentication, booking workflows, and responsive design — built with modern web tooling and shipped to production.",
    stack: ["React", "TypeScript", "Supabase", "Tailwind", "Vite", "Vercel"],
    icon: Database, gradient: "from-neon-violet/40 via-purple-500/20 to-transparent", accent: "text-neon-violet",
  },
  {
    title: "DevError Decoder",
    tag: "AI · NLP · DevTools",
    desc: "AI-powered debugging assistant that analyzes Python, Java, and C errors and generates simplified explanations with corrective suggestions — backed by a published research paper.",
    stack: ["Python", "Flask", "Ollama", "NLP", "LLMs"],
    icon: Code2, gradient: "from-neon-lime/30 via-emerald-500/20 to-transparent", accent: "text-neon-lime",
  },
];
function ProjectCard({ p, i }: { p: typeof PROJECTS[number]; i: number }) {
  const tilt = useTilt(10);
  const Icon = p.icon;
  const reverse = i % 2 === 1;
  return (
    <motion.article initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }} style={{ perspective: 1400 }}>
      <motion.div ref={tilt.ref} onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
        style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-[2rem] glass-strong">
        <div className={`grid items-center gap-0 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 grid place-items-center" style={{ transform: "translateZ(60px)" }}>
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-white/15"
                  style={{ width: 240, height: 240, left: -120, top: -120 }} />
                <div className="relative grid h-32 w-32 place-items-center rounded-3xl glass-strong shadow-[var(--shadow-neon)]">
                  <Icon className={`h-14 w-14 ${p.accent}`} />
                </div>
              </div>
            </div>
            <div className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-mono text-[11px]">{p.tag}</div>
          </div>
          <div className="p-8 md:p-10" style={{ transform: "translateZ(30px)" }}>
            <div className="font-mono text-xs text-muted-foreground">PROJECT 0{i + 1}</div>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{p.title}</h3>
            <p className="mt-3 text-muted-foreground">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-border/60 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{s}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-4 py-2 text-sm font-medium text-background">
                Case study <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a href="https://github.com/" className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm">
                <Github className="h-3.5 w-3.5" /> Code
              </a>
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
        <SectionHead kicker="Selected work" title="Projects in spotlight" desc="A glimpse of what I've been building — from ML pipelines to AI-powered apps." />
        <div className="space-y-10">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Counter ---------------- */
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

/* ---------------- Certifications + Achievements ---------------- */
const CERTS = [
  { t: "Machine Learning Using Python", o: "Simplilearn" },
  { t: "Generative AI", o: "LinkedIn Learning" },
  { t: "SQL and Relational Databases 101", o: "IBM" },
  { t: "Python Fundamentals", o: "Infosys Springboard" },
  { t: "Core Java", o: "Growyourskills" },
];
const ACHIEVEMENTS = [
  { t: "Research Intern at IIT Tirupati", d: "Selected to work on Computer Vision, Deep Learning, and Autonomous Systems research.", icon: Trophy },
  { t: "Summer Research Internship — NIT Warangal", d: "Developed a Random Forest + cosine similarity Elective Course Recommendation System.", icon: Award },
  { t: "Authored Research Paper", d: "DevError Decoder: AI-Based Multi-Language Debugging System — multi-language framework integrating rule-based analysis and Ollama-powered AI explanations.", icon: FileText },
];
function Certifications() {
  return (
    <section id="certifications" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="Recognition" title="Certifications & achievements" />
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { n: 4, s: "+", l: "Featured projects", i: Rocket },
            { n: 5, s: "", l: "Certifications", i: Award },
            { n: 2, s: "", l: "Research internships", i: Building2 },
            { n: 1, s: "", l: "Published paper", i: BookOpen },
          ].map((x, i) => {
            const I = x.i;
            return (
              <motion.div key={x.l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }} className="rounded-3xl glass-strong p-6">
                <I className="h-5 w-5 text-neon-cyan" />
                <div className="mt-3 font-display text-4xl font-bold text-gradient">
                  <Counter to={x.n} suffix={x.s} />
                </div>
                <div className="text-sm text-muted-foreground">{x.l}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 font-display text-2xl font-semibold">Certifications</h3>
            <div className="space-y-3">
              {CERTS.map((c, i) => (
                <motion.div key={c.t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-center gap-4 rounded-2xl glass p-4 transition hover:bg-white/[0.04]">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-magenta to-neon-violet text-background">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{c.t}</div>
                    <div className="font-mono text-xs text-muted-foreground">{c.o}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-neon-cyan" />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-5 font-display text-2xl font-semibold">Highlights</h3>
            <div className="space-y-3">
              {ACHIEVEMENTS.map((a, i) => {
                const I = a.icon;
                return (
                  <motion.div key={a.t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative overflow-hidden rounded-2xl glass-strong p-5">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 blur-2xl" />
                    <div className="relative flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
                        <I className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-display font-semibold">{a.t}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
                      </div>
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

/* ---------------- Contact ---------------- */
const CONTACTS = [
  { i: Mail, k: "Email", v: "akshayagurajala1005@gmail.com", href: "mailto:akshayagurajala1005@gmail.com" },
  { i: Phone, k: "Phone", v: "+91 91107 02069", href: "tel:+919110702069" },
  { i: Linkedin, k: "LinkedIn", v: "/in/akshaya-gurajala", href: "https://linkedin.com/" },
  { i: Github, k: "GitHub", v: "@akshaya-gurajala", href: "https://github.com/" },
  { i: MapPin, k: "Location", v: "Rajahmundry, Andhra Pradesh · India", href: "#" },
];
function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead kicker="Get in touch" title="Let's build something great" desc="Have a research collaboration, internship, or project in mind? My inbox is open." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {CONTACTS.map((c, i) => {
              const I = c.i;
              return (
                <motion.a key={c.k} href={c.href}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
                  className="group flex items-center gap-4 rounded-2xl glass-strong p-5 transition hover:shadow-[var(--shadow-neon)]">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-magenta text-background transition group-hover:scale-110">
                    <I className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.k}</div>
                    <div className="truncate font-medium">{c.v}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                </motion.a>
              );
            })}
          </div>

          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! Akshaya will get back to you soon."); }}
            className="relative rounded-3xl glass-strong p-8">
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
              <textarea rows={5} required placeholder="Tell me about your idea…"
                className="w-full resize-none rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-neon-cyan/60 focus:bg-white/[0.05]" />
            </div>
            <button type="submit"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3 font-medium text-background shadow-[var(--shadow-neon)] transition hover:scale-[1.02]">
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
      <input {...rest} required
        className="w-full rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-neon-cyan/60 focus:bg-white/[0.05]" />
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="font-mono">© {new Date().getFullYear()} Akshaya Gurajala · Crafted with curiosity.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/" className="transition hover:text-neon-cyan"><Github className="h-4 w-4" /></a>
          <a href="https://linkedin.com/" className="transition hover:text-neon-cyan"><Linkedin className="h-4 w-4" /></a>
          <a href="mailto:akshayagurajala1005@gmail.com" className="transition hover:text-neon-cyan"><Mail className="h-4 w-4" /></a>
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
    <div className="relative min-h-screen md:cursor-none">
      <Loader done={loaded} />
      <DotCursor />
      <CursorGlow />
      <motion.div style={{ width: progressX }}
        className="fixed left-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-violet" />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
