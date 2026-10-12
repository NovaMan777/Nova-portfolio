const fittedArt =
  "hero-fit pointer-events-none h-auto max-h-full w-auto max-w-full border-0 bg-transparent";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative">
      <div className="relative flex h-svh w-full items-center justify-center overflow-hidden">
        <object
          data="/nova/mobile-hero.svg"
          type="image/svg+xml"
          aria-hidden="true"
          tabIndex={-1}
          className={`${fittedArt} md:hidden`}
        />
        <object
          data="/nova/tablet-hero.svg"
          type="image/svg+xml"
          aria-hidden="true"
          tabIndex={-1}
          className={`${fittedArt} hidden md:block lg:hidden`}
        />
        <object
          data="/nova/desktop-hero.svg"
          type="image/svg+xml"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 hidden h-full w-full border-0 lg:block"
        />

        <h1 className="sr-only">Nova Man portfolio</h1>

        <a
          href="#about"
          className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 transition-colors hover:text-primary md:bottom-8"
        >
          Enter
          <span className="block h-8 w-px animate-pulse bg-primary" />
        </a>
      </div>
    </section>
  );
};
