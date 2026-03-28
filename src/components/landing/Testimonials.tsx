import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Михаил сделал невозможное — наш сайт наконец-то начал приносить клиентов. За первый месяц — 32 заявки. Рекомендую всем, кто устал от шаблонных решений.",
    name: "Алексей К.",
    role: "основатель интернет-магазина, Москва",
    tg: "@aleksey_k",
    avatar: "https://ui-avatars.com/api/?name=%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9+%D0%9A&background=00D4FF&color=0D1117&size=48&bold=true",
  },
  {
    text: "Telegram-бот, который сделал Михаил, заменил одного сотрудника. Экономим 80,000₽/месяц на зарплате. Окупился за 2 недели. Это магия.",
    name: "Ольга Д.",
    role: "владелица сети салонов, Екатеринбург",
    tg: "@olga_beauty",
    avatar: "https://ui-avatars.com/api/?name=%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0+%D0%94&background=7B2FFF&color=FFFFFF&size=48&bold=true",
  },
  {
    text: "Профессионализм на уровне, которого я не встречал на российском рынке. Чувствуется израильская школа. Работает быстро, объясняет понятно, результат — ВАУ.",
    name: "Дмитрий С.",
    role: "CEO стартапа, Казань",
    tg: "@dmitriy_startup",
    avatar: "https://ui-avatars.com/api/?name=%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9+%D0%A1&background=FFD700&color=0D1117&size=48&bold=true",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Что говорят клиенты
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                «{t.text}»
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={`Аватар ${t.name}`}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full shrink-0"
                  loading="lazy"
                />
                <div>
                  <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.role}</div>
                  <div className="text-primary text-xs mt-0.5">💬 {t.tg} (Telegram)</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
