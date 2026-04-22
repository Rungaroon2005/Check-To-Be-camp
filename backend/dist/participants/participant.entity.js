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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = exports.ParticipantStatus = void 0;
const typeorm_1 = require("typeorm");
var ParticipantStatus;
(function (ParticipantStatus) {
    ParticipantStatus["CONFIRMED"] = "confirmed";
    ParticipantStatus["RESERVE"] = "reserve";
})(ParticipantStatus || (exports.ParticipantStatus = ParticipantStatus = {}));
let Participant = class Participant {
};
exports.Participant = Participant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], Participant.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], Participant.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ParticipantStatus,
        default: ParticipantStatus.CONFIRMED,
    }),
    __metadata("design:type", String)
], Participant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_code_url', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Participant.prototype, "qrCodeUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Participant.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Participant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thai_first_name', nullable: true }),
    __metadata("design:type", String)
], Participant.prototype, "thaiFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thai_last_name', nullable: true }),
    __metadata("design:type", String)
], Participant.prototype, "thaiLastName", void 0);
exports.Participant = Participant = __decorate([
    (0, typeorm_1.Entity)('participants'),
    (0, typeorm_1.Index)(['firstName', 'lastName'])
], Participant);
//# sourceMappingURL=participant.entity.js.map