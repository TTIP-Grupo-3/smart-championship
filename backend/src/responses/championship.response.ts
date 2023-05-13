import { ChampionshipType } from 'src/services/championship.service';

export interface ChampionshipResponse {
  id: number;
  name: string;
  type: ChampionshipType;
}
