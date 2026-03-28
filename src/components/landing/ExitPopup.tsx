import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ExitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit-popup-shown")) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true);
        sessionStorage.setItem("exit-popup-shown", "1");
        document.removeEventListener("mousemove", handler);
      }
    };

    // Only on desktop
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) {
      document.addEventListener("mousemove", handler);
    }

    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/60 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 max-w-md mx-4 relative text-center"
            style={{ background: "hsla(220, 26%, 11%, 0.95)", backdropFilter: "blur(30px)" }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            <div className="text-4xl mb-4">🎁</div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Подождите!
            </h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Получите бесплатный чек-лист:<br />
              <span className="text-foreground font-medium">«15 причин, почему ваш сайт не продаёт»</span>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShow(false);
              }}
              className="space-y-3"
            >
              <input
                type="email"
                placeholder="Ваш email"
                required
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm btn-shimmer hover:scale-105 transition-transform"
              >
                Скачать бесплатно
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
