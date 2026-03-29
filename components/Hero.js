"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;

    // Track mouse
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particles
    const particles = [];
    const particleCount = 200;
    const colors = ["rgba(255,255,255,0.5)", "#60a5fa", "#a78bfa", "#38bdf8"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: 0,
        baseY: 0,
        radius: Math.random() * 300 + 60,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.001,
        size: Math.random() * 1.8 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        orbitCenterX: Math.random() * w,
        orbitCenterY: Math.random() * h,
      });
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        p.angle += p.speed;

        // Base orbit position
        const bx = p.orbitCenterX + Math.cos(p.angle) * p.radius;
        const by = p.orbitCenterY + Math.sin(p.angle) * p.radius;

        // Mouse repulsion
        const dx = bx - mx;
        const dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulse = dist < 180 ? (180 - dist) / 180 : 0;

        const x = bx + (dx / (dist || 1)) * repulse * 60;
        const y = by + (dy / (dist || 1)) * repulse * 60;

        ctx.beginPath();
        ctx.arc(x, y, p.size + repulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // ── GSAP entrance timeline ──────────────────────────────
    gsap.set(".hero-name", { y: 80, opacity: 0 });
    gsap.set(".hero-tag", { y: -20, opacity: 0 });
    gsap.set(".hero-role", { y: 30, opacity: 0 });
    gsap.set(".hero-desc-line", { y: 20, opacity: 0 });
    gsap.set(".hero-avatar", { scale: 0.7, opacity: 0 });
    gsap.set(".hero-cta", { y: 20, opacity: 0 });
    gsap.set(".hero-scroll", { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" ,opacity:0 } });

    tl.to(".hero-tag", { y: 0, opacity: 1, duration: 0.6 })
      .to(".hero-name", { y: 0, opacity: 1, duration: 1 }, "-=0.2")
      .to(".hero-role", { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .to(
        ".hero-desc-line",
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
        "-=0.4",
      )
      .to(".hero-avatar", { scale: 1, opacity: 1, duration: 1 }, "-=0.8")
      .to(".hero-cta", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .to(".hero-scroll", { opacity: 1, duration: 0.6 }, "-=0.2");

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Google Font */}
      <style>{`
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
        }
        .hero-role {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          letter-spacing: 0.25em;
        }
        .hero-desc-line {
          font-family: 'DM Sans', sans-serif;
        }
        .hero-tag {
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.15em;
        }

        /* Glowing ring around avatar */
        .avatar-ring {
          position: relative;
        }
        .avatar-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #60a5fa, #a78bfa, #38bdf8, #60a5fa);
          animation: spin 4s linear infinite;
          z-index: -1;
        }
        .avatar-ring::after {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background: conic-gradient(from 180deg, #60a5fa33, #a78bfa22, transparent);
          animation: spin 6s linear infinite reverse;
          z-index: -1;
          filter: blur(6px);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Animated gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #93c5fd 40%, #c4b5fd 70%, #fff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Scanline texture overlay */
        .scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
        }

        /* CTA button */
        .cta-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s;
        }
        .cta-btn:hover::before {
          left: 100%;
        }
      `}</style>

      <section
        id="hero"
        className="scanlines relative h-screen flex items-center overflow-hidden"
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Deep overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 to-transparent" />

        {/* Glowing orb left */}
        <div className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        {/* Glowing orb right */}
        <div className="absolute right-[-5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />

        {/* ── Main content: asymmetric two-column ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 pt-20">
          {/* Left: Text block */}
          <div className="flex-1 flex flex-col justify-center md:pt-16">
            {/* Tag */}
            <div className="hero-tag inline-flex items-center gap-2 text-xs text-blue-400/80 uppercase mb-6 w-fit">
              <span className="w-6 h-px bg-blue-400/60" />
              Available for hire
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            </div>

            {/* Big name */}
            <h1 className="hero-name gradient-text text-[clamp(3.5rem,9vw,8rem)] mb-6">
              Jimmy
              <br />
              Chao
            </h1>

            {/* Role */}
            <p className="hero-role text-sm text-gray-400 uppercase mb-8 tracking-[0.3em]">
              Frontend Developer
            </p>

            {/* Desc lines */}
            <div className="space-y-2 mb-10">
              {[
                "4 Production apps · OAuth · AI · E-commerce",
                "Trilingual  ZH / EN / JP",
                "Law background → Code",
              ].map((line, i) => (
                <p
                  key={i}
                  className="hero-desc-line text-sm text-gray-400 flex items-center gap-3"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                  {line}
                </p>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="#projects"
                className="cta-btn px-7 py-3 text-sm font-medium bg-blue-500/20 border border-blue-400/40 text-blue-300 rounded-full hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-300"
              >
                View Projects →
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=snoopy921440@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn px-7 py-3 text-sm font-medium bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="hero-avatar flex-shrink-0 flex flex-col items-center gap-6 translate-y-6 md:translate-y-10">
            <div className="avatar-ring w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden">
              <img
                src="/avatar.webp"
                alt="Jimmy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Floating badge */}
            <div className="flex flex-col items-center gap-2">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 backdrop-blur-sm">
                Based in Taiwan 🇹🇼
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
        </div>
      </section>
    </>
  );
}
