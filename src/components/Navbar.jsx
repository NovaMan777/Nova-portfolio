import { useEffect, useState, useRef } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Work", href: "#projects", icon: Briefcase },
  { name: "Kind words", href: "#testimonials", icon: MessageSquare },
  { name: "Contact", href: "#contact", icon: Mail },
];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

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
      audioRef.current.play().catch(console.error);
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navItems.map((item) => item.href);
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "mx-auto mt-4 max-w-6xl px-4 transition-all duration-300",
            scrolled && "mt-3"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300",
              scrolled
                ? "bg-background/80 border-border shadow-lg shadow-black/5"
                : "bg-background/50 border-transparent"
            )}
          >
            <a href="#hero" className="flex items-center gap-2.5 pl-2 pr-1">
              <img src="/logo.svg" alt="" className="h-7 w-7 object-contain dark:invert" />
              <span className="font-semibold tracking-tight text-foreground">
                Tomas
              </span>
            </a>

            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-sm transition-colors",
                    activeSection === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1 pr-1">
              <button
                onClick={toggleMusic}
                disabled={!isAudioReady}
                className={cn(
                  "p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  !isAudioReady && "opacity-40 cursor-not-allowed"
                )}
                title={isMusicPlaying ? "Pause music" : "Play music"}
                aria-label={isMusicPlaying ? "Pause music" : "Play music"}
              >
                {isMusicPlaying ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              <ThemeToggle />
              <a
                href="#contact"
                className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Let&apos;s talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 md:hidden">
        <button
          onClick={toggleMusic}
          disabled={!isAudioReady}
          className={cn(
            "p-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-sm",
            !isAudioReady && "opacity-40"
          )}
          aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
        <div className="rounded-full bg-background/80 backdrop-blur-md border border-border shadow-sm">
          <ThemeToggle />
        </div>
      </div>

      <motion.nav
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-0.5 rounded-full bg-background/85 backdrop-blur-xl border border-border shadow-lg p-1.5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "p-2.5 rounded-full transition-colors",
                activeSection === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
              aria-label={item.name}
            >
              <item.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
};
