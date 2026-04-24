// frontend/lib/api.ts

// กำหนด Type และต้องมีคำว่า export นำหน้าเพื่อให้ไฟล์อื่นเรียกใช้ได้
export type CheckResult = {
  status: "confirmed" | "reserve" | "not_registered";
  firstName: string;
  lastName: string;
  role?: string | null;
  personImageUrl?: string | null;
  qrCodeUrl?: string | null;
  note?: string | null;
};

// ดึง URL หลังบ้านจาก Environment Variable ของ Vercel
const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "").replace(/\/api$/, "");

export async function checkParticipant(
  firstName: string,
  lastName: string
): Promise<CheckResult> {
  // Path ต้องมี /api (Global Prefix) และ /participants (Controller)
  const endpoint = `${BASE_URL}/api/participants/check`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.message ||
        `เกิดข้อผิดพลาดในการตรวจสอบข้อมูล (${res.status}) ที่ ${endpoint}`
    );
  }

  return res.json();
}
