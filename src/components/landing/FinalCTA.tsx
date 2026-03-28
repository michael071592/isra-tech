import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageCircle, Send } from "lucide-react";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
        >
          Готовы вывести бизнес на новый уровень?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Запишитесь на бесплатную 30-минутную консультацию. Обсудим ваш проект,
          проведу мини-аудит текущего сайта и предложу стратегию роста. Без обязательств.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <a
            href="https://t.me/Isra_Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold btn-shimmer hover:scale-105 transition-transform"
          >
            <Send size={20} />
            Написать в Telegram
          </a>
          <a
            href="https://wa.me/972506031399"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl text-lg font-bold hover:border-primary hover:text-primary transition-all"
          >
            <MessageCircle size={20} />
            Написать в WhatsApp
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-sm mb-4"
        >
          ⚡ Обычно отвечаю в течение 1 часа
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 text-warning rounded-full px-5 py-2 text-sm font-medium"
        >
          🔥 В этом месяце осталось 3 слота для новых проектов
        </motion.div>
      </div>
    </section>
  );
}
