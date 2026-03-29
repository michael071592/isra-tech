import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// 39 portfolio images (project-40 is profile photo, excluded)
const IMAGES = Array.from({ length: 39 }, (_, i) => ({
  id: i + 1,
  src: `/portfolio/project-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Проект ${i + 1}`,
}));

const BATCH = 12; // images shown initially / per "load more"

export default function PortfolioGallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [shown, setShown] = useState(BATCH);
  const [lightbox, setLightbox] = useState<number | null>(null); // index in IMAGES

  // Keyboard nav for lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % IMAGES.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! - 1 + IMAGES.length) % IMAGES.length);
    },
    [lightbox]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const visibleImages = IMAGES.slice(0, shown);

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 hover-gradient-text">
            Галерея работ
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {IMAGES.length} реальных проектов — нажмите для просмотра
          </p>
        </motion.div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2 max-w-5xl mx-auto">
          {visibleImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: Math.min(idx % BATCH, 8) * 0.06 }}
              className="relative aspect-video overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setLightbox(idx)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <ZoomIn size={28} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">Просмотр</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        {shown < IMAGES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setShown((s) => Math.min(s + BATCH, IMAGES.length))}
              className="px-8 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Показать ещё ({IMAGES.length - shown} осталось)
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Закрыть"
            >
              <X size={18} className="text-foreground" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground tabular-nums">
              {lightbox + 1} / {IMAGES.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-3 md:left-6 z-10 w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! - 1 + IMAGES.length) % IMAGES.length); }}
              aria-label="Назад"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-3 md:right-6 z-10 w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! + 1) % IMAGES.length); }}
              aria-label="Вперёд"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
