import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
}

const QUICK_REPLIES = [
  { label: "💰 Сколько стоит сайт?", key: "price" },
  { label: "⏱ Как быстро сделаете?", key: "speed" },
  { label: "🤖 Что такое AI-автоматизация?", key: "ai" },
  { label: "📞 Хочу консультацию", key: "consult" },
];

const BOT_RESPONSES: Record<string, string> = {
  price:
    "Всё зависит от задач! 🎯\n\n⚡ Лендинг: от $500 (5-7 дней)\n🚀 Бизнес-сайт + AI: от $1,500\n💎 Полная экосистема: от $3,000\n\nХотите обсудить ваш проект? Напишите мне в Telegram — отвечу за час! 📱",
  speed:
    "Быстро! ⚡\n\n📅 Лендинг: 5-7 дней\n📅 Полноценный сайт: 10-14 дней\n📅 Сайт + AI + автоматизация: 14-21 день\n\nА бесплатную консультацию могу провести уже сегодня! 😊",
  ai: "Это когда AI работает НА ВАС 24/7! 🤖\n\nНапример:\n• Чат-бот отвечает клиентам вместо вас\n• Telegram-бот принимает заказы\n• Система сама отправляет отчёты\n• AI оптимизирует вашу рекламу\n\nРезультат: вы экономите 20+ часов в неделю! Хотите узнать больше?",
  consult:
    "Отлично! 🎉 Вот как связаться с Михаилом:\n\n📱 Telegram: @Isra_Tech (отвечает за 1 час)\n💬 WhatsApp: +972-50-603-1399\n\nКонсультация бесплатная, 30 минут в Zoom. Обсудим ваш проект и я сделаю мини-аудит вашего сайта! 🇮🇱",
  default:
    "Интересный вопрос! 🤔 Для детального ответа лучше пообщаться лично.\n\n📱 Напишите Михаилу в Telegram: @Isra_Tech\nОн обычно отвечает в течение часа! ⚡",
};

