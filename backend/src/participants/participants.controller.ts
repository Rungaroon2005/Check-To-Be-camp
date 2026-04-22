import { Controller, Post, Body, Get } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CheckParticipantDto } from './dto/check-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly service: ParticipantsService) {}

  @Post('check')
  async check(@Body() dto: CheckParticipantDto) {
    return this.service.check(dto.firstName, dto.lastName);
  }

  // Development only: seed sample data
  @Get('seed')
  async seed() {
    return this.service.seed();
  }
}
