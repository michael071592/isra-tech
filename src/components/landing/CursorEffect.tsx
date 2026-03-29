import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  opacity: number;
  size: number;
  gold: boolean;
}

const NUM_DOTS = 10;

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>(
    Array.from({ length: NUM_DOTS }, () => ({ x: -100, y: -100, opacity: 0, size: 5, gold: false }))
  );
  const mouseRef = useRef({ x: -100, y: -100, gold: false });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on fine-pointer (desktop) devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!(
        target.closest("a, button, [role='button'], input, textarea, select, label")
      );
      mouseRef.current = { x: e.clientX, y: e.clientY, gold: isInteractive };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dots = dotsRef.current;
      const mouse = mouseRef.current;

      // Shift dots forward
      for (let i = NUM_DOTS - 1; i > 0; i--) {
        dots[i].x += (dots[i - 1].x - dots[i].x) * 0.3;
        dots[i].y += (dots[i - 1].y - dots[i].y) * 0.3;
        dots[i].gold = dots[i - 1].gold;
      }
      // First dot follows mouse
      dots[0].x += (mouse.x - dots[0].x) * 0.5;
      dots[0].y += (mouse.y - dots[0].y) * 0.5;
      dots[0].gold = mouse.gold;

      // Draw dots
      for (let i = 0; i < NUM_DOTS; i++) {
        const opacity = (1 - i / NUM_DOTS) * 0.7;
        const size = mouse.gold
          ? (1 - i / NUM_DOTS) * 7 + 2
          : (1 - i / NUM_DOTS) * 5 + 1;

        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, size, 0, Math.PI * 2);

        const color = dots[i].gold
          ? `rgba(255, 204, 0, ${opacity})`
          : `rgba(0, 224, 255, ${opacity})`;

        ctx.fillStyle = color;

        if (i === 0) {
          ctx.shadowBlur = dots[i].gold ? 12 : 8;
          ctx.shadowColor = dots[i].gold ? "rgba(255, 204, 0, 0.8)" : "rgba(0, 224, 255, 0.8)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[40] pointer-events-none hidden md:block"
      style={{ willChange: "transform" }}
    />
  );
}
