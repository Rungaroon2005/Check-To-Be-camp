"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { checkParticipant, CheckResult } from "../../lib/api";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const statusParam = searchParams.get("status") as CheckResult["status"] | null;

  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firstName || !lastName) {
      router.replace("/check");
      return;
    }
    // Re-fetch to ensure data integrity
    checkParticipant(firstName, lastName)
      .then(setResult)
      .catch(() => {
        // Fallback to URL params
        setResult({
          status: statusParam || "not_registered",
          firstName,
          lastName,
          role: searchParams.get("role"),
          personImageUrl: searchParams.get("personImageUrl"),
          qrCodeUrl: searchParams.get("qr") || null,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-crimson border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">กำลังโหลดผลลัพธ์...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <ResultView result={result} onBack={() => router.push("/check")} />
  );
}

function ResultView({ result, onBack }: { result: CheckResult; onBack: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (result.status === "confirmed") return <ConfirmedView result={result} onBack={onBack} mounted={mounted} />;
  if (result.status === "reserve") return <ReserveView result={result} onBack={onBack} mounted={mounted} />;
  return <NotRegisteredView result={result} onBack={onBack} mounted={mounted} />;
}

// ---- CASE 1: CONFIRMED ----
function ConfirmedView({ result, onBack, mounted }: { result: CheckResult; onBack: () => void; mounted: boolean }) {
  const qrUrl = "/QR-Higuy.png";
  const characterUrl = "/tiew-congratulate.png";

  return (
    <main className="relative min-h-screen bg-navy overflow-hidden px-4 py-12 flex flex-col items-center justify-center">
      {/* Green/gold radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.12) 0%, rgba(200,16,46,0.08) 50%, transparent 80%)" }} />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      {/* Floating confetti dots */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none animate-float"
          style={{
            background: i % 2 === 0 ? "#F4AC22" : "#C8102E",
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.4,
          }}
        />
      ))}

      <div className={`relative z-10 w-full max-w-lg text-center transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0 translate-y-8"}`}>
        {/* Trophy icon */}
        <div className="text-7xl mb-4 animate-bounce-gentle">🏆</div>

        {/* Congratulations text */}
        <div className="mb-2">
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">ยินดีด้วย!</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
          คุณได้รับการ<br />
          <span className="shimmer-text">คัดเลือกแล้ว</span>
        </h1>
        <p className="text-white/60 mb-1 text-base">
          <span className="text-white font-semibold">{result.firstName} {result.lastName}</span>
        </p>
        <p className="text-white/50 text-sm mb-8">
          ได้รับเลือกเป็น <span className="text-emerald-400 font-semibold">พี่ค่ายตัวจริง</span>
          {result.role ? (
            <>
              {" "}ตำแหน่ง <span className="text-gold font-semibold">{result.role}</span>
            </>
          ) : null}
          {" "}· TO BE NUMBER ONE PHUKET
        </p>

        {/* QR + Decoration card */}
        <div className="glass-card rounded-3xl p-6 mb-6 border border-emerald-500/20">
          <p className="text-white/50 text-xs mb-4 tracking-wider uppercase">Mascot ประจำสถานะ</p>
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44">
              <Image
                src={characterUrl}
                alt="Tiew Congratulate"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          {result.personImageUrl ? (
            <>
              <p className="text-white/50 text-xs mb-4 tracking-wider uppercase">รูปประจำตัว</p>
              <div className="flex justify-center mb-6">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.personImageUrl}
                    alt={`${result.firstName} ${result.lastName}`}
                    className="w-44 h-56 object-cover rounded-xl"
                  />
                </div>
              </div>
            </>
          ) : null}
          <p className="text-white/50 text-xs mb-4 tracking-wider uppercase">QR Code ยืนยันตัวตน</p>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-2xl gold-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="QR Code"
                className="w-44 h-44 object-contain"
              />
            </div>
          </div>
          <p className="text-white/40 text-xs">กรุณาแสดง QR Code นี้ในวันรับสมัคร</p>
        </div>

    

        <button
          onClick={onBack}
          className="flex items-center gap-2 mx-auto text-white/50 hover:text-white text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ตรวจสอบชื่ออื่น
        </button>
      </div>
    </main>
  );
}

