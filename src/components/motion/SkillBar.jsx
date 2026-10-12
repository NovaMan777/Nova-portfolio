import { useRef } from "react";
import { motion, motionColors, prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

export const SkillBar = ({
  value,
  delay = 0,
  loop = false,
  trackClassName = "h-1",
  className = "",
}) => {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const reduced = prefersReducedMotion();
  const amount = Math.max(0, Math.min(100, parseFloat(value))) / 100;
  const looping = loop && seen && !reduced;

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-full", motionColors.track, trackClassName)}>
      <div
        className={cn("h-full w-full origin-left rounded-full", motionColors.fill, className)}
        style={{
          "--bar-scale": amount,
          transform: looping ? "scaleX(0)" : `scaleX(${seen || reduced ? amount : 0})`,
          transition: looping || reduced ? "none" : `transform ${motion.skill.duration}ms ${motion.easing} ${delay}ms`,
          animation: looping ? `motion-bar-fill ${motion.loop.skill}ms ${delay}ms infinite` : "none",
        }}
      />
    </div>
  );
};
