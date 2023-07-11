import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Championship } from './championship.entity';
import { TeamEnrollment } from './teamEnrollment.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { TeamLeader } from './teamLeader.entity';
import { User } from './user.entity';
import { PayData } from './payData.entity';
import { EditChampionshipEnrollment } from 'src/utils/types';
import { configService } from 'src/services/config.service';

const errors = configService.get('model.errors');

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
  @OneToOne(() => PayData, (payData) => payData.enrollment, { eager: true, cascade: true })
  payData: PayData;

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

  edit({ size, price, payData = {} }: EditChampionshipEnrollment) {
    this.size = size ?? this.size;
    this.price = price ?? this.price;
    this.payData.edit(payData);
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
    if (this.isEnrolled(teamLeader)) throw new InvalidArgumentException(errors.alreadyEnrolled);
    if (this.enrolled === this.size) throw new InvalidArgumentException(errors.completedPlaces);
    if (this.reserved === this.size) throw new InvalidArgumentException(errors.reservedPlaces);
  }

  findEnrollment(id: number): TeamEnrollment {
    return this.teamEnrollments.find((enrollment) => enrollment.id === id);
  }

  hasPlaces(): boolean {
    return this.enrolled < this.size;
  }
}
