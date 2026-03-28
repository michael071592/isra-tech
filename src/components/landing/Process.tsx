import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { num: "01", icon: "📞", title: "Бесплатная консультация", desc: "30 минут в Zoom/Telegram. Обсуждаем задачи, делаю мини-аудит.", time: "День 1" },
  { num: "02", icon: "🔍", title: "Анализ и стратегия", desc: "Изучаю ваш бизнес, конкурентов, ЦА. Готовлю план и смету.", time: "Дни 2-3" },
  { num: "03", icon: "⚡", title: "Разработка и тестирование", desc: "Создаю, тестирую, показываю промежуточные результаты. Правки — бесплатно.", time: "Дни 3-14" },
  { num: "04", icon: "🚀", title: "Запуск и поддержка", desc: "Запускаем! Обучаю вас работе с системой. Поддержка и оптимизация включены.", time: "День 15+" },
];

export default function Process() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="process" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Как мы работаем вместе
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 text-center relative"
            >
              <div className="text-primary font-display text-xs font-bold tracking-widest mb-3">
                STEP {s.num}
              </div>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{s.desc}</p>
              <span className="text-xs text-primary/70">⏱ {s.time}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 text-sm text-primary font-medium">
            ⚡ Средний срок запуска — 10 дней
          </span>
        </motion.div>
      </div>
    </section>
  );
}
