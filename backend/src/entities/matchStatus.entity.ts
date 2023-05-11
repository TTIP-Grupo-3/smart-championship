import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { TeamStatus } from './teamStatus.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { Goal } from './goal.entity';
import { Card } from './card.entity';
import { MatchResponseStatus } from 'src/responses/match.response';
import { ChampionshipTeam } from './championshipTeam.entity';

@Entity()
export class MatchStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: Date;
  @Column({ nullable: true })
  start: Date;
  @Column({ nullable: true })
  end: Date;
  @OneToOne(() => TeamStatus, { eager: true, cascade: true })
  @JoinColumn()
  localStatus: TeamStatus;
  @OneToOne(() => TeamStatus, { eager: true, cascade: true })
  @JoinColumn()
  visitingStatus: TeamStatus;

  public get winner(): ChampionshipTeam {
    if (this.status !== MatchResponseStatus.FINISHED) throw new InvalidArgumentException();
    return this.localStatus.goals.length > this.visitingStatus.goals.length
      ? this.localStatus.team
      : this.visitingStatus.team;
  }

  public get status(): MatchResponseStatus {
    if (this.end) {
      return MatchResponseStatus.FINISHED;
    } else if (this.start) {
      return MatchResponseStatus.STARTED;
    } else {
      return MatchResponseStatus.TOSTART;
    }
  }

  constructor(localStatus: TeamStatus, visitingStatus: TeamStatus) {
    this.localStatus = localStatus;
    this.visitingStatus = visitingStatus;
  }

  startMatch() {
    if (!!this.start) throw new InvalidArgumentException();
    this.start = new Date();
  }

  endMatch(): ChampionshipTeam {
    if (!!this.end) throw new InvalidArgumentException();
    this.end = new Date();
    return this.winner;
  }

  goal(goal: Goal, local: boolean) {
    if (local) {
      this.localStatus.goal(goal);
    } else {
      this.visitingStatus.goal(goal);
    }
  }

  card(card: Card, local: boolean) {
    if (local) {
      this.localStatus.card(card);
    } else {
      this.visitingStatus.card(card);
    }
  }

  setVisiting(team: ChampionshipTeam) {
    this.visitingStatus.setTeam(team);
  }

  setLocal(team: ChampionshipTeam) {
    this.localStatus.setTeam(team);
  }
}
