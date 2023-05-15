import { ChampionshipType } from 'src/services/championship.service';
import { ChampionshipResponse } from './championship.response';
import { PartialMatchResponse } from './partialMatch.response';

export interface ScoreChampionshipResponse extends ChampionshipResponse {
  type: ChampionshipType.SCORE;
  matches: Array<PartialMatchResponse>;
}
