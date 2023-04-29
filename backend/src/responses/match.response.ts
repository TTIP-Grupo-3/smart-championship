import { TeamStatusResponse } from './teamStatus.response';

export interface MatchResponse {
  id: number;
  local: TeamStatusResponse;
  visiting: TeamStatusResponse;
}
