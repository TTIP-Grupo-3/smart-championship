import { CardsResponse } from './cards.response';
import { PlayerEventResponse } from './playerEvent.response';

export interface TeamStatusResponse {
  name: string;
  goals: Array<PlayerEventResponse>;
  cards: CardsResponse;
}
