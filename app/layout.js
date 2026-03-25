import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jimmy's portfolio",
  description: "Welcome to my site!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050810]`}
      >
        {/* 全站固定 glow — 跟 Hero 同色系 */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute left-[-15%] top-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[5%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
