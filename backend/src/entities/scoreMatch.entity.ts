import { ChildEntity, ManyToOne } from 'typeorm';
import { Match } from './match.entity';
import { ScoreChampionship } from './scoreChampionship.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { MatchResponseStatus } from 'src/responses/match.response';
import { MatchStatus } from './matchStatus.entity';

@ChildEntity()
export class ScoreMatch extends Match {
  @ManyToOne(() => ScoreChampionship, (championship) => championship.matches, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championship: ScoreChampionship;

  public get winner(): ChampionshipTeam {
    return this.status.winner;
  }

  static from(
    local: ChampionshipTeam,
    visiting: ChampionshipTeam,
    championship: ScoreChampionship,
  ): ScoreMatch {
    const match = new ScoreMatch();
    match.championship = championship;
    match.status = MatchStatus.from(local, visiting);
    return match;
  }

  includes(team: ChampionshipTeam): boolean {
    return this.status.includes(team);
  }

  finished(): boolean {
    return this.status.status === MatchResponseStatus.FINISHED;
  }
}
