import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Award, GraduationCap, Mail, Phone, Briefcase, Trophy, Send, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, skills, certifications, education, achievements, emailConfig } from "@/data/portfolio";
import bioPortrait from "@/assets/bio_portrait.png.asset.json";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24 px-6 py-14 md:px-14"
    >
      <h2 className="mb-6 font-display text-4xl tracking-wide md:text-5xl">{title}</h2>
      {children}
    </motion.section>
  );
}

export function About() {
  return (
    <Section id="about" title="About Me">
      <>
        <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
          <img src={bioPortrait.url} alt="Guru Naveen Badvel portrait" className="aspect-[3/4] w-full max-w-[280px] rounded-md object-cover shadow-glow" />
          <div>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>
            <p className="mt-4 text-sm uppercase tracking-widest text-primary">{profile.location}</p>
          </div>
        </div>
      </>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="rounded-md bg-card p-5 transition hover:-translate-y-1 hover:bg-accent">
            <h3 className="mb-3 font-bold text-primary">{s.group}</h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((i) => (
                <span key={i} className="rounded-sm bg-secondary px-2 py-1 text-sm">{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section id="certifications" title="Training & Certifications">
      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((c) => (
          <div key={c.title} className="flex gap-4 rounded-md bg-card p-5">
            <Award className="mt-1 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <h3 className="font-bold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.issuer} · {c.date}</p>
              {c.detail && <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>}
              <Button asChild variant="outline" size="sm" className="mt-4"><a href={c.url} target="_blank" rel="noopener noreferrer"><ExternalLink />View Certificate</a></Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-4">
        {education.map((e) => (
          <div key={e.degree} className="flex gap-4 border-l-4 border-primary bg-card p-5">
            <GraduationCap className="mt-1 shrink-0 text-primary" />
            <div>
              <h3 className="font-bold">{e.degree}</h3>
              <p className="text-muted-foreground">{e.school}</p>
              <p className="text-sm text-muted-foreground">{e.years} · {e.score}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a) => (
          <div key={a.title} className="rounded-md bg-card p-6">
            <Trophy className="mb-3 text-primary" />
            <p className="font-display text-3xl text-primary">{a.stat}</p>
            <h3 className="font-bold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

type Status = { kind: "idle" | "sending" | "success" | "error"; msg?: string };

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ kind: "error", msg: "Please fill in your name, email and message." });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus({ kind: "error", msg: "Please enter a valid email address." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        { from_name: form.name, from_email: form.email, message: form.message, to_email: emailConfig.toEmail },
        { publicKey: emailConfig.publicKey },
      );
      if (res.status !== 200) throw new Error(res.text);
      setStatus({ kind: "success", msg: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const detail = (err as { text?: string })?.text ?? (err instanceof Error ? err.message : "");
      console.error("EmailJS send failed:", err);
      setStatus({ kind: "error", msg: `Sorry, the message couldn't be sent${detail ? ` (${detail})` : ""}. Please email me directly at ${profile.email}.` });
    }
  }

  const input = "w-full rounded-sm border border-input bg-secondary px-4 py-3 outline-none focus:border-primary";
  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-muted-foreground">Open to Data Analyst and Business Intelligence roles. Let's talk.</p>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-primary"><Mail className="text-primary" />{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-primary"><Phone className="text-primary" />{profile.phone}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary"><Briefcase className="text-primary" />LinkedIn</a>
        </div>
        <form onSubmit={onSubmit} noValidate className="space-y-3">
          <input className={input} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className={input} type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <textarea className={`${input} min-h-32`} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button disabled={status.kind === "sending"} className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:shadow-glow disabled:opacity-60">
            {status.kind === "sending" ? <><Loader2 className="animate-spin" size={18} />Sending…</> : <><Send size={18} />Send Message</>}
          </button>
          {status.msg && (
            <p role="status" className={status.kind === "success" ? "text-success" : "text-destructive"}>{status.msg}</p>
          )}
        </form>
      </div>
    </Section>
  );
}
