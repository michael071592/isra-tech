import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

const ALL_IMAGES = Array.from({ length: 39 }, (_, i) => ({
  id: i + 1,
  src: `/portfolio/project-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Проект ${i + 1}`,
}));

const BATCH = 12;

// ── Transform config by card offset from center ──────────────────────────
const CARD_CONFIG: Record<number, {
  scale: number;
  opacity: number;
  translateX: number;
  rotateY: number;
  translateZ: number;
  grayscale: number;
  brightness: number;
  zIndex: number;
}> = {
  0: {
    scale: 1,
    opacity: 1,
    translateX: 0,
    rotateY: 0,
    translateZ: 140,
    grayscale: 0,
    brightness: 1,
    zIndex: 10,
  },
  1: {
    scale: 0.78,
    opacity: 0.75,
    translateX: 310,
    rotateY: -18,
    translateZ: 0,
    grayscale: 0.35,
    brightness: 0.72,
    zIndex: 6,
  },
  "-1": {
    scale: 0.78,
    opacity: 0.75,
    translateX: -310,
    rotateY: 18,
    translateZ: 0,
    grayscale: 0.35,
    brightness: 0.72,
    zIndex: 6,
  },
  2: {
    scale: 0.56,
    opacity: 0.4,
    translateX: 530,
    rotateY: -28,
    translateZ: -60,
    grayscale: 0.7,
    brightness: 0.5,
    zIndex: 2,
  },
  "-2": {
    scale: 0.56,
    opacity: 0.4,
    translateX: -530,
    rotateY: 28,
    translateZ: -60,
    grayscale: 0.7,
    brightness: 0.5,
    zIndex: 2,
  },
};

function getConfig(offset: number) {
  const clampedOffset = Math.max(-2, Math.min(2, offset));
  return CARD_CONFIG[clampedOffset] ?? null;
}

const SPRING = { type: "spring" as const, stiffness: 220, damping: 32, mass: 0.8 };

// ── Blur-loading image ────────────────────────────────────────────────────
function BlurImage({ src, alt, grayscale, brightness }: {
  src: string; alt: string; grayscale: number; brightness: number;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
      )}
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
        style={{
          filter: `grayscale(${grayscale}) brightness(${brightness})`,
          transition: "filter 0.4s ease, opacity 0.3s ease",
          opacity: loaded ? 1 : 0,
          userSelect: "none",
        }}
      />
    </div>
  );
}

// ── Card component ────────────────────────────────────────────────────────
interface CardProps {
  img: typeof ALL_IMAGES[0];
  offset: number;
  onClick: () => void;
  onOpenLightbox: () => void;
}

