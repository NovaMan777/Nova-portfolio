import { useState } from "react";
import {
  Briefcase,
  Code,
  User,
  Download,
  Calendar,
  Target,
  Mail,
  Star,
  Github,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const achievements = [
    { number: "55+", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
    { number: "7+", label: "Years", icon: <Calendar className="h-4 w-4" /> },
    { number: "35+", label: "Clients", icon: <User className="h-4 w-4" /> },
    { number: "24h", label: "Response", icon: <Target className="h-4 w-4" /> },
  ];

  const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Webflow"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Java", "REST & GraphQL"] },
    { category: "Cloud & Data", items: ["AWS", "Docker", "Vercel", "MongoDB", "PostgreSQL"] },
  ];

  const features = [
    "End-to-end product ownership",
    "Clean, maintainable architecture",
    "Performance-first delivery",
    "Clear, async-friendly communication",
    "Thoughtful UX collaboration",
    "Reliable timelines",
  ];

  const socialLinks = [
    { icon: <Mail className="h-4 w-4" />, href: "mailto:uigraslasu@gmail.com", label: "Email" },
    { icon: <Github className="h-4 w-4" />, href: "https://www.github.com/tomas0502", label: "GitHub" },
    { icon: <Send className="h-4 w-4" />, href: "https://t.me/TomasCooper1004", label: "Telegram" },
  ];

  const tabContent = {
    personal:
      "I care as much about the product as the code. When I'm not shipping, I'm exploring new tools, contributing to open source, and mentoring developers who are just getting started.",
    professional:
      "Over 7 years I've delivered 55+ products — from early MVPs to production systems that need to scale. I specialize in React, Node.js, and architectures that stay maintainable as teams grow.",
    approach:
      "I start with the problem, not the stack. Clear communication, iterative delivery, and production-quality code are non-negotiable. You'll always know where the work stands.",
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Tomas-resume.pdf";
    link.download = "Tomas-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="relative py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="About"
          title="A builder who sweats"
          highlight="the details."
          description="Digital products that feel considered — combining performance, clarity, and a bit of craft."
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border border-border shadow-lg">
                    <img
                      src="/profile-logo.png"
                      alt="Tomas Cooper"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-4 border-card" />
                </div>

                <div className="flex-1 w-full text-center md:text-left">
                  <h3 className="text-2xl font-semibold tracking-tight">Tomas Cooper</h3>
                  <p className="text-primary font-medium mt-0.5">Full-Stack Engineer</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                    {achievements.map((item) => (
                      <div
                        key={item.label}
                        className="p-3 rounded-xl bg-muted/60 border border-border"
                      >
                        <div className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground mb-1">
                          {item.icon}
                        </div>
                        <div className="font-semibold">{item.number}</div>
                        <div className="text-[11px] text-muted-foreground">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex border-b border-border mb-5">
                {["personal", "professional", "approach"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[96px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {tabContent[activeTab]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 text-left">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Stack at a glance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {techStack.map((stack) => (
                  <div
                    key={stack.category}
                    className="bg-muted/40 border border-border rounded-2xl p-5"
                  >
                    <h4 className="font-medium mb-3">{stack.category}</h4>
                    <ul className="space-y-1.5">
                      {stack.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 text-left">
              <h3 className="text-lg font-semibold mb-4">Let&apos;s work together</h3>
              <div className="flex flex-col gap-3">
                <a href="#contact" className="cosmic-button w-full">
                  <User className="h-4 w-4" />
                  Contact me
                </a>
                <button onClick={handleDownload} className="cursor-pointer btn-ghost w-full">
                  <Download className="h-4 w-4" />
                  Download resume
                </button>
              </div>
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Quick connect
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 text-left">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                How I show up
              </h3>
              <ul className="space-y-2.5">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-3xl p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-medium">Open to work</span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                New projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
