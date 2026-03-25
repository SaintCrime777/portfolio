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
import { SiFramer } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";

export default function Skills() {
  const [activeDeck, setActiveDeck] = useState("frontend");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const frontend = [
    {
      name: "React",
      icon: SiReact,
      level: "core",
      description: [
        "Component-based architecture (Card / Modal)",
        "State management (useState / Context )",
        "API integration & data rendering",
        "Performance optimization (memo / lazy)",
      ],
      projects: ["is-cafe", "todo-list"],
    },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Zustand", icon: SiRedux },
  ];

  const backend = [
    {
      name: "Node.js",
      icon: SiNodedotjs,
      level: "core",
      description: [
        "Backend server development",
        "Handling async operations (API requests)",
        "Basic REST API implementation",
        "Integration with database",
      ],
      projects: ["Petopia"],
    },
    { name: "Express", icon: SiExpress },
    { name: "MySQL", icon: SiMysql },
    { name: "Prisma", icon: SiPrisma },
    { name: "Supabase", icon: SiSupabase },
    { name: "REST API", icon: SiLightning },
  ];

  const tools = [
    {
      name: "GSAP",
      icon: SiFramer,
      level: "core",
      description: [
        "Scroll-based animations",
        "Component entrance animations",
        "Stagger & timeline control",
        "Improving UI interaction experience",
      ],
      projects: ["portfolio"],
    },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "Vercel", icon: SiVercel },
    { name: "Figma", icon: SiFigma },
    { name: "Postman", icon: SiPostman },
    { name: "AI Assisted Dev", icon: RiRobot2Line },
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
                         flex flex-col items-center justify-center gap-3 h-[140px] w-[140px]
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
              <p className="text-sm md:text-base font-medium truncate">
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
      const coreSkill =
        activeDeck === "frontend"
          ? frontend.find((s) => s.level === "core")
          : activeDeck === "backend"
            ? backend.find((s) => s.level === "core")
            : tools.find((s) => s.level === "core");
      gsap.from(".skill-card", {
        y: 40,
        opacity: 0,
        scale: 0.8,
        stagger: 0.3,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all",
        onComplete: () => {
          if (coreSkill) {
            requestAnimationFrame(() => {
              setSelectedSkill(coreSkill);
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, [activeDeck]);

  return (
    <section
      id="skills"
      className="min-h-screen relative py-28 flex flex-col items-center overflow-hidden scroll-mt-24"
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]"></div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-12 relative">Skills</h2>

      {/* Tabs */}
      <div className="flex gap-6 relative">
        {["frontend", "backend", "tools"].map((deck) => (
          <button
            key={deck}
            onClick={() => {
              setActiveDeck(deck);
              setSelectedSkill(null);
            }}
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
        {/* Frontend */}
        {activeDeck === "frontend" && (
          <>
            {renderCards(frontend)}
            {selectedSkill?.level === "core" && (
              <div className="mt-16 w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-blue-400/30 rounded-xl p-6 text-left animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  {selectedSkill.name}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {selectedSkill.description.map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-400">
                  Used in: {selectedSkill.projects.join(", ")}
                </div>
              </div>
            )}
          </>
        )}
        {/* Backend */}
        {activeDeck === "backend" && (
          <>
            {renderCards(backend)}
            {selectedSkill?.level === "core" && (
              <div className="mt-16 w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-xl p-6 text-left animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  {selectedSkill.name}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {selectedSkill.description.map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-400">
                  Used in: {selectedSkill.projects.join(", ")}
                </div>
              </div>
            )}
          </>
        )}
        {/* Tools */}
        {activeDeck === "tools" && (
          <>
            {renderCards(tools)}
            {selectedSkill?.level === "core" && (
              <div className="mt-16 w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-amber-400/30 rounded-xl p-6 text-left animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-amber-400">
                  {selectedSkill.name}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {selectedSkill.description.map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-400">
                  Used in: {selectedSkill.projects.join(", ")}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
