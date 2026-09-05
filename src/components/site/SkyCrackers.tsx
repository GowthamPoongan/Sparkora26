import { useEffect, useRef } from "react";

/**
 * Sky Crackers / Fireworks rocket animation.
 * Rockets launch from the bottom of the viewport with streaming spark trails,
 * ascend toward the sky, and detonate into dazzling bursts of glowing sparks!
 */
export function SkyCrackers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;

    const resize = () => {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── Palettes: Gold/Orange/Ember, Electric Cyan/Blue, Festival Ruby/Gold ──
    const palettes = [
      {
        name: "fire-ember",
        hues: [20, 30, 42, 55, 12],
        rocketHue: 30,
      },
      {
        name: "electric-cyan",
        hues: [185, 200, 215, 240, 45],
        rocketHue: 195,
      },
      {
        name: "pure-gold",
        hues: [40, 48, 52, 60, 35],
        rocketHue: 45,
      },
      {
        name: "festive-ruby",
        hues: [350, 15, 28, 45, 340],
        rocketHue: 15,
      },
    ];

    interface Rocket {
      x: number;
      y: number;
      vx: number;
      vy: number;
      targetY: number;
      palette: (typeof palettes)[number];
      exploded: boolean;
      trail: { x: number; y: number; alpha: number; size: number }[];
    }

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      size: number;
      hue: number;
      lightness: number;
      twinkle: boolean;
      gravity: number;
    }

    interface Flash {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      hue: number;
    }

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const flashes: Flash[] = [];

    const launchRocket = (startX?: number, targetHeight?: number) => {
      const palette = palettes[Math.floor(Math.random() * palettes.length)]!;
      const x = startX !== undefined ? startX : w * (0.15 + Math.random() * 0.7);
      const targetY =
        targetHeight !== undefined
          ? targetHeight
          : h * (0.16 + Math.random() * 0.38);

      // Calculate initial velocity to reach targetY cleanly
      const distance = h - targetY;
      const speed = Math.sqrt(2 * 0.22 * distance);
      const vy = -speed;
      const vx = (Math.random() - 0.5) * 2.2;

      rockets.push({
        x,
        y: h + 10,
        vx,
        vy,
        targetY,
        palette,
        exploded: false,
        trail: [],
      });
    };

    const detonate = (x: number, y: number, palette: (typeof palettes)[number]) => {
      // 1. Flash
      flashes.push({
        x,
        y,
        radius: 6,
        maxRadius: 75 + Math.random() * 35,
        alpha: 0.95,
        hue: palette.rocketHue,
      });

      // 2. Blast sparks (60–85 particles in radial explosion)
      const sparkCount = 65 + Math.floor(Math.random() * 25);
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Inner and outer burst shells
        const force =
          i % 3 === 0
            ? 1.5 + Math.random() * 3.5
            : 3.5 + Math.random() * 4.5;
        const hue =
          palette.hues[Math.floor(Math.random() * palette.hues.length)]!;
        const isTwinkle = Math.random() < 0.35;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.018,
          size: 1.5 + Math.random() * 2.8,
          hue,
          lightness: 55 + Math.random() * 35,
          twinkle: isTwinkle,
          gravity: 0.075 + Math.random() * 0.035,
        });
      }

      // 3. Crackle micro-bursts (a few sparks that pop late)
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = 2.0 + Math.random() * 2.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 0.5,
          alpha: 1,
          decay: 0.008 + Math.random() * 0.01,
          size: 2.5 + Math.random() * 2,
          hue: 45, // gold
          lightness: 90, // white-hot
          twinkle: true,
          gravity: 0.05,
        });
      }
    };

    // Initial festive sequence on mount
    const timer1 = setTimeout(() => launchRocket(w * 0.28, h * 0.24), 600);
    const timer2 = setTimeout(() => launchRocket(w * 0.72, h * 0.22), 1200);
    const timer3 = setTimeout(() => launchRocket(w * 0.5, h * 0.3), 1900);

    // Continuous launcher interval
    let lastLaunch = Date.now();
    let nextLaunchDelay = 2200;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Launch check
      const now = Date.now();
      if (now - lastLaunch > nextLaunchDelay) {
        lastLaunch = now;
        nextLaunchDelay = 1600 + Math.random() * 1600; // between 1.6s and 3.2s
        launchRocket();
      }

      // ── Update & Render Flashes ──
      for (let i = 0; i < flashes.length; i++) {
        const f = flashes[i]!;
        f.radius += (f.maxRadius - f.radius) * 0.28;
        f.alpha *= 0.84;

        if (f.alpha < 0.02) {
          flashes.splice(i, 1);
          i--;
          continue;
        }

        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        fg.addColorStop(0, `hsla(${f.hue}, 100%, 85%, ${f.alpha * 0.7})`);
        fg.addColorStop(0.35, `hsla(${f.hue}, 100%, 55%, ${f.alpha * 0.4})`);
        fg.addColorStop(1, `hsla(${f.hue}, 100%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = fg;
        ctx.fill();
      }

      // ── Update & Render Rockets ──
      for (let i = 0; i < rockets.length; i++) {
        const r = rockets[i]!;
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.22; // gravity deceleration

        // Add trail spark
        r.trail.push({
          x: r.x + (Math.random() - 0.5) * 2,
          y: r.y + (Math.random() - 0.5) * 2,
          alpha: 1,
          size: 1.8 + Math.random() * 2,
        });

        // Detonation condition: apex reached or passed target altitude
        if (r.vy >= -1.2 || r.y <= r.targetY) {
          detonate(r.x, r.y, r.palette);
          rockets.splice(i, 1);
          i--;
          continue;
        }

        // Draw trail sparks
        for (let j = 0; j < r.trail.length; j++) {
          const t = r.trail[j]!;
          t.alpha -= 0.055;
          t.y += 1.2; // drift down
          t.size *= 0.96;

          if (t.alpha <= 0) {
            r.trail.splice(j, 1);
            j--;
            continue;
          }

          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${r.palette.rocketHue}, 100%, 65%, ${t.alpha * 0.8})`;
          ctx.fill();
        }

        // Draw rocket head flare
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 16;
        ctx.shadowColor = `hsla(${r.palette.rocketHue}, 100%, 60%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Update & Render Blast Sparks ──
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]!;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.965; // drag
        s.vy *= 0.965;
        s.vy += s.gravity; // downward pull
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          i--;
          continue;
        }

        // Twinkle factor
        let currentAlpha = s.alpha;
        if (s.twinkle && Math.random() < 0.25) {
          currentAlpha = Math.min(1, s.alpha * 1.5);
        }

        const size = s.size * (0.4 + s.alpha * 0.6);

        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, ${s.lightness}%, ${currentAlpha})`;
        ctx.shadowBlur = s.alpha > 0.4 ? 12 : 5;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 55%, ${currentAlpha * 0.8})`;
        ctx.fill();

        // Hot white sparkling core on brighter sparks
        if (size > 1.8 && s.alpha > 0.5) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    tick();

    // Click/tap interaction: launch sky cracker towards click coordinate!
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const rect = canvas.getBoundingClientRect();
      // Only trigger if click/touch happened in this section
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const x = clientX - rect.left;
        const targetY = Math.max(h * 0.12, clientY - rect.top);
        launchRocket(x, targetY);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
