"use client";

import { useEffect, useMemo, useState } from "react";
import { SiGithub, SiGmail } from "react-icons/si";
import { FaFileAlt, FaBriefcase } from "react-icons/fa";

export default function Contact() {
  const lines = useMemo(
    () => [
      "Frontend Developer",
      "專注於 React / Next.js 的互動式網站開發",
      "Open to opportunities 🚀",
    ],
    []
  );

  const [displayedLines, setDisplayedLines] = useState(["", "", ""]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((prev) => prev + 1);
      }, 45);

      return () => clearTimeout(timer);
    }

    const nextLineTimer = setTimeout(() => {
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, 350);

    return () => clearTimeout(nextLineTimer);
  }, [charIndex, lineIndex, lines]);

  const contacts = [
    {
      label: "104",
      href: "https://www.104.com.tw/",
      icon: FaBriefcase,
      color: "text-cyan-300",
      border: "border-cyan-400/40 hover:border-cyan-300",
      glow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]",
    },
    {
      label: "Resume",
      href: "/resume.pdf",
      icon: FaFileAlt,
      color: "text-violet-300",
      border: "border-violet-400/40 hover:border-violet-300",
      glow: "hover:shadow-[0_0_25px_rgba(167,139,250,0.25)]",
    },
    {
      label: "GitHub",
      href: "https://github.com/your-github-account",
      icon: SiGithub,
      color: "text-amber-300",
      border: "border-amber-400/40 hover:border-amber-300",
      glow: "hover:shadow-[0_0_25px_rgba(252,211,77,0.22)]",
    },
    {
      label: "Email",
      href: "mailto:your@email.com",
      icon: SiGmail,
      color: "text-rose-300",
      border: "border-rose-400/40 hover:border-rose-300",
      glow: "hover:shadow-[0_0_25px_rgba(251,113,133,0.22)]",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-28 px-6 md:px-10 flex items-center justify-center overflow-hidden scroll-mt-24"
    >
      {/* background
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" /> */}

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        {/* title */}
        <div className="mb-12">
          <p className="text-sm tracking-[0.35em] uppercase text-white/50 mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me & Contact</h2>
        </div>

        {/* typing about */}
        <div className="w-full max-w-3xl min-h-[150px] md:min-h-[170px] mb-14">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-8 md:px-10 md:py-10 shadow-[0_0_30px_rgba(255,255,255,0.04)]">
            <div className="space-y-4 text-lg md:text-2xl font-medium leading-relaxed">
              {displayedLines.map((line, idx) => (
                <p key={idx} className="min-h-[1.8em] text-white/90">
                  {line}
                  {idx === lineIndex && lineIndex < lines.length && (
                    <span className="inline-block w-[1px] h-[1em] ml-1 bg-white/70 align-middle animate-pulse" />
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* diamond contact area */}
        <div className="w-full flex justify-center">
          {/* mobile/tablet: regular 2x2 */}
          <div className="grid grid-cols-2 gap-5 md:hidden">
            {contacts.map((item) => {
              const Icon = item.icon;
              const isExternal =
                item.href.startsWith("http") || item.href.startsWith("mailto:");

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group w-[130px] h-[130px] rounded-2xl border bg-white/5 backdrop-blur-md
                    flex flex-col items-center justify-center gap-3
                    transition duration-300 hover:scale-105 hover:bg-white/10
                    ${item.border} ${item.glow}`}
                >
                  <Icon
                    className={`text-3xl transition duration-300 group-hover:scale-110 ${item.color}`}
                  />
                  <span className="text-sm font-medium text-white/90">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* 大鑽石排佈 */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <DiamondLink item={contacts[0]} />
            <div className="flex gap-4">
              <DiamondLink item={contacts[2]} />
              <DiamondLink item={contacts[3]} />
            </div>
            <DiamondLink item={contacts[1]} />
          </div>
        </div>

        {/* footer text */}
        <p className="mt-14 text-sm text-white/45">
          © 2026 Jimmy Zhao — Built with Next.js
        </p>
      </div>
    </section>
  );
}

function DiamondLink({ item }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      className="group relative block"
    >
      <div
        className={`w-[135px] h-[135px] lg:w-[150px] lg:h-[150px]
          rotate-45 rounded-2xl border bg-white/5 backdrop-blur-md
          transition duration-300 hover:scale-105 hover:bg-white/10
          ${item.border} ${item.glow}`}
      />
      <div className="absolute inset-0 flex items-center justify-center -rotate-45">
        <div className="flex flex-col items-center gap-3">
          <Icon
            className={`text-3xl lg:text-[34px] transition duration-300 group-hover:scale-110 ${item.color}`}
          />
          <span className="text-sm lg:text-base font-medium text-white/90">
            {item.label}
          </span>
        </div>
      </div>
    </a>
  );
}