import { TeamStatusResponse } from './teamStatus.response';

export enum MatchResponseStatus {
  TOSTART = 'TOSTART',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export interface MatchResponse {
  id: number;
  status: MatchResponseStatus;
  local: TeamStatusResponse;
  visiting: TeamStatusResponse;
}
