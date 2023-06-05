import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { PartialChampionshipResponse } from './partialChampionship.response';

export interface PartialAdminChampionshipResponse extends PartialChampionshipResponse {
  date: string;
  start?: string;
  end?: string;
  size: number;
  price: number;
  duration: number;
  teamSize: number;
  status: ChampionshipStatus;
}
