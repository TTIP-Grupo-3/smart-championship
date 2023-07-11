import { ChildEntity, OneToMany } from 'typeorm';
import { Championship } from './championship.entity';
import { ScoreMatch } from './scoreMatch.entity';
import { ScoreStatus } from './scoreStatus.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { Match } from './match.entity';

@ChildEntity()
export class ScoreChampionship extends Championship {
  @OneToMany(() => ScoreMatch, (match) => match.championship, { eager: true, cascade: true })
  matches: Array<ScoreMatch>;

  readonly type: ChampionshipType = ChampionshipType.SCORE;

  protected getAdminMatches(): Array<Match> {
    return this.matches;
  }

  public get scoreStatuses(): Array<ScoreStatus> {
    return this.teams
      .map((team) => new ScoreStatus(team, this))
      .sort((status1, status2) => status2.score - status1.score);
  }

  protected generateMatches() {
    this.teams.forEach((team, index, teams) => this.generateTeamMatches(team, teams.slice(index + 1)));
  }

  private generateTeamMatches(local: ChampionshipTeam, teams: Array<ChampionshipTeam>) {
    this.matches.push(...teams.map((visiting) => ScoreMatch.from(local, visiting, this)));
  }

  findMatch(id: number): ScoreMatch {
    return this.matches.find((match) => match.id === id) ?? null;
  }
}
