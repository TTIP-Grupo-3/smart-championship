import { ChampionshipType } from 'src/enums/championshipType.enum';

export interface ChampionshipResponse {
  id: number;
  name: string;
  type: ChampionshipType;
}
