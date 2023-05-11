import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { configService } from 'src/services/config.service';
import { Entity, JoinColumn, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Match } from './match.entity';
import { MatchStatus } from './matchStatus.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { TeamStatus } from './teamStatus.entity';
import { EliminationChampionship } from './eliminationChampionship.entity';
import { Goal } from './goal.entity';
import { Card } from './card.entity';

const errors = configService.get('model.errors');

@Entity()
@Tree('closure-table')
export class EliminationMatch extends Match {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => MatchStatus, { eager: true, cascade: true })
  @JoinColumn()
  status: MatchStatus;
  @OneToOne(() => EliminationChampionship, (championship) => championship.final, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championshipFinal: EliminationChampionship;
  @TreeParent()
  parent: EliminationMatch | null;
  @TreeChildren({ cascade: true })
  submatches: [EliminationMatch, EliminationMatch] | [];

  championship: EliminationChampionship;

  public get local(): EliminationMatch {
    return this.submatches[0];
  }

  public get visiting(): EliminationMatch {
    return this.submatches[1];
  }

  teams(): Array<ChampionshipTeam> {
    if (this.isBaseMatch()) {
      return [this.status.localStatus.team, this.status.visitingStatus.team];
    } else {
      return [
        this.status.localStatus.team,
        this.status.visitingStatus.team,
        ...this.local.teams(),
        ...this.visiting.teams(),
      ];
    }
  }

  public get phases(): Array<Array<EliminationMatch>> {
    if (this.isBaseMatch()) {
      return [[this]];
    } else {
      const visitingPhases = this.submatches[1].phases;
      const subphases = this.submatches[0].phases.map((phase, index) => [
        ...phase,
        ...visitingPhases[index],
      ]);
      return [...subphases, [this]];
    }
  }

  public get room() {
    return `match-${this.id}`;
  }

  findMatch(id: number) {
    if (this.id === id) {
      return this;
    } else if (this.isBaseMatch()) {
      return null;
    } else {
      return this.local.findMatch(id) ?? this.visiting.findMatch(id);
    }
  }

  initialize(
    local: EliminationMatch | ChampionshipTeam,
    visiting: EliminationMatch | ChampionshipTeam,
  ): EliminationMatch {
    if (local instanceof ChampionshipTeam && visiting instanceof ChampionshipTeam) {
      this.status = new MatchStatus(new TeamStatus(local), new TeamStatus(visiting));
    } else if (local instanceof EliminationMatch && visiting instanceof EliminationMatch) {
      this.submatches = [local, visiting];
    } else {
      throw new InvalidArgumentException(errors.invalidArgument);
    }
    return this;
  }

  goal(goal: Goal, local: boolean) {
    this.status.goal(goal, local);
  }

  card(card: Card, local: boolean) {
    this.status.card(card, local);
  }

  start() {
    this.status.startMatch();
  }

  end() {
    this.status.endMatch();
  }

  toArray(): Array<EliminationMatch> {
    return this.phases.flat();
  }

  private isBaseMatch() {
    return this.submatches.length === 0;
  }
}
