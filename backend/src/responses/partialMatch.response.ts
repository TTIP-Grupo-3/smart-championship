import { PartialTeamStatusResponse } from './partialTeamStatus.response';

export interface PartialMatchResponse {
  id: number;
  local: PartialTeamStatusResponse;
  visiting: PartialTeamStatusResponse;
}
