import { PlayerResponse } from './player.response';

export interface TeamResponse {
  id: number;
  name: string;
  logo: string;
  players: Array<PlayerResponse>;
}
