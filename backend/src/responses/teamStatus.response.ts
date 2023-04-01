import { CardsResponse } from './cards.response';

export interface TeamStatusResponse {
  name: string;
  goals: number;
  cards: CardsResponse;
}
