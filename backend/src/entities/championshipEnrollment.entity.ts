import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Championship } from './championship.entity';
import { TeamEnrollment } from './teamEnrollment.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { TeamLeader } from './teamLeader.entity';
import { User } from './user.entity';

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

  public get allReserved(): boolean {
    return this.reserved === this.size;
  }

  public get closed(): boolean {
    return this.enrolled === this.size;
  }

  public get reserved(): number {
    return this.reservedTeams.length;
  }

  public get reservedTeams(): Array<TeamEnrollment> {
    return this.teamEnrollments.filter((teamEnrollment) => teamEnrollment.reserved());
  }

  enroll(teamLeader: TeamLeader): TeamEnrollment {
    this.checkCanEnroll(teamLeader);
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

  acceptEnrollment(id: number, championship: Championship): TeamEnrollment {
    if (!this.hasPlaces()) throw new InvalidArgumentException();
    const enrollment = this.findEnrollment(id);
    enrollment.accept(championship);
    return enrollment;
  }

  isEnrolled(user: User): boolean {
    if (!(user instanceof TeamLeader)) return false;
    return this.teamEnrollments.some(
      (enrollment) => enrollment.reserved() && enrollment.teamLeader.id === user.id,
    );
  }

  private checkCanEnroll(teamLeader: TeamLeader): void {
    if (this.isEnrolled(teamLeader)) throw new InvalidArgumentException('Already enrolled');
    if (this.enrolled === this.size) throw new InvalidArgumentException('Completed places');
    if (this.reserved === this.size) throw new InvalidArgumentException('Reserved places');
  }

  findEnrollment(id: number): TeamEnrollment {
    return this.teamEnrollments.find((enrollment) => enrollment.id === id);
  }

  hasPlaces(): boolean {
    return this.enrolled < this.size;
  }
}
