import { ArrowRight, FileText, Network, Sparkles } from "lucide-react";
import { HudPanel } from "./HudPanel";
import { SectionHeader } from "./SectionHeader";
import { PulseIcon } from "./motion/PulseIcon";
import { RevealText } from "./motion/RevealText";
import { motion } from "@/lib/motion";

const panels = [
  {
    index: "01",
    kicker: "Generative intelligence",
    title: "LLM applications",
    subtitle: "Models / prompts / agents / workflows",
    icon: Network,
    status: "Inference activity",
    points: [
      ["AI-powered applications", "Intelligent automation"],
      ["LLM APIs", "AI-assisted workflows"],
      ["Prompt engineering", "Generation pipelines"],
    ],
  },
  {
    index: "02",
    kicker: "Applied products",
    title: "AI products",
    subtitle: "GenAxis / Blogni / Ntro / review tools",
    icon: FileText,
    status: "Product pipeline",
    points: [
      ["Image generation", "Document drafting"],
      ["Resume review", "Hiring workflows"],
      ["Multi-language content", "Context-aware tools"],
    ],
  },
];

export const AiSection = () => {
  return (
    <section id="ai" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-10 overflow-hidden rounded-[1.6rem] border border-primary/25 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_55%),linear-gradient(90deg,hsl(156_40%_7%),hsl(150_45%_6%))] px-6 py-8 text-center">
          <RevealText
            as="h2"
            className="text-3xl font-semibold uppercase tracking-[0.08em] text-primary sm:text-5xl"
          >
            AI engineering
          </RevealText>
          <RevealText
            as="p"
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-primary/80"
            delay={motion.text.stagger}
          >
            Intelligence / generation / automation / product
          </RevealText>
        </div>

        <SectionHeader
          eyebrow="AI system core"
          title="Where the models"
          highlight="meet the product."
          description="Generation on one side, shipped AI products on the other"
        />

        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-16 w-24 -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <div className="absolute inset-0 rounded-full bg-primary/50 blur-2xl" />
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-primary shadow-[0_0_18px_hsl(var(--primary))]" />
            <ArrowRight className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          </div>

          {panels.map((panel, index) => (
            <HudPanel key={panel.title} className="p-6 text-left sm:p-7">
              <div className="mb-6 flex items-start justify-between">
                <p className="hud-kicker">
                  {panel.index} / {panel.kicker}
                </p>
                <PulseIcon icon={panel.icon} className="h-8 w-8 text-primary" delay={index * 500} />
              </div>
              <h3 className="text-3xl font-semibold uppercase tracking-[0.06em]">{panel.title}</h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {panel.subtitle}
              </p>
              <div className="mt-6 grid gap-y-2 sm:grid-cols-2">
                {panel.points.flat().map((point) => (
                  <p key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {point}
                  </p>
                ))}
              </div>
              <div className="mt-6 border-t border-primary/15 pt-3">
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="text-muted-foreground">{panel.status}</span>
                  <span className="text-primary">Active</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full w-[86%] rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                </div>
              </div>
            </HudPanel>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Open models", "Product AI", "Automation", "Workflows"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-primary/35 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
