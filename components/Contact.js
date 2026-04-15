"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { SiGithub, SiGmail } from "react-icons/si";
import { FaFileAlt, FaArrowUp  } from "react-icons/fa";

export default function Contact() {
  const lines = useMemo(
    () => [
      "我是 Jimmy——相信持續成長的前端工程師",
      "在前端培訓期間，曾參與過組別專案，",
      "負責論壇模組與富文本編輯功能開發。",
      "近半年內，做了 3 個已上線專案，",
      "處理過 Google OAuth 登入整合、Zustand 狀態管理，",
      "以及Supabase RLS 資料安全等實務問題，",
      "法律背景讓我習慣系統性思考，也重視文件理解和關聯性；",
      "Stay hungry, stay foolish，專注當下、保持好奇",
      "對我而言，每個挑戰都是極佳的學習機會!",
      "目前正在尋找雙北前端或全端職缺，歡迎交流🚀",
    ],
    [],
  );

  const [displayedLines, setDisplayedLines] = useState(["", "", ""]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  // 滑到才打字，**state/ref一定要在useEffect上
  const sectionRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (!startTyping) return;
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
  }, [charIndex, lineIndex, lines, startTyping]);

  const contacts = [
    {
      label: "Back to Top",
      href: "#hero",
      icon: FaArrowUp ,
      color: "text-cyan-300",
      border: "border-cyan-400/40 hover:border-cyan-300",
      glow: "glow-pulse",
    },
    {
      label: "Resume",
      href: "/CV(僅供面試使用).pdf",
      external: true,
      icon: FaFileAlt,
      color: "text-violet-300",
      border: "border-violet-400/40 hover:border-violet-300",
      glow: "glow-pulse",
    },
    {
      label: "GitHub",
      href: "https://github.com/saintcrime777",
      external: true,
      icon: SiGithub,
      color: "text-amber-300",
      border: "border-amber-400/40 hover:border-amber-300",
      glow: "glow-pulse",
    },
    {
      label: "Email",
      href: "https://mail.google.com/mail/?view=cm&to=snoopy921440@gmail.com",
      external: true,
      icon: SiGmail,
      color: "text-rose-300",
      border: "border-rose-400/40 hover:border-rose-300",
      glow: "glow-pulse",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect(); // 只觸發一次
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
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
          <div className="relative hidden md:block w-[420px] h-[420px]">
            {/* 上 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <DiamondLink item={contacts[0]} />
            </div>
            {/* 左 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <DiamondLink item={contacts[2]} />
            </div>
            {/* 右 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <DiamondLink item={contacts[3]} />
            </div>
            {/* 下 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <DiamondLink item={contacts[1]} />
            </div>
          </div>
        </div>

        {/* footer text */}
        <p className="mt-14 text-sm text-white/45">
          © 2026 Jimmy Zhao — Built with Next.js · Performance optimized
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
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="group relative block"
    >
      <div
        className={`w-[135px] h-[135px] lg:w-[150px] lg:h-[150px]
          rotate-45 rounded-2xl border bg-white/5 backdrop-blur-md
          transition duration-300 group-hover:scale-110 group-hover:bg-white/10
          ${item.border} ${item.glow}`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 pointer-events-none">
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
