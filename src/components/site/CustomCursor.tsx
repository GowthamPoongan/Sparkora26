import { useEffect, useRef } from "react";

/**
 * Orange fire spark cursor — trails of burning sparks and embers.
 * Runs exclusively on fine pointer devices (desktop mouse/trackpad).
 * Disabled on touch/mobile devices to ensure maximum smooth native scrolling.
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run custom cursor on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let hasMouseMoved = false;

    const enableMouseCursor = () => {
      if (!hasMouseMoved) {
        hasMouseMoved = true;
        document.body.classList.add("custom-cursor-active");
      }
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const cursor = { x: -100, y: -100 };
    const mouse = { x: -100, y: -100 };
    let prevCX = -100;
    let prevCY = -100;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      hue: number;
      lightness: number;
      type: "spark" | "ember";
    }
    const particles: Particle[] = [];

    let raf = 0;
    let frame = 0;
    let isRunning = false;

    const spawnSparks = (cx: number, cy: number, speed: number, dx: number, dy: number) => {
      const maxParticles = 35;
      const sparkCount = Math.min(Math.floor(speed * 0.4 + 1), 3);

      for (let i = 0; i < sparkCount; i++) {
        if (particles.length >= maxParticles) break;
        const angle = Math.random() * Math.PI * 2;
        const vel = 1 + Math.random() * 2.5 + speed * 0.1;
        particles.push({
          x: cx + (Math.random() - 0.5) * 6,
          y: cy + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * vel + dx * 0.06,
          vy: Math.sin(angle) * vel + dy * 0.06 - 0.8,
          life: 0,
          maxLife: 15 + Math.random() * 20,
          size: 1 + Math.random() * 2.2,
          hue: 15 + Math.random() * 35,
          lightness: 55 + Math.random() * 30,
          type: "spark",
        });
      }

      if (frame % 3 === 0 && particles.length < maxParticles) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 8,
          y: cy + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(0.4 + Math.random() * 0.9),
          life: 0,
          maxLife: 25 + Math.random() * 30,
          size: 2 + Math.random() * 2.5,
          hue: 20 + Math.random() * 25,
          lightness: 50 + Math.random() * 20,
          type: "ember",
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      if (hasMouseMoved && mouse.x > -50 && mouse.y > -50) {
        cursor.x += (mouse.x - cursor.x) * 0.2;
        cursor.y += (mouse.y - cursor.y) * 0.2;

        const dx = cursor.x - prevCX;
        const dy = cursor.y - prevCY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        prevCX = cursor.x;
        prevCY = cursor.y;

        if (speed > 0.3) {
          spawnSparks(cursor.x, cursor.y, speed, dx, dy);
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        if (p.type === "spark") p.vy += 0.05;

        const alpha = (1 - t) * (1 - t);
        const currentSize = p.size * (1 - t * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${p.lightness}%, ${alpha})`;
        ctx.fill();

        if (currentSize > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(45, 100%, 95%, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      // Draw glowing cursor core
      if (hasMouseMoved && cursor.x > -50 && cursor.y > -50) {
        const dotR = 4.5;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(35, 100%, 65%, 0.95)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "hsla(25, 100%, 50%, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      enableMouseCursor();
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (cursor.x < -50) {
        cursor.x = mouse.x;
        cursor.y = mouse.y;
        prevCX = cursor.x;
        prevCY = cursor.y;
      }
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      id="custom-cursor-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    />
  );
}
