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
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        
        // ใช้ DATABASE_URL ตัวเดียวจะจัดการง่ายกว่ามากทั้งบนเครื่องเราและ Render
        url: config.get('DATABASE_URL'),
        
        // ถ้าไม่มี URL (กรณีฉุกเฉิน) ค่อยใช้ค่าสำรอง
        host: config.get('DB_HOST', '127.0.0.1'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME', 'tobeone_phuket'),

        entities: [Participant],
        
        // บน Render มักจะต้องการ SSL สำหรับ Database
        ssl: config.get('NODE_ENV') === 'production' 
          ? { rejectUnauthorized: false } 
          : false,

        synchronize: config.get('NODE_ENV') !== 'production', // สร้างตารางอัตโนมัติเฉพาะตอน dev
      }),
    }),

    ParticipantsModule,
  ],
})
export class AppModule {}