import { Send, MessageCircle, Mail } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "Обо мне" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#pricing", label: "Цены" },
  { href: "#contact", label: "Контакты" },
];

const trustSignals = [
  "🇮🇱 Израильский эксперт",
  "🔒 Работаю по договору",
  "💳 Безопасная оплата",
  "📱 Прямая связь 24/7",
  "⭐ 4.9/5 средний рейтинг",
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="font-display text-xl font-extrabold text-primary">
              M.Y. <span className="text-foreground">|</span> <span className="text-sm text-muted-foreground">Israel 🇮🇱</span>
            </a>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Израильские технологии для вашего бизнеса
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {trustSignals.map((s) => (
                <span key={s} className="text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground text-sm mb-4">Навигация</h4>
            <div className="space-y-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground text-sm mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href="https://t.me/Isra_Tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Send size={14} /> Telegram: @Isra_Tech
              </a>
              <a
                href="https://wa.me/972506031399"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp: +972-50-603-1399
              </a>
              <a
                href="mailto:m.yakubov0715@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={14} /> m.yakubov0715@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground space-y-1">
          <p>© 2026 Michael Y. | Тель-Авив, Израиль 🇮🇱</p>
          <p>Работаю с клиентами из России, СНГ, Европы и Израиля</p>
        </div>
      </div>
    </footer>
  );
}
