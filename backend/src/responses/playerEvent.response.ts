import { PlayerResponse } from './player.response';

export interface PlayerEventResponse {
  id: number;
  minute: number;
  player: PlayerResponse;
}
