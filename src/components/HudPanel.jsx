import { cn } from "@/lib/utils";

export const HudPanel = ({ className, children }) => {
  return (
    <div className={cn("hud-panel", className)}>
      <span className="hud-tick tl" aria-hidden="true" />
      <span className="hud-tick tr" aria-hidden="true" />
      <span className="hud-tick bl" aria-hidden="true" />
      <span className="hud-tick br" aria-hidden="true" />
      {children}
    </div>
  );
};
