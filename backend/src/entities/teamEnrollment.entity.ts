import { PayStatus } from 'src/enums/payStatus.enum';
import { TeamLeader } from './teamLeader.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipEnrollment } from './championshipEnrollment.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';

@Entity()
export class TeamEnrollment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ generated: 'uuid' })
  receiptId: string;
  @Column({ default: PayStatus.ToPay })
  payStatus: PayStatus = PayStatus.ToPay;
  @ManyToOne(() => TeamLeader, (leader) => leader.enrollments, { eager: true })
  teamLeader: TeamLeader;
  @ManyToOne(() => ChampionshipEnrollment, (enrollment) => enrollment.teamEnrollments, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championshipEnrollment: ChampionshipEnrollment;
  receipt: string | null = null;

  public get filename(): string {
    return `${this.receiptId}-${this.id}.png`;
  }

  uploadReceipt(receipt: string) {
    if (this.paid()) throw new InvalidArgumentException('Already paid');
    this.receipt = receipt;
    this.payStatus = PayStatus.ToReview;
  }

  static from(enrollment: ChampionshipEnrollment, teamLeader: TeamLeader): TeamEnrollment {
    const teamEnrollment = new TeamEnrollment();
    teamEnrollment.championshipEnrollment = enrollment;
    teamEnrollment.teamLeader = teamLeader;
    return teamEnrollment;
  }

  paid(): boolean {
    return this.payStatus === PayStatus.Paid;
  }

  accept() {
    if (!this.reviewable()) throw new InvalidArgumentException();
    this.payStatus = PayStatus.Paid;
  }

  reject() {
    if (!this.reviewable()) throw new InvalidArgumentException();
    this.payStatus = PayStatus.Rejected;
  }

  private reviewable(): boolean {
    return !!this.receipt && this.payStatus === PayStatus.ToReview;
  }
}
