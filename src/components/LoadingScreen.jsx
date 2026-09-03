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

function stageLabel(progress) {
  let label = STAGES[0].label;
  for (const stage of STAGES) {
    if (progress >= stage.at) label = stage.label;
  }
  return label;
}

const LoadingScreen = ({ onComplete, requireEnter = true }) => {
  const minLoadMs = requireEnter ? 2200 : 900;
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const assetsReady = useRef(false);
  const startTime = useRef(performance.now());
  const progressRef = useRef(0);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current || exiting) return;
    finished.current = true;
    setExiting(true);
    window.setTimeout(onComplete, 550);
  };

  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    preloadFonts()
      .catch(() => null)
      .finally(() => {
        if (!cancelled) assetsReady.current = true;
      });

    const tick = (now) => {
      if (cancelled || finished.current) return;

      const elapsed = now - startTime.current;
      const timeBased = Math.min(92, (elapsed / minLoadMs) * 92);
      let next = timeBased;

      if (assetsReady.current) {
        next = Math.max(timeBased, progressRef.current + 3);
        if (elapsed >= minLoadMs) next = 100;
      }

      next = Math.min(100, Math.max(progressRef.current, next));
      progressRef.current = next;
      setProgress(next);

      if (next >= 100 && assetsReady.current && elapsed >= minLoadMs) {
        setReady(true);
        if (!requireEnter) {
          finish();
          return;
        }
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minLoadMs, requireEnter]);

  const enter = () => {
    if (!ready) return;
    finish();
  };

  useEffect(() => {
    if (!ready || !requireEnter) return undefined;
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, requireEnter, exiting]);

  const pct = Math.round(progress);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground overflow-hidden"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, y: "-6%" } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[18%] left-[12%] w-72 h-72 rounded-full bg-primary/15 blur-[110px]" />
        <div className="absolute bottom-[14%] right-[10%] w-80 h-80 rounded-full bg-brand/12 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,black,transparent)]" />
      </div>

      <div className="relative w-full max-w-md px-6">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tomas.dev // boot sequence
        </motion.p>

        <motion.h1
          className="font-normal text-4xl sm:text-5xl tracking-tight mb-8"
          style={{
            fontFamily: ready
              ? '"Instrument Serif", ui-serif, Georgia, serif'
              : "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          Loading{" "}
          <span className={ready ? "italic text-brand" : "text-brand"}>portfolio</span>
        </motion.h1>

        <div className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">{stageLabel(pct)}</p>
            <p className="font-mono text-sm tabular-nums text-foreground">
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

          <div className="flex justify-between font-mono text-[10px] text-muted-foreground/80 tracking-wider uppercase">
            <span>SYS.INIT</span>
            <span>{ready ? "READY" : "LOADING"}</span>
          </div>
        </div>

        <div className="mt-10 min-h-[3rem] flex items-center justify-center">
          {requireEnter && ready ? (
            <motion.button
              type="button"
              onClick={enter}
              className="cursor-pointer group inline-flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              aria-label="Enter portfolio"
            >
              <span className="font-mono text-xs uppercase tracking-[0.32em] text-foreground group-hover:text-primary transition-colors">
                Press Enter
              </span>
              <span className="h-px w-16 bg-linear-to-r from-transparent via-primary to-transparent animate-pulse" />
              <span className="text-[11px] text-muted-foreground">or click to continue</span>
            </motion.button>
          ) : (
            <span className="font-mono text-[11px] text-muted-foreground/70 tracking-wide">
              {ready ? "Launching…" : "Please wait…"}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
