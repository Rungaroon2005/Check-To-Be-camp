const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export type CheckResult = {
  status: "confirmed" | "reserve" | "not_registered";
  firstName: string;
  lastName: string;
  qrCodeUrl?: string | null;
  note?: string | null;
};

export async function checkParticipant(
  firstName: string,
  lastName: string
): Promise<CheckResult> {
  const res = await fetch(`${API_URL}/participants/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
  }

  return res.json();
}
