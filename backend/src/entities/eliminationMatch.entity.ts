import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { configService } from 'src/services/config.service';
import { ChildEntity, RelationId, Tree, TreeChildren, TreeParent } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Match } from './match.entity';
import { MatchStatus } from './matchStatus.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { EliminationChampionship } from './eliminationChampionship.entity';

const errors = configService.get('model.errors');

@ChildEntity()
@Tree('closure-table')
export class EliminationMatch extends Match {
  @OneToOne(() => EliminationChampionship, (championship) => championship.final, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championshipFinal: EliminationChampionship;
  @RelationId('championshipFinal')
  championshipId: number;
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

  public get next(): EliminationMatch {
    return this.parent;
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

  static from(
    local: EliminationMatch | ChampionshipTeam,
    visiting: EliminationMatch | ChampionshipTeam,
  ): EliminationMatch {
    const match = new EliminationMatch();
    if (local instanceof ChampionshipTeam && visiting instanceof ChampionshipTeam) {
      match.status = MatchStatus.from(local, visiting);
      match.submatches = [];
    } else if (local instanceof EliminationMatch && visiting instanceof EliminationMatch) {
      match.status = MatchStatus.empty();
      match.submatches = [local, visiting];
    } else {
      throw new InvalidArgumentException(errors.invalidArgument);
    }
    return match;
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

  end() {
    if (!this.status.partialWinner) throw new InvalidArgumentException();
    const winner = super.end();
    if (!!this.next) this.next.setTeam(winner, this);
    return winner;
  }

  setTeam(winner: ChampionshipTeam, match: EliminationMatch) {
    if (this.local.id === match.id) this.status.setLocal(winner);
    if (this.visiting.id === match.id) this.status.setVisiting(winner);
    throw new InvalidArgumentException();
  }

  toArray(): Array<EliminationMatch> {
    return this.phases.flat();
  }

  private isBaseMatch() {
    return this.submatches.length === 0;
  }
}
