import { PhaseResponse } from './phase.response';
import { ChampionshipResponse } from './championship.response';
import { ChampionshipType } from 'src/enums/championshipType.enum';

export type PartialEliminationChampionshipResponse = PhaseResponse & ChampionshipResponse;

export interface EliminationChampionshipResponse extends PartialEliminationChampionshipResponse {
  type: ChampionshipType.ELIMINATION;
}
