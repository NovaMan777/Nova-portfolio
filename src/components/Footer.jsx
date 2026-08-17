import { ArrowUp, Github, Mail, Send } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    {
      icon: <Mail size={14} />,
      text: "uigraslasu@gmail.com",
      href: "mailto:uigraslasu@gmail.com",
    },
    {
      icon: <Send size={14} />,
      text: "@TomasCooper1004",
      href: "https://t.me/TomasCooper1004",
    },
    {
      icon: <Github size={14} />,
      text: "@tomas0502",
      href: "https://github.com/tomas0502",
    },
  ];

  return (
    <footer className="px-4 pb-24 md:pb-10 pt-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div>
              <a href="#hero" className="flex items-center gap-2 mb-3">
                <img src="/logo.svg" alt="" className="h-7 w-7 dark:invert" />
                <span className="font-semibold tracking-tight">Tomas Cooper</span>
              </a>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Full-stack engineer building considered products with React, Node.js, and modern cloud.
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
            <p>© {currentYear} Tomas Cooper. All rights reserved.</p>
            <p>Designed & built with care.</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="cursor-pointer fixed bottom-20 md:bottom-6 right-4 z-40 p-3 rounded-full bg-foreground text-background shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};
