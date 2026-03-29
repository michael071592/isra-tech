import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const badges = [
  "🇮🇱 Тель-Авив, Израиль",
  "🤖 AI & Automation Expert",
  "🏆 50+ Проектов",
  "💻 Full-Stack Developer",
  "🗣 RU / HE / EN",
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-[420px] rounded-2xl border border-border overflow-hidden shadow-glow">
              <img
                src="/profile.jpg"
                alt="Михаил — израильский эксперт по веб-технологиям"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Михаил — веб-инженер и AI-специалист из Израиля
            </h2>

            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              <p>
                Базируюсь в Тель-Авиве — эпицентре мировой стартап-экосистемы.
                Объединяю передовые израильские технологии с глубоким пониманием русскоязычного рынка.
              </p>
              <p>
                Я не просто делаю сайты — я создаю цифровые продукты, которые работают на ваш бизнес
                24 часа в сутки, 7 дней в неделю.
              </p>
              <p>
                Моя суперсила: соединять лучшее из израильского хай-тека (AI, автоматизация, growth-хакинг)
                с потребностями русскоязычного бизнеса.
              </p>
              <p>
                Работаю с клиентами из России, СНГ, Европы и Израиля.
                Свободно говорю на русском, иврите и английском.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="bg-muted border border-border rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
