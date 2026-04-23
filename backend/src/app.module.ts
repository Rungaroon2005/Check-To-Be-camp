import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParticipantsModule } from './participants/participants.module';
import { Participant } from './participants/participant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        const isProd = config.get('NODE_ENV') === 'production';

        return {
          type: 'postgres',
          // ใช้ DATABASE_URL บน Render/production เป็นหลัก
          url,

          // ถ้าไม่มี DATABASE_URL ให้ fallback ไปใช้ค่า DB_* สำหรับ local/docker-compose
          host: !url ? config.get<string>('DB_HOST', '127.0.0.1') : undefined,
          port: !url ? Number(config.get<string>('DB_PORT', '5432')) : undefined,
          username: !url ? config.get<string>('DB_USER', 'postgres') : undefined,
          password: !url ? config.get<string>('DB_PASS') : undefined,
          database: !url ? config.get<string>('DB_NAME', 'tobeone_phuket') : undefined,

          entities: [Participant],
          
          // จุดตาย: ฐานข้อมูลบน Cloud ส่วนใหญ่ "บังคับ" ให้ใช้ SSL ครับ
          ssl: isProd ? { rejectUnauthorized: false } : false,
          
          // คุมเข้มเรื่อง synchronization
          synchronize: !isProd, 
        };
      },
    }),

    ParticipantsModule,
  ],
})
export class AppModule {}
