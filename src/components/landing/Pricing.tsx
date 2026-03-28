import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, X } from "lucide-react";

const plans = [
  {
    icon: "⚡",
    name: "СТАРТ",
    oldPrice: "$800",
    price: "от $500",
    saving: "$300",
    popular: false,
    features: [
      { text: "Лендинг до 5 экранов", included: true },
      { text: "Мобильная адаптация", included: true },
      { text: "Базовый SEO", included: true },
      { text: "Контактная форма", included: true },
      { text: "Google Analytics", included: true },
      { text: "AI чат-бот", included: false },
      { text: "Автоматизация", included: false },
    ],
    time: "5-7 дней",
    support: "14 дней",
  },
  {
    icon: "🚀",
    name: "БИЗНЕС",
    oldPrice: "$2,500",
    price: "от $1,500",
    saving: "$1,000",
    popular: true,
    features: [
      { text: "Многостраничный сайт", included: true },
      { text: "AI чат-бот", included: true },
      { text: "SEO + AEO оптимизация", included: true },
      { text: "Telegram-бот", included: true },
      { text: "Google Analytics Pro", included: true },
      { text: "A/B тестирование", included: true },
      { text: "Schema-разметка", included: true },
    ],
    time: "10-14 дней",
    support: "30 дней",
  },
  {
    icon: "💎",
    name: "ПРЕМИУМ",
    oldPrice: "$5,000",
    price: "от $3,000",
    saving: "$2,000",
    popular: false,
    features: [
      { text: "Полная экосистема", included: true },
      { text: "AI + автоматизация", included: true },
      { text: "Google/Яндекс Ads", included: true },
      { text: "CRM интеграция", included: true },
      { text: "n8n автоматизации", included: true },
      { text: "Дашборд аналитики", included: true },
      { text: "Приоритет 24/7", included: true },
    ],
    time: "14-21 день",
    support: "60 дней",
  },
];

export default function Pricing() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Прозрачные цены. Без скрытых платежей.
          </h2>
          <p className="text-muted-foreground">
            Не уверены? Начните с бесплатной консультации — подберём оптимальный вариант.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 md:p-8 flex flex-col relative ${
                p.popular ? "border-primary shadow-glow" : ""
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  ПОПУЛЯРНЫЙ ВЫБОР
                </div>
              )}
              <div className="text-center mb-6">
                <div className="text-2xl mb-2">{p.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
                <div className="mt-2">
                  <span className="text-muted-foreground/60 line-through text-sm">{p.oldPrice}</span>
                  <div className="font-display text-2xl font-extrabold text-primary">{p.price}</div>
                </div>
                <span className="inline-block mt-1 bg-success/15 text-success text-xs font-semibold px-2 py-0.5 rounded-full">
                  Экономия {p.saving}
                </span>
              </div>

              <div className="space-y-3 flex-1 mb-6">
                {p.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check size={14} className="text-success shrink-0" />
                    ) : (
                      <X size={14} className="text-muted-foreground/50 shrink-0" />
                    )}
                    <span className={f.included ? "text-muted-foreground" : "text-muted-foreground/50"}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground mb-4 space-y-1">
                <div>⏱ Срок: {p.time}</div>
                <div>🛡 Поддержка: {p.support}</div>
              </div>

              <a
                href="https://t.me/Isra_Tech"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 ${
                  p.popular
                    ? "bg-gradient-primary text-primary-foreground btn-shimmer"
                    : "border border-border text-foreground hover:border-primary"
                }`}
                aria-label={`Выбрать тариф ${p.name}`}
              >
                Выбрать →
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 space-y-2 text-sm text-muted-foreground"
        >
          <p>Нужно что-то особенное? Напишите мне — обсудим индивидуальное решение.</p>
          <p>Принимаю оплату в ₽, $, ₪ и криптовалюте. Работаю по договору.</p>
        </motion.div>
      </div>
    </section>
  );
}
