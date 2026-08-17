import { Compass, PenTool, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Discover",
    description:
      "I start with the problem, the users, and the constraints. Clear scope, honest timelines, and a shared definition of done.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design & build",
    description:
      "Interfaces, APIs, and data models move together. You get working slices early — not a big reveal at the end.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Ship & refine",
    description:
      "Production-ready code, measured performance, and a handover you can actually own. Then we iterate on what the data tells us.",
  },
];

const MyApproach = () => {
  return (
    <section id="approach" className="relative py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Process"
          title="How the work"
          highlight="actually happens."
          description="A calm, senior process — enough structure to move fast, enough flexibility to stay honest."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="relative text-left bg-card border border-border rounded-3xl p-7 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="font-serif text-3xl text-muted-foreground/40 italic">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyApproach;
