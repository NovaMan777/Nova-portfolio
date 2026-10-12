import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Code,
  Home,
  Mail,
  PenTool,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Design", href: "#about", icon: PenTool },
  { name: "Code", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.22;
    audioRef.current.preload = "auto";

    const handleCanPlay = () => setIsAudioReady(true);
    audioRef.current.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsMusicPlaying((playing) => !playing);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 140;
      for (const item of navItems) {
        const element = document.querySelector(item.href);
        if (!element) continue;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(item.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 hidden border-b md:block",
          scrolled
            ? "border-primary/20 bg-background/75 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3.5">
          <a href="#hero" className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/70 text-primary">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 1.2 13.7 8.4 21 6.4 15.7 11.4 22.8 12 15.7 12.6 21 17.6 13.7 15.6 12 22.8 10.3 15.6 3 17.6 8.3 12.6 1.2 12 8.3 11.4 3 6.4 10.3 8.4 12 1.2Z" />
              </svg>
            </span>
            <span className="text-[13px] font-semibold tracking-[0.22em] text-white">NOVA MAN</span>
          </a>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeSection === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative cursor-pointer px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                    active ? "text-primary" : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 bottom-1 h-px bg-primary shadow-[0_0_8px_hsl(var(--primary))]",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.28em] text-white/55 lg:inline">
              Building digital dreams
            </span>
            <button
              onClick={toggleMusic}
              disabled={!isAudioReady}
              className={cn(
                "cursor-pointer p-2 text-white/55 transition-colors hover:text-primary",
                !isAudioReady && "cursor-not-allowed opacity-40"
              )}
              title={isMusicPlaying ? "Pause music" : "Play music"}
              aria-label={isMusicPlaying ? "Pause music" : "Play music"}
            >
              {isMusicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          onClick={toggleMusic}
          disabled={!isAudioReady}
          className={cn(
            "rounded-full border border-primary/30 bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-md",
            !isAudioReady && "opacity-40"
          )}
          aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
      </div>

      <motion.nav
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-0.5 rounded-full border border-primary/25 bg-background/85 p-1.5 shadow-lg backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-full p-2.5 transition-colors",
                activeSection === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
              aria-label={item.name}
            >
              <item.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
};
