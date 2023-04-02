import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { configService } from 'src/services/config.service';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { OneToOne } from 'typeorm';
import { Match } from './match.entity';
import { MatchStatus } from './matchStatus.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { TeamStatus } from './teamStatus.entity';
import { EliminationChampionship } from './eliminationChampionship.entity';

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
  @ManyToOne(() => EliminationChampionship, (championship) => championship.matches, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championship: EliminationChampionship;
  @TreeParent()
  parent: EliminationMatch | null;
  @TreeChildren({ cascade: true })
  submatches: [EliminationMatch, EliminationMatch] | [];

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

  private isBaseMatch() {
    return this.submatches.length === 0;
  }
}
