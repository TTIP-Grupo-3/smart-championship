import { MatchResponse } from './match.response';

export type PhaseResponse = null | {
  matches: Array<MatchResponse>;
  next: PhaseResponse;
};
