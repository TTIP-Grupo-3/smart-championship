import { PlayerEventResponse } from './playerEvent.response';

export interface CardsResponse {
  red: Array<PlayerEventResponse>;
  yellow: Array<PlayerEventResponse>;
}