// ---- CASE 2: RESERVE ----
function ReserveView({ result, onBack, mounted }: { result: CheckResult; onBack: () => void; mounted: boolean }) {
  const characterUrl = "/tiew-sad.png";

  return (
    <main className="relative min-h-screen bg-navy overflow-hidden px-4 py-12 flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,158,11,0.1) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      <div className={`relative z-10 w-full max-w-lg text-center transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0 translate-y-8"}`}>
        {/* Icon */}
        <div className="text-7xl mb-4 animate-float">🔶</div>

        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">ผลการคัดเลือก</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
          คุณอยู่ใน<br />
          <span style={{ color: "#F4AC22" }}>รายชื่อสำรอง</span>
        </h1>
        <p className="text-white/60 mb-8 text-base">
          <span className="text-white font-semibold">{result.firstName} {result.lastName}</span>
        </p>
        {result.role ? (
          <p className="text-amber-300/90 text-sm font-medium mb-8">ตำแหน่ง {result.role}</p>
        ) : null}

        {/* Info card */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-amber-500/30">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44">
              <Image
                src={characterUrl}
                alt="Tiew Sad"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
          </div>
          <h2 className="text-white font-bold text-lg mb-3">ขณะนี้คุณอยู่ในรายชื่อตัวสำรอง</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            ทางโครงการจะติดต่อกลับหากมีตำแหน่งว่างจากผู้ที่ได้รับคัดเลือกตัวจริง
            กรุณาติดตามประกาศเพิ่มเติมจากช่องทางทางการของโครงการ
          </p>
        </div>

        {/* Status steps */}
        <div className="glass-card rounded-2xl p-5 mb-8 border border-amber-500/20">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/30 flex items-center justify-center text-sm text-amber-400 font-bold shrink-0">1</div>
            <p className="text-white/70 text-sm text-left">รอการติดต่อจากทีมงานโครงการ</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500/30 flex items-center justify-center text-sm text-amber-400 font-bold shrink-0">2</div>
            <p className="text-white/70 text-sm text-left">ติดตามประกาศบนช่องทางทางการ</p>
          </div>
        </div>

        <button onClick={onBack} className="flex items-center gap-2 mx-auto text-white/50 hover:text-white text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ตรวจสอบชื่ออื่น
        </button>
      </div>
    </main>
  );
}

// ---- CASE 3: NOT REGISTERED ----
function NotRegisteredView({ result, onBack, mounted }: { result: CheckResult; onBack: () => void; mounted: boolean }) {
  const characterUrl = "/tiew-angry.png";

  return (
    <main className="relative min-h-screen bg-navy overflow-hidden px-4 py-12 flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,16,46,0.08) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      <div className={`relative z-10 w-full max-w-lg text-center transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0 translate-y-8"}`}>
        <div className="text-7xl mb-4">😔</div>

        <div className="mb-2">
          <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">ผลการตรวจสอบ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
          ไม่พบ<br />
          <span className="text-red-400">รายชื่อ</span>
        </h1>
        <p className="text-white/60 mb-8 text-base">
          <span className="text-white font-semibold">{result.firstName} {result.lastName}</span>
        </p>
        {result.role ? (
          <p className="text-white/50 text-sm mb-8">ตำแหน่ง {result.role}</p>
        ) : null}

        {/* Info card */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-red-500/30">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44">
              <Image
                src={characterUrl}
                alt="Tiew Angry"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-white font-bold text-lg mb-3">ไม่ได้ลงทะเบียนตามระยะเวลาที่กำหนด</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            ไม่พบข้อมูลของท่านในระบบ อาจเป็นเพราะชื่อที่กรอกไม่ตรงกับที่ลงทะเบียน
            หรือไม่ได้สมัครภายในระยะเวลาที่กำหนด
          </p>
        </div>

        {/* Suggestions */}
        <div className="glass-card rounded-2xl p-5 mb-8 border border-white/10">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-3">คำแนะนำ</p>
          <div className="space-y-2 text-left">
            {["ตรวจสอบการสะกดชื่อ-นามสกุลให้ถูกต้อง", "ติดต่อทีมงานโครงการเพื่อขอข้อมูลเพิ่มเติม", "ติดตามการเปิดรับสมัครรอบถัดไป"].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-gold mt-0.5 text-sm">·</span>
                <p className="text-white/60 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onBack} className="flex items-center gap-2 mx-auto text-white/50 hover:text-white text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ลองตรวจสอบอีกครั้ง
        </button>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-crimson border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
