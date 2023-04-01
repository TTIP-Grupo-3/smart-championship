import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { TeamStatus } from './teamStatus.entity';

@Entity()
export class MatchStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: Date;
  @Column()
  start: Date;
  @Column()
  end: Date;
  @OneToOne(() => TeamStatus, { eager: true, cascade: true })
  @JoinColumn()
  localStatus: TeamStatus;
  @OneToOne(() => TeamStatus, { eager: true, cascade: true })
  @JoinColumn()
  visitingStatus: TeamStatus;

  constructor(localStatus: TeamStatus, visitingStatus: TeamStatus) {
    this.localStatus = localStatus;
    this.visitingStatus = visitingStatus;
  }
}
