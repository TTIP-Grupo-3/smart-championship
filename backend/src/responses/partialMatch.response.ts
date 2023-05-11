import { PartialTeamStatusResponse } from './partialTeamStatus.response';

export interface PartialMatchResponse {
  id: number;
  date: string;
  start: string;
  end: string;
  local: PartialTeamStatusResponse;
  visiting: PartialTeamStatusResponse;
}
