import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = Array.from({ length: 39 }, (_, i) => ({
  id: i + 1,
  src: `/portfolio/project-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Проект ${i + 1}`,
}));

// Rotation pattern — subtle, alternating, intentional
const ROTATIONS = [-3, 1.5, -1.5, 2.5, -2, 1, -1, 3, -2.5, 1.5, 0.5, -1.5];
const getRotation = (i: number) => ROTATIONS[i % ROTATIONS.length];

export default function PortfolioGallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* ── Keyboard nav ── */
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

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  /* ── Drag-to-scroll (desktop) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (stripRef.current?.offsetLeft ?? 0);
    scrollLeft.current = stripRef.current?.scrollLeft ?? 0;
    if (stripRef.current) stripRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - (stripRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.4;
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = "grab";
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(191 100% 50%)" }}
          >
            Галерея работ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold hover-gradient-text">
            Проекты, которые я создал
          </h2>
          <p className="text-muted-foreground text-sm mt-3">
            Перетащите для прокрутки · нажмите для просмотра
          </p>
        </motion.div>
      </div>

      {/* ── Horizontal curated strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        <div
          ref={stripRef}
          className="flex gap-5 px-8 md:px-16 overflow-x-auto pb-10 pt-10 select-none"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Hide native scrollbar via inline style (webkit) */}
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {IMAGES.map((img, idx) => {
            const rot = getRotation(idx);
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 40, rotate: rot }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, rotate: rot }
                    : { opacity: 0, y: 40, rotate: rot }
                }
                transition={{ duration: 0.6, delay: Math.min(idx, 6) * 0.07 }}
                whileHover={{
                  y: -12,
                  rotate: rot * 0.2,   // rotation almost straightens on hover
                  scale: 1.04,
                  zIndex: 10,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative flex-shrink-0 overflow-hidden rounded-2xl"
                style={{
                  width: "220px",
                  height: "300px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                  cursor: "pointer",
                  transformOrigin: "bottom center",
                }}
                onClick={() => {
                  if (!isDragging.current) setLightbox(idx);
                }}
                onMouseDown={(e) => {
                  // capture drag start for distinguishing drag vs click
                  startX.current = e.pageX;
                }}
                onMouseUp={(e) => {
                  // if moved > 5px it's a drag, not a click
                  if (Math.abs(e.pageX - startX.current) > 5) {
                    isDragging.current = true;
                  }
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {/* Premium shimmer overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(0,224,255,0.08) 0%, transparent 60%)",
                  }}
                />
              </motion.div>
            );
          })}

          {/* Right padding spacer */}
          <div className="flex-shrink-0 w-8" />
        </div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(16px)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Закрыть"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/50 tabular-nums">
              {lightbox + 1} / {IMAGES.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-3 md:left-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! - 1 + IMAGES.length) % IMAGES.length); }}
              aria-label="Назад"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].alt}
              className="max-w-[88vw] max-h-[84vh] object-contain rounded-2xl"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-3 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! + 1) % IMAGES.length); }}
              aria-label="Вперёд"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
