import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum ParticipantStatus {
  CONFIRMED = 'confirmed',
  RESERVE = 'reserve',
}

@Entity('participants')
@Index(['firstName', 'lastName'])
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    type: 'enum',
    enum: ParticipantStatus,
    default: ParticipantStatus.CONFIRMED,
  })
  status: ParticipantStatus;

  @Column({ name: 'role', nullable: true })
  role: string | null;

  @Column({ name: 'person_image_url', nullable: true, type: 'text' })
  personImageUrl: string | null;

  @Column({ name: 'qr_code_url', nullable: true, type: 'text' })
  qrCodeUrl: string | null;

  @Column({ name: 'note', nullable: true, type: 'text' })
  note: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'viewed_at' })
  viewedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'thai_first_name', nullable: true })
  thaiFirstName: string;

  @Column({ name: 'thai_last_name', nullable: true })
  thaiLastName: string;
}
