import { useState, useEffect } from "react";
import { Send, ArrowUp } from "lucide-react";

export default function FloatingElements() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 500);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
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

      {/* Floating Telegram button */}
      <a
        href="https://t.me/Isra_Tech"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-strong animate-pulse-glow hover:scale-110 transition-transform"
        aria-label="Написать в Telegram"
      >
        <Send size={22} className="text-primary-foreground" />
      </a>

      {/* Back to top */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-muted border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
          aria-label="Наверх"
        >
          <ArrowUp size={16} className="text-muted-foreground" />
        </button>
      )}
    </>
  );
}
