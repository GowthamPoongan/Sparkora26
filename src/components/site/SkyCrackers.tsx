import { useEffect, useRef } from "react";

/**
 * Sky Crackers / Fireworks Multi-Rocket Salvo animation.
 * Mobile-optimized with adaptive particle counts, zero shadowBlur on mobile,
 * clamped DPR, and relaxed launch delay intervals to ensure 60fps performance
 * without battery drain or lag on phones.
 */
export function SkyCrackers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.navigator.maxTouchPoints > 0);

    let raf = 0;
    // Clamp DPR to 1 on mobile to prevent massive fill-rate overhead
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
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

    // ── Palettes: Warm Gold, Fire Ember, Festive Ruby, Sunset Amber, Soft Sapphire ──
    const palettes = [
      {
        name: "fire-ember",
        hues: [20, 32, 42, 52, 16],
        rocketHue: 30,
      },
      {
        name: "pure-gold",
        hues: [40, 48, 55, 60, 36],
        rocketHue: 48,
      },
      {
        name: "festive-ruby",
        hues: [348, 8, 24, 42, 335],
        rocketHue: 12,
      },
      {
        name: "sunset-amber",
        hues: [28, 38, 48, 58, 20],
        rocketHue: 36,
      },
      {
        name: "soft-sapphire",
        hues: [205, 220, 235, 45, 195],
        rocketHue: 215,
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
      frameCounter: number;
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
    let lastUserLaunch = 0;

    // Detonate rocket into sparks (lightweight particle count on mobile)
    const detonate = (x: number, y: number, palette: (typeof palettes)[number]) => {
      // 1. Flash
      flashes.push({
        x,
        y,
        radius: 6,
        maxRadius: isMobile ? 45 : 70,
        alpha: isMobile ? 0.75 : 0.9,
        hue: palette.rocketHue,
      });

      // 2. Blast sparks (reduced count on mobile for smooth 60fps)
      const sparkCount = isMobile
        ? 24 + Math.floor(Math.random() * 8) // 24-32 on mobile
        : 55 + Math.floor(Math.random() * 18); // 55-73 on desktop

      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force =
          i % 3 === 0
            ? 1.4 + Math.random() * (isMobile ? 2.4 : 3.2)
            : 3.0 + Math.random() * (isMobile ? 3.2 : 4.0);
        const hue =
          palette.hues[Math.floor(Math.random() * palette.hues.length)]!;
        const isTwinkle = Math.random() < 0.3;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          alpha: 1,
          decay: isMobile
            ? 0.018 + Math.random() * 0.02
            : 0.013 + Math.random() * 0.016,
          size: isMobile ? 1.4 + Math.random() * 1.6 : 1.6 + Math.random() * 2.4,
          hue,
          lightness: 55 + Math.random() * 35,
          twinkle: isTwinkle,
          gravity: 0.075 + Math.random() * 0.03,
        });
      }

      // 3. Crackle micro-bursts
      const crackleCount = isMobile ? 3 : 6;
      for (let i = 0; i < crackleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = 1.6 + Math.random() * 2.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 0.4,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.012,
          size: 2.0 + Math.random() * 1.5,
          hue: 45, // Gold
          lightness: 90, // White-hot
          twinkle: true,
          gravity: 0.05,
        });
      }
    };

    /**
     * Launch a salvo of sky crackers.
     * Desktop: 5 to 6 rockets.
     * Mobile: 3 to 4 rockets to prevent lag while looking full on smaller screens.
     */
    const launchSalvo = (
      customCount?: number,
      clickX?: number,
      clickTargetY?: number
    ) => {
      const defaultCount = isMobile
        ? 3 + (Math.random() > 0.5 ? 1 : 0) // 3 or 4 on mobile
        : 5 + (Math.random() > 0.5 ? 1 : 0); // 5 or 6 on desktop
      const actualCount = customCount ?? defaultCount;

      for (let i = 0; i < actualCount; i++) {
        let x: number;
        let targetY: number;
        let vx: number;

        if (clickX !== undefined) {
          const spreadWidth = Math.min(w * 0.45, 300);
          const offset = ((i - (actualCount - 1) / 2) / Math.max(1, actualCount - 1)) * spreadWidth;
          x = Math.max(w * 0.08, Math.min(w * 0.92, clickX + offset + (Math.random() - 0.5) * 20));
          targetY = Math.max(
            h * 0.12,
            Math.min(h * 0.45, (clickTargetY ?? h * 0.25) + (Math.random() - 0.5) * 50)
          );
          vx = ((i - (actualCount - 1) / 2) / Math.max(1, actualCount - 1)) * 2.6 + (Math.random() - 0.5) * 0.6;
        } else {
          const margin = w * 0.12;
          const usableWidth = w - margin * 2;
          const step = usableWidth / Math.max(1, actualCount - 1);
          x = margin + i * step + (Math.random() - 0.5) * (step * 0.3);
          targetY = h * (0.16 + Math.random() * 0.26);
          const centerDist = (x - w / 2) / (w / 2);
          vx = -centerDist * 0.7 + (Math.random() - 0.5) * 1.2;
        }

        const palette = palettes[i % palettes.length]!;
        const distance = h - targetY;
        const speed = Math.sqrt(2 * 0.22 * distance);
        const vy = -speed;
        const delay = Math.floor(Math.random() * 6);

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
            frameCounter: 0,
          },
        });
      }
    };

    // Initial festive blast after smooth page load
    // Longer delay on mobile (2.2s) so the browser completes hydration first
    const initTimer = setTimeout(() => {
      launchSalvo();
    }, isMobile ? 2200 : 1400);

    // Continuous launcher interval:
    // Mobile: 10 to 14 seconds (relaxed, zero lag)
    // Desktop: 7.5 to 10 seconds
    let lastLaunch = Date.now();
    let nextLaunchDelay = isMobile ? 11000 : 8000;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Check pending rockets
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
        nextLaunchDelay = isMobile
          ? 10000 + Math.random() * 4000 // 10s - 14s on mobile
          : 7500 + Math.random() * 2500; // 7.5s - 10s on desktop
        launchSalvo();
      }

      // ── Update & Render Flashes ──
      for (let i = 0; i < flashes.length; i++) {
        const f = flashes[i]!;
        f.radius += (f.maxRadius - f.radius) * 0.28;
        f.alpha *= 0.82;

        if (f.alpha < 0.02) {
          flashes.splice(i, 1);
          i--;
          continue;
        }

        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        fg.addColorStop(0, `hsla(${f.hue}, 100%, 85%, ${f.alpha * 0.6})`);
        fg.addColorStop(0.4, `hsla(${f.hue}, 100%, 55%, ${f.alpha * 0.3})`);
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
        r.vy += 0.22;
        r.frameCounter++;

        // Add trail spark (every 2nd frame on mobile to cut particle count in half)
        if (!isMobile || r.frameCounter % 2 === 0) {
          r.trail.push({
            x: r.x + (Math.random() - 0.5) * 2,
            y: r.y + (Math.random() - 0.5) * 2,
            alpha: 1,
            size: isMobile ? 1.6 : 2.0 + Math.random() * 2.0,
          });
        }

        // Detonation condition
        if (r.vy >= -1.0 || r.y <= r.targetY) {
          detonate(r.x, r.y, r.palette);
          rockets.splice(i, 1);
          i--;
          continue;
        }

        // Draw trail sparks
        for (let j = 0; j < r.trail.length; j++) {
          const t = r.trail[j]!;
          t.alpha -= isMobile ? 0.075 : 0.055;
          t.y += 1.2;
          t.size *= 0.95;

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

        // Draw rocket head flare (no expensive shadowBlur on mobile!)
        ctx.beginPath();
        ctx.arc(r.x, r.y, isMobile ? 2.5 : 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        if (!isMobile) {
          ctx.shadowBlur = 14;
          ctx.shadowColor = `hsla(${r.palette.rocketHue}, 100%, 60%, 0.9)`;
        }
        ctx.fill();
        if (!isMobile) ctx.shadowBlur = 0;
      }

      // ── Update & Render Blast Sparks ──
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]!;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.965;
        s.vy *= 0.965;
        s.vy += s.gravity;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          i--;
          continue;
        }

        let currentAlpha = s.alpha;
        if (s.twinkle && Math.random() < 0.25) {
          currentAlpha = Math.min(1, s.alpha * 1.4);
        }

        const size = s.size * (0.4 + s.alpha * 0.6);

        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, ${s.lightness}%, ${currentAlpha})`;

        // Crucial performance optimization:
        // NEVER run shadowBlur on mobile devices (causes 400+ blur passes/frame).
        if (!isMobile) {
          ctx.shadowBlur = s.alpha > 0.4 ? 8 : 3;
          ctx.shadowColor = `hsla(${s.hue}, 100%, 55%, ${currentAlpha * 0.7})`;
        }
        ctx.fill();

        // Hot white sparkling core on brighter sparks (desktop or large sparks)
        if (size > 1.8 && s.alpha > 0.45) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
          if (!isMobile) ctx.shadowBlur = 0;
          ctx.fill();
        }
      }
      if (!isMobile) ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    tick();

    // Click/tap interaction: throttle to prevent spam lag on phones
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      const minInterval = isMobile ? 2200 : 1500;
      if (now - lastUserLaunch < minInterval) return;

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
        lastUserLaunch = now;
        const x = clientX - rect.left;
        const targetY = Math.max(h * 0.12, clientY - rect.top);
        launchSalvo(undefined, x, targetY);
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
