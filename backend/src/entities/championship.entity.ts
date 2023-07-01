import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Match } from './match.entity';
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { EditChampionshipInfo, MatchDate } from 'src/utils/types';
import { ChampionshipEnrollment } from './championshipEnrollment.entity';
import { TeamEnrollment } from './teamEnrollment.entity';
import { TeamLeader } from './teamLeader.entity';
import { User } from './user.entity';
import { Phase } from './phase.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Championship {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ChampionshipTeam, (team) => team.championship, { eager: true, cascade: true })
  teams: Array<ChampionshipTeam>;
  @OneToMany(() => ChampionshipPlayer, (player) => player.championship)
  players: Array<ChampionshipPlayer>;
  @OneToOne(() => ChampionshipEnrollment, (enrollment) => enrollment.championship, {
    eager: true,
    cascade: true,
  })
  enrollment: ChampionshipEnrollment;
  @Column({ nullable: false })
  date: Date;
  @Column({ nullable: true })
  start: Date;
  @Column({ nullable: true })
  end: Date;
  @Column()
  duration: number;
  @Column()
  teamSize: number;

  abstract type: ChampionshipType;

  abstract matches: Array<Match>;

  public get adminMatches(): Array<Phase | Match> {
    if (this.hasPlaces()) throw new InvalidArgumentException('Cannot get matches');
    return this.getAdminMatches();
  }

  abstract findMatch(id: number): Match | null;

  protected abstract getAdminMatches(): Array<Phase | Match>;

  public get closed(): boolean {
    return this.enrollment.closed;
  }

  public get allReserved(): boolean {
    return this.enrollment.allReserved;
  }

  public get room() {
    return `championship-${this.id}`;
  }

  public get price() {
    return this.enrollment.price;
  }

  public get size() {
    return this.enrollment.size;
  }

  public get matchTeams() {
    return this.matches.flatMap((match) => match.teams).filter((team) => !!team);
  }

  public get status(): ChampionshipStatus {
    if (this.end) {
      return ChampionshipStatus.FINISHED;
    } else if (this.start) {
      return ChampionshipStatus.STARTED;
    } else {
      return ChampionshipStatus.TOSTART;
    }
  }

  hasPlaces(): boolean {
    return this.enrollment.hasPlaces();
  }

  setMatchDates(matchDates: Array<MatchDate>) {
    if (!this.toStart()) throw new InvalidArgumentException('Championship already started');
    matchDates.forEach((matchDate) => this.setMatchDate(matchDate));
  }

  findEnrollment(id: number): TeamEnrollment {
    return this.enrollment.findEnrollment(id);
  }

  addTeam(championshipTeam: ChampionshipTeam) {
    this.teams.push(championshipTeam);
  }

  isEnrolled(user: User): boolean {
    return this.enrollment.isEnrolled(user);
  }

  enroll(teamLeader: TeamLeader): TeamEnrollment {
    return this.enrollment.enroll(teamLeader);
  }

  edit({ name, date, size, price, duration, teamSize }: EditChampionshipInfo) {
    if (this.status !== ChampionshipStatus.TOSTART) throw new InvalidArgumentException();
    this.name = name ?? this.name;
    this.date = date ?? this.date;
    this.enrollment.edit({ size, price });
    this.duration = duration ?? this.duration;
    this.teamSize = teamSize ?? this.teamSize;
  }

  startChampionship() {
    if (!this.canStart()) throw new InvalidArgumentException();
    this.start = new Date();
  }

  acceptEnrollment(id: number): TeamEnrollment {
    if (!this.toStart()) throw new InvalidArgumentException();
    const enrollment = this.enrollment.acceptEnrollment(id, this);
    if (!this.hasPlaces()) this.generateMatches();
    return enrollment;
  }

  rejectEnrollment(id: number): TeamEnrollment {
    if (!this.toStart()) throw new InvalidArgumentException();
    return this.enrollment.rejectEnrollment(id);
  }

  protected abstract generateMatches(): void;

  private setMatchDate({ id, date }: MatchDate) {
    const match = this.findMatch(id);
    if (!match) throw new NotFoundException('Match not found');
    match.setDate(date);
  }

  private toStart(): boolean {
    return this.status === ChampionshipStatus.TOSTART;
  }

  private matchesInitialized(): boolean {
    return !!this.matches && this.matches.every((match) => match.initialized());
  }

  private canStart(): boolean {
    return this.toStart() && !this.hasPlaces() && this.matchesInitialized();
  }
}
