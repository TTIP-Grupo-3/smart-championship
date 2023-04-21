import { PartialMatchResponse } from './partialMatch.response';

export type PhaseResponse = null | {
  matches: Array<PartialMatchResponse>;
  next: PhaseResponse;
};
