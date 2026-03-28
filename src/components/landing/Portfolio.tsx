import { motion } from "framer-motion";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { ShoppingCart, Factory, Stethoscope } from "lucide-react";

const stats = [
  { value: 50, suffix: "+", label: "проектов" },
  { value: 98, suffix: "%", label: "довольных" },
  { value: 15, suffix: "+", label: "стран" },
  { value: 2, prefix: "<", suffix: "сек", label: "скорость сайтов" },
];

const cases = [
  {
    Icon: ShoppingCart,
    gradient: "from-[hsl(191,100%,50%)] to-[hsl(261,100%,59%)]",
    title: "Интернет-магазин — Москва",
    task: "Сайт не конвертировал, 0.3% конверсия",
    solution: "Редизайн + AI чат-бот + SEO оптимизация",
    result: "Конверсия выросла до 3.8% (+1160%)",
  },
  {
    Icon: Factory,
    gradient: "from-[hsl(136,55%,40%)] to-[hsl(191,100%,50%)]",
    title: "Промышленная компания — Санкт-Петербург",
    task: "Нет онлайн-присутствия, все продажи через холодные звонки",
    solution: "Продающий сайт + Telegram-бот + Google Ads",
    result: "45 заявок/месяц с сайта, ROI рекламы 380%",
  },
  {
    Icon: Stethoscope,
    gradient: "from-[hsl(51,100%,50%)] to-[hsl(27,86%,59%)]",
    title: "Сеть клиник — Казахстан",
    task: "Рутина отнимала 25+ часов/неделю у администраторов",
    solution: "n8n автоматизация + AI-ассистент + CRM",
    result: "Экономия 20 часов/неделю, автозапись 24/7",
  },
];

function StatCounter({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2500, isVisible);
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl font-extrabold text-primary">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
    </div>
  );
}

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="portfolio" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Результаты, которые говорят сами за себя
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <StatCounter stat={s} isVisible={isVisible} />
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 flex flex-col hover:scale-105 transition-transform duration-300"
            >
              <div className={`h-32 bg-gradient-to-br ${c.gradient} rounded-lg mb-4 flex items-center justify-center opacity-80`}>
                <c.Icon size={48} className="text-white drop-shadow-lg" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-3">{c.title}</h3>
              <div className="space-y-2 text-sm flex-1">
                <p><span className="text-muted-foreground font-medium">Задача:</span> <span className="text-muted-foreground">{c.task}</span></p>
                <p><span className="text-primary font-medium">Решение:</span> <span className="text-muted-foreground">{c.solution}</span></p>
                <p><span className="text-success font-medium">Результат:</span> <span className="text-foreground font-semibold">{c.result}</span></p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <a
            href="https://t.me/Isra_Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold btn-shimmer hover:scale-105 transition-transform"
            aria-label="Хочу такой же результат — написать в Telegram"
          >
            Хочу такой же результат →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
