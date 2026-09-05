import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; ember: boolean };

/**
 * Low-density interactive particle field.
 * Signature blue + vibrant orange particles as before on PC,
 * with contrast balanced and 60fps optimized for phone screens.
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
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = isMobile
        ? Math.min(16, Math.round((w * h) / 45000))
        : Math.min(38, Math.round((w * h) / 32000));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.6,
        ember: Math.random() < 0.4,
      }));
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
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12000) {
          const f = (1 - d2 / 12000) * 0.28;
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

        // Vibrant colors with zero-overhead alpha (no GPU-choking shadowBlur)
        ctx.fillStyle = p.ember
          ? "rgba(255, 155, 60, 0.72)"
          : "rgba(90, 175, 255, 0.68)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
