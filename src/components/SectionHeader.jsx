export const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  description,
  tone = "white",
}) => {
  const titleColor = tone === "green" ? "text-primary" : "text-foreground";
  const highlightColor = tone === "green" ? "text-foreground" : "text-primary";

  return (
    <div className="mx-auto mb-6 max-w-4xl text-center md:mb-7">
      {eyebrow && (
        <p className="hud-kicker mb-3">{eyebrow}</p>
      )}
      <h2
        className={`text-[1.65rem] font-semibold uppercase leading-[1.05] tracking-[0.045em] sm:text-4xl md:text-5xl ${titleColor}`}
      >
        {title}
        {highlight ? " " : ""}
        {highlight && <span className={highlightColor}>{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary/85">
          {description}
        </p>
      )}
    </div>
  );
};
