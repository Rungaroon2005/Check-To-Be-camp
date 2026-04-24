"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkParticipant, CheckResult } from "../../lib/api";

export default function CheckPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheck = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("กรุณากรอกชื่อและนามสกุลให้ครบถ้วน");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await checkParticipant(firstName.trim(), lastName.trim());
      setResult(data);
      setShowPopup(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const handleViewResult = () => {
    if (!result) return;
    const params = new URLSearchParams({
      firstName: result.firstName,
      lastName: result.lastName,
      status: result.status,
      ...(result.role ? { role: result.role } : {}),
      ...(result.personImageUrl ? { personImageUrl: result.personImageUrl } : {}),
      ...(result.qrCodeUrl ? { qr: result.qrCodeUrl } : {}),
    });
    router.push(`/result?${params.toString()}`);
  };

  const statusMeta = {
    confirmed: {
      icon: "✅",
      label: "ผ่านการคัดเลือก!",
      sublabel: "ได้รับเลือกเป็นพี่ค่ายตัวจริง",
      color: "text-emerald-400",
      bg: "from-emerald-900/40 to-emerald-800/20",
      border: "border-emerald-500/40",
      dot: "bg-emerald-400",
    },
    reserve: {
      icon: "🔶",
      label: "รายชื่อตัวสำรอง",
      sublabel: "อยู่ในรายชื่อสำรอง",
      color: "text-amber-400",
      bg: "from-amber-900/40 to-amber-800/20",
      border: "border-amber-500/40",
      dot: "bg-amber-400",
    },
    not_registered: {
      icon: "❌",
      label: "ไม่พบรายชื่อ",
      sublabel: "ไม่ได้ลงทะเบียนในระยะเวลาที่กำหนด",
      color: "text-red-400",
      bg: "from-red-900/40 to-red-800/20",
      border: "border-red-500/40",
      dot: "bg-red-400",
    },
  };

  const meta = result ? statusMeta[result.status] : null;
  const statusAsset = result
    ? {
        confirmed: {
          src: "/tiew-congratulate.png",
          alt: "Tiew Congratulate",
        },
        reserve: {
          src: "/tiew-sad.png",
          alt: "Tiew Sad",
        },
        not_registered: {
          src: "/tiew-angry.png",
          alt: "Tiew Angry",
        },
      }[result.status]
    : null;

  return (
    <main className="relative min-h-screen bg-navy flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,16,46,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        กลับ
      </button>

      {/* Form card */}
      <div className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            ตรวจสอบรายชื่อ
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-1">กรอกข้อมูลของคุณ</h1>
          <p className="text-white/50 text-sm">ระบุชื่อ-นามสกุลที่ลงทะเบียนไว้</p>
        </div>

        {/* Input card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">ชื่อ (ไม่ต้องมีคำนำหน้า)</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="เช่น สมชาย"
                className="w-full bg-navy-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">นามสกุล</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="เช่น ใจดี"
                className="w-full bg-navy-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all duration-200 text-sm"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #C8102E 0%, #9B0C23 100%)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  กำลังตรวจสอบ...
                </span>
              ) : (
                "ตรวจสอบผล"
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          ข้อมูลจะถูกเก็บเป็นความลับ · ใช้สำหรับตรวจสอบรายชื่อเท่านั้น
        </p>
      </div>

      {/* === POPUP MODAL === */}
      {showPopup && result && meta && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        >
          <div
            className={`relative w-full max-w-sm rounded-3xl border ${meta.border} bg-gradient-to-b ${meta.bg} backdrop-blur-xl p-8 shadow-2xl animate-confetti`}
          >
            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Status icon */}
            <div className="text-5xl text-center mb-4">{meta.icon}</div>

            {/* Name */}
            <div className="text-center mb-1">
              <p className="text-white/60 text-sm mb-1">ผลการตรวจสอบสำหรับ</p>
              <p className="text-white font-bold text-xl">
                {result.firstName} {result.lastName}
              </p>
            </div>

            {/* Status label */}
            <div className="flex justify-center mt-4 mb-6">
              <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${meta.border} bg-white/5 text-sm font-medium ${meta.color}`}>
                <span className={`w-2 h-2 rounded-full ${meta.dot} animate-pulse`} />
                {meta.sublabel}
              </span>
            </div>

            {statusAsset ? (
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40 sm:w-44 sm:h-44">
                  <Image
                    src={statusAsset.src}
                    alt={statusAsset.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ) : null}

            {/* View result button */}
            <button
              onClick={handleViewResult}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ background: "linear-gradient(135deg, #C8102E 0%, #9B0C23 100%)" }}
            >
              ดูผลลัพธ์เต็มรูปแบบ →
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full mt-3 py-2.5 rounded-xl text-white/50 text-sm hover:text-white transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
