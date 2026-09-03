import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { preloadFonts } from "@/fonts";

const STAGES = [
  { at: 0, label: "Booting systems..." },
  { at: 18, label: "Loading typefaces..." },
  { at: 42, label: "Compiling interface..." },
  { at: 68, label: "Warming engines..." },
  { at: 88, label: "Almost ready..." },
  { at: 100, label: "Systems online" },
];

const MIN_LOAD_MS = 1800;

function stageLabel(progress) {
  let label = STAGES[0].label;
  for (const stage of STAGES) {
    if (progress >= stage.at) label = stage.label;
  }
  return label;
}

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const assetsReady = useRef(false);
  const startTime = useRef(performance.now());
  const progressRef = useRef(0);
  const finished = useRef(false);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setExiting(true);
      window.setTimeout(onComplete, 500);
    };

    preloadFonts()
      .catch(() => null)
      .finally(() => {
        if (!cancelled) assetsReady.current = true;
      });

    const tick = (now) => {
      if (cancelled || finished.current) return;

      const elapsed = now - startTime.current;
      const timeBased = Math.min(92, (elapsed / MIN_LOAD_MS) * 92);
      let next = timeBased;

      if (assetsReady.current) {
        next = Math.max(timeBased, progressRef.current + 3);
        if (elapsed >= MIN_LOAD_MS) next = 100;
      }

      next = Math.min(100, Math.max(progressRef.current, next));
      progressRef.current = next;
      setProgress(next);

      if (next >= 100 && assetsReady.current && elapsed >= MIN_LOAD_MS) {
        finish();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [onComplete]);

  const pct = Math.round(progress);
  // System mono only — avoids mid-load swaps from IBM Plex Mono.
  const mono = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground overflow-hidden"
      style={mono}
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, y: "-6%" } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[18%] left-[12%] w-72 h-72 rounded-full bg-primary/15 blur-[110px]" />
        <div className="absolute bottom-[14%] right-[10%] w-80 h-80 rounded-full bg-brand/12 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,black,transparent)]" />
      </div>

      <div className="relative w-full max-w-md px-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
          Tomas.dev // boot sequence
        </p>

        <h1 className="font-normal text-3xl sm:text-4xl tracking-tight mb-8">
          Loading <span className="text-brand">portfolio</span>
        </h1>

        <div className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <p className="text-xs text-muted-foreground">{stageLabel(pct)}</p>
            <p className="text-sm tabular-nums text-foreground">
              {String(pct).padStart(3, "0")}
              <span className="text-muted-foreground">%</span>
            </p>
          </div>

          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden border border-border">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground/80 tracking-wider uppercase">
            <span>SYS.INIT</span>
            <span>{pct >= 100 ? "READY" : "LOADING"}</span>
          </div>
        </div>

        <p className="mt-10 text-center text-[11px] text-muted-foreground/70 tracking-wide">
          {pct >= 100 ? "Launching…" : "Please wait…"}
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
