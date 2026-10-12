import { HudPanel } from "./HudPanel";
import { SectionHeader } from "./SectionHeader";

const metrics = [
  ["Projects", "55+"],
  ["Years", "9+"],
  ["Clients", "35+"],
  ["Reply", "< 24h"],
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
              {metrics.map(([label, value]) => (
                <li
                  key={label}
                  className="flex items-center justify-between border-b border-primary/10 py-2 text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-primary">{value}</span>
                </li>
              ))}
            </ul>
          </HudPanel>

          <HudPanel className="p-5 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Visualization</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Shipping rhythm
            </p>
            <svg viewBox="0 0 240 90" className="mt-6 h-24 w-full text-primary" aria-hidden="true">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,70 30,62 60,66 90,48 120,54 150,36 180,44 210,28 240,34"
              />
            </svg>
          </HudPanel>

          <HudPanel className="p-5 text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Performance</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              How the work is weighted
            </p>
            <div className="mt-6 space-y-4">
              {weights.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-primary">High</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
                    <div className="h-full rounded-full bg-primary" style={{ width: item.level }} />
                  </div>
                </div>
              ))}
            </div>
          </HudPanel>

          <HudPanel className="flex flex-col items-center p-5 text-center">
            <h3 className="self-start text-sm font-semibold uppercase tracking-[0.16em]">Reliability</h3>
            <p className="mt-1 self-start font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Health / reply / recover
            </p>
            <div className="relative mt-4 h-28 w-28">
              <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90 text-primary">
                <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${0.86 * 2 * Math.PI * 30} ${2 * Math.PI * 30}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                &lt; 24h
              </div>
            </div>
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
