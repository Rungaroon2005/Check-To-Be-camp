import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ประกาศผลพี่ค่าย TO BE NUMBER ONE PHUKET",
  description: "ประกาศผลรายชื่อพี่ค่าย TO BE NUMBER ONE จังหวัดภูเก็ต",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="noise">{children}</body>
    </html>
  );
}
