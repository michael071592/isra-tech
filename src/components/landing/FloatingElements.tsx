import { useState, useEffect } from "react";
import { Send, ArrowUp } from "lucide-react";

export default function FloatingElements() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 500);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });

    // Observe footer for mobile bar hiding
    const footer = document.querySelector("footer");
    let observer: IntersectionObserver | null = null;
    if (footer) {
      observer = new IntersectionObserver(
        ([entry]) => setFooterVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
      observer.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", handler);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <div
          className="h-full bg-gradient-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Telegram button — moved left to make room for AI chatbot */}
      <a
        href="https://t.me/Isra_Tech"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-24 z-50 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-strong animate-pulse-glow hover:scale-110 transition-transform hidden md:flex"
        aria-label="Написать в Telegram"
      >
        <Send size={22} className="text-primary-foreground" />
      </a>

      {/* Mobile sticky bottom bar */}
      {scrolled && !footerVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-border px-4 py-3">
          <a
            href="https://t.me/Isra_Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm btn-shimmer"
            aria-label="Бесплатная консультация в Telegram"
          >
            <Send size={16} />
            Бесплатная консультация
          </a>
        </div>
      )}

      {/* Back to top */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-muted border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors hidden md:flex"
          aria-label="Вернуться наверх"
        >
          <ArrowUp size={16} className="text-muted-foreground" />
        </button>
      )}
    </>
  );
}
