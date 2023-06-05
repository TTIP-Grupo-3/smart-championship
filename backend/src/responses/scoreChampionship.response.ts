import { ChampionshipType } from 'src/enums/championshipType.enum';
import { ChampionshipResponse } from './championship.response';
import { PartialMatchResponse } from './partialMatch.response';

export interface ScoreChampionshipResponse extends ChampionshipResponse {
  type: ChampionshipType.SCORE;
  matches: Array<PartialMatchResponse>;
}
