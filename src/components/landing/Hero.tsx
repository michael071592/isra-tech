import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Typing effect phrases
const PHRASES = [
  "Создаю продающие сайты с AI-оптимизацией",
  "Автоматизирую бизнес-процессы с помощью ботов",
  "Интегрирую искусственный интеллект в ваш бизнес",
  "Строю цифровые продукты из Тель-Авива 🇮🇱",
];

// Tech ticker items
const TECH_ITEMS = [
  "⚛️ React", "🟦 TypeScript", "▲ Next.js", "🤖 Claude AI",
  "💬 ChatGPT", "✈️ Telegram API", "📈 Google Ads", "🔄 n8n",
  "🟢 Node.js", "🎨 Tailwind CSS", "🔍 SEO", "🗄️ Supabase",
  "🐳 Docker", "🔷 Prisma", "⚡ Vite", "🌐 REST API",
];

// Matrix code lines
const CODE_LINES = [
  "const AI = useAutomation();",
  "export function buildSuccess() {",
  "await deploy('your-business');",
  "if (ROI > 300%) return '🚀';",
  "const bot = new TelegramBot(config);",
  "function growRevenue(client) {",
  "const seo = optimizeForAI(site);",
  "await automate(workflow, n8n);",
  "return { success: true, roi: 380 };",
  "const leads = await generateLeads();",
  "type Business = AI & Growth;",
  "deploy({ platform: 'Israel 🇮🇱' });",
];

function useTypingEffect() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pausing, setPausing] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion.current) return;

    const phrase = PHRASES[phraseIdx];

    if (pausing) {
      const t = setTimeout(() => setPausing(false), 3000);
      return () => clearTimeout(t);
    }

    if (!isDeleting && displayText === phrase) {
      setPausing(true);
      setIsDeleting(true);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return;
    }

    const speed = isDeleting ? 25 : 50;
    const t = setTimeout(() => {
      setDisplayText(
        isDeleting ? phrase.slice(0, displayText.length - 1) : phrase.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayText, phraseIdx, isDeleting, pausing]);

  return displayText;
}

export default function Hero() {
  const typedText = useTypingEffect();
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, hsla(191,100%,50%,0.35), transparent 70%)",
            animation: reducedMotion ? "none" : "blob-move-1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, hsla(261,100%,59%,0.25), transparent 70%)",
            animation: reducedMotion ? "none" : "blob-move-2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[10%] right-[15%] w-[350px] h-[350px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, hsla(51,100%,50%,0.10), transparent 70%)",
            animation: reducedMotion ? "none" : "blob-move-1 12s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Animated code background (Matrix-style) */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
        >
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              className="absolute text-xs whitespace-nowrap"
              style={{
                fontFamily: "'Fira Code', 'Courier New', monospace",
                color: i % 3 === 0 ? "hsl(191 100% 50%)" : i % 3 === 1 ? "hsl(261 100% 59%)" : "hsl(51 100% 50%)",
                opacity: 0.045,
                left: `${(i * 17 + 5) % 90}%`,
                top: "-60px",
                animation: `codeScroll ${14 + i * 2}s linear infinite`,
                animationDelay: `${-(i * 3)}s`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}

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

        {/* Typing effect subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed min-h-[2em]"
        >
          {reducedMotion ? (
            "Создаю продающие сайты, AI-решения и автоматизацию для бизнеса. Прямиком из стартап-столицы мира — Тель-Авива."
          ) : (
            <>
              {typedText}
              <span
                className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
                style={{ animation: "cursorBlink 1s step-end infinite" }}
              />
            </>
          )}
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
            className="inline-block bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold btn-shimmer hover:scale-105 active:scale-95 transition-transform"
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
          <span className="hover:text-primary hover:scale-[1.15] transition-all duration-300 cursor-default">
            🏆 50+ проектов
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hover:text-primary hover:scale-[1.15] transition-all duration-300 cursor-default">
            🌍 Работаю с РФ и СНГ
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hover:text-primary hover:scale-[1.15] transition-all duration-300 cursor-default">
            ⚡ Ответ за 1 час
          </span>
        </motion.div>

        {/* Tech Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 overflow-hidden relative"
          aria-hidden="true"
        >
          <div
            className="flex gap-6 whitespace-nowrap"
            style={{ animation: reducedMotion ? "none" : "techTicker 30s linear infinite" }}
          >
            {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
              <span
                key={i}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 cursor-default"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {item}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-12 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(216,28%,7%), transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-12 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(216,28%,7%), transparent)" }} />
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
