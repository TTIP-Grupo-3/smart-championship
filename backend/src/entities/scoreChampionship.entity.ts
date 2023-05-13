import { ChildEntity, OneToMany } from 'typeorm';
import { Championship } from './championship.entity';
import { ScoreMatch } from './scoreMatch.entity';
import { plainToInstance } from 'class-transformer';
import { ScoreStatus } from './scoreStatus.entity';
import { ChampionshipTeam } from './championshipTeam.entity';

@ChildEntity()
export class ScoreChampionship extends Championship {
  @OneToMany(() => ScoreMatch, (match) => match.championship, { eager: true, cascade: true })
  matches: Array<ScoreMatch>;

  public get scoreStatuses(): Array<ScoreStatus> {
    return this.teams
      .map((team) => plainToInstance(ScoreStatus, { team, championship: this }))
      .sort((status1, status2) => status2.score - status1.score);
  }

  generateMatches() {
    this.teams.forEach((team, index, teams) => this.generateTeamMatches(team, teams.slice(index + 1)));
  }

  private generateTeamMatches(local: ChampionshipTeam, teams: Array<ChampionshipTeam>) {
    this.matches.push(
      ...teams.map((visiting) =>
        plainToInstance(ScoreMatch, {
          status: {
            date: new Date(),
            localStatus: { cards: [], goals: [], team: local },
            visitingStatus: { cards: [], goals: [], team: visiting },
          },
          championship: this,
        }),
      ),
    );
  }

  findMatch(id: number) {
    return this.matches.find((match) => match.id === id) ?? null;
  }
}
