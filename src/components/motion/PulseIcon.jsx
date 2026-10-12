import { motion, prefersReducedMotion } from "@/lib/motion";

export const PulseIcon = ({ icon: Icon, className = "", delay = 0 }) => {
  const reduced = prefersReducedMotion();

  return (
    <Icon
      className={className}
      style={
        reduced
          ? undefined
          : {
              animation: `motion-icon-glow ${motion.loop.icon}ms ease-in-out ${delay}ms infinite`,
            }
      }
    />
  );
};
