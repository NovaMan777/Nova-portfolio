import { useRef, useState } from "react";
import { motion, motionColors, prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export const BarChart = ({
  data,
  viewBox = "0 0 240 90",
  className = "",
  label = "Bar chart",
}) => {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const reduced = prefersReducedMotion();
  const shown = seen || reduced;
  const [tip, setTip] = useState(null);
  const [, , width, height] = viewBox.split(/\s+/).map(Number);
  const max = Math.max(...data.map((item) => item.value));
  const padX = 6;
  const baseline = height - 4;
  const gap = 5;
  const barWidth = (width - padX * 2 - gap * (data.length - 1)) / data.length;

  const showTip = (event, text) => {
    const wrap = ref.current.getBoundingClientRect();
    const box = event.currentTarget.getBoundingClientRect();
    setTip({
      text,
      x: box.left - wrap.left + box.width / 2,
      y: box.top - wrap.top,
    });
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg viewBox={viewBox} className={`h-full w-full ${motionColors.stroke}`} role="img" aria-label={label}>
        <line x1="0" y1={baseline} x2={width} y2={baseline} stroke="currentColor" strokeOpacity="0.2" />
        {data.map((item, index) => {
          const barHeight = (item.value / max) * (baseline - 8);
          const x = padX + index * (barWidth + gap);
          return (
            <rect
              key={item.label}
              x={x}
              y={baseline - barHeight}
              width={barWidth}
              height={barHeight}
              rx="1.5"
              fill="currentColor"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center bottom",
                transform: shown ? "scaleY(1)" : "scaleY(0)",
                transition: reduced
                  ? "none"
                  : `transform ${motion.bar.duration}ms ${motion.easing} ${index * motion.bar.stagger}ms`,
                animation:
                  shown && !reduced
                    ? `motion-bar-glow ${motion.loop.bars}ms ease-in-out ${index * 180}ms infinite`
                    : undefined,
              }}
              tabIndex={0}
              role="button"
              aria-label={`${item.label}, ${item.value}`}
              onMouseEnter={(event) => showTip(event, `${item.label} · ${item.value}`)}
              onMouseLeave={() => setTip(null)}
              onFocus={(event) => showTip(event, `${item.label} · ${item.value}`)}
              onBlur={() => setTip(null)}
            />
          );
        })}
      </svg>
      {tip && (
        <div
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[10px] shadow-sm ${motionColors.tooltip}`}
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.text}
        </div>
      )}
    </div>
  );
};
