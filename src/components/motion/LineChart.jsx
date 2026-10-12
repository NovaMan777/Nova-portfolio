import { useRef, useState } from "react";
import { motion, motionColors, prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

function parsePoints(points) {
  if (Array.isArray(points)) return points;
  return points
    .trim()
    .split(/\s+/)
    .map((pair) => {
      const [x, y] = pair.split(",").map(Number);
      return { x, y };
    });
}

function viewSize(viewBox) {
  const [, , width, height] = viewBox.split(/\s+/).map(Number);
  return { width, height };
}

export const LineChart = ({
  points,
  viewBox = "0 0 600 70",
  className = "",
  strokeWidth = 2.4,
  guide = false,
  label = "Chart",
}) => {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const reduced = prefersReducedMotion();
  const shown = seen || reduced;
  const [tip, setTip] = useState(null);
  const parsed = parsePoints(points);
  const { height } = viewSize(viewBox);
  const first = parsed[0];
  const last = parsed[parsed.length - 1];
  const line = parsed.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${last.x} ${height} L ${first.x} ${height} Z`;

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
        <path
          d={area}
          fill="currentColor"
          style={{
            opacity: shown ? 0.14 : 0,
            transition: reduced ? "none" : `opacity ${motion.area.duration}ms ease ${motion.area.delay}ms`,
          }}
        />
        {guide && (
          <path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 6"
            opacity="0.35"
            style={
              shown && !reduced
                ? { animation: `motion-dash-flow ${motion.loop.dash}ms linear infinite` }
                : undefined
            }
          />
        )}
        <path
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={shown ? 0 : 1}
          style={{
            transition: reduced ? "none" : `stroke-dashoffset ${motion.line.duration}ms ${motion.easing}`,
          }}
        />
        {shown && !reduced && (
          <path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="0.14 0.86"
            style={{ animation: `motion-line-flow ${motion.loop.line}ms linear infinite` }}
          />
        )}
        {parsed.map((point, index) => {
          const value = Math.round(height - point.y);
          const name = point.label || `Point ${index + 1}`;
          return (
            <circle
              key={`${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r="3.2"
              fill="hsl(var(--background))"
              stroke="currentColor"
              strokeWidth="1.5"
              tabIndex={0}
              role="button"
              aria-label={`${name}, ${value}`}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: shown ? "scale(1)" : "scale(0)",
                transition: reduced
                  ? "none"
                  : `transform ${motion.point.duration}ms ${motion.easing} ${motion.point.delay + index * motion.point.stagger}ms`,
              }}
              onMouseEnter={(event) => showTip(event, `${name} · ${value}`)}
              onMouseLeave={() => setTip(null)}
              onFocus={(event) => showTip(event, `${name} · ${value}`)}
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
