import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { configService } from 'src/services/config.service';
import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Championship } from './championship.entity';
import { EliminationMatch } from './eliminationMatch.entity';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PhaseManager } from './phaseManager.entity';

const errors = configService.get('model.errors');

@ChildEntity()
export class EliminationChampionship extends Championship {
  @OneToOne(() => EliminationMatch, { cascade: true })
  @JoinColumn()
  final: EliminationMatch;

  readonly type: ChampionshipType = ChampionshipType.ELIMINATION;

  public get matches(): Array<EliminationMatch> {
    return this.final?.toArray() ?? [];
  }

  public get phaseManager(): PhaseManager {
    return PhaseManager.from(this.final);
  }

  findMatch(id: number): EliminationMatch {
    return this.final.findMatch(id);
  }

  protected generateMatches() {
    if (!this.isGenerable()) throw new InvalidArgumentException(errors.invalidArgument);
    let baseMatches: Array<EliminationMatch> | Array<ChampionshipTeam> = this.unsortedTeams();
    this.levels().forEach(() => {
      const locals = baseMatches.slice(0, baseMatches.length / 2);
      const visitings = baseMatches.slice(baseMatches.length / 2);
      baseMatches = locals.map((local, index) => EliminationMatch.from(local, visitings[index]));
      if (baseMatches.length === 1) this.final = baseMatches[0];
    });
  }

  private isGenerable() {
    const levels = Math.log2(this.teams.length);
    return this.teams.length > 1 && levels - Math.floor(levels) === 0;
  }

  private levels() {
    return Array(Math.log2(this.teams.length)).fill(undefined);
  }

  private unsortedTeams() {
    return [...this.teams].sort(() => 0.5 - Math.random());
  }
}
