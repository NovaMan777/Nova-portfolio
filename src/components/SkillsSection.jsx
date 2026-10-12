import { Cloud, Database, Monitor, Server } from "lucide-react";
import { HudPanel } from "./HudPanel";
import { SectionHeader } from "./SectionHeader";
import { PulseIcon } from "./motion/PulseIcon";
import { SkillBar } from "./motion/SkillBar";
import { motion } from "@/lib/motion";

import cssIcon from "@/assets/icons/css.png";
import dockerIcon from "@/assets/icons/docker.png";
import expressIcon from "@/assets/icons/express.png";
import githubIcon from "@/assets/icons/github.png";
import graphqlIcon from "@/assets/icons/graphql.png";
import jsIcon from "@/assets/icons/javascript.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import nextjsIcon from "@/assets/icons/nextjs.png";
import nodejsIcon from "@/assets/icons/nodejs.png";
import postgresqlIcon from "@/assets/icons/postgresql.png";
import pythonIcon from "@/assets/icons/python.png";
import reactIcon from "@/assets/icons/react.png";
import tsIcon from "@/assets/icons/typescript.png";
import webflowIcon from "@/assets/icons/webflow.png";

const domains = [
  {
    index: "01",
    kicker: "Interface",
    title: "Frontend",
    subtitle: "Experience · components · interaction",
    icon: Monitor,
    chips: [
      { icon: reactIcon, label: "RE" },
      { icon: nextjsIcon, label: "N" },
      { icon: tsIcon, label: "TS" },
      { icon: jsIcon, label: "JS" },
      { icon: cssIcon, label: "CSS" },
      { icon: webflowIcon, label: "WF" },
    ],
    columns: [
      ["React", "TypeScript", "Next.js", "JavaScript"],
      ["Tailwind", "Sass / CSS", "Webflow", "HTML"],
    ],
    statusLabel: "Build status",
    status: "Components online",
    level: "92%",
  },
  {
    index: "02",
    kicker: "Logic",
    title: "Backend",
    subtitle: "APIs · services · distributed systems",
    icon: Server,
    chips: [
      { icon: nodejsIcon, label: "JS" },
      { icon: pythonIcon, label: "PY" },
      { icon: expressIcon, label: "EX" },
      { icon: graphqlIcon, label: "GQL" },
    ],
    columns: [
      ["Node.js", "Express", "Python", "Java"],
      ["GraphQL", "REST APIs", "Auth", "Workers"],
    ],
    statusLabel: "Request flow",
    status: "Services synchronized",
    level: "88%",
  },
  {
    index: "03",
    kicker: "Knowledge",
    title: "Data",
    subtitle: "Persistence · caching · modeling",
    icon: Database,
    chips: [
      { icon: postgresqlIcon, label: "PG" },
      { icon: mongodbIcon, label: "MDB" },
    ],
    columns: [
      ["PostgreSQL", "MongoDB", "MySQL", "SQL"],
      ["Firebase", "Data modeling", "Query design", "Performance"],
    ],
    statusLabel: "Data pipeline",
    status: "Streams healthy",
    level: "84%",
  },
  {
    index: "04",
    kicker: "Infrastructure",
    title: "Cloud",
    subtitle: "Scale · containers · automation",
    icon: Cloud,
    chips: [
      { icon: dockerIcon, label: "DOC" },
      { icon: githubIcon, label: "GH" },
    ],
    columns: [
      ["AWS", "Vercel", "Docker", "GitHub"],
      ["Git", "CI / CD", "Clerk", "VS Code"],
    ],
    statusLabel: "Deployment",
    status: "Delivery ready",
    level: "90%",
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6">
        <SectionHeader
          title="Technology universe"
          description="Engineering stack / systems / infrastructure / intelligence"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {domains.map((domain, index) => (
            <HudPanel key={domain.title} className="flex flex-col p-5 text-left">
              <div className="mb-4 flex items-start justify-between">
                <p className="hud-kicker">
                  {domain.index} / {domain.kicker}
                </p>
                <PulseIcon icon={domain.icon} className="h-5 w-5 text-primary" delay={index * 450} />
              </div>
              <h3 className="text-2xl font-semibold uppercase tracking-[0.08em]">{domain.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{domain.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {domain.chips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/5 px-2 py-1"
                  >
                    <img src={chip.icon} alt="" className="h-3.5 w-3.5 rounded-sm bg-white object-contain" />
                    <span className="font-mono text-[10px] tracking-wider text-primary">{chip.label}</span>
                  </span>
                ))}
              </div>

              <div className="mt-5 grid flex-1 grid-cols-2 gap-x-3 text-sm text-muted-foreground">
                {domain.columns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="space-y-1.5">
                    {column.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>

              <div className="mt-5 border-t border-primary/15 pt-3">
                <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <span className="text-muted-foreground">{domain.statusLabel}</span>
                  <span className="text-right text-primary">{domain.status}</span>
                </div>
                <SkillBar
                  value={domain.level}
                  delay={index * motion.skill.stagger}
                  trackClassName="h-1"
                  className="shadow-[0_0_12px_hsl(var(--primary))]"
                />
              </div>
            </HudPanel>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
          Systems connected · 4 domains · build · ship · scale
        </p>
      </div>
    </section>
  );
};