function formatBotText(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split("\n").length - 1 && <br />}
    </span>
  ));
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Привет! 👋 Я AI-ассистент Михаила. Выберите вопрос ниже или напишите свой:",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  // Show speech bubble after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    const hideTimer = setTimeout(() => setShowBubble(false), 11000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendBotReply = useCallback((key: string) => {
    const text = BOT_RESPONSES[key] ?? BOT_RESPONSES.default;
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, text, from: "bot" },
      ]);
    }, 900);
  }, []);

  const handleQuickReply = (key: string, label: string) => {
    setMessages((prev) => [
      ...prev,
      { id: idRef.current++, text: label, from: "user" },
    ]);
    sendBotReply(key);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: idRef.current++, text: trimmed, from: "user" },
    ]);
    setInput("");
    sendBotReply("default");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setShowBubble(false);
    setIsHappy(true);
    document.body.setAttribute("data-chatbot-open", "1");
    setTimeout(() => setIsHappy(false), 1000);
  };

  const closeChat = () => {
    setIsOpen(false);
    document.body.removeAttribute("data-chatbot-open");
  };

  return (
    <>
      {/* Speech Bubble */}
      {showBubble && !isOpen && (
        <div
          className="fixed bottom-[88px] right-6 z-50 pointer-events-none"
          style={{ animation: "chatBubbleIn 0.4s ease forwards" }}
        >
          <div
            className="relative px-4 py-3 rounded-2xl rounded-br-none text-sm text-foreground max-w-[220px]"
            style={{
              background: "hsla(220, 26%, 11%, 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsla(191, 100%, 50%, 0.3)",
              boxShadow: "0 8px 32px hsla(191, 100%, 50%, 0.15)",
            }}
          >
            Привет! 👋 Я AI-ассистент Михаила. Чем могу помочь?
            {/* tail */}
            <span
              className="absolute bottom-0 right-0 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderTop: "8px solid hsla(220, 26%, 11%, 0.85)",
              }}
            />
          </div>
        </div>
      )}

      {/* Robot Avatar Button */}
      <button
        onClick={openChat}
        onMouseEnter={() => setIsHappy(true)}
        onMouseLeave={() => setIsHappy(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
        style={{
          background: "linear-gradient(135deg, hsl(191 100% 50%) 0%, hsl(261 100% 59%) 100%)",
          boxShadow: "0 0 24px hsla(191, 100%, 50%, 0.5)",
          animation: "robotBreathe 3s ease-in-out infinite",
        }}
        aria-label="Открыть AI-чат"
      >
        {/* Robot Face */}
        <div className="relative flex flex-col items-center justify-center w-9 h-9">
          {/* Head */}
          <div
            className="w-8 h-8 rounded-xl flex flex-col items-center justify-center relative"
            style={{ background: "hsla(0,0%,100%,0.15)" }}
          >
            {/* Eyes */}
            <div className="flex gap-1.5 mb-0.5">
              {isHappy ? (
                <>
                  <div className="w-2 h-1 rounded-full bg-white" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
                  <div className="w-2 h-1 rounded-full bg-white" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
                </>
              ) : (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "eyeBlink 4s ease-in-out infinite" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "eyeBlink 4s ease-in-out infinite 0.1s" }} />
                </>
              )}
            </div>
            {/* Mouth */}
            <div
              className="w-3.5 h-1"
              style={{
                borderBottom: "1.5px solid rgba(255,255,255,0.7)",
                borderRadius: "0 0 4px 4px",
              }}
            />
            {/* Antenna */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-1 h-0.5 rounded-full bg-white/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>
          </div>
        </div>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[350px] max-h-[500px] flex flex-col rounded-[20px] overflow-hidden sm:w-[350px] max-sm:inset-x-2 max-sm:bottom-2 max-sm:w-auto"
          style={{
            background: "hsla(220, 26%, 9%, 0.95)",
            backdropFilter: "blur(24px)",
            border: "1px solid hsla(191, 100%, 50%, 0.25)",
            boxShadow: "0 20px 60px hsla(191, 100%, 50%, 0.2), 0 0 0 1px hsla(215,14%,21%,0.5)",
            animation: "chatOpen 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: "hsla(191, 100%, 50%, 0.15)" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(191 100% 50%) 0%, hsl(261 100% 59%) 100%)" }}
            >
              <Bot size={18} className="text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground">AI-ассистент</div>
              <div className="text-xs text-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" style={{ animation: "pulse 2s infinite" }} />
                Онлайн
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
              aria-label="Закрыть чат"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[280px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                style={{ animation: "msgSlideIn 0.25s ease forwards" }}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "rounded-br-sm text-background font-medium"
                      : "rounded-bl-sm text-foreground"
                  }`}
                  style={
                    msg.from === "user"
                      ? { background: "linear-gradient(135deg, hsl(191 100% 50%) 0%, hsl(261 100% 59%) 100%)" }
                      : { background: "hsla(220, 26%, 16%, 0.9)", border: "1px solid hsla(215,14%,25%,0.5)" }
                  }
                >
                  {formatBotText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-sm"
                  style={{ background: "hsla(220, 26%, 16%, 0.9)", border: "1px solid hsla(215,14%,25%,0.5)" }}
                >
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        style={{ animation: `typingDot 1.4s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t" style={{ borderColor: "hsla(191,100%,50%,0.1)" }}>
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr.key}
                onClick={() => handleQuickReply(qr.key, qr.label)}
                className="text-xs px-2.5 py-1.5 rounded-full border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                style={{ borderColor: "hsla(215,14%,25%,0.8)" }}
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Написать сообщение..."
              className="flex-1 bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(191 100% 50%) 0%, hsl(261 100% 59%) 100%)" }}
              aria-label="Отправить"
            >
              <Send size={14} className="text-background" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
