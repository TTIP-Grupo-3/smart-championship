import { TeamResponse } from './team.response';

export interface MatchTeamsResponse {
  id: number;
  date: string;
  start: string;
  end: string;
  championshipId: number;
  local: TeamResponse;
  visiting: TeamResponse;
}
