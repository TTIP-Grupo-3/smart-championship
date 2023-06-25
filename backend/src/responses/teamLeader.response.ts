import { PlayerResponse } from './player.response';
import { TeamLeaderEnrollmentResponse } from './teamLeaderEnrollment.response';

export interface TeamLeaderResponse {
  id: number;
  name: string;
  team: string;
  logo?: string;
  players: Array<PlayerResponse>;
  enrollments: Array<TeamLeaderEnrollmentResponse>;
}
