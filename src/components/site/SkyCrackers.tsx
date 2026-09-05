import { useEffect, useRef } from "react";

/**
 * Sky Crackers / Fireworks Multi-Rocket Salvo animation.
 * Launches 5 to 6 rockets at a time from the bottom of the viewport,
 * ascending in synchrony with streaming spark trails, and detonating
 * into a spectacular multi-blast firework show!
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

    // ── Palettes: Fire/Ember, Electric Cyan, Pure Gold, Festive Ruby, Violet Neon ──
    const palettes = [
      {
        name: "fire-ember",
        hues: [20, 32, 44, 55, 12],
        rocketHue: 32,
      },
      {
        name: "electric-cyan",
        hues: [185, 200, 215, 240, 45],
        rocketHue: 195,
      },
      {
        name: "pure-gold",
        hues: [40, 48, 52, 60, 35],
        rocketHue: 48,
      },
      {
        name: "festive-ruby",
        hues: [345, 5, 22, 45, 335],
        rocketHue: 10,
      },
      {
        name: "neon-violet",
        hues: [275, 290, 310, 45, 260],
        rocketHue: 285,
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

    interface PendingRocket {
      delay: number;
      rocket: Rocket;
    }

    const rockets: Rocket[] = [];
    const pendingRockets: PendingRocket[] = [];
    const sparks: Spark[] = [];
    const flashes: Flash[] = [];

    // Detonate rocket into 60-80 explosive sparks
    const detonate = (x: number, y: number, palette: (typeof palettes)[number]) => {
      // 1. Flash
      flashes.push({
        x,
        y,
        radius: 6,
        maxRadius: 70 + Math.random() * 30,
        alpha: 0.95,
        hue: palette.rocketHue,
      });

      // 2. Blast sparks (radial explosion)
      const sparkCount = 60 + Math.floor(Math.random() * 22);
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Inner and outer burst shells
        const force =
          i % 3 === 0
            ? 1.5 + Math.random() * 3.2
            : 3.5 + Math.random() * 4.2;
        const hue =
          palette.hues[Math.floor(Math.random() * palette.hues.length)]!;
        const isTwinkle = Math.random() < 0.35;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.016,
          size: 1.5 + Math.random() * 2.5,
          hue,
          lightness: 55 + Math.random() * 35,
          twinkle: isTwinkle,
          gravity: 0.07 + Math.random() * 0.03,
        });
      }

      // 3. Crackle micro-bursts (delayed pop sparks)
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = 1.8 + Math.random() * 2.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 0.4,
          alpha: 1,
          decay: 0.008 + Math.random() * 0.01,
          size: 2.2 + Math.random() * 1.8,
          hue: 45, // Gold
          lightness: 90, // White-hot
          twinkle: true,
          gravity: 0.05,
        });
      }
    };

    /**
     * Launch a salvo of 5 to 6 sky crackers at a time!
     */
    const launchSalvo = (
      count = 5 + (Math.random() > 0.5 ? 1 : 0), // 5 or 6 crackers
      clickX?: number,
      clickTargetY?: number
    ) => {
      const actualCount = count;

      for (let i = 0; i < actualCount; i++) {
        let x: number;
        let targetY: number;
        let vx: number;

        if (clickX !== undefined) {
          // Spread in fan around clicked position
          const spreadWidth = Math.min(w * 0.5, 360);
          const offset = ((i - (actualCount - 1) / 2) / (actualCount - 1)) * spreadWidth;
          x = Math.max(w * 0.08, Math.min(w * 0.92, clickX + offset + (Math.random() - 0.5) * 25));
          targetY = Math.max(
            h * 0.12,
            Math.min(h * 0.45, (clickTargetY ?? h * 0.25) + (Math.random() - 0.5) * 60)
          );
          vx = ((i - (actualCount - 1) / 2) / (actualCount - 1)) * 3.0 + (Math.random() - 0.5) * 0.8;
        } else {
          // Evenly spaced across the screen width (12% to 88%)
          const margin = w * 0.12;
          const usableWidth = w - margin * 2;
          const step = usableWidth / (actualCount - 1);
          x = margin + i * step + (Math.random() - 0.5) * (step * 0.35);
          targetY = h * (0.15 + Math.random() * 0.28);
          // Slight inward convergence or natural trajectory
          const centerDist = (x - w / 2) / (w / 2);
          vx = -centerDist * 0.8 + (Math.random() - 0.5) * 1.4;
        }

        const palette = palettes[i % palettes.length]!;
        const distance = h - targetY;
        const speed = Math.sqrt(2 * 0.22 * distance);
        const vy = -speed;

        // Slight organic delay (0 to 6 frames) so they shoot like a real volley of crackers
        const delay = Math.floor(Math.random() * 7);

        pendingRockets.push({
          delay,
          rocket: {
            x,
            y: h + 10,
            vx,
            vy,
            targetY,
            palette,
            exploded: false,
            trail: [],
          },
        });
      }
    };

    // Initial festive blast of 5-6 crackers on mount!
    const initTimer = setTimeout(() => {
      launchSalvo(6);
    }, 450);

    // Continuous launcher interval (launch a 5-6 cracker volley every ~3 seconds)
    let lastLaunch = Date.now();
    let nextLaunchDelay = 3200;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Check pending rockets waiting on stagger
      for (let i = 0; i < pendingRockets.length; i++) {
        const p = pendingRockets[i]!;
        p.delay--;
        if (p.delay <= 0) {
          rockets.push(p.rocket);
          pendingRockets.splice(i, 1);
          i--;
        }
      }

      // Check recurring salvo launch
      const now = Date.now();
      if (now - lastLaunch > nextLaunchDelay) {
        lastLaunch = now;
        nextLaunchDelay = 2800 + Math.random() * 1200; // between 2.8s and 4.0s
        launchSalvo(Math.random() > 0.5 ? 6 : 5);
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
          size: 2.0 + Math.random() * 2.2,
        });

        // Detonation condition: apex reached or passed target altitude
        if (r.vy >= -1.0 || r.y <= r.targetY) {
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
          ctx.fillStyle = `hsla(${r.palette.rocketHue}, 100%, 65%, ${t.alpha * 0.85})`;
          ctx.fill();
        }

        // Draw rocket head flare
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 18;
        ctx.shadowColor = `hsla(${r.palette.rocketHue}, 100%, 60%, 0.95)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Update & Render Blast Sparks ──
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]!;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.965; // air drag
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

        // Hot white sparkling core
        if (size > 1.8 && s.alpha > 0.45) {
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

    // Click/tap interaction: launch 5-6 crackers towards clicked area!
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const rect = canvas.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const x = clientX - rect.left;
        const targetY = Math.max(h * 0.12, clientY - rect.top);
        launchSalvo(5 + (Math.random() > 0.5 ? 1 : 0), x, targetY);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(initTimer);
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
