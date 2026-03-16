"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const centerX = w / 2;
    const centerY = h / 2;

    const particles = [];
    const particleCount = 160;
    const colors = ["rgba(255,255,255,0.6)", "#60a5fa", "#de7bf9"];

    // 建立粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        radius: Math.random() * 300 + 40,
        angle: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.001,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function render() {
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      
      particles.forEach((p) => {
        p.angle += p.speed;

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();

    // resize
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    // GSAP Hero animation
    gsap.from(".hero-avatar", {
      y: 60,
      opacity: 0,
      duration: 1,
    });
    gsap.from(".hero-title", {
      y: 40,
      opacity: 0,
      delay: 0.4,
      duration: 1,
    });

    gsap.from(".hero-sub", {
      y: 20,
      opacity: 0,
      delay: 0.8,
      duration: 1,
    });
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* content */}
      <div className="relative z-10">
        <img
          src="/avatar.webp"
          className="hero-avatar w-60 mx-auto mb-6 rounded-full border border-white/20 shadow-[0_0_40px_rgba(96,165,250,0.25)]"
        ></img>
        <h1 className="hero-title text-6xl font-bold mb-6">Hi, I'm Jimmy</h1>

        <p className="hero-sub text-xl text-gray-400">Frontend Developer</p>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-10 text-gray-400 animate-bounce">
        ↓🖱 scroll
      </div>
    </section>
  );
}
