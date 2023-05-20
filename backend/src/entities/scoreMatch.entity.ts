import { ChildEntity, ManyToOne } from 'typeorm';
import { Match } from './match.entity';
import { ScoreChampionship } from './scoreChampionship.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { MatchResponseStatus } from 'src/responses/match.response';

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

  includes(team: ChampionshipTeam): boolean {
    return this.status.includes(team);
  }

  finished(): boolean {
    return this.status.status === MatchResponseStatus.FINISHED;
  }
}
