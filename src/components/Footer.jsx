import { useEffect, useState } from "react";
import { ArrowUp, Github, Mail, Send } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    {
      icon: <Mail size={14} />,
      text: "seraph.nova.dev@gmail.com",
      href: "mailto:seraph.nova.dev@gmail.com",
    },
    {
      icon: <Send size={14} />,
      text: "@NovaMan777",
      href: "https://t.me/NovaMan777",
    },
    {
      icon: <Github size={14} />,
      text: "@NovaMan777",
      href: "https://github.com/NovaMan777",
    },
  ];

  return (
    <footer className="pb-24 pt-4 md:pb-5">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="hud-panel p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div>
              <a href="#hero" className="mb-3 inline-flex items-center gap-2">
                <span className="font-semibold tracking-[0.18em]">NOVA MAN</span>
              </a>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                Nova Man — full-stack developer. Creative technology for a brighter tomorrow.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">
                Contact
              </h4>
              <ul className="space-y-2.5">
                {contactInfo.map((info) => (
                  <li key={info.text}>
                    <a
                      href={info.href}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {info.icon}
                      {info.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {currentYear} Nova Man. All rights reserved.</p>
            <p>Designed & built with care.</p>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-4 z-40 cursor-pointer rounded-full bg-primary p-3 text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.35)] transition-opacity hover:opacity-90 md:bottom-6"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </footer>
  );
};
