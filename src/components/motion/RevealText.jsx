import { useRef } from "react";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export const RevealText = ({
  as: Tag = "span",
  className = "",
  delay = 0,
  children,
}) => {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const reduced = prefersReducedMotion();
  const shown = seen || reduced;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${motion.text.distance}px)`,
        transition: reduced
          ? "none"
          : `opacity ${motion.text.duration}ms ${motion.easing} ${delay}ms, transform ${motion.text.duration}ms ${motion.easing} ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};
