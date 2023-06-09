import { MatchResponseStatus } from './match.response';
import { PartialTeamStatusResponse } from './partialTeamStatus.response';

export interface PartialMatchResponse {
  id: number;
  date: string;
  start: string;
  end: string;
  status: MatchResponseStatus;
  local: PartialTeamStatusResponse;
  visiting: PartialTeamStatusResponse;
}
