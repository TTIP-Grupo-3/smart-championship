import { PhaseManagerResponse } from './phaseManager.response';
import { ChampionshipResponse } from './championship.response';
import { ChampionshipType } from 'src/enums/championshipType.enum';

export type PartialEliminationChampionshipResponse = PhaseManagerResponse & ChampionshipResponse;

export interface EliminationChampionshipResponse extends PartialEliminationChampionshipResponse {
  type: ChampionshipType.ELIMINATION;
}
