import { PlayerResponse } from './player.response';

export interface TeamResponse {
  id: number;
  name: string;
  players: Array<PlayerResponse>;
}
