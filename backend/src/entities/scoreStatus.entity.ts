import { ChampionshipTeam } from './championshipTeam.entity';
import { ScoreChampionship } from './scoreChampionship.entity';
import { ScoreMatch } from './scoreMatch.entity';

export class ScoreStatus {
  team: ChampionshipTeam;
  championship: ScoreChampionship;

  public get score(): number {
    return this.won.length * 3 + this.tied.length;
  }

  public get played(): Array<ScoreMatch> {
    return this.championship.matches.filter((match) => match.includes(this.team) && match.finished());
  }

  public get won(): Array<ScoreMatch> {
    return this.played.filter((match) => match.winner?.id === this.team.id);
  }

  public get lost(): Array<ScoreMatch> {
    return this.played.filter((match) => !(match.winner?.id === this.team.id));
  }

  public get tied(): Array<ScoreMatch> {
    return this.played.filter((match) => !match.winner);
  }
}
