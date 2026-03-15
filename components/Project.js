"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const projects = [
    {
      title: "is-cafe",
      tech: "React SPA × OAuth × Supabase",
      image: "/is-cafe.png",
      demo: "https://is-cafe.vercel.app",
      github: "https://github.com/SaintCrime777/isCafe",
    },
    {
      title: "Petopia",
      tech: "Forum × Rich Text × CRUD",
      image: "/petopia.jpg",
      demo: "https://www.youtube.com/watch?v=tEkTOc4Ltts",
      github:null,   
    },
    {
      title: "Todo List",
      tech: "React × State Management",
      image: "/todo-list.webp",
      demo: "https://todo-list-drip.vercel.app",
      github: "https://github.com/SaintCrime777/todo-list-drip",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".project-card");

    gsap.from(cards, {
      opacity: 0,
      duration: 1,
      stagger: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section className="projects-section py-24 px-8 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="
            project-card
            bg-[#1a1a1a]
            rounded-xl
            overflow-hidden
            border border-white/10
            hover:border-blue-400/30
            hover:scale-[1.05]
            transition-transform duration-300
            flex flex-col
            h-full"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

              <p className="text-gray-400 mb-4 flex-grow">{project.tech}</p>

              <div className="flex gap-4 text-sm">
                <a
                  href={project.demo}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>

                {project.github?(
                <a
                  href={project.github}
                  target="_blank"
                  className="text-gray-300 hover:underline"
                  rel="noopener noreferrer"
                >
                  Github
                </a>):(<span className="text-gray-500">Private Repo</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
