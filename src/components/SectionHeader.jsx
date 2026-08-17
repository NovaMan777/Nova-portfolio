import { Sparkles } from "lucide-react";

export const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}) => {
  const alignment =
    align === "left"
      ? "text-left items-start"
      : "text-center items-center mx-auto";

  return (
    <div className={`flex flex-col ${alignment} mb-12 md:mb-16 max-w-3xl`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
        {title}{" "}
        {highlight && (
          <span className="font-serif italic text-primary">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
