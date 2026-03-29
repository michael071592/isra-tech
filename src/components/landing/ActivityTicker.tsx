import { useState, useEffect, useRef } from "react";

const ACTIVITIES = [
  { flag: "🇷🇺", text: "Александр из Москвы оставил заявку", time: "2 мин назад" },
  { flag: "🇰🇿", text: "Новый проект запущен для клиента из Алматы", time: "15 мин назад" },
  { flag: "⭐", text: "Дмитрий оставил отзыв 5/5", time: "1 час назад" },
  { flag: "🚀", text: "Telegram-бот доставлен клиенту", time: "3 часа назад" },
  { flag: "📈", text: "Конверсия клиента выросла на 280%", time: "вчера" },
  { flag: "🇺🇦", text: "Анна из Киева оставила заявку", time: "5 мин назад" },
  { flag: "💼", text: "Новый сайт запущен для бизнеса в Минске", time: "2 часа назад" },
];

export default function ActivityTicker() {
  const [current, setCurrent] = useState<typeof ACTIVITIES[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    // Only on desktop
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const show = () => {
      const item = ACTIVITIES[indexRef.current % ACTIVITIES.length];
      indexRef.current++;
      // Don't show if chatbot is open
      if (document.body.hasAttribute("data-chatbot-open")) {
        timerRef.current = setTimeout(show, (Math.random() * 8000) + 12000);
        return;
      }
      setCurrent(item);
      setVisible(true);

      // Hide after 5s
      timerRef.current = setTimeout(() => {
        setVisible(false);
        // Schedule next
        timerRef.current = setTimeout(show, (Math.random() * 8000) + 12000);
      }, 5000);
    };

    // First show after random 5-12s
    timerRef.current = setTimeout(show, (Math.random() * 7000) + 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!current) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 hidden md:block max-w-[260px]"
      style={{
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    >
      <div
        className="px-4 py-3 rounded-xl text-sm"
        style={{
          background: "hsla(220, 26%, 11%, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid hsla(191, 100%, 50%, 0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-start gap-2">
          <span className="text-base flex-shrink-0 mt-0.5">{current.flag}</span>
          <div>
            <p className="text-foreground text-xs leading-snug font-medium">{current.text}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{current.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
