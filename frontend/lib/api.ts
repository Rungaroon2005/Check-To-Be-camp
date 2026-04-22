// frontend/lib/api.ts

// กำหนด Type และต้องมีคำว่า export นำหน้าเพื่อให้ไฟล์อื่นเรียกใช้ได้
export type CheckResult = {
  status: "confirmed" | "reserve" | "not_registered";
  firstName: string;
  lastName: string;
  qrCodeUrl?: string | null;
  note?: string | null;
};

// ดึง URL หลังบ้านจาก Environment Variable ของ Vercel
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
    if (res.status === 404) {
      return { status: "not_registered", firstName, lastName };
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "เกิดข้อผิดพลาดในการตรวจสอบข้อมูล");
  }

  return res.json();
}