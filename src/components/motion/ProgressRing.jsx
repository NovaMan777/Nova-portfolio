import { useRef } from "react";
import { motion, motionColors, prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export const ProgressRing = ({ value = 0.86, className = "", children }) => {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const reduced = prefersReducedMotion();
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value);

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 80 80" className={`h-full w-full -rotate-90 ${motionColors.stroke}`}>
        <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            "--ring-from": circumference,
            "--ring-to": offset,
            strokeDashoffset: !seen ? circumference : reduced ? offset : undefined,
            animation:
              seen && !reduced ? `motion-ring-fill ${motion.loop.ring}ms infinite` : "none",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{children}</div>
    </div>
  );
};
