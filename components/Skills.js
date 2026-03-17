"use client";

import { useState, useLayoutEffect } from "react";
import gsap from "gsap";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPrisma,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiPostman,
  SiLightning,
} from "react-icons/si";

export default function Skills() {
  const [activeDeck, setActiveDeck] = useState("frontend");

  const frontend = [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Zustand", icon: SiRedux }
  ];

  const backend = [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "MySQL", icon: SiMysql },
    { name: "Prisma", icon: SiPrisma },
    { name: "Supabase", icon: SiSupabase },
    { name: "REST API", icon: SiLightning }, 
  ];

  const tools = [
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "Vercel", icon: SiVercel },
    { name: "Figma", icon: SiFigma },
    { name: "Postman", icon: SiPostman },
  ];

  const renderCards = (skills) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.name}
              className={`skill-card bg-white/5 backdrop-blur-md p-7 rounded-xl
                         border text-center
                         hover:scale-110 hover:bg-white/10
                         hover:shadow-lg transition duration-300
                         flex flex-col items-center justify-center gap-3 min-h-[140px]
                         ${
                           activeDeck === "frontend" &&
                           "border-blue-400/40 hover:border-blue-400"
                         }
                         ${
                           activeDeck === "backend" &&
                           "border-purple-400/40 hover:border-purple-400"
                         }
                         ${
                           activeDeck === "tools" &&
                           "border-amber-400/40 hover:border-amber-400"
                         }
                       `}
            >
              {/* icon */}
              {Icon ? (
                <Icon
                  className={`text-4xl ${
                    activeDeck === "frontend"
                      ? "text-blue-300"
                      : activeDeck === "backend"
                      ? "text-purple-300"
                      : "text-amber-300"
                  }`}
                />
              ) : (
                <div className="text-3xl">⚙️</div>
              )}

              {/* label */}
              <p className="text-sm md:text-base font-medium">
                {skill.name}
              </p>
            </div>
          );
        })}
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
        clearProps: "all",
      });
    });

    return () => ctx.revert();
  }, [activeDeck]);

  return (
    <section
      id="skills"
      className="min-h-screen relative py-32 flex flex-col items-center overflow-hidden scroll-mt-24"
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]"></div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-16 relative">Skills</h2>

      {/* Tabs */}
      <div className="flex gap-6 relative">
        {["frontend", "backend", "tools"].map((deck) => (
          <button
            key={deck}
            onClick={() => setActiveDeck(deck)}
            className={`px-8 py-6 mb-3 rounded-xl transition
              ${
                activeDeck === deck
                  ? deck === "frontend"
                    ? "bg-blue-500/20 text-blue-300"
                    : deck === "backend"
                    ? "bg-purple-400/40 text-purple-400"
                    : "bg-amber-400/40 text-amber-400"
                  : "bg-white/5 hover:bg-white/10"
              }
            `}
          >
            {deck}
          </button>
        ))}
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