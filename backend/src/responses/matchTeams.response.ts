import { TeamResponse } from './team.response';

export interface MatchTeamsResponse {
  id: number;
  championshipId: number;
  local: TeamResponse;
  visiting: TeamResponse;
}
