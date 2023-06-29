import { PayStatus } from 'src/enums/payStatus.enum';
import { TeamLeader } from './teamLeader.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  expireTime: number = 60 * 60 * 1000;
  receipt: string | null = null;

  public get filename(): string {
    return `${this.receiptId}-${this.id}.png`;
  }

  public get status(): PayStatus {
    return this.expired() ? PayStatus.Expired : this.payStatus;
  }

  uploadReceipt(receipt: string) {
    if (!this.toPay()) throw new InvalidArgumentException('Invalid operation. Cannot upload receipt');
    this.receipt = receipt;
    this.payStatus = PayStatus.ToReview;
  }

  static from(enrollment: ChampionshipEnrollment, teamLeader: TeamLeader): TeamEnrollment {
    const teamEnrollment = new TeamEnrollment();
    teamEnrollment.championshipEnrollment = enrollment;
    teamEnrollment.teamLeader = teamLeader;
    return teamEnrollment;
  }

  reserved(): boolean {
    return [PayStatus.ToPay, PayStatus.ToReview, PayStatus.Paid].includes(this.status);
  }

  paid(): boolean {
    return this.status === PayStatus.Paid;
  }

  toPay(): boolean {
    return this.status === PayStatus.ToPay;
  }

  expired(): boolean {
    return this.payStatus === PayStatus.ToPay && Date.now() - this.createdAt.getTime() >= this.expireTime;
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
    return !!this.receipt && this.status === PayStatus.ToReview;
  }
}
