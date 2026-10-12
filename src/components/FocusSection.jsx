import { Cloud, Code2, Network, Sparkles } from "lucide-react";
import { HudPanel } from "./HudPanel";
import { SectionHeader } from "./SectionHeader";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { LineChart } from "./motion/LineChart";
import { PulseIcon } from "./motion/PulseIcon";

const stats = [
  { value: 9, suffix: "+", label: "Years shipping", hint: "Craft" },
  { value: 55, suffix: "+", label: "Projects delivered", hint: "Build" },
  { value: 35, suffix: "+", label: "Clients served", hint: "Partner" },
];

const focuses = [
  {
    icon: Sparkles,
    title: "AI systems",
    points: ["LLM applications", "Generation workflows", "AI automation"],
  },
  {
    icon: Cloud,
    title: "Cloud platforms",
    points: ["AWS and Vercel", "Docker", "Delivery pipelines"],
  },
  {
    icon: Code2,
    title: "Modern web",
    points: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Network,
    title: "Distributed systems",
    points: ["APIs", "Realtime products", "Event-driven work"],
  },
];

const wave = "0,48 40,44 80,50 120,36 160,40 200,32 240,42 280,28 320,38 360,30 400,36 440,24 480,34 520,30 560,40 600,28";

export const FocusSection = () => {
  return (
    <section id="focus" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6">
        <SectionHeader
          tone="green"
          title="Contribution activity"
          description="Build / contribute / ship / repeat"
        />

        <HudPanel className="mb-5 p-5">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="text-muted-foreground">Shipping rhythm</span>
            <span className="text-primary">Steady cadence</span>
          </div>
          <LineChart
            points={wave}
            viewBox="0 0 600 70"
            className="h-16 w-full"
            guide
            label="Shipping rhythm"
          />
        </HudPanel>

        <div className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <HudPanel key={stat.label} className="p-5 text-left">
              <p className="hud-kicker">{stat.hint}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-primary">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </HudPanel>
          ))}
        </div>

        <SectionHeader
          tone="green"
          title="Current focus"
          description="Active engineering domains"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {focuses.map((focus, index) => (
            <HudPanel key={focus.title} className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 text-primary">
                <PulseIcon icon={focus.icon} className="h-6 w-6" delay={index * 420} />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">{focus.title}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {focus.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </HudPanel>
          ))}
        </div>
      </div>
    </section>
  );
};
