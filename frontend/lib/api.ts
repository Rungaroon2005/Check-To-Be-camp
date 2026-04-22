// lib/api.ts

// ใน Vercel ให้ตั้งค่า NEXT_PUBLIC_API_URL = https://xxx.onrender.com (ไม่ต้องมี /api)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function checkParticipant(firstName: string, lastName: string) {
  // Path: BASE_URL + /api + /participants/check
  const endpoint = `${BASE_URL}/api/participants/check`;

  const response = await fetch(endpoint, {
    method: "POST", // ต้องเป็น POST ตาม @Post ใน Controller
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName, // ต้องตรงกับชื่อตัวแปรใน CheckParticipantDto
      lastName: lastName,
    }),
  });

  if (!response.ok) {
    throw new Error("ไม่พบข้อมูลหรือเซิร์ฟเวอร์ขัดข้อง");
  }

  return response.json();
}