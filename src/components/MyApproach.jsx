import { HudPanel } from "./HudPanel";
import { SectionHeader } from "./SectionHeader";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { BarChart } from "./motion/BarChart";
import { ProgressRing } from "./motion/ProgressRing";
import { SkillBar } from "./motion/SkillBar";

const metrics = [
  { label: "Projects", value: 55, suffix: "+" },
  { label: "Years", value: 9, suffix: "+" },
  { label: "Clients", value: 35, suffix: "+" },
  { label: "Reply", value: 24, prefix: "< ", suffix: "h" },
];

const shippingBars = [
  { label: "W1", value: 16 },
  { label: "W2", value: 32 },
  { label: "W3", value: 24 },
  { label: "W4", value: 60 },
  { label: "W5", value: 48 },
  { label: "W6", value: 84 },
  { label: "W7", value: 68 },
  { label: "W8", value: 100 },
  { label: "W9", value: 88 },
];

const principles = [
  {
    number: "01",
    title: "Clarity",
    description: "Simple systems are easier to evolve.",
    note: "01 / Simple & explicit",
  },
  {
    number: "02",
    title: "Scalability",
    description: "Design for growth from the beginning.",
    note: "02 / Scale with intent",
  },
  {
    number: "03",
    title: "Security",
    description: "Security belongs in every layer.",
    note: "03 / Defense in depth",
  },
  {
    number: "04",
    title: "Performance",
    description: "Fast systems create better products.",
    note: "04 / Fast by design",
  },
  {
    number: "05",
    title: "Automation",
    description: "Automate what should never be manual.",
    note: "05 / Automate the repeatable",
  },
];

const weights = [
  { label: "Product clarity", level: "90%" },
  { label: "Delivery cadence", level: "86%" },
];

export default function MyApproach() {
  return (
    <section id="approach" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6">
        <SectionHeader
          tone="green"
          title="Observability & performance"
          description="Measure / visualize / optimize / survive"
        />

        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <HudPanel className="p-5 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Metrics</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Shipped work
            </p>
            <ul className="mt-4">
              {metrics.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between border-b border-primary/10 py-2 text-sm"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-primary">
                    <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                  </span>
                </li>
              ))}
            </ul>
          </HudPanel>

          <HudPanel className="p-5 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Visualization</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Shipping rhythm
            </p>
            <BarChart data={shippingBars} viewBox="0 0 240 90" className="mt-6 h-24 w-full" label="Shipping rhythm" />
          </HudPanel>

          <HudPanel className="p-5 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Performance</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              How the work is weighted
            </p>
            <div className="mt-6 space-y-4">
              {weights.map((item, index) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-primary">High</span>
                  </div>
                  <SkillBar
                    value={item.level}
                    delay={index * 500}
                    loop
                    trackClassName="h-1.5"
                  />
                </div>
              ))}
            </div>
          </HudPanel>

          <HudPanel className="flex flex-col items-center p-5 text-center">
            <h3 className="self-start text-sm font-semibold uppercase tracking-[0.16em]">Reliability</h3>
            <p className="mt-1 self-start font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Health / reply / recover
            </p>
            <ProgressRing value={0.86} className="relative mt-4 h-28 w-28">
              <AnimatedCounter value={24} prefix="< " suffix="h" />
            </ProgressRing>
          </HudPanel>
        </div>

        <SectionHeader
          tone="green"
          title="Engineering philosophy"
          description="Principles for building systems that last"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((principle) => (
            <HudPanel key={principle.number} className="p-5 text-left">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-primary">{principle.number}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-primary/70">
                {principle.note}
              </p>
            </HudPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
