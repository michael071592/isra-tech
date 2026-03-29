import { useState, useEffect } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    const seen = sessionStorage.getItem("isra-tech-loaded");
    if (seen) return;

    setVisible(true);

    const leaveTimer = setTimeout(() => {
      setLeaving(true);
    }, 1600);

    const doneTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("isra-tech-loaded", "1");
    }, 2200);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "hsl(216, 28%, 7%)",
        transition: leaving ? "opacity 0.5s ease, transform 0.5s ease" : "none",
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* Logo */}
      <div
        style={{
          transition: leaving ? "transform 0.5s ease, opacity 0.5s ease" : "none",
          transform: leaving ? "scale(1.4)" : "scale(1)",
          opacity: leaving ? 0 : 1,
        }}
      >
        <div
          className="font-display text-4xl font-extrabold tracking-tight text-center"
          style={{
            background: "linear-gradient(135deg, hsl(191 100% 50%) 0%, hsl(261 100% 59%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "loaderPulse 1.2s ease-in-out infinite",
          }}
        >
          M.Y.
        </div>
        <div className="text-xs text-muted-foreground text-center mt-1 tracking-widest uppercase">
          IsraTech
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mt-8 w-32 h-0.5 rounded-full overflow-hidden"
        style={{ background: "hsla(215, 14%, 21%, 0.8)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(191 100% 50%) 0%, hsl(261 100% 59%) 100%)",
            animation: "loaderBar 1.5s ease-in-out forwards",
          }}
        />
      </div>
    </div>
  );
}
