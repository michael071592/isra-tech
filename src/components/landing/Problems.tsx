import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  { icon: "💸", title: "Сайт не приносит клиентов", desc: "Вы потратили деньги на сайт, но он не генерирует ни заявок, ни продаж. Просто визитка в интернете." },
  { icon: "🐌", title: "Конкуренты обгоняют", desc: "Ваши конкуренты уже используют AI и автоматизацию, а вы всё ещё делаете всё вручную." },
  { icon: "⏰", title: "Нет времени на рутину", desc: "Вы тратите часы на задачи, которые робот может сделать за секунды. Время = деньги." },
  { icon: "🤯", title: "Технологии пугают", desc: "AI, боты, автоматизация — звучит сложно? Мне — нет. Я сделаю всё за вас." },
];

export default function Problems() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="problems" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Знакомо?
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-lg md:text-xl text-muted-foreground font-medium"
        >
          Именно эти проблемы я решаю каждый день. Вот как ↓
        </motion.p>
      </div>
    </section>
  );
}
