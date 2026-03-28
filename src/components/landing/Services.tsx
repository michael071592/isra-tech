import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const borderColors = [
  "border-l-primary",
  "border-l-secondary",
  "border-l-accent",
  "border-l-success",
];

const services = [
  {
    icon: "🌐",
    title: "Сайты, которые продают",
    desc: "Не просто красивая страница — а полноценная машина по генерации заявок и продаж. SEO-оптимизация и адаптация под AI-поисковики встроены с первого дня. Mobile-first. Скорость < 2 секунд.",
    features: ["SEO + AEO оптимизация", "Schema-разметка", "Google Analytics", "A/B тестирование", "Mobile-first дизайн", "Поддержка после запуска"],
    cta: "Заказать сайт →",
  },
  {
    icon: "🤖",
    title: "AI-решения для бизнеса",
    desc: "Искусственный интеллект — ваш новый сотрудник. AI-чат-боты для обслуживания клиентов 24/7. Виртуальные ассистенты, которые отвечают на вопросы, записывают на встречи, обрабатывают заказы.",
    features: ["Claude AI & ChatGPT", "Telegram-боты", "Обучение на ваших данных", "Мультиязычность", "Интеграция на сайт", "WhatsApp Business"],
    cta: "Внедрить AI →",
  },
  {
    icon: "⚡",
    title: "Автопилот для бизнеса",
    desc: "Telegram-боты для продаж и поддержки. Автоматические уведомления, отчёты, CRM-интеграции. Связка между любыми сервисами. Экономия до 20 часов в неделю.",
    features: ["Telegram-боты на заказ", "n8n автоматизации", "Автоматические отчёты", "CRM интеграция", "Воронки продаж", "Уведомления и алерты"],
    cta: "Автоматизировать →",
  },
  {
    icon: "📈",
    title: "Реклама, которая окупается",
    desc: "Настройка и AI-управление Google Ads и Яндекс.Директ. Умная оптимизация ставок и бюджета. Прозрачная аналитика в реальном времени. Фокус на ROI.",
    features: ["Google Ads", "Яндекс.Директ", "AI-оптимизация ставок", "Live-дашборды", "Еженедельные отчёты", "A/B тесты креативов"],
    cta: "Запустить рекламу →",
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Что я делаю для вашего бизнеса
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-6 md:p-8 flex flex-col border-l-4 ${borderColors[i]} hover:rotate-[0.5deg] transition-transform duration-300 relative`}
            >
              {/* Numbered badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="grid grid-cols-2 gap-2 mb-6 flex-1">
                {s.features.map((f) => (
                  <span key={f} className="text-xs text-success flex items-center gap-1">
                    <span>✓</span> {f}
                  </span>
                ))}
              </div>
              <a
                href="https://t.me/Isra_Tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-semibold hover:underline"
                aria-label={`${s.cta} — написать в Telegram`}
              >
                {s.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
