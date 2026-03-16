"use client";

import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { useLayoutEffect } from "react";

export default function Skills() {
  const [activeDeck, setActiveDeck] = useState("frontend");

  const frontend = ["React", "Next.js", "TypeScript", "Tailwind", "Zustand"];

  const backend = [
    "Node.js",
    "Express",
    "MySQL",
    "Prisma",
    "Supabase",
    "REST API",
  ];

  const tools = ["Git", "Github", "Vercel", "Figma", "Postman"];

  const renderCards = (skills) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        {skills.map((skill) => (
          <div
            key={skill}
            className={`skill-card bg-white/5 backdrop-blur-md p-7 rounded-xl
                       text-center border
                       translate-x-[-25px]
                       hover:scale-110 hover:bg-white/10
                       hover:shadow-lg
                       transition duration-300
                       ${activeDeck === "frontend" && "border-blue-400/40 hover:border-blue-400"}
                        ${activeDeck === "backend" && "border-purple-400/40 hover:border-purple-400"}
                        ${activeDeck === "tools" && "border-amber-400/40 hover:border-amber-400"}
                       `}
          >
            {skill}
          </div>
        ))}
      </div>
    );
  };

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".skill-card", {
      y: 40,
      opacity: 0,
      scale: 0.8,
      stagger: 0.3,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "all"
    });
  });

  return () => ctx.revert();
}, [activeDeck]);

  return (
    <section
      id="skills"
      className="min-h-screen relative py-32 flex flex-col items-center overflow-hidden scroll-mt-24"
    >
      {/* 放射背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]"></div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-16 relative">Skills</h2>

      {/* Decks */}
      <div className="flex gap-6 relative">
        <button
          onClick={() => setActiveDeck("frontend")}
          className={`px-8 py-4 rounded-xl transition
    ${
      activeDeck === "frontend"
        ? "bg-blue-500/20 text-blue-300"
        : "bg-white/5 hover:bg-white/10"
    }
  `}
        >
          Frontend
        </button>

        <button
          onClick={() => setActiveDeck("backend")}
          className={`px-8 py-4 rounded-xl transition
    ${
      activeDeck === "backend"
        ? "bg-purple-400/40 text-purple-400"
        : "bg-white/5 hover:bg-white/10"
    }
  `}
        >
          Backend
        </button>

        <button
          onClick={() => setActiveDeck("tools")}
          className={`px-8 py-4 rounded-xl transition
    ${
      activeDeck === "tools"
        ? "bg-amber-400/40 text-amber-400"
        : "bg-white/5 hover:bg-white/10"
    }
  `}
        >
          Tools
        </button>
      </div>

      {/* Cards */}
      <div key={activeDeck} className="relative transition-all duration-500">
        {activeDeck === "frontend" && renderCards(frontend)}

        {activeDeck === "backend" && renderCards(backend)}

        {activeDeck === "tools" && renderCards(tools)}
      </div>
    </section>
  );
}
