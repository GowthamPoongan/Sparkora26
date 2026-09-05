import { useEffect, useRef } from "react";

/**
 * Orange fire spark cursor — trails of burning sparks and flames.
 * On PC: Follows mouse with custom glowing core and burning spark trail.
 * On Phone / Touch: Ignites bursts and trails of fire sparks from fingertips on touch/swipe!
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Bail on reduced motion only
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let hasMouseMoved = false;
    let isTouchActive = false;
    let isTouchDevice = false;

    const enableMouseCursor = () => {
      if (!hasMouseMoved) {
        hasMouseMoved = true;
        if (window.matchMedia("(pointer: fine)").matches) {
          document.body.classList.add("custom-cursor-active");
        }
      }
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // ── Fire spark particles ──
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
      type: "spark" | "ember" | "flame";
    }
    const particles: Particle[] = [];

    let raf = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      isTouchDevice = false;
      enableMouseCursor();
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (cursor.x < -50) {
        cursor.x = mouse.x;
        cursor.y = mouse.y;
        prevCX = cursor.x;
        prevCY = cursor.y;
      }
    };

    const spawnSparks = (cx: number, cy: number, speed: number, dx: number, dy: number) => {
      const maxParticles = isTouchDevice ? 80 : 120;

      // ── Type 1: Flying sparks (fast, small, sharp) ──
      const sparkCount = Math.min(Math.floor(speed * 0.6 + 1.5), isTouchDevice ? 4 : 6);
      for (let i = 0; i < sparkCount; i++) {
        if (particles.length > maxParticles) break;
        const angle = Math.random() * Math.PI * 2;
        const vel = 1 + Math.random() * 3 + speed * 0.15;
        particles.push({
          x: cx + (Math.random() - 0.5) * 6,
          y: cy + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * vel + dx * 0.08,
          vy: Math.sin(angle) * vel + dy * 0.08 - 1, // fly upward
          life: 0,
          maxLife: 15 + Math.random() * 25,
          size: 1 + Math.random() * 2.5,
          hue: 10 + Math.random() * 40, // red 10 → orange 30 → yellow 50
          lightness: 55 + Math.random() * 30,
          type: "spark",
        });
      }

      // ── Type 2: Floating embers (slow, medium, glow) ──
      if (frame % (isTouchDevice ? 4 : 3) === 0) {
        const emberCount = isTouchDevice ? 1 : 2;
        for (let i = 0; i < emberCount; i++) {
          if (particles.length > maxParticles) break;
          particles.push({
            x: cx + (Math.random() - 0.5) * 10,
            y: cy + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(0.4 + Math.random() * 1.2), // drift up
            life: 0,
            maxLife: 30 + Math.random() * 40,
            size: 2 + Math.random() * 3,
            hue: 20 + Math.random() * 25,
            lightness: 50 + Math.random() * 20,
            type: "ember",
          });
        }
      }

      // ── Type 3: Flame wisps (behind cursor, larger, softer) ──
      if (speed > 1.5 && frame % 2 === 0) {
        if (particles.length < maxParticles) {
          particles.push({
            x: cx - dx * 0.5 + (Math.random() - 0.5) * 14,
            y: cy - dy * 0.5 + (Math.random() - 0.5) * 14,
            vx: -dx * 0.05 + (Math.random() - 0.5) * 0.5,
            vy: -(0.8 + Math.random() * 1.5),
            life: 0,
            maxLife: 20 + Math.random() * 25,
            size: 4 + Math.random() * 7,
            hue: 15 + Math.random() * 30,
            lightness: 45 + Math.random() * 25,
            type: "flame",
          });
        }
      }
    };

    // ── Touch burst: when user touches phone screen, explosion of sparks ──
    const spawnTouchBurst = (x: number, y: number) => {
      const burstCount = 12;
      for (let i = 0; i < burstCount; i++) {
        if (particles.length > 80) break;
        const angle = Math.random() * Math.PI * 2;
        const vel = 1.5 + Math.random() * 4;
        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel - 1.2,
          life: 0,
          maxLife: 20 + Math.random() * 28,
          size: 1.5 + Math.random() * 3,
          hue: 15 + Math.random() * 35,
          lightness: 55 + Math.random() * 30,
          type: Math.random() < 0.4 ? "ember" : "spark",
        });
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isTouchDevice = true;
      isTouchActive = true;
      const t = e.touches[0]!;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      cursor.x = t.clientX;
      cursor.y = t.clientY;
      prevCX = t.clientX;
      prevCY = t.clientY;
      spawnTouchBurst(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isTouchDevice = true;
      isTouchActive = true;
      const t = e.touches[0]!;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    };

    const onTouchEnd = () => {
      isTouchActive = false;
      // Smoothly push cursor off after particles finish
      setTimeout(() => {
        if (!isTouchActive) {
          cursor.x = -100;
          cursor.y = -100;
          mouse.x = -100;
          mouse.y = -100;
        }
      }, 300);
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      const isTracking = (hasMouseMoved && !isTouchDevice) || isTouchActive;

      if (isTracking && mouse.x > -50 && mouse.y > -50) {
        // Smooth follow
        const lerp = isTouchActive ? 0.35 : 0.15;
        cursor.x += (mouse.x - cursor.x) * lerp;
        cursor.y += (mouse.y - cursor.y) * lerp;

        const dx = cursor.x - prevCX;
        const dy = cursor.y - prevCY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        prevCX = cursor.x;
        prevCY = cursor.y;

        // Spawn fire particles
        spawnSparks(cursor.x, cursor.y, speed, dx, dy);
      }

      // ── Draw particles ──
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

        // Physics by type
        if (p.type === "spark") {
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.vy += 0.06; // gravity
        } else if (p.type === "ember") {
          p.vx *= 0.98;
          p.vy *= 0.99;
          p.vx += (Math.random() - 0.5) * 0.1; // wobble
        } else {
          // flame
          p.vx *= 0.97;
          p.vy *= 0.98;
          p.vx += (Math.random() - 0.5) * 0.15;
        }

        const alpha = (1 - t) * (1 - t); // quadratic fade-out
        const currentSize = p.size * (1 - t * 0.4);

        if (p.type === "flame") {
          // Soft flame wisp — radial gradient blob
          const fg = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, currentSize
          );
          fg.addColorStop(0, `hsla(${p.hue + 15}, 100%, ${p.lightness + 15}%, ${alpha * 0.35})`);
          fg.addColorStop(0.5, `hsla(${p.hue}, 100%, ${p.lightness}%, ${alpha * 0.15})`);
          fg.addColorStop(1, `hsla(${p.hue - 5}, 100%, ${p.lightness - 10}%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = fg;
          ctx.fill();
        } else {
          // Spark / ember — solid glowing dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, ${p.lightness}%, ${alpha})`;
          ctx.shadowBlur = p.type === "ember" ? 14 : 8;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, ${alpha * 0.6})`;
          ctx.fill();

          // Hot white core on larger sparks
          if (currentSize > 1.8 && p.type === "spark") {
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(45, 100%, 95%, ${alpha * 0.8})`;
            ctx.shadowBlur = 0;
            ctx.fill();
          }
        }
      }
      ctx.shadowBlur = 0;

      // ── Cursor core — only for PC mouse (touch has finger, no pointer dot needed) ──
      if (hasMouseMoved && !isTouchDevice && cursor.x > -50 && cursor.y > -50) {
        const dotR = 5;

        // Heat aura
        const aura = ctx.createRadialGradient(
          cursor.x, cursor.y, 0,
          cursor.x, cursor.y, 45
        );
        aura.addColorStop(0, "hsla(30, 100%, 55%, 0.12)");
        aura.addColorStop(0.3, "hsla(25, 100%, 48%, 0.05)");
        aura.addColorStop(1, "hsla(20, 100%, 40%, 0)");
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 45, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();

        // Dot gradient — white hot center to deep orange
        const dg = ctx.createRadialGradient(
          cursor.x - 1, cursor.y - 1, 0,
          cursor.x, cursor.y, dotR
        );
        dg.addColorStop(0, "hsla(50, 100%, 97%, 1)");
        dg.addColorStop(0.35, "hsla(40, 100%, 70%, 0.95)");
        dg.addColorStop(0.7, "hsla(28, 100%, 55%, 0.9)");
        dg.addColorStop(1, "hsla(18, 100%, 45%, 0.85)");
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = dg;
        ctx.shadowBlur = 28;
        ctx.shadowColor = "hsla(25, 100%, 50%, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
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
