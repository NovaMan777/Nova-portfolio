import { useEffect, useRef, useState } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

function formatNumber(value, decimals) {
  if (decimals > 0) return value.toFixed(decimals);
  return String(Math.round(value));
}

export const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = motion.counter.duration,
  className = "",
}) => {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const reduced = prefersReducedMotion();
  const [current, setCurrent] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!seen) return undefined;
    if (reduced) {
      setCurrent(value);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const next = value * motion.easeOutCubic(progress);
      setCurrent(progress === 1 ? value : next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, reduced, value, duration]);

  const finalText = `${prefix}${formatNumber(value, decimals)}${suffix}`;
  const liveText = `${prefix}${formatNumber(current, decimals)}${suffix}`;

  return (
    <span ref={ref} className={`inline-grid align-baseline ${className}`}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {finalText}
      </span>
      <span className="col-start-1 row-start-1 tabular-nums">{liveText}</span>
    </span>
  );
};
