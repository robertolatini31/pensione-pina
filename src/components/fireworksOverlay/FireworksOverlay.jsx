import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

/**
 * FireworksOverlay
 *
 * Props:
 * - autorun: boolean (default false) -> lancia fuochi a random automaticamente
 * - intensity: number (1..5) default 2 -> quanti fuochi automatici
 * - zIndex: number default 9999
 * - style: extra style object for the canvas
 *
 * Espone via ref:
 * - shoot(x?, y?) -> lancia un fuoco verso coordinate (viewport), default random
 */
const FireworksOverlay = forwardRef(
  (
    { autorun = false, intensity = 2, zIndex = 9999, style = {}, fadeOut },
    ref
  ) => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const particles = useRef([]);
    const rockets = useRef([]);
    const running = useRef(true);
    const deviceRatio =
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const lastAutoTick = useRef(0);

    // util
    const rand = (min, max) => Math.random() * (max - min) + min;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // Resize canvas
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = deviceRatio;
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      const ctx = c.getContext("2d");
      ctx.scale(dpr, dpr);
    };

    // Rocket -> rises then explodes into particles
    function launchRocket(targetX, targetY) {
      const startX = rand(window.innerWidth * 0.25, window.innerWidth * 0.75);
      const startY = window.innerHeight + 10;
      const speed = rand(5, 9);
      const angle = Math.atan2(targetY - startY, targetX - startX);
      rockets.current.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetY,
        hue: Math.floor(rand(0, 360)),
        trail: [],
      });
    }

    // create particles at (x,y)
    function explode(x, y, hue) {
      const count = Math.floor(rand(24, 48) * clamp(intensity, 0.5, 6));
      for (let i = 0; i < count; i++) {
        const speed = rand(1.5, 6);
        const angle = rand(0, Math.PI * 2);
        const life = rand(60, 120);
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: rand(0.007, 0.02),
          life,
          ttl: life,
          hue: (hue + rand(-30, 30)) | 0,
          size: rand(1.5, 3.5),
        });
      }
    }

    // Drawing loop
    const loop = () => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      const w = window.innerWidth;
      const h = window.innerHeight;

      // fade background slightly (trail effect)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      // update rockets
      for (let i = rockets.current.length - 1; i >= 0; i--) {
        const r = rockets.current[i];
        // trail
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        // physics
        r.vy += -0.12; // negative gravity to go up faster (we launched from bottom toward top)
        r.x += r.vx;
        r.y += r.vy;

        // draw rocket as small glowing point + trail
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${r.hue},100%,60%)`;
        ctx.lineWidth = 2;
        for (let t = 0; t < r.trail.length - 1; t++) {
          const p1 = r.trail[t];
          const p2 = r.trail[t + 1];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // explode condition: when vy < 0 and above some height or near targetY
        if (r.vy >= 0 || r.y < r.targetY) {
          // explode
          explode(r.x, r.y, r.hue);
          rockets.current.splice(i, 1);
        }
      }

      // update particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.vy += 0.04; // gravity
        p.vx *= 0.998;
        p.vy *= 0.998;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.ttl -= 1;

        // draw particle
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${clamp(p.alpha, 0, 1)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0 || p.ttl <= 0) {
          particles.current.splice(i, 1);
        }
      }

      // limit total particles for perf
      const MAX = 600;
      if (particles.current.length > MAX) {
        particles.current.splice(0, particles.current.length - MAX);
      }

      // automatic fireworks
      if (autorun) {
        const now = performance.now();
        if (now - lastAutoTick.current > 700 - intensity * 80) {
          lastAutoTick.current = now;
          const tx = rand(window.innerWidth * 0.15, window.innerWidth * 0.85);
          const ty = rand(window.innerHeight * 0.1, window.innerHeight * 0.6);
          launchRocket(tx, ty);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
      resize();
      window.addEventListener("resize", resize);

      // clear canvas initially (black transparent)
      const c = canvasRef.current;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "rgba(0,0,0,0)"; // keep transparent background
      ctx.fillRect(0, 0, c.width, c.height);

      rafRef.current = requestAnimationFrame(loop);

      // click to shoot
      const onClick = (ev) => {
        const x = ev.clientX;
        const y = ev.clientY;
        // shoot several rockets to make it nice
        for (let i = 0; i < clamp(intensity, 1, 6); i++) {
          launchRocket(x + rand(-40, 40), y + rand(-40, 40));
        }
      };
      window.addEventListener("click", onClick);

      return () => {
        running.current = false;
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", resize);
        window.removeEventListener("click", onClick);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // expose shoot via ref
    useImperativeHandle(ref, () => ({
      shoot: (x, y) => {
        const tx =
          typeof x === "number"
            ? x
            : rand(window.innerWidth * 0.2, window.innerWidth * 0.8);
        const ty =
          typeof y === "number"
            ? y
            : rand(window.innerHeight * 0.1, window.innerHeight * 0.6);
        for (let i = 0; i < clamp(intensity * 2, 1, 10); i++) {
          launchRocket(tx + rand(-30, 30), ty + rand(-30, 30));
        }
      },
      clear: () => {
        particles.current = [];
        rockets.current = [];
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none", // allow clicks to go through (but we also listen globally on window)
          zIndex,
          width: "100%",
          height: "100%",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.8s ease",
          ...style,
        }}
      />
    );
  }
);

export default FireworksOverlay;
