import { AppWindow, Cloud, Cpu, Database, Download, Hexagon, Plus, Shield } from "lucide-react";
import { HudPanel } from "./HudPanel";
import { SectionHeader } from "./SectionHeader";
import { PulseIcon } from "./motion/PulseIcon";
import { motion, prefersReducedMotion } from "@/lib/motion";

const flow = [
  { icon: Plus, label: "Client application" },
  { icon: Shield, label: "API gateway" },
  { icon: Cpu, label: "Microservices" },
  { icon: Database, label: "Data layer" },
];

const modules = [
  {
    index: "01",
    kicker: "Experience",
    title: "Experience",
    subtitle: "User interface / client runtime",
    icon: AppWindow,
    chips: ["React", "Next", "Mobile"],
    points: ["React / Next.js", "Product interfaces", "Real-time UI"],
  },
  {
    index: "02",
    kicker: "Gateway",
    title: "API layer",
    subtitle: "Edge routing / security / contracts",
    icon: Hexagon,
    chips: ["REST", "GraphQL", "Auth"],
    points: ["REST / GraphQL", "Authentication", "Rate limits / routing"],
  },
  {
    index: "03",
    kicker: "Compute",
    title: "Services",
    subtitle: "Workers / events / orchestration",
    icon: Cpu,
    chips: ["Node", "Python", "Jobs"],
    points: ["Node.js services", "Event-driven workers", "Background jobs"],
  },
  {
    index: "04",
    kicker: "Persistence",
    title: "Data",
    subtitle: "Storage / cache / query performance",
    icon: Database,
    chips: ["Postgres", "Mongo", "SQL"],
    points: ["PostgreSQL / MongoDB", "Query design", "Data modeling"],
  },
  {
    index: "05",
    kicker: "Infrastructure",
    title: "Infrastructure",
    subtitle: "Cloud / containers / automation",
    icon: Cloud,
    chips: ["AWS", "Docker", "Vercel"],
    points: ["AWS / Vercel", "Docker", "CI / CD delivery"],
  },
];

export const AboutSection = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/NovaMan-resume.pdf";
    link.download = "NovaMan-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6">
        <SectionHeader
          title="System architecture"
          description="Request flow / service mesh / data / infrastructure"
        />

        <div className="mx-auto mb-8 flex max-w-xs flex-col items-stretch">
          {flow.map((item, index) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-background/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-[0_0_24px_hsl(var(--primary)/0.08)]">
                <PulseIcon icon={item.icon} className="h-3.5 w-3.5 text-primary" delay={index * 360} />
                {item.label}
              </div>
              {index < flow.length - 1 && (
                <span className="my-1 h-4 border-l border-dashed border-primary/45" />
              )}
            </div>
          ))}
        </div>

        <div className="relative mb-8 hidden xl:block">
          <div className="absolute inset-x-10 top-1/2 border-t border-dashed border-primary/30" />
          <div className="relative flex justify-between px-[8%]">
            {modules.map((module, index) => (
              <span
                key={module.index}
                className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
                style={
                  prefersReducedMotion()
                    ? undefined
                    : { animation: `motion-icon-glow ${motion.loop.icon}ms ease-in-out ${index * 360}ms infinite` }
                }
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {modules.map((module, index) => (
            <HudPanel key={module.index} className="p-4 text-left sm:p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <p className="hud-kicker">
                  {module.index} / {module.kicker}
                </p>
                <PulseIcon icon={module.icon} className="h-5 w-5 text-primary" delay={index * 280} />
              </div>
              <h3 className="text-lg font-semibold uppercase tracking-[0.08em]">{module.title}</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {module.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {module.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-primary/35 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {module.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </HudPanel>
          ))}
        </div>

        <HudPanel className="mt-6 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="text-left">
            <p className="hud-kicker">Operator</p>
            <p className="mt-1 text-lg font-semibold">
              Nova Man
              <span className="font-normal text-primary"> · Full-stack developer</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Seven years shipping product — from the interface through the API and the data underneath it.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#contact" className="cosmic-button">
              Contact
            </a>
            <button type="button" onClick={handleDownload} className="btn-ghost cursor-pointer">
              <Download className="h-4 w-4" />
              Resume
            </button>
          </div>
        </HudPanel>
      </div>
    </section>
  );
};
