import { Award, ArrowRight, Mail, FileText, Briefcase } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const codeSnippets = [
  "import { FullStackEngineer } from 'tomas.dev';",
  "",
  "const engineer = new FullStackEngineer({",
  "  name: 'Tomas Cooper',",
  "  stack: ['React', 'Next.js', 'Node.js'],",
  "  focus: 'Scalable product engineering',",
  "  status: 'Open to opportunities'",
  "});",
  "",
  "await engineer.ship();",
  "// SaaS · E-commerce · MVPs · Platforms",
  "",
  'console.log("Let\'s build something exceptional.");',
];

const achievements = [
  { number: "7+", label: "Years shipping" },
  { number: "55+", label: "Projects delivered" },
  { number: "35+", label: "Clients served" },
  { number: "<24h", label: "Typical reply" },
];

const orbs = [
  { className: "top-24 left-[8%] w-72 h-72 from-primary/15 to-violet-500/10", duration: 16 },
  { className: "bottom-16 right-[6%] w-80 h-80 from-cyan-400/10 to-emerald-500/10", duration: 22, delay: 2 },
];

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");

  useEffect(() => {
    const currentLine = codeSnippets[currentCodeLine];
    if (displayedCode.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, displayedCode.length + 1));
      }, 22);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (currentCodeLine < codeSnippets.length - 1) {
        setCurrentCodeLine((prev) => prev + 1);
        setDisplayedCode("");
      } else {
        setTimeout(() => {
          setCurrentCodeLine(0);
          setDisplayedCode("");
        }, 4200);
      }
    }, 520);

    return () => clearTimeout(timeout);
  }, [displayedCode, currentCodeLine]);

  const lineClass = (line) => {
    if (line.includes("import")) return "text-violet-400";
    if (line.includes("const") || line.includes("new ")) return "text-sky-400";
    if (line.includes("//")) return "text-muted-foreground/80 italic";
    if (line.includes("await") || line.includes("console")) return "text-amber-400";
    if (line.includes("'") || line.includes('"')) return "text-emerald-400";
    return "text-foreground/90";
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-24 md:pt-28 pb-16"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_40%,black,transparent)]" />
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-linear-to-r blur-[110px] ${orb.className}`}
            animate={{ x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: orb.duration, delay: orb.delay || 0, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto w-full">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-medium mb-7"
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </motion.div>

            <motion.p
              className="text-sm uppercase tracking-[0.22em] text-muted-foreground mb-3"
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              Full-stack engineer
            </motion.p>

            <motion.h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-foreground"
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              Tomas{" "}
              <span className="italic text-brand">Cooper</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              I design and build{" "}
              <span className="text-foreground font-medium">high-performance web products</span>{" "}
              — from polished interfaces to reliable backends — for startups and product teams who care about craft.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8"
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              {achievements.map((item) => (
                <div
                  key={item.label}
                  className="text-center lg:text-left p-4 rounded-2xl bg-card/70 border border-border"
                >
                  <div className="text-2xl font-semibold tracking-tight">{item.number}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <a href="#projects" className="cosmic-button">
                <Briefcase className="h-4 w-4" />
                View selected work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost">
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <button
                onClick={() =>
                  window.open("/Tomas-resume.pdf", "_blank", "noopener,noreferrer")
                }
                className="cursor-pointer btn-ghost text-muted-foreground"
              >
                <FileText className="h-4 w-4" />
                Resume
              </button>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full"
            variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          >
            <div className="relative w-full max-w-md">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xl shadow-black/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 text-center font-mono text-[11px] text-muted-foreground">
                    engineer.ts
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="font-mono text-[13px] leading-6 bg-background/80 rounded-xl border border-border p-5 min-h-[340px] text-left">
                  {codeSnippets.map((line, index) => (
                    <div key={index} className={`min-h-[24px] ${lineClass(line)}`}>
                      {index < currentCodeLine ? line : ""}
                      {index === currentCodeLine && (
                        <>
                          {displayedCode}
                          <span className="inline-block w-[7px] h-[14px] bg-primary ml-0.5 align-middle animate-pulse" />
                        </>
                      )}
                      {line === "" && "\u00A0"}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-3 -left-3 bg-card border border-border px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-medium">Product-minded</span>
              </div>
              <div className="absolute -bottom-3 right-6 bg-card border border-border px-3 py-1.5 rounded-full shadow-md text-xs text-muted-foreground">
                React · Node · Cloud
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to about"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="w-5 h-8 rounded-full border border-border flex justify-center pt-1.5">
          <span className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </span>
      </button>
    </section>
  );
};
