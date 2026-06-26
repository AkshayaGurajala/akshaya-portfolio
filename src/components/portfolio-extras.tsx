import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Box, Brain, Cpu, Car, Zap, FileText, BookOpen, Github, ExternalLink,
  MessageSquare, X, Send, Sparkles, Wrench,
} from "lucide-react";

/* ---------------- Particle Network Background ---------------- */
export function ParticleNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0; let w = 0, h = 0; let dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 22000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    const onMove = (e: PointerEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    resize();
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          p.vx += (dx / dist) * 0.05;
          p.vy += (dy / dist) * 0.05;
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.85 0.18 200 / 0.7)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `oklch(0.7 0.28 330 / ${0.18 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return (
    <canvas ref={ref} aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60" />
  );
}

/* ---------------- Boot Loader ---------------- */
const BOOT_LINES = [
  "Initializing AI Portfolio...",
  "Loading Research Data...",
  "Connecting Neural Networks...",
  "Entering System...",
];
export function BootLoader({ done }: { done: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setStep((s) => (s < BOOT_LINES.length - 1 ? s + 1 : s)), 600);
    return () => clearInterval(t);
  }, [done]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="h-36 w-36 rounded-full border border-dashed border-neon-cyan/40" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed border-neon-magenta/40" />
            <motion.div
              animate={{ textShadow: [
                "0 0 12px oklch(0.85 0.18 200 / 0.8), 0 0 28px oklch(0.7 0.28 330 / 0.6)",
                "0 0 24px oklch(0.85 0.18 200 / 1), 0 0 50px oklch(0.7 0.28 330 / 0.9)",
                "0 0 12px oklch(0.85 0.18 200 / 0.8), 0 0 28px oklch(0.7 0.28 330 / 0.6)",
              ]}}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-gradient">
              AG
            </motion.div>
          </div>
          <div className="font-mono text-xs">
            {BOOT_LINES.map((l, i) => (
              <div key={l} className={`flex items-center gap-2 transition-opacity ${i <= step ? "opacity-100" : "opacity-30"}`}>
                <span className="text-neon-cyan">{i <= step ? "✓" : "·"}</span>
                <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Terminal Section ---------------- */
const TERM = [
  { cmd: "whoami", out: "Akshaya Gurajala" },
  { cmd: "role", out: "AI Research Intern" },
  { cmd: "focus", out: "Computer Vision, Deep Learning, AI Systems" },
  { cmd: "current_research", out: "Vision Transformers and Autonomous Perception" },
  { cmd: "location", out: "Andhra Pradesh, India" },
];
function useTyped(text: string, start: boolean, speed = 22) {
  const [t, setT] = useState("");
  useEffect(() => {
    if (!start) return;
    setT(""); let i = 0;
    const id = setInterval(() => {
      i++; setT(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return t;
}
function TermLine({ cmd, out, idx, active, onDone }: { cmd: string; out: string; idx: number; active: boolean; onDone: () => void }) {
  const c = useTyped(cmd, active);
  const showOut = c === cmd;
  const o = useTyped(out, showOut, 14);
  useEffect(() => { if (showOut && o === out) { const t = setTimeout(onDone, 350); return () => clearTimeout(t); } }, [showOut, o, out, onDone]);
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-neon-lime">akshaya@ai-lab</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-neon-cyan">~/portfolio</span>
        <span className="text-muted-foreground">$</span>
        <span className="text-foreground">{c}{active && c.length < cmd.length && <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-neon-cyan align-middle" />}</span>
      </div>
      {showOut && (
        <div className="ml-4 mt-1 pl-3 border-l border-neon-magenta/40 font-mono text-sm text-muted-foreground">
          <span className="text-foreground">{o}</span>
          {o.length < out.length && <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-neon-magenta align-middle" />}
        </div>
      )}
    </div>
  );
}
export function TerminalSection() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setStart(true); o.disconnect(); } }));
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <section id="terminal" className="relative py-24" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="overflow-hidden rounded-3xl glass-strong shadow-[var(--shadow-elevated)]">
          <div className="flex items-center justify-between border-b border-border/60 bg-white/[0.03] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-xs text-muted-foreground">~ akshaya@ai-lab — zsh</div>
            <div className="font-mono text-[10px] text-neon-cyan">● live</div>
          </div>
          <div className="p-6 sm:p-8 min-h-[360px]">
            {start && TERM.slice(0, i + 1).map((t, k) => (
              <TermLine key={t.cmd} cmd={t.cmd} out={t.out} idx={k} active={k === i}
                onDone={() => k === i && i < TERM.length - 1 && setI(i + 1)} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Research Interests ---------------- */
const INTERESTS = [
  { t: "Computer Vision", d: "Perception, segmentation & scene understanding.", icon: Eye, c: "from-neon-cyan to-sky-500" },
  { t: "Object Detection", d: "YOLO family, DETR & real-time pipelines.", icon: Box, c: "from-neon-magenta to-pink-500" },
  { t: "Vision Transformers", d: "ViT, SAM-2, attention-based perception.", icon: Brain, c: "from-neon-violet to-purple-500" },
  { t: "Deep Learning", d: "CNNs, transformers, generative models.", icon: Cpu, c: "from-neon-lime to-emerald-500" },
  { t: "Autonomous Systems", d: "Self-driving perception & tracking stacks.", icon: Car, c: "from-orange-400 to-neon-magenta" },
  { t: "Edge AI", d: "ONNX + TensorRT inference for real-time edge.", icon: Zap, c: "from-yellow-300 to-neon-lime" },
];
export function ResearchInterests() {
  return (
    <section id="research-interests" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-neon-cyan" /> research
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Research interests</h2>
          <p className="mt-3 text-muted-foreground">The problems I love thinking about.</p>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS.map((x, i) => {
            const I = x.icon;
            return (
              <motion.div key={x.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass-strong p-6 transition-shadow hover:shadow-[var(--shadow-neon)]">
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${x.c} opacity-0 blur transition-opacity duration-500 group-hover:opacity-40`} />
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-60"
                  style={{ backgroundImage: "linear-gradient(135deg, oklch(0.85 0.18 200), oklch(0.7 0.28 330))" }} />
                <div className="relative">
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${x.c} text-background`}>
                    <I className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-display text-lg font-semibold">{x.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tech Orbit ---------------- */
const ORBIT_TECH = ["Python", "PyTorch", "OpenCV", "YOLOv11", "TensorFlow", "Flask", "React", "SQL"];
export function TechOrbit({ avatarUrl }: { avatarUrl: string }) {
  return (
    <section id="tech-orbit" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-neon-magenta" /> stack
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">My orbit of tools</h2>
        </motion.div>
        <div className="relative mx-auto grid place-items-center" style={{ height: 520 }}>
          {[200, 260].map((r, ringIdx) => (
            <div key={r} className="absolute rounded-full border border-dashed border-white/10"
              style={{ width: r * 2, height: r * 2 }}>
              <motion.div animate={{ rotate: ringIdx === 0 ? 360 : -360 }} transition={{ duration: ringIdx === 0 ? 28 : 36, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0">
                {ORBIT_TECH.slice(ringIdx * 4, ringIdx * 4 + 4).map((tech, i, arr) => {
                  const angle = (i / arr.length) * 360;
                  return (
                    <div key={tech} className="absolute left-1/2 top-1/2"
                      style={{ transform: `rotate(${angle}deg) translateX(${r}px) rotate(-${angle}deg) translate(-50%,-50%)` }}>
                      <motion.div animate={{ rotate: ringIdx === 0 ? -360 : 360 }} transition={{ duration: ringIdx === 0 ? 28 : 36, repeat: Infinity, ease: "linear" }}
                        className="rounded-2xl glass-strong px-3 py-2 font-mono text-xs whitespace-nowrap shadow-[var(--shadow-neon)]">
                        {tech}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ))}
          <div className="relative h-44 w-44 overflow-hidden rounded-full glass-strong p-1.5 shadow-[var(--shadow-neon)]">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-neon-cyan via-neon-magenta to-neon-violet opacity-60 blur-md" />
            <img src={avatarUrl} alt="Akshaya" className="relative h-full w-full rounded-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Live Projects (compact deck) ---------------- */
const LIVE = [
  {
    t: "MnemoSphere", tag: "LLM · Knowledge",
    d: "AI knowledge platform: stores web resources, summarizes, extracts keywords, semantic Q&A.",
    stack: ["Python", "SQLite", "Groq", "BS4"],
    icon: Brain, gradient: "from-neon-magenta/30 to-neon-violet/20",
    live: "https://mnemosphere.onrender.com",
    repo: "https://github.com/akshayagurajala",
  },
  {
    t: "ASH Self Drive Cars", tag: "Full Stack",
    d: "Production car-rental platform with auth, bookings, and a polished responsive UI.",
    stack: ["React", "TS", "Supabase", "Vercel"],
    icon: Car, gradient: "from-neon-violet/30 to-neon-cyan/20",
    live: "https://ash-self-drive-cars-278kclab9-akshayagurajalas-projects.vercel.app/",
    repo: "https://github.com/akshayagurajala",
  },
];
export function LiveProjects() {
  return (
    <section id="live-projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-neon-lime opacity-75" /><span className="relative h-2 w-2 rounded-full bg-neon-lime" /></span>
            live deployments
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Live projects</h2>
          <p className="mt-3 text-muted-foreground">Shipped, running, and open to feedback.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          {LIVE.map((p, i) => {
            const I = p.icon;
            const openExternal = (url: string) => (e: React.MouseEvent) => {
              e.preventDefault();
              window.open(url, "_blank", "noopener,noreferrer");
            };
            return (
              <motion.article key={p.t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative overflow-hidden rounded-3xl glass-strong p-6 transition-shadow hover:shadow-[var(--shadow-neon)]">
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${p.gradient} opacity-0 blur transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient}`}>
                    <img src={`https://image.thum.io/get/width/900/crop/600/noanimate/${p.live}`} alt={p.t} loading="lazy" referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                    <div className="absolute inset-0 grid place-items-center opacity-30 group-hover:opacity-0 transition-opacity">
                      <I className="h-14 w-14 text-foreground/80" />
                    </div>
                    <div className="absolute left-3 top-3 rounded-full glass px-2.5 py-0.5 font-mono text-[10px]">{p.tag}</div>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{p.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.d}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-border/60 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={openExternal(p.live)}
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-3 py-1.5 text-xs font-medium text-background shadow-[var(--shadow-neon)] hover:scale-105 transition-transform">
                      <ExternalLink className="h-3 w-3" /> Live Demo
                    </a>
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" onClick={openExternal(p.repo)}
                      className="inline-flex items-center gap-1 rounded-full glass px-3 py-1.5 text-xs hover:bg-white/10 transition-colors">
                      <Github className="h-3 w-3" /> Source
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Research Timeline ---------------- */
const R_TIMELINE = [
  { y: "2023", t: "Started B.Tech CSE", d: "Began my CS journey at Adikavi Nannaya University." },
  { y: "2024", t: "Machine Learning Projects", d: "Built first ML pipelines, recommenders, and CV experiments." },
  { y: "2025", t: "AI Development", d: "Shipped MnemoSphere, ASH Self Drive Cars, and DevError Decoder." },
  { y: "2026", t: "Research Internship", d: "Computer vision & autonomous perception at IIT Tirupati." },
  { y: "Future", t: "AI Research Engineer", d: "Building the next generation of perception systems." },
];
export function ResearchTimeline() {
  return (
    <section id="timeline" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-neon-violet" /> timeline
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Research timeline</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-violet md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-violet md:hidden" />
          <div className="space-y-10">
            {R_TIMELINE.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div key={t.y} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`relative grid md:grid-cols-2 md:gap-10 ${left ? "" : "md:[&>*:first-child]:order-2"}`}>
                  <div className={`pl-12 md:pl-0 ${left ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <div className="rounded-2xl glass-strong p-5 transition hover:shadow-[var(--shadow-neon)]">
                      <div className="font-mono text-xs text-neon-cyan">{t.y}</div>
                      <div className="mt-1 font-display text-lg font-semibold">{t.t}</div>
                      <p className="mt-1.5 text-sm text-muted-foreground">{t.d}</p>
                    </div>
                  </div>
                  <div />
                  <div className="absolute left-4 top-5 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta shadow-[var(--shadow-neon)] md:left-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Publications ---------------- */
const PUBS = [
  { kind: "Research Paper", t: "DevError Decoder: AI-Based Multi-Language Debugging System", d: "A multi-language framework combining rule-based error analysis with Ollama-powered AI explanations for Python, Java and C.", status: "Authored", icon: FileText },
  { kind: "Technical Report", t: "Elective Course Recommendation using Random Forest + Cosine Similarity", d: "Summer research at NIT Warangal proposing a hybrid recommender over multi-semester academic data.", status: "Internal", icon: BookOpen },
  { kind: "Ongoing Research", t: "Vision Transformers & YOLO-based Autonomous Perception", d: "Exploring ViT, SAM-2, YOLOv11 and BoT-SORT for real-time edge perception at IIT Tirupati.", status: "In progress", icon: Sparkles },
];
export function Publications() {
  return (
    <section id="publications" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-neon-cyan" /> publications
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Research & publications</h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {PUBS.map((p, i) => {
            const I = p.icon;
            return (
              <motion.div key={p.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass-strong p-6 transition-shadow hover:shadow-[var(--shadow-neon)]">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-neon-cyan/30 via-transparent to-neon-magenta/30 opacity-0 blur transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
                      <I className="h-4 w-4" />
                    </div>
                    <span className="rounded-full border border-border/60 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{p.status}</span>
                  </div>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-neon-cyan">{p.kind}</div>
                  <h3 className="mt-1 font-display text-base font-semibold leading-snug">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Currently Learning ---------------- */
const LEARNING = ["Vision Transformers", "YOLO-World", "TensorRT", "Edge AI", "Autonomous Driving", "LLM Applications"];
export function CurrentlyLearning() {
  return (
    <section id="learning" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-neon-lime" /> always learning
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Currently exploring</h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {LEARNING.map((l, i) => (
            <motion.span key={l} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring" }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="group relative cursor-default overflow-hidden rounded-full glass-strong px-5 py-2.5 font-mono text-sm">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                <Wrench className="h-3.5 w-3.5 text-neon-cyan" />
                {l}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI Assistant Widget ---------------- */
type Msg = { role: "user" | "bot"; text: string };
const QA: { q: string; a: string }[] = [
  { q: "Tell me about Akshaya.", a: "Akshaya Gurajala is a B.Tech CSE student at Adikavi Nannaya University (CGPA 8.6) and a Research Intern at IIT Tirupati working on computer vision, deep learning and autonomous perception." },
  { q: "Explain his projects.", a: "Featured work: DevError Decoder (AI debugger, paper authored), MnemoSphere (LLM knowledge platform), ASH Self Drive Cars (full-stack car rental), and an Elective Recommendation System built at NIT Warangal." },
  { q: "What technologies does he use?", a: "Python, PyTorch, OpenCV, YOLOv11, TensorFlow, Flask, React, TypeScript, Supabase and SQL — plus ONNX/TensorRT for edge inference." },
  { q: "What is his research area?", a: "Vision Transformers, object detection (YOLO/SAM-2), tracking (BoT-SORT) and autonomous perception with a focus on real-time edge deployment." },
];
export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm AG-bot — ask me anything about Akshaya." },
  ]);
  const ask = (q: string) => {
    const hit = QA.find((x) => x.q === q);
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: hit?.a ?? "Try one of the suggested questions ✨" }]), 400);
  };
  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background shadow-[var(--shadow-neon)]"
        aria-label="AI assistant">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MessageSquare className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-neon-cyan/30" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[70] w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-3xl glass-strong shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-background">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold">AG-bot</div>
                  <div className="font-mono text-[10px] text-neon-lime">● online</div>
                </div>
              </div>
            </div>
            <div className="max-h-72 space-y-2 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-gradient-to-br from-neon-cyan to-neon-magenta text-background" : "bg-white/[0.06] text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/60 p-3">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Try asking</div>
              <div className="flex flex-wrap gap-1.5">
                {QA.map((x) => (
                  <button key={x.q} onClick={() => ask(x.q)}
                    className="rounded-full border border-border/60 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-neon-cyan/60 hover:bg-white/[0.06] hover:text-foreground">
                    {x.q}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-full glass px-3 py-1.5">
                <input disabled placeholder="Pick a suggested question…" className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground" />
                <Send className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
