import { Repository } from 'typeorm';
import { Participant } from './participant.entity';
export type CheckResult = {
    status: 'confirmed' | 'reserve' | 'not_registered';
    firstName: string;
    lastName: string;
    qrCodeUrl?: string | null;
    note?: string | null;
};
export declare class ParticipantsService {
    private readonly repo;
    constructor(repo: Repository<Participant>);
    check(firstName: string, lastName: string): Promise<CheckResult>;
    seed(): Promise<{
        message: string;
    }>;
}
