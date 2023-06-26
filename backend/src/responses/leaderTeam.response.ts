import { PlayerResponse } from './player.response';

export interface LeaderTeamResponse {
  id: number;
  name: string;
  logo?: string;
  players: Array<PlayerResponse>;
}
