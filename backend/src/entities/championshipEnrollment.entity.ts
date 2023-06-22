import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Championship } from './championship.entity';
import { TeamEnrollment } from './teamEnrollment.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { TeamLeader } from './teamLeader.entity';

@Entity()
export class ChampionshipEnrollment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  size: number;
  @Column()
  price: number;
  @OneToOne(() => Championship, (championship) => championship.enrollment, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  championship: Championship;
  @OneToMany(() => TeamEnrollment, (enrollment) => enrollment.championshipEnrollment, {
    eager: true,
    cascade: true,
  })
  teamEnrollments: Array<TeamEnrollment>;

  public get enrolled(): number {
    return this.enrolledTeams.length;
  }

  public get enrolledTeams(): Array<TeamEnrollment> {
    return this.teamEnrollments.filter((teamEnrollment) => teamEnrollment.paid());
  }

  enroll(teamLeader: TeamLeader): TeamEnrollment {
    this.checkEnrolled(teamLeader);
    const enrollment = TeamEnrollment.from(this, teamLeader);
    this.teamEnrollments.push(enrollment);
    return enrollment;
  }

  edit({ size, price }: { size?: number; price?: number }) {
    this.size = size ?? this.size;
    this.price = price ?? this.price;
  }

  rejectEnrollment(id: number): TeamEnrollment {
    const enrollment = this.findEnrollment(id);
    enrollment.reject();
    return enrollment;
  }

  acceptEnrollment(id: number): TeamEnrollment {
    if (!this.canAcceptEnrollments()) throw new InvalidArgumentException();
    const enrollment = this.findEnrollment(id);
    enrollment.accept();
    return enrollment;
  }

  private checkEnrolled(teamLeader: TeamLeader): void {
    if (this.isEnrolled(teamLeader)) throw new InvalidArgumentException('Already enrolled');
  }

  private isEnrolled({ id }: TeamLeader): boolean {
    return this.teamEnrollments.some(({ teamLeader }) => teamLeader.id === id);
  }

  private findEnrollment(id: number): TeamEnrollment {
    return this.teamEnrollments.find((enrollment) => enrollment.id === id);
  }

  private canAcceptEnrollments(): boolean {
    return this.enrolled < this.size;
  }
}
