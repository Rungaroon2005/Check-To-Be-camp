export declare enum ParticipantStatus {
    CONFIRMED = "confirmed",
    RESERVE = "reserve"
}
export declare class Participant {
    id: number;
    firstName: string;
    lastName: string;
    status: ParticipantStatus;
    role: string | null;
    personImageUrl: string | null;
    qrCodeUrl: string | null;
    note: string | null;
    createdAt: Date;
    thaiFirstName: string;
    thaiLastName: string;
}
