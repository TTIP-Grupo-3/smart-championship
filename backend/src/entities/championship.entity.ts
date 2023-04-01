import { ChampionshipPlayer } from './championshipPlayer.entity';
import { ChampionshipTeam } from './championshipTeam.entity';

export abstract class Championship {
  id: number;
  name: string;
  teams: Array<ChampionshipTeam>;
  players: Array<ChampionshipPlayer>;
}
