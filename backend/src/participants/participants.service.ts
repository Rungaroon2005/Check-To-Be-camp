import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant, ParticipantStatus } from './participant.entity';

export type CheckResult = {
  status: 'confirmed' | 'reserve' | 'not_registered';
  firstName: string;
  lastName: string;
  role?: string | null;
  personImageUrl?: string | null;
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
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();

    const participant = await this.repo.findOne({
      where: [
        { firstName: normalizedFirstName, lastName: normalizedLastName },
        {
          thaiFirstName: normalizedFirstName,
          thaiLastName: normalizedLastName,
        },
      ],
    });

    if (!participant) {
      return {
        status: 'not_registered',
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
      };
    }

    participant.viewedAt = new Date();
    await this.repo.save(participant);

    return {
      status: participant.status as 'confirmed' | 'reserve',
      firstName: participant.thaiFirstName || participant.firstName,
      lastName: participant.thaiLastName || participant.lastName,
      role: participant.role,
      personImageUrl: participant.personImageUrl,
      qrCodeUrl: participant.qrCodeUrl,
      note: participant.note,
    };
  }

  // Seed example data for development
  async seed() {
    const count = await this.repo.count();
    if (count > 0) return { message: 'Already seeded' };

    const samples = [
      {
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        thaiFirstName: 'สมชาย',
        thaiLastName: 'ใจดี',
        status: ParticipantStatus.CONFIRMED,
        role: 'ฝ่ายลงทะเบียน',
      },
      {
        firstName: 'สมหญิง',
        lastName: 'รักดี',
        thaiFirstName: 'สมหญิง',
        thaiLastName: 'รักดี',
        status: ParticipantStatus.RESERVE,
        role: 'ฝ่ายสันทนาการ',
      },
    ];

    for (const s of samples) {
      const p = this.repo.create(s);
      await this.repo.save(p);
    }
    return { message: 'Seeded successfully' };
  }
}
