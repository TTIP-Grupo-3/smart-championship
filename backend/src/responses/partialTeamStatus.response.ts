import { PartialCardsResponse } from './partialCards.response';

export interface PartialTeamStatusResponse {
  name: string;
  goals: number;
  cards: PartialCardsResponse;
}
