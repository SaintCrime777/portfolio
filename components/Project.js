"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Projects() {

  const projects = [
    {
      title: "is-cafe",
      tech: "React SPA × OAuth × Supabase",
      image: "/projects/is-cafe.png",
      demo: "https://is-cafe.vercel.app",
      github: "#",
    },
    {
      title: "Petopia",
      tech: "Forum × Rich Text × CRUD",
      image: "/projects/petopia.png",
      demo: "#",
      github: "#",
    },
    {
      title: "Todo List",
      tech: "React × State Management",
      image: "/projects/todo.png",
      demo: "#",
      github: "#",
    },
  ];

  useEffect(() => {

    const cards = gsap.utils.toArray(".project-card");

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.8,
      ease: "power3.out",
    });

  }, []);

  return (
    <section className="py-24 px-8 max-w-6xl mx-auto">

      <h2 className="text-4xl font-bold mb-12">
        Projects
      </h2>

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
            hover:scale-[1.50]
            transition-transform duration-300
            "
          >

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">

              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {project.tech}
              </p>

              <div className="flex gap-4 text-sm">

                <a
                  href={project.demo}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  Demo
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  className="text-gray-300 hover:underline"
                >
                  Github
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}