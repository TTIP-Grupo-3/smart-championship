import { ChampionshipResponse } from './championship.response';

export interface PartialChampionshipResponse extends ChampionshipResponse {
  date: string;
}
