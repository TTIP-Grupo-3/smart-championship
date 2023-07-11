import { PartialAdminChampionshipResponse } from './partialAdminChampionship.response';

export interface TeamLeaderChampionshipResponse extends PartialAdminChampionshipResponse {
  isEnrolled: boolean;
}
