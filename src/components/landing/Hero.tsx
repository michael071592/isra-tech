import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, hsla(191,100%,50%,0.35), transparent 70%)",
            animation: "blob-move-1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, hsla(261,100%,59%,0.25), transparent 70%)",
            animation: "blob-move-2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[10%] right-[15%] w-[350px] h-[350px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, hsla(51,100%,50%,0.10), transparent 70%)",
            animation: "blob-move-1 12s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-muted/60 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8"
        >
          <span className="text-sm font-medium text-muted-foreground">
            🇮🇱 Израильский эксперт по веб-технологиям и AI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          <span className="text-gradient">Израильские технологии</span>
          <br />
          <span className="text-foreground">для вашего бизнеса</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Создаю продающие сайты, AI-решения и автоматизацию для бизнеса.
          Прямиком из стартап-столицы мира — Тель-Авива.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <a
            href="https://t.me/Isra_Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold btn-shimmer hover:scale-105 transition-transform"
            aria-label="Получить бесплатную консультацию в Telegram"
          >
            Получить бесплатную консультацию →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 text-sm text-muted-foreground"
        >
          <span>🏆 50+ проектов</span>
          <span className="hidden sm:inline">·</span>
          <span>🌍 Работаю с РФ и СНГ</span>
          <span className="hidden sm:inline">·</span>
          <span>⚡ Ответ за 1 час</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
      >
        <a href="#problems" aria-label="Прокрутить вниз">
          <ChevronDown className="text-muted-foreground" size={32} />
        </a>
      </motion.div>
    </section>
  );
}
