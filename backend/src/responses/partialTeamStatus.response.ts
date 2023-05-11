import { PartialCardsResponse } from './partialCards.response';

export interface PartialTeamStatusResponse {
  name: string;
  logo: string;
  goals: number;
  cards: PartialCardsResponse;
}
