import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "Обо мне" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#pricing", label: "Цены" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Контакты" },
];

const SECTION_IDS = links.map((l) => l.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionMap = new Map<Element, string>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      sectionMap.set(el, id);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <a href="#" className="font-display text-xl font-800 text-primary tracking-tight" aria-label="На главную">
          M.Y. <span className="text-foreground">|</span> <span className="text-sm text-muted-foreground">Israel 🇮🇱</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const sectionId = l.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm transition-colors duration-200 pb-1"
                style={{ color: isActive ? "hsl(191 100% 50%)" : undefined }}
              >
                <span className={isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                  {l.label}
                </span>
                {/* Active dot indicator */}
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300"
                  style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)" }}
                />
              </a>
            );
          })}
          <a
            href="https://t.me/Isra_Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold btn-shimmer hover:scale-105 transition-transform"
            aria-label="Бесплатная консультация в Telegram"
          >
            Бесплатная консультация
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2"
          aria-label="Открыть меню навигации"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex flex-col gap-4 p-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://t.me/Isra_Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold text-center"
              aria-label="Бесплатная консультация в Telegram"
            >
              Бесплатная консультация
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
