import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X, Play, Info, Briefcase, BarChart3, Cpu, Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadResume, resume } from "@/lib/resume";
import { About, Achievements, Certifications, Contact, Education, Skills } from "@/components/portfolio/Sections";
import { ProjectModal, ProjectRow } from "@/components/portfolio/Projects";
import { profile, projects, type Project } from "@/data/portfolio";
import photo from "@/assets/guru.png.asset.json";
import { ChatAssistant } from "@/components/portfolio/ChatAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guru Naveen Badvel — Data Analyst Portfolio" },
      { name: "description", content: "Data Analyst skilled in SQL, Excel, Power BI and Python. Projects, skills, certifications and contact." },
      { property: "og:title", content: "Guru Naveen Badvel — Data Analyst Portfolio" },
      { property: "og:description", content: "Data Analyst skilled in SQL, Excel, Power BI and Python." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const profiles = [
  { id: "recruiter", label: "Recruiter", icon: Briefcase, start: "about" },
  { id: "data", label: "Data Enthusiast", icon: BarChart3, start: "projects" },
  { id: "tech", label: "Technical Explorer", icon: Cpu, start: "skills" },
] as const;

const nav = ["about", "projects", "skills", "certifications", "education", "achievements", "contact"];

function Index() {
  const [stage, setStage] = useState<"intro" | "profiles" | "browse">("intro");
  const [who, setWho] = useState<(typeof profiles)[number] | null>(null);

  useEffect(() => {
    if (stage !== "intro") return;
    const t = setTimeout(() => setStage("profiles"), 2200);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <AnimatePresence mode="wait">
      {stage === "intro" && (
        <motion.div key="intro" exit={{ opacity: 0 }} className="flex min-h-screen items-center justify-center" onClick={() => setStage("profiles")}>
          <motion.h1 initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="font-display text-7xl tracking-wider text-primary drop-shadow-[0_0_30px_var(--primary)] md:text-9xl">
            GURU NAVEEN
          </motion.h1>
        </motion.div>
      )}
      {stage === "profiles" && (
        <motion.div key="profiles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex min-h-screen flex-col items-center justify-center gap-10 px-6">
          <h1 className="text-center text-3xl font-medium md:text-5xl">Who's watching?</h1>
          <div className="flex flex-wrap justify-center gap-8">
            {profiles.map((p, i) => (
              <motion.button key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.15 }}
                onClick={() => { setWho(p); setStage("browse"); }} className="group flex flex-col items-center gap-3">
                <span className="flex h-28 w-28 items-center justify-center rounded-md bg-card ring-foreground transition group-hover:ring-4 md:h-36 md:w-36">
                  <p.icon size={48} className="text-primary" />
                </span>
                <span className="text-muted-foreground group-hover:text-foreground">{p.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
      {stage === "browse" && <Browse key="browse" start={who?.start ?? "about"} who={who?.label ?? ""} onSwitch={() => setStage("profiles")} />}
    </AnimatePresence>
  );
}

function Browse({ start, who, onSwitch }: { start: string; who: string; onSwitch: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Project | null>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [resumeError, setResumeError] = useState("");

  async function onDownloadResume() {
    if (downloading) return;
    setDownloading(true);
    setResumeError("");
    try { await downloadResume(); }
    catch (error) { setResumeError(error instanceof Error ? error.message : "Please try View Resume."); }
    finally { setDownloading(false); }
  }

  useEffect(() => {
    if (start !== "about") setTimeout(() => document.getElementById(start)?.scrollIntoView(), 300);
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, [start]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return projects.filter((p) => !s || [p.title, p.tool, p.description, ...p.tech].join(" ").toLowerCase().includes(s));
  }, [q]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className={`fixed inset-x-0 top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 transition sm:flex md:px-14 ${scrolled ? "bg-background" : "bg-gradient-to-b from-background to-transparent"}`}>
        <span className="font-display text-3xl tracking-wider text-primary">GURU</span>
        <nav className="hidden gap-5 text-sm lg:flex">
          {nav.map((n) => <a key={n} href={`#${n}`} className="capitalize text-muted-foreground hover:text-foreground">{n}</a>)}
        </nav>
        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-3">
          <label className="flex items-center gap-2 rounded-sm border border-input bg-background/60 px-3 py-1.5">
            <Search size={16} />
            <input value={q} onChange={(e) => { setQ(e.target.value); document.getElementById("projects")?.scrollIntoView(); }} placeholder="Search projects" className="w-28 bg-transparent text-sm outline-none md:w-44" />
          </label>
          <button onClick={onSwitch} title={`Profile: ${who} — switch`} className="hidden rounded-sm bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground sm:block">{who}</button>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-0 top-16 z-30 flex flex-col bg-popover px-6 py-4 lg:hidden">
            {nav.map((n) => <a key={n} href={`#${n}`} onClick={() => setMenu(false)} className="py-2 capitalize">{n}</a>)}
            <button onClick={onSwitch} className="py-2 text-left text-primary">Switch profile</button>
          </motion.nav>
        )}
      </AnimatePresence>

      <section className="portfolio-hero relative flex min-h-[90vh] items-end overflow-hidden">
        <img src={photo.url} alt="Guru Naveen Badvel portrait" className="hero-portrait absolute right-0 top-0 h-full w-full object-contain object-center opacity-75 grayscale md:w-1/2 md:object-right" />
        <div className="absolute inset-0 hidden bg-side md:block" />
        <div className="absolute inset-0 hidden bg-fade md:block" />
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="hero-copy relative z-10 max-w-2xl px-6 pb-20 pt-28 md:px-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">A Data Analyst Original</p>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">{profile.name}</h1>
          <p className="mt-3 text-lg">{profile.tagline}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-3 font-bold text-background hover:opacity-80"><Play size={20} />View Projects</a>
            <a href="#about" className="inline-flex items-center gap-2 rounded-sm bg-secondary/80 px-6 py-3 font-bold hover:bg-accent"><Info size={20} />More Info</a>
            <Button onClick={onDownloadResume} disabled={downloading} size="lg" className="h-12 rounded-sm px-6 font-bold">{downloading ? <Loader2 className="animate-spin" /> : <Download />}Download Resume</Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-sm px-6"><a href={resume.url} target="_blank" rel="noopener noreferrer"><FileText />View Resume</a></Button>
          </div>
          {resumeError && <p role="alert" className="mt-3 text-destructive">{resumeError}</p>}
        </motion.div>
      </section>

      <section id="projects" className="scroll-mt-24 py-10">
        <h2 className="mb-6 px-6 font-display text-4xl tracking-wide md:px-14 md:text-5xl">Projects</h2>
        {q && !filtered.length && <p className="px-6 text-muted-foreground md:px-14">No projects match "{q}".</p>}
        {q ? <ProjectRow title={`Results for "${q}"`} items={filtered} onOpen={setOpen} /> : (
          <>
            <ProjectRow title="Trending Now" items={projects} onOpen={setOpen} />
            <ProjectRow title="BI Dashboards" items={projects.filter((p) => p.category === "BI Dashboards" || p.tech.includes("Power BI"))} onOpen={setOpen} />
            <ProjectRow title="Analytics & Machine Learning" items={projects.filter((p) => p.category !== "BI Dashboards")} onOpen={setOpen} />
          </>
        )}
      </section>

      <About />
      <Skills />
      <Certifications />
      <Education />
      <Achievements />
      <Contact />

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground md:px-14">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </footer>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
      <ChatAssistant />
    </motion.div>
  );
}
