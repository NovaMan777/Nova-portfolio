import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export function useInViewOnce(ref, { threshold = 0.3, rootMargin = "0px 0px -8% 0px" } = {}) {
  const reduced = prefersReducedMotion();
  const [seen, setSeen] = useState(reduced);

  useEffect(() => {
    if (reduced) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, reduced, threshold, rootMargin]);

  return seen;
}
