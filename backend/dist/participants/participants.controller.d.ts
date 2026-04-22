import { ParticipantsService } from './participants.service';
import { CheckParticipantDto } from './dto/check-participant.dto';
export declare class ParticipantsController {
    private readonly service;
    constructor(service: ParticipantsService);
    check(dto: CheckParticipantDto): Promise<import("./participants.service").CheckResult>;
    seed(): Promise<{
        message: string;
    }>;
}
