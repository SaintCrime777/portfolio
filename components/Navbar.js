"use client";

import { useState, useEffect } from "react";
import { Sun, Menu, X, Github } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  // scroll navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // section active highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-black/70 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          href="#hero"
        >
          <Sun className="text-yellow-400" size={22} />
          <span className="font-semibold text-white tracking-wide">
            Jimmy's portfolio
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-200 text-sm">

          <a
            href="#projects"
            className={`transition ${
              active === "projects"
                ? "text-yellow-400 border-b border-yellow-400"
                : "text-white hover:text-white"
            }`}
          >
            Projects
          </a>

          <a
            href="#skills"
            className={`transition ${
              active === "skills"
                ? "text-yellow-400 border-b border-yellow-400"
                : "text-white hover:text-white"
            }`}
          >
            Skills
          </a>

          <a
            href="#contact"
            className={`transition ${
              active === "contact"
                ? "text-yellow-400 border-b border-yellow-400"
                : "text-white hover:text-white"
            }`}
          >
            Contact
          </a>

          <a
            href="https://github.com/saintcrime777"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white hover:scale-110 transition"
          >
            <Github size={18} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md text-white flex flex-col items-center gap-6 py-8">

          <a
            href="#projects"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Projects
          </a>

          <a
            href="#skills"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Skills
          </a>

          <a
            href="#contact"
            className="text-lg"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>

          <a
            href="https://github.com/saintcrime777"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

        </div>
      )}
    </nav>
  );
}