// Speed, easing, and chart colors live here.
// Durations are milliseconds. Chart color follows `stroke` (currentColor / text-primary).
// To recolor charts and counters, change --primary in src/index.css.

export const motion = {
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeOutCubic(t) {
    return 1 - (1 - t) ** 3;
  },
  counter: { duration: 2000 },
  line: { duration: 1400 },
  area: { duration: 560, delay: 980 },
  point: { duration: 320, stagger: 55, delay: 920 },
  bar: { duration: 880, stagger: 70 },
  skill: { duration: 1100, stagger: 90 },
  text: { duration: 680, distance: 10, stagger: 70 },
  ring: { duration: 1200 },
  loop: {
    ring: 4800,
    skill: 4800,
    line: 7200,
    dash: 2800,
    bars: 2600,
    icon: 2800,
  },
};

export const motionColors = {
  stroke: "text-primary",
  track: "bg-primary/15",
  fill: "bg-primary",
  tooltip: "border-border bg-card text-foreground",
};

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
