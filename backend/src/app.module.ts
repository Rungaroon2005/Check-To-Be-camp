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
          // ถ้ามี URL ให้ใช้ URL เป็นหลัก (ซึ่ง Render จะมีตัวนี้)
          url: url,
          
          // ถ้าไม่มี URL จริงๆ (เช่น รันในเครื่อง M4) ถึงจะใช้ค่าพวกนี้
          host: !url ? '127.0.0.1' : undefined,
          port: !url ? 5432 : undefined,
          username: !url ? 'postgres' : undefined,
          password: !url ? config.get('DB_PASS') : undefined,
          database: !url ? 'tobeone_phuket' : undefined,

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