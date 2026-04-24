"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen bg-navy flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,16,46,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(244,172,34,0.08) 0%, transparent 70%)",
          top: "10%",
          left: "5%",
          animationDelay: "0s",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(200,16,46,0.1) 0%, transparent 70%)",
          bottom: "10%",
          right: "5%",
          animationDelay: "2.5s",
        }}
        aria-hidden="true"
      />

      {/* Decorative corner lines */}
      <div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gold/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gold/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl w-full">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase font-medium transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          ประกาศอย่างเป็นทางการ
        </div>

        {/* Main headline */}
        <div
          className={`transition-all duration-700 delay-150 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black leading-none tracking-tight text-white mb-2">
            ประกาศผล
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white/70 mb-1">
            รายชื่อพี่ค่าย
          </h2>
        </div>

        <div
          className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative w-52 h-52 sm:w-64 sm:h-64">
            <Image
              src="/tiew-hello.png"
              alt="Tiew Hello"
              fill
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
              priority
            />
          </div>
        </div>

        {/* Program name */}
        <div
          className={`transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative inline-block mb-3">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold shimmer-text">
              TO BE NUMBER ONE
            </span>
          </div>
          <br />
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-crimson" />
            <span className="text-lg sm:text-xl font-semibold text-white/90 tracking-widest">
              PHUKET
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-crimson" />
          </div>
        </div>

        {/* Decorative year badge */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
    
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={() => router.push("/check")}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 animate-glow"
            style={{
              background: "linear-gradient(135deg, #C8102E 0%, #9B0C23 100%)",
            }}
          >
            <span className="relative z-10">ตรวจสอบรายชื่อ</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            {/* Shimmer overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
              }}
            />
          </button>
        </div>

        {/* Scroll hint */}
        <p
          className={`mt-8 text-white/30 text-xs transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          กรุณาเตรียมชื่อ-นามสกุลของท่านให้พร้อม
        </p>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50" />
    </main>
  );
}
