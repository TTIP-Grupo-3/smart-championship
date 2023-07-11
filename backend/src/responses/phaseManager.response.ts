import { PartialMatchResponse } from './partialMatch.response';

export type PhaseManagerResponse = null | {
  matches: Array<PartialMatchResponse>;
  next: PhaseManagerResponse;
};
