"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const projects = [
    {
      title: "is-cafe",
      highlight: "OAuth 登入 + 購物車設計 + 訂單管理",
      tags: ["React", "OAuth", "Supabase"],
      image: "/is-cafe.png",
      demo: "https://is-cafe.vercel.app",
      github: "https://github.com/SaintCrime777/isCafe",
    },
    {
      title: "Petopia",
      highlight: "團隊專案 · 論壇模組 · 富文本編輯",
      tags: ["Next.js", "Express", "Prisma"],
      image: "/petopia.jpg",
      demo: "https://www.youtube.com/watch?v=tEkTOc4Ltts",
      github: null,
    },
    {
      title: "Todo List",
      highlight: "四象限時間管理 · localStorage 持久化",
      tags: ["React", "Vite", "Tailwind"],
      image: "/todo-list.webp",
      demo: "https://todo-list-drip.vercel.app",
      github: "https://github.com/SaintCrime777/todo-list-drip",
    },
  ];
  gsap.registerPlugin(ScrollTrigger);
  // 注意GSAP的Y軸可能會有頂不同高的時候
  useEffect(() => {
    gsap.from(".project-card", {
      opacity: 0,
      duration: 0.8,
      stagger: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".project-card",
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      id="projects"
      className="projects-section py-24 px-8 max-w-6xl mx-auto w-full scroll-mt-24"
    >
      {/* Title */}
      <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>

      {/* Subtitle */}
      <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto tracking-wider">
        用網頁改寫生活習慣
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="
              project-card
              bg-[#1a1a1a]
              rounded-xl
              overflow-hidden
              border border-white/10
              hover:scale-[1.02]
              transition-transform duration-300
              flex flex-col
              h-full
              group
            "
          >
            {/* 圖片區 */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* 內容區 */}
            <div className="p-6 flex flex-col flex-grow">
              {/* 標題 */}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>

              {/* 一句話亮點 */}
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {project.highlight}
              </p>

              {/* 技術標籤 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-3 text-sm pt-4 border-t border-white/5 mt-auto">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  🚀 Demo
                </a>

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:underline flex items-center gap-1"
                  >
                    💻 Github
                  </a>
                ) : (
                  <span className="text-gray-500 flex items-center gap-1">
                    🔒 Private Repo
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
