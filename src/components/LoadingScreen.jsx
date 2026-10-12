import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { preloadFonts } from "@/fonts";

const ORB_SRC = "/nova/1.gif";
function heroSrc() {
  if (window.matchMedia("(max-width: 767px)").matches) return "/nova/mobile-hero.svg";
  if (window.matchMedia("(max-width: 1023px)").matches) return "/nova/tablet-hero.svg";
  return "/nova/desktop-hero.svg";
}

const STAGES = [
  { at: 0, label: "Booting systems..." },
  { at: 18, label: "Loading typefaces..." },
  { at: 42, label: "Compiling interface..." },
  { at: 68, label: "Warming engines..." },
  { at: 88, label: "Almost ready..." },
  { at: 100, label: "Systems online" },
];

const MIN_LOAD_MS = 1800;
const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

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

    const imageReady = Promise.all(
      [ORB_SRC, heroSrc()].map(
        (src) =>
          new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          })
      )
    );

    Promise.all([preloadFonts().catch(() => null), imageReady]).finally(() => {
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
  const ringOffset = RING_CIRCUMFERENCE * (1 - pct / 100);
  const mono = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background text-foreground"
      style={mono}
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, y: "-6%" } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
      </div>

      <div className="relative flex flex-col items-center px-6">
        <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-primary/80">
          Nova // boot sequence
        </p>

        <div className="relative h-[min(78vw,340px)] w-[min(78vw,340px)]">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="hsl(var(--primary) / 0.18)"
              strokeWidth="1.5"
            />
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary)))" }}
            />
          </svg>

          <div className="absolute inset-[9%] overflow-hidden rounded-full border border-primary/35 shadow-[0_0_48px_hsl(var(--primary)/0.28)]">
            <img
              src={ORB_SRC}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
          </div>
        </div>

        <p className="mt-6 text-3xl font-medium tabular-nums tracking-tight text-foreground">
          {String(pct).padStart(3, "0")}
          <span className="text-primary">%</span>
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {stageLabel(pct)}
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
