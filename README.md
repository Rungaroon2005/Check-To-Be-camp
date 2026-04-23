# 🏕️ TO BE NUMBER ONE PHUKET — ระบบประกาศผลพี่ค่าย

> เว็บแอปพลิเคชันสำหรับประกาศผลรายชื่อพี่ค่าย TO BE NUMBER ONE จังหวัดภูเก็ต

## Tech Stack
- **Backend**: NestJS + TypeORM + PostgreSQL
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: PostgreSQL 16

## Project Structure
```
tobeone-phuket/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── participants/
│   │       ├── participant.entity.ts
│   │       ├── participants.controller.ts
│   │       ├── participants.module.ts
│   │       ├── participants.service.ts
│   │       └── dto/check-participant.dto.ts
│   └── package.json
├── frontend/         # Next.js App
│   ├── app/
│   │   ├── page.tsx          # หน้า 1: Landing
│   │   ├── check/page.tsx    # หน้า 2: ตรวจสอบชื่อ
│   │   └── result/page.tsx   # หน้า 3: แสดงผล
│   ├── lib/api.ts
│   └── package.json
└── docker-compose.yml
```

## Quick Start

### Option A: Docker (แนะนำ)
```bash
# Clone และรัน
docker-compose up -d

# เว็บจะขึ้นที่:
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001/api
```

### Option B: Manual

**1. เริ่ม PostgreSQL**
```bash
# หรือใช้ Docker สำหรับ DB เท่านั้น
docker run -d --name tobeone_db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=tobeone_phuket \
  -p 5432:5432 postgres:16-alpine
```

**2. Backend**
```bash
cd backend
cp .env.example .env   # แก้ไขค่าตามต้องการ
npm install
npm run start:dev
```

**3. Frontend**
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/participants/check` | ตรวจสอบรายชื่อ |
| GET | `/api/participants/seed` | เพิ่มข้อมูลตัวอย่าง (dev only) |

**Request body (POST /check):**
```json
{
  "firstName": "สมชาย",
  "lastName": "ใจดี"
}
```

**Response:**
```json
{
  "status": "confirmed",  // "confirmed" | "reserve" | "not_registered"
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "role": "ฝ่ายลงทะเบียน",
  "personImageUrl": null,
  "qrCodeUrl": null
}
```

## การเพิ่มข้อมูลผู้เข้าร่วม

**วิธีที่ 1: SQL โดยตรง**
```sql
-- ตัวจริง
INSERT INTO participants (first_name, last_name, status, role, person_image_url)
VALUES ('สมชาย', 'ใจดี', 'confirmed', 'ฝ่ายลงทะเบียน', 'https://example.com/person.jpg');

-- ตัวสำรอง
INSERT INTO participants (first_name, last_name, status, role, person_image_url)
VALUES ('สมหญิง', 'รักดี', 'reserve', 'ฝ่ายสันทนาการ', NULL);
```

**วิธีที่ 2: Seed API (Development)**
```bash
GET http://localhost:3001/api/participants/seed
```

## Result Status
| Status | ความหมาย | หน้าที่แสดง |
|--------|-----------|------------|
| `confirmed` | พี่ค่ายตัวจริง | ยินดีด้วย + QR Code |
| `reserve` | ตัวสำรอง | รอการติดต่อ |
| `not_registered` | ไม่พบข้อมูล | ไม่ได้ลงทะเบียน |
