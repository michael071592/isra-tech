import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Почему вы дороже фрилансера с биржи?",
    a: "Потому что я не фрилансер с биржи. Я использую передовые израильские технологии и AI-инструменты, которые дают РЕЗУЛЬТАТ — рост продаж, экономию времени, автоматизацию. Вы платите за экспертизу, которая окупается в первый же месяц.",
  },
  {
    q: "Как вы работаете удалённо из Израиля?",
    a: "Так же, как работают все мировые стартапы: Zoom, Telegram, удобная timezone (разница с Москвой всего 1 час). Плюс — вы получаете доступ к технологиям, которые в СНГ ещё только набирают обороты.",
  },
  {
    q: "Какие гарантии?",
    a: "Бесплатная консультация — если не увидите ценность, ничего не платите. По проектам: бесплатные правки, поддержка после запуска, прозрачная коммуникация на каждом этапе. Я не исчезаю после оплаты.",
  },
  {
    q: "Сколько времени занимает проект?",
    a: "Лендинг: 5-7 дней. Полноценный сайт: 10-14 дней. Экосистема с AI и автоматизацией: 14-21 день. Точные сроки — после анализа задачи.",
  },
  {
    q: "Работаете с Яндекс.Директ?",
    a: "Да, настраиваю и оптимизирую рекламу как в Google Ads, так и в Яндекс.Директ с AI-оптимизацией ставок и бюджета.",
  },
  {
    q: "Можно заплатить в рублях?",
    a: "Да. Принимаю ₽, $, ₪ и криптовалюту. Работаю по договору. Выставляю счёт, всё официально.",
  },
  {
    q: "Что если мне не понравится результат?",
    a: "Вы видите промежуточные результаты на каждом этапе. Правки включены в стоимость. Мы не двигаемся дальше, пока вы не одобрите текущий этап. Полная прозрачность.",
  },
  {
    q: "Вы делаете сайты на Tilda/конструкторах?",
    a: "Нет. Я пишу код с нуля (React, Next.js). Это даёт полный контроль над дизайном, скоростью, SEO и масштабируемостью — то, чего конструкторы не могут обеспечить.",
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Частые вопросы
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="font-display text-sm md:text-base font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
