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

        // hardcode for debugging
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: config.get('DB_PASS'),
        database: 'tobeone_phuket',

        entities: [Participant],
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
    }),

    ParticipantsModule,
  ],
})
export class AppModule {}