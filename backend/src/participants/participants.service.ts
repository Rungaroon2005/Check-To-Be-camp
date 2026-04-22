import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant, ParticipantStatus } from './participant.entity';

export type CheckResult = {
  status: 'confirmed' | 'reserve' | 'not_registered';
  firstName: string;
  lastName: string;
  qrCodeUrl?: string | null;
  note?: string | null;
};

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly repo: Repository<Participant>,
  ) {}

  async check(firstName: string, lastName: string): Promise<CheckResult> {
    const participant = await this.repo.findOne({
      where: { firstName: firstName.trim(), lastName: lastName.trim() },
    });

    if (!participant) {
      return {
        status: 'not_registered',
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
    }

    return {
      status: participant.status as 'confirmed' | 'reserve',
      firstName: participant.firstName,
      lastName: participant.lastName,
      qrCodeUrl: participant.qrCodeUrl,
      note: participant.note,
    };
  }

  // Seed example data for development
  async seed() {
    const count = await this.repo.count();
    if (count > 0) return { message: 'Already seeded' };

    const samples = [
      { firstName: 'สมชาย', lastName: 'ใจดี', status: ParticipantStatus.CONFIRMED },
      { firstName: 'สมหญิง', lastName: 'รักดี', status: ParticipantStatus.RESERVE },
    ];

    for (const s of samples) {
      const p = this.repo.create(s);
      await this.repo.save(p);
    }
    return { message: 'Seeded successfully' };
  }
}
