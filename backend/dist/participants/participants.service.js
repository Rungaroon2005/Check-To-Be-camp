"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const participant_entity_1 = require("./participant.entity");
let ParticipantsService = class ParticipantsService {
    constructor(repo) {
        this.repo = repo;
    }
    async check(firstName, lastName) {
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
            status: participant.status,
            firstName: participant.firstName,
            lastName: participant.lastName,
            qrCodeUrl: participant.qrCodeUrl,
            note: participant.note,
        };
    }
    async seed() {
        const count = await this.repo.count();
        if (count > 0)
            return { message: 'Already seeded' };
        const samples = [
            { firstName: 'สมชาย', lastName: 'ใจดี', status: participant_entity_1.ParticipantStatus.CONFIRMED },
            { firstName: 'สมหญิง', lastName: 'รักดี', status: participant_entity_1.ParticipantStatus.RESERVE },
        ];
        for (const s of samples) {
            const p = this.repo.create(s);
            await this.repo.save(p);
        }
        return { message: 'Seeded successfully' };
    }
};
exports.ParticipantsService = ParticipantsService;
exports.ParticipantsService = ParticipantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participant_entity_1.Participant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ParticipantsService);
//# sourceMappingURL=participants.service.js.map