function CoverCard({ img, offset, onClick, onOpenLightbox }: CardProps) {
  const cfg = getConfig(offset);
  if (!cfg || Math.abs(offset) > 2) return null;

  const isCenter = offset === 0;

  return (
    <motion.div
      className="absolute"
      style={{
        width: 540,
        height: 340,
        top: "50%",
        left: "50%",
        marginLeft: -270,
        marginTop: -170,
        perspective: "1200px",
        cursor: isCenter ? "default" : "pointer",
        zIndex: cfg.zIndex,
        willChange: "transform, opacity",
      }}
      initial={false}
      animate={{
        scale: cfg.scale,
        opacity: cfg.opacity,
        x: cfg.translateX,
        rotateY: cfg.rotateY,
        z: cfg.translateZ,
      }}
      transition={SPRING}
      onClick={isCenter ? undefined : onClick}
    >
      {/* Card shell */}
      <div
        className="w-full h-full rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: isCenter
            ? "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px hsla(191,100%,50%,0.18), 0 0 60px hsla(191,100%,50%,0.12)"
            : "0 16px 40px rgba(0,0,0,0.45)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <BlurImage
          src={img.src}
          alt={img.alt}
          grayscale={cfg.grayscale}
          brightness={cfg.brightness}
        />

        {/* Center card: subtle cyan top border glow */}
        {isCenter && (
          <div
            className="absolute inset-x-0 top-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(191 100% 50%), transparent)",
            }}
          />
        )}

        {/* Center card: zoom button */}
        {isCenter && (
          <button
            onClick={onOpenLightbox}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "hsla(220,26%,11%,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid hsla(191,100%,50%,0.3)",
            }}
            aria-label="Открыть полный экран"
          >
            <Maximize2 size={14} className="text-primary" />
          </button>
        )}

        {/* Side cards: dim overlay + click hint */}
        {!isCenter && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "hsla(191,100%,50%,0.15)", backdropFilter: "blur(6px)", border: "1px solid hsla(191,100%,50%,0.4)" }}
            >
              {offset < 0 ? <ChevronLeft size={18} className="text-primary" /> : <ChevronRight size={18} className="text-primary" />}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function PortfolioGallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [maxVisible, setMaxVisible] = useState(BATCH);
  const touchStartX = useRef<number | null>(null);

  const IMAGES = ALL_IMAGES.slice(0, maxVisible);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + IMAGES.length) % IMAGES.length), [IMAGES.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % IMAGES.length), [IMAGES.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  // Lock scroll in lightbox
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Progress dots — show max 7 visible, sliding window
  const DOT_MAX = 7;
  const halfDots = Math.floor(DOT_MAX / 2);
  const dotStart = Math.max(0, Math.min(current - halfDots, IMAGES.length - DOT_MAX));
  const dots = Array.from({ length: Math.min(DOT_MAX, IMAGES.length) }, (_, i) => dotStart + i);

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(191 100% 50%)" }}
          >
            Галерея работ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 hover-gradient-text">
            Проекты, которые я создал
          </h2>
          <p className="text-muted-foreground text-sm">
            {String(current + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
          </p>
        </motion.div>

        {/* ── Coverflow stage ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
        >
          <div
            className="relative mx-auto overflow-visible"
            style={{
              height: 380,
              maxWidth: 1100,
              perspective: "1200px",
              perspectiveOrigin: "center center",
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Ambient glow behind center */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: 500,
                height: 260,
                background: "radial-gradient(ellipse, hsla(191,100%,50%,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />

            {/* Cards: stable key = image index so Framer Motion animates between positions */}
            {[-2, -1, 0, 1, 2].map((offset) => {
              const idx = (current + offset + IMAGES.length) % IMAGES.length;
              return (
                <CoverCard
                  key={idx}
                  img={IMAGES[idx]}
                  offset={offset}
                  onClick={() => offset < 0 ? prev() : next()}
                  onOpenLightbox={() => setLightbox(true)}
                />
              );
            })}
          </div>

          {/* ── Navigation buttons ── */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "hsla(220,26%,11%,0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsla(215,14%,21%,0.8)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
              aria-label="Предыдущий"
            >
              <ChevronLeft size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {dots.map((dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrent(dotIdx)}
                  className="transition-all duration-300"
                  style={{
                    width: dotIdx === current ? 24 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: dotIdx === current
                      ? "hsl(191 100% 50%)"
                      : "hsla(215,14%,50%,0.4)",
                  }}
                  aria-label={`Перейти к проекту ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "hsla(220,26%,11%,0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsla(215,14%,21%,0.8)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
              aria-label="Следующий"
            >
              <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        {/* Load more */}
        {maxVisible < ALL_IMAGES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="text-center mt-8"
          >
            <button
              onClick={() => setMaxVisible((n) => Math.min(n + BATCH, ALL_IMAGES.length))}
              className="px-8 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Показать ещё ({ALL_IMAGES.length - maxVisible} проектов)
            </button>
          </motion.div>
        )}
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(16px)" }}
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              onClick={() => setLightbox(false)}
              aria-label="Закрыть"
            >
              <X size={18} className="text-white" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/40 tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
            </div>

            <button
              className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Назад"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            <motion.img
              key={current}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              src={IMAGES[current].src}
              alt={IMAGES[current].alt}
              className="max-w-[88vw] max-h-[84vh] object-contain rounded-2xl"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              onClick={(e) => { e.stopPropagation(); next(); }}
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
