import { LeaderTeamResponse } from './leaderTeam.response';
import { TeamLeaderEnrollmentResponse } from './teamLeaderEnrollment.response';

export interface TeamLeaderResponse {
  id: number;
  name: string;
  team?: LeaderTeamResponse;
  enrollments: Array<TeamLeaderEnrollmentResponse>;
}
