import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; colorType: number };

/**
 * Low-density interactive particle field.
 * Harmonious warm embers with subtle soft accents, mobile-optimized for 60fps.
 */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.navigator.maxTouchPoints > 0);

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = isMobile
        ? Math.min(22, Math.round((w * h) / 38000))
        : Math.min(48, Math.round((w * h) / 28000));

      particles = Array.from({ length: count }, () => {
        const rand = Math.random();
        // 0 = warm orange ember (60%), 1 = gold sparkle (28%), 2 = soft muted cyan tint (12%)
        const colorType = rand < 0.6 ? 0 : rand < 0.88 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: Math.random() * 1.5 + 0.6,
          colorType,
        };
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 0.3;
          p.vx += (dx / Math.sqrt(d2 || 1)) * f * 0.35;
          p.vy += (dy / Math.sqrt(d2 || 1)) * f * 0.35;
        }
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx * 0.99));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy * 0.99));
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        // Harmonious colors without high-contrast blue glare
        if (p.colorType === 0) {
          ctx.fillStyle = "rgba(255, 145, 50, 0.65)";
        } else if (p.colorType === 1) {
          ctx.fillStyle = "rgba(255, 205, 85, 0.55)";
        } else {
          ctx.fillStyle = "rgba(120, 170, 225, 0.22)"; // soft muted ethereal tint
        }

        if (!isMobile) {
          ctx.shadowBlur = 6;
          ctx.shadowColor =
            p.colorType === 0
              ? "rgba(255, 130, 30, 0.5)"
              : p.colorType === 1
                ? "rgba(255, 195, 60, 0.4)"
                : "rgba(100, 160, 220, 0.15)";
        }
        ctx.fill();
      }
      if (!isMobile) ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchend", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-65"
    />
  );
}